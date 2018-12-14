import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user';

export interface IUserModel extends IUser, Document {
  _id: any | string;
}

export const UserSchema: Schema = new Schema({
  _id: String,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  forename: String,
  surname: String,
  items: Array,
  groups: Array,
  ownedGroups: Array,
});

UserSchema.pre('save', function(next: any) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
