import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/square.jsx"
import { TURNS} from "./constants.js"
import { checkWinnerFrom } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"


function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)
  // null means no winner, false means tie
  const [winner, setWinner] = useState(null) 

    const resetGame = () => {
      setBoard(Array(9).fill(null))
      setTurn(TURNS.X)
      setWinner(null)
    }

  const checkEndGame = (newBoard) => {
    // check if its a tie
    // if theres no blanc spaces
    // on the board
    return newBoard.every((square) => square != null)
  }    

  const updateBoard = (index) => {
    // dont update this position
    // if theres something in it
    if (board[index] || winner) return
    // update the baord
    const newBoard = [ ... board]
    // spread & rest operator
    newBoard[index] = turn
    setBoard(newBoard)
    // change turns
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // check winner
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // TIE
    }
  }

  return (
    <main className='board'>
    <h1>TIC TAC TOE</h1>
    <button onClick={resetGame}>Game Reset</button>
    <section className="game">
      {
         board.map((square, index) => {
          return (
            <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
              {square}
            </Square>
          )
         })
      }
    </section>

    <section className="turn">
      <Square isSelected={turn === TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn === TURNS.O}>
        {TURNS.O}
      </Square>
    </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
  </main>
  ) 
}
  
export default App
