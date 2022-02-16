import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import shuffle from 'lodash.shuffle'
import MyButton from './Button.js'

export default function App(props) {
  //props.numberOfOptionButtons
  const [state, setState] = useState({
    // Will store the index of the selected numbers
    selectedIDs: []
  })

  // Create an array of size from a prop and map each int to a random number
  // randomNumbers [7,11,13,15,8,1]
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

  // TODO: Shuffle the random numbers of the array (right now answer is always first 4)

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
              isDisabled={isNumberSelected(index) || gameStatus !== 'PLAYING'}
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
              isPlayAgain={true}
            ></MyButton>
          )
        }
        {
          // if a user has won/lost the game, they will have the option to Play Again
          gameStatus === 'WON' && (
            <MyButton
              text={'Shut this song off:)'}
              onPress={props.onWinCondition}
              isPlayAgain={true}
            ></MyButton>
          )
        }

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fullPageContainer: {
    backgroundColor: 'lightblue',
    flex: 1
  },
  target: {
    fontSize: 42,
    backgroundColor: 'yellow',
    width: '100%',
    marginTop: 100,
    marginBottom: 40,
    textAlign: 'center',
    paddingVertical: 20
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
    backgroundColor: 'green'
  },
  STATUS_LOST: {
    backgroundColor: 'red'
  }
})
