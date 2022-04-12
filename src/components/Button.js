import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function App(props) {
  let handlePress = () => {
    if (props.isDisabled) {
      return
    }
    // Tell game that I have been pressed.
    props.onPress(props.id)
  }

  return (
    // Button will light up on-press with the passed props text
    <TouchableOpacity onPress={handlePress}>
      {/* Button styling (disabled or active) */}
      <Text
        style={[
          !props.small && styles.randomButton,
          props.isDisabled && styles.disabled,
          props.isPlayAgainLose && styles.isPlayAgainLose,
          props.isPlayAgainWon && styles.isPlayAgainWon,
          props.small && styles.smallButton,
          props.text === null && styles.nullButton
        ]}
      >
        {props.text || 'DEF'}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  randomButton: {
    backgroundColor: '#4B0082',
    opacity: 0.9,
    width: 150,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 20
  },
  disabled: {
    opacity: 0.3
  },
  isPlayAgainLose: {
    backgroundColor: 'red',
    width: 400
  },
  isPlayAgainWon: {
    backgroundColor: '#33d633',
    width: 400
  },
  smallButton: {
    backgroundColor: '#4B0082',
    opacity: 0.9,
    color: 'white',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
    paddingVertical: 30
  },
  nullButton: {
    backgroundColor: 'transparent',
    color: 'transparent',
    borderColor: 'yellow',
    borderWidth: 2
  }
})
