import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./FormElements.css";

const LoginForm = () => {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const isMinLength = (value, min) => { 
    let isValid = true
    isValid = value.trim().length >= min;
    return isValid
   }

  const login = (e) => {
    e.preventDefault();
  };

  return (
    <form className="login-form" onSubmit={login}>
      <TextField
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
        className="username"
        label="Username"
        placeholder="Enter your username"
        error={!isMinLength(loginName, 1)}
        helperText={!isMinLength(loginName, 1) && "Please enter your username"}
        variant="standard"
      />

      <TextField
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        className="userpassword"
        label="Password"
        placeholder="Enter your password"
        error={!isMinLength(loginPassword, 1)}
        helperText={!isMinLength(loginPassword, 1) && "Please enter your password"}
        variant="standard"
      />
      <Button
        type="submit"
        className="login-btn"
        disabled={!isMinLength(loginName, 1) || !isMinLength(loginPassword, 1)}
        variant="contained"
      >
        LOGIN
      </Button>
    </form>
  );
};

export default LoginForm;
