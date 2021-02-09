import "./styles.css";
import { createGame, doesWordMatchLetters } from "./game";
import { useState } from "react";
import { WordGame } from "./game.types"

const gameData: WordGame = createGame();

export default function App() {
  console.log(gameData);
  const [word, setWord] = useState<string>("");
  const [notification, setNotification] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

  const handleInput = (e: any) => {
    const word = e.target.value.toUpperCase();
    if (!doesWordMatchLetters(word, gameData.seedLetters)) return;

    setWord(word);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const isInvalid = !gameData.words[word] || answers.includes(word);

    if (isInvalid) {
      return setWord("");
    }

    setAnswers([...answers, word]);
    setScore(score + gameData.words[word].pointValue);
    return setWord("");
  };

  return (
    <div className="App">
      <h1>Word Game</h1>
      <p>Score: {score}</p>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInput} value={word} />
      </form>
      <div>
        {gameData.seedLetters.map((letter) => {
          const isMiddle = letter === gameData.middleLetter;
          return isMiddle ? <strong>{letter}</strong> : <span>{letter}</span>;
        })}
      </div>
      <div>
        {answers.map((answer) => (
          <p key={answer}>{answer}</p>
        ))}
      </div>
    </div>
  );
}
