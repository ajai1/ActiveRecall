import { createContext, useState, useRef, useEffect, useCallback } from "react";
import { shuffle } from "../utils/Utilities";
import { ENDPOINTS, HEADERS } from "../constants/apiConstants";
import { useAuthFetch } from "../hooks/authorization";
import { useNavigate } from "react-router-dom";

export const CardContext = createContext({
  deckname: null,
  flipCard: null,
  editMode: null,
  cardRecallState: null,
  header: null,
  briefstatement: null,
  canvasMode: null,
  currentCardId: null,
  currentCard: {
    text: "",
    briefstatement: "",
    canvas: "",
    header: "",
  },
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
  const [currentCard, setCurrentCard] = useState({
    text: "",
    briefstatement: "",
    canvas: "",
    header: "",
  });
  const [reviewCards, setReviewCards] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [shouldShuffle, setShouldShuffle] = useState(true);
  const [error, setError] = useState(null);
  const [cardUpdatedOrAdded, setCardUpdatedOrAdded] = useState(false);

  const quillRef = useRef("");
  const textContent = useRef("");
  const canvasRef = useRef("");

  const authFetch = useAuthFetch();

  const navigate = useNavigate();

  // ---------------------------------------------------------------------------

  const setTextContent = (value) => {
    textContent.current = value;
  };

  const resetTheCard = () => {
    setCurrentCard({
      text: "",
      briefstatement: "",
      canvas: "",
      header: "",
    });
    setTextContent("");
    if (flipCard) {
      setTimeout(() => {
        setDefaultHeaderInEditor();
      }, 250);
    } else {
      setDefaultHeaderInEditor();
    }
    setFlipCard(false);
    setCardRecallState(1);
    setClearCanvas(true);
    setEraserSelected(false);
    setCanvasMode(false);
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
    } else {
      const shuffleCards = shuffle(cardsWithMinInterval);
      const nextCard = shuffleCards[0];
      setCurrentCard(nextCard);
    }
  };

  const resetCardsIntervalAndRepetitions = () => {
    if (reviewCards == false) {
      if (deckname.length == 0) return;
      const url = ENDPOINTS.DECKS.RESET_CARDS_INTERVAL_REPETITION.endpoint();
      authFetch(url, {
        method: ENDPOINTS.DECKS.RESET_CARDS_INTERVAL_REPETITION.method,
        headers: HEADERS,
        body: JSON.stringify({ deckname: deckname }),
      })
        .then((response) => {
          setReviewCards(true);
        })
        .catch((error) => {
          console.log(error);
          setError(`Reset Cards Interval API call failed.`);
        });
    }
  };

  const setCurrentCardStates = () => {
    setTextContent(currentCard.text);
    canvasImageLoad(currentCard.canvas);
  };

  const setDefaultHeaderInEditor = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.format("header", 1); // Set the initial format to 'h1'
    }
  };

  const canvasImageLoad = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      if (currentCard && currentCard.canvas) {
        const img = new Image();
        img.src = currentCard.canvas;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
      }
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
    currentCard,
    reviewCards,
    timerDone,
    shouldShuffle,
    error,
    cardUpdatedOrAdded,
  };

  const contextRefs = {
    quillRef,
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
    setDefaultHeaderInEditor,
    setShouldShuffle,
    setError,
    setCardUpdatedOrAdded,
  };

  const ctxValue = {
    ...contextStates,
    ...contextRefs,
    ...contextFunctions,
  };

  // --------------------------------------------------------------------

  //Take the current Card from the deck set the states to show card
  useEffect(() => {
    if (currentCard) {
      if (!editMode && currentCard) {
        if (flipCard) {
          setTimeout(() => {
            setCurrentCardStates();
          }, 250);
          setFlipCard(false);
        } else {
          setCurrentCardStates();
        }
      }
      if (editMode && reviewCards) setCurrentCardStates();
    }
  }, [currentCard]);

  useEffect(() => {
    if (cardsFromSelectedDeck && cardsFromSelectedDeck.length > 0) {
      if (shouldShuffle) showNextCard();
      else {
        setCurrentCardId(0);
        setCurrentCard(cardsFromSelectedDeck[0]);
      }
    }
  }, [cardsFromSelectedDeck, shouldShuffle]);

  useEffect(() => {
    if (reviewCards) {
      setTimeout(() => {
        setTimerDone(true);
      }, 5000);
    }
  }, [reviewCards]);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error]);

  return (
    <CardContext.Provider value={ctxValue}>{children}</CardContext.Provider>
  );
};
