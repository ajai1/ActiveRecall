import React, { useContext, useEffect } from "react";
import { CardControls } from "../Flashcard/Controls/CardControls";
import { Card } from "../Flashcard/Card";
import {
  CardCreatorContext,
  CardCreatorContextProvider,
} from "../../contexts/card-creator-context";

export const CreateFlashCard = ({ deckName }) => {
  const { setDeckName } = useContext(CardCreatorContext);

  return (
    <CardCreatorContextProvider>
      <section className="card_section">
        <Card deckName={deckName} />
      </section>
      <section className="card_controls">
        <CardControls deckName={deckName}></CardControls>
      </section>
    </CardCreatorContextProvider>
  );
};
