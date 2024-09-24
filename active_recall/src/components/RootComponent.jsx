import React, { useContext, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";

import "../styles/rootcomponent.css";
import { CardContextProvider } from "../contexts/card-context";
import { AppContext } from "../contexts/app-context";
import { Toast } from "./Toast";
import Lottie from "lottie-react";
import loadingAnimation from "../static/lottie/loadingAnimation.json";

export const RootComponent = () => {
  const { pageInfo, setPageInfo, toasts, isLoading } = useContext(AppContext);

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
      {isLoading && (
        <div className="lottie_container">
          <div>
            <Lottie
              loop
              animationData={loadingAnimation}
              style={{ width: "10rem" }}
            ></Lottie>
            <h2>Loading...</h2>
          </div>
        </div>
      )}
      <div className="root_container" style={{ overflow: "hidden" }}>
        <div className="grid_container">
          <header style={{ marginTop: "2rem" }} className="grid_item">
            <h1>{pageInfo.header}</h1>
            <p style={{ margin: "auto" }}>{pageInfo.info}</p>
          </header>
          <div className="grid_item" style={{ marginTop: "1rem" }}>
            <Outlet />
          </div>
        </div>
        {toasts && <Toast></Toast>}
      </div>
    </CardContextProvider>
  );
};
