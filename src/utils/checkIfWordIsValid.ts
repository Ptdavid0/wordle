import { fiveLetterWordArray } from "../constants/fiveLetterWords";

export const isWordValid = (word: string) => fiveLetterWordArray.includes(word);
