import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SumUp from './SumUp.js'
import { Audio } from 'expo-av'

export default function Apps(prop) {
  const [sound, setSound] = React.useState()
  const [isPlaying, setIsPlaying] = React.useState('Play from start')

  async function playSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/Alarm.mp3')
    )

    setSound(sound)

    console.log('Playing Sound')
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
  const [showGame, setShowGame] = useState(prop.game)
  // console.log(showGame)
  // Increment gameID
  var restartTheSumUpGame = () => {
    setGameId(gameId + 1)
  }
  var gameWon = () => {
    // console.warn('WON the game')
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
    marginTop: 50,
    height: 50,
    color: 'black',
    backgroundColor: 'yellow'
  }
})
