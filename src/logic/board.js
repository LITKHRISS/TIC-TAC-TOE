import { WINNER_COMBOS } from "../constants.js"

export const checkWinnerFrom  = (boardToCheck) => {
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