import { call, put, takeEvery } from 'redux-saga/effects';
import Api from './api';
import {
  CHECK_USER_REQUESTED,
  DELETE_USER_REQUESTED,
  UPDATE_USER_REQUESTED
} from '../actions/actionTypes';

// worker Saga: will be fired on UPDATE_USER_REQUESTED actions
function* updateUser(action) {
  try {
    const user = yield call(Api.updateUser, action.payload.userData);
    yield put({ type: 'UPDATE_USER_SUCCEEDED', payload: { user } });
  } catch ({ response }) {
    yield put({ type: 'UPDATE_USER_FAILED', errors: response.data.errors });
  }
}

// worker Saga: will be fired on DELETE_USER_REQUESTED actions
function* deleteUser(action) {
  try {
    console.log('in deleteUser saga');
    const success = yield call(Api.deleteUser);
    if (!success) throw new Error('Updating user failed');
    yield put({ type: 'DELETE_USER_SUCCEEDED' });
  } catch ({ response }) {
    yield put({ type: 'DELETE_USER_FAILED', errors: response.data.errors });
  }
}

function* checkUser(action) {
  try {
    const loggedIn = yield call(Api.isAuthenticated);
    yield put({ type: 'CHECK_USER_SUCCEEDED', payload: { loggedIn } });
  } catch ({ response }) {
    yield put({ type: 'CHECK_USER_FAILED', errors: response.data.errors });
  }
}

/*
  Starts updateUser on each dispatched `UPDATE_USER_REQUESTED` action.
*/
function* apiSaga() {
  console.log('in api saga');
  yield takeEvery(DELETE_USER_REQUESTED, deleteUser);
  yield takeEvery(CHECK_USER_REQUESTED, checkUser);
  yield takeEvery(UPDATE_USER_REQUESTED, updateUser);
}

export default apiSaga;
