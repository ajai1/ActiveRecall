import React, { useContext, useState, useEffect } from "react";

import "../../styles/flashcard/flashcard.css";

import { CardFront } from "./CardFront";
import { CardBack } from "./CardBack";
import { CardCreatorContext } from "../../contexts/card-creator-context";

export const Card = ({ deckName }) => {
  const { showBackCard, setDeckName, cardRecallState } =
    useContext(CardCreatorContext);
  useEffect(() => {
    setDeckName(deckName);
  }, [deckName]);

  const getRecallStateStyle = () => {
    if (cardRecallState == 1) {
      return "flashcard_container_green_shadow";
    }
    if (cardRecallState == 2) {
      return "flashcard_container_yellow_shadow";
    }
    if (cardRecallState == 3) {
      return "flashcard_container_red_shadow";
    }
    return "";
  };

  return (
    <div className={`flashcard_container`}>
      <div className={`card ${showBackCard ? "card_flip" : ""}`}>
        <div className={`card_front_container  ${getRecallStateStyle()}`}>
          <CardFront />
        </div>
        <div className={`card_back_container  ${getRecallStateStyle()}`}>
          <CardBack />
        </div>
      </div>
    </div>
  );
};
