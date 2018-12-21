import { Item } from '../../../schemas/item';
import { IUserReference } from '../../../interfaces/reference';

interface IController {
  newPOST: Function;
  GET: Function;
}

class Controller<IController> {
  public newPOST(req: any, res: any, next: any): any {
    const { name, description, images, price, groups } = req.body;
    const owner = req.session.profile.;
    const newItem = new Item({ name, description, price, groups, owner });
    newItem.save(err =>
      err
        ? console.error('Error while saving:', err)
        : console.log('Successfully saved ', newItem.name)
    );
  }

  public GET(req: any, res: any, next: any): any {
    res.status(200);
    res.json({ item: 'test' });
  }
}

export default Controller;
