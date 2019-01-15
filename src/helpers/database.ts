import { UserModel } from '../schemas/user';

/**
 * Returns if user is duplicate
 * @param attributes attributes to check against, like usernames
 * @param keys object keys to map the attributes against, like ['username', 'email']
 */
export const isUserDuplicate = async (
  attributes: string | Array<string>,
  keys: string | Array<string>
): Promise<boolean> => {
  try {
    let docs;
    if (keys instanceof Array) {
      docs = await UserModel.find({
        $or: keys.map((k, i) => ({ [k]: attributes[i] }))
      });
    } else {
      docs = await UserModel.find({ [keys]: attributes });
    }
    if (!docs.length) return false;
    return true;
  } catch (err) {
    console.error(err);
    return true;
  }
};
