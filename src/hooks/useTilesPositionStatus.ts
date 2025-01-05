import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

/**
 * Use it to find out whether all tiles are in position
 */
export const useTilesPositionStatus = (): boolean => {
  const [areTilesInPosition, setAreTilesInPosition] = useState(false);

  const tilesStatus = useSelector((state: RootState) => state.game.tilesStatus);

  useEffect(() => {
    const areInPosition = Object.values(tilesStatus).every(
      (status) => status === true,
    );
    setAreTilesInPosition(areInPosition);
  }, [tilesStatus]);

  return areTilesInPosition;
};
