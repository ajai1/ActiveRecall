import React, { useEffect, useRef, useState } from "react";

import "../../styles/flashcard/flashcard.css";

export const Canvas = (props) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    console.log("Clearing Canvas");
    if (props.clearCanvas) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      props.setClearCanvas(false);
      saveCanvasData();
    }
  }, [props.clearCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
    const ctx = canvas.getContext("2d");
    const savedCanvasData = localStorage.getItem('canvasData');
    if(savedCanvasData){
        const img = new Image();
        img.src = savedCanvasData;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0 , 0);
        }
    }else{

        ctx.fillStyle = "red";
        ctx.fillRect(10, 10, 100, 100);
    }
  }, []);
  

  const handleTouchStart = (e) => {
    if (props.canvasMode == false) return;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    setLastX(touch.clientX - rect.left);
    setLastY(touch.clientY - rect.top);
  };

  const handleTouchMove = (e) => {
    // e.preventDefault();
    if (props.canvasMode == false) return;

    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    setLastX(currentX);
    setLastY(currentY);
  };

  const handleTouchEnd = ()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    saveCanvasData();
  }

  const saveCanvasData = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    localStorage.setItem('canvasData', dataURL);
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
