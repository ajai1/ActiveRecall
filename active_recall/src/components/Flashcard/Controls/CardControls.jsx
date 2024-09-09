import React, { useContext } from "react";
import { CanvasControls } from "./CanvasControls";

import "../../../styles/flashcard/controls/cardcontrols.css";
import { CardCreatorContext } from "../../../contexts/card-creator-context";

export const CardControls = () => {
  const { setIsAddCardDetails, setShowBackCard } =
    useContext(CardCreatorContext);
  return (
    <div className="card_control_container">
      <button onClick={() => setShowBackCard((prev) => !prev)}>FlipCard</button>
      <button onClick={() => setIsAddCardDetails((prev) => !prev)}>Save</button>
    </div>
  );
};
