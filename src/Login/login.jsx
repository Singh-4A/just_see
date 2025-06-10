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
        <h4 style={{ textAlign: "center", color: "aqua" }}>Login Form</h4>
        <hr className="hrLine" />
        <div className="input_box">
          <input
            ref={inputRef}
            value={userValue.name}
            name="name"
            placeholder="Please type here name"
            onChange={onChangeHandler}
            style={{
              border: error.nameError && "2px solid red",
            }}
          />
          {error.nameError && "Required"}
          <input
            style={{
              border: error.ageError && "2px solid red",
            }}
            value={userValue.age}
            name="age"
            placeholder="Please type here age"
            onChange={onChangeHandler}
          />
          {error.ageError && "Required"}

          <input
            value={userValue.email}
            name="email"
            placeholder="Please type here email"
            onChange={onChangeHandler}
          />
          <input
            value={userValue.phone}
            name="phone"
            placeholder="Please type here phone"
            onChange={onChangeHandler}
            style={{
              border: error.phoneError && "2px solid red",
            }}
          />
          {error.phoneError && "Required"}
        </div>
        <div onClick={onSubmit} className="login_button">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
