import bcrypt from 'bcrypt';
import validator from 'validator';
import * as yup from 'yup';

import { UserModel, IUserModel } from '../../../schemas/user';
import { GroupModel } from '../../../schemas/group';
import { IGroupReference } from '../../../interfaces/reference';
import { isUserDuplicate } from '../../../helpers/database';
import { User } from '../../../helpers/yupSchemas';
import { DuplicateError } from '../../../helpers/errors';

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
        if (err instanceof DuplicateError) throw new Error('dup');
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
        case 'dup':
          status = 400;
          message = 'User already exists';
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

  public async PATCH(req: any, res: any): Promise<any> {
    const sessionUser = req.user;
    const reqUser = req.body;

    if (String(sessionUser._id) !== reqUser._id)
      return res.status(401).json({ errors: ['NOT_AUTHORIZED'] });

    try {
      User.validateSync(reqUser);
    } catch (err) {
      if (err instanceof yup.ValidationError)
        return res.status(400).json({ errors: ['Invalid Inputs'] });
    }

    if (sessionUser.username !== reqUser.username) {
      const userAlreadyRegistered = await isUserDuplicate(
        reqUser.username,
        'username'
      );
      if (userAlreadyRegistered)
        return res
          .status(400)
          .json({ errors: ['Username already registered'] });
    }

    if (sessionUser.email !== reqUser.email) {
      const userAlreadyRegistered = await isUserDuplicate(
        reqUser.email,
        'email'
      );
      if (userAlreadyRegistered)
        return res.status(400).json({ errors: ['Email already registered'] });
    }

    /* Delete immutable attributes */
    delete reqUser._id;
    delete reqUser.createdAt;
    /* Check for password update */
    const isMatch = await bcrypt.compare(
      sessionUser.password,
      reqUser.password
    );
    if (!isMatch) reqUser.password = await bcrypt.hash(reqUser.password, 10);
    /* Update Document */
    const updatedDoc = await UserModel.findByIdAndUpdate(
      sessionUser._id,
      reqUser,
      { new: true }
    );
    req.user = updatedDoc;
    res.json(updatedDoc);
  }
}

export default Controller;
