import { createContext, useState, useRef, useEffect, useCallback } from "react";
import { useSaveToLocalStorage } from "../hooks/saveToStorage";
import { shuffle } from "../utils/Utilities";
import { getLocalStorage } from "../utils/localStorageService";
import { ENDPOINTS, HEADERS } from "../constants/apiConstants";

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
  const [currentCard, setCurrentCard] = useState();
  const [reviewCards, setReviewCards] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

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

  const showNextCard = () => {
    const minInterval = Math.min(
      ...cardsFromSelectedDeck.map((card) => card.interval)
    );
    const nextMinInterval = Math.min(
      ...cardsFromSelectedDeck
        .filter((card) => card.interval != minInterval)
        .map((card) => card.interval)
    );
    const cardsWithMinInterval = cardsFromSelectedDeck
      .filter(
        (card) =>
          card.interval == minInterval || card.interval == nextMinInterval
      )
      .filter((card) => card.repetition < 6);
    if (cardsWithMinInterval.length == 0) {
      resetCardsIntervalAndRepetitions();
      setReviewCards(true);
    } else {
      const shuffleCards = shuffle(cardsWithMinInterval);
      console.log("Shuffled Cards ", shuffleCards);
      const nextCard = shuffleCards[0];
      setCurrentCard(nextCard);
    }
  };

  const resetCardsIntervalAndRepetitions = () => {
    if (deckname.length == 0) return;
    const url = ENDPOINTS.DECKS.RESET_CARDS_INTERVAL_REPETITION.endpoint();
    fetch(url, {
      method: ENDPOINTS.DECKS.RESET_CARDS_INTERVAL_REPETITION.method,
      headers: HEADERS,
      body: JSON.stringify({ username: "ajai", deckname: deckname }),
    }).then((response) => {
      console.log("REFETCH DATA ", response);
    });
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
    currentCard,
    reviewCards,
    timerDone,
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
    showNextCard,
    setTimerDone,
    setReviewCards,
    setCurrentCard,
  };

  const ctxValue = {
    ...contextStates,
    ...contextRefs,
    ...contextFunctions,
  };

  // --------------------------------------------------------------------

  //Take the current Card from the deck set the states to show card
  useEffect(() => {
    if (!editMode && currentCard) {
      setHeader(currentCard.header);
      setBriefStatement(currentCard.briefstatement);
      setTextContent(currentCard.text);
      setCardRecallState(currentCard.recall);
    }
  }, [currentCard]);

  useEffect(() => {
    if (cardsFromSelectedDeck && cardsFromSelectedDeck.length > 0) {
      showNextCard();
    }
  }, [cardsFromSelectedDeck]);

  useEffect(() => {
    if (reviewCards) {
      setTimeout(() => {
        setTimerDone(true);
      }, 5000);
    }
  }, [reviewCards]);

  return (
    <CardContext.Provider value={ctxValue}>{children}</CardContext.Provider>
  );
};
