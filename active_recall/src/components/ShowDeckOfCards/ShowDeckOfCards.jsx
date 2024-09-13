import React, { useContext, useEffect, useState } from "react";
import { CardCreatorContext } from "../../contexts/card-creator-context";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../utils/localStorageService";

export const ShowDeckOfCards = () => {
  const navigate = useNavigate();
  const [allDeckNames, setAllDeckNames] = useState([]);

  const { setDeckName, setIsDeckShowMode, setCardId } =
    useContext(CardCreatorContext);

  useEffect(() => {
    const getAllDeck = getLocalStorage("deckOfCards") || {};
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
    <div className="deck_grid_container">
      {allDeckNames.map((deckName) => {
        return (
          <div
            className="deck_grid_item"
            onClick={() => handleDeckNameSelect(deckName)}
            key={deckName}
          >
            {deckName}
          </div>
        );
      })}
    </div>
  );
};
