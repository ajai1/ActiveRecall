import React from "react";
import { Card } from "./Flashcard/Card";
import "../styles/dashboard.css"
import { CardControls } from "./Flashcard/Controls/CardControls";
import { CreateFlashCard } from "./CreateFlashCard/CreateFlashCard";


export const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <header>
        <h3>Welcome to</h3>
        <h1>Active Recall</h1>
      </header>
     <CreateFlashCard></CreateFlashCard>
    </div>
  );
};
