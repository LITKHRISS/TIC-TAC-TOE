import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, updateBoard, index }) => {
  return (
    <div className="square">
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(['x', 'x', 'x', 'o', 'o', 'o', 'x', 'o', 'x']
  )

  return (
    <main className='board'>
    <h1>TIC TAC TOE</h1>
    <section className="game">
      {
         board.map((_, index) => {
          return (
            <Square
            key={index}
            index={index}
            >
              {board[index]}
            </Square>
          )
         })
      }
    </section>

  </main>
  ) 
}
  
export default App
