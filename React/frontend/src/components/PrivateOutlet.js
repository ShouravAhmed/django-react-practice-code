import useAuth from "../hooks/userAuth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateOutlet = () => {
  const auth = useAuth();
  return auth ? <Outlet/> : <Navigate to='/login'/>;
}

