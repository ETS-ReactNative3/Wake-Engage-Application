import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from './Button.js'

export default function App(props) {
  //props.numberOfOptionButtons

  var state = {
    //Will store the index of the selected numbers
    selectedNumbers: [1]
  }

  // Create an array of size from a prop and map each int to a random number
  var randomNumbers = Array.from({ length: props.numberOfOptionButtons }).map(
    () => 1 + Math.floor(10 * Math.random())
  )

  //   randomNumbers [7,11,13,15,8,1]

  // sum array to create start number
  var target = randomNumbers
    .slice(0, props.numberOfOptionButtons - 2)
    .reduce((acc, curr) => acc + curr, 0)
  // TODO: Shuffle the random numbers of the array (right now answer is always first 4)

  // Function that receives index of number pressed
  var isNumberSelected = (numberIndex) => {
    // If button is not in array, it will return false (button is not in selected numbers array)
    return state.selectedNumbers.indexOf(numberIndex) >= 0
  }

  return (
    <View style={styles.fullPageContainer}>
      <Text style={styles.target}>{target}</Text>
      <View style={styles.randomButtonsContainer}>
        {
          // Prints every item in the random numbers array
          randomNumbers.map((buttonNumberText, index) => (
            <Button
              key={index}
              text={buttonNumberText}
              isSelected={isNumberSelected(index)}
            ></Button>
          ))
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

  randomButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
})
