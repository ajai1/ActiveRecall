import React, { useContext } from "react";
import "../../../styles/flashcard/controls/recallcontrols.css";
import { recallChanges, shuffle } from "../../../utils/Utilities";
import { ENDPOINTS, HEADERS } from "../../../constants/apiConstants";
import { CardContext } from "../../../contexts/card-context";

export const RecallControls = () => {
  const {
    currentCardId,
    recallCards,
    setRecallCards,
    deckname,
    setCurrentCardId,
    knowVeryWell,
    littleConfusing,
    dontKnow,
    setDontKnow,
    setLittleConfusing,
    setKnowVeryWell,
  } = useContext(CardContext);

  const recallAPICall = (cardRecallToModify) => {
    const url = ENDPOINTS.CARDS.UPDATE_CARD.endpoint("ajai", deckname);
    fetch(url, {
      method: ENDPOINTS.CARDS.UPDATE_CARD.method,
      headers: HEADERS,
      body: JSON.stringify(cardRecallToModify),
    })
      .then((res) => res.json())
      .then((json) => {});
  };

  /*   const recallCalculator = (handleType, modifyRecallCards) => {
    let dKCards = [...dontKnow];
    let lKCards = [...littleConfusing];
    let kCards = [...knowVeryWell];
    let changeFactor = recallChanges(
      modifyRecallCards[currentCardId].recall,
      handleType
    );
  };
 */
  const recallHandler = (handleType) => {
    let modifyRecallCards = [...recallCards];
    let dKCards = dontKnow.length == 0 ? [] : [...dontKnow];
    let lKCards = littleConfusing.length == 0 ? [] : [...littleConfusing];
    let kCards = knowVeryWell.length == 0 ? [] : [...knowVeryWell];
    let changeFactor = recallChanges(
      modifyRecallCards[currentCardId].recall,
      handleType
    );
    // remove from the deck, later we will align to the correct recall deck
    if (modifyRecallCards[currentCardId].recall == 3) {
      dKCards = dKCards.filter(
        (card) => card.uid != modifyRecallCards[currentCardId].uid
      );
    } else if (modifyRecallCards[currentCardId].recall == 2) {
      lKCards = lKCards.filter(
        (card) => card.uid != modifyRecallCards[currentCardId].uid
      );
    } else if (modifyRecallCards[currentCardId].recall == 1) {
      kCards = kCards.filter(
        (card) => card.uid != modifyRecallCards[currentCardId].uid
      );
    }
    if (modifyRecallCards[currentCardId].recall != handleType) {
      modifyRecallCards[currentCardId].recall = handleType;
      recallAPICall(modifyRecallCards[currentCardId]);
    }

    if (handleType == 3) {
      dKCards.push(modifyRecallCards[currentCardId]);
    } else if (handleType == 2) {
      lKCards.push(modifyRecallCards[currentCardId]);
    } else if (handleType == 1) {
      kCards.push(modifyRecallCards[currentCardId]);
    }
    setLittleConfusing(lKCards);
    setDontKnow(dKCards);
    setKnowVeryWell(kCards);

    let firstHalf = modifyRecallCards.slice(0, currentCardId + 1);
    let secondHalf = modifyRecallCards.slice(
      currentCardId + 1,
      modifyRecallCards.length
    );
    if (changeFactor < 0) {
      //remove
      while (changeFactor < 0) {
        const index = secondHalf.findIndex(
          (card) => card.uid == modifyRecallCards[currentCardId].uid
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
        secondHalf.splice(
          randomPlaceOfInsertion,
          0,
          modifyRecallCards[currentCardId]
        );
      }
    }
    secondHalf = shuffle(secondHalf);
    modifyRecallCards = [...firstHalf, ...secondHalf];
    setRecallCards(modifyRecallCards);
    if (currentCardId < modifyRecallCards.length - 1) {
      setCurrentCardId((prev) => prev + 1);
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
