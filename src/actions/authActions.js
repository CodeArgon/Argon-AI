import { loginUser, logoutUser, fetchCurrentUser } from "../api/auth"; // Import your logic

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (data) => async (dispatch) => {
  const success = await loginUser(data);
  if (success) {
    const user = await fetchCurrentUser(); // Fetch current user details after login
    dispatch({ type: LOGIN, payload: user });
  }
};

export const logout = () => async (dispatch) => {
  await logoutUser();
  dispatch({ type: LOGOUT });
};
