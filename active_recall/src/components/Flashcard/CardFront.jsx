import React, { useContext } from "react";
import "../../styles/flashcard/flashcard.css";
import { CardContext } from "../../contexts/card-context";

export const CardFront = ({ card }) => {
  const { editMode, currentCard, setCurrentCard } = useContext(CardContext);

  const handleCardFrontChanges = (type, value) => {
    if (type == "header" || type == "briefstatement") {
      setCurrentCard((prev) => {
        if (prev) prev[type] = value;
        return { ...prev };
      });
    }
  };

  return (
    <>
      <>
        <input
          style={{ textAlign: "center" }}
          className="flashcard_header"
          value={card ? card.header : currentCard ? currentCard.header : ""}
          onChange={(event) =>
            handleCardFrontChanges("header", event.target.value)
          }
          type="text"
          placeholder={editMode ? "Enter the Header" : ""}
          readOnly={editMode ? false : true}
        ></input>

        <textarea
          className="flashcard_textarea"
          placeholder={editMode ? "Enter the content" : ""}
          value={
            card
              ? card.briefstatement
              : currentCard
              ? currentCard.briefstatement
              : ""
          }
          onChange={(event) =>
            handleCardFrontChanges("briefstatement", event.target.value)
          }
          readOnly={editMode ? false : true}
        ></textarea>
      </>
    </>
  );
};
