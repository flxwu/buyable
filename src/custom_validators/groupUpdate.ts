import constants from '../helpers/constants';
import bcrypt from 'bcrypt';

class Action {
  public type: any;
  public payload: any;
  constructor(type: any, payload: any) {
    this.type = type;
    this.payload = payload;
  }
}

const groupUpdate = async (oldGroup: any, newGroup: any) => {
  const errors = [],
    actions = [];
  // oof. let's go.
  // validate name
  if (newGroup.name) {
    if (newGroup.name.length < 5) {
      errors.push(constants.ERRORS.GROUP_UPDATE.NAME_TOO_SHORT);
    } else if (newGroup.name.length > 100) {
      errors.push(constants.ERRORS.GROUP_UPDATE.NAME_TOO_LONG);
    } else if (oldGroup.name !== newGroup.name) {
      actions.push(
        new Action(constants.ACTIONS.GROUP.EDIT_NAME, newGroup.name)
      );
    }
  } else {
    errors.push(constants.ERRORS.GROUP_UPDATE.NAME_MISSING);
  }
  // validate description
  if (newGroup.description && !oldGroup.description) {
    if (newGroup.description.length > 500) {
      errors.push(constants.ERRORS.GROUP_UPDATE.DESCRIPTION_TOO_LONG);
    } else {
      actions.push(
        new Action(
          constants.ACTIONS.GROUP.ADD_DESCRIPTION,
          newGroup.description
        )
      );
    }
  } else if (!newGroup.description && oldGroup.description) {
    actions.push(constants.ACTIONS.GROUP.DELETE_DESCRIPTION, '');
  } else if (newGroup.description !== oldGroup.description) {
    if (newGroup.description.length > 500) {
      errors.push(constants.ERRORS.GROUP_UPDATE.DESCRIPTION_TOO_LONG);
    } else {
      actions.push(
        new Action(
          constants.ACTIONS.GROUP.EDIT_DESCRIPTION,
          newGroup.description
        ),
        newGroup.description
      );
    }
  }
  // validate password
  if (!oldGroup.password && newGroup.password) {
    if (newGroup.password.length < 8) {
      errors.push(constants.ERRORS.GROUP_UPDATE.PASSWORD_TOO_SHORT);
    } else if (newGroup.password.length > 72) {
      errors.push(constants.ERRORS.GROUP_UPDATE.PASSWORD_TOO_LONG);
    } else {
      try {
        const newPassword = await bcrypt.hash(newGroup.password, 10);
        actions.push(
          new Action(constants.ACTIONS.GROUP.ADD_PASSWORD, newPassword)
        );
      } catch (err) {
        errors.push(constants.ERRORS.GROUP_UPDATE.PASSWORD_INVALID);
      }
    }
  } else if (oldGroup.password && !newGroup.password) {
    actions.push(new Action(constants.ACTIONS.GROUP.DELETE_PASSWORD, ''));
  } else if (oldGroup.password !== newGroup.password) {
    if (newGroup.password.length < 8) {
      errors.push(constants.ERRORS.GROUP_UPDATE.PASSWORD_TOO_SHORT);
    } else if (newGroup.password.length > 72) {
      errors.push(constants.ERRORS.GROUP_UPDATE.PASSWORD_TOO_LONG);
    } else {
      try {
        const newPassword = await bcrypt.hash(newGroup.password, 10);
        actions.push(constants.ACTIONS.GROUP.EDIT_PASSWORD, newPassword);
      } catch (err) {
        errors.push(constants.ERRORS.GROUP_UPDATE.PASSWORD_INVALID);
      }
    }
  }
  // validate UrlSuffix
  if (newGroup.urlSuffix && oldGroup.urlSuffix) {
    if (newGroup.urlSuffix !== oldGroup.urlSuffix) {
      if (newGroup.urlSuffix.length < 3) {
        errors.push(constants.ERRORS.GROUP_UPDATE.URLSUFFIX_TOO_SHORT);
      } else if (newGroup.urlSuffix.length > 50) {
        errors.push(constants.ERRORS.GROUP_UPDATE.URLSUFFIX_TOO_LONG);
      } else {
        actions.push(
          new Action(constants.ACTIONS.GROUP.EDIT_URLSUFFIX, newGroup.urlSuffix)
        );
      }
    }
  }
  // validate permissions
  if (newGroup.permissions) {
    if (newGroup.permissions.admin) {
      if (
        !arraysEqual(oldGroup.permissions.admin, newGroup.permissions.admin)
      ) {
        let adminValidationErrors = false;
        for (const permission of newGroup.permissions.admin) {
          console.log(permission);
          if (!constants.PERMISSIONS.GROUP.hasOwnProperty(permission)) {
            errors.push({
              [constants.ERRORS.GROUP_UPDATE.PERMISSIONS_INVALID]:
                constants.ROLES.ADMIN
            });
            adminValidationErrors = true;
            break;
          }
        }
        if (!adminValidationErrors) {
          actions.push(
            new Action(
              constants.ACTIONS.GROUP.EDIT_ADMIN_PERMISSIONS,
              newGroup.permissions.admin
            )
          );
        }
      }
    }
    if (newGroup.permissions.seller) {
      if (
        !arraysEqual(oldGroup.permissions.seller, newGroup.permissions.seller)
      ) {
        let sellerValidationErrors = false;
        for (const permission of newGroup.permissions.seller) {
          if (!constants.PERMISSIONS.GROUP.hasOwnProperty(permission)) {
            sellerValidationErrors = true;
            errors.push({
              [constants.ERRORS.GROUP_UPDATE.PERMISSIONS_INVALID]:
                constants.ROLES.SELLER
            });
            break;
          }
        }
        if (!sellerValidationErrors) {
          actions.push(
            new Action(
              constants.ACTIONS.GROUP.EDIT_SELLER_PERMISSIONS,
              newGroup.permissions.seller
            )
          );
        }
      }
    }
    if (newGroup.permissions.buyer) {
      if (
        !arraysEqual(oldGroup.permissions.buyer, newGroup.permissions.buyer)
      ) {
        let userValidationErrors = false;
        for (const permission of newGroup.permissions.buyer) {
          if (!constants.PERMISSIONS.GROUP.hasOwnProperty(permission)) {
            userValidationErrors = true;
            errors.push({
              [constants.ERRORS.GROUP_UPDATE.PERMISSIONS_INVALID]:
                constants.ROLES.BUYER
            });
            break;
          }
        }
        if (!userValidationErrors) {
          actions.push(
            new Action(
              constants.ACTIONS.GROUP.EDIT_BUYER_PERMISSIONS,
              newGroup.permissions.buyer
            )
          );
        }
      }
    }
  } else {
    errors.push(constants.ERRORS.GROUP_UPDATE.PERMISSIONS_INVALID);
  }
  // validate settings
  if (newGroup.settings) {
    if (newGroup.settings.priceLimit) {
      if (newGroup.settings.priceLimit === 0)
        newGroup.settings.priceLimit = Number.MAX_SAFE_INTEGER;
      if (newGroup.settings.priceLimit < 0)
        errors.push(constants.ERRORS.GROUP_UPDATE.SETTINGS_MIN_PRICE_TOO_LOW);
      else if (newGroup.settings.priceLimit > Number.MAX_SAFE_INTEGER)
        errors.push(constants.ERRORS.GROUP_UPDATE.SETTINGS_MIN_PRICE_TOO_HIGH);
      else {
        actions.push(
          new Action(
            constants.ACTIONS.GROUP.EDIT_SETTINGS_PRICE_LIMIT,
            newGroup.settings.priceLimit
          )
        );
      }
    } else {
      errors.push(constants.ERRORS.GROUP_UPDATE.SETTINGS_MIN_PRICE_INVALID);
    }
    // validate default role
    if (newGroup.settings.defaultRole) {
      if (
        !constants.ROLES.hasOwnProperty(newGroup.settings.defaultRole) ||
        newGroup.settings.defaultRole === constants.ROLES.OWNER
      ) {
        errors.push(constants.ERRORS.GROUP_UPDATE.SETTINGS_DEFAULTROLE_INVALID);
      } else {
        actions.push(
          new Action(
            constants.ACTIONS.GROUP.EDIT_SETTINGS_DEFAULT_ROLE,
            newGroup.settings.defaultRole
          )
        );
      }
    }
  }
  // validate items
  if (newGroup.items) {
    const deletedItems = arrayDiff(oldGroup.items, newGroup.items);
    const addedItems = arrayDiff(newGroup.items, oldGroup.items);
    for (const item of deletedItems) {
      if (item && item.referenceId) {
        actions.push(
          new Action(constants.ACTIONS.GROUP.DELETE_ITEM, {
            referenceId: item.referenceId
          })
        );
      } else {
        errors.push({
          [constants.ERRORS.GROUP_UPDATE.ITEM_DELETED_INVALID]: item
        });
      }
    }
    for (const item of addedItems) {
      if (item && item.referenceId) {
        actions.push(
          new Action(constants.ACTIONS.GROUP.ADD_ITEM, {
            referenceId: item.referenceId
          })
        );
      } else {
        errors.push({
          [constants.ERRORS.GROUP_UPDATE.ITEM_ADDED_INVALID]: item
        });
      }
    }
  } else {
    errors.push(constants.ERRORS.GROUP_UPDATE.ITEMS_MISSING);
  }
  // validate users
  if (newGroup.users) {
    const deletedUsers = arrayDiff(oldGroup.users, newGroup.users);
    for (const user of deletedUsers) {
      if (user && user.referenceId) {
        actions.push(
          new Action(constants.ACTIONS.GROUP.DELETE_USER, {
            referenceId: user.referenceId
          })
        );
      } else {
        errors.push({
          [constants.ERRORS.GROUP_UPDATE.USER_DELETED_INVALID]: user
        });
      }
    }
  } else {
    errors.push(constants.ERRORS.GROUP_UPDATE.USERS_MISSING);
  }
  return { errors, actions };
};

function arrayDiff(a: Array<any>, b: Array<any>) {
  return a.filter(function(i: Object) {
    return b.indexOf(i) < 0;
  });
}
function arraysEqual(a: Array<any>, b: Array<any>) {
  if ((!a && b) || (a && !b)) return false;
  if (a.length !== b.length) return false;
  for (let i = a.length; i--; ) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export default groupUpdate;
