import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardCreatorContext } from "../../contexts/card-creator-context";
import { Card } from "../Flashcard/Card";
import { CardControls } from "../Flashcard/Controls/CardControls";
import "../../styles/flashcard/controls/cardcontrols.css";
import "../../styles/flashcard/flashcard.css";

import PrevActive from "../../static/icons/prev_active.png";
import NextActive from "../../static/icons/next_active.png";
import PrevDisabled from "../../static/icons/prev_disabled.png";
import NextDisabled from "../../static/icons/next_disabled.png";
import { RecallControls } from "../Flashcard/Controls/recallControls";

export const ShowSelectedDeck = () => {
  const {
    cardId,
    deckName,
    noOfCardsInThisDeck,
    setDeckName,
    setCardId,
    setIsDeckShowMode,
    showBackCard,
    resetStates,
  } = useContext(CardCreatorContext);

  const param = useParams();

  useEffect(() => {
    setDeckName(param.deck_id);
    setIsDeckShowMode(true);
  }, [param.deck_id, param.card_id]);

  const handleCardID = (type) => {
    if (cardId >= noOfCardsInThisDeck - 1 && type == "next") return;
    if (cardId == 0 && type == "prev") return;
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

  return (
    <div className="deck_card_container">
      <div className="deck_card">
        <div
          className={`deck_navigate_control`}
          onClick={() => handleCardID("prev")}
        >
          <img
            width={"30px"}
            src={cardId == 0 ? PrevDisabled : PrevActive}
          ></img>
        </div>
        <Card></Card>
        <div
          className={`deck_navigate_control`}
          onClick={() => handleCardID("next")}
        >
          <img
            width={"30px"}
            src={cardId >= noOfCardsInThisDeck - 1 ? NextDisabled : NextActive}
          ></img>
        </div>
      </div>
      <div className="deck_controls_container">
        <section className="card_controls">
          <CardControls deckName={deckName}></CardControls>
        </section>
        <RecallControls></RecallControls>
      </div>
    </div>
  );
};
