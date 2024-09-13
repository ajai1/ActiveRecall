import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "../styles/Navbar.css";
import { CardCreatorContext } from "../contexts/card-creator-context";
import { CardContext } from "../contexts/card-context";

export const Navbar = () => {
  const { setEditMode, setCanvasMode } = useContext(CardContext);
  return (
    <div>
      <nav className="navbar">
        <Link
          className="nav_items"
          to={"/"}
          onClick={() => {
            setEditMode(false);
            setCanvasMode(false);
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
