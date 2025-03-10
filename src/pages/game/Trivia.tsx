import React, { useState } from 'react';
import QuestionScreen from '../../components/QuestionScreen';
import CoverOne from '../../images/dashen/background.jpg';

const Trivia = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${CoverOne})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
      }}
    >
      {!gameStarted ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-white">
            Welcome to Trivia Game
          </h1>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      ) : (
        <QuestionScreen />
      )}
    </div>
  );
};

export default Trivia;
