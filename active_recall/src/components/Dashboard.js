import React from "react";
import { Card } from "./Flashcard/Card";
import "../styles/dashboard.css"


export const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <header>
        <h3>Welcome to</h3>
        <h1>Active Recall</h1>
      </header>
      <section className="card_section">
        <Card/>
      </section>
    </div>
  );
};
