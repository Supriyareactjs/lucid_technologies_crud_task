import { FETCH_USERS, ADD_USER, ADD_USER_TO_STORE, DELETE_USER, EDIT_USER } from '../actions/userActions';

const initialState = {
  users: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
      case EDIT_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
      )
      };
      case ADD_USER_TO_STORE:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case DELETE_USER:
      console.log(state.users);
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
      
    default:
      return state;
  }
};

export default userReducer;
