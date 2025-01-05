import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  SELECT_TILE,
  UNSELECT_TILE,
  UPDATE_TILE_STATUS,
  RESET_SWAP,
} from '../../store/constants';
import { RootState, AppDispatch } from '../../store';

interface TileProps {
  x: number; // Original X position
  y: number; // Original Y position
  randomX: number; // Randomized X position
  randomY: number; // Randomized Y position
}

export const Tile: React.FC<TileProps> = ({
  x: originalX,
  y: originalY,
  randomX,
  randomY,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const {
    rows,
    columns,
    url,
    width: imageWidth,
    height: imageHeight,
    swap,
  } = useSelector((state: RootState) => ({
    ...state.board,
    ...state.image,
    ...state.game,
  }));

  const selectedTiles = useSelector((state: RootState) => state.game.tiles);
  const isGamePlaying = useSelector((state: RootState) => state.game.isPlaying);

  const [x, setX] = useState(randomX);
  const [y, setY] = useState(randomY);

  const tileWidth = imageWidth / columns;
  const tileHeight = imageHeight / rows;

  const left = x * tileWidth;
  const top = y * tileHeight;

  const backgroundX = -(originalX * tileWidth);
  const backgroundY = -(originalY * tileHeight);

  useEffect(() => {
    if (isClicked) {
      dispatch({ type: SELECT_TILE, payload: [x, y] });
    } else {
      dispatch({ type: UNSELECT_TILE, payload: [x, y] });
    }
  }, [isClicked, dispatch, x, y]);

  useEffect(() => {
    const amIInRightPlace = originalX === x && originalY === y;

    dispatch({
      type: UPDATE_TILE_STATUS,
      payload: { id: `${originalX}${originalY}`, status: amIInRightPlace },
    });
  }, [originalX, originalY, x, y, dispatch]);

  useEffect(() => {
    const coords = [x, y];
    const isItMe = (tile: number[]) =>
      tile.every((coord, index) => coord === coords[index]);

    if (swap && selectedTiles.some((tile) => isItMe(tile))) {
      const [newX, newY] = selectedTiles.find((tile) => !isItMe(tile))!;
      setX(newX);
      setY(newY);
      setIsClicked(false);
      dispatch({ type: RESET_SWAP });
    }
  }, [selectedTiles, swap, x, y, dispatch]);

  return (
    <button
      onClick={() => setIsClicked(!isClicked)}
      disabled={!isGamePlaying}
      className={`absolute transition-all duration-200 ${
        isClicked
          ? 'z-20 shadow-lg border-4 border-white animate-pulse'
          : 'z-10 border'
      }`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        width: `${tileWidth}px`,
        height: `${tileHeight}px`,
        backgroundImage: `url(${url})`,
        backgroundPosition: `${backgroundX}px ${backgroundY}px`,
        backgroundSize: `${imageWidth}px ${imageHeight}px`,
      }}
    ></button>
  );
};
