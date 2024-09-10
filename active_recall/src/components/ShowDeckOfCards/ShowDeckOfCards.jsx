import React, { useContext, useEffect, useState } from "react";
import { CardCreatorContext } from "../../contexts/card-creator-context";

export const ShowDeckOfCards = () => {
  const [allDeckNames, setAllDeckNames] = useState([]);

  const { isDeckShowMode, setDeckName, setIsDeckShowMode, setCardId } =
    useContext(CardCreatorContext);

  useEffect(() => {
    const getAllDeck = JSON.parse(localStorage.getItem("deckOfCards")) || {};
    setAllDeckNames(Object.keys(getAllDeck));
  }, []);

  const handleDeckNameSelect = (deckName) => {
    setDeckName(deckName);
    setIsDeckShowMode(true);
    setCardId(0);
  };

  return (
    <div style={{ display: isDeckShowMode ? "none" : "block" }}>
      {allDeckNames.map((deckName) => {
        return (
          <div onClick={() => handleDeckNameSelect(deckName)} key={deckName}>
            {deckName}
          </div>
        );
      })}
    </div>
  );
};
