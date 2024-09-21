import React, { useContext } from "react";
import "react-quill/dist/quill.snow.css";

import { Canvas } from "./Canvas";
import { Editor } from "./RichTextEditor/Editor";

import "../../styles/flashcard/flashcard.css";

import DrawSvg from "../../static/icons/draw.svg";
import { CanvasControls } from "./Controls/CanvasControls";
import { CardContext } from "../../contexts/card-context";

export const CardBack = () => {
  const { canvasMode, editMode, currentCard } = useContext(CardContext);
  const { setCanvasMode } = useContext(CardContext);

  function canvasModeClick() {
    setCanvasMode((prev) => !prev);
  }

  return (
    <>
      <div
        className={`canvas_mode ${editMode ? "clicked" : ""}`}
        onClick={() => canvasModeClick()}
        style={{ display: !editMode ? "none" : "block" }}
      >
        <img width="30px" src={DrawSvg}></img>
      </div>
      <Editor />
      <div className="flashcard_content_container">
        <Canvas></Canvas>
      </div>
      <div
        className={`canvas_controls ${
          !editMode || canvasMode ? "" : "hide_canvas_controls"
        }`}
      >
        <CanvasControls></CanvasControls>
      </div>
    </>
  );
};
