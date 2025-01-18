import { useState } from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { authStore } from "../../../store/authStore";
import { errorHandler } from "../../../utils/errorHandler";
import Joi from "joi";
import { Bounce } from "react-activity";

export default function AdminLogin() {

  const {adminLogin, isAdminLoginLoading} = useAuth();

  const setLoginDetails = authStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const [isPasswordHidden, setPasswordHidden] = useState(true);

    const togglePasswordHidden = () => {
        setPasswordHidden(!isPasswordHidden);
    }

    const navigate = useNavigate();

    const loginButton = async () => {
        const { error } = Joi.object({
          email: Joi.string()
            .email({ tlds: { allow: ["com", "net"] } })
            .required()
            .messages({
              "string.email": "Kindly enter a valid email",
              "any.required": "Email field is required",
            }),
          password: Joi.string().alphanum().min(8).required().messages({
            "string.alphanum": "Your password has to contain letters and numbers",
            "string.min":
              "Your password is too short. Your password has to be 8 characters and above",
            "any.required": "Password field is required",
          }),
        }).validate({
          email,
          password,
        });
    
        if (error) {
          toast.error(error.message);
          return;
        }
    
        const response = await adminLogin({ email, password });
        console.log(response);
    
        if (response.data.status == 200) {
          toast.success("Login Successful");
    
          setLoginDetails({
            fullName: response.data.details.fullName,
            email: response.data.details.email,
            profilePicture: response.data.details.shopLogo,
            role: "shop",
            jwt: response.data.result,
          });
    
          navigate("/admin/dashboard");
        } else {
          toast.error("Login Error", errorHandler(response.error));
        }
      };

  return (
    <DefaultLayout withFooter={false}>
    <div className="w-full h-[calc(100vh_-_65px)] flex">
      <div className="h-full hidden md:block md:w-1/2 xl:w-[60%]">
        <img src="/wardrobe.jpg" className="h-full w-full" />
      </div>
      <div className="h-full w-full md:w-1/2 xl:w-[40%] flex justify-center items-center overflow-y-auto">
        <div className="w-[80%] lg:w-[65%] mx-auto">
          {/* <img
            src="/thraustlogo.png"
            className="h-[40px] w-[40px]"
            alt="Harltze Logo"
          /> */}
          <div className="mb-4 text-center font-bold text-[25px]" onClick={() => {navigate("/admin")}}>Admin Login</div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
                <label className="text-[14px]">Email</label>
                <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="E.g johndoe@gmail.com" className="border border-2 border-solid border-primary py-2 px-4 rounded-md" />
            </div>

            <div className="flex flex-col">
                <label className="text-[14px]">Password</label>
                <div className="border border-2 border-solid border-primary rounded-md flex items-center">
                <input value={password} onChange={(e) => {setPassword(e.target.value)}} type={isPasswordHidden ? "password" : "text"} className="w-full py-2 px-4" placeholder="********" />
                <button onClick={togglePasswordHidden} className="px-4">
                    {isPasswordHidden ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
                </button>
                </div>
            </div>

            <button className="bg-primary text-white py-4 w-full rounded-md font-bold" onClick={loginButton}>
                {isAdminLoginLoading ? <Bounce /> : "Login"}
            </button>
            <button onClick={() => {navigate("/register")}}>
                <small>Don't have an account? Register</small>
            </button>
          </div>
        </div>
      </div>
    </div>
    </DefaultLayout>
  );
}