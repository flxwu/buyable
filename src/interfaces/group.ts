import {
  IUserReference,
  IGroupMemberReference,
  IItemReference
} from './reference';

export interface IGroup {
  _id: string;
  name: string;
  description: string;
  password: string;
  urlSuffix: string;
  owner: IUserReference;
  permissions: IGroupPermissions;
  settings: IGroupSettings;
  pictureURL: string;
  items: Array<IGroupItem>;
  users: Array<IGroupMemberReference>;
}

export interface IGroupPermissions {
  owner: Array<string>;
  admin: Array<string>;
  seller: Array<string>;
  user: Array<String>;
}

export interface IGroupSettings {
  public: boolean;
  priceLimit: number;
}

export interface IGroupItem extends IItemReference {
  addedAt: Number;
  ownerRole: string;
}
