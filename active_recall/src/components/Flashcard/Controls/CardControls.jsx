import React, { useContext } from "react";
import { CanvasControls } from "./CanvasControls";
import { useNavigate } from "react-router-dom";

import "../../../styles/flashcard/controls/cardcontrols.css";
import { CardCreatorContext } from "../../../contexts/card-creator-context";

export const CardControls = () => {
  const {
    setIsAddCardDetails,
    setShowBackCard,
    isDeckShowMode,
    setIsDeckShowMode,
  } = useContext(CardCreatorContext);

  const navigate = useNavigate();

  const goBack = () => {
    if (isDeckShowMode) {
      navigate("/deck-of-cards");
      setIsDeckShowMode(false);
    } else {
      navigate("/create");
    }
  };

  return (
    <div className="card_control_container">
      <button onClick={() => setShowBackCard((prev) => !prev)}>FlipCard</button>
      {!isDeckShowMode && (
        <button onClick={() => setIsAddCardDetails((prev) => !prev)}>
          Save
        </button>
      )}
      <button onClick={() => goBack()}>Go Back</button>
    </div>
  );
};
