import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { UPDATE_GAME_STATUS } from '../../store/constants';
import { AppDispatch } from '../../store';
import { Board } from '../../components/puzze/Board';
import { useTilesPositionStatus } from '../../hooks/useTilesPositionStatus';
import { useTimer } from '../../hooks/useTimer';

const formatTime = (time: number): string => {
  return `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;
};

export const TimeLimitScreen: React.FC = () => {
  const areTilesAligned = useTilesPositionStatus();
  const dispatch = useDispatch<AppDispatch>();
  const [timeLeft, startTimer, pauseTimer] = useTimer(30); // seconds
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    if (areTilesAligned || timeLeft === 0 || !isGameStarted) {
      dispatch({ type: UPDATE_GAME_STATUS, payload: false });
      pauseTimer();
    } else {
      dispatch({ type: UPDATE_GAME_STATUS, payload: true });
    }
  }, [timeLeft, areTilesAligned, dispatch, isGameStarted, pauseTimer]);

  const startGame = () => {
    startTimer();
    setIsGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-5">
      <h1 className="text-black text-2xl my-3">{formatTime(timeLeft)}</h1>

      <Board />

      <div className="mt-4">
        {areTilesAligned ? (
          <>
            <h1 className="text-green-500">Woah! You're a Pro😃👍</h1>
            <Link to="/puzzle">
              <button>New Game</button>
            </Link>
          </>
        ) : timeLeft === 0 ? (
          <>
            <h2 className="text-white bg-red-500 p-2">
              Mission Failed, We'll Get 'Em Next Time
            </h2>
            <Link to="/puzzle">
              <button>New Game</button>
            </Link>
          </>
        ) : (
          !isGameStarted && (
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
              onClick={startGame}
            >
              Start
            </button>
          )
        )}
      </div>
    </div>
  );
};
