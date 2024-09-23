import React, { useContext, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";

import "../styles/rootcomponent.css";
import { CardContextProvider } from "../contexts/card-context";
import { AppContext } from "../contexts/app-context";
import { Toast } from "./Toast";

export const RootComponent = () => {
  const { pageInfo, setPageInfo, toasts } = useContext(AppContext);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/") {
      setPageInfo({
        header: "Welcome to Active Recall",
        info: "",
      });
    } else if (location.pathname == "/signup") {
      setPageInfo({
        header: "Welcome to Active Recall",
        info: "Sign Up here",
      });
    } else if (location.pathname == "/signin") {
      setPageInfo({
        header: "Welcome to Active Recall",
        info: "Login here",
      });
    }
  }, [location]);

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
        {toasts && <Toast></Toast>}
      </div>
    </CardContextProvider>
  );
};
