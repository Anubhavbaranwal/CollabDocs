import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";



const AuthRoute = ({ element }) => {
  const data =useSelector((state) => state.auth);
  console.log(data);

  // useEffect(() => {
  //   refreshAccessToken();
  // }, [refreshAccessToken]);

  if (data.loadingAuth) {
    return <></>; // add loading spinner here
  } else {
    if (data.isAuthenticated) return element;
    else return <Navigate to="/login" />;
  }
};

export default AuthRoute;