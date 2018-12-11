import { Document, Schema, Model, model } from 'mongoose';
import { IGroup } from '../interfaces/group';

export interface IGroupModel extends IGroup, Document {
	_id: any | string
}

export const GroupSchema: Schema = new Schema({
  name: String,
  items: Array,
  users: Array,
  admin: Object,
  settings: Object
});

GroupSchema.pre('save', function(next: any) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export const User: Model<IGroupModel> = model<IGroupModel>('User', GroupSchema);
