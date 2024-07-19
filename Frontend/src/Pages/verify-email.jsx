import {  useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth-service";
import axios from "axios";
import Toast from "../Component/Toast/Toast";

const VerifyEmail = () => {
  const { token } = useParams();
  const [children, setChildren] = useState(<>Loading...</>);

  const verifyEmail = async () => {
    if (token === undefined) {
      error("This token is invalid.");
      setChildren(<Navigate to="/login" />);
      return;
    }
    try {
      await AuthService.verifyEmail(token);

      Toast({
        title: "Successfully verified your email address!",
        message: "You may now login.",
        success:true,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        Toast({error:true,message:"An unknown error has occurred. Please try again"});
      } else {
        Toast({error:true,message:"An unknown error has occurred. Please try again"});
      }
    } finally {
      setChildren(<Navigate to="/login" />);
      return;
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return children;
};

export default VerifyEmail;