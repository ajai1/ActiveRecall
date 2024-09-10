// src/hooks/useSaveToLocalStorage.js
import { useEffect } from "react";

export const useSaveToLocalStorage = ({
  deckName,
  isAddCardDetails,
  header,
  briefStatement,
  cardTextContent,
  canvasRef,
  resetStates,
}) => {
  const getCardFrontData = (data) => {
    const cardFrontStorage = {};
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

  const getCardBackData = () => {
    let imageData = "";
    let textData = "";
    if (cardTextContent.current.length > 0) {
      let div = document.createElement("div");
      div.innerHTML = cardTextContent.current;
      const images = div.getElementsByTagName("img");
      imageData = getImageData(images);
      textData = div.getHTML();
    }
    return {
      imageData: imageData,
      canvasData: getCanvasData(),
      textData: textData,
    };
  };

  const setCardData = (data) => {
    if (cardTextContent.current.length > 0) {
      let div = document.createElement("div");
      div.innerHTML = cardTextContent.current;
      const images = div.getElementsByTagName("img");
      const cardFront = getCardFrontData();
      const cardBack = getCardBackData();
      const imageData = cardBack.imageData;
      const deckOfCards = JSON.parse(localStorage.getItem("deckOfCards")) || {};

      const cards = deckOfCards[deckName] ? deckOfCards[deckName] : [];

      const dataSet = {
        front: cardFront,
        back: { canvas: cardBack.canvasData, text: cardBack.textData },
      };
      cards.push(dataSet);
      deckOfCards[deckName] = cards;
      localStorage.setItem("deckOfCards", JSON.stringify(deckOfCards));
      localStorage.setItem("ImageData", JSON.stringify(imageData));
    }
  };

  useEffect(() => {
    if (isAddCardDetails) {
      setCardData();
      console.log("SAVED CARD DATA !!!");

      resetStates();
    }
  }, [isAddCardDetails]);
};
