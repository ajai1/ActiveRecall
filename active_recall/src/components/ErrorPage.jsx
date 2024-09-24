import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../contexts/card-context";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const { error, setError } = useContext(CardContext);

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  return (
    <div>
      <h1> Opps! Something went wrong </h1>
      <p>{error}</p>
      <h4>Things you can do to resolve</h4>
      <ul style={{ textAlign: "left" }}>
        <li>Check your network connection</li>
        <li>Close and relaunch / refresh the page</li>
        <li>Check with the admin to see if any backend api is failing</li>
        <li>
          If you are a developer, check the console for error logs or Network
          tab to check responses
        </li>
      </ul>
      <button className="goback_btn" onClick={() => navigate("/")}>
        Go back to Home
      </button>
    </div>
  );
};
