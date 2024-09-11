import React, { useContext } from "react";
import { CanvasControls } from "./CanvasControls";
import { useNavigate } from "react-router-dom";

import "../../../styles/flashcard/controls/cardcontrols.css";
import { CardCreatorContext } from "../../../contexts/card-creator-context";

import FlipIcon from "../../../static/icons/flip.png";
import AddCardIcon from "../../../static/icons/addcard.png";

export const CardControls = () => {
  const {
    setIsAddCardDetails,
    setShowBackCard,
    isDeckShowMode,
    setIsDeckShowMode,
  } = useContext(CardCreatorContext);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
    return;
    /*     if (isDeckShowMode) {
      navigate("/deck-of-cards");
      setIsDeckShowMode(false);
    } else {
      navigate("/create");
    } */
  };

  return (
    <div className="card_control_container">
      <div
        style={{ marginRight: "5px" }}
        onClick={() => setShowBackCard((prev) => !prev)}
      >
        <img width={"30px"} src={FlipIcon}></img>
      </div>
      {!isDeckShowMode && (
        <div onClick={() => setIsAddCardDetails((prev) => !prev)}>
          <img width={"30px"} src={AddCardIcon}></img>
        </div>
      )}
    </div>
  );
};
