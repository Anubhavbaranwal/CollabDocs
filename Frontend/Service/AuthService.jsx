import ApiClient from "../Config/ApiClient";

const AuthService = {
    login:({email,password})=>{
        return ApiClient.post("/api/v1/user/login",{email,password});
    },
    Register:({email,password})=>{
        return ApiClient.post("/api/v1/user/register",{email,password});
    }
}
export default AuthService;