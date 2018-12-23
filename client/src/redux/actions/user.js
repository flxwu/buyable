import { ADD_USER, UPDATE_USER, DELETE_USER } from './actionTypes';

export const addUser = userData => ({
  type: ADD_USER,
  payload: { userData }
});

export const updateUser = userData => ({
  type: UPDATE_USER,
  payload: { userData }
});

export const deleteUser = () => ({
  type: DELETE_USER,
  payload: {}
});
