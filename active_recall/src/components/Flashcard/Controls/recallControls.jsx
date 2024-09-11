import React, { useContext } from "react";
import "../../../styles/flashcard/controls/recallcontrols.css";
import { CardCreatorContext } from "../../../contexts/card-creator-context";
import { recallChanges, shuffle } from "../../../utils/Utilities";

export const RecallControls = () => {
  const {
    cardId,
    recallCards,
    setRecallCards,
    deckName,
    setCardId,
    knowVeryWell,
    littleConfusing,
    dontKnow,
    setDontKnow,
    setLittleConfusing,
    setKnowVeryWell,
    setNoOfCardsInThisDeck,
  } = useContext(CardCreatorContext);

  const recallHandler = (handleType) => {
    let modifyRecallCards = [...recallCards];
    let dKCards = dontKnow.length == 0 ? [] : [...dontKnow];
    let lKCards = littleConfusing.length == 0 ? [] : [...littleConfusing];
    let kCards = knowVeryWell.length == 0 ? [] : [...knowVeryWell];
    let changeFactor = recallChanges(
      modifyRecallCards[cardId].recall,
      handleType
    );

    if (modifyRecallCards[cardId].recall == 3) {
      dKCards = dKCards.filter(
        (card) => card.uid != modifyRecallCards[cardId].uid
      );
    } else if (modifyRecallCards[cardId].recall == 2) {
      lKCards = lKCards.filter(
        (card) => card.uid != modifyRecallCards[cardId].uid
      );
    } else if (modifyRecallCards[cardId].recall == 1) {
      kCards = kCards.filter(
        (card) => card.uid != modifyRecallCards[cardId].uid
      );
    }
    modifyRecallCards[cardId].recall = handleType;
    if (handleType == 3) {
      dKCards.push(modifyRecallCards[cardId]);
    } else if (handleType == 2) {
      lKCards.push(modifyRecallCards[cardId]);
    } else if (handleType == 1) {
      kCards.push(modifyRecallCards[cardId]);
    }
    setLittleConfusing(lKCards);
    setDontKnow(dKCards);
    setKnowVeryWell(kCards);
    const deckOfCards = JSON.parse(localStorage.getItem("deckOfCards")) || {};
    deckOfCards[deckName] = [...dKCards, ...lKCards, ...kCards];
    localStorage.setItem("deckOfCards", JSON.stringify(deckOfCards));

    let firstHalf = modifyRecallCards.slice(0, cardId + 1);
    let secondHalf = modifyRecallCards.slice(
      cardId + 1,
      modifyRecallCards.length
    );
    if (changeFactor < 0) {
      //remove
      while (changeFactor < 0) {
        const index = secondHalf.findIndex(
          (card) => card.uid == modifyRecallCards[cardId].uid
        );
        if (index != -1) {
          secondHalf.splice(index, 1);
          changeFactor++;
        } else {
          break;
        }
      }
    } else {
      for (let i = 0; i < changeFactor; i++) {
        let randomPlaceOfInsertion =
          Math.floor(Math.random() * (secondHalf.length - 0)) + 0;
        secondHalf.splice(randomPlaceOfInsertion, 0, modifyRecallCards[cardId]);
      }
    }
    secondHalf = shuffle(secondHalf);
    modifyRecallCards = [...firstHalf, ...secondHalf];
    setRecallCards(modifyRecallCards);
    setNoOfCardsInThisDeck(modifyRecallCards.length);
    if (cardId < modifyRecallCards.length - 1) {
      setCardId((prev) => prev + 1);
    }
  };

  return (
    <div className="recall_container">
      <div
        onClick={() => recallHandler(1)}
        className="know_very_well recall_controls"
      >
        Know very well
      </div>
      <div
        onClick={() => recallHandler(2)}
        className="little_confusing recall_controls"
      >
        Little Confusing
      </div>
      <div
        onClick={() => recallHandler(3)}
        className="dont_know recall_controls"
      >
        Don't Understand
      </div>
    </div>
  );
};
