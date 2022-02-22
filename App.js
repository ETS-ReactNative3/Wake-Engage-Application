import React, { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import Games from './src/components/Games.js'
import Alarm from './src/components/Alarm.js'

export default function App() {
  // Start playing a sound once App loads from a notification
  // If app opens naturally it will show the alarm component (GUI)

  const [pageId, setPageId] = useState(0)
  let handleGames = () => {
    setPageId(1)
  }
  let handleAlarm = () => {
    setPageId(2)
  }

  let gameFinished = () => {
    console.log('Resetting the app from app.js')
    // shut off the alarm on the game is done
    setPageId(0)
  }
  let startAlarm = () => {
    console.log('Starting the alarm from app.js')

  }
  let stopAlarm = () => {
    console.log('Stopping the alarm from app.js')

  }

  const display = pageId ? 'none' : 'flex'

  return (
    <>
      {pageId === 1 && <Games onWinCondition={gameFinished} game="1" />}
      {pageId === 2 && <Alarm />}

      <TouchableOpacity onPress={handleGames}>
        <Text style={[styles.Button, { display }]}>Games</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAlarm}>
        <Text style={[styles.Button, { display }]}>Alarm</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#999',
    width: 150,
    marginTop: 100,
    fontSize: 35,
    textAlign: 'center',
    paddingVertical: 20,
    marginHorizontal: '30%'
  }
})
