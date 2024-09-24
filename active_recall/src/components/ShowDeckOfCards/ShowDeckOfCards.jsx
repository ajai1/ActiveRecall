import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../constants/apiConstants";
import { CardContext } from "../../contexts/card-context";
import { useAuthFetch } from "../../hooks/authorization";

import DeleteIcon from "../../static/icons/delete.png";
import EditIcon from "../../static/icons/pencil.png";
import { DeckEdit } from "./DeckEdit";
import { AppContext } from "../../contexts/app-context";

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
    setError,
    resetTheCard,
  } = useContext(CardContext);

  const { setPageInfo, setLoading } = useContext(AppContext);

  const authFetch = useAuthFetch();

  //Select the deck and store cards
  useEffect(() => {
    resetTheCard();
    async function getDeckForUser() {
      try {
        const url = ENDPOINTS.DECKS.GET_ALL_DECKS.endpoint();
        const method = ENDPOINTS.DECKS.GET_ALL_DECKS.method;
        const response = await authFetch(url, { method });
        const data = await response.json();
        setLoading(false);
        setAllDecks(data);
        return "";
      } catch (error) {
        console.log(error);
        setLoading(false);

        setError("Error in fetching all decks for user.");
      }
    }
    setPageInfo({
      header: "Your Deck of Cards",
      info: `Select a deck to carry out a session of active recall | Edit or Remove Deck`,
    });
    setLoading(true);
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
    setTimerDone(false);
    setEditMode(false);
    setReviewCards(false);
    navigate(`/deck-of-cards/${deck.deckname}`);
    return;
    setLoading(true);
    fetchCardsFromDeck(deck.deckname)
      .then((data) => {
        setLoading(false);
        setCardsFromSelectedDeck(data);
        setDeckname(deck.deckname);
        setEditMode(false);
        setReviewCards(false);
        setFlipCard(false);
        setShouldShuffle(true);
        setTimerDone(false);
        setCurrentCardId(0);
        navigate(`/deck-of-cards/${deck.deckname}`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError("Failed to load the selected deck from the API response.");
      });
  };

  const deleteDeck = (deckId, event) => {
    event.stopPropagation();
    const url = ENDPOINTS.DECKS.DELETE_DECK_BY_ID.endpoint();
    const method = ENDPOINTS.DECKS.DELETE_DECK_BY_ID.method;
    setLoading(true);
    authFetch(url, {
      method,
      body: JSON.stringify({
        id: deckId,
      }),
    })
      .then((response) => {
        console.log("Deck Removed ", response);
        setLoading(false);

        setAllDecks((prev) => {
          return prev.filter((each) => each.id != deckId);
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(`Remove Deck API call failed.`);
      });
  };

  const editThisDeck = (deck, event) => {
    setLoading(true);
    event.stopPropagation();
    navigate(`/deck-of-cards/edit/${deck.deckname}`);
    return;
    /*     fetchCardsFromDeck(deck.deckname)
      .then((data) => {
        setCardsFromSelectedDeck(data);
        setDeckname(deck.deckname);
        setShouldShuffle(false);
        setEditMode(true);
        setReviewCards(true);
        setFlipCard(false);
        setLoading(false);
        navigate(`/deck-of-cards/edit/${deck.deckname}`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(`Modify Deck API call failed.`);
      }); */
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
                <img src={EditIcon} width={"30rem"} /> <span>Edit</span>
              </aside>
              <aside
                className="deck_item_btn"
                onClick={(e) => deleteDeck(eachDeck.id, e)}
              >
                <img src={DeleteIcon} width={"30rem"} /> <span>Remove</span>
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
