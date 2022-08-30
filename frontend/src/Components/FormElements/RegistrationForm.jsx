import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./FormElements.css";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import MessageModal from "../UIElements/MessageModal";

const RegistrationForm = () => {
  const [registrationName, setRegistrationName] = useState("");
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let isValid = true;
    isValid =
      isValidEmail &&
      isMinLength(registrationName, 3) &&
      isMinLength(registrationPassword, 6);
    console.log(isValid);

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: registrationName,
          email: registrationEmail,
          password: registrationPassword,
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        //means I will have an error and it has a message property
        const error = responseData.message;
        clearInputs();
        setError(error);
        setIsLoading(false);
        console.log(error);
        return error;
      }
      clearInputs();
      setSuccess("Successful registration. Log in to continue.");
      setIsLoading(false);
      console.log(responseData);
      return responseData;
    } catch (err) {
      clearInputs();
      setIsLoading(false);
      console.log(err);
    }
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

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setSuccess(null);
  };

  const clearInputs = () => {
    setRegistrationName("");
    setRegistrationEmail("");
    setRegistrationPassword("");
    setIsValidEmail(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      ) : error ? (
        <MessageModal message={error} onClear={clearError} itIsAnError />
      ) : success ? (
        <MessageModal message={success} onClear={clearSuccess} />
      ) : (
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
      )}
    </>
  );
};

export default RegistrationForm;
