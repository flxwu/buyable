import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user';
import bcrypt from 'bcrypt';
import { isUserDuplicate } from '../helpers/database';

export interface IUserModel extends IUser, Document {
  _id: any | string;
}

export const UserSchema: Schema = new Schema({
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
  createdAt: String
});

UserSchema.pre('save', async function(next: any) {
  const isDuplicate = await isUserDuplicate(
    [this.username, this.email],
    ['username', 'email']
  );
  if (!isDuplicate) {
    const now = new Date();
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
  } else {
    next(new Error('Username or email already exists'));
  }
});

UserSchema.methods.verifyPassword = async function verifyPassword(
  password: String
) {
  const matches = await bcrypt.compare(password, this.password);
  if (matches) {
    return true;
  }
  return false;
};

export const UserModel: Model<IUserModel> = model<IUserModel>(
  'User',
  UserSchema
);
