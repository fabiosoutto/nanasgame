import './GameOver.css';
import background from "../img/gta5-game-over.gif";

const GameOver = ({ retry, score }) => {
  return (
    <div className="gameOver" style={{ backgroundImage: `url(${background})`}}>
      <h1>Fim de jogo!</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={retry}>Reiniciar o jogo</button>
    </div>
  );
};

export default GameOver;