import "./App.css";
import Line from "./components/Line";
import { useGameContext } from "./contexts/GameContext";

function App() {
  const { gameData, checkWord, shouldButtonBeDisabled, gameIsReady } =
    useGameContext();

  if (!gameData || !gameIsReady) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Wordle Game</h1>
      {gameData.lines?.map((line) => (
        <Line line={line} key={line.key} />
      ))}

      <button disabled={shouldButtonBeDisabled} onClick={checkWord}>
        Enter
      </button>
    </>
  );
}

export default App;
