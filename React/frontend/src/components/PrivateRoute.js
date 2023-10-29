import useAuth from "../hooks/userAuth";
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children  }) => {
  const auth = useAuth();
  return auth ? children : <Navigate to='/login'/>;
}
