import { IUserReference } from '../../../interfaces/reference';

import { ItemModel, IItemModel } from '../../../schemas/item';
import { UserModel, IUserModel } from '../../../schemas/user';
import { IItem } from '../../../interfaces/item';

interface IController {
  newPOST: Function;
  GET: Function;
}

class Controller<IController> {
  public async newPOST(req: any, res: any, next: any): Promise<void> {
    const { name, description, price, amount, images } = req.body;
    const owner = req.user;

    // validate that user is logged in
    if (owner == null || owner._id == null) {
      res.status(401).json({ error: 'Please login to post new items!' });
      return;
    }

    // validate post body
    if (
      typeof name !== 'string' ||
      name.length > 50 ||
      (typeof description !== 'string' || description.length > 500) ||
      typeof price !== 'number' ||
      typeof amount !== 'number'
    ) {
      res.status(400).json({ error: 'Item form data invalid' });
      return;
    }

    const createItem = async () => {
      // TODO: deal with image blobs => upload to s3 and create array of urls

      const item: IItemModel = new ItemModel({
        name,
        description,
        price,
        amount,
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
    const isValidObjectId = id => id.match(/^[0-9a-fA-F]{24}$/);
    const id = req.query._id;
    if (isValidObjectId(id)) {
      const item = await ItemModel.findById(id);
      if (item) {
        res.status(200).json({ item });
      } else {
        res.status(404).json({ errors: ['NOT_FOUND'] });
      }
    } else {
      res.status(400).json({ errors: ['INVALID_ID'] });
    }
  }
}

export default Controller;
