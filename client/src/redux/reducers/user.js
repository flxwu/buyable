import { ADD_USER, UPDATE_USER, DELETE_USER } from '../actions/actionTypes';

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
    case UPDATE_USER: {
      const { userData } = action.payload;
      return {
        ...state,
        user: userData
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        user: null
      };
    }
    default:
      return state;
  }
}
