import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from './Button.js'

export default function App(props) {
  //props.numberOfOptionButtons
  const [state, setState] = useState({
    // Will store the index of the selected numbers
    selectedIDs: [1]
  })

  // Create an array of size from a prop and map each int to a random number
  // randomNumbers [7,11,13,15,8,1]
  const [randomNumbers, setRandomNumbers] = useState(
    Array.from({ length: props.numberOfOptionButtons }).map(
      () => 1 + Math.floor(10 * Math.random())
    )
  )

  // sum array to create start number
  const [target, setTarget] = useState(
    randomNumbers
      .slice(0, props.numberOfOptionButtons - 2)
      .reduce((acc, curr) => acc + curr, 0)
  )
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
    // return 'hello'
    // const sumSelected = state.selectedIds.reduce((acc, curr) => {
    //   // Return the sum of numbers at each selected id in the randomNumbers array
    //   return acc + randomNumbers[curr]
    // }, 0)
    var sumSelected = 0
    state.selectedIDs.forEach((item) => {
      sumSelected += randomNumbers[item]
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
      <Text style={styles.target}>{target}</Text>
      <View style={styles.randomButtonsContainer}>
        {
          // Prints every item in the random numbers array
          randomNumbers.map((buttonNumberText, index) => (
            <Button
              id={index}
              key={index}
              text={buttonNumberText}
              isDisabled={isNumberSelected(index)}
              onPress={selectNumber}
            ></Button>
          ))
        }
      </View>
      <Text style={styles.debug}>{gameStatus}</Text>
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

  randomButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  debug: {
    marginBottom: 40
  }
})
