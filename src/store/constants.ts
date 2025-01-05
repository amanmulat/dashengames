// src/constants.ts
export const SELECT_GAME_MODE = 'SELECT_GAME_MODE';
export const SELECT_TILE = 'SELECT_TILE';
export const UNSELECT_TILE = 'UNSELECT_TILE';
export const RESET_SWAP = 'RESET_SWAP';
export const SWAP_TILES = 'SWAP_TILE';
export const UPDATE_TILE_STATUS = 'UPDATE_TILE_STATUS';

export const SET_BOARD_DIMENSIONS = 'SET_BOARD_DIMENSIONS';
export const SET_IMAGE_DIMENSION = 'SET_IMAGE_DIMENSION';
export const SET_IMAGE_URL = 'SET_IMAGE_URL';

export const UPDATE_GAME_STATUS = 'UPDATE_GAME_STATUS';

export const gameMode = Object.freeze({
  timeLimit: 'timeLimit' as const,
  minSwaps: 'minSwaps' as const,
  none: null as const,
});

export const gameModeUrlMap = Object.freeze({
  [gameMode.timeLimit]: '/time-limit-mode',
  [gameMode.minSwaps]: '/min-swaps-mode',
});

export type GameMode = (typeof gameMode)[keyof typeof gameMode];
