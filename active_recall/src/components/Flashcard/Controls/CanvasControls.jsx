import React, { useContext } from "react";

import "../../../styles/flashcard/controls.css";
import EraserSvg from "../../../static/icons/eraser.svg";
import ClearCanvasPNG from "../../../static/icons/clearCanvas.png";
import { CardContext } from "../../../contexts/card-context";

export const CanvasControls = () => {
  const { eraserSelected, color, editMode } = useContext(CardContext);
  const { setClearCanvas, setEraserSelected, setColor } =
    useContext(CardContext);

  return (
    <div
      className="canvas_controls_container"
      style={{ display: !editMode ? "none" : "flex" }}
    >
      <span
        className="control_container"
        onClick={() => setClearCanvas((prev) => !prev)}
      >
        <img width="30px" src={ClearCanvasPNG}></img>
        Clear
      </span>
      <span
        className={`control_container ${
          eraserSelected ? "eraser_selected" : ""
        }`}
        onClick={() => setEraserSelected((prev) => !prev)}
      >
        <img className="icon" src={EraserSvg} />
        Eraser
      </span>
      <span className="control_container">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: "30px" }}
        />
        Color
      </span>
    </div>
  );
};
