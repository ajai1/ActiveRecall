import React, { useContext, useEffect, useState } from "react";

import "../../../styles/flashcard/controls.css";
import EraserSvg from "../../../static/icons/eraser.svg";
import ClearCanvasPNG from "../../../static/icons/clearCanvas.png";
import { CardCreatorContext } from "../../../contexts/card-creator-context";

export const CanvasControls = () => {
  const { eraserSelected, color, isDeckShowMode } =
    useContext(CardCreatorContext);
  const { setClearCanvas, setEraserSelected } = useContext(CardCreatorContext);
  const { handleColorChange } = useContext(CardCreatorContext);
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
    <div
      className="canvas_controls_container"
      style={{ display: isDeckShowMode ? "none" : "flex" }}
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
          onChange={handleColorChange}
          style={{ width: "30px" }}
        />
        Color
      </span>
    </div>
  );
};
