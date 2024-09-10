import React, { useContext, useEffect, useState } from "react";
import { CardCreatorContext } from "../../contexts/card-creator-context";
import { useNavigate } from "react-router-dom";

export const ShowDeckOfCards = () => {
  const navigate = useNavigate();
  const [allDeckNames, setAllDeckNames] = useState([]);

  const { isDeckShowMode, setDeckName, setIsDeckShowMode, setCardId } =
    useContext(CardCreatorContext);

  useEffect(() => {
    const getAllDeck = JSON.parse(localStorage.getItem("deckOfCards")) || {};
    setAllDeckNames(Object.keys(getAllDeck));
    setIsDeckShowMode(false);
  }, []);

  const handleDeckNameSelect = (deckName) => {
    setDeckName(deckName);
    setIsDeckShowMode(true);
    setCardId(0);
    navigate(`/deck-of-cards/${deckName}`);
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
