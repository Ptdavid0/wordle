import { ELetterStatus, IGameData } from "../types";

export function generateInitialData(): IGameData {
  return {
    currentLine: 0,
    gameIsReady: false,
    word: "",
    wordList: [],
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
