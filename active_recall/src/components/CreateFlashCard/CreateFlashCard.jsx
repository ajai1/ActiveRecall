import React from "react";
import { CardControls } from "../Flashcard/Controls/CardControls";
import { Card } from "../Flashcard/Card";
import { CardCreatorContextProvider } from "../../contexts/card-creator-context";

export const CreateFlashCard = () => {

    return <CardCreatorContextProvider>
     <section className="card_section">
        <Card/>
      </section>
      <section className="card_controls">
        <CardControls></CardControls>
      </section>
    </CardCreatorContextProvider>
}