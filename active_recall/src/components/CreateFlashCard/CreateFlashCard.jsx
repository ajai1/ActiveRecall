import React, { useContext, useEffect } from "react";
import { CardControls } from "../Flashcard/Controls/CardControls";
import { Card } from "../Flashcard/Card";
import { useParams } from "react-router-dom";
import { CardContext } from "../../contexts/card-context";

export const CreateFlashCard = () => {
  const { deckname, setDeckname, setEditMode, resetTheCard } =
    useContext(CardContext);
  const param = useParams();

  useEffect(() => {
    setEditMode(true);
  }, []);

  useEffect(() => {
    setDeckname(param.deckname);
    resetTheCard();
  }, [param.deckname]);

  return (
    <div className="card_create_container">
      <section className="card_section">
        <Card deckname={deckname} />
      </section>
      <section className="card_controls">
        <CardControls deckname={deckname}></CardControls>
      </section>
    </div>
  );
};
