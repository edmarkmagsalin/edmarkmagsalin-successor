import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store'

interface WeatherState {
  city: string
}

const initialState: WeatherState = {
  city: 'Gapan'
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    }
  }
});

export const { changeCity } = weatherSlice.actions;

export const selectCity = (state: RootState) => state.weather.city

export default weatherSlice.reducer;