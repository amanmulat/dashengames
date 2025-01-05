// src/reducers/game.reducer.ts
import {
  SWAP_TILES,
  RESET_SWAP,
  SELECT_TILE,
  UNSELECT_TILE,
  UPDATE_TILE_STATUS,
  SELECT_GAME_MODE,
  UPDATE_GAME_STATUS,
  gameMode,
} from '../constants';

interface GameState {
  swap: boolean;
  tiles: number[][]; // Array of coordinate pairs
  tilesStatus: Record<string, string>; // Tile status keyed by ID
  gameMode: keyof typeof gameMode | null;
  minSwapsMode: {
    threshold: number;
  };
  isPlaying: boolean;
}

interface SelectGameModeAction {
  type: typeof SELECT_GAME_MODE;
  payload: keyof typeof gameMode | null;
}

interface SwapTilesAction {
  type: typeof SWAP_TILES;
}

interface ResetSwapAction {
  type: typeof RESET_SWAP;
}

interface SelectTileAction {
  type: typeof SELECT_TILE;
  payload: number[]; // Coordinate pair
}

interface UnselectTileAction {
  type: typeof UNSELECT_TILE;
  payload: number[]; // Coordinate pair
}

interface UpdateTileStatusAction {
  type: typeof UPDATE_TILE_STATUS;
  payload: {
    id: string;
    status: string;
  };
}

interface UpdateGameStatusAction {
  type: typeof UPDATE_GAME_STATUS;
  payload: boolean;
}

type GameAction =
  | SelectGameModeAction
  | SwapTilesAction
  | ResetSwapAction
  | SelectTileAction
  | UnselectTileAction
  | UpdateTileStatusAction
  | UpdateGameStatusAction;

const defaultState: GameState = {
  swap: false,
  tiles: [],
  tilesStatus: {},
  gameMode: gameMode.none,
  minSwapsMode: {
    threshold: 10,
  },
  isPlaying: true,
};

const gameReducer = (
  state: GameState = defaultState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case SELECT_GAME_MODE:
      return { ...state, gameMode: action.payload };

    case SWAP_TILES:
      return { ...state, swap: true };

    case RESET_SWAP:
      return { ...state, swap: false, tiles: [] };

    case SELECT_TILE:
      return { ...state, tiles: [...state.tiles, action.payload] };

    case UNSELECT_TILE:
      const coords = action.payload;
      return {
        ...state,
        tiles: state.tiles.filter(
          (tile) => !tile.every((coord, index) => coord === coords[index]),
        ),
      };

    case UPDATE_TILE_STATUS:
      return {
        ...state,
        tilesStatus: {
          ...state.tilesStatus,
          [action.payload.id]: action.payload.status,
        },
      };

    case UPDATE_GAME_STATUS:
      return { ...state, isPlaying: action.payload };

    default:
      return { ...state };
  }
};

export default gameReducer;
