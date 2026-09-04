import { configureStore } from '@reduxjs/toolkit'
import { weatherApi } from '@/services/weatherApi'
import { assistantApi } from '@/services/assistantApi'
import weatherReducer from '@/features/weather/weatherSlice'
import assistantReducer from '@/features/assistant/assistantSlice'
import ticTacToeReducer from '@/features/tictactoe/tictactoeSlice'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    assistant: assistantReducer,
    ticTacToe: ticTacToeReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [assistantApi.reducerPath]: assistantApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(weatherApi.middleware, assistantApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch