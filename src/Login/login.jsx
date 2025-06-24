import React, { useEffect, useRef, useState } from "react";
import "./login.css";
function Login() {
  const [userValue, setUserValue] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  const [effect, setEffect] = useState(false);
  const [error, setError] = useState({
    nameError: false,
    ageError: false,
    phoneError: false,
  });
  const inputRef = useRef(null);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setUserValue({ ...userValue, [name]: value });
    setError(false);
  };

  const onSubmit = () => {
    const errors = {};

    if (!userValue.name || userValue.name.trim().length === 0) {
      errors.nameError = true;
    }

    if (!userValue.age || userValue.age.trim().length === 0) {
      errors.ageError = true;
    }

    if (!userValue.phone || userValue.phone.trim().length === 0) {
      errors.phoneError = true;
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      localStorage.setItem("userData", JSON.stringify(userValue));
      window.open("/home");
    }
  };



  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  return (
    <div className="form_container">
      <div className="form_box" onMouseEnter={() => setEffect(true)}>
        <h4 style={{ textAlign: "center", color: "aqua", padding: 10 }}>Login Form</h4>
        <hr className="hrLine" />
        <div className="input_box">
          <input
            ref={inputRef}
            className="border border-blue-700 rounded-full  px-2 py-1 w-full"
            value={userValue.name}
            name="name"
            placeholder="Please type here name"
            onChange={onChangeHandler}
            style={{
              border: error.nameError && "2px solid red",
            }}
          />
          {error.nameError && <h1 style={{
            color: 'red'
          }}> Required</h1>}
          <input
            className="border border-blue-700 rounded-full  px-2 py-1 w-full"
            style={{
              border: error.ageError && "2px solid red",
            }}
            value={userValue.age}
            name="age"
            placeholder="Please type here age"
            onChange={onChangeHandler}
          />
          {error.ageError && <h1 style={{
            color: 'red'
          }}> Required</h1>}

          <input
            className="border border-blue-700 rounded-full  px-2 py-1 w-full"
            value={userValue.email}
            name="email"
            placeholder="Please type here email"
            onChange={onChangeHandler}
          />
          <input
            value={userValue.phone}
            className="border border-blue-700 rounded-full  px-2 py-1 w-full"
            name="phone"
            placeholder="Please type here phone"
            onChange={onChangeHandler}
            style={{
              border: error.phoneError && "2px solid red",
            }}
          />
          {error.phoneError && <h1 style={{
            color: 'red'
          }}>Required</h1>}
        </div>
        <div onClick={onSubmit} className="login_button">
          <button className="border border-blue-700 rounded-[10px]  w-[100px] py-1">Login</button>
        </div>
      </div>
    </div >
  );
}

export default Login;
