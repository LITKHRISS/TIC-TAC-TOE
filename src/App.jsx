import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''} `

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick= {handleClick} className= {className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6] 
]

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)
  // null means no winner, false means tie
  const [winner, setWinner] = useState(null) 

  const checkWinner  = (boardToCheck) => {
    // check for all the winner combos
    // to see if X or U won
    for (const combo of WINNER_COMBOS) {
       const [a, b, c] = combo 
      if (
        boardToCheck[a] && // 0 -> x u o
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a] // x u o
      }
    }
    // if no winner
    return null 
    }

    const resetGame = () => {
      setBoard(Array(9).fill(null))
      setTurn(TURNS.X)
      setWinner(null)
    }

  const checkEndGame = (newBoard) => {
    // check if its a tie
    // if theres no blanc spaces
    // on the board
    return newBoard.every((sqaure) => sqaure != null)
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
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
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
         board.map((_, index) => {
          return (
            <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
              {board[index]}
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

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                  ? 'Tie'
                  : 'Won:'
                }
              </h2>

                 <header className='win'>
                  {winner && <square>{winner}</square>}
                 </header>

                 <footer>
                  <button onClick={resetGame}>Play Again</button>
                 </footer>
            </div>
          </section>
        )
      }

  </main>
  ) 
}
  
export default App
