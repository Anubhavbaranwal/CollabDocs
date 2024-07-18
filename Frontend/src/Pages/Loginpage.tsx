import React, { useState } from 'react'
import useWindowSize from '../hooks/useWindowSize';
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
    const { widthStr, heightStr } = useWindowSize();
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErros] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [loading, setLoading] = useState(false);
//   const navigate=useNavigate();
  return (
    <div>Loginpage</div>
  )
}

export default Loginpage