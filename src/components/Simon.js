/* eslint-disable indent */
import React, { useRef, useState } from 'react'
import {
  Text,
  Animated,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback
} from 'react-native'
import { Audio } from 'expo-av'

export default function App() {
  // console.log(props.gameId)
  // props.onPlayAgain
  // props.onWinCondition

  const [sound, setSound] = useState()

  // RED BUTTON
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnimRed = useRef(new Animated.Value(0.2)).current
  const animateRed = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/f-4.mp3')
    )
    setSound(sound)
    // Start the sound
    sound.playAsync()

    Animated.timing(fadeAnimRed, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(fadeAnimRed, {
        toValue: 0.2,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  }
  // RED BUTTON END

  // YELLOW BUTTON
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnimYellow = useRef(new Animated.Value(0.2)).current
  const animateYellow = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/d4.mp3')
    )
    setSound(sound)
    // Start the sound
    sound.playAsync()

    Animated.timing(fadeAnimYellow, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(fadeAnimYellow, {
        toValue: 0.2,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  }
  // YELLOW BUTTON END

  // BLUE BUTTON
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnimBlue = useRef(new Animated.Value(0.2)).current
  const animateBlue = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/e4.mp3')
    )
    setSound(sound)
    // Start the sound
    sound.playAsync()

    Animated.timing(fadeAnimBlue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(fadeAnimBlue, {
        toValue: 0.2,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  }
  // BLUE BUTTON END

  // GREEN BUTTON
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnimGreen = useRef(new Animated.Value(0.2)).current
  const animateGreen = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/audio/g4.mp3')
    )
    setSound(sound)
    // Start the sound
    sound.playAsync()

    Animated.timing(fadeAnimGreen, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(fadeAnimGreen, {
        toValue: 0.2,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  }
  // GREEN BUTTON END

  const registerButton = (buttonColor) => {
    console.log(buttonColor, ' pressed')
  }

  // When the sound finished playing remove it from the sound variable.
  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  // Starting game logic
  const startGame = () => {
    // TODO Play the sounds in the solution order
    let solution = ['Yellow', 'Blue', 'Red', 'Green']
    // solution.map()
    // setTimeout(animateRed(), 3000)
    // setTimeout(animateBlue(), 2000)
  }
  startGame()

  return (
    // Button will light up on-press with the passed props text
    <>
      <Text style={[styles.heading]}>Repeat the pattern!</Text>
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
                // 'background-color': rgb(fadeAnim, 0, 0)
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

      {/* <View style={styles.buttonRow}>
        <Button title="Fade In RED" onPress={animateRed} />
        <Button title="Fade In YELLOW" onPress={animateYellow} />
        <Button title="Fade In BLUE" onPress={animateBlue} />
        <Button title="Fade In GREEN" onPress={animateGreen} />
      </View> */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // backgroundColor: 'pink',
    // marginTop: 50,
    flex: 1,
    minHeight: '40%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  fadingContainer: {
    width: '50%',
    height: '50%'
  },
  buttonRow: {
    // flexBasis: 100,
    marginVertical: 16
  },
  heading: {
    color: 'white',
    marginTop: 20,
    fontSize: 30
  }
})
