import { TOGGLE_MODAL } from '../actions/actionTypes';

const initialState = {
  modal_id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL: {
      const { modalId } = action.payload;
      return {
        ...state,
        modal_id: modalId
      };
    }
    default:
      return state;
  }
}
