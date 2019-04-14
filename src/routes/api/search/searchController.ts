import { IItem } from '../../../interfaces/item';
import { ItemModel as Item } from '../../../schemas/item';

class SearchController {
  // TODO: everything
  async GET(req: any, res: any) {
    const { name } = req.query;
    if (name) {
      // need to check all params
      console.log(name);
      const results = await Item.find({
        name: { $regex: name, $options: 'i' }
      }).lean();
      res.json({ results });
    } else {
      res.status(400).json({ error: 'Invalid Search Params' });
    }
  }
}

export default SearchController;
