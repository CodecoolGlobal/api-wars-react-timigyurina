import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../HooksAndContext/auth-context";

const Navlinks = ({isMobile}) => {
  const auth = useContext(AuthContext);
  const openStatistics = () => {
    console.log("open stats modal");
  };

  return (
    <ul className={`nav-links ${isMobile && "nav-mobile"} `}>
      <li>
        <NavLink to="/">Planet List</NavLink>
      </li>
      {!auth.isLoggedIn && (
        <li>
          <button onClick={openStatistics}>Voting statistics</button>
        </li>
      )}
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
      {!auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default Navlinks;
