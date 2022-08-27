import React, { useState } from "react";
import RegistrationForm from "../Components/FormElements/RegistrationForm";

const RegistrationPage = () => {


  return (
    <div className="registration-page">
      <h1 className="registration-title">Register</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
