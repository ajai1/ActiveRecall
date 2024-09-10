import React, { useState } from "react";
import "../styles/dashboard.css";
import { CreateFlashCard } from "./CreateFlashCard/CreateFlashCard";
import { DeckOfCards } from "./ShowDeckOfCards/DeckOfCards";

export const Dashboard = () => {
  const [deckName, setDeckName] = useState("");
  const [isCreateDeck, setIsCreateDeck] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const deckNameValue = e.target.elements.deckNameInput.value;
    if (deckNameValue.length == 0) {
      alert("Enter a name");
      return;
    }
    setDeckName(deckNameValue);
    setIsCreateDeck(true);
  };

  return (
    <div className="dashboard_container">
      <header>
        <h3>Welcome to</h3>
        <h1>Active Recall</h1>
      </header>

      {isCreateDeck ? (
        <CreateFlashCard deckName={deckName}></CreateFlashCard>
      ) : (
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
      )}
      <section>
        <DeckOfCards />
      </section>
    </div>
  );
};
