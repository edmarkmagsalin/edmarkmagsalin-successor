import { useState } from 'react'

export const TicTacToe = () => {
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [turnLog, setTurnLog] = useState<string[]>([]);
  const tableConfig = [
    [
      {id: '1', value: ''},
      {id: '2', value: ''},
      {id: '3', value: ''},
    ],
    [
      {id: '4', value: ''},
      {id: '5', value: ''},
      {id: '6', value: ''},
    ],
    [
      {id: '7', value: ''},
      {id: '8', value: ''},
      {id: '9', value: ''},
    ]
  ];
  const [tableData, setTableData] = useState(tableConfig);

  const processTurn = (cellId: string) => {
    setTurnLog(prev => [...prev, cellId]);
    setTableData(prev => {
      const nextTableData = prev.map(row =>
        row.map(cell =>
          cell.id === cellId ? { ...cell, value: turn } : cell
        )
      );
      identifyWinner(nextTableData)
      return nextTableData;
    });

    setTurn(prev => prev === 'X' ? 'O' : 'X');
  }

  const allEqual = (a: string, b: string, c: string) => {
    if(a === '' || b === '' || c === '') {
      return false;
    }
    return a === b && b === c
  }

  const identifyWinner = (tableData: typeof tableConfig) => {
    const entries = tableData.flat().map(d => d.value);
    const winningCases = [
      allEqual(entries[0], entries[1], entries[2]),
      allEqual(entries[0], entries[1], entries[2]),
      allEqual(entries[3], entries[4], entries[5]),
      allEqual(entries[6], entries[7], entries[8]),
      allEqual(entries[0], entries[3], entries[6]),
      allEqual(entries[1], entries[4], entries[7]),
      allEqual(entries[2], entries[5], entries[8]),
      allEqual(entries[0], entries[4], entries[8]),
      allEqual(entries[2], entries[4], entries[6]),
    ]
    if(winningCases.includes(true)) {
      setWinner(turn);
    } else if(entries.map(entry => entry !== '').length == 8) {
      setWinner('DRAW');
    }
  }
  const reset = () => {
    setTableData(tableConfig);
    setWinner(null);
    setTurn('X');
    setTurnLog([]);
  }
  return (
    <div className="flex flex-col justify-center align-middle w-full h-full">
      <div className='text-center'>
        <h1>{("Tic Tac Toe").toUpperCase()}</h1>
        <h4>
          {
            winner
              ? (<>Player <strong>{winner}</strong> is the winner 🏆</>)
              : turnLog.length == 9 ? (<strong>Draw</strong>)
              : (<><strong>{turn}</strong>'s turn</>)
          }
        </h4>
        <small
          className={`text-center cursor-pointer ${turnLog.length == 0 && 'opacity-30'}`}
          onClick={() => turnLog.length ? reset() : undefined}
        >
          Reset
        </small>
      </div>
      <div className="flex flex-col justify-center w-full h-full mb-10 text-center">
        <table className={`tictactoe ${winner ? 'opacity-30' : 'opacity-100'}`}>
          <tbody>
            {
              tableData.map((row, index) => {
                return (
                  <tr key={index}>
                    {
                      row.map((data, index) => {
                        return (
                          <td key={index} onClick={() => {
                            data.value || winner ? undefined : processTurn(data.id)
                          }}>
                            {data.value}
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}