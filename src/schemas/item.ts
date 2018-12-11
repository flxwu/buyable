import { Document, Schema, Model, model } from 'mongoose';
import { IItem } from '../interfaces/item';

export interface IItemModel extends IItem, Document {
	_id: any | string
}

export const ItemSchema: Schema = new Schema({
  name: String,
  price: Number,
  imageURL: String
});

ItemSchema.pre('save', function(next: any) {
  let now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export const User: Model<IItemModel> = model<IItemModel>('User', ItemSchema);
