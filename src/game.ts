import { words as dictionaryWords } from "./data/words";
import { WordsMap, WordGame } from "./game.types"

const getUniqueLetters = (word: string): string[] => {
  let letters: string[] = [];

  word.split("").forEach((letter) => {
    if (letters.includes(letter)) {
      return;
    }

    letters.push(letter);
  });

  return letters;
};

export const doesWordMatchLetters = (word: string, letters: string[]) => {
  let isIncluded = true;

  word.split("").forEach((letter) => {
    if (!isIncluded) return;

    if (!letters.includes(letter)) {
      isIncluded = false;
    }
  });

  return isIncluded;
};

const isWordPanagram = (word: string, letters: string[]): boolean => {
  return getUniqueLetters(word).sort().join() === letters.sort().join();
};

const calculateScoreForWord = (word: string, isPanagram: boolean): number => {
  const baseScore = word.length === 4 ? 1 : word.length;

  return isPanagram ? baseScore + 7 : baseScore;
};

const generateWordsResponse = (words: string[], seedLetters: string[]): WordsMap => {
  let response: WordsMap = {};

  words.forEach((word) => {
    const isPanagram = isWordPanagram(word, seedLetters);
    response[word] = {
      word,
      pointValue: calculateScoreForWord(word, isPanagram),
      isPanagram
    };
  });

  return response;
};

const createScoreTiers = (maxScore: number) => {
  return {
    "Maximum Points": maxScore,
    Genius: Math.floor(maxScore * 0.7),
    Awesome: Math.floor(maxScore * 0.5),
    Great: Math.floor(maxScore * 0.35),
    Nifty: Math.floor(maxScore * 0.2),
    "Getting There": Math.floor(maxScore * 0.1),
    "It's Something": Math.floor(maxScore * 0.05)
  };
};

export const createGame = (): WordGame => {
  const words: string[] = dictionaryWords;

  const wordsWithEnoughLetters: string[] = words.filter(
    (word) => getUniqueLetters(word).length === 7
  );
  const randomIndex: number = Math.floor(Math.random() * wordsWithEnoughLetters.length);
  const seedWord: string = wordsWithEnoughLetters[randomIndex];
  const seedLetters: string[] = getUniqueLetters(seedWord);
  const middleLetter: string = seedWord[0];

  const wordsForGame: string[] = words.filter((word) => {
    return (
      doesWordMatchLetters(word, seedLetters) && word.includes(middleLetter)
    );
  });

  const wordsMap: WordsMap = generateWordsResponse(wordsForGame.sort(), seedLetters);
  const maxScore: number = Object.values(wordsMap)
    .map((word) => word.pointValue)
    .reduce((prev, current) => prev + current);
  const gameData: WordGame = {
    seedWord,
    seedLetters,
    middleLetter,
    words: wordsMap,
    maxScore,
    scoreTiers: createScoreTiers(maxScore)
  };

  return gameData;
};
