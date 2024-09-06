import React, { useContext, useEffect, useState } from "react";

import "../../../styles/flashcard/controls.css";
import EraserSvg from "../../../static/icons/eraser.svg";
import DrawSvg from "../../../static/icons/draw.svg";
import { CardCreatorContext } from "../../../contexts/card-creator-context";

export const CanvasControls = () => {
  const { canvasMode, clearCanvas, eraserSelected, textAlign } =
    useContext(CardCreatorContext);
  const { setCanvasMode, setClearCanvas, setEraserSelected, setTextAlign } =
    useContext(CardCreatorContext);
  const { handleTextAlign } = useContext(CardCreatorContext);
  const [IconContainerStyles, setIconContainerStyles] = useState([
    "icon_container",
  ]);

  useEffect(() => {
    if (eraserSelected) {
      setIconContainerStyles((prev) => [...prev, "icon_container_selected"]);
    } else {
      setIconContainerStyles((prev) => ["icon_container"]);
    }
  }, [eraserSelected]);

  return (
    <div className="canvas_controls_container">
      <button onClick={() => setClearCanvas((prev) => !prev)}>
        Clear Canvas
      </button>
      <span
        className={IconContainerStyles.join(" ")}
        onClick={() => setEraserSelected((prev) => !prev)}
      >
        <img className="icon" src={EraserSvg} />
      </span>
      <span
        className="icon_container"
        onClick={() => setCanvasMode((prev) => !prev)}
      >
        <img className="icon" src={DrawSvg} />
      </span>
      <span className="colorpicker_container">
        <select className="colorpicker" defaultValue="1">
          <option style={{background:"black"}} value="1"></option>
          <option style={{background:"red"}} value="2">Subheading</option>
          <option style={{background:"blue"}} value="3">Normal</option>
          <option style={{background:"green"}} value="4">Normal</option>
        </select>
      </span>
      <button onClick={() => setCanvasMode((prev) => !prev)}>
        {canvasMode ? "Canvas On" : "Canvas Off"}
      </button>
    </div>
  );
};
