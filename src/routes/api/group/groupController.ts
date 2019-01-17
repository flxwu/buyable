import { GroupModel, IGroupModel } from '../../../schemas/group';
import { ItemModel } from '../../../schemas/item';
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

class GroupController<IController> {
  public async newPOST(req: any, res: any, next: any): Promise<any> {
    const errors = [];
    const { name, pictureURL, description, permissions, settings } = req.body;
    let { password, urlSuffix } = req.body;
    urlSuffix = String(urlSuffix).replace(/[^a-z0-9]/gi, '');
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
      buyerPermissions = [];
    // validate permissions
    // TODO: deeper validation -> right now user can add any permissions to any role!
    if (permissions) {
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
      if (permissions.buyer) {
        for (const permission in permissions.buyer) {
          if (
            constants.PERMISSIONS.GROUP.hasOwnProperty(permission) &&
            permissions.buyer[permission]
          ) {
            buyerPermissions.push(permission);
          } else {
            errors.push({
              [constants.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]:
                constants.ROLES.BUYER
            });
            break;
          }
        }
      } else {
        errors.push({
          [constants.ERRORS.GROUP_ADD.PERMISSIONS_INVALID]:
            constants.ROLES.BUYER
        });
      }
    }
    // validate settings
    try {
      // validate price limit
      if (settings.priceLimit != null) {
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
    console.log('Duplicate Group: ', duplicate);
    if (!duplicate && errors.length == 0) {
      try {
        // TODO: write function that appends all permission dependencies to permission arrays and outsource
        const defaultAdminPermissions = [constants.PERMISSIONS.GROUP.ADD_ITEM];
        const defaultSellerPermissions = [];
        const defaultBuyerPermissions = [];
        // create permissions array
        adminPermissions.push(...defaultAdminPermissions);
        const newGroup: IGroupModel = new GroupModel({
          name,
          description,
          urlSuffix,
          permissions: {
            admin: adminPermissions,
            seller: sellerPermissions,
            buyer: buyerPermissions
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
      if (duplicate) errors.push(constants.ERRORS.GROUP_ADD.GROUP_EXISTS);
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
      const group = req.body;
      const oldGroup = JSON.parse(
        JSON.stringify(
          await GroupModel.findById(group._id)
            .lean()
            .exec()
        )
      );
      let isMember = false,
        groupUser;
      const reqUserId = String(req.user._id);
      for (const user of oldGroup.users) {
        if (user.referenceId === reqUserId) isMember = true;
        groupUser = user;
      }
      if (isMember) {
        if (oldGroup && group) {
          const { errors, actions } = await groupUpdate(oldGroup, group);
          if (errors.length === 0) {
            if (actions.length > 0) {
              // perform actions
              const { errors, newGroup }: any = await groupUpdateHandler(
                req.user,
                groupUser,
                oldGroup,
                actions
              );
              if (!errors) {
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
            res.status(500).json({ errors });
          }
        } else {
          // group (specified in req.body.urlSuffix or _id) doesn't exist
          res.status(400).json({
            errors: [constants.ERRORS.GROUP_UPDATE.GROUP_NOT_FOUND]
          });
        }
      } else {
        // user is not in the group he's editing
        res.status(401).json({ errors: ['NOT MEMBER OF GROUP'] });
      }
    } else {
      // content-type is not application json
      res.status(400).json({
        errors: ['CONTENT-TYPE NOT APPLICATION/JSON']
      });
    }
  }
}

class GroupItemsController {
  private SORT_BY = {
    NEWEST: 'new',
    OLDEST: 'old'
  };

  public async GET(req, res): Promise<any> {
    const groupId = req.query._id;
    const user = req.user;

    if (groupId == null)
      return res.status(400).json({ errors: ['No group given'] });

    if (user == null || !user.groups.some(g => g.referenceId === groupId))
      return res.status(401).json({ errors: ['UNAUTHORIZED'] });

    const amount = req.query.n || 5;
    const sortBy = req.query.sort || this.SORT_BY.NEWEST;

    const group = await GroupModel.findById(groupId);
    // Sort group items by sort criteria
    group.items = group.items.sort((i1, i2) => {
      switch (sortBy) {
        case this.SORT_BY.NEWEST:
          return Number(i2.addedAt) - Number(i1.addedAt);
          break;
        case this.SORT_BY.OLDEST:
          return Number(i1.addedAt) - Number(i2.addedAt);
          break;
        default:
          return Number(i2.addedAt) - Number(i1.addedAt);
          break;
      }
    });

    // Get first 5
    const returnItemsReferenceIds =
      amount === 'all'
        ? group.items.map(ref => ref.referenceId)
        : group.items.slice(0, amount - 1).map(ref => ref.referenceId);

    // from the item ids, get the item objects
    const groupItems = await ItemModel.find({
      _id: {
        $in: returnItemsReferenceIds
      }
    });

    res.status(200).json(groupItems);
  }
}

export { GroupController, GroupItemsController };
