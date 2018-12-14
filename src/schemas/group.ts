import { Document, Schema, Model, model } from 'mongoose';
import { IGroup } from '../interfaces/group';

export interface IGroupModel extends IGroup, Document {
  _id: any | string;
}

export const GroupSchema: Schema = new Schema({
  _id: String,
  password: String,
  description: String,
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
  next();
});

export const User: Model<IGroupModel> = model<IGroupModel>('User', GroupSchema);
