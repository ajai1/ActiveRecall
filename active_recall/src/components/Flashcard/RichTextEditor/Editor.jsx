import React, { useContext, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "../../../styles/flashcard/editor.css";
import { CardContext } from "../../../contexts/card-context";

export const Editor = () => {
  const { editMode, cardId, canvasMode, textContent, setTextContent } =
    useContext(CardContext);

  const quillRef = useRef(null); // Ref for accessing the Quill editor instance

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.format("header", 1); // Set the initial format to 'h1'
    }
  }, [cardId]);

  return (
    <div className="text-editor" style={{ zIndex: canvasMode ? 0 : 1 }}>
      <EditorToolbar canvasMode={canvasMode} editMode={editMode} />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={textContent.current}
        onChange={setTextContent}
        placeholder={!editMode ? "" : "Write something awesome..."}
        modules={modules}
        formats={formats}
        readOnly={!editMode}
      />
    </div>
  );
};

export default Editor;
