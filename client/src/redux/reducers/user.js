import {
  ADD_USER,
  UPDATE_USER_SUCCEEDED,
  UPDATE_USER_FAILED,
  DELETE_USER_SUCCEEDED,
  DELETE_USER_FAILED,
  CHECK_USER_TRUE,
  CHECK_USER_FALSE,
  CHECK_USER_FAILED
} from "../actions/actionTypes";

const initialState = {
  user: null,
  loggedIn: false
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
    case UPDATE_USER_SUCCEEDED: {
      const { user } = action.payload;
      return {
        ...state,
        user
      };
    }
    case UPDATE_USER_FAILED: {
      const { message } = action.payload;
      return {
        ...state,
        error: message
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
      const { message } = action.payload;
      return {
        ...state,
        error: message
      };
    }
    case CHECK_USER_TRUE: {
      return {
        ...state,
        loggedIn: true
      };
    }
    case CHECK_USER_FALSE: {
      return {
        ...state,
        loggedIn: false
      };
    }
    case CHECK_USER_FAILED: {
      return {
        ...state,
        loggedIn: false
      };
    }

    default:
      return state;
  }
}
