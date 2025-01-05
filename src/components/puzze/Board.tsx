import React, { useMemo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useSelector, useDispatch } from 'react-redux';
import { SWAP_TILES } from '../../store/constants';
import { RootState, AppDispatch } from '../../store';
import { Tile } from './Tile';

const useSwapDispatcher = () => {
  const selectedTiles = useSelector((state: RootState) => state.game.tiles);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (selectedTiles.length === 2) {
      dispatch({ type: SWAP_TILES });
    }
  }, [selectedTiles, dispatch]);
};

export const Board: React.FC = () => {
  useSwapDispatcher();

  const [numOfRows, numOfColumns] = useSelector((state: RootState) => [
    state.board.rows,
    state.board.columns,
  ]);
  const imageUrl = useSelector((state: RootState) => state.image.url);
  const [imageWidth, imageHeight] = useSelector((state: RootState) => [
    state.image.width,
    state.image.height,
  ]);

  const randomPositions = useMemo(() => {
    const alreadyAssignedPositions: Record<string, boolean> = {};
    const randomPositions: Record<string, [number, number]> = {};

    for (let j = 0; j < numOfRows; j++) {
      for (let i = 0; i < numOfColumns; i++) {
        let foundUniquePosition = false;

        while (!foundUniquePosition) {
          const randomX = Math.floor(Math.random() * numOfColumns);
          const randomY = Math.floor(Math.random() * numOfRows);

          if (!alreadyAssignedPositions[`${randomX}${randomY}`]) {
            randomPositions[`${i}${j}`] = [randomX, randomY];
            foundUniquePosition = true;
            alreadyAssignedPositions[`${randomX}${randomY}`] = true;
          }
        }
      }
    }
    return randomPositions;
  }, [numOfColumns, numOfRows]);

  const tiles = useMemo(() => {
    const tiles = [];

    for (let j = 0; j < numOfRows; j++) {
      const columns = [];

      for (let i = 0; i < numOfColumns; i++) {
        const [randomX, randomY] = randomPositions[`${i}${j}`];
        columns.push(
          <Tile
            key={uuidv4()}
            x={i}
            y={j}
            randomX={randomX}
            randomY={randomY}
          />,
        );
      }

      tiles.push(
        <div key={uuidv4()} className="flex">
          {columns}
        </div>,
      );
    }

    return tiles;
  }, [numOfColumns, numOfRows, randomPositions]);

  return (
    <div
      className="relative bg-white shadow-lg p-2"
      style={{ width: imageWidth, height: imageHeight }}
    >
      {tiles}
    </div>
  );
};
