import React, { useContext } from "react";
import { CanvasControls } from "./CanvasControls";

import "../../../styles/flashcard/controls/cardcontrols.css";
import { CardCreatorContext } from "../../../contexts/card-creator-context";

export const CardControls = () => {
  const {
    noOfCardsInThisDeck,
    cardId,
    setIsAddCardDetails,
    setCardId,
    setShowBackCard,
    isDeckShowMode,
    showBackCard,
    resetStates,
    setIsDeckShowMode,
  } = useContext(CardCreatorContext);

  const handleCardID = (type) => {
    resetStates();
    if (showBackCard) {
      setTimeout(() => {
        if (type == "prev") {
          setCardId((prev) => prev - 1);
        } else {
          setCardId((prev) => prev + 1);
        }
      }, 250);
    } else {
      if (type == "prev") {
        setCardId((prev) => prev - 1);
      } else {
        setCardId((prev) => prev + 1);
      }
    }
  };

  const deckShowControls = () => {
    return (
      <>
        {cardId > 0 && (
          <button onClick={() => handleCardID("prev")}>Prev</button>
        )}
        {cardId < noOfCardsInThisDeck - 1 && (
          <button onClick={() => handleCardID("next")}>Next</button>
        )}
      </>
    );
  };

  return (
    <div className="card_control_container">
      <button onClick={() => setShowBackCard((prev) => !prev)}>FlipCard</button>
      {isDeckShowMode ? (
        deckShowControls()
      ) : (
        <button onClick={() => setIsAddCardDetails((prev) => !prev)}>
          Save
        </button>
      )}
      <button onClick={() => setIsDeckShowMode(false)}>Go Back</button>
    </div>
  );
};
