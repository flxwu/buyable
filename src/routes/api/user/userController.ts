import bcrypt from 'bcrypt';

import { UserModel, IUserModel } from '../../../schemas/user';
import { GroupModel } from '../../../schemas/group';
import { IGroupReference } from '../../../interfaces/reference';
import { IUser } from '../../../interfaces/user';
import validator from 'validator';
interface IController {
  newPOST: Function;
  GET: Function;
}

class Controller<IController> {
  public async newPOST(req: any, res: any, next: any): Promise<void> {
    const { username, email, forename, surname, password } = req.body;

    const createUser = async () => {
      // Validation
      if (!validator.isLength(username, { min: 3 })) throw new Error('uts');
      if (!validator.isLength(username, { max: 50 })) throw new Error('utl');
      if (!validator.isEmail(email)) throw new Error('ie');
      if (!validator.isLength(password, { min: 3 })) throw new Error('pts');
      if (!validator.isLength(password, { max: 50 })) throw new Error('ptl');
      // TODO: deal with image blob => upload to s3 and create array of urls

      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        const user: IUserModel = new UserModel({
          username,
          email,
          forename,
          surname,
          password: hashedPassword
        });
        return await user.save();
      } catch (err) {
        throw new Error('ise');
      }
    };
    try {
      const createdUser = await createUser();
      res.status(200).json({ user: createdUser });
    } catch (err) {
      let status, message;
      switch (err.message) {
        case 'ie':
          status = 400;
          message = 'Invalid Email address';
          break;
        case 'uts':
          status = 400;
          message = 'Username too short';
          break;
        case 'utl':
          status = 400;
          message = 'Username too long';
          break;
        case 'pts':
          status = 400;
          message = 'Password too short';
          break;
        case 'ptl':
          status = 400;
          message = 'Password too long';
          break;
        default:
          status = 500;
          message = 'Internal server error';
      }
      res.status(status).json({ error: message });
    }
  }

  public async GET(req: any, res: any, next: any): Promise<any> {
    const userId = req.query._id;
    UserModel.findById(userId, (err, doc) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const userGroups = doc.groups;
        const ownedGroups = doc.ownedGroups;
        const publicUserGroups: Array<IGroupReference> = [];
        const publicOwnedUserGroups: Array<IGroupReference> = [];
        for (const group of userGroups) {
          const groupReferenceId = group.referenceId;
          GroupModel.findById(groupReferenceId, (err, doc) => {
            if (err) {
              throw new Error('Error while finding group');
            } else {
              const isPublic = doc.settings.public;
              // add to "groups", if it's an ownedGroup also add it to "ownedGroups"
              if (isPublic) {
                publicUserGroups.push({ referenceId: groupReferenceId });
                if (ownedGroups.find(g => g.referenceId === groupReferenceId))
                  publicOwnedUserGroups.push({ referenceId: groupReferenceId });
              }
            }
          });
        }
        const filteredDoc = doc;
        filteredDoc.groups = publicUserGroups;
        filteredDoc.ownedGroups = publicOwnedUserGroups;

        res.status(200).json(filteredDoc);
      }
    });
  }
}

export default Controller;
