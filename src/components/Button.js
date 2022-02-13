import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function App(props) {
  //props.text

  let handlePress = () => {
    console.warn(props.text)
    // TODO tell our game that I have been pressed.
  }

  return (
    // Button will light up on-press with the passed props text
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.randomButton}>{props.text}</Text>
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
  }
})
