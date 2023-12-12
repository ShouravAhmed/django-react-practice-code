import useAuth from "../hooks/userAuth";
import { Navigate, Outlet } from "react-router-dom";

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const PrivateOutlet = () => {
  const { authData } = useContext(AuthContext);
  const {authToken} = authData;
  
  return authToken != null ? <Outlet/> : <Navigate to='/login'/>;
}

