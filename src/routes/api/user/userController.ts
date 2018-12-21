import { UserModel, IUserModel } from '../../../schemas/user';
import bcrypt from 'bcrypt';
import validate from 'validate.js';
interface IController {
  newPOST: Function;
  GET: Function;
}

class Controller<IController> {
  constructor() {}
  public async newPOST(req: any, res: any, next: any): Promise<void> {
    const { username, email, forename, surname, password } = req.body;

    const createUser = async () => {
      console.log(
        await validate.async(password, {
          key1: { length: { minimum: 8 } },
          key2: { length: { maximum: 72 } }
        })
      );
      // TODO: deal with image blob => upload to s3 and create array of urls
      const hashedPassword = await bcrypt.hash(password, 10);
      const user: IUserModel = new UserModel({
        username,
        email,
        forename,
        surname,
        hashedPassword
      });
      return await user.save();
    };
    try {
      const createdUser = await createUser();
      req.session.user = createdUser;
      res.status(200).json({ user: createdUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  public GET(req: any, res: any, next: any): any {
    res.status(200);
    res.json({ user: 'test' });
  }
}

export default Controller;
