export const INPUTS = {
  newUser1: {
    username: 'jest-testuser1',
    password: 'jest-testuser1-password',
    email: 'jest-testuser1@api.com'
  },
  newUser2: {
    username: 'jest-testuser2',
    password: 'jest-testuser2-password',
    email: 'jest-testuser2@api.com',
    forename: 'jest',
    surname: 'test'
  },
  duplicateUser1: {
    username: 'jest-testuser1',
    password: 'jest-testuser1-password',
    email: 'jest-duplicate@api.com'
  },
  duplicateUser2: {
    username: 'jest-duplicate',
    password: 'jest-testuser1-password',
    email: 'jest-testuser1@api.com'
  },
  duplicateUser3: {
    username: 'jest-testuser1',
    password: 'jest-testuser1-password',
    email: 'jest-testuser1@api.com'
  },
  apiTest1: {
    username: 'apiTest1',
    email: 'apiTest1@api.com',
    password: 'password'
  }
};

export const EXPECTED = {
  newUser1: {
    username: 'jest-testuser1',
    email: 'jest-testuser1@api.com',
    items: [],
    groups: [],
    ownedGroups: [],
    __v: 0
  },
  newUser2: {
    username: 'jest-testuser2',
    email: 'jest-testuser2@api.com',
    forename: 'jest',
    surname: 'test',
    items: [],
    groups: [],
    ownedGroups: [],
    __v: 0
  },
  newUser1Updated: {
    username: 'jest-testuser1Updated',
    email: 'jest-testuser1@api.com',
    items: [],
    groups: [],
    ownedGroups: [],
    __v: 0
  },
  newUser2Updated: {
    username: 'jest-testuser2',
    email: 'jest-testuser2@api.com',
    forename: 'jest',
    surname: 'test',
    items: [],
    groups: [],
    ownedGroups: [],
    __v: 0
  },
  apiTest1: {
    username: 'apiTest1',
    email: 'apiTest1@api.com',
    items: [],
    groups: [],
    ownedGroups: [],
    __v: 0
  }
};
