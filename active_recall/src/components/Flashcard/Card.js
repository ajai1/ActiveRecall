import React, { useState } from "react";

import "../../styles/flashcard/flashcard.css";
import { Canvas } from "./Canvas";
import { CanvasControls } from "./CanvasControls";
import { TextControls } from "./TextControls";

export const Card = () => {
  const [canvasMode, setCanvasMode] = useState(false);
  const [clearCanvas, setClearCanvas] = useState(false);
  const [eraserSelected, setEraserSelected] = useState(false);
  const [textAlign, setTextAlign] = useState("center");

  const handleTextAlign = () => {
    setTextAlign((align) => {
      if (align == "center") {
        return "left";
      } else if (align == "left") {
        return "right";
      } else {
        return "center";
      }
    });
  };

  return (
    <div className="flashcard_container">
      <input
        style={{ textAlign: "center", zIndex: canvasMode ? 0 : 1}}
        className="flashcard_header"
        type="text"
        placeholder="Enter the Header"
      ></input>
      <textarea
        style={{ textAlign: textAlign, zIndex: canvasMode ? 0 : 1 }}
        className="flashcard_textarea"
        placeholder="Enter the content"
      ></textarea>

      <Canvas
        canvasMode={canvasMode}
        clearCanvas={clearCanvas}
        setClearCanvas={setClearCanvas}
        eraserSelected={eraserSelected}
        setEraserSelected={setEraserSelected}
      ></Canvas>
      <button onClick={() => setCanvasMode((prev) => !prev)}>
        {canvasMode ? "Canvas On" : "Canvas Off"}
      </button>
      {canvasMode ? (
        <CanvasControls setClearCanvas={setClearCanvas} setEraserSelected={setEraserSelected} eraserSelected={eraserSelected}/>
      ) : (
       <TextControls handleTextAlign= {handleTextAlign} textAlign={textAlign}/>
      )}
    </div>
  );
};
