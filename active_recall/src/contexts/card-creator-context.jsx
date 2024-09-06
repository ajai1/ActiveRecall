import {createContext, useState, useRef} from 'react'

export const CardCreatorContext = createContext({});


export const CardCreatorContextProvider = ({children}) => {

    const [canvasMode, setCanvasMode] = useState(false);
    const [clearCanvas, setClearCanvas] = useState(false);
    const [eraserSelected, setEraserSelected] = useState(false);
    const [textAlign, setTextAlign] = useState("center");
    const [cardTextContent, setCardTextContent] = useState("");
    const [isAddCardDetails, setIsAddCardDetails] = useState(false);
    const editorRef = useRef(null);
  
    const handleTextAlign = () => {
      setTextAlign((align) => {
        if (align == "center") {
          return "left";
        } else if (align == "left") {
          return "right";
        } else {
          return "center";
        }
      });
    };


    const ctxValue = {
        canvasMode,
        clearCanvas,
        eraserSelected,
        textAlign,
        isAddCardDetails,
        editorRef,
        cardTextContent,
        setCanvasMode,
        setClearCanvas,
        setEraserSelected,
        setTextAlign,
        handleTextAlign,
        setIsAddCardDetails,
        setCardTextContent,
    }

    return (
        <CardCreatorContext.Provider value={ctxValue}>
            {children}
        </CardCreatorContext.Provider>
    )
}