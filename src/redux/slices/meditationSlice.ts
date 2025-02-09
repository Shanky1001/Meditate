import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Meditation} from "../../constants/data/meditations";
import {RootState} from "../store";
import dayjs from "dayjs";

export interface Activity {
  [key: string]: {
    duration: number;
  };
}
interface Calendar {
  [key: string]: {
    selected: boolean;
  };
}
export interface MeditationState {
  activity: Activity;
  filepaths: string[];
  favorites: Meditation[];
  todayQuote: {
    quote: string;
    author: string;
  };
}

const name = "meditation";
const initialState: MeditationState = {
  activity: {},
  filepaths: [],
  favorites: [],
  todayQuote: {
    quote: "",
    author: "",
  },
};

const meditationSlice = createSlice({
  name,
  initialState,
  reducers: {
    updateFavorites: (state, action: PayloadAction<Meditation>) => {
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
    updateManualEntry: (
      state,
      action: PayloadAction<{
        timestamp: number;
        duration: number;
      }>,
    ) => {
      const {duration, timestamp} = action.payload;

      if (duration === 0) {
        delete state.activity[timestamp];
        return;
      }

      state.activity[timestamp] = {
        duration,
      };
    },
    updateTodayQuote: (state, action: PayloadAction<{quote: string; author: string}>) => {
      const {quote, author} = action.payload;
      state.todayQuote = {
        quote,
        author,
      };
    },
    clearData: state => {
      state = {...initialState};
    },
  },
});

export const {updateFavorites, updateManualEntry, updateTodayQuote, clearData} = meditationSlice.actions;
export default meditationSlice.reducer;

export const selectFavorite = (state: RootState) => state[name].favorites;

export const selectFilepaths = (state: RootState) => state[name].filepaths;
export const selectActivity = (state: RootState) => state[name].activity;

export const selectTodayQuote = (state: RootState) => state[name].todayQuote;

export const selectCalendar = (state: RootState) => {
  const {activity} = state[name];
  const calendar = computeCalendar(activity);
  return calendar;
};

const computeCalendar = (activity: Activity) => {
  return Object.keys(activity).reduce((acc: Calendar, act) => {
    const date = dayjs(parseInt(act, 10)).format("YYYY-MM-DD");
    acc[date] = {
      selected: true,
    };
    return acc;
  }, {});
};
