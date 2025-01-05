import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { UPDATE_GAME_STATUS } from '../../store/constants';
import { RootState, AppDispatch } from '../../store';
import { useTilesPositionStatus } from '../../hooks/useTilesPositionStatus';
import { Board } from '../../components/puzze/Board';

const useSwapsCount = (): number => {
  const [swapsDone, setSwapsDone] = useState(0);
  const isSwapped = useSelector((state: RootState) => state.game.swap);

  useEffect(() => {
    if (isSwapped) {
      setSwapsDone((swap) => swap + 1);
    }
  }, [isSwapped]);

  return swapsDone;
};

const useThresholdExceeded = (numOfSwaps: number): boolean => {
  const [isThresholdExceeded, setIsThresholdExceeded] = useState(false);
  const threshold = useSelector(
    (state: RootState) => state.game.minSwapsMode.threshold,
  );

  useEffect(() => {
    if (numOfSwaps > threshold) {
      setIsThresholdExceeded(true);
    }
  }, [numOfSwaps, threshold]);

  return isThresholdExceeded;
};

export const MinSwapsScreen: React.FC = () => {
  const swapsDone = useSwapsCount();
  const isThresholdExceeded = useThresholdExceeded(swapsDone);
  const threshold = useSelector(
    (state: RootState) => state.game.minSwapsMode.threshold,
  );
  const areTilesAligned = useTilesPositionStatus();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isThresholdExceeded || areTilesAligned) {
      dispatch({ type: UPDATE_GAME_STATUS, payload: false });
    } else {
      dispatch({ type: UPDATE_GAME_STATUS, payload: true });
    }
  }, [isThresholdExceeded, areTilesAligned, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-2">
      <h1 className="text-black text-2xl my-3">
        Solve Puzzle in {threshold} Swaps or less
      </h1>
      <Board />

      {areTilesAligned ? (
        <>
          <h1 className="text-green-500 text-2xl mt-4">
            All tiles are aligned, You won!😃👍
          </h1>
          <Link to="/puzzle">
            <button className="bg-blue-500 mt-3 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition">
              New Game
            </button>
          </Link>
        </>
      ) : isThresholdExceeded ? (
        <>
          <h2 className="text-red-500">
            Max Number of Swaps Exceeded, Shame on you loser👿👎
          </h2>
          <Link to="/puzzle">
            <button className="bg-blue-500 mt-3 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition">
              New Game
            </button>
          </Link>
        </>
      ) : (
        <h2>Swaps Done: {swapsDone}</h2>
      )}
    </div>
  );
};
