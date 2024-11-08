export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER_ROLE = 'SET_USER_ROLE';

const initialState = {
  isAuthenticated: false,
  user: null,
  userRole: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        userRole: action.payload.role,
      };
    case LOGOUT:
      return initialState;
    case SET_USER_ROLE:
      return {
        ...state,
        userRole: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
