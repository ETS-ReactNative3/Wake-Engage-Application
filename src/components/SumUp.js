import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function App() {
  // Create randomized start number
  const [target, setTarget] = useState(Math.floor(12 + 50 * Math.random()))

  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 60
  },

  target: {
    fontSize: 42,
    backgroundColor: 'grey',
    marginHorizontal: 50,
    textAlign: 'center'
  }
})
