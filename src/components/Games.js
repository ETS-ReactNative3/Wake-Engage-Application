import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import SumUp from './SumUp.js'
import Simon from './Simon.js'
import Puzzle from './8Puzzle.js'
import { Audio } from 'expo-av'

export default function Apps(prop) {
  const [sound, setSound] = React.useState()
  const [isPlaying, setIsPlaying] = React.useState('Play from start')

  // Alarm sound that will play until game is won
  async function playSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/Alarm.mp3')
    )

    setSound(sound)

    console.log('Playing Sound')
    await sound.setIsLoopingAsync(true)
    await sound.playAsync()
  }

  if (isPlaying === 'Play from start') {
    setIsPlaying('playing')
    playSound() //  Start playing a sound once App loads from a notification
  }
  async function stopSound() {
    setIsPlaying('won')
    console.log('Stopping Sound')
    sound.unloadAsync()
  }

  // gameId state starts at 0
  const [gameId, setGameId] = useState(0)
  // 0 = Show nothing
  // 1 = SumUp game
  // 2 = 8-Puzzle
  // 3 = Simon Game
  const [showGame, setShowGame] = useState(prop.game)
  // Increment gameID to restart game
  var restartTheGame = () => {
    setGameId(gameId + 1)
  }
  var gameWon = () => {
    stopSound() //  shut off the alarm/sound on the game is done
    setShowGame(0) // Hide the game, will not show any game
    prop.onWinCondition()
  }
  return (
    <View style={styles.fullPageContainer}>
      {showGame === '1' && (
        <SumUp
          // Every time key changes the component will get re-rendered
          key={gameId}
          onPlayAgain={restartTheGame}
          onWinCondition={gameWon}
          numberOfOptionButtons={'6'}
        />
      )}

      {showGame === '2' && (
        <Puzzle
          key={gameId}
          onPlayAgain={restartTheGame}
          onWinCondition={gameWon}
        />
      )}

      {showGame === '3' && (
        <Simon
          key={gameId}
          onPlayAgain={restartTheGame}
          onWinCondition={gameWon}
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
