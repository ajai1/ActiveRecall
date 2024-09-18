import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../constants/apiConstants";
import { CardContext } from "../../contexts/card-context";
import { useAuthFetch } from "../../hooks/authorization";

export const ShowDeckOfCards = () => {
  const navigate = useNavigate();
  const [allDeckNames, setAllDeckNames] = useState([]);
  const [allDecks, setAllDecks] = useState([]);

  const {
    setDeckname,
    setEditMode,
    setCurrentCardId,
    setCardsFromSelectedDeck,
  } = useContext(CardContext);

  const authFetch = useAuthFetch();

  //Select the deck and store cards
  useEffect(() => {
    async function getDeckForUser() {
      const url = ENDPOINTS.DECKS.GET_ALL_DECKS.endpoint();
      const method = ENDPOINTS.DECKS.GET_ALL_DECKS.method;
      const response = await authFetch(url, { method });
      const data = await response.json();
      setAllDecks(data);
      return "";
    }
    getDeckForUser();
    setEditMode(false);
  }, []);

  const handleDeckNameSelect = (deck) => {
    setCardsFromSelectedDeck(deck.cards);
    //generateRecallCards();
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
