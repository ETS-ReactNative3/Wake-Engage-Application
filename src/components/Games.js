import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SumUp from './SumUp.js'

export default function Apps(prop) {
  // TODO read props.game and pick a game from that variable

  // gameId state starts at 0
  const [gameId, setGameId] = useState(prop.game)
  // 0 = Show nothing
  // 1 = SumUp game
  const [showGame, setShowGame] = useState(1)
  // Increment gameID
  var restartTheSumUpGame = () => {
    setGameId(gameId + 1)
  }
  var gameWon = () => {
    // console.warn('WON the game')
    // TODO Hide the game
    setShowGame(0) // will not show any game

    // TODO STOP THE ALARM in the parent component
    // this will run a funciton in app.js called resetTheApp
    prop.onWinCondition() 

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

      {showGame === 2 && <Text>Game 2</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  fullPageContainer: {
    flex: 1
  }
})
