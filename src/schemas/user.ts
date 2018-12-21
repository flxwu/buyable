import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user';
import bcrypt from 'bcrypt';

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

UserSchema.pre('save', function(next: any) {
  const self = this;
  UserModel.find(
    { $or: [{ username: self.username }, { email: self.email }] },
    function(err, docs) {
      if (!docs.length) {
        const now = new Date();
        if (!this.createdAt) {
          this.createdAt = now.getTime();
        }
        next();
      } else {
        console.log('User exists: ', self.username);
        next(new Error('User exists!'));
      }
    }
  );
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
