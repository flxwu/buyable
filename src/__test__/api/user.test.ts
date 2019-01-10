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
    expect(createdUser).toMatchObject(EXPECTED.newUser1);
    expect(
      bcrypt.compare(createdUser.password, INPUTS.newUser1.password)
    ).toBeTruthy();
    expect(createdUser._id).toBeTruthy();
  });

  it('should add a new user with fore- and surname', async () => {
    const { data } = await axios.post('/api/user/new', INPUTS.newUser2);
    const createdUser = data.user;
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

describe('[/user GET] Get user', () => {
  it('should return user object', async () => {});
});
