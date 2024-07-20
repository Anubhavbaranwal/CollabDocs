import Quote from "../Component/Quote/Quote";
import Register from "../Component/Signup/Signup";

const RegisterPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
    <Register />
    <div className="hidden lg:block">
     <Quote />
    </div> 
  </div>
  );
};

export default RegisterPage;
