export const getRandomWord = (fiveLetterWordArray: string[]) => {
  return fiveLetterWordArray[
    Math.floor(Math.random() * fiveLetterWordArray.length)
  ];
};
