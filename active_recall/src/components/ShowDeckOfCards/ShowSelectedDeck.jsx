import React, { useCallback, useContext, useEffect, useState } from "react";
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
    setCurrentCard,
    timerDone,
    cardsFromSelectedDeck,
    setCardsFromSelectedDeck,
    currentCard,
    reviewCards,
    setReviewCards,
    setTimerDone,
  } = useContext(CardContext);

  const param = useParams();

  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    checkCurrentCardIndexAndDisableControls();
  }, [currentCard]);

  useEffect(() => {
    if (timerDone == false) fetchCardsFromDeck(param.deck_id);
  }, [param.deck_id, timerDone, reviewCards]);

  const checkCurrentCardIndexAndDisableControls = () => {
    const currentCardId = findIndexOfTheCurrentCard();
    if (currentCardId == 0) setIsPrevDisabled(true);
    else if (currentCardId == cardsFromSelectedDeck.length - 1)
      setIsNextDisabled(true);
    else {
      setIsPrevDisabled(false);
      setIsNextDisabled(false);
    }
  };

  const fetchCardsFromDeck = useCallback(
    (deck_id) => {
      const url = ENDPOINTS.DECKS.GET_DECK_BY_NAME.endpoint("ajai", deck_id);
      fetch(url, {
        method: ENDPOINTS.DECKS.GET_DECK_BY_NAME.method,
        headers: HEADERS,
      })
        .then((res) => res.json())
        .then((json) => {
          setCardsFromSelectedDeck(json.cards);
          setDeckname(param.deck_id);
          setEditMode(false);
          setCurrentCardId(0);
        });
    },
    [param.deck_id]
  );

  const setCardFromIndex = (index) => {
    setCurrentCard(cardsFromSelectedDeck[index]);
  };

  const findIndexOfTheCurrentCard = () => {
    return cardsFromSelectedDeck.findIndex((card) => card.id == currentCard.id);
  };

  const handleCardID = (type) => {
    const currentId = findIndexOfTheCurrentCard();

    if (currentId >= cardsFromSelectedDeck.length - 1 && type == "next") {
      return;
    }
    if (currentId == 0 && type == "prev") {
      return;
    }
    if (flipCard) {
      setTimeout(() => {
        if (type == "prev") {
          setCardFromIndex(currentId - 1);
        } else {
          setCardFromIndex(currentId + 1);
        }
      }, 250);
    } else {
      if (type == "prev") {
        setCardFromIndex(currentId - 1);
      } else {
        setCardFromIndex(currentId + 1);
      }
    }
  };

  return (
    <div className="deck_card_container">
      <div className="deck_card">
        <div
          className={`deck_navigate_control`}
          onClick={() => handleCardID("prev")}
          style={{ display: reviewCards ? "block" : "none" }}
        >
          <img
            width={"30px"}
            src={isPrevDisabled ? PrevDisabled : PrevActive}
          ></img>
        </div>
        <Card></Card>
        <div
          className={`deck_navigate_control`}
          onClick={() => handleCardID("next")}
          style={{ display: reviewCards ? "block" : "none" }}
        >
          <img
            width={"30px"}
            src={isNextDisabled ? NextDisabled : NextActive}
          ></img>
        </div>
      </div>
      <div className="deck_controls_container">
        <section className="card_controls">
          <CardControls deckname={deckname}></CardControls>
        </section>
        {timerDone == true && (
          <button
            className="try_again"
            onClick={() => {
              setReviewCards(false);
              setTimerDone(false);
            }}
          >
            Try Again
          </button>
        )}
        {reviewCards == false && timerDone == false && <RecallControls />}
      </div>
    </div>
  );
};
