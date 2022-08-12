// Styles
import './App.css';
import background from "./img/nana-bg1.png";

// React
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

// Data
import { wordsList } from './data/words';

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }
];

const guessesQt = 5

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQt);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * (categories.length))];
    const word = words[category][Math.floor(Math.random() * (words[category].length))];
    return { word, category }
  }, [words]);

  // Starts the game
  const startGame = useCallback(() => {
    clearLetterStates();
    const { word, category } = pickWordAndCategory();
    let wordLetters = word.toLowerCase().split("");
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // Process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check if letter has alredy been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    };

    // push guessed letter or remove a chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    };
  };

  const clearLetterStates = () => {
    setGuesses(guessesQt);
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {

    if(guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (uniqueLetters.length !== 0 && guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore += 100);
      Swal.fire({
        title: 'Isso aí, você acertou!',
        text: '+100 pontos',
        icon: 'success',
        confirmButtonColor: "#26a0da"
      });
      startGame();
    };
  }, [guessedLetters, letters, startGame]);

  // Restarts the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQt);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${background})`}}>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
