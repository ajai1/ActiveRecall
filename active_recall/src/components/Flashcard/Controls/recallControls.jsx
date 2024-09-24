import React, { useContext } from "react";
import "../../../styles/flashcard/controls/recallcontrols.css";
import { recallChanges, shuffle } from "../../../utils/Utilities";
import { ENDPOINTS, HEADERS } from "../../../constants/apiConstants";
import { CardContext } from "../../../contexts/card-context";
import { useAuthFetch } from "../../../hooks/authorization";
import { AppContext } from "../../../contexts/app-context";

export const RecallControls = () => {
  const {
    deckname,
    cardsFromSelectedDeck,
    setCardsFromSelectedDeck,
    currentCard,
    reviewCards,
    setError,
  } = useContext(CardContext);

  const { addToast } = useContext(AppContext);

  const authFetch = useAuthFetch();

  const recallAPICall = (cardRecallToModify) => {
    const url = ENDPOINTS.CARDS.UPDATE_CARD.endpoint(deckname);
    authFetch(url, {
      method: ENDPOINTS.CARDS.UPDATE_CARD.method,
      headers: HEADERS,
      body: JSON.stringify(cardRecallToModify),
    })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
        setError("Create Card API call failed.");
      });
  };

  // Update card function (as defined before)
  const updateCard = (card, feedback) => {
    // Your spaced repetition algorithm here
    switch (feedback) {
      case "know well":
        card.easeFactor = Math.min(card.easeFactor + 0.1, 3.0);
        card.repetition += 1;
        card.interval = Math.min(
          Math.ceil(card.interval * card.easeFactor),
          60
        );
        break;
      case "little confusing":
        card.easeFactor = Math.max(card.easeFactor - 0.1, 1.3);
        card.repetition = 0;
        card.interval = Math.min(Math.ceil(card.interval * 0.5), 60);
        break;
      case "don't know":
        card.easeFactor = Math.max(card.easeFactor - 0.2, 1.3);
        card.repetition = 0;
        card.interval = 5; // Reset to a small value
        break;
    }
    const updateCards = [...cardsFromSelectedDeck];
    const indexToUpdate = updateCards.findIndex((ecard) => ecard.id == card.id);
    updateCards[indexToUpdate] = { ...card };
    let typeOfToast = "success";
    if (feedback == "little confusing") typeOfToast = "warn";
    else if (feedback == "don't know") typeOfToast = "error";
    addToast(
      `${card.header} - ${feedback}`,
      `Moving to next card`,
      typeOfToast
    );
    recallAPICall(card, feedback);
    setCardsFromSelectedDeck(updateCards);
    return card;
  };

  // Handle user feedback
  const handleUserFeedback = (feedback) => {
    // Update the current card based on the feedback
    updateCard(currentCard, feedback);
  };

  return (
    <div
      className="recall_container"
      style={{ display: reviewCards ? "none" : "flex" }}
    >
      <button
        onClick={() => handleUserFeedback("know well")}
        className="know_very_well recall_controls"
      >
        Know very well
      </button>
      <button
        onClick={() => handleUserFeedback("little confusing")}
        className="little_confusing recall_controls"
      >
        Little Confusing
      </button>
      <button
        onClick={() => handleUserFeedback("don't know")}
        className="dont_know recall_controls"
      >
        Don't Understand
      </button>
    </div>
  );
};
