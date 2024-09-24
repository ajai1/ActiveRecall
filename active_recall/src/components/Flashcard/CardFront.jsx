import React, { useContext, useEffect } from "react";
import "../../styles/flashcard/flashcard.css";
import { CardContext } from "../../contexts/card-context";

export const CardFront = () => {
  const { editMode, currentCard, setCurrentCard } = useContext(CardContext);

  const handleCardFrontChanges = (type, value) => {
    if (type == "header" || type == "briefstatement") {
      setCurrentCard((prev) => {
        if (prev) prev[type] = value;
        return { ...prev };
      });
    }
  };

  useEffect(() => {}, [currentCard]);

  return (
    <>
      <>
        <input
          style={{ textAlign: "center" }}
          className="flashcard_header"
          value={currentCard ? currentCard.header : ""}
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
          value={currentCard ? currentCard.briefstatement : ""}
          onChange={(event) =>
            handleCardFrontChanges("briefstatement", event.target.value)
          }
          readOnly={editMode ? false : true}
        ></textarea>
      </>
    </>
  );
};
