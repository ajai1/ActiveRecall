import React, { useContext, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Canvas } from "./Canvas";
import { CardCreatorContext } from "../../contexts/card-creator-context";
import { Editor } from "./RichTextEditor/Editor";

import "../../styles/flashcard/flashcard.css";

import DrawSvg from "../../static/icons/draw.svg";
import { CanvasControls } from "./Controls/CanvasControls";

export const CardBack = () => {
  const {
    canvasMode,
    clearCanvas,
    eraserSelected,
    isDeckShowMode,
    setCanvasMode,
  } = useContext(CardCreatorContext);
  const { setClearCanvas, setEraserSelected } = useContext(CardCreatorContext);
  function canvasModeClick() {
    setCanvasMode((prev) => !prev);
  }

  return (
    <>
      <div
        className={`canvas_mode ${canvasMode ? "clicked" : ""}`}
        onClick={() => canvasModeClick()}
        style={{ display: isDeckShowMode ? "none" : "block" }}
      >
        <img width="30px" src={DrawSvg}></img>
      </div>
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
      <div
        className={`canvas_controls ${
          canvasMode ? "" : "hide_canvas_controls"
        }`}
      >
        <CanvasControls></CanvasControls>
      </div>
    </>
  );
};
