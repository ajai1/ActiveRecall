import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { CardCreatorContext } from "../../../contexts/card-creator-context";
import "../../../styles/flashcard/editor.css";

export const Editor = () => {
  const { cardId, canvasMode, cardTextContent, setCardTextContent } =
    useContext(CardCreatorContext);

  const quillRef = useRef(null); // Ref for accessing the Quill editor instance

  const [reload, setReload] = useState("");

  //Load from LocalStorage
  useEffect(() => {
    console.log("First Load");
    const getCard = JSON.parse(localStorage.getItem("cards"));
    if (getCard && getCard[cardId]) {
      let textContent = getCard[cardId].back?.text;
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
        console.log("div.getHTML()", div.getHTML());
        setCardTextContent(div.getHTML());
        setReload("reload");
      }
    }
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.format("header", 1); // Set the initial format to 'h1'
    }
  }, []);

  return (
    <div className="text-editor" style={{ zIndex: canvasMode ? 0 : 1 }}>
      <EditorToolbar canvasMode={canvasMode} />
      <ReactQuill
        ref={quillRef}
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
