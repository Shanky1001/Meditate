import {createSlice} from "@reduxjs/toolkit";
import {Meditation} from "../../constants/data/meditations";
import {RootState} from "../store";

export interface Activity {
  // in miliseconds
  duration: number;
}
export interface MeditationState {
  activity: {
    [key: string]: Activity;
  };
  filepaths: string[];

  favorites: Meditation[];
}

const name = "meditation";

const initialState: MeditationState = {
  activity: {},
  filepaths: [],
  favorites: [],
};

const meditationSlice = createSlice({
  name,
  initialState,
  reducers: {
    updateFavorites: (state, action) => {
      if (!state.favorites) {
        state.favorites = [];
      }
      const meditation = action.payload;
      const meditationIndex = state.favorites.findIndex(item => item.id === meditation.id);
      const alreadyFav = meditationIndex !== -1;
      if (alreadyFav) {
        state.favorites.splice(meditationIndex, 1);
      } else {
        state.favorites.push(meditation);
      }
    },
  },
});

export const {updateFavorites} = meditationSlice.actions;
export default meditationSlice.reducer;

export const selectFavorite = (state: RootState) => state[name].favorites;

export const selectFilepaths = (state: RootState) => state[name].filepaths;
export const selectActivity = (state: RootState) => state[name].activity;
