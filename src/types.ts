export enum ELetterStatus {
  WRONG = "wrong",
  POSITION_CORRECT = "position_correct",
  MISPLACED = "misplaced",
  EMPTY = "empty",
}

export interface IGameData {
  currentLine: number;
  word: string;
  lines: ILine[];
}

export interface ILine {
  key: string;
  line: number;
  completed: boolean;
  letters: ILetter[];
}

export interface ILetter {
  key: string;
  status: ELetterStatus;
  letter: string;
}
