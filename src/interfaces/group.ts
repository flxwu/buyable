import { IUserReference, IGroupMemberReference, IItemReference } from './reference';

export interface IGroup {
  _id: string;
  password: string;
  description: string;
  owner: IUserReference;
  permissions: IGroupPermissions;
  settings: IGroupSettings;
  pictureURL: string;
  items: Array<IItemReference>;
  users: Array<IGroupMemberReference>;
}

export interface IGroupPermissions {
  owner: Array<string>;
  admin: Array<string>;
  mod: Array<string>;
  user: Array<String>;
}
export interface IGroupSettings {
  public: boolean;
  priceLimit: number;
}