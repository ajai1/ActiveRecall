import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../Flashcard/Card";
import { CardControls } from "../Flashcard/Controls/CardControls";
import "../../styles/flashcard/controls/cardcontrols.css";
import "../../styles/flashcard/flashcard.css";

import PrevActive from "../../static/icons/prev_active.png";
import NextActive from "../../static/icons/next_active.png";
import PrevDisabled from "../../static/icons/prev_disabled.png";
import NextDisabled from "../../static/icons/next_disabled.png";
import { RecallControls } from "../Flashcard/Controls/recallControls";
import { CardContext } from "../../contexts/card-context";
import { ENDPOINTS, HEADERS } from "../../constants/apiConstants";

export const ShowSelectedDeck = () => {
  const {
    currentCardId,
    deckname,
    setDeckname,
    setCurrentCardId,
    setEditMode,
    flipCard,
    resetTheCard,
    setCardsFromSelectedDeck,
    recallCards,
    generateRecallCards,
  } = useContext(CardContext);

  const param = useParams();

  useEffect(() => {
    const url = ENDPOINTS.DECKS.GET_DECK_BY_NAME.endpoint(
      "ajai",
      param.deck_id
    );
    fetch(url, {
      method: ENDPOINTS.DECKS.GET_DECK_BY_NAME.method,
      headers: HEADERS,
    })
      .then((res) => res.json())
      .then((json) => {
        setCardsFromSelectedDeck(json.cards);
        setDeckname(param.deck_id);
        setEditMode(false);
        //generateRecallCards();
        setCurrentCardId(0);
      });
  }, [param.deck_id, param.card_id]);

  const handleCardID = (type) => {
    if (currentCardId >= recallCards.length - 1 && type == "next") return;
    if (currentCardId == 0 && type == "prev") return;
    resetTheCard();
    if (flipCard) {
      setTimeout(() => {
        if (type == "prev") {
          setCurrentCardId((prev) => prev - 1);
        } else {
          setCurrentCardId((prev) => prev + 1);
        }
      }, 250);
    } else {
      if (type == "prev") {
        setCurrentCardId((prev) => prev - 1);
      } else {
        setCurrentCardId((prev) => prev + 1);
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
            src={currentCardId == 0 ? PrevDisabled : PrevActive}
          ></img>
        </div>
        <Card></Card>
        <div
          className={`deck_navigate_control`}
          onClick={() => handleCardID("next")}
        >
          <img
            width={"30px"}
            src={
              currentCardId >= recallCards.length - 1
                ? NextDisabled
                : NextActive
            }
          ></img>
        </div>
      </div>
      <div className="deck_controls_container">
        <section className="card_controls">
          <CardControls deckname={deckname}></CardControls>
        </section>
        <RecallControls></RecallControls>
      </div>
    </div>
  );
};
