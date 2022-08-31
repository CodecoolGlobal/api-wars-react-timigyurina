import React, { useState, useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../HooksAndContext/auth-context";
import VotingStatsComponent from "../../Pages/VotingStatsComponent";

const Navlinks = ({ isMobile }) => {
  const auth = useContext(AuthContext);

  return (
    <ul className={`nav-links ${isMobile && "nav-mobile"} `}>
      <li>
        <NavLink to="/">Planet List</NavLink>
      </li>
      <li>
        <VotingStatsComponent />
      </li>

      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/register">Registration</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default Navlinks;
