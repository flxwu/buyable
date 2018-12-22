import bcrypt from 'bcrypt';
import validate from 'validate.js';

import { UserModel, IUserModel } from '../../../schemas/user';
import { GroupModel } from '../../../schemas/group';
import { IGroupReference } from '../../../interfaces/reference';
import { IUser } from '../../../interfaces/user';

interface IController {
  newPOST: Function;
  GET: Function;
}

class Controller<IController> {
  public async newPOST(req: any, res: any, next: any): Promise<void> {
    const { username, email, forename, surname, password } = req.body;

    const createUser = async () => {
      console.log(
        await validate.async(password, {
          key1: { length: { minimum: 8 } },
          key2: { length: { maximum: 72 } }
        })
      );
      // TODO: deal with image blob => upload to s3 and create array of urls
      const hashedPassword = await bcrypt.hash(password, 10);
      const user: IUserModel = new UserModel({
        username,
        email,
        forename,
        surname,
        password: hashedPassword
      });
      return await user.save();
    };
    try {
      const createdUser = await createUser();
      res.status(200).json({ user: createdUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  public async GET(req: any, res: any, next: any): Promise<any> {
    const userId = req.query.userId;
    UserModel.findById(userId, (err, doc) => {
      if (err) {
        res.status(500).send(err)
      } else {
        const userGroups = doc.groups;
        const publicUserGroups: Array<IGroupReference> = [];
        for (const group of userGroups) {
          const groupReferenceId = group.referenceId;
          GroupModel.findById(groupReferenceId, (err, doc) => {
            if (err) {
              throw new Error('Error while finding group')
            } else {
              const isPublic = doc.settings.public;
              if (isPublic) publicUserGroups.push({ referenceId: groupReferenceId});
            }
          });
        }
        let filteredDoc = doc;
        filteredDoc.groups = publicUserGroups;
        res.status(200).json(filteredDoc)
      }
    })
  }
}

export default Controller;
