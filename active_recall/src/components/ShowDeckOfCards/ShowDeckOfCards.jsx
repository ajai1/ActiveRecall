import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../constants/apiConstants";
import { CardContext } from "../../contexts/card-context";

export const ShowDeckOfCards = () => {
  const navigate = useNavigate();
  const [allDeckNames, setAllDeckNames] = useState([]);
  const [allDecks, setAllDecks] = useState([]);

  const {
    setDeckname,
    setEditMode,
    setCurrentCardId,
    setCardsFromSelectedDeck,
    generateRecallCards,
  } = useContext(CardContext);

  //Select the deck and store cards
  useEffect(() => {
    async function getDeckForUser(username) {
      const url = ENDPOINTS.DECKS.GET_ALL_DECKS.endpoint(username);
      const method = ENDPOINTS.DECKS.GET_ALL_DECKS.method;
      const response = await fetch(url, { method });
      const data = await response.json();
      console.log("ALL DECKS ", data);
      setAllDecks(data);
      return "";
    }
    getDeckForUser("ajai");
    setEditMode(false);
  }, []);

  const handleDeckNameSelect = (deck) => {
    setCardsFromSelectedDeck(deck.cards);
    generateRecallCards();
    setDeckname(deck.deckname);
    setEditMode(false);
    setCurrentCardId(0);
    navigate(`/deck-of-cards/${deck.deckname}`);
  };

  return (
    <div className="deck_grid_container">
      {allDecks.map((eachDeck) => {
        return (
          <div
            className="deck_grid_item"
            onClick={() => handleDeckNameSelect(eachDeck)}
            key={eachDeck.id}
          >
            {eachDeck.deckname}
          </div>
        );
      })}
    </div>
  );
};
