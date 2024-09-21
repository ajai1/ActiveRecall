import React, { useContext } from "react";

import "../../../styles/flashcard/controls/cardcontrols.css";

import FlipIcon from "../../../static/icons/flip.png";
import AddCardIcon from "../../../static/icons/addcard.png";
import { ENDPOINTS, HEADERS } from "../../../constants/apiConstants";
import { getCardData } from "../../../utils/CardUtils";
import { CardContext } from "../../../contexts/card-context";
import { useAuthFetch } from "../../../hooks/authorization";

import ResetIcon from "../../../static/icons/reset.png";

export const CardControls = () => {
  const authFetch = useAuthFetch();
  const {
    editMode,
    deckname,
    textContent,
    canvasRef,
    resetTheCard,
    setFlipCard,
    reviewCards,
    currentCard,
    cardsFromSelectedDeck,
    setCardsFromSelectedDeck,
    setCurrentCard,
  } = useContext(CardContext);

  //API call
  const addCardToTheDeck = () => {
    const cardData = getCardData({
      header: currentCard.header,
      briefstatement: currentCard.briefstatement,
      textContent: textContent.current,
      canvasRef,
    });
    const { header, briefstatement, canvas, text } = cardData;
    if (editMode && reviewCards) {
      const url = ENDPOINTS.CARDS.UPDATE_CARD.endpoint(deckname);
      authFetch(url, {
        method: ENDPOINTS.CARDS.UPDATE_CARD.method,
        headers: HEADERS,
        body: JSON.stringify({
          ...currentCard,
          header,
          briefstatement,
          canvas,
          text,
        }),
      }).then((response) => {
        console.log("Updated");
        replaceCardInDeck();
      });
    } else {
      const url = ENDPOINTS.CARDS.CREATE_CARD.endpoint(deckname);
      authFetch(url, {
        method: ENDPOINTS.CARDS.CREATE_CARD.method,
        headers: HEADERS,
        body: JSON.stringify(cardData),
      }).then((response) => {
        resetTheCard();
      });
    }
  };

  const replaceCardInDeck = () => {
    const replaceCardsFromSelectedDeck = cardsFromSelectedDeck.map((each) => {
      if (each.id == currentCard.id) {
        return currentCard;
      }
      return each;
    });
    setCardsFromSelectedDeck(replaceCardsFromSelectedDeck);
  };

  const resetCardData = () => {
    const oldData = cardsFromSelectedDeck.find(
      (eachcard) => eachcard.id == currentCard.id
    );
    setCurrentCard(oldData);
  };

  return (
    <div className="card_control_container">
      <button
        className="reset_btn"
        onClick={() => setFlipCard((prev) => !prev)}
      >
        Flip the Card
      </button>

      {editMode && (
        <button className="reset_btn" onClick={() => addCardToTheDeck()}>
          Add Card
        </button>
      )}
      {editMode && (
        <button className="reset_btn" onClick={() => resetCardData()}>
          Reset
        </button>
      )}
    </div>
  );
};
