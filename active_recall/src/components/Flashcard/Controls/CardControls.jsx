import React, { useContext } from "react";

import "../../../styles/flashcard/controls/cardcontrols.css";

import FlipIcon from "../../../static/icons/flip.png";
import AddCardIcon from "../../../static/icons/addcard.png";
import { ENDPOINTS, HEADERS } from "../../../constants/apiConstants";
import { getCardData } from "../../../utils/CardUtils";
import { CardContext } from "../../../contexts/card-context";
import { useAuthFetch } from "../../../hooks/authorization";

import ResetIcon from "../../../static/icons/reset.png";
import { useParams } from "react-router-dom";

export const CardControls = () => {
  const authFetch = useAuthFetch();
  const param = useParams();
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
    setError,
  } = useContext(CardContext);

  //API call
  const addCardToTheDeck = () => {
    if (currentCard.header && currentCard.header.length > 0) {
      const cardData = getCardData({
        header: currentCard.header,
        briefstatement: currentCard.briefstatement,
        textContent: textContent.current,
        canvasRef,
      });
      const { header, briefstatement, canvas, text } = cardData;
      //Modify Mode
      if (editMode && reviewCards && currentCard.id) {
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
        })
          .then((response) => {
            console.log("Updated");
            replaceCardInDeck();
          })
          .catch((error) => {
            console.log(error);
            setError("Update Card API call failed.");
          });
      } else {
        const url = ENDPOINTS.CARDS.CREATE_CARD.endpoint(deckname);
        authFetch(url, {
          method: ENDPOINTS.CARDS.CREATE_CARD.method,
          headers: HEADERS,
          body: JSON.stringify(cardData),
        })
          .then((response) => {
            resetTheCard();
          })
          .catch((error) => {
            console.log(error);
            setError("Create Card API call failed.");
          });
      }
    } else {
      alert("Add a Header to the Card");
    }
  };

  const removeCardFromDeck = () => {
    const url = ENDPOINTS.CARDS.REMOVE_CARD.endpoint(param.deckname);
    const method = ENDPOINTS.CARDS.REMOVE_CARD.method;
    debugger;
    authFetch(url, {
      method,
      headers: HEADERS,
      body: JSON.stringify({
        id: currentCard.id,
      }),
    })
      .then((response) => {
        if (response.status == 400) {
          setError("Bad Request sent 400");
        } else if (response.status == 200 || response.status == 201) {
          const replaceCardsFromSelectedDeck = cardsFromSelectedDeck.filter(
            (each) => each.id != currentCard.id
          );
          setCardsFromSelectedDeck(replaceCardsFromSelectedDeck);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Delete Card API call failed.");
      });
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
    <div
      className={`card_control_container ${
        !editMode && "card_control_container_single"
      }`}
    >
      <button
        className="control_btn"
        onClick={() => setFlipCard((prev) => !prev)}
      >
        Flip Card
      </button>

      {editMode && (
        <button className="control_btn" onClick={() => addCardToTheDeck()}>
          {editMode && reviewCards ? "Modify Card" : "Add Card"}
        </button>
      )}
      {editMode && reviewCards && (
        <button className="control_btn" onClick={() => removeCardFromDeck()}>
          Remove Card
        </button>
      )}
      {editMode && reviewCards && (
        <button className="control_btn" onClick={() => resetCardData()}>
          Reset
        </button>
      )}
    </div>
  );
};
