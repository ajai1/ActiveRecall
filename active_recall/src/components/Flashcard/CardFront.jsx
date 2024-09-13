import React, { useContext } from "react";
import "../../styles/flashcard/flashcard.css";
import { CardContext } from "../../contexts/card-context";

export const CardFront = () => {
  /*   const {
    isDeckShowMode,
    header,
    briefStatement,
    setBriefStatement,
    setHeader,
  } = useContext(CardCreatorContext); */

  const { editMode, header, briefstatement } = useContext(CardContext);
  const { setHeader, setBriefStatement } = useContext(CardContext);

  return (
    <>
      <>
        <input
          style={{ textAlign: "center" }}
          className="flashcard_header"
          value={header}
          onChange={(event) => setHeader(event.target.value)}
          type="text"
          placeholder={editMode ? "Enter the Header" : ""}
          readOnly={editMode ? false : true}
        ></input>

        <textarea
          className="flashcard_textarea"
          placeholder={editMode ? "Enter the content" : ""}
          value={briefstatement}
          onChange={(event) => setBriefStatement(event.target.value)}
          readOnly={editMode ? false : true}
        ></textarea>
      </>
    </>
  );
};
