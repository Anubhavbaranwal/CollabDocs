import React, { useState } from 'react'
import useWindowSize from '../hooks/useWindowSize';
import { useNavigate } from "react-router-dom";
import Input from '../Component/Input/Input';

const Loginpage = () => {
  const { widthStr, heightStr } = useWindowSize();
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErros] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [loading, setLoading] = useState(false);
//   const navigate=useNavigate();
const [inputData,SetInputData] = useState({
    email:"",
    password:""
})


// const handleSubmit = async() =>{
//    try {
//      const res= await ApiClient.post("/api/v1/user/signin",inputData);
//         console.log(res.data.jwt);
//         localStorage.setItem("token",res.data.jwt);
//    } catch (error) {
    
//    }
// }

   
  return <div className="flex justify-center items-center">
    <div className="w-1/2 gap-2">
    <h1 className="text-3xl text-center">Welcome Back</h1>

    {/* <p className="text-md text-center"> New to Platform ! <Link to={"/signup"} className="underline text-grey-200">Signup</Link></p> */}
        <Input label="Email" type="text" placeHolder="Email" onChange={(c)=>{ SetInputData({...inputData,email:c.target.value})}}/>
        <Input label="Password" type="password" placeHolder="password" onChange={(c)=>{  SetInputData({...inputData,password:c.target.value})} }/>
        <button className="bg-blue-500 mt-4 text-white w-full p-2 rounded-md" >Login</button>
        </div>
  </div> 

}
export default Loginpage;