import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./FormElements.css";

const RegistrationForm = () => {
  const [registrationName, setRegistrationName] = useState("");
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const register = (e) => {
    e.preventDefault();
    let isValid = true
    isValid =
      isValidEmail &&
      isMinLength(registrationName, 3) &&
      isMinLength(registrationPassword, 6) 
      console.log(isValid);
  };

  const isMinLength = (value, min) => {
    let isValid = true;
    isValid = value.trim().length >= min;
    return isValid;
  };

  const validateEmail = (value) => {
    let isValid = true;
    isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    return isValid;
  };

  const emailInputHandler = (e) => {
    setRegistrationEmail(e.target.value);
    const isValid = validateEmail(e.target.value);
    setIsValidEmail(isValid);
  };

  return (
    <form className="registration-form" onSubmit={register}>
      <TextField
        value={registrationName}
        onChange={(e) => setRegistrationName(e.target.value)}
        className="username"
        label="Name"
        placeholder="Write your name here"
        error={!isMinLength(registrationName, 3)}
        helperText={
          !isMinLength(registrationName, 3) &&
          "Your username should be at least 3 characters long"
        }
        variant="standard"
      />

      <TextField
        value={registrationEmail}
        onChange={emailInputHandler}
        className="useremail"
        label="Email"
        placeholder="Write your email here"
        error={!isValidEmail}
        helperText={!isValidEmail && "Wrong email format"}
        variant="standard"
      />

      <TextField
        value={registrationPassword}
        onChange={(e) => setRegistrationPassword(e.target.value)}
        className="userpassword"
        label="Password"
        placeholder="Enter your password"
        error={!isMinLength(registrationPassword, 6)}
        helperText={
          !isMinLength(registrationPassword, 6) &&
          "Your password should be at least 6 characters long"
        }
        variant="standard"
      />
      <Button
        type="submit"
        className="register-btn"
        disabled={
          !isMinLength(registrationName, 3) ||
          !isMinLength(registrationPassword, 6) ||
          !isValidEmail
        }
        variant="contained"
      >
        REGISTER
      </Button>
    </form>
  );
};

export default RegistrationForm;
