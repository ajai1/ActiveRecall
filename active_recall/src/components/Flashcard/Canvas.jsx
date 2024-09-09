import React, { useContext, useEffect, useRef, useState } from "react";

import "../../styles/flashcard/flashcard.css";
import { CardCreatorContext } from "../../contexts/card-creator-context";

export const Canvas = ({}) => {
  const {
    canvasMode,
    clearCanvas,
    setClearCanvas,
    eraserSelected,
    isAddCardDetails,
    setIsAddCardDetails,
    color,
    canvasRef,
  } = useContext(CardCreatorContext);

  //const [color, setColor] = useState("black");
  const [lineSize, setLineSize] = useState(1);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  //UseEffects ########################################################################################################

  //Start-Up
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

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

  // load from local storage canvasData
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const savedCanvasData = localStorage.getItem("canvasData");
      if (savedCanvasData) {
        const img = new Image();
        img.src = savedCanvasData;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
      }
    }
  };

  const saveCanvasData = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    localStorage.setItem("canvasData", dataURL);
  };

  //Event Handlers ################################################################################################

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

  const handleTouchEnd = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    //saveCanvasData();
  };

  return (
    <div className="canvas_container">
      <canvas
        className="flashcard_canvas"
        ref={canvasRef}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      ></canvas>
    </div>
  );
};
