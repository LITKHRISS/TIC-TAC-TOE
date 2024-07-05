import { Square } from "./square.jsx"

export function WinnerModal  ({winner, resetGame}) {
    if (winner === null) return null

    const winnerText = winner === false ? 'Tie' : 'Won'

  return (
    <section className="winner">
      <div className="text">
        <h2> {winnerText } </h2>

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
