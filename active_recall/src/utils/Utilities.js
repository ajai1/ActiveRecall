export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const filterOutRecallCards = (cards) => {
  let knowVeryWell = [];
  let littleConfusing = [];
  let dontKnow = [];
  cards.forEach((card) => {
    if (!card.recall) card.recall = 1;
    if (card.recall == 3) {
      dontKnow.push(card);
    } else if (card.recall == 2) {
      littleConfusing.push(card);
    } else {
      knowVeryWell.push(card);
    }
  });
  return { knowVeryWell, littleConfusing, dontKnow };
};

export const shuffleAndDuplicate = (
  knowVeryWell,
  littleConfusing,
  dontKnow
) => {
  const shuffledKnowns = multipleRepetitiveCards(knowVeryWell, 1);
  const shuffledLittleKnown = multipleRepetitiveCards(littleConfusing, 2);
  const shuffledDontKnows = multipleRepetitiveCards(dontKnow, 4);
  let littleAndDontKnows = shuffle([
    ...shuffledLittleKnown,
    ...shuffledDontKnows,
  ]);
  littleAndDontKnows = shuffle(littleAndDontKnows);
  return [...littleAndDontKnows, ...shuffledKnowns];
};

export const recallChanges = (prevRecall, currentRecall) => {
  if (prevRecall == 3) {
    if (currentRecall == 2) {
      return -1;
    }
    if (currentRecall == 1) {
      return -2;
    }
    if (currentRecall == 3) {
      return +3;
    }
  }
  if (prevRecall == 2) {
    if (currentRecall == 3) {
      return +3;
    }
    if (currentRecall == 1) {
      return -1;
    }
    if (currentRecall == 2) {
      return +2;
    }
  }
  if (prevRecall == 1) {
    if (currentRecall == 3) {
      return +3;
    }
    if (currentRecall == 2) {
      return +2;
    }
    if (currentRecall == 1) {
      return -1;
    }
  }
};

export const multipleRepetitiveCards = (cards, times = 1) => {
  const repetitive = [];
  cards.forEach((card) => {
    for (let i = 0; i < times; i++) {
      repetitive.push(card);
    }
  });
  return shuffle(repetitive);
};
