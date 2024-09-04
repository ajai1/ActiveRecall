import React from "react";

export const TextControls = ({handleTextAlign, textAlign}) => {
    return (
        <div>
             <button onClick={() => handleTextAlign()}>Aligned {textAlign}</button>
        </div>
    )
}