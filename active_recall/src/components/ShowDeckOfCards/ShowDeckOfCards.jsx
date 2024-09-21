import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../constants/apiConstants";
import { CardContext } from "../../contexts/card-context";
import { useAuthFetch } from "../../hooks/authorization";

import DeleteIcon from "../../static/icons/delete.png";
import EditIcon from "../../static/icons/edit.png";
import { DeckEdit } from "./DeckEdit";

export const ShowDeckOfCards = () => {
  const navigate = useNavigate();
  const [allDecks, setAllDecks] = useState([]);
  const [currentEditDeck, setCurrentEditDeck] = useState(null);

  const {
    setDeckname,
    setEditMode,
    setCurrentCardId,
    setCardsFromSelectedDeck,
    setReviewCards,
    setFlipCard,
    setShouldShuffle,
    setTimerDone,
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
    setReviewCards(false);
  }, []);

  function fetchCardsFromDeck(deckname) {
    const url = ENDPOINTS.CARDS.GET_CARDS_FROM_DECK.endpoint(deckname);
    const method = ENDPOINTS.CARDS.GET_CARDS_FROM_DECK.method;
    return authFetch(url, { method }).then((response) => response.json());
  }

  const handleDeckNameSelect = (deck) => {
    fetchCardsFromDeck(deck.deckname).then((data) => {
      setCardsFromSelectedDeck(data);
      setDeckname(deck.deckname);
      setEditMode(false);
      setReviewCards(false);
      setFlipCard(false);
      setShouldShuffle(true);
      setTimerDone(false);
      setCurrentCardId(0);
      navigate(`/deck-of-cards/${deck.deckname}`);
    });
  };

  const deleteDeck = (deckId, event) => {
    event.stopPropagation();
    const url = ENDPOINTS.DECKS.DELETE_DECK_BY_ID.endpoint();
    const method = ENDPOINTS.DECKS.DELETE_DECK_BY_ID.method;
    authFetch(url, {
      method,
      body: JSON.stringify({
        id: deckId,
      }),
    }).then((response) => {
      console.log("Deck Removed ", response);
      setAllDecks((prev) => {
        return prev.filter((each) => each.id != deckId);
      });
    });
  };

  const editThisDeck = (deck, event) => {
    event.stopPropagation();
    console.log("SELECTED DECK - deck", deck);
    fetchCardsFromDeck(deck.deckname).then((data) => {
      setCardsFromSelectedDeck(data);
      setDeckname(deck.deckname);
      setShouldShuffle(false);
      setEditMode(true);
      setReviewCards(true);
      setFlipCard(false);
      navigate(`/deck-of-cards/edit/${deck.deckname}`);
    });
  };

  return (
    <div className="deck_flex_container">
      {allDecks.map((eachDeck) => {
        return (
          <section
            className="deck_flex_item"
            onClick={() => handleDeckNameSelect(eachDeck)}
            key={eachDeck.id}
          >
            <div className="deck_item_name">{eachDeck.deckname}</div>
            <div style={{ display: "flex" }}>
              <aside
                className="deck_item_btn"
                onClick={(e) => editThisDeck(eachDeck, e)}
              >
                <img src={EditIcon} width={"25px"} /> <span>Edit</span>
              </aside>
              <aside
                className="deck_item_btn"
                onClick={(e) => deleteDeck(eachDeck.id, e)}
              >
                <img src={DeleteIcon} width={"25px"} /> <span>Remove</span>
              </aside>
            </div>
          </section>
        );
      })}
      {currentEditDeck && (
        <DeckEdit
          currentEditDeck={currentEditDeck}
          setCurrentEditDeck={setCurrentEditDeck}
          allDecks={allDecks}
          setAllDecks={setAllDecks}
        ></DeckEdit>
      )}
    </div>
  );
};
