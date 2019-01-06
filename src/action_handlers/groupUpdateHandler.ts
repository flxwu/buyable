// loop through all actions
// check if action is allowed
// perform action
// save model or add errors
import { GroupModel } from '../schemas/group';
import { ItemModel } from '../schemas/item';
import constants from '../helpers/constants';
const groupUpdateHandler = async (
  user: any,
  groupUser: any,
  oldGroup: any,
  actions: any
): Promise<Object> => {
  const update: { [k: string]: any } = {},
    errors = [];
  for (const action of actions) {
    let permissionsArray;
    switch (action.type) {
      case constants.ACTIONS.GROUP.EDIT_NAME:
        if (
          groupUser.role === constants.ROLES.ADMIN ||
          groupUser.role === constants.ROLES.OWNER
        )
          update.name = action.payload;
        break;
      case constants.ACTIONS.GROUP.ADD_DESCRIPTION:
        if (
          groupUser.role === constants.ROLES.ADMIN ||
          groupUser.role === constants.ROLES.OWNER
        )
          update.description = action.payload;
        break;
      case constants.ACTIONS.GROUP.EDIT_DESCRIPTION:
        if (
          groupUser.role === constants.ROLES.ADMIN ||
          groupUser.role === constants.ROLES.OWNER
        )
          update.description = action.payload;
        break;
      case constants.ACTIONS.GROUP.DELETE_DESCRIPTION:
        if (
          groupUser.role === constants.ROLES.ADMIN ||
          groupUser.role === constants.ROLES.OWNER
        )
          update.description = undefined;
        break;
      case constants.ACTIONS.GROUP.ADD_PASSWORD:
        if (groupUser.role === constants.ROLES.OWNER)
          update.password = action.payload;
        break;
      case constants.ACTIONS.GROUP.EDIT_PASSWORD:
        if (groupUser.role === constants.ROLES.OWNER)
          update.password = action.payload;
        break;
      case constants.ACTIONS.GROUP.DELETE_PASSWORD:
        if (groupUser.role === constants.ROLES.OWNER)
          update.password = undefined;
        break;
      case constants.ACTIONS.GROUP.EDIT_URLSUFFIX:
        if (groupUser.role === constants.ROLES.OWNER)
          update.urlSuffix = action.payload;
        break;
      case constants.ACTIONS.GROUP.EDIT_ADMIN_PERMISSIONS:
        if (groupUser.role === constants.ROLES.OWNER)
          update.permissions.admin = action.payload;
        break;
      case constants.ACTIONS.GROUP.EDIT_SELLER_PERMISSIONS:
        if (groupUser.role === constants.ROLES.OWNER)
          update.permissions.seller = action.payload;
        break;
      case constants.ACTIONS.GROUP.EDIT_USER_PERMISSIONS:
        if (groupUser.role === constants.ROLES.OWNER)
          update.permissions.user = action.payload;
        break;
      case constants.ACTIONS.GROUP.EDIT_SETTINGS_PRICE_LIMIT:
        switch (groupUser.role) {
          case constants.ROLES.ADMIN:
            permissionsArray = oldGroup.permissions.admin;
          case constants.ROLES.SELLER:
            permissionsArray = oldGroup.permissions.seller;
          case constants.ROLES.USER:
            permissionsArray = oldGroup.permissions.user;
          case constants.ROLES.OWNER:
            permissionsArray = oldGroup.permissions.owner;
          default:
            errors.push(constants.ERRORS.GROUP_UPDATE.UNPRIVILEGED);
        }
        if (
          errors.length === 0 &&
          permissionsArray.indexOf(constants.PERMISSIONS.GROUP.EDIT_SETTINGS) >=
            0
        ) {
          update.settings.priceLimit = action.payload;
        }
        break;
      case constants.ACTIONS.GROUP.EDIT_SETTINGS_DEFAULT_ROLE:
        switch (groupUser.role) {
          case constants.ROLES.ADMIN:
            permissionsArray = oldGroup.permissions.admin;
          case constants.ROLES.SELLER:
            permissionsArray = oldGroup.permissions.seller;
          case constants.ROLES.USER:
            permissionsArray = oldGroup.permissions.user;
          case constants.ROLES.OWNER:
            permissionsArray = oldGroup.permissions.owner;
          default:
            errors.push(constants.ERRORS.GROUP_UPDATE.UNPRIVILEGED);
        }
        if (
          errors.length === 0 &&
          permissionsArray.indexOf(constants.PERMISSIONS.GROUP.EDIT_SETTINGS) >=
            0
        ) {
          update.settings.defaultRole = action.payload;
        }
        break;
      case constants.ACTIONS.GROUP.DELETE_ITEM:
        if (user.items.indexOf(action.payload) >= 0) {
          if (!update.items) update.items = [];
          update.items.push({
            $pull: { items: { referenceId: action.payload.referenceId } }
          });
        } else if (
          groupUser.role === constants.ROLES.OWNER ||
          groupUser.role === constants.ROLES.ADMIN
        ) {
          if (!update.items) update.items = [];
          update.items.push({
            $pull: { items: { referenceId: action.payload.referenceId } }
          });
        } else {
          errors.push(constants.ERRORS.GROUP_UPDATE.UNPRIVILEGED);
        }
        break;
      case constants.ACTIONS.GROUP.ADD_ITEM:
        break;
      case constants.ACTIONS.GROUP.DELETE_USER:
        break;
    }
  }
  if (errors.length > 0) return { errors };
  // update group;
  try {
    const newGroup = await GroupModel.findOneAndUpdate(
      oldGroup.urlSuffix,
      update
    );
    return { errors: null, newGroup };
  } catch (err) {
    return { errors: err.message, newGroup: null };
  }
};

export default groupUpdateHandler;