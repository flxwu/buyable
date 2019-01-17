import {
  ADD_USER,
  UPDATE_USER_SUCCEEDED,
  UPDATE_USER_FAILED,
  DELETE_USER_SUCCEEDED,
  DELETE_USER_FAILED,
  CHECK_USER_SUCCEEDED,
  CHECK_USER_FAILED,
  GET_USER_GROUPS_FAILED,
  GET_USER_GROUPS_SUCCEEDED
} from '../actions/actionTypes';

const initialState = {
  user: null,
  loggedIn: null,
  groups: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      const { userData } = action.payload;
      return {
        ...state,
        user: userData,
        loggedIn: true
      };
    }
    default:
      return asyncReducers(action, state);
  }
}

const asyncReducers = (action, state) => {
  switch (action.type) {
    case UPDATE_USER_SUCCEEDED: {
      const { user } = action.payload;
      return {
        ...state,
        user
      };
    }
    case UPDATE_USER_FAILED: {
      const { errors } = action.payload;
      return {
        ...state,
        errors
      };
    }
    case DELETE_USER_SUCCEEDED: {
      return {
        ...state,
        user: null,
        loggedIn: false
      };
    }
    case DELETE_USER_FAILED: {
      const { errors } = action.payload;
      return {
        ...state,
        errors
      };
    }
    case CHECK_USER_SUCCEEDED: {
      const { loggedIn } = action.payload;
      return {
        ...state,
        loggedIn
      };
    }
    case CHECK_USER_FAILED: {
      return {
        ...state,
        loggedIn: false
      };
    }
    case GET_USER_GROUPS_SUCCEEDED: {
      const { groups } = action.payload;
      return {
        ...state,
        groups
      };
    }
    case GET_USER_GROUPS_FAILED: {
      return {
        ...state,
        groups: null
      };
    }
    default:
      return state;
  }
};
