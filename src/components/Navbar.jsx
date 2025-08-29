import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-5 place-content-evenly text-3xl">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/pastes"}>Pastes</NavLink>
    </div>
  );
};

export default Navbar;
