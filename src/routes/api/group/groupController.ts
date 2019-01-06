import { GroupModel, IGroupModel } from '../../../schemas/group';
import constants from '../../../helpers/constants';
import { IGroupMemberReference } from '../../../../src/interfaces/reference';
import { IItemReference } from '../../../../src/interfaces/reference';

import bcrypt from 'bcrypt';
import { observableDiff } from 'deep-diff';

import groupUpdate from '../../../custom_validators/groupUpdate';
import { url } from 'inspector';
import groupUpdateHandler from '../../../action_handlers/groupUpdateHandler';
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
  public async update(req: any, res: any, next: any): Promise<any> {
    // accepts only content-type: application/json!!!1
    // idea: deep object differences check-> create actions array (which only contains allowed actions)
    // and error array
    // if actions array.length > 0 and error.length === 0 perform the actions, then save object.
    // otherwise, send error array or do nothing
    const content_type = req.headers['content-type'];
    if (content_type && content_type.indexOf('application/json') === 0) {
      const { group, urlSuffix, _id } = req.body;
      const oldGroup = JSON.parse(
        JSON.stringify(
          urlSuffix
            ? await GroupModel.findOne({
                urlSuffix
              })
                .lean()
                .exec()
            : await GroupModel.findOne({
                _id
              })
                .lean()
                .exec()
        )
      );
      let isMember = false,
        groupUser;
      for (const user of group.users) {
        if (user.referenceId === req.user._id) isMember = true;
        groupUser = user;
      }
      if (isMember) {
        if (oldGroup && group) {
          const { errors, actions } = await groupUpdate(oldGroup, group);
          if (errors.length === 0) {
            if (actions.length > 0) {
              // perform actions
              const { errors, newGroup } = await groupUpdateHandler(
                req.user,
                groupUser,
                oldGroup,
                actions
              );
              res.json(errors, newGroup);
              if (errors) {
                // success
                res.status(200).json({ group: newGroup });
              } else {
                // performing actions on object returned errors
                res.status(400).json({ errors });
              }
            } else {
              // objects submitted are equal
              res.status(304).send('NOT MODIFIED');
            }
          } else {
            // group validation returned errors
            res.json({ errors });
          }
        } else {
          // group (specified in req.body.urlSuffix or _id) doesn't exist
          res.status(400).json({
            errors: [constants.ERRORS.GROUP_UPDATE.GROUP_NOT_FOUND]
          });
        }
      } else {
        // user is not in the group he's editing
        res.status(401).send('UNAUTHORIZED');
      }
    } else {
      // content-type is not application json
      res.status(400).json({
        errors: ['BAD REQUEST']
      });
    }
  }
}

export default Controller;
