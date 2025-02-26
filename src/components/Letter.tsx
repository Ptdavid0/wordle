import React from "react";
import styled from "styled-components";
import { ELetterStatus, ILetter } from "../types";
import { useGameContext } from "../contexts/GameContext";

interface IProps {
  letter: ILetter;
  disabled: boolean;
  index: number;
  setRef: (el: HTMLInputElement | null, index: number) => void;
  triggerFocusChange: (value: string, index: number) => void;
  handleKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    value: string | undefined
  ) => void;
}

const getBackgroundColor = (status: ELetterStatus) => {
  if (status === ELetterStatus.POSITION_CORRECT) return "green";
  if (status === ELetterStatus.MISPLACED) return "yellow";
  return "";
};

const Letter: React.FC<IProps> = ({
  letter,
  disabled,
  setRef,
  triggerFocusChange,
  index,
  handleKeyDown,
}) => {
  const { handleLetterChange } = useGameContext();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleLetterChange(event, letter.key);
    triggerFocusChange(event.target.value, index);
  };

  return (
    <StyledInput
      type="text"
      maxLength={1}
      value={letter.letter}
      onChange={handleOnChange}
      disabled={disabled}
      status={letter.status}
      ref={(el) => setRef(el, index)}
      onKeyDown={(e) => handleKeyDown(e, index, letter.letter)}
    />
  );
};

const StyledInput = styled.input<{ status: ELetterStatus }>`
  width: 50px;
  height: 50px;
  font-size: 40px;
  text-align: center;
  margin: 5px;
  background-color: ${(props) => getBackgroundColor(props.status)};
`;

export default Letter;
