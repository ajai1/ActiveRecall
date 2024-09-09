import { createContext, useState, useRef, useEffect } from "react";
import { useSaveToLocalStorage } from "../hooks/saveToStorage";

export const CardCreatorContext = createContext({});

export const CardCreatorContextProvider = ({ children }) => {
  const [canvasMode, setCanvasMode] = useState(false);
  const [clearCanvas, setClearCanvas] = useState(false);
  const [eraserSelected, setEraserSelected] = useState(false);
  const [header, setHeader] = useState("");
  const [briefStatement, setBriefStatement] = useState("");
  //const [cardTextContent, setCardTextContent] = useState("");
  const [isAddCardDetails, setIsAddCardDetails] = useState(false);
  const [color, setColor] = useState("#000000"); // Initial color
  const [showBackCard, setShowBackCard] = useState(false);

  const editorRef = useRef(null);
  const cardTextContent = useRef("");
  const canvasRef = useRef(null);

  const setCardTextContent = (value) => {
    cardTextContent.current = value;
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const saveToLocalStorage = () => {};

  useEffect(() => {
    let cardFrontStore = localStorage.getItem("cardfront");
    if (cardFrontStore) {
      cardFrontStore = JSON.parse(cardFrontStore);
      setHeader(cardFrontStore.header);
      setBriefStatement(cardFrontStore.briefStatement);
    }
  }, []);

  useEffect(() => {}, [isAddCardDetails]);

  useSaveToLocalStorage({
    isAddCardDetails,
    header,
    briefStatement,
    cardTextContent,
    canvasRef,
    clearCanvas,
    setIsAddCardDetails,
  });

  /*     if (isAddCardDetails) {
      let cardFrontStorage = localStorage.getItem("cardfront");
      if (cardFrontStorage) {
        cardFrontStorage = JSON.parse(cardFrontStorage);
        cardFrontStorage.header = header;
        cardFrontStorage.briefStatement = briefStatement;
        localStorage.setItem("cardfront", JSON.stringify(cardFrontStorage));
      } else {
        const front = {
          header,
          briefStatement,
        };
        localStorage.setItem("cardfront", JSON.stringify(front));
      }
    } */

  const ctxValue = {
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
    setBriefStatement,
    setHeader,
    setCanvasMode,
    setClearCanvas,
    setEraserSelected,
    setIsAddCardDetails,
    setCardTextContent,
    handleColorChange,
    setShowBackCard,
  };

  return (
    <CardCreatorContext.Provider value={ctxValue}>
      {children}
    </CardCreatorContext.Provider>
  );
};
