import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'
// import shuffle from 'lodash.shuffle'
import MyButton from './Button.js'

export default function App(props) {
  const [shuffling, setShuffling] = useState(true)
  const [gameStateSolution] = useState([1, 2, 3, 4, 5, 6, 7, 8, null])
  const [gameStateArray, setGameStateArray] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    null
  ])

  var swapArray = function (arr, index1, index2) {
    var temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
    return arr
  }

  useEffect(() => {
    // setGameStateArray(shuffle(gameStateArray))
    shuffleArray()
  }, [])

  function randomNumber() {
    return Math.floor(Math.random() * 5)
  }

  const shuffleOnce = () => {
    // Find index of null
    let nullIndex = -1
    gameStateArray.map((item, index) => {
      if (item === null) {
        nullIndex = index
      }
    })

    // Call make a move
    // Make randomized decision to go 1-UP 2-DOWN 3-LEFT 4-RIGHT
    // from our nullIndex
    let moveDirection = randomNumber()
    if (moveDirection === 1) {
      // UP
      if (nullIndex > 2) {
        // Can we go up
        setGameStateArray(
          Array.from(swapArray(gameStateArray, nullIndex, nullIndex - 3))
        )
        return true
      }
    } else if (moveDirection === 2) {
      // DOWN
      if (nullIndex < 6) {
        // Can we go up
        setGameStateArray(
          Array.from(swapArray(gameStateArray, nullIndex, nullIndex + 3))
        )
        return true
      }
    } else if (moveDirection === 3) {
      // LEFT
      if (nullIndex != 0 && nullIndex != 3 && nullIndex != 6) {
        // Can we go left
        setGameStateArray(
          Array.from(swapArray(gameStateArray, nullIndex, nullIndex - 1))
        )
        return true
      }
    } else if (moveDirection === 4) {
      //RIGHT
      if (nullIndex != 2 && nullIndex != 5 && nullIndex != 8) {
        // Can we go right
        setGameStateArray(
          Array.from(swapArray(gameStateArray, nullIndex, nullIndex + 1))
        )
        return true
      }
    }
    return false
  }

  const shuffleArray = () => {
    let madeMoves = 0
    // Call shuffleOnce() every 1.5 seconds but only 100 times
    let timer = setInterval(function () {
      if (madeMoves === 10) {
        clearInterval(timer)
        console.log('Done shuffling')
        setShuffling(false)
      }
      if (shuffleOnce()) {
        madeMoves++
      }
    }, 500)

    // for (let i = 0; i <= 10; i++) {
    //   shuffleOnce()
    // }
  }

  var moveTile = (tileIndex) => {
    // Check left from item clicked
    if (
      gameStateArray[tileIndex - 1] === null &&
      tileIndex - 1 != 2 &&
      tileIndex - 1 != 5
    ) {
      setGameStateArray(
        Array.from(swapArray(gameStateArray, tileIndex, tileIndex - 1))
      )
    }

    // Check right from item clicked
    if (
      gameStateArray[tileIndex + 1] === null &&
      tileIndex + 1 != 3 &&
      tileIndex + 1 != 6
    ) {
      setGameStateArray(
        Array.from(swapArray(gameStateArray, tileIndex, tileIndex + 1))
      )
    }

    // Check top from item clicked
    if (gameStateArray[tileIndex - 3] === null) {
      setGameStateArray(
        Array.from(swapArray(gameStateArray, tileIndex, tileIndex - 3))
      )
    }

    // Check bottom from item clicked
    if (gameStateArray[tileIndex + 3] === null) {
      setGameStateArray(
        Array.from(swapArray(gameStateArray, tileIndex, tileIndex + 3))
      )
    }
  }

  // gameStatus: PLAYING, WON, LOST
  var CalculateGameStatus = () => {
    for (let i = 0; i <= 8; i++) {
      if (gameStateArray[i] != gameStateSolution[i]) {
        return 'PLAYING'
      }
    }
    return 'WON' // DEFAULT
  }

  var gameStatus = CalculateGameStatus()

  return (
    <>
      <Text style={[styles.heading]}>Order numbers from 1 to 8!</Text>
      <ImageBackground
        source={require('../../assets/AppBackground.jpg')}
        style={{ flex: 1, width: null, height: null }}
      >
        <View style={styles.fullPageContainer}>
          {/* compute the style for the text based on the game status */}

          <View style={styles.randomButtonsContainer}>
            {
              // Prints every item in the random numbers array
              gameStateArray.map((buttonNumberText, index) => (
                <MyButton
                  small="true"
                  id={index}
                  key={index}
                  text={buttonNumberText}
                  onPress={moveTile}
                  isDisabled={buttonNumberText === null || shuffling === true}
                ></MyButton>
              ))
            }
            {
              // if a user has won/lost the game, they will have the option to Play Again
              gameStatus === 'LOST' && (
                <MyButton
                  text={'Play Again'}
                  onPress={props.onPlayAgain}
                  isPlayAgainLose={true}
                ></MyButton>
              )
            }
            {
              // The user will have the option to shuffle again/play Again
              shuffling && (
                <MyButton
                  text={'Shuffling!'}
                  onPress={() => {}}
                  isPlayAgainLose={true}
                ></MyButton>
              )
            }
            {
              // if a user has won/lost the game, they will have the option to Play Again
              gameStatus === 'WON' && shuffling === false && (
                <MyButton
                  text={'Shut off the alarm!'}
                  onPress={props.onWinCondition}
                  isPlayAgainWon={true}
                ></MyButton>
              )
            }
          </View>
        </View>
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  fullPageContainer: {
    paddingTop: '20%',
    flex: 1
  },
  heading: {
    color: 'white',
    marginTop: 25,
    fontSize: 30
  },
  playAgainButton: {
    paddingBottom: 200,
    backgroundColor: 'yellow'
  },
  randomButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  STATUS_PLAYING: {
    backgroundColor: 'yellow'
  },
  STATUS_WON: {
    backgroundColor: '#7FFF00'
  },
  STATUS_LOST: {
    backgroundColor: 'red'
  }
})
