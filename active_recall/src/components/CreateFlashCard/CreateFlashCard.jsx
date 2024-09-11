import React, { useContext, useEffect } from "react";
import { CardControls } from "../Flashcard/Controls/CardControls";
import { Card } from "../Flashcard/Card";
import {
  CardCreatorContext,
  CardCreatorContextProvider,
} from "../../contexts/card-creator-context";
import { useParams } from "react-router-dom";

export const CreateFlashCard = () => {
  const { deckName, setDeckName, setCardId } = useContext(CardCreatorContext);
  const param = useParams();
  useEffect(() => {
    console.log("param", param.deck_id, param.card_id, deckName);
    setDeckName(param.deck_id);
  }, [param.deck_id]);

  return (
    <div className="card_create_container">
      <section className="card_section">
        <Card deckName={deckName} />
      </section>
      <section className="card_controls">
        <CardControls deckName={deckName}></CardControls>
      </section>
    </div>
  );
};
