import { UPDATE_SEARCH_OPTIONS } from '../actions/actionTypes';
const initialState = {
  query: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCH_OPTIONS:
      return { ...state, query: action.payload };
    default:
      return state;
  }
}
