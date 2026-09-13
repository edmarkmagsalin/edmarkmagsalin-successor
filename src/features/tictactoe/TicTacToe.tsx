import { Dialog } from '@/components/Dialog';
import { ExternalLink } from '@/components/ExternalLink';
import { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { playCell, resetGame } from './tictactoeSlice'

export const TicTacToe = () => {
  const dispatch = useAppDispatch();
  const { turn, winner, turnLog, tableData } = useAppSelector((state) => state.ticTacToe);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleCellClick = (cellId: string, value: string) => {
    if (!value && !winner) {
      dispatch(playCell(cellId));
    }
  };
  return (
    <div className="app-container">
      <header className='text-center pb-2'>
        <h1>{("Tic Tac Toe").toUpperCase()}</h1>
        <nav className="mini-menu">
          <button disabled={turnLog.length == 0} onClick={() => dispatch(resetGame())}>
            Reset
          </button>
          |
          <button onClick={() => dialogRef.current?.showModal()}>
            About
          </button>
        </nav>
      </header>
      <main className="flex flex-col justify-center w-full h-full mb-10 text-center">
        <h4 className='pb-2'>
          {
            winner
              ? (<>Player <strong>{winner}</strong> is the winner 🏆</>)
              : turnLog.length == 9 ? (<strong>Draw</strong>)
              : (<><strong>{turn}</strong>'s turn</>)
          }
        </h4>
        <table className={`tictactoe ${(winner || turnLog.length == 9) ? 'opacity-30' : 'opacity-100'}`}>
          <tbody>
            {
              tableData.map((row, index) => {
                return (
                  <tr key={index}>
                    {
                      row.map((data, index) => {
                        return (
                          <td key={index} onClick={() => handleCellClick(data.id, data.value)}>
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
      </main>
      <Dialog dialogRef={dialogRef}>
        <div className='text-center'>
          <h4 className='pb-2'>Created with</h4>
          <ul className='flex flex-wrap gap-1 justify-center'>
            <li>
              <ExternalLink className='backdrop-bg-pills py-2 px-3 text-sm' href='https://react.dev/reference/react/useState' text='useState Hook' />
            </li>
          </ul>
        </div>
      </Dialog>
    </div>
  )
}