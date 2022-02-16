import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import SumUp from './SumUp.js'

export default function App() {
  // gameId state starts at 0
  const [gameId, setGameId] = useState(0)
  // 0 = Show nothing
  // 1 = SumUp game
  const [showGame, setShowGame] = useState(1)
  // Increment gameID
  var restartTheSumUpGame = () => {
    setGameId(gameId + 1)
  }
  var gameWon = () => {
    console.warn('WON the game')
    setShowGame(0)
    // TODO STOP THE ALARM
    // TODO Hide the game
  }

  // TODO PLAY THE MUSIC

  // TODO SHOW THE SPECIFIC GAME

  // Pass number of solutions to SumUp
  return (
    <View style={styles.fullPageContainer}>
      {showGame === 1 && (
        <SumUp
          // Every time key changes the component will get re-rendered
          key={gameId}
          onPlayAgain={restartTheSumUpGame}
          onWinCondition={gameWon}
          numberOfOptionButtons={'6'}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  fullPageContainer: {
    flex: 1
  }
})
