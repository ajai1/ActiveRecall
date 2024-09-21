import React, { useContext, useEffect } from "react";

import "../../styles/flashcard/flashcard.css";

import { CardFront } from "./CardFront";
import { CardBack } from "./CardBack";
import { CardContext } from "../../contexts/card-context";

export const Card = ({ deckname, card }) => {
  const { flipCard, setDeckname, cardRecallState, currentCard } =
    useContext(CardContext);

  useEffect(() => {
    setDeckname(deckname);
  }, [deckname]);

  //To color the Recall state on the card
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
      <div className={`card ${flipCard ? "card_flip" : ""}`}>
        <div className={`card_front_container  ${getRecallStateStyle()}`}>
          <CardFront card={card} />
        </div>
        <div className={`card_back_container  ${getRecallStateStyle()}`}>
          <CardBack card={card} />
        </div>
      </div>
    </div>
  );
};
