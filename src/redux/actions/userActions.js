export const FETCH_USERS = 'FETCH_USERS';
export const ADD_USER = 'ADD_USER';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';
export const ADD_USER_TO_STORE='ADD_USER_TO_STORE'


export const fetchUsers = (users) => ({
  type: FETCH_USERS,
  payload: users,
});
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});
export const editUser = (user) => ({
  type: EDIT_USER,
  payload: user
});
export const addUserToStore = (user) => (
  {
  type: 'ADD_USER_TO_STORE',
  payload: user,
});

export const deleteUser = (id) => (
  {
  type: DELETE_USER,
  payload: id
});

