import { GroupModel, IGroupModel } from '../../../schemas/group';
import constants from '../../../helpers/constants';
import { IGroupMemberReference } from '../../../../src/interfaces/reference';
import { IItemReference } from '../../../../src/interfaces/reference';

import bcrypt from 'bcrypt';
interface IController {
  newPOST: Function;
}

class Controller<IController> {
  public async newPOST(req: any, res: any, next: any): Promise<any> {
    const errors = [];
    const { name, urlSuffix, pictureURL, description } = req.body;
    let { permissions, settings, password } = req.body;
    const owner = { referenceId: req.user._id };
    const ownerUser = {
      referenceId: req.user._id,
      role: constants.ROLES.OWNER
    };
    const users: Array<IGroupMemberReference> = [ownerUser];
    const items: Array<IItemReference> = [];
    // validate name
    if (name) {
      if (name.length < 3)
        errors.push(constants.ERRORS.GROUP_ADD.NAME_TOO_SHORT);
      if (name.length > 100)
        errors.push(constants.ERRORS.GROUP_ADD.NAME_TOO_LONG);
    } else {
      errors.push(constants.ERRORS.GROUP_ADD.NAME_MISSING);
    }
    // validate description
    if (description && description.length > 500)
      errors.push(constants.ERRORS.GROUP_ADD.DESCRIPTION_TOO_LONG);

    // validate password
    if (password) {
      if (password.length > 72) {
        errors.push(constants.ERRORS.GROUP_ADD.PASSWORD_TOO_LONG);
      } else if (password.length < 8) {
        errors.push(constants.ERRORS.GROUP_ADD.PASSWORD_TOO_SHORT);
      } else {
        password = await bcrypt.hash(password, 10);
      }
    }
    // validate urlsuffix
    if (urlSuffix) {
      if (urlSuffix.length < 3)
        errors.push(constants.ERRORS.GROUP_ADD.URLSUFFIX_TOO_SHORT);
      if (urlSuffix.length > 50)
        errors.push(constants.ERRORS.GROUP_ADD.URLSUFFIX_TOO_LONG);
    } else {
      errors.push(constants.ERRORS.GROUP_ADD.URLSUFFIX_MISSING);
    }
    const adminPermissions = [],
      sellerPermissions = [],
      userPermissions = [];
    // validate permissions
    // TODO: deeper validation -> right now user can add any permissions to any role!
    if (permissions) {
      // json needs to be manually parsed since its urlencoded
      try {
        permissions = JSON.parse(permissions);
      } catch (err) {
        errors.push(constants.ERRORS.GROUP_ADD.PERMISSIONS_INVALID);
      }
      if (permissions.admin) {
        for (const permission in permissions.admin) {
          if (
            constants.PERMISSIONS.GROUP.hasOwnProperty(permission) &&
            permissions.admin[permission]
          ) {
            adminPermissions.push(permission);
          } else {
            errors.push({
              [constants.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]:
                constants.ROLES.ADMIN
            });
            break;
          }
        }
      } else {
        errors.push({
          [constants.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]:
            constants.ROLES.ADMIN
        });
      }
      if (permissions.seller) {
        for (const permission in permissions.seller) {
          if (
            constants.PERMISSIONS.GROUP.hasOwnProperty(permission) &&
            permissions.seller[permission]
          ) {
            sellerPermissions.push(permission);
          } else {
            errors.push({
              [constants.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]:
                constants.ROLES.SELLER
            });
            break;
          }
        }
      } else {
        errors.push({
          [constants.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]:
            constants.ROLES.SELLER
        });
      }
      if (permissions.user) {
        for (const permission in permissions.user) {
          if (
            constants.PERMISSIONS.GROUP.hasOwnProperty(permission) &&
            permissions.user[permission]
          ) {
            userPermissions.push(permission);
          } else {
            errors.push({
              [constants.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]:
                constants.ROLES.USER
            });
            break;
          }
        }
      } else {
        errors.push({
          [constants.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]: constants.ROLES.USER
        });
      }
    }
    // validate settings
    try {
      settings = JSON.parse(settings);
      // validate price limit
      if (settings.priceLimit) {
        if (settings.priceLimit < 0)
          errors.push(constants.ERRORS.GROUP_ADD.SETTINGS_MIN_PRICE_TOO_LOW);
        if (settings.priceLimit > Number.MAX_SAFE_INTEGER)
          errors.push(constants.ERRORS.GROUP_ADD.SETTINGS_MIN_PRICE_TOO_HIGH);
        if (settings.priceLimit === 0)
          settings.priceLimit = Number.MAX_SAFE_INTEGER;
      } else {
        errors.push(constants.ERRORS.GROUP_ADD.SETTINGS_MIN_PRICE_INVALID);
      }
      // validate default role
      if (settings.defaultRole) {
        if (
          !constants.ROLES.hasOwnProperty(settings.defaultRole) ||
          settings.defaultRole === constants.ROLES.OWNER
        ) {
          errors.push(constants.ERRORS.GROUP_ADD.SETTINGS_DEFAULTROLE_INVALID);
        }
      } else {
        errors.push(constants.ERRORS.GROUP_ADD.SETTINGS_DEFAULTROLE_MISSING);
      }
    } catch (err) {
      errors.push(constants.ERRORS.GROUP_ADD.SETTINGS_INVALID);
    }

    // TODO: Validation
    // TODO: Upload image to s3 and create url
    const duplicate = await GroupModel.findOne({ urlSuffix }).exec();
    console.log(duplicate);
    if (!duplicate && errors.length == 0) {
      try {
        // create permissions array

        const newGroup: IGroupModel = new GroupModel({
          name,
          description,
          urlSuffix,
          permissions: {
            admin: adminPermissions,
            seller: sellerPermissions,
            user: userPermissions
          },
          settings: {
            priceLimit: settings.priceLimit,
            defaultRole: settings.defaultRole
          },
          pictureURL,
          owner,
          users,
          items
        });
        await newGroup.save();
        res.status(201).json(newGroup);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    } else {
      errors.push(constants.ERRORS.GROUP_ADD.GROUP_EXISTS);
      res.status(500).json({ errors });
    }
  }

  public async get(req: any, res: any, next: any): Promise<any> {
    res.status(200);
    const { _id } = req.query;
    try {
      const group = await GroupModel.findById(_id).exec();
      res.send(group);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default Controller;
