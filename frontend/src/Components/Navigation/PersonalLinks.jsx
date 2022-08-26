import React from "react";
import { NavLink } from "react-router-dom";

const PersonalLinks = () => {
  return (
    <ul className={"nav-mobile"}>
      <li>
        <NavLink to="/myPage">My page</NavLink>
      </li>

      <li>
        <NavLink to="/myVotes">My votes</NavLink>
      </li>
    </ul>
  );
};

export default PersonalLinks;
