import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const ASSISTANT_STORAGE_KEY = 'assistant-messages';

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export interface AssistantState {
  messages: ChatMessage[];
}

const getInitialState = (): AssistantState => {
  if (typeof window === 'undefined') {
    return { messages: [] };
  }

  try {
    const persistedMessages = window.localStorage.getItem(ASSISTANT_STORAGE_KEY);
    if (!persistedMessages) {
      return { messages: [] };
    }

    const parsedMessages = JSON.parse(persistedMessages) as ChatMessage[];
    return {
      messages: Array.isArray(parsedMessages) ? parsedMessages : [],
    };
  } catch {
    return { messages: [] };
  }
};

const assistantSlice = createSlice({
  name: 'assistant',
  initialState: getInitialState(),
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<Pick<ChatMessage, 'role' | 'content'>>
    ) => {
      state.messages.push({
        ...action.payload,
        id: state.messages.length,
      });

      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(
            ASSISTANT_STORAGE_KEY,
            JSON.stringify(state.messages)
          );
        } catch {
          return;
        }
      }
    },
    clearMessages: (state) => {
      state.messages = [];

      if (typeof window !== 'undefined') {
        try {
          window.localStorage.removeItem(ASSISTANT_STORAGE_KEY);
        } catch {
          return;
        }
      }
    },
  },
});

export const { addMessage, clearMessages } = assistantSlice.actions;
export default assistantSlice.reducer;
