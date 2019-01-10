import axios from 'axios';
import bcrypt from 'bcrypt';

import { INPUTS, EXPECTED } from '../mocks/user';

const login = async (credentials: Object) =>
  await axios.post('/api/auth/login', credentials);

interface UserIDs {
  newUser1?: string;
  newUser2?: string;
}

const userIDs: UserIDs = {};

describe('[/user POST] Add new User', () => {
  it('should add a new user', async () => {
    const { data } = await axios.post('/api/user/new', INPUTS.newUser1);
    const createdUser = data.user;
    userIDs.newUser1 = createdUser._id;
    expect(createdUser).toMatchObject(EXPECTED.newUser1);
    expect(
      bcrypt.compare(createdUser.password, INPUTS.newUser1.password)
    ).toBeTruthy();
    expect(createdUser._id).toBeTruthy();
  });

  it('should add a new user with fore- and surname', async () => {
    const { data } = await axios.post('/api/user/new', INPUTS.newUser2);
    const createdUser = data.user;
    userIDs.newUser2 = createdUser._id;
    expect(createdUser).toMatchObject(EXPECTED.newUser2);
    expect(
      bcrypt.compare(createdUser.password, INPUTS.newUser2.password)
    ).toBeTruthy();
    expect(createdUser._id).toBeTruthy();
  });
});

describe('[/user POST] Fail to add user', () => {
  it('should fail because of duplicate name', async () => {
    try {
      await axios.post('/api/user/new', INPUTS.duplicateUser1);
    } catch ({ response }) {
      expect(response.status).toEqual(400);
      expect(response.data.error).toEqual('User already exists');
    }
  });

  it('should fail because of duplicate email', async () => {
    try {
      await axios.post('/api/user/new', INPUTS.duplicateUser2);
    } catch ({ response }) {
      expect(response.status).toEqual(400);
      expect(response.data.error).toEqual('User already exists');
    }
  });

  it('should fail because of duplicate name and email', async () => {
    try {
      await axios.post('/api/user/new', INPUTS.duplicateUser3);
    } catch ({ response }) {
      expect(response.status).toEqual(400);
      expect(response.data.error).toEqual('User already exists');
    }
  });
});

/* Has to run after /user POST */
describe('[/user UPDATE] Update user', () => {
  it('should return updated user object', async () => {
    await login(INPUTS.newUser1);
    const { data } = await axios.patch('/api/user', {
      _id: userIDs.newUser1,
      username: INPUTS.newUser1.username + 'Updated'
    });
    const updatedUser = data;
    expect(updatedUser).toMatchObject(EXPECTED.newUser1Updated);
    expect(
      bcrypt.compare(updatedUser.password, INPUTS.apiTest1.password)
    ).toBeTruthy();
  });

  it('should rehash user password', async () => {
    await login(INPUTS.newUser2);
    const newPassword = 'password';
    const { data } = await axios.patch('/api/user', {
      _id: userIDs.newUser2,
      password: newPassword
    });
    const updatedUser = data;
    expect(updatedUser).toMatchObject(EXPECTED.newUser2Updated);
    expect(
      bcrypt.compare(updatedUser.password, await bcrypt.hash(newPassword, 10))
    ).toBeTruthy();
  });
});

/* Has to run after /user UPDATE */
describe('[/user GET] Get user', () => {
  it('should return newUser1 user object', async () => {
    const { data } = await axios.get('/api/user?_id=' + userIDs.newUser1);
    expect(data).toMatchObject(EXPECTED.newUser1Updated);
  });
});

/* Has to run after /user POST */
describe('[/user DELETE] Delete user', () => {
  it('should delete jest-testuser1Updated', async () => {
    await login({
      ...INPUTS.newUser1,
      username: INPUTS.newUser1.username + 'Updated'
    });
    const { data } = await axios.delete('/api/user');
    expect(data).toBeDefined();
    expect(data).toMatchObject(EXPECTED.newUser1Updated);
  });

  it('should delete jest-testuser2', async () => {
    await login({ ...INPUTS.newUser2, password: 'password' });
    const { data } = await axios.delete('/api/user');
    expect(data).toBeDefined();
    expect(data).toMatchObject(EXPECTED.newUser2Updated);
  });
});
