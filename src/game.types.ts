export type WordsMap = {
  [key: string]: Word
}

export type ScoreTierMap = {
  [key: string]: number;
}

export interface Word {
  word: string;
  pointValue: number;
  isPanagram: boolean;
}

export interface WordGame {
  seedWord: string;
  seedLetters: string[];
  middleLetter: string;
  words: WordsMap;
  maxScore: number;
  scoreTiers: ScoreTierMap;
}