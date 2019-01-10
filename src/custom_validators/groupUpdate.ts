import constants from '../helpers/constants';
import bcrypt from 'bcrypt';
import { stringify } from 'querystring';
import { exists } from 'fs';
import { GroupModel } from '../schemas/group';

class Action {
  public type: any;
  public payload: any;
  constructor(type: any, payload: any) {
    this.type = type;
    this.payload = payload;
  }
}
// validators for group
class Validators {
  public static exists = (data: any) => {
    if (data === 0) return true;
    return data ? true : false;
  };
  public static validateName = (
    oldGroupName: string | undefined,
    newGroupName: string | undefined
  ): {
    errors: Array<String>;
    actions: Array<Object>;
  } => {
    const errors = [],
      actions = [];
    if (newGroupName) {
      if (newGroupName.length < 5) {
        errors.push(constants.ERRORS.GROUP_UPDATE.NAME_TOO_SHORT);
      } else if (newGroupName.length > 100) {
        errors.push(constants.ERRORS.GROUP_UPDATE.NAME_TOO_LONG);
      } else if (oldGroupName !== newGroupName) {
        actions.push(
          new Action(constants.ACTIONS.GROUP.EDIT_NAME, newGroupName)
        );
      }
    }
    return { errors, actions };
  };
  public static validateDescription = (
    oldGroupDescription: string | undefined,
    newGroupDescription: string | undefined
  ): {
    errors: Array<String>;
    actions: Array<Object>;
  } => {
    const errors = [],
      actions = [];
    if (newGroupDescription && !oldGroupDescription) {
      if (newGroupDescription.length > 500) {
        errors.push(constants.ERRORS.GROUP_UPDATE.DESCRIPTION_TOO_LONG);
      } else {
        actions.push(
          new Action(
            constants.ACTIONS.GROUP.ADD_DESCRIPTION,
            newGroupDescription
          )
        );
      }
    } else if (!newGroupDescription && oldGroupDescription) {
      actions.push(constants.ACTIONS.GROUP.DELETE_DESCRIPTION, '');
    } else if (newGroupDescription !== oldGroupDescription) {
      if (newGroupDescription.length > 500) {
        errors.push(constants.ERRORS.GROUP_UPDATE.DESCRIPTION_TOO_LONG);
      } else {
        actions.push(
          new Action(
            constants.ACTIONS.GROUP.EDIT_DESCRIPTION,
            newGroupDescription
          ),
          newGroupDescription
        );
      }
    }
    return { errors, actions };
  };
  public static validatePassword = async (
    oldGroupPassword: string | undefined,
    newGroupPassword: string | undefined
  ): Promise<{
    errors: Array<String>;
    actions: Array<Object>;
  }> => {
    const errors = [],
      actions = [];
    if (!oldGroupPassword && newGroupPassword) {
      if (newGroupPassword.length < 8) {
        errors.push(constants.ERRORS.GROUP_UPDATE.PASSWORD_TOO_SHORT);
      } else if (newGroupPassword.length > 72) {
        errors.push(constants.ERRORS.GROUP_UPDATE.PASSWORD_TOO_LONG);
      } else {
        try {
          const newPassword = await bcrypt.hash(newGroupPassword, 10);
          actions.push(
            new Action(constants.ACTIONS.GROUP.ADD_PASSWORD, newPassword)
          );
        } catch (err) {
          errors.push(constants.ERRORS.GROUP_UPDATE.PASSWORD_INVALID);
        }
      }
    } else if (oldGroupPassword && !newGroupPassword) {
      actions.push(
        new Action(constants.ACTIONS.GROUP.DELETE_PASSWORD, undefined)
      );
    } else if (oldGroupPassword !== newGroupPassword) {
      if (newGroupPassword.length < 8) {
        errors.push(constants.ERRORS.GROUP_UPDATE.PASSWORD_TOO_SHORT);
      } else if (newGroupPassword.length > 72) {
        errors.push(constants.ERRORS.GROUP_UPDATE.PASSWORD_TOO_LONG);
      } else {
        try {
          const newPassword = await bcrypt.hash(newGroupPassword, 10);
          actions.push(constants.ACTIONS.GROUP.EDIT_PASSWORD, newPassword);
        } catch (err) {
          errors.push(constants.ERRORS.GROUP_UPDATE.PASSWORD_INVALID);
        }
      }
    }
    return { errors, actions };
  };
  public static validateUrlSuffix = async (
    oldGroupUrlSuffix: string | undefined,
    newGroupUrlSuffix: string | undefined
  ): Promise<{
    errors: Array<String>;
    actions: Array<Object>;
  }> => {
    const errors = [],
      actions = [];
    newGroupUrlSuffix = newGroupUrlSuffix.replace(/[^a-z0-9]/gi, '');
    if (newGroupUrlSuffix && oldGroupUrlSuffix) {
      if (newGroupUrlSuffix !== oldGroupUrlSuffix) {
        if (newGroupUrlSuffix.length < 3) {
          errors.push(constants.ERRORS.GROUP_UPDATE.URLSUFFIX_TOO_SHORT);
        } else if (newGroupUrlSuffix.length > 50) {
          errors.push(constants.ERRORS.GROUP_UPDATE.URLSUFFIX_TOO_LONG);
        } else {
          const duplicate = await GroupModel.find({
            urlSuffix: newGroupUrlSuffix
          })
            .lean()
            .exec();
          !duplicate
            ? actions.push(
                new Action(
                  constants.ACTIONS.GROUP.EDIT_URLSUFFIX,
                  newGroupUrlSuffix
                )
              )
            : errors.push(constants.ERRORS.GROUP_UPDATE.URLSUFFIX_DUPLICATE);
        }
      }
    }
    return { errors, actions };
  };

