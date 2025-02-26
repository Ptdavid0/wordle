import React, { useRef } from "react";
import Letter from "./Letter";
import { ILine } from "../types";
import { useGameContext } from "../contexts/GameContext";

interface IProps {
  line: ILine;
}

const Line: React.FC<IProps> = ({ line }) => {
  const { gameData } = useGameContext();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const triggerFocusChange = (value: string, index: number) => {
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const setRef = (el: HTMLInputElement | null, index: number) =>
    (inputRefs.current[index] = el);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    value: string | undefined
  ) => {
    if (event.code === "Backspace" && !value) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      {line.letters.map((letter, index) => (
        <Letter
          letter={letter}
          key={letter.key}
          index={index}
          setRef={setRef}
          disabled={gameData?.currentLine !== line.line}
          triggerFocusChange={triggerFocusChange}
          handleKeyDown={handleKeyDown}
        />
      ))}
    </div>
  );
};

export default Line;
