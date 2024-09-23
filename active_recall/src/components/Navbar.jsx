import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Navbar.css";
import { CardContext } from "../contexts/card-context";
import { UserContext } from "../contexts/user-context";
import { useAuthFetch } from "../hooks/authorization";
import { ENDPOINTS, HEADERS } from "../constants/apiConstants";

export const Navbar = () => {
  const { setEditMode, setCanvasMode, setError } = useContext(CardContext);
  const { userCreds, setUserCreds } = useContext(UserContext);

  const navigate = useNavigate();

  const authFetch = useAuthFetch();

  const signOut = () => {
    const url = ENDPOINTS.USERS.SIGNOUT.endpoint();
    authFetch(url, {
      method: ENDPOINTS.USERS.SIGNOUT.method,
      headers: HEADERS,
    })
      .then((response) => {
        console.log("LOGGED OUT");
        setEditMode(false);
        setCanvasMode(false);
        setUserCreds(null);
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error);
        setError("Logout API call failed.");
      });
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav_items_container">
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
        </div>
        <div className="nav_items_container">
          <Link
            className="nav_items"
            to={"/signup"}
            onClick={() => {
              setEditMode(false);
              setCanvasMode(false);
            }}
          >
            Sign up
          </Link>
          {userCreds ? (
            <Link className="nav_items" onClick={signOut}>
              Sign Out
            </Link>
          ) : (
            <Link
              className="nav_items"
              to={"/signin"}
              onClick={() => {
                setEditMode(false);
                setCanvasMode(false);
              }}
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};
