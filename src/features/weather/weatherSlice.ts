import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DataWeatherResponse } from '@/services/weatherApi';

const WEATHER_STORAGE_KEY = 'weather-data';

export interface WeatherState {
  data: DataWeatherResponse | null;
  savedAt: number | null;
}

const getInitialState = (): WeatherState => {
  if (typeof window === 'undefined') {
    return { data: null, savedAt: null };
  }

  try {
    const persistedWeather = window.localStorage.getItem(WEATHER_STORAGE_KEY);
    if (!persistedWeather) {
      return { data: null, savedAt: null };
    }

    const parsedWeather = JSON.parse(persistedWeather) as WeatherState;
    return {
      data: parsedWeather.data ?? null,
      savedAt: parsedWeather.savedAt ?? null,
    };
  } catch {
    return { data: null, savedAt: null };
  }
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState: getInitialState(),
  reducers: {
    setWeatherData: (state, action: PayloadAction<DataWeatherResponse>) => {
      state.data = action.payload;
      state.savedAt = Date.now();

      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(
            WEATHER_STORAGE_KEY,
            JSON.stringify({ data: state.data, savedAt: state.savedAt })
          );
        } catch {
          return;
        }
      }
    },
    clearWeatherData: (state) => {
      state.data = null;
      state.savedAt = null;

      if (typeof window !== 'undefined') {
        try {
          window.localStorage.removeItem(WEATHER_STORAGE_KEY);
        } catch {
          return;
        }
      }
    },
  },
});

export const { setWeatherData, clearWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
