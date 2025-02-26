import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { generateInitialData } from "../utils/generateInitalData";
import { ELetterStatus, IGameData } from "../types";
import { isWordValid } from "../utils/checkIfWordIsValid";

interface IGameContext {
  gameData: IGameData | undefined;
  handleLetterChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void;
  checkWord: () => void;
}

const GameContext = createContext<IGameContext | undefined>(undefined);

export const GameProvider = ({ children }: React.PropsWithChildren) => {
  const [gameData, setGameData] = useState<IGameData>();

  useEffect(() => {
    const initialData = generateInitialData();
    setGameData(initialData);
  }, []);

  function handleLetterChange(
    event: React.ChangeEvent<HTMLInputElement>,
    letterKey: string
  ) {
    const newLines = gameData?.lines.map((line) => ({
      ...line,
      letters: line.letters.map((letter) =>
        letter.key === letterKey
          ? { ...letter, letter: event.target.value.toUpperCase() }
          : letter
      ),
    }));

    setGameData({ ...gameData, lines: newLines });
  }

  const isPerfectMatch = () => {
    const currentUserWord = gameData?.lines[gameData.currentLine].letters
      .map((letter) => letter.letter)
      .join("");
    return currentUserWord === gameData?.word.toUpperCase();
  };

  const currentWord = useMemo(() => {
    return (
      gameData?.lines[gameData?.currentLine].letters
        ?.map((letter) => letter.letter)
        .join("") || ""
    ).toLowerCase();
  }, [gameData?.currentLine, gameData?.lines]);

  const handleWordClean = () => {
    alert(`The word ${currentWord} is not valid`);
    const updatedLines = gameData?.lines.map((line) => ({
      ...line,
      letters: line.letters.map((letter) => {
        if (line.line !== gameData.currentLine) return letter;
        else return { ...letter, letter: "" };
      }),
    }));
    setGameData((prev) => ({
      ...prev,
      lines: updatedLines,
    }));
  };

  function checkWord() {
    if (!isWordValid(currentWord)) {
      handleWordClean();
      return;
    }

    const correctWord = gameData?.word?.toUpperCase()?.split("") || "";

    const remainingLetters = [...correctWord];

    // Check for matches or incorrect
    const newLines = gameData?.lines.map((line) => ({
      ...line,
      letters: line.letters.map((letter, index) => {
        if (line.line !== gameData.currentLine) return letter;

        let newStatus = ELetterStatus.WRONG;

        if (letter.letter === correctWord[index]) {
          newStatus = ELetterStatus.POSITION_CORRECT;
          remainingLetters[index] = "";
        }

        return { ...letter, status: newStatus };
      }),
    }));

    // Verify misplaced letters
    newLines?.[gameData!.currentLine].letters.forEach((letter) => {
      if (
        letter.status === ELetterStatus.WRONG &&
        remainingLetters.includes(letter.letter)
      ) {
        letter.status = ELetterStatus.MISPLACED;
        remainingLetters[remainingLetters.indexOf(letter.letter)] = "";
      }
    });

    setGameData((prev) => ({
      ...prev,
      currentLine: prev?.currentLine + 1,
      lines: newLines,
    }));

    if (isPerfectMatch()) {
      alert(
        `Game is Over, you won. Congratulations on using only ${
          gameData?.currentLine && gameData?.currentLine + 1
        } lines`
      );
    }
  }

  return (
    <GameContext.Provider value={{ gameData, handleLetterChange, checkWord }}>
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
