import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../constants/apiConstants";
import { CardContext } from "../../contexts/card-context";

export const CreateNewDeck = () => {
  const { setDeckname, setEditMode } = useContext(CardContext);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const deckNameValue = e.target.elements.deckNameInput.value;
    if (deckNameValue.length == 0) {
      alert("Enter a name");
      return;
    }
    const url = ENDPOINTS.DECKS.CREATE_DECK.endpoint("ajai");
    fetch(url, {
      method: ENDPOINTS.DECKS.CREATE_DECK.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deckname: deckNameValue,
      }),
    }).then((response) => {
      setDeckname(deckNameValue);
      setEditMode(true);
      navigate(`/create/${deckNameValue}`);
    });
  };
  return (
    <>
      <section>
        <h3>Create a new Deck</h3>
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
