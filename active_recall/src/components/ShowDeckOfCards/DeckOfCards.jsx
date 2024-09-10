import React, { useContext, useEffect } from "react";
import { ShowDeckOfCards } from "./ShowDeckOfCards";
import { ShowSelectedDeck } from "./ShowSelectedDeck";
import {
  CardCreatorContext,
  CardCreatorContextProvider,
} from "../../contexts/card-creator-context";

export const DeckOfCards = () => {
  const { resetStates } = useContext(CardCreatorContext);
  useEffect(() => {
    resetStates();
    console.log("Reset State !!!");
  });
  return (
    <>
      <ShowDeckOfCards></ShowDeckOfCards>
      <ShowSelectedDeck />
    </>
  );
};
