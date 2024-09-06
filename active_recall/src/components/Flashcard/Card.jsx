import React, { useContext, useState, useEffect } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "../../styles/flashcard/flashcard.css";
import { Canvas } from "./Canvas";
import { CardCreatorContext } from "../../contexts/card-creator-context";
import { Editor } from "./RichTextEditor/Editor";

export const Card = () => {
  const { canvasMode, clearCanvas, eraserSelected, setCardTextContent } =
    useContext(CardCreatorContext);
  const { setClearCanvas, setEraserSelected } = useContext(CardCreatorContext);


  console.log("CARD LOADED --------------------------------- ")

  return (
    <div className="flashcard_container">
      <Editor />
      <div className="flashcard_content_container">
        <Canvas
          canvasMode={canvasMode}
          clearCanvas={clearCanvas}
          setClearCanvas={setClearCanvas}
          eraserSelected={eraserSelected}
          setEraserSelected={setEraserSelected}
        ></Canvas>
      </div>
    </div>
  );
};
