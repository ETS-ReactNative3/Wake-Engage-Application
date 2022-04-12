import React, { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import shuffle from 'lodash.shuffle'
import MyButton from './Button.js'

export default function App(props) {
  const [state, setState] = useState({
    // Will store the index of the selected numbers
    selectedIDs: []
  })

  // Create an array of size from a prop and map each int to a random number
  const [randomNumbers] = useState(
    Array.from({ length: props.numberOfOptionButtons }).map(
      () => 1 + Math.floor(10 * Math.random())
    )
  )

  // sum array to create start number
  const [target] = useState(
    randomNumbers
      // Add first four button numbers
      .slice(0, props.numberOfOptionButtons - 2)
      // Sum the four numbers
      .reduce((acc, curr) => acc + curr, 0)
  )
  const [shuffledRandomNumbers] = useState(shuffle(randomNumbers))

  // Function that receives index of number pressed
  var isNumberSelected = (numberIndex) => {
    // If button is not in array, it will return false (button is not in selected numbers array)
    return state.selectedIDs.indexOf(numberIndex) >= 0
  }

  // Add an index to the selectedNumbers Array
  var selectNumber = (numberIndex) => {
    setState({ selectedIDs: [...state.selectedIDs, numberIndex] })
  }

  // gameStatus: PLAYING, WON, LOST
  var CalculateGameStatus = () => {
    // Reduce will go through the selected ids (pressed), variable curr will store the current index and variable acc will start at 0
    var sumSelected = 0
    state.selectedIDs.forEach((item) => {
      sumSelected += shuffledRandomNumbers[item]
    })
    if (sumSelected < target) {
      return 'PLAYING'
    }
    if (sumSelected === target) {
      return 'WON'
    }
    if (sumSelected > target) {
      return 'LOST'
    }
  }

  var gameStatus = CalculateGameStatus()
  return (
    <>
      <Text style={[styles.heading]}>Sum up the numbers!</Text>
      <ImageBackground
        source={require('../../assets/AppBackground.jpg')}
        style={{ flex: 1, width: null, height: null }}
      >
        <View style={styles.fullPageContainer}>
          {/* compute the style for the text based on the game status */}
          <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
            {target}
          </Text>

          <View style={styles.randomButtonsContainer}>
            {
              // Prints every item in the random numbers array
              shuffledRandomNumbers.map((buttonNumberText, index) => (
                <MyButton
                  id={index}
                  key={index}
                  text={buttonNumberText}
                  isDisabled={
                    isNumberSelected(index) || gameStatus !== 'PLAYING'
                  }
                  onPress={selectNumber}
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
              // if a user has won/lost the game, they will have the option to Play Again
              gameStatus === 'WON' && (
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
    flex: 1,
    height: '90%'
  },
  target: {
    fontSize: 42,
    color: 'black',
    backgroundColor: 'yellow',
    width: '100%',
    marginTop: 15,
    textAlign: 'center',
    paddingVertical: 15
  },
  heading: {
    color: 'white',
    marginTop: 25,
    fontSize: 30
  },
  playAgainButton: {
    backgroundColor: 'yellow',
    marginBottom: 0
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
    backgroundColor: '#33d633'
  },
  STATUS_LOST: {
    backgroundColor: 'red'
  }
})
