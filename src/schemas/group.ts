import { Document, Schema, Model, model } from 'mongoose';
import shortid from 'shortid';

import { IGroup } from '../interfaces/group';

export interface IGroupModel extends IGroup, Document {
  _id: any;
}

export const GroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: String,
  password: String,
  urlSuffix: { type: String, required: true },
  owner: { type: Object, required: true },
  permissions: { type: Object, required: true },
  settings: { type: Object, required: true },
  pictureURL: String,
  items: Array,
  users: { type: Array, required: true }
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

export const GroupModel: Model<IGroupModel> = model<IGroupModel>(
  'Group',
  GroupSchema
);
