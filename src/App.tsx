import "./App.css";
import Line from "./components/Line";
import { useGameContext } from "./contexts/GameContext";

function App() {
  const { gameData, checkWord } = useGameContext();

  return (
    <>
      <h1>Wordle Game</h1>
      {gameData &&
        gameData.lines?.map((line) => <Line line={line} key={line.key} />)}
      <button onClick={checkWord}>Enter</button>
    </>
  );
}

export default App;
