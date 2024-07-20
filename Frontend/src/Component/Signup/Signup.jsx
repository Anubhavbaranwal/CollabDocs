import React, { useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import ApiClient from "../../../Config/ApiClient";
import AuthService from "../../../Service/AuthService";
import useAuth from "../../hooks/useAuth";
import Toast from "../Toast/Toast";

const Register = () => {
  const { widthStr, heightStr } = useWindowSize();
  const [emailErrors, setEmailErros] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const navigate=useNavigate();
  const [inputData, SetInputData] = useState({
    email: "",
    password: "",
  });
  const RegisterUser = async () => {
    setLoading(true);
    try {
      const response = await AuthService.Register(inputData);
      console.log(response);

      Toast({ success: true,  title: `Successfully registered ${email}!`,
        message: "Please check your inbox to verify your email address", });
      
      //   navigate("/document/create");
    } catch (err) {
      Toast({ error: true, message: err });
    } finally {
      setLoading(false);
    }
  };

  const handleOnKeyPress = (event) => {
    if (event.key === "Enter") RegisterUser();
  };

  const handleOnInputEmail = (value) => {
    setEmailErros([]);
    SetInputData({ ...inputData, email: value });
  };

  const handleOnInputPassword = (value) => {
    setPasswordErrors([]);
    SetInputData({ ...inputData, password: value })
  };

  return (
    <div className="flex flex-col justify-center items-center" onKeyDown={handleOnKeyPress}>
      <div className="w-1/2 gap-2">
        <h1 className="text-5xl text-center  mb-2">Register</h1>
        <h1 className="text-3xl text-center">New to CollabDocs</h1>
        <Input
          label="Email"
          type="text"
          placeHolder="Email"
          onChange={(e) => {
            handleOnInputEmail(e.target.value);
          }}
        />
        <Input
          label="Password"
          type="Password"
          placeHolder="Password"
          onChange={(e) => {
            handleOnInputPassword(e.target.value);
          }}
        />
        <p className="text-md text-center"> Already Have a Account !
             <Link to={"/login"} className="underline text-grey-200">Login</Link>
             </p>
        <button className="bg-blue-500 mt-4 text-white w-full p-2 rounded-md" onClick={()=>RegisterUser()}>
          Register
        </button>
      </div>
    </div>
  );
};
export default Register;
