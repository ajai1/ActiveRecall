import { createContext, useState, useRef, useEffect } from "react";
import { useSaveToLocalStorage } from "../hooks/saveToStorage";
import { filterOutRecallCards, shuffleAndDuplicate } from "../utils/Utilities";
import { getLocalStorage } from "../utils/localStorageService";

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
  const [recallCards, setRecallCards] = useState([]);
  const [knowVeryWell, setKnowVeryWell] = useState([]);
  const [littleConfusing, setLittleConfusing] = useState([]);
  const [dontKnow, setDontKnow] = useState([]);
  const [cardRecallState, setCardRecallState] = useState(1);
  const [allCardsFromSelectedDeck, setAllCardsFromSelectedDeck] = useState([]);

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
            let imageData = getLocalStorage("ImageData");
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

  const resetRecallStates = () => {
    const deckOfCards = getLocalStorage("deckOfCards") || {};
    const allCardsFromDeck = deckOfCards[deckName];
    for (let i = 0; i < allCardsFromDeck.length; i++) {
      allCardsFromDeck[i].recall = 1;
      allCardsFromDeck[i].uid = i;
    }
    deckOfCards[deckName] = allCardsFromDeck;
    localStorage.setItem("deckOfCards", JSON.stringify(deckOfCards));
  };

  useEffect(() => {
    const deckOfCards = getLocalStorage("deckOfCards") || {};
    if (deckOfCards[deckName] && !isDeckShowMode) {
      setCardId(deckOfCards[deckName].length);
    }
  }, [deckName, isDeckShowMode]);

  useEffect(() => {
    if (isDeckShowMode && deckName && allCardsFromSelectedDeck.length > 0) {
      const { knowVeryWell, littleConfusing, dontKnow } = filterOutRecallCards(
        allCardsFromSelectedDeck
      );
      setKnowVeryWell(knowVeryWell);
      setLittleConfusing(littleConfusing);
      setDontKnow(dontKnow);
      const recallCards = shuffleAndDuplicate(
        knowVeryWell,
        littleConfusing,
        dontKnow
      );

      setRecallCards(recallCards);
      setNoOfCardsInThisDeck(recallCards.length);
    }
  }, [allCardsFromSelectedDeck, isDeckShowMode, deckName]);

  useEffect(() => {
    if (isDeckShowMode && deckName && recallCards.length > 0) {
      const card = recallCards[cardId];
      if (card) {
        setCardRecallState(card.recall);
        setHeader(card.header);
        setBriefStatement(card.briefstatement);
        setCardTextContent(card.text);
      }
    }
  }, [cardId, recallCards, isDeckShowMode]);

  useEffect(() => {
    if (!isDeckShowMode) {
      resetStates();
    }

    return () => {
      setCardId(0);
    };
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
    recallCards,
    knowVeryWell,
    littleConfusing,
    dontKnow,
    cardRecallState,
    allCardsFromSelectedDeck,
    setAllCardsFromSelectedDeck,
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
    setRecallCards,
    setDontKnow,
    setLittleConfusing,
    setKnowVeryWell,
    setNoOfCardsInThisDeck,
    setCardRecallState,
  };

  return (
    <CardCreatorContext.Provider value={ctxValue}>
      {children}
    </CardCreatorContext.Provider>
  );
};
