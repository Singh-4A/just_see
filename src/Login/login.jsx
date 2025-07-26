import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../redux/Api/loginApi";
import { enqueueSnackbar } from "notistack";
import { HideEyeIcon, ShowEyeIcon } from "../svg";
import usePassword from "../customHook/usePassword";


function Login() {
  const [userValue, setUserValue] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: false, password: false });
  const [isShowPassword, setIsShowPassword] = useState(false)
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserValue((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    let valid = true;
    let tempErrors = {};

    if (!userValue.email.trim()) {
      tempErrors.email = true;
      valid = false;
    }

    if (!userValue.password.trim()) {
      tempErrors.password = true;
      valid = false;
    }

    setError(tempErrors);
    return valid;
  };

  const onSubmit = async () => {
    if (!validate()) return;

    const response = await LoginApi(userValue);
    if (response.status === 200) {
      enqueueSnackbar(response?.data?.message, { variant: "success" });
      localStorage.setItem("token", JSON.stringify(response?.data));
      navigate("/home");
    } else if (response.status === 401) {
      enqueueSnackbar(response?.response?.data?.message, { variant: "error" });
    }
  };



  return (
    <div style={{
      height: '90vh',
      backgroundColor: 'rgb(13 32 63)'

    }} className=" flex items-center justify-center  px-4">
      <div className=" w-full max-w-md bg-[#c8d6ee] rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 ">Login</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              ref={inputRef}
              type="email"
              name="email"
              value={userValue.email}
              onChange={onChangeHandler}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${error.email ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter your email"
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div style={{
              position: 'relative'
            }}>
              <input
                type={isShowPassword ? "text" : "password"}
                name="password"
                value={userValue.password}
                onChange={onChangeHandler}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${error.password ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter your password"
              />
              <div
              >

                {usePassword(setIsShowPassword)}

              </div>


            </div>


            {error.password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>

          <button
            onClick={onSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
