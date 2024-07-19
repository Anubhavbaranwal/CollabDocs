import Loginpage from "../Component/Signin/Signin"
import Quote from "../Component/Quote/Quote"

const Login = () => {
  return (
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Loginpage />
        <div className="hidden lg:block">
         <Quote />
        </div>
      </div>
  
  )
}

export default Login