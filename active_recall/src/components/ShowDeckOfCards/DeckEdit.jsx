import React, { useContext, useEffect, useState } from "react";
import { useAuthFetch } from "../../hooks/authorization";
import { ENDPOINTS } from "../../constants/apiConstants";
import { useNavigate, useParams } from "react-router-dom";

import "../../styles/editdeck.css";
import { CardContext } from "../../contexts/card-context";
import { ShowSelectedDeck } from "./ShowSelectedDeck";
import { AppContext } from "../../contexts/app-context";

export const DeckEdit = () => {
  const [newDeckName, setNewDeckName] = useState();
  const [currentEditDeck, setCurrentEditDeck] = useState();
  const {
    deckname,
    setCardsFromSelectedDeck,
    setEditMode,
    setReviewCards,
    setDeckname,
    setShouldShuffle,
    setFlipCard,
    setTimerDone,
    setError,
    setCurrentCardId,
    resetTheCard,
  } = useContext(CardContext);

  const { setPageInfo, setLoading } = useContext(AppContext);

  const authFetch = useAuthFetch();

  const navigate = useNavigate();

  const params = useParams();

  const handleChange = (e) => {
    setNewDeckName(e.target.value);
  };

  const fetchDeckAndCards = async (deckname) => {
    return new Promise(async (resolve, reject) => {
      try {
        const cardsUrl = ENDPOINTS.CARDS.GET_CARDS_FROM_DECK.endpoint(deckname);
        const cardsMethod = ENDPOINTS.CARDS.GET_CARDS_FROM_DECK.method;
        const cardsResponse = await authFetch(cardsUrl, { cardsMethod });
        const cardsData = await cardsResponse.json();
        setCardsFromSelectedDeck(cardsData);
      } catch (error) {
        console.log(error);
        reject("Get Cards from Deck API call failed.");
      }
      try {
        const deckUrl = ENDPOINTS.DECKS.GET_DECK_BY_NAME.endpoint(deckname);
        const deckMethod = ENDPOINTS.DECKS.GET_DECK_BY_NAME.method;
        const deckResponse = await authFetch(deckUrl, { deckMethod });
        const deckData = await deckResponse.json();
        setCurrentEditDeck(deckData.deckEntity);
        resolve(true);
      } catch (error) {
        console.log(error);
        reject("Get Deck API call failed.");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDeck = { ...currentEditDeck };
    newDeck.deckname = newDeckName;
    const url = ENDPOINTS.DECKS.UPDATE_DECK_BY_ID.endpoint();
    const method = ENDPOINTS.DECKS.UPDATE_DECK_BY_ID.method;
    setLoading(true);
    authFetch(url, {
      method,
      body: JSON.stringify(newDeck),
    })
      .then((res) => {
        setLoading(false);
        setCurrentEditDeck({ ...newDeck });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError(`Update Deck API call failed.`);
      });
  };

  useEffect(() => {
    if (params.deckname) {
      setLoading(true);
      setShouldShuffle(false);
      setEditMode(true);
      setReviewCards(true);
      fetchDeckAndCards(params.deckname)
        .then(() => {
          setShouldShuffle(false);
          setDeckname(params.deckname);
          setEditMode(true);
          setReviewCards(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(`Fetch Deck and Cards API call failed. ${error}`);
        });
    }
  }, [params.deckname]);

  useEffect(() => {
    setPageInfo({
      header: "Modify Deck",
      info: "You can edit the deck name, or edit cards or add new cards to the deck",
    });
    return () => {
      resetTheCard();
      setReviewCards(false);
      setEditMode(false);
      setFlipCard(false);
      setCardsFromSelectedDeck(null);
      setShouldShuffle(true);
      setTimerDone(false);
      setCurrentCardId(0);
    };
  }, []);

  return (
    <div className="edit_deck_container">
      {currentEditDeck && (
        <div className="edit_deck_name_container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="newdeckname">
                Current deck name is "{currentEditDeck.deckname}"
              </label>
              <input
                type="text"
                id="newdeckname"
                name="newdeckname"
                value={newDeckName}
                onChange={handleChange}
                required
                placeholder="you can rename the current deck"
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
      <div style={{ marginBottom: "1rem" }}>
        <button
          className="control_btn"
          onClick={() => {
            setReviewCards(false);
            navigate(`/create/${currentEditDeck.deckname}`);
          }}
        >
          Add New Cards
        </button>
      </div>
    </div>
  );
};
