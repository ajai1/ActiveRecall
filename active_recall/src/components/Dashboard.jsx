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
      <div className="dashboard_text_block">
        <div>
          <h3>This is a dev-in-progress application.</h3>
          <p>Intition is to create an app similar to Memrise or Anki</p>
          <p>Free hosting service used, please expect delay in response</p>
        </div>
        <div>
          <ul>
            <li>Spring Boot for Backend</li>
            <li>Spring Security for Basic Auth</li>
            <li>MongoDB for storage</li>
            <li>React Quill package for the Rich Text Editor</li>
            <li>React Router for routes</li>
            <li>Context hooks for state management</li>
          </ul>
        </div>
      </div>
    </>
  );
};
