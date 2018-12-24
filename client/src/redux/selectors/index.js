import { MODAL_IDS } from '../../helpers/constants';

export const getCurrentUser = store => store.user.user;

export const getCurrentModalId = store => MODAL_IDS[store.modal_id];
