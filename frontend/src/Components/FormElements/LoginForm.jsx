import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import MessageModal from "../UIElements/MessageModal";
import "./FormElements.css";
import { AuthContext } from "../../HooksAndContext/auth-context";

const LoginForm = () => {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const isMinLength = (value, min) => {
    let isValid = true;
    isValid = value.trim().length >= min;
    return isValid;
  };

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: loginName,
          password: loginPassword,
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
      setSuccess("You are now logged in");
      setIsLoading(false);
      console.log(responseData);

      auth.login(responseData.userId, responseData.username, responseData.token);
      return responseData;
    } catch (err) {
      clearInputs();
      setIsLoading(false);
      console.log(err);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setSuccess(null);
    navigate("/", { replace: true });
  };

  const clearInputs = () => {
    setLoginName("");
    setLoginPassword("");
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
        <MessageModal message={success} onClear={clearSuccess} buttonText="Go to list of planets"/>
      ) : (
        <form className="login-form" onSubmit={login}>
          <TextField
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            className="username"
            label="Username"
            placeholder="Enter your username"
            error={!isMinLength(loginName, 1)}
            helperText={
              !isMinLength(loginName, 1) && "Please enter your username"
            }
            variant="standard"
          />

          <TextField
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="userpassword"
            label="Password"
            placeholder="Enter your password"
            error={!isMinLength(loginPassword, 1)}
            helperText={
              !isMinLength(loginPassword, 1) && "Please enter your password"
            }
            variant="standard"
          />
          <Button
            type="submit"
            className="login-btn"
            disabled={
              !isMinLength(loginName, 1) || !isMinLength(loginPassword, 1)
            }
            variant="contained"
          >
            LOGIN
          </Button>
        </form>
      )}
    </>
  );
};

export default LoginForm;
