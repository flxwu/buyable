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
  update.permissions = { ...oldGroup.permissions };
  update.settings = { ...oldGroup.settings };
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
      case constants.ACTIONS.GROUP.EDIT_BUYER_PERMISSIONS:
        if (groupUser.role === constants.ROLES.OWNER)
          update.permissions.buyer = action.payload;
        break;
      case constants.ACTIONS.GROUP.EDIT_SETTINGS_PRICE_LIMIT:
        switch (groupUser.role) {
          case constants.ROLES.ADMIN:
            permissionsArray = oldGroup.permissions.admin;
            break;
          case constants.ROLES.SELLER:
            permissionsArray = oldGroup.permissions.seller;
            break;
          case constants.ROLES.BUYER:
            permissionsArray = oldGroup.permissions.buyer;
            break;
          case constants.ROLES.OWNER:
            permissionsArray = [];
            break;
          default:
            errors.push(constants.ERRORS.GROUP_UPDATE.UNPRIVILEGED);
        }
        if (
          (errors.length === 0 &&
            permissionsArray.indexOf(
              constants.PERMISSIONS.GROUP.EDIT_SETTINGS
            ) >= 0) ||
          groupUser.role === constants.ROLES.OWNER
        ) {
          update.settings.priceLimit = action.payload;
        }
        break;
      case constants.ACTIONS.GROUP.EDIT_SETTINGS_DEFAULT_ROLE:
        switch (groupUser.role) {
          case constants.ROLES.ADMIN:
            permissionsArray = oldGroup.permissions.admin;
            break;
          case constants.ROLES.SELLER:
            permissionsArray = oldGroup.permissions.seller;
            break;
          case constants.ROLES.BUYER:
            permissionsArray = oldGroup.permissions.buyer;
            break;
          case constants.ROLES.OWNER:
            permissionsArray = [];
            break;
          default:
            errors.push(constants.ERRORS.GROUP_UPDATE.UNPRIVILEGED);
        }
        if (
          (errors.length === 0 &&
            permissionsArray.indexOf(
              constants.PERMISSIONS.GROUP.EDIT_SETTINGS
            ) >= 0) ||
          groupUser.role === constants.ROLES.OWNER
        ) {
          update.settings.defaultRole = action.payload;
        }
        break;
      case constants.ACTIONS.GROUP.DELETE_ITEMS:
        // TODO: check all permissions
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
      case constants.ACTIONS.GROUP.ADD_ITEMS:
        switch (groupUser.role) {
          case constants.ROLES.ADMIN:
            permissionsArray = oldGroup.permissions.admin;
            break;
          case constants.ROLES.SELLER:
            permissionsArray = oldGroup.permissions.seller;
            break;
          case constants.ROLES.BUYER:
            permissionsArray = oldGroup.permissions.buyer;
            break;
          case constants.ROLES.OWNER:
            permissionsArray = [];
            break;
          default:
            errors.push(constants.ERRORS.GROUP_UPDATE.UNPRIVILEGED);
        }
        if (
          groupUser.role === constants.ROLES.OWNER ||
          permissionsArray.indexOf(constants.PERMISSIONS.GROUP.ADD_ITEM) >= 0
        ) {
          const itemsToAdd = action.payload.filter(
            (item: { referenceId: string }) => {
              return groupUser.items.indexOf(item) >= 0;
            }
          );
          // TODO: cast items to arrray of IGroupItems
          // TODO: push new items to item array of update.
        }

        break;
      case constants.ACTIONS.GROUP.DELETE_USERS:
        break;
    }
  }
  if (errors.length > 0) return { errors };
  // update group;
  try {
    const newGroup = await GroupModel.findByIdAndUpdate(oldGroup._id, update, {
      new: true
    }).exec();
    console.log(newGroup);
    return { errors: null, newGroup };
  } catch (err) {
    return { errors: err.message, newGroup: null };
  }
};

export default groupUpdateHandler;
