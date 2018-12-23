import { call, put, takeEvery } from 'redux-saga/effects';
import Api from './api';

// worker Saga: will be fired on UPDATE_USER_REQUESTED actions
function* updateUser(action) {
  try {
    const user = yield call(Api.updateUser, action.payload.userData);
    yield put({ type: 'UPDATE_USER_SUCCEEDED', user });
  } catch (e) {
    yield put({ type: 'UPDATE_USER_FAILED', message: e.message });
  }
}

// worker Saga: will be fired on DELETE_USER_REQUESTED actions
function* deleteUser(action) {
  try {
    const success = yield call(Api.deleteUser);
    if (!success) throw new Error('Updating user failed');
    yield put({ type: 'DELETE_USER_SUCCEEDED' });
  } catch (e) {
    yield put({ type: 'DELETE_USER_FAILED', message: e.message });
  }
}

/*
  Starts updateUser on each dispatched `UPDATE_USER_REQUESTED` action.
*/
function* apiSaga() {
  yield takeEvery('UPDATE_USER_REQUESTED', updateUser);
  yield takeEvery('DELETE_USER_REQUESTED', deleteUser);
}

export default apiSaga;
