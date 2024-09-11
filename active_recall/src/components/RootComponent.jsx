import React from "react";
import { Navbar } from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { CardCreatorContextProvider } from "../contexts/card-creator-context";

import "../styles/rootcomponent.css";

export const RootComponent = () => {
  const navigate = useNavigate();
  return (
    <CardCreatorContextProvider>
      <Navbar />
      <div className="grid_container">
        <header className="grid_item">
          <h3>Welcome to</h3>
          <h1>Active Recall</h1>
        </header>
        <div className="grid_item">
          <Outlet />
        </div>
        <footer className="grid_item">
          <div className="goback_btn" onClick={() => navigate(-1)}>
            Go Back
          </div>
        </footer>
      </div>
    </CardCreatorContextProvider>
  );
};
