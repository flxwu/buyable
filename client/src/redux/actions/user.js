import {
  ADD_USER,
  UPDATE_USER_REQUESTED,
  DELETE_USER_REQUESTED
} from './actionTypes';

export const addUser = userData => ({
  type: ADD_USER,
  payload: { userData }
});

export const updateUser = userData => ({
  type: UPDATE_USER_REQUESTED,
  payload: { userData }
});

export const deleteUser = () => ({
  type: DELETE_USER_REQUESTED,
  payload: {}
});
