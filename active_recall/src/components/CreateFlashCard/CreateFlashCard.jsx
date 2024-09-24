import React, { useContext, useEffect } from "react";
import { CardControls } from "../Flashcard/Controls/CardControls";
import { Card } from "../Flashcard/Card";
import { useLocation, useParams } from "react-router-dom";
import { CardContext } from "../../contexts/card-context";
import { AppContext } from "../../contexts/app-context";

export const CreateFlashCard = () => {
  const { deckname, setDeckname, setEditMode, resetTheCard } =
    useContext(CardContext);

  const { setPageInfo } = useContext(AppContext);
  const param = useParams();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/create/")) {
      resetTheCard();
    }
  }, [location]);

  useEffect(() => {
    setEditMode(true);
    setPageInfo({
      header: `Create your cards for the Deck : ${param.deckname}`,
      info: `Write a question in the front and answer to learn in the back | you can also use the canvas to draw`,
    });
  }, []);

  return (
    <div className="card_create_container">
      <section className="card_section">
        <Card />
      </section>
      <section className="card_controls">
        <CardControls></CardControls>
      </section>
    </div>
  );
};
