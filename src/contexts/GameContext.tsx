import React, { createContext, useContext, useEffect, useMemo } from "react";
import { generateInitialData } from "../utils/generateInitalData";
import { ELetterStatus, IGameData, ILetter, ILine } from "../types";
import { isWordValid } from "../utils/checkIfWordIsValid";
import { reducer } from "../reducers/gameReducer";
import { getRandomWord } from "../utils/getRandomWord";

interface IGameContext {
  gameData: IGameData | undefined;
  handleLetterChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void;
  checkWord: () => void;
  shouldButtonBeDisabled: boolean;
  gameIsReady: boolean;
}

const GameContext = createContext<IGameContext | undefined>(undefined);

export const GameProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(reducer, generateInitialData());

  useEffect(() => {
    async function fetchWords() {
      const response = await fetch(
        "https://cheaderthecoder.github.io/5-Letter-words/words.json"
      );
      const { words } = (await response.json()) || {};
      dispatch({ type: "SET_WORD", payload: getRandomWord(words) });
      dispatch({ type: "SET_WORD_ARRAY", payload: words });
      console.log(words);
    }

    fetchWords();
  }, []);

  function handleLetterChange(
    event: React.ChangeEvent<HTMLInputElement>,
    letterKey: string
  ) {
    const newLines = state?.lines.map((line: ILine) => ({
      ...line,
      letters: line.letters.map((letter) =>
        letter.key === letterKey
          ? { ...letter, letter: event.target.value.toUpperCase() }
          : letter
      ),
    }));

    dispatch({ type: "UPDATE_LINES", payload: newLines });
  }

  const isPerfectMatch = () => {
    const currentUserWord = state?.lines[state.currentLine].letters
      .map((letter: ILetter) => letter.letter)
      .join("");
    return currentUserWord === state?.word.toUpperCase();
  };

  const currentWord = useMemo(() => {
    return (
      state?.lines[state?.currentLine].letters
        ?.map((letter: ILetter) => letter.letter)
        .join("") || ""
    ).toLowerCase();
  }, [state?.currentLine, state?.lines]);

  const shouldButtonBeDisabled = useMemo(() => {
    return currentWord.length !== 5;
  }, [currentWord]);

  const handleWordClean = () => {
    alert(`The word ${currentWord} is not valid`);
    const updatedLines = state?.lines.map((line: ILine) => ({
      ...line,
      letters: line.letters.map((letter) => {
        if (line.line !== state.currentLine) return letter;
        else return { ...letter, letter: "" };
      }),
    }));

    dispatch({ type: "CLEAN_WORD", payload: updatedLines });
  };

  function checkWord() {
    if (!isWordValid(currentWord, state?.wordList)) {
      handleWordClean();
      return;
    }

    const correctWord = state?.word?.toUpperCase()?.split("") || "";

    const remainingLetters = [...correctWord];

    // Check for matches or incorrect
    const newLines = state?.lines.map((line: ILine) => ({
      ...line,
      letters: line.letters.map((letter, index) => {
        if (line.line !== state.currentLine) return letter;

        let newStatus = ELetterStatus.WRONG;

        if (letter.letter === correctWord[index]) {
          newStatus = ELetterStatus.POSITION_CORRECT;
          remainingLetters[index] = "";
        }

        return { ...letter, status: newStatus };
      }),
    }));

    // Verify misplaced letters
    newLines?.[state!.currentLine].letters.forEach((letter: ILetter) => {
      if (
        letter.status === ELetterStatus.WRONG &&
        remainingLetters.includes(letter.letter)
      ) {
        letter.status = ELetterStatus.MISPLACED;
        remainingLetters[remainingLetters.indexOf(letter.letter)] = "";
      }
    });

    dispatch({
      type: "CONCLUDE_TURN",
      payload: newLines,
    });

    setTimeout(() => {
      if (isPerfectMatch()) {
        alert(`Game Over, you won! You used ${state!.currentLine + 1} lines.`);
      } else if (state!.currentLine === 5) {
        alert("Game Over, you lost.");
      }
    }, 100);
  }

  return (
    <GameContext.Provider
      value={{
        gameData: state,
        handleLetterChange,
        checkWord,
        shouldButtonBeDisabled,
        gameIsReady: state.gameIsReady,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): IGameContext => {
  const context = useContext(GameContext);

  if (!context)
    throw new Error("useGameContext must be used within an GameProvider");

  return context;
};
