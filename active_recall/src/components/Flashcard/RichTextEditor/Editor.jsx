import React, { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, {
  modules,
  formats,
  noToolbarModules,
} from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { CardCreatorContext } from "../../../contexts/card-creator-context";
import "../../../styles/flashcard/editor.css";

export const Editor = () => {
  const {
    isDeckShowMode,
    cardId,
    canvasMode,
    cardTextContent,
    setCardTextContent,
  } = useContext(CardCreatorContext);

  const quillRef = useRef(null); // Ref for accessing the Quill editor instance

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.format("header", 1); // Set the initial format to 'h1'
    }
  }, [cardId]);

  const editorChangeHandler = (e) => {
    if (isDeckShowMode) {
      return;
    } else {
      setCardTextContent(e);
    }
  };

  return (
    <div className="text-editor" style={{ zIndex: canvasMode ? 0 : 1 }}>
      <EditorToolbar canvasMode={canvasMode} isDeckShowMode={isDeckShowMode} />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={cardTextContent.current}
        onChange={setCardTextContent}
        placeholder={isDeckShowMode ? "" : "Write something awesome..."}
        modules={modules}
        formats={formats}
        readOnly={isDeckShowMode}
      />
    </div>
  );
};

export default Editor;
