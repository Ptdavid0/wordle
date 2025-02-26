import { ILine, IGameData } from "../types";

interface IAction {
  type:
    | "UPDATE_LINES"
    | "CLEAN_WORD"
    | "CONCLUDE_TURN"
    | "SET_WORD"
    | "SET_WORD_ARRAY";
  payload: ILine[] | string | undefined;
}

export const reducer = (state: IGameData, action: IAction) => {
  switch (action.type) {
    case "UPDATE_LINES":
      return {
        ...state,
        lines: action.payload,
      };
    case "CLEAN_WORD":
      return {
        ...state,
        lines: action.payload,
      };
    case "CONCLUDE_TURN":
      return {
        ...state,
        currentLine: state.currentLine + 1,
        lines: action.payload,
      };
    case "SET_WORD":
      return {
        ...state,
        word: action.payload,
        gameIsReady: true,
      };
    case "SET_WORD_ARRAY":
      return {
        ...state,
        wordList: action.payload,
      };
    default:
      return state;
  }
};
