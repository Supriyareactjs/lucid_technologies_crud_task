// saga
// sagas/userSaga.js
import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_USERS, ADD_USER, ADD_USER_TO_STORE, EDIT_USER, DELETE_USER, addUserToStore } from '../actions/userActions';
import { fetchUsers } from '../actions/userActions';
import { v4 as uuidv4 } from 'uuid';
let isApiCalled = false;
function* fetchUsersSaga() {
  const usersdata = yield select((state) => state.users);

  if (!usersdata || usersdata.length === 0) {
    try {
      const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users');
      yield put(fetchUsers(response.data));
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  } else {
    console.log("Users data is not empty, skipping fetching.");
  }
}

function* addUserSaga(action) {
  try {
    // Simulate async operation with setTimeout
    yield new Promise(resolve => setTimeout(resolve, 1000));
    // Dispatch an action to add the new user to the store
    yield put(addUserToStore(...action.payload));
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

function* editUserSaga(action) {
  yield new Promise(resolve => setTimeout(resolve, 1000));

}

function* deleteUserSaga(action) {
  yield new Promise(resolve => setTimeout(resolve, 1000));
}

function* userSaga() {
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(ADD_USER, addUserSaga);
  yield takeLatest(EDIT_USER, editUserSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);
}

export default userSaga;
