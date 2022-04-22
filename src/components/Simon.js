/* eslint-disable indent */
import React, { useRef, useState } from 'react'
import {
  Text,
  Animated,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ImageBackground,
  View
} from 'react-native'
import shuffle from 'lodash.shuffle'
import { Audio } from 'expo-av'

export default function App(props) {
  const [sound, setSound] = useState()

  // Countdown audio to alert user on game start
  const playCountdown = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/countdown.mov')
    )
    setSound(sound)
    console.log('Playing Countdown')
    // Start the sound
    sound.playAsync()
  }

  // RED BUTTON
  // fadeAnim will be used as the value for opacity. Initial Value: 0.4
  const fadeAnimRed = useRef(new Animated.Value(0.4)).current
  const animateRed = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/f-4.mp3')
    )
    setSound(sound)
    // Start the sound for this button
    sound.playAsync()

    // Button will light up for 500ms
    Animated.timing(fadeAnimRed, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(fadeAnimRed, {
        toValue: 0.4,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  }
  // RED BUTTON END

  // YELLOW BUTTON
  // fadeAnim will be used as the value for opacity. Initial Value: 0.4
  const fadeAnimYellow = useRef(new Animated.Value(0.4)).current
  const animateYellow = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/d4.mp3')
    )
    setSound(sound)
    // Start the sound for this button
    sound.playAsync()

    // Button will light up for 500ms
    Animated.timing(fadeAnimYellow, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(fadeAnimYellow, {
        toValue: 0.4,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  }
  // YELLOW BUTTON END

  // BLUE BUTTON
  // fadeAnim will be used as the value for opacity. Initial Value: 0.4
  const fadeAnimBlue = useRef(new Animated.Value(0.4)).current
  const animateBlue = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/e4.mp3')
    )
    setSound(sound)
    // Start the sound for this button
    sound.playAsync()

    // Button will light up for 500ms
    Animated.timing(fadeAnimBlue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(fadeAnimBlue, {
        toValue: 0.4,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  }
  // BLUE BUTTON END

  // GREEN BUTTON
  // fadeAnim will be used as the value for opacity. Initial Value: 0.4
  const fadeAnimGreen = useRef(new Animated.Value(0.4)).current
  const animateGreen = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/g4.mp3')
    )
    setSound(sound)
    // Start the sound for this button
    sound.playAsync()

    // Button will light up for 500ms
    Animated.timing(fadeAnimGreen, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(fadeAnimGreen, {
        toValue: 0.4,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  }
  // GREEN BUTTON END
  // When the sound finished playing remove it from the sound variable.
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  function wait() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved')
      }, 800)
    })
  }
  function wait4() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved')
      }, 5000)
    })
  }
  ///////////////////////////////////////// GAME LOGIC

  const registerButton = (buttonColor) => {
    setUserInputArray((oldArray) => [...oldArray, buttonColor])
  }

  // Every time userInputArray changes check win condition
  React.useEffect(async () => {
    // If won or lost no need to recalculate
    if (gameCondition === 'PLAYING') {
      gameCondition = checkGameWinCondition()
    }
  }, [[userInputArray]])

  // Starting game logic
  const [userInputArray, setUserInputArray] = useState([])
  const [solution] = useState(
    // Play shuffled colours array
    shuffle(['Yellow', 'Blue', 'Red', 'Green', 'Yellow', 'Blue'])
  )
  console.log('solution', solution)

  const startGame = async () => {
    playCountdown()
    await wait4()
    for (let i = 0; i < solution.length; i++) {
      if (solution[i] == 'Yellow') {
        // Playing yellow
        animateYellow()
      } else if (solution[i] == 'Blue') {
        // Playing blue
        animateBlue()
      } else if (solution[i] == 'Red') {
        // Playing red
        animateRed()
      } else if (solution[i] == 'Green') {
        // Playing green'
        animateGreen()
      }
      await wait()
    }
  }

  const [startGameOnce, setstartGameOnce] = useState(true)
  if (startGameOnce) {
    setstartGameOnce(false)
    startGame()
  }

  // Compare userInputArray with the solution array
  var checkGameWinCondition = () => {
    for (let i = 0; i < solution.length; i++) {
      if (userInputArray[i]) {
        if (userInputArray[i] == solution[i]) {
          // The same
          if (i === solution.length - 1) {
            // WON - KILL THE GAME
            return 'WON'
          }
        } else {
          return 'LOST'
          // Show the restart game UI / Button
        }
      } else {
        return 'PLAYING'
      }
    }
  }

  var gameCondition = checkGameWinCondition()

  return (
    // Button will light up on-press with the passed props text
    <>
      <Text style={[styles.heading]}>Repeat the pattern!</Text>
      <ImageBackground
        source={require('../../assets/AppBackground.jpg')}
        style={{ flex: 1, width: null, height: null, opacity: 1 }}
      >
        <View style={styles.overlay} />
        {gameCondition === 'LOST' && (
          <Text style={[styles.playAgainButton]} onPress={props.onPlayAgain}>
            Play again
          </Text>
        )}
        {gameCondition === 'WON' && (
          <Text style={[styles.playAgainButton]} onPress={props.onWinCondition}>
            Shut off the alarm!
          </Text>
        )}
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => {
              animateYellow()
              registerButton('Yellow')
            }}
          >
            <Animated.View
              style={[
                styles.fadingContainer,
                {
                  // Bind opacity to animated value
                  backgroundColor: 'yellow',
                  opacity: fadeAnimYellow
                }
              ]}
            ></Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              animateBlue()
              registerButton('Blue')
            }}
          >
            <Animated.View
              style={[
                styles.fadingContainer,
                {
                  // Bind opacity to animated value
                  backgroundColor: 'blue',
                  opacity: fadeAnimBlue
                }
              ]}
            ></Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              animateRed()
              registerButton('Red')
            }}
          >
            <Animated.View
              style={[
                styles.fadingContainer,
                {
                  // Bind opacity to animated value
                  backgroundColor: 'red',
                  opacity: fadeAnimRed
                }
              ]}
            ></Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              animateGreen()
              registerButton('Green')
            }}
          >
            <Animated.View
              style={[
                styles.fadingContainer,
                {
                  // Bind opacity to animated value
                  backgroundColor: 'green',
                  opacity: fadeAnimGreen
                }
              ]}
            ></Animated.View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    minHeight: '40%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.7
  },
  fadingContainer: {
    width: '50%',
    height: '50%'
  },
  buttonRow: {
    marginVertical: 16
  },
  heading: {
    color: 'white',
    marginTop: 25,
    fontSize: 30
  },
  playAgainButton: {
    height: '100%',
    backgroundColor: 'black',
    color: 'white',
    paddingTop: '20%',
    fontSize: 40,
    textAlign: 'center'
  }
})
