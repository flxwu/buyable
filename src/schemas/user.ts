import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user';

export interface IUserModel extends IUser, Document {
	_id: any | string
}

export const UserSchema: Schema = new Schema({
  name: String,
  items: Array
});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
