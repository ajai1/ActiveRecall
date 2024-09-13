import { createContext, useState, useRef, useEffect } from "react";
import { useSaveToLocalStorage } from "../hooks/saveToStorage";
import { filterOutRecallCards, shuffleAndDuplicate } from "../utils/Utilities";
import { getLocalStorage } from "../utils/localStorageService";

export const CardContext = createContext({
  deckname: null,
  flipCard: null,
  editMode: null,
  cardRecallState: null,
  header: null,
  briefstatement: null,
  canvasMode: null,
  currentCardId: null,
});

export const CardContextProvider = ({ children }) => {
  const [deckname, setDeckname] = useState("");
  const [flipCard, setFlipCard] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cardRecallState, setCardRecallState] = useState("");
  const [header, setHeader] = useState("");
  const [briefstatement, setBriefStatement] = useState("");
  const [canvasMode, setCanvasMode] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(0);
  const [clearCanvas, setClearCanvas] = useState(false);
  const [eraserSelected, setEraserSelected] = useState(false);
  const [color, setColor] = useState("#000000");
  const [cardsFromSelectedDeck, setCardsFromSelectedDeck] = useState([]);
  const [knowVeryWell, setKnowVeryWell] = useState([]);
  const [littleConfusing, setLittleConfusing] = useState([]);
  const [dontKnow, setDontKnow] = useState([]);
  const [recallCards, setRecallCards] = useState([]);

  const textContent = useRef("");
  const canvasRef = useRef("");

  // ---------------------------------------------------------------------------

  const setTextContent = (value) => {
    textContent.current = value;
  };

  const resetTheCard = () => {
    setHeader("");
    setBriefStatement("");
    setTextContent("");
    setCardRecallState(1);
  };

  const generateRecallCards = () => {
    if (!editMode && cardsFromSelectedDeck.length > 0) {
      const { knowVeryWell, littleConfusing, dontKnow } = filterOutRecallCards(
        cardsFromSelectedDeck
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
      console.log("SETTED RECALL CARDS = ", recallCards);
    }
  };

  // ---------------------------------------------------------------------------

  const contextStates = {
    deckname,
    flipCard,
    editMode,
    cardRecallState,
    header,
    briefstatement,
    canvasMode,
    currentCardId,
    clearCanvas,
    eraserSelected,
    color,
    cardsFromSelectedDeck,
    knowVeryWell,
    littleConfusing,
    dontKnow,
    recallCards,
  };

  const contextRefs = {
    textContent,
    canvasRef,
  };

  const contextFunctions = {
    setDeckname,
    setFlipCard,
    setEditMode,
    setCardRecallState,
    setHeader,
    setBriefStatement,
    setCanvasMode,
    setTextContent,
    resetTheCard,
    setCurrentCardId,
    setClearCanvas,
    setEraserSelected,
    setColor,
    setCardsFromSelectedDeck,
    setRecallCards,
    generateRecallCards,
    setKnowVeryWell,
    setLittleConfusing,
    setDontKnow,
  };

  const ctxValue = {
    ...contextStates,
    ...contextRefs,
    ...contextFunctions,
  };

  // --------------------------------------------------------------------

  //Take the current Card from the deck set the states to show card
  useEffect(() => {
    if (!editMode && recallCards.length > 1 && recallCards[currentCardId]) {
      const currentCard = recallCards[currentCardId];
      console.log("CARD CHANGESS ", currentCard);
      setHeader(currentCard.header);
      setBriefStatement(currentCard.briefstatement);
      setTextContent(currentCard.text);
      setCardRecallState(currentCard.recall);
    }
  }, [recallCards, currentCardId]);

  return (
    <CardContext.Provider value={ctxValue}>{children}</CardContext.Provider>
  );
};
