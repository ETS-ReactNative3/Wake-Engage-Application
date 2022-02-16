import React, { useState } from 'react'
import SumUp from './SumUp.js'

export default function App() {
  // gameId state starts at 0
  const [gameId, setGameId] = useState(0)
  // Increment gameID
  var restartTheSumUpGame = () => {
    setGameId(gameId + 1)
  }
  // Pass number of solutions to SumUp
  return (
    <SumUp
      // Every time key changes the component will get re-rendered
      key={gameId}
      onPlayAgain={restartTheSumUpGame}
      numberOfOptionButtons={'6'}
    />
  )
}
