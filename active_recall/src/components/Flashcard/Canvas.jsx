import React, { useContext, useEffect, useState } from "react";

import "../../styles/flashcard/flashcard.css";
import { getLocalStorage } from "../../utils/localStorageService";
import { CardContext } from "../../contexts/card-context";

export const Canvas = ({}) => {
  /*  const {
    deckName,
    cardId,
    canvasMode,
    clearCanvas,
    setClearCanvas,
    eraserSelected,
    color,
    canvasRef,
  } = useContext(CardCreatorContext);
 */
  const {
    currentCardId,
    canvasMode,
    clearCanvas,
    setClearCanvas,
    eraserSelected,
    color,
    canvasRef,
  } = useContext(CardContext);

  const [lineSize, setLineSize] = useState(1);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  //UseEffects ########################################################################################################

  //Start-Up
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [currentCardId, canvasMode]);

  //Clear Canvas
  useEffect(() => {
    console.log("Clearing Canvas");
    if (clearCanvas) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setClearCanvas(false);
      //saveCanvasData();
    }
  }, [clearCanvas]);

  // Util Functions ###################################################################################################

  const erase = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(x - 30 / 2, y - 30 / 2, 30, 30);
  };

  // load from DB canvasData
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  };

  const resizeCanvasUsingLocalStorage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const deckOfCards = getLocalStorage("deckOfCards") || {};
      //const getCard = deckOfCards[deckName];
      /*       if (getCard && getCard[cardId]) {
        const savedCanvasData = getCard[cardId].back.canvas;
        const img = new Image();
        img.src = savedCanvasData;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
      } */
    }
  };

  //Event Handlers ################################################################################################

  const handleMouseDown = (e) => {
    if (!canvasMode) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setLastX(e.clientX - rect.left);
    setLastY(e.clientY - rect.top);
    setIsDrawing(true); // Flag to track if the drawing is in progress
  };

  const handleTouchStart = (e) => {
    if (canvasMode == false) return;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setLastX(touch.clientX - rect.left);
    setLastY(touch.clientY - rect.top);
  };

  const handleTouchMove = (e) => {
    if (canvasMode == false) return;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;
    if (eraserSelected) {
      erase(currentX, currentY);
    } else {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineSize;
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
    }
    setLastX(currentX);
    setLastY(currentY);
  };

  const handleMouseMove = (e) => {
    if (!canvasMode || !isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    if (eraserSelected) {
      erase(currentX, currentY);
    } else {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineSize;
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
    }

    setLastX(currentX);
    setLastY(currentY);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    if (!canvasMode) return;
    setIsDrawing(false); // Reset the drawing flag when the mouse is released
  };

  return (
    <div className="canvas_container">
      <canvas
        className="flashcard_canvas"
        ref={canvasRef}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
};
