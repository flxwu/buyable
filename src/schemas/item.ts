import { Document, Schema, Model, model } from 'mongoose';
import { IItem } from '../interfaces/item';

export interface IItemModel extends IItem, Document {
  _id: string;
}

export const ItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true
  },
  imageURLs: Array,
  amount: {
    type: Number,
    required: true
  },
  groups: Array,
  owner: {
    type: Object,
    required: true
  }
});

ItemSchema.pre('save', function(next: any) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export const ItemModel: Model<IItemModel> = model<IItemModel>(
  'Item',
  ItemSchema
);
