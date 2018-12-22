import { Document, Schema, Model, model } from 'mongoose';
import shortid from 'shortid';

import { IGroup } from '../interfaces/group';

export interface IGroupModel extends IGroup, Document {
  _id: any;
}

export const GroupSchema: Schema = new Schema({
  name: String,
  description: String,
  password: String,
  urlSuffix: String,
  owner: Object,
  permissions: Object,
  settings: Object,
  pictureURL: String,
  items: Array,
  users: Array,
});

GroupSchema.pre('save', function(next: any) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  if (!this.urlSuffix) {
    this.urlSuffix = shortid.generate();
  }
  next();
});

export const GroupModel: Model<IGroupModel> = model<IGroupModel>('Group', GroupSchema);
