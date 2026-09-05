import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const TICTACTOE_STORAGE_KEY = 'tictactoe-game';

export type Player = 'X' | 'O';
export type Cell = { id: string; value: Player | '' };
export type Board = Cell[][];

export interface TicTacToeState {
  turn: Player;
  winner: Player | null;
  turnLog: string[];
  tableData: Board;
}

const createBoard = (): Board => [
  [
    { id: '1', value: '' },
    { id: '2', value: '' },
    { id: '3', value: '' },
  ],
  [
    { id: '4', value: '' },
    { id: '5', value: '' },
    { id: '6', value: '' },
  ],
  [
    { id: '7', value: '' },
    { id: '8', value: '' },
    { id: '9', value: '' },
  ],
];

const createInitialState = (): TicTacToeState => ({
  turn: 'X',
  winner: null,
  turnLog: [],
  tableData: createBoard(),
});

const getPersistedState = (): TicTacToeState => {
  const initialState = createInitialState();

  if (typeof window === 'undefined') {
    return initialState;
  }

  try {
    const storedState = window.localStorage.getItem(TICTACTOE_STORAGE_KEY);
    if (!storedState) {
      return initialState;
    }

    const parsedState = JSON.parse(storedState) as TicTacToeState;
    if (
      !Array.isArray(parsedState.tableData) ||
      !Array.isArray(parsedState.turnLog) ||
      !['X', 'O'].includes(parsedState.turn)
    ) {
      return initialState;
    }

    return {
      turn: parsedState.turn,
      winner: parsedState.winner ?? null,
      turnLog: parsedState.turnLog,
      tableData: parsedState.tableData,
    };
  } catch {
    return initialState;
  }
};

const isEqual = (first: string, second: string, third: string) =>
  first !== '' && first === second && second === third;

const getWinner = (board: Board): Player | null => {
  const entries = board.flat().map((cell) => cell.value);
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winningLine = winningLines.find(([first, second, third]) =>
    isEqual(entries[first], entries[second], entries[third])
  );

  if (winningLine) {
    return entries[winningLine[0]] as Player;
  }

  return null; // Draw or game is still ongoing, no winner yet
};

const persistState = (state: TicTacToeState) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(TICTACTOE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    return;
  }
};

const ticTacToeSlice = createSlice({
  name: 'ticTacToe',
  initialState: getPersistedState(),
  reducers: {
    playCell: (state, action: PayloadAction<string>) => {
      if (state.winner || state.turnLog.includes(action.payload)) {
        return;
      }

      const cell = state.tableData.flat().find((entry) => entry.id === action.payload);
      if (!cell || cell.value) {
        return;
      }

      cell.value = state.turn;
      state.turnLog.push(action.payload);
      state.winner = getWinner(state.tableData);

      if (!state.winner) {
        state.turn = state.turn === 'X' ? 'O' : 'X';
      }

      persistState(state);
    },
    resetGame: () => {
      const initialState = createInitialState();
      persistState(initialState);
      return initialState;
    },
  },
});

export const { playCell, resetGame } = ticTacToeSlice.actions;
export default ticTacToeSlice.reducer;
