import { GroupModel, IGroupModel } from '../../../schemas/group';

interface IController {
  newPOST: Function;
}

class Controller<IController> {
  public async newPOST(req: any, res: any, next: any): Promise<any> {
    const {
      name,
      description,
      urlSuffix,
      permissions,
      settings,
      pictureURL,
      defaultRole,
      items
    } = req.body;
    const owner = { referenceId: req.user._id };
    const users = [owner];
    // TODO: Validation
    // TODO: Upload image to s3 and create url
    const duplicate = await GroupModel.findOne({ urlSuffix }).exec();
    if (settings.priceLimit === 0)
      settings.priceLimit = Number.MAX_SAFE_INTEGER;
    if (!duplicate) {
      try {
        const newGroup: IGroupModel = new GroupModel({
          name,
          description,
          urlSuffix,
          permissions,
          settings,
          pictureURL,
          owner,
          users,
          defaultRole,
          items
        });
        await newGroup.save();
        res.status(201).json({
          group: {
            name,
            description,
            urlSuffix,
            defaultRole,
            permissions,
            settings,
            pictureURL,
            owner,
            users,
            items
          }
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.status(500).json({ error: 'Group already exists' });
    }
  }

  public async get(req: any, res: any, next: any): Promise<any> {
    res.status(200);
    const { _id } = req.query;
    try {
      const group = await GroupModel.findById(_id).exec();
      res.send(group);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default Controller;
