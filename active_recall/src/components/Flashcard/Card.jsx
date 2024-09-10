import React, { useContext, useState, useEffect } from "react";

import "../../styles/flashcard/flashcard.css";

import { CardFront } from "./CardFront";
import { CardBack } from "./CardBack";
import { CardCreatorContext } from "../../contexts/card-creator-context";

export const Card = ({ deckName }) => {
  const { showBackCard, setDeckName } = useContext(CardCreatorContext);
  useEffect(() => {
    setDeckName(deckName);
  }, [deckName]);
  return (
    <div className="flashcard_container">
      <div className={`card ${showBackCard ? "card_flip" : ""}`}>
        <div className="card_front_container">
          <CardFront />
        </div>
        <div className="card_back_container">
          <CardBack />
        </div>
      </div>
    </div>
  );
};
