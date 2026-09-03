import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  answer: string;
}

const PYTHON_API_URL = import.meta.env.VITE_PYTHON_API_URL || 'http://localhost:8000';

export const assistantApi = createApi({
  reducerPath: 'assistantApi',
  baseQuery: fetchBaseQuery({ baseUrl: PYTHON_API_URL }),
  endpoints: (build) => ({
    sendMessage: build.mutation<ChatResponse, ChatRequest>({
      query: (body) => ({
        url: '/api/chat',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSendMessageMutation } = assistantApi