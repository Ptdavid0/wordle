import { ELetterStatus, IGameData } from "../types";
import { getRandomWord } from "./getRandomWord";

export function generateInitialData(): IGameData {
  return {
    currentLine: 0,
    word: getRandomWord(),
    lines: Array.from({ length: 6 }, (_, rowIndex) => {
      return {
        key: `Line-${rowIndex}`,
        line: rowIndex,
        completed: false,
        letters: Array.from({ length: 5 }, (_, letterIndex) => {
          return {
            key: `${rowIndex}${letterIndex}`,
            status: ELetterStatus.EMPTY,
            letter: "",
          };
        }),
      };
    }),
  };
}
