import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SumUp from './SumUp.js'

export default function Apps(prop) {
  // TODO read props.game and pick a game from that variable
  // TODO Start playing a sound once App loads from a notification
  // TODO start the music
  // gameId state starts at 0
  const [gameId, setGameId] = useState(0)
  // 0 = Show nothing
  // 1 = SumUp game
  const [showGame, setShowGame] = useState(prop.game)
  // console.log(showGame)
  // Increment gameID
  var restartTheSumUpGame = () => {
    setGameId(gameId + 1)
  }
  var gameWon = () => {
    // console.warn('WON the game')
    // Hide the game
    // TODO shut off the alarm/sound on the game is done
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
      {showGame === '1' && (
        <SumUp
          // Every time key changes the component will get re-rendered
          key={gameId}
          onPlayAgain={restartTheSumUpGame}
          onWinCondition={gameWon}
          numberOfOptionButtons={'6'}
        />
      )}

      {showGame === '2' && <Text style={styles.text}>Game 2 8-Puzzle</Text>}
      {showGame === '3' && (
        <Text style={styles.text}>Game 3 The Simon Game</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  fullPageContainer: {
    flex: 1
  },
  text: {
    marginTop: 200,
    height: 100,
    color: 'black',
    backgroundColor: 'yellow'
  }
})
