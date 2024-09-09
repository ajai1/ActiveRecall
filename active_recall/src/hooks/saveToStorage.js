// src/hooks/useSaveToLocalStorage.js
import { useEffect } from "react";

export const useSaveToLocalStorage = ({
  isAddCardDetails,
  header,
  briefStatement,
  cardTextContent,
  canvasRef,
  setIsAddCardDetails,
}) => {
  const getCardFrontData = (data) => {
    const cardFrontStorage =
      JSON.parse(localStorage.getItem("cardfront")) || {};
    cardFrontStorage.header = header;
    cardFrontStorage.briefStatement = briefStatement;
    return cardFrontStorage;
  };

  const getImageData = (images) => {
    if (images) {
      let imageData = JSON.parse(localStorage.getItem("ImageData")) || {};
      for (let i = 0; i < images.length; i++) {
        const imageId = `image-${Date.now()}`;
        imageData[imageId] = images[i].src;
        images[i].id = imageId;
        images[i].src = "";
      }
      return imageData;
    }
    return "";
  };

  const getCanvasData = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    return dataURL;
  };

  const setCardFrontData = () => {
    localStorage.setItem("cardfront", JSON.stringify(getCardFrontData()));
  };

  const setCardBackData = (data) => {
    if (cardTextContent.current.length > 0) {
      let div = document.createElement("div");
      div.innerHTML = cardTextContent.current;
      const images = div.getElementsByTagName("img");
      const imageData = getImageData(images);
      const canvasData = getCanvasData();
      localStorage.setItem("ImageData", JSON.stringify(imageData));
      localStorage.setItem("canvasData", canvasData);
      localStorage.setItem("TextEditor", div.getHTML());
    }
  };

  useEffect(() => {
    if (isAddCardDetails) {
      setCardFrontData();
      console.log("SAVED CARD FRONT DATA !!!");
      setCardBackData();
      console.log("SAVED EDITOR & CANVAS DATA !!!");
      setIsAddCardDetails(false);
    }
  }, [isAddCardDetails]);
};
