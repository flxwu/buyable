import { TOGGLE_MODAL } from './actionTypes';

export const toggleModal = modalId => ({
  type: TOGGLE_MODAL,
  payload: {
    modalId
  }
});
