import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";
import { CardCreatorContext } from "../contexts/card-creator-context";

export const Navbar = () => {
  const { setIsDeckShowMode } = useContext(CardCreatorContext);
  return (
    <div>
      <nav className="navbar">
        <Link
          className="nav_items"
          to={"/"}
          onClick={() => {
            setIsDeckShowMode(false);
          }}
        >
          Home
        </Link>
        <Link className="nav_items" to={"/deck-of-cards"}>
          Deck Of Cards
        </Link>
      </nav>
    </div>
  );
};
