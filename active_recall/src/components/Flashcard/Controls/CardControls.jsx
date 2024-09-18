import React, { useContext } from "react";

import "../../../styles/flashcard/controls/cardcontrols.css";

import FlipIcon from "../../../static/icons/flip.png";
import AddCardIcon from "../../../static/icons/addcard.png";
import { ENDPOINTS, HEADERS } from "../../../constants/apiConstants";
import { getCardData } from "../../../utils/CardUtils";
import { CardContext } from "../../../contexts/card-context";
import { useAuthFetch } from "../../../hooks/authorization";

export const CardControls = () => {
  const authFetch = useAuthFetch();
  const {
    editMode,
    deckname,
    header,
    briefstatement,
    textContent,
    canvasRef,
    resetTheCard,
    setFlipCard,
    setEditMode,
  } = useContext(CardContext);

  //API call
  const addCardToTheDeck = () => {
    const url = ENDPOINTS.CARDS.CREATE_CARD.endpoint(deckname);
    authFetch(url, {
      method: ENDPOINTS.CARDS.CREATE_CARD.method,
      headers: HEADERS,
      body: JSON.stringify(
        getCardData({ header, briefstatement, textContent, canvasRef })
      ),
    }).then((response) => {
      resetTheCard();
    });
  };

  return (
    <div className="card_control_container">
      <div
        style={{ marginRight: "5px" }}
        onClick={() => setFlipCard((prev) => !prev)}
      >
        <img width={"30px"} src={FlipIcon}></img>
      </div>
      {editMode && (
        <div onClick={() => addCardToTheDeck()}>
          <img width={"30px"} src={AddCardIcon}></img>
        </div>
      )}
      {!editMode && <div onClick={() => setEditMode(false)}>Edit</div>}
    </div>
  );
};
