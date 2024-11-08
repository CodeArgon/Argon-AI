import {
  useState,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from "react";
import authReducer, { LOGIN } from "./authReducer";
import { fetchCurrentUser } from "../helpers/users";

const initialState = {
  isAuthenticated: false,
  user: null,
  userRole: null,
};

export const ProtectRoutesContext = createContext();

export const useAuth = () => {
  return useContext(ProtectRoutesContext);
};

export const ProtectedRoutesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const currentUser = await fetchCurrentUser();
      if (currentUser) {
        console.log("Current User:", currentUser);
        dispatch({ type: LOGIN, payload: currentUser });
      }
      setLoading(false);
    };
    fetchUserRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectRoutesContext.Provider value={{ state, dispatch }}>
      {children}
    </ProtectRoutesContext.Provider>
  );
};
