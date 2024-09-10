import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardCreatorContext } from "../../contexts/card-creator-context";
import { Card } from "../Flashcard/Card";
import { CardControls } from "../Flashcard/Controls/CardControls";
import "../../styles/flashcard/controls/cardcontrols.css";
import "../../styles/flashcard/flashcard.css";

export const ShowSelectedDeck = () => {
  const {
    cardId,
    deckName,
    isDeckShowMode,
    setDeckName,
    setCardId,
    setIsDeckShowMode,
  } = useContext(CardCreatorContext);
  const param = useParams();
  useEffect(() => {
    console.log("Show the selected Deck ", param.deck_id, cardId);
    setDeckName(param.deck_id);
    //setCardId(param.card_id);
    setIsDeckShowMode(true);
  }, [param.deck_id, param.card_id]);

  return (
    <div className="deck_card_container">
      <Card></Card>
      <div>
        <section className="card_controls">
          <CardControls deckName={deckName}></CardControls>
        </section>
      </div>
    </div>
  );
};
