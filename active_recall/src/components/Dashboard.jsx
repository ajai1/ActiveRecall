import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();
  const dashboardNavigationHandler = (path) => {
    if (path == "create") {
      navigate("/create");
    } else if (path == "showdeck") {
      navigate("/deck-of-cards");
    }
  };
  return (
    <>
      <div
        className="dashboard_navs"
        onClick={() => dashboardNavigationHandler("create")}
      >
        Create Deck Of Cards
      </div>
      <div
        className="dashboard_navs"
        onClick={() => dashboardNavigationHandler("showdeck")}
      >
        Show Your Deck Of Cards
      </div>
    </>
  );
};
