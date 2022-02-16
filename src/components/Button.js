import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function App(props) {
  //props.text

  let handlePress = () => {
    if (props.isDisabled) {
      return
    }
    props.onPress(props.id)
    // console.warn(props.text)
    // TODO tell our game that I have been pressed.
  }

  return (
    // Button will light up on-press with the passed props text
    <TouchableOpacity onPress={handlePress}>
      {/* Button styling (disabled or active) */}
      <Text
        style={[
          styles.randomButton,
          props.isDisabled && styles.disabled,
          props.isPlayAgain && styles.isPlayAgain
        ]}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  randomButton: {
    backgroundColor: '#999',
    width: 150,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
    paddingVertical: 20
  },
  disabled: {
    opacity: 0.3
  },
  isPlayAgain: {
    backgroundColor: 'red',
    width: 400
  }
})
