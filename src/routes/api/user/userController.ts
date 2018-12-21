import { UserModel, IUserModel } from '../../../schemas/user';
import bcrypt from 'bcrypt';
import validate from 'validate.js';
import { json } from 'body-parser';
interface IController {
    newPOST: Function;
    GET: Function;
}

class Controller<IController> {
    constructor() {}
    public async newPOST(req: any, res: any, next: any): Promise<void> {
        const {username, email, forename, surname} = req.body;
        let { password } = req.body;

        const createUser = async () => {
            try {
                console.log(await validate.async(password, {
                    key1: {length: {minimum: 8}},
                    key2: {length: {maximum: 72}}
                }));
            } catch (err) {
                throw err;
            }
          // TODO: deal with image blob => upload to s3 and create array of urls
            try {
                password = await bcrypt.hash(password, 10);
            } catch (err) {
                throw err;
            }
          const user: IUserModel = new UserModel({
            username: username,
            email: email,
            forename: forename,
            surname: surname,
            password: password
          });
          let result;
          try {
            result = password; // await user.save();
          } catch (err) {
            throw err;
          }
          return result;
        };
        try {
          const result = await createUser();
          res.status(200).json({user: result});
        } catch (err) {
          res.status(500).json({error: err.message});
        }
    }
    public GET(req: any, res: any, next: any): any {
        res.status(200);
        res.json({user: 'test'});
    }
}

export default Controller;