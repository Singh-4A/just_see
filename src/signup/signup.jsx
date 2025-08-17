import React, { useState } from 'react';
import SignupApi from '../redux/Api/signupApi';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import './signup.css'
import usePassword from '../customHook/usePassword';

const Signup = () => {
  const [inputValue, setValue] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  let [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState("")
  const navigate = useNavigate();

  const inputData = [
    { label: 'Name', value: 'name', type: 'text' },
    { label: 'Age', value: 'age', type: 'number' },
    { label: 'Email', value: 'email', type: 'email' },
    { label: 'Password', value: 'password', type: 'password' },
    { label: 'Phone', value: 'phone', type: 'tel' },
  ];

  const validateForm = () => {
    const newErrors = {};
    for (const key in inputValue) {
      if (!inputValue[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handelSubmit = async () => {
    if (!validateForm()) return;
    setLoading("loading")
    const response = await SignupApi(inputValue);
    if (response.status === 201) {
      setLoading("")
      enqueueSnackbar(response?.data?.message, { variant: 'success' });
      localStorage.setItem('token', JSON.stringify(response?.data));
      setValue({ name: '', age: '', email: '', phone: '', password: '' });
      navigate('/home');
    } else {
      setLoading("")
      enqueueSnackbar(response.response?.data?.message || 'Signup failed', {
        variant: 'error',
      });
    }
  };

  return (
    <div
      style={{
        height: '90vh',
        backgroundColor: 'rgb(13 32 63)'

      }}
      className="flex items-center justify-center  px-4">
      <div style={{
        height: 500,
        overflow: 'auto',
      }} className=" signup bg-[#c8d6ee] p-6 rounded-2xl shadow-2xl w-full max-w-md ">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Signup</h1>

        {inputData.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              {item.label}
            </label>
            <div style={{
              position: 'relative'
            }}>
              <input
                className={`w-full px-4 py-2 rounded-lg border ${errors[item.value]
                  ? 'border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
                  } focus:outline-none`}
                placeholder={`Enter your ${item.value}`}
                type={showPassword ? "text" : item.type}
                name={item.value}
                value={inputValue[item.value]}
                onChange={onChangeHandler}
              />
              {
                item.label === "Password" ? usePassword(setShowPassword) : null
              }

            </div>

            {errors[item.value] && (
              <p className="text-red-500 text-sm mt-1">{errors[item.value]}</p>
            )}
          </div>
        ))}

        <button
          disabled={
            loading === "loading" 
          }
          onClick={handelSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-4 transition"
        >
          {
            loading !== "loading" && " Submit"
          }

          {
            loading === "loading" &&
            <div class="flex items-center justify-center ">
              <div class="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-white-500"></div>
            </div>
          }

        </button>
      </div>
    </div>
  );
};

export default Signup;
