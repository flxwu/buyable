import axios from 'axios';
import bcrypt from 'bcrypt';

import { INPUTS, EXPECTED } from '../mocks/user';

describe('[/auth/login POST] Login registered User', () => {
  it('should successfully log in', async () => {
    const { data } = await axios.post('/api/auth/login', INPUTS.apiTest1);
    const loggedInUser = data.user;
    expect(loggedInUser).toMatchObject(EXPECTED.apiTest1);
    expect(
      bcrypt.compare(loggedInUser.password, INPUTS.apiTest1.password)
    ).toBeTruthy();
    expect(loggedInUser._id).toBeTruthy();
  });
});
