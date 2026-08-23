import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Geo : BEGIN
export interface GeoReverseParams {
  lat: number;
  long: number;
  limit?: number;
}

export interface GeoDirectParams {
  city: string;
  state: string;
  country: string;
}

export interface GeoResponse {
  name: string;
  local_names?: {
    key: string
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
}
// Geo : END

// Data Weather : BEGIN
export interface DataWeatherParams {
  lat: number;
  long: number;
}
export interface DataWeatherResponse {
  name: string;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
   coord: {
      lon: number;
      lat: number;
   };
   dt: number;
   sys: {
    country: string;
   }
}
// Data Weather : END

const APP_ID = import.meta.env.VITE_OPENWEATHER_APP_ID;

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org' }),
  endpoints: (build) => ({
    getGeoReverseByLatLong: build.query<GeoResponse[], GeoReverseParams>({
      query: ({lat, long, limit=1}) => `geo/1.0/reverse?lat=${lat}&lon=${long}&limit=${limit}&appid=${APP_ID}`,
    }),
    getGeoDirectByCityStateCountry: build.query<GeoResponse[], GeoDirectParams>({
      query: ({city, state, country}) => `geo/1.0/direct?q=${city},${state},${country}&limit={limit}&&appid=${APP_ID}`,
    }),
    getDataWeatherByLatLong: build.query<DataWeatherResponse, DataWeatherParams>({
      query: ({lat, long}) => `data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${APP_ID}`,
    })
  }),
})

export const {
  useGetGeoReverseByLatLongQuery,
  useGetDataWeatherByLatLongQuery,
  useGetGeoDirectByCityStateCountryQuery,
} = weatherApi