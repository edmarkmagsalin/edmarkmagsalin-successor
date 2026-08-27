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

// Example API fetch in your React code
const NODE_API_URL = import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000';

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${NODE_API_URL}/api/node` }),
  endpoints: (build) => ({
    getGeoReverseByLatLong: build.query<GeoResponse[], GeoReverseParams>({
      query: ({lat, long, limit=1}) => `geo-reverse?lat=${lat}&long=${long}&limit=${limit}`,
    }),
    getGeoDirectByCityStateCountry: build.query<GeoResponse[], GeoDirectParams>({
      query: ({city, state, country}) => `geo-direct?city=${city}&state=${state}&country=${country}`,
    }),
    getDataWeatherByLatLong: build.query<DataWeatherResponse, DataWeatherParams>({
      query: ({lat, long}) => `current-weather?lat=${lat}&long=${long}`,
    })
  }),
})

export const {
  useGetGeoReverseByLatLongQuery,
  useGetDataWeatherByLatLongQuery,
  useGetGeoDirectByCityStateCountryQuery,
} = weatherApi