  public static validateAdminPermissions = (
    oldGroupAdminPermissions: Array<String> | undefined,
    newGroupAdminPermissions: Array<String> | undefined
  ): {
    errors: Array<String>;
    actions: Array<Object>;
  } => {
    const errors = [],
      actions = [];
    if (!arraysEqual(oldGroupAdminPermissions, newGroupAdminPermissions)) {
      let adminValidationErrors = false;
      for (const permission of oldGroupAdminPermissions) {
        console.log(permission);
        if (!constants.PERMISSIONS.GROUP.hasOwnProperty(String(permission))) {
          errors.push(
            constants.ERRORS.GROUP_UPDATE.PERMISSIONS_INVALID +
              '_' +
              constants.ROLES.ADMIN
          );
          adminValidationErrors = true;
          break;
        }
      }
      if (!adminValidationErrors) {
        actions.push(
          new Action(
            constants.ACTIONS.GROUP.EDIT_ADMIN_PERMISSIONS,
            newGroupAdminPermissions
          )
        );
      }
    }
    return { errors, actions };
  };
  public static validateSellerPermissions = (
    oldGroupSellerPermissions: Array<String> | undefined,
    newGroupSellerPermissions: Array<String> | undefined
  ): {
    errors: Array<String>;
    actions: Array<Object>;
  } => {
    const errors = [],
      actions = [];
    if (!arraysEqual(oldGroupSellerPermissions, newGroupSellerPermissions)) {
      let sellerValidationErrors = false;
      for (const permission of newGroupSellerPermissions) {
        if (!constants.PERMISSIONS.GROUP.hasOwnProperty(String(permission))) {
          sellerValidationErrors = true;
          errors.push(
            constants.ERRORS.GROUP_UPDATE.PERMISSIONS_INVALID +
              '_' +
              constants.ROLES.SELLER
          );
          break;
        }
      }
      if (!sellerValidationErrors) {
        actions.push(
          new Action(
            constants.ACTIONS.GROUP.EDIT_SELLER_PERMISSIONS,
            newGroupSellerPermissions
          )
        );
      }
    }
    return { errors, actions };
  };
  public static validateBuyerPermissions = (
    oldGroupBuyerPermissions: Array<String> | undefined,
    newGroupBuyerPermissions: Array<String> | undefined
  ): {
    errors: Array<String>;
    actions: Array<Object>;
  } => {
    const errors = [],
      actions = [];
    if (!arraysEqual(oldGroupBuyerPermissions, newGroupBuyerPermissions)) {
      let userValidationErrors = false;
      for (const permission of newGroupBuyerPermissions) {
        if (!constants.PERMISSIONS.GROUP.hasOwnProperty(String(permission))) {
          userValidationErrors = true;
          errors.push(
            constants.ERRORS.GROUP_UPDATE.PERMISSIONS_INVALID +
              '_' +
              constants.ROLES.BUYER
          );
          break;
        }
      }
      if (!userValidationErrors) {
        actions.push(
          new Action(
            constants.ACTIONS.GROUP.EDIT_BUYER_PERMISSIONS,
            newGroupBuyerPermissions
          )
        );
      }
    }
    return { errors, actions };
  };
  public static validateSettings = (
    oldGroupSettings: { priceLimit?: Number; defaultRole?: String } | undefined,
    newGroupSettings: { priceLimit?: Number; defaultRole?: String } | undefined
  ): {
    errors: Array<String>;
    actions: Array<Object>;
  } => {
    const errors = [],
      actions = [];
    if (
      newGroupSettings.priceLimit &&
      newGroupSettings.priceLimit !== oldGroupSettings.priceLimit
    ) {
      if (newGroupSettings.priceLimit === 0)
        newGroupSettings.priceLimit = Number.MAX_SAFE_INTEGER;
      if (newGroupSettings.priceLimit < 0)
        errors.push(constants.ERRORS.GROUP_UPDATE.SETTINGS_MIN_PRICE_TOO_LOW);
      else if (newGroupSettings.priceLimit > Number.MAX_SAFE_INTEGER)
        errors.push(constants.ERRORS.GROUP_UPDATE.SETTINGS_MIN_PRICE_TOO_HIGH);
      else {
        actions.push(
          new Action(
            constants.ACTIONS.GROUP.EDIT_SETTINGS_PRICE_LIMIT,
            newGroupSettings.priceLimit
          )
        );
      }
    }
    // validate default role
    if (
      newGroupSettings.defaultRole &&
      newGroupSettings.defaultRole !== oldGroupSettings.defaultRole
    ) {
      if (
        !constants.ROLES.hasOwnProperty(String(newGroupSettings.defaultRole)) ||
        newGroupSettings.defaultRole === constants.ROLES.OWNER
      ) {
        errors.push(constants.ERRORS.GROUP_UPDATE.SETTINGS_DEFAULTROLE_INVALID);
      } else {
        actions.push(
          new Action(
            constants.ACTIONS.GROUP.EDIT_SETTINGS_DEFAULT_ROLE,
            newGroupSettings.defaultRole
          )
        );
      }
    }
    return { errors, actions };
  };
  public static validateItems = (
    oldGroupItems: Array<String> | undefined,
    newGroupItems: Array<String> | undefined
  ): {
    errors: Array<String>;
    actions: Array<Object>;
  } => {
    const errors = [],
      actions = [];
    const deletedItems = arrayDiff(oldGroupItems, newGroupItems);
    const addedItems = arrayDiff(newGroupItems, oldGroupItems);
    console.log(addedItems, deletedItems);
    for (const item of deletedItems) {
      if (item && item.referenceId) {
        actions.push(
          new Action(constants.ACTIONS.GROUP.DELETE_ITEM, {
            referenceId: item.referenceId
          })
        );
      } else {
        errors.push(
          constants.ERRORS.GROUP_UPDATE.ITEM_DELETED_INVALID +
            '_' +
            JSON.stringify(item)
        );
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
        errors.push(
          constants.ERRORS.GROUP_UPDATE.ITEM_ADDED_INVALID +
            '_' +
            JSON.stringify(item)
        );
      }
    }
    return { errors, actions };
  };
  public static validateUsers = (
    oldGroupUsers: Array<String> | undefined,
    newGroupUsers: Array<String> | undefined
  ): {
    errors: Array<String>;
    actions: Array<Object>;
  } => {
    const errors = [],
      actions = [];
    const deletedUsers = arrayDiff(oldGroupUsers, newGroupUsers);
    for (const user of deletedUsers) {
      if (user && user.referenceId) {
        actions.push(
          new Action(constants.ACTIONS.GROUP.DELETE_USER, {
            referenceId: user.referenceId
          })
        );
      } else {
        errors.push(
          constants.ERRORS.GROUP_UPDATE.USER_DELETED_INVALID +
            '_' +
            JSON.stringify(user)
        );
      }
    }
    return { errors, actions };
  };
}

