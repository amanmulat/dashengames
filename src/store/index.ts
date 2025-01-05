// src/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import imageReducer from './reducers/image.reducer';
import boardReducer from './reducers/board.reducer';
import gameReducer from './reducers/game.reducer';

// Combine reducers
const rootReducer = combineReducers({
  image: imageReducer,
  board: boardReducer,
  game: gameReducer,
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in non-production
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
