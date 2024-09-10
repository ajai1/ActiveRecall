import React, { useContext } from "react";
import { CardCreatorContext } from "../../contexts/card-creator-context";
import { Card } from "../Flashcard/Card";
import { CardControls } from "../Flashcard/Controls/CardControls";
import "../../styles/flashcard/controls/cardcontrols.css";

export const ShowSelectedDeck = () => {
  const { deckName, isDeckShowMode } = useContext(CardCreatorContext);

  return (
    <div style={{ display: isDeckShowMode ? "block" : "none" }}>
      <Card></Card>
      <section className="card_controls">
        <CardControls deckName={deckName}></CardControls>
      </section>
    </div>
  );
};
