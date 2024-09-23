import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS, HEADERS } from "../../constants/apiConstants";
import { CardContext } from "../../contexts/card-context";
import { useAuthFetch } from "../../hooks/authorization";
import { AppContext } from "../../contexts/app-context";

export const CreateNewDeck = () => {
  const { setDeckname, setEditMode, setError } = useContext(CardContext);
  const { setPageInfo } = useContext(AppContext);
  const navigate = useNavigate();

  const authFetch = useAuthFetch();

  useEffect(() => {
    setPageInfo({
      header: "Create a New Deck of Cards",
      info: `You can name your deck (group of card) and add flip cards to it for learning`,
    });
    return () => {
      setPageInfo({
        header: "Welcome to Active Recall",
        info: ``,
      });
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const deckNameValue = e.target.elements.deckNameInput.value;
    if (deckNameValue.length == 0) {
      alert("Enter a name");
      return;
    }
    const url = ENDPOINTS.DECKS.CREATE_DECK.endpoint();
    authFetch(url, {
      method: ENDPOINTS.DECKS.CREATE_DECK.method,
      headers: HEADERS,
      body: JSON.stringify({
        deckname: deckNameValue,
      }),
    })
      .then((response) => {
        setDeckname(deckNameValue);
        setEditMode(true);
        navigate(`/create/${deckNameValue}`);
      })
      .catch((error) => {
        console.log(error);
        setError("Create new deck API call failed.");
      });
  };
  return (
    <>
      <section>
        <form
          style={{ textAlign: "left" }}
          onSubmit={(e) => handleFormSubmit(e)}
          autoComplete="off"
        >
          <label htmlFor="deckNameInput">Deck name</label>
          <input
            id="deckNameInput"
            type="text"
            name="deckNameInput"
            required
            pattern=".*\S.*"
            title="Enter a deck name"
          ></input>
          <input id="deckNameSubmit" type="submit" value={"Create"}></input>
        </form>
      </section>
    </>
  );
};
