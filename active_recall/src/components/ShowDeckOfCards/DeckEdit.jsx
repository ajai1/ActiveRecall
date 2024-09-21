import React, { useContext, useEffect, useState } from "react";
import { useAuthFetch } from "../../hooks/authorization";
import { ENDPOINTS } from "../../constants/apiConstants";
import { useParams } from "react-router-dom";

import "../../styles/editdeck.css";
import { CardContext } from "../../contexts/card-context";
import { ShowSelectedDeck } from "./ShowSelectedDeck";

export const DeckEdit = () => {
  const [newDeckName, setNewDeckName] = useState();
  const [currentEditDeck, setCurrentEditDeck] = useState();
  const {
    cardsFromSelectedDeck,
    deckname,
    setCardsFromSelectedDeck,
    setEditMode,
    setReviewCards,
    setDeckname,
    setShouldShuffle,
    setFlipCard,
    setTimerDone,
  } = useContext(CardContext);

  const authFetch = useAuthFetch();
  const params = useParams();

  const handleChange = (e) => {
    setNewDeckName(e.target.value);
  };

  const fetchDeckAndCards = async (deckname) => {
    return new Promise(async (resolve, reject) => {
      const cardsUrl = ENDPOINTS.CARDS.GET_CARDS_FROM_DECK.endpoint(deckname);
      const cardsMethod = ENDPOINTS.CARDS.GET_CARDS_FROM_DECK.method;
      const cardsResponse = await authFetch(cardsUrl, { cardsMethod });
      const cardsData = await cardsResponse.json();
      setCardsFromSelectedDeck(cardsData);

      const deckUrl = ENDPOINTS.DECKS.GET_DECK_BY_NAME.endpoint(deckname);
      const deckMethod = ENDPOINTS.DECKS.GET_DECK_BY_NAME.method;
      const deckResponse = await authFetch(deckUrl, { deckMethod });
      const deckData = await deckResponse.json();
      setCurrentEditDeck(deckData.deckEntity);
      resolve(true);
    });
  };

  useEffect(() => {
    if (params.deckname) {
      fetchDeckAndCards(params.deckname).then(() => {
        setShouldShuffle(false);
        setDeckname(params.deckname);
        setEditMode(true);
        setReviewCards(true);
        console.log("SETTED ALL CARDS AND SHUFFLE TO FALSE");
      });
    }
  }, [params.deckname]);

  useEffect(() => {
    return () => {
      setReviewCards(false);
      setEditMode(false);
      setFlipCard(false);
      setShouldShuffle(true);
      setTimerDone(false);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDeck = { ...currentEditDeck };
    newDeck.deckname = newDeckName;
    const url = ENDPOINTS.DECKS.UPDATE_DECK_BY_ID.endpoint();
    const method = ENDPOINTS.DECKS.UPDATE_DECK_BY_ID.method;
    authFetch(url, {
      method,
      body: JSON.stringify(newDeck),
    }).then((res) => {
      console.log("Update done = ", res);
      setCurrentEditDeck({ ...newDeck });
    });
  };

  return (
    <div className="edit_deck_container">
      {currentEditDeck && (
        <div className="edit_deck_name_container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h3>{currentEditDeck.deckname}</h3>
              <label htmlFor="newdeckname">Change deck name</label>
              <input
                type="text"
                id="newdeckname"
                name="newdeckname"
                value={newDeckName}
                onChange={handleChange}
                required
                autoComplete={"off"}
              />
            </div>
            <button type="submit" className="submit-btn">
              Rename
            </button>
          </form>
        </div>
      )}
      {currentEditDeck && (
        <div className="cards_container">
          <ShowSelectedDeck dontShowControls={true} />
        </div>
      )}
    </div>
  );
};
