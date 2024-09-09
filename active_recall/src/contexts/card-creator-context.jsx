import { createContext, useState, useRef } from "react";

export const CardCreatorContext = createContext({});

export const CardCreatorContextProvider = ({ children }) => {
  const [canvasMode, setCanvasMode] = useState(false);
  const [clearCanvas, setClearCanvas] = useState(false);
  const [eraserSelected, setEraserSelected] = useState(false);
  const [cardTextContent, setCardTextContent] = useState("");
  const [isAddCardDetails, setIsAddCardDetails] = useState(false);
  const [color, setColor] = useState("#000000"); // Initial color
  const [showBackCard, setShowBackCard] = useState(false);

  const editorRef = useRef(null);

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const ctxValue = {
    canvasMode,
    clearCanvas,
    eraserSelected,
    isAddCardDetails,
    editorRef,
    cardTextContent,
    color,
    showBackCard,
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
