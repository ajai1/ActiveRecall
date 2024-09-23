import React, { useContext, useEffect } from "react";
import { CardControls } from "../Flashcard/Controls/CardControls";
import { Card } from "../Flashcard/Card";
import { useParams } from "react-router-dom";
import { CardContext } from "../../contexts/card-context";
import { AppContext } from "../../contexts/app-context";

export const CreateFlashCard = () => {
  const { deckname, setDeckname, setEditMode, resetTheCard } =
    useContext(CardContext);

  const { setPageInfo } = useContext(AppContext);
  const param = useParams();

  useEffect(() => {
    setEditMode(true);
    setPageInfo({
      header: `Create your cards for ${deckname}`,
      info: `Write a question in the front and answer to learn in the back | you can also use the canvas to draw`,
    });
    return () => {
      setPageInfo({
        header: "Welcome to Active Recall",
        info: ``,
      });
    };
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
