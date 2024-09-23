import React, { useContext } from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

import "../styles/rootcomponent.css";
import { CardContextProvider } from "../contexts/card-context";
import { AppContext } from "../contexts/app-context";

export const RootComponent = () => {
  const { pageInfo } = useContext(AppContext);

  return (
    <CardContextProvider>
      <Navbar />
      <div className="grid_container">
        <header className="grid_item">
          <h1>{pageInfo.header}</h1>
          <p>{pageInfo.info}</p>
        </header>
        <div className="grid_item">
          <Outlet />
        </div>
      </div>
    </CardContextProvider>
  );
};
