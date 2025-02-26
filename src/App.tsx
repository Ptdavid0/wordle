import "./App.css";
import Line from "./components/Line";
import { useGameContext } from "./contexts/GameContext";

function App() {
  const { gameData, checkWord, shouldButtonBeDisabled, gameIsReady } =
    useGameContext();

  return (
    <>
      <h1>Wordle Game</h1>
      {gameData && gameIsReady
        ? gameData.lines?.map((line) => <Line line={line} key={line.key} />)
        : null}
      <h1>{gameData && gameData.word}</h1>

      <button disabled={shouldButtonBeDisabled} onClick={checkWord}>
        Enter
      </button>
    </>
  );
}

export default App;
