import React from "react";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";

export const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <Link className="nav_items" to={"/"}>
          Home
        </Link>
        <Link className="nav_items" to={"/deck-of-cards"}>
          Deck Of Cards
        </Link>
      </nav>
    </div>
  );
};
