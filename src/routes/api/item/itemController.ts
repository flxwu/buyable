import { IUserReference } from '../../../interfaces/reference';

import { ItemModel, IItemModel } from '../../../schemas/item';
import { IItem } from '../../../interfaces/item';

interface IController {
  newPOST: Function;
  GET: Function;
}

class Controller<IController> {

  public GET(req: any, res: any, next: any): any {
    res.status(200);
    res.json({ item: 'test' });
  }

  public async newPOST(req: any, res: any, next: any): Promise<void> {
    const {name, description, price, amount, owner, images} = req.body;
    const createItem = async () => {
      // TODO: deal with image blobs => upload to s3 and create array of urls
      // TODO: add user to item from session

      const item: IItemModel = new ItemModel({
        name: name,
        description: description,
        price: price,
        amount: amount,
        owner: {
          user: owner,
        }
      });
      let result;
      try {
        result = await item.save();
      } catch (err) {
        throw err;
      }
      return result;
    };
    try {
      const result = await createItem();
      res.status(200).json({item: result});
    } catch (err) {
      res.status(500).json({error: err});
    }


  }

  public get(req: any, res: any, next: any): any {
    ItemModel.findOne().then((r: IItemModel) => {
      res.status(200).json(r);
    });
  }
}

export default Controller;
