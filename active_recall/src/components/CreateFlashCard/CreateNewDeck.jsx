import React, { useContext } from "react";
import { CardCreatorContext } from "../../contexts/card-creator-context";
import { useNavigate } from "react-router-dom";

export const CreateNewDeck = () => {
  const { setDeckName } = useContext(CardCreatorContext);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const deckNameValue = e.target.elements.deckNameInput.value;
    if (deckNameValue.length == 0) {
      alert("Enter a name");
      return;
    }
    setDeckName(deckNameValue);
    console.log("Setting Deck Name");
    navigate(`/create/${deckNameValue}`);
  };
  return (
    <>
      <section>
        <h3>Create a new Deck</h3>
        <form onSubmit={(e) => handleFormSubmit(e)} autoComplete="off">
          <label htmlFor="deckNameInput">Deck name</label>
          <input
            type="text"
            name="deckNameInput"
            required
            pattern=".*\S.*"
            title="Enter a deck name"
          ></input>
          <input type="submit" value={"Create"}></input>
        </form>
      </section>
    </>
  );
};
