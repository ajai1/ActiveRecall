import React, { useContext, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "../../../styles/flashcard/editor.css";
import { CardContext } from "../../../contexts/card-context";

export const Editor = () => {
  const {
    editMode,
    quillRef,
    canvasMode,
    textContent,
    setTextContent,
    setDefaultHeaderInEditor,
  } = useContext(CardContext);

  useEffect(() => {
    setDefaultHeaderInEditor();
  }, []);

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
