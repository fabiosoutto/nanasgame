import "./Game.css";
import { useState, useRef } from 'react'
import background from "../img/game-bg.jpg";

const Game = ({ 
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score, 
}) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);

    setLetter("");

    letterInputRef.current.focus();
  };

  return (
    <div className="game" style={{ backgroundImage: `url(${background})`}}>
      <p className="points">
        <span>Pontos: </span> {score}
      </p>
      <h1>Descubra a palavra:</h1>
      <h3 className="tip">
        Dica da palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>
      <div className="wordContainer">
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
        <span key={i} className="letter" >
          {letter}
        </span> 
        ) : (
          <span key={i} className="blankSquare" ></span>
        )
      )}
      </div>
      <div className="letterContainer">
        <p>Adivinhe a Palavra:</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="letter" 
            maxLength="1" 
            required 
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
            />
          <button>Tentar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já usadas:</p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
        <p>Instruções: Para facilitar o jogo, não temos palavras com acentos.</p>
      </div>
    </div>
  );
};

export default Game;