import {
  ADD_USER,
  UPDATE_USER_SUCCEEDED,
  UPDATE_USER_FAILED,
  DELETE_USER_SUCCEEDED,
  DELETE_USER_FAILED
} from '../actions/actionTypes';

const initialState = {
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      const { userData } = action.payload;
      return {
        ...state,
        user: userData
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
        user: null
      };
    }
    case DELETE_USER_FAILED: {
      const { message } = action.payload;
      return {
        ...state,
        error: message
      };
    }
    default:
      return state;
  }
}
