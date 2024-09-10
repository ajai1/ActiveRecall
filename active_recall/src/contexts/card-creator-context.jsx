import { createContext, useState, useRef, useEffect } from "react";
import { useSaveToLocalStorage } from "../hooks/saveToStorage";

export const CardCreatorContext = createContext({});

export const CardCreatorContextProvider = ({ children }) => {
  const [deckName, setDeckName] = useState("");
  const [cardId, setCardId] = useState(0);
  const [canvasMode, setCanvasMode] = useState(false);
  const [clearCanvas, setClearCanvas] = useState(false);
  const [eraserSelected, setEraserSelected] = useState(false);
  const [header, setHeader] = useState("");
  const [briefStatement, setBriefStatement] = useState("");
  const [isAddCardDetails, setIsAddCardDetails] = useState(false);
  const [color, setColor] = useState("#000000"); // Initial color
  const [showBackCard, setShowBackCard] = useState(false);
  const [isDeckShowMode, setIsDeckShowMode] = useState(false);
  const [noOfCardsInThisDeck, setNoOfCardsInThisDeck] = useState(0);

  const editorRef = useRef(null);
  const cardTextContent = useRef("");
  const canvasRef = useRef(null);

  const setCardTextContent = (value) => {
    cardTextContent.current = value;
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const resetStates = () => {
    setHeader("");
    setBriefStatement("");
    setCanvasMode(false);
    setClearCanvas(false);
    setEraserSelected(false);
    setCardTextContent("");
    setColor("#000000");
    setShowBackCard(false);
    setIsAddCardDetails(false);
    if (!isDeckShowMode) {
      setCardId((prevId) => prevId + 1);
    } else {
      setClearCanvas(true);
    }
  };

  const setEditorContents = (back) => {
    if (back) {
      if (back.text) {
        let textContent = back.text;
        //Bug fix of quill Headers
        if (textContent && textContent.length > 1) {
          textContent = textContent.replace(/(<p><br><\/p>)(?=<h1>)/g, "");
          let div = document.createElement("div");
          div.innerHTML = textContent;
          const images = div.getElementsByTagName("img");
          if (images) {
            let imageData = localStorage.getItem("ImageData");
            if (imageData && imageData.length > 0) {
              imageData = JSON.parse(imageData);
              for (let i = 0; i < images.length; i++) {
                images[i].src = imageData[images[i].id];
              }
            }
          }
          setCardTextContent(div.getHTML());
        }
      }
    }
  };

  useEffect(() => {
    const deckOfCards = JSON.parse(localStorage.getItem("deckOfCards")) || {};
    if (deckOfCards[deckName] && !isDeckShowMode) {
      setCardId(deckOfCards[deckName].length);
    }
  }, [deckName]);

  useEffect(() => {
    if (isDeckShowMode && deckName) {
      const deckOfCards = JSON.parse(localStorage.getItem("deckOfCards")) || {};
      const allCardsFromDeck = deckOfCards[deckName];
      setNoOfCardsInThisDeck(allCardsFromDeck.length);

      const card = allCardsFromDeck[cardId];
      if (card) {
        const front = card.front;
        if (front) {
          setHeader(front.header);
          setBriefStatement(front.briefStatement);
        }
        const back = card.back;
        setEditorContents(back);
      }
    }
  }, [isDeckShowMode, cardId, deckName]);

  useEffect(() => {
    if (!isDeckShowMode) {
      resetStates();
    }
  }, [isDeckShowMode]);

  useSaveToLocalStorage({
    deckName,
    cardId,
    isAddCardDetails,
    header,
    briefStatement,
    cardTextContent,
    canvasRef,
    clearCanvas,
    resetStates,
    setCardId,
  });

  const ctxValue = {
    noOfCardsInThisDeck,
    deckName,
    cardId,
    canvasMode,
    clearCanvas,
    eraserSelected,
    isAddCardDetails,
    editorRef,
    canvasRef,
    cardTextContent,
    color,
    showBackCard,
    header,
    briefStatement,
    isDeckShowMode,
    setDeckName,
    setCardId,
    setBriefStatement,
    setHeader,
    setCanvasMode,
    setClearCanvas,
    setEraserSelected,
    setIsAddCardDetails,
    setCardTextContent,
    handleColorChange,
    setShowBackCard,
    setIsDeckShowMode,
    resetStates,
  };

  return (
    <CardCreatorContext.Provider value={ctxValue}>
      {children}
    </CardCreatorContext.Provider>
  );
};
