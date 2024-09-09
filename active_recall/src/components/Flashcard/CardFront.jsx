import React from "react";
import "../../styles/flashcard/flashcard.css";

export const CardFront = () => {
  return (
    <>
      <>
        <input
          style={{ textAlign: "center" }}
          className="flashcard_header"
          type="text"
          placeholder="Enter the Header"
        ></input>

        <textarea
          className="flashcard_textarea"
          placeholder="Enter the content"
        ></textarea>
      </>
    </>
  );
};
