import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import Games from './src/components/Games.js'
import Alarm from './src/components/Alarm.js'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

export default function App() {
  // Start playing a sound once App loads from a notification
  // If app opens naturally it will show the alarm component (GUI)

  const [pageId, setPageId] = useState('alarm')
  let gameFinished = () => {
    console.log('Resetting the app from app.js')
    // shut off the alarm on the game is done
    setPageId('alarm') // show alarm
  }
  let startAlarm = () => {
    console.log('Starting the alarm from app.js')
  }
  let stopAlarm = () => {
    console.log('Stopping the alarm from app.js')
  }

  const display = pageId ? 'none' : 'flex'

  //    NOTIFICATIONS START
  const [game, setGame] = useState(0)
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  // Runs every time its re
  useEffect(() => {
    // Get token
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    // Every time a notification is set this function is triggered (update notification)
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    // Every time we receive a notification this function runs (app opens from notification and game runs)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response)
        // console.log(response.notification.request.content.data.game)
        console.log(
          'Starting the game = ',
          response.notification.request.content.data.game
        )
        // Set the game to play
        setGame(response.notification.request.content.data.game)
        // Start/Show the game
        setPageId('games')
      })

    return () => {
      // Stop app from listening in the background
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])
  //    NOTIFICATIONS END

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      {/* In games page */}
      {pageId === 'games' && (
        // User won the game
        <Games onWinCondition={gameFinished} game={game} />
      )}
      {/* Redirect to alarm page */}
      {pageId === 'alarm' && <Alarm />}
    </View>
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

// Register with operating system to be allowed to send notifications
async function registerForPushNotificationsAsync() {
  let token
  // Check if using a physical device
  if (Constants.isDevice) {
    // Get user permission to run notifications
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    // If permission is granted, save token from notification
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    // User is not on a physical device
    alert('Must use physical device for Push Notifications')
  }

  // If using Android, set preferences
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  return token
}
