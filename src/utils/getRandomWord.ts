import { fiveLetterWordArray } from "../constants/fiveLetterWords";

export const getRandomWord = () =>
  fiveLetterWordArray[Math.floor(Math.random() * fiveLetterWordArray.length)];
