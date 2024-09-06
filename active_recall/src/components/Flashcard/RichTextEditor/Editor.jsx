import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { CardCreatorContext } from "../../../contexts/card-creator-context";
import "../../../styles/flashcard/editor.css";

export const Editor = () => {
  const {
    canvasMode,
    //cardTextContent,
    isAddCardDetails,
    //setCardTextContent,
    setIsAddCardDetails,
  } = useContext(CardCreatorContext);

  const cardTextContent = useRef("");

  const setCardTextContent = (value) => {
    cardTextContent.current = value
  }

  const [reload, setReload ] = useState("");


  //Save Editor state and imageData
  useEffect(() => {
    if (isAddCardDetails) {
      console.log("isAddCardDetails LOAD");
      if (cardTextContent.current.length > 0) {
        let div = document.createElement("div");
        div.innerHTML = cardTextContent.current;
        const images = div.getElementsByTagName("img");
        if (images) {
          let imageData = localStorage.getItem("ImageData");
          if (!imageData || imageData.length == 0) imageData = {};
          else imageData = JSON.parse(imageData);
          for (let i = 0; i < images.length; i++) {
            const imageId = `image-${Date.now()}`;
            imageData[imageId] = images[i].src;
            images[i].id = imageId;
            images[i].src = "";
          }
          localStorage.setItem("ImageData", JSON.stringify(imageData));
        }
        localStorage.setItem("TextEditor", div.getHTML());
        setIsAddCardDetails(false);
      }
    }
  }, [isAddCardDetails]);

   //Load from LocalStorage
   useEffect(() => {
    console.log("First Load");
    let textContent = localStorage.getItem("TextEditor");
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
      console.log("THIS IS DIV ----- ", div.getHTML());
      setCardTextContent(div.getHTML());
      setReload("reload")
    }
  }, []);

  console.log("EDITOR LOADED ------------------------------------ ")

  return (
    <div className="text-editor" style={{ zIndex: canvasMode ? 0 : 1 }}>
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={cardTextContent.current}
        onChange={setCardTextContent}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
