import React, { useEffect, useRef, useState } from "react";

import "../../styles/flashcard/flashcard.css";

export const Canvas = ({
  canvasMode,
  clearCanvas,
  setClearCanvas,
  eraserSelected,
  setEraserSelected,
}) => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("black");
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
      saveCanvasData();
    }
  }, [clearCanvas]);

  //EraserMode
  useEffect(() => {
    if (eraserSelected == true) {
      setColor("white");
      setLineSize(30);
    } else {
      setColor("black");
      setLineSize(1);
    }
  }, [eraserSelected]);

  // Util Functions ###################################################################################################

  const erase = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(x - 30 / 2, y - 30 / 2, 30, 30);
  };

  const saveCanvasData = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    localStorage.setItem("canvasData", dataURL);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      // load from local storage canvasData
      const savedCanvasData = localStorage.getItem("canvasData");
      if (savedCanvasData) {
        const img = new Image();
        img.src = savedCanvasData;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
      } else {
        ctx.fillStyle = "red";
        ctx.fillRect(10, 10, 100, 100);
      }
    }
  };

  //Event Handlers ################################################################################################

  const handleTouchStart = (e) => {
    if (canvasMode == false) return;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
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

  const handleTouchEnd = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    saveCanvasData();
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
