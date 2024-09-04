import React, { useEffect, useState } from "react";

import "../../styles/flashcard/controls.css"
import EraserSvg from "../../static/icons/eraser.svg"

export const CanvasControls = ({setClearCanvas, setEraserSelected, eraserSelected}) => {
    const [IconContainerStyles, setIconContainerStyles] = useState(["icon_container"]);

    useEffect(()=>{
        if(eraserSelected){
            setIconContainerStyles((prev) => [...prev, "icon_container_selected"]);
        }else{
            setIconContainerStyles((prev) => ["icon_container"]);
        }
    },[eraserSelected])

    return (
        <div className="canvas_controls_container">
            <button onClick={() => setClearCanvas((prev) => !prev)}>
                Clear Canvas
            </button>
            <span className={IconContainerStyles.join(" ")} onClick={() => setEraserSelected((prev) => !prev)}>
                <img className="icon" src={EraserSvg}/>
            </span>
        </div>
    )
}