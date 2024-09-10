import React, { useContext, useEffect } from "react";
import "../../styles/flashcard/flashcard.css";
import { CardCreatorContext } from "../../contexts/card-creator-context";

export const CardFront = () => {
  const {
    isDeckShowMode,
    header,
    briefStatement,
    setBriefStatement,
    setHeader,
  } = useContext(CardCreatorContext);

  return (
    <>
      <>
        <input
          style={{ textAlign: "center" }}
          className="flashcard_header"
          value={header}
          onChange={(event) => setHeader(event.target.value)}
          type="text"
          placeholder={!isDeckShowMode ? "Enter the Header" : ""}
          readOnly={isDeckShowMode}
        ></input>

        <textarea
          className="flashcard_textarea"
          placeholder={!isDeckShowMode ? "Enter the content" : ""}
          value={briefStatement}
          onChange={(event) => setBriefStatement(event.target.value)}
          readOnly={isDeckShowMode}
        ></textarea>
      </>
    </>
  );
};
