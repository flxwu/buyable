import { UserModel } from '../schemas/user';

/**
 * Returns if user is duplicate
 * @param username user's handle
 * @param email user's email
 */
export const isUserDuplicate = async (username: string, email?: string) => {
  try {
    const docs = await UserModel.find(
      email ? { $or: [{ username }, { email }] } : { username }
    );
    if (!docs.length) return false;
    return true;
  } catch (err) {
    console.error(err);
    return true;
  }
};
