import { IUserReference } from '../../../interfaces/reference';

import { ItemModel, IItemModel } from '../../../schemas/item';
import { UserModel, IUserModel } from '../../../schemas/user';
import { IItem } from '../../../interfaces/item';
import { validationResult } from 'express-validator/check';

import { uploadImages } from '../../../helpers/api';

interface IController {
  newPOST: Function;
  GET: Function;
  UPDATE: Function;
  DELETE: Function;
}

class Controller<IController> {
  public async newPOST(req, res, next, s3): Promise<void> {
    const { name, description, price, amount, images } = req.body;
    const owner = req.user;

    // validate that user is logged in
    if (owner == null || owner._id == null) {
      res.status(401).json({ error: 'Please login to post new items!' });
      return;
    }
    const errors = validationResult(req);
    // validate post body
    if (!errors.isEmpty()) {
      console.log(req.body);
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const createItem = async () => {
      const imageURLs = uploadImages(s3, owner._id, images);
      const item: IItemModel = new ItemModel({
        name,
        description,
        price,
        amount,
        imageURLs,
        owner: {
          referenceId: owner._id
        }
      });
      let result;

      try {
        result = await item.save();
        const update = { $push: { items: { referenceId: result._id } } };
        const newUser = await UserModel.findByIdAndUpdate(
          req.user._id,
          update,
          { new: true }
        ).exec();
        req.user = newUser;
      } catch (err) {
        throw err;
      }
      return result;
    };
    try {
      const result = await createItem();
      res.status(200).json({ item: result });
    } catch (errors) {
      res.status(500).json({ errors });
    }
  }

  public async GET(req: any, res: any, next: any): Promise<any> {
    if (!req.user || !req.user._id) {
      res.status(401).json({ error: 'Unauthorized!' });
      return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const id = req.query._id;
    const item = await ItemModel.findById(id);
    if (item) {
      res.status(200).json({ item });
    } else {
      res.status(404).json({ errors: ['NOT_FOUND'] });
    }
  }
  public async DELETE(req: any, res: any, next: any): Promise<any> {
    if (!req.user || !req.user._id) {
      res.status(401).json({ error: 'Unauthorized!' });
      return;
    }
    const { _id } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const item = await ItemModel.findByIdAndRemove(_id);
      res.status(200).json({ message: item ? 'OK' : 'NOT_FOUND' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  public async UPDATE(req: any, res: any, next: any): Promise<any> {
    if (!req.user || !req.user._id) {
      res.status(401).json({ error: 'Unauthorized!' });
      return;
    }
    const { name, description, price, amount } = req.body.item;
    const update = {
      name: name,
      description: description,
      price: price,
      amount: amount
    };
    const { _id } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      await ItemModel.findByIdAndUpdate(_id, update);
      res.status(200).json({ message: 'OK' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default Controller;
