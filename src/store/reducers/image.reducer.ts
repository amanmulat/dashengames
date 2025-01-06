// src/reducers/image.reducer.ts
import { SET_IMAGE_URL, SET_IMAGE_DIMENSION } from '../constants';

interface ImageState {
  width: number;
  height: number;
  url: string;
}

interface SetImageDimensionAction {
  type: typeof SET_IMAGE_DIMENSION;
  payload: {
    width: number;
    height: number;
  };
}

interface SetImageUrlAction {
  type: typeof SET_IMAGE_URL;
  payload: string;
}

type ImageAction = SetImageDimensionAction | SetImageUrlAction;

const dimension = { width: 400, height: 400 };

const defaultState: ImageState = {
  ...dimension,
  // url: `https://unsplash.it/${dimension.width}/${dimension.height}`,
  url: 'https://swiftethiopia.com/wp-content/uploads/2025/01/doro.jpg',
};

const imageReducer = (
  state: ImageState = defaultState,
  action: ImageAction,
): ImageState => {
  switch (action.type) {
    case SET_IMAGE_DIMENSION: {
      const { width, height } = action.payload;
      return { ...state, width, height };
    }
    case SET_IMAGE_URL: {
      const url = action.payload;
      return { ...state, url };
    }
    default:
      return state;
  }
};

export default imageReducer;
