import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import SimonButton from './SimonButton'
export default function App(props) {
  //props.text
  let handlePress = () => {
    if (props.isDisabled) {
      return
    }
    // tell our game that I have been pressed.
    props.onPress(props.id)
    // console.warn(props.text)
  }

  return (
    // Button will light up on-press with the passed props text
    <TouchableOpacity onPress={handlePress}>
      <SimonButton></SimonButton>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  randomButton: {
    color: 'white',
    backgroundColor: 'yellow',
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
