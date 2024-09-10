import React from "react";
import { ShowDeckOfCards } from "./ShowDeckOfCards";
import { ShowSelectedDeck } from "./ShowSelectedDeck";
import { CardCreatorContextProvider } from "../../contexts/card-creator-context";

export const DeckOfCards = () => {
  return (
    <CardCreatorContextProvider>
      <ShowDeckOfCards></ShowDeckOfCards>
      <ShowSelectedDeck />
    </CardCreatorContextProvider>
  );
};