const groupUpdate = async (oldGroup: any, newGroup: any) => {
  const validationErrors: Array<String> = [],
    validationActions: Array<Object> = [];
  // oof. let's go.
  // validate name
  // define helper function
  const appendResults = ({
    errors,
    actions
  }: {
    errors: Array<String>;
    actions: Array<any>;
  }) => {
    if (errors.length > 0) validationErrors.push(...errors);
    if (actions.length > 0) validationActions.push(...actions);
  };
  if (Validators.exists(newGroup.name))
    appendResults(Validators.validateName(oldGroup.name, newGroup.name));
  if (Validators.exists(newGroup.description))
    appendResults(
      Validators.validateDescription(oldGroup.description, newGroup.description)
    );
  if (Validators.exists(newGroup.password))
    try {
      appendResults(
        await Validators.validatePassword(oldGroup.password, newGroup.password)
      );
    } catch (error) {
      validationErrors.push(error.message);
    }
  if (Validators.exists(newGroup.urlSuffix))
    try {
      appendResults(
        await Validators.validateUrlSuffix(
          oldGroup.urlSuffix,
          newGroup.urlSuffix
        )
      );
    } catch (err) {
      validationErrors.push(err.message);
    }
  if (Validators.exists(newGroup.permissions)) {
    if (Validators.exists(newGroup.permissions.admin)) console.log();
    appendResults(
      Validators.validateAdminPermissions(
        oldGroup.permissions.admin,
        newGroup.permissions.admin
      )
    );
    if (Validators.exists(newGroup.permissions.seller)) {
      const results = Validators.validateSellerPermissions(
        oldGroup.permissions.seller,
        newGroup.permissions.seller
      );
      appendResults(results);
    }
    if (Validators.exists(newGroup.permissions.buyer))
      appendResults(
        Validators.validateBuyerPermissions(
          oldGroup.permissions.buyer,
          newGroup.permissions.buyer
        )
      );
  }
  if (Validators.exists(newGroup.settings))
    appendResults(
      Validators.validateSettings(oldGroup.settings, newGroup.settings)
    );
  if (Validators.exists(newGroup.items))
    appendResults(Validators.validateItems(oldGroup.items, newGroup.items));
  if (Validators.exists(newGroup.users))
    appendResults(Validators.validateUsers(oldGroup.items, newGroup.items));
  console.log(oldGroup.settings.defaultRole === newGroup.settings.defaultRole);
  console.log({ errors: validationErrors, actions: validationActions });
  return { errors: validationErrors, actions: validationActions };
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
