import React from "react";
import { Navbar } from "./Navbar";
import { Dashboard } from "./Dashboard2";
import { Outlet } from "react-router-dom";
import { CardCreatorContextProvider } from "../contexts/card-creator-context";

export const RootComponent = () => {
  return (
    <CardCreatorContextProvider>
      <Navbar />
      <header>
        <h3>Welcome to</h3>
        <h1>Active Recall</h1>
      </header>
      <Outlet />
    </CardCreatorContextProvider>
  );
};
