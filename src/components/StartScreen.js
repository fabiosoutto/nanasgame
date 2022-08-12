import "./StartScreen.css";

const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
        <h1>Nana's Secret Word</h1>
        <h2>The Game</h2>
        <p>Clique no botão para iniciar!</p>
        <button onClick={startGame}>Iniciar!</button>
        <p>Licensed to Nana Gimenes Twitch Channel<br/>
        &copy; 2022 Developed by: <a href="https://fabiosouttodev.vercel.app" rel="noreferrer" target="_blank">Fabio Soutto Dev</a> - "in code we trust"
        </p>
    </div>
  );
  
};

export default StartScreen;