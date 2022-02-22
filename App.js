import React, { useState, useEffect, useRef } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
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

  //    NOTIFICATIONS START
  const [game, setGame] = useState(0)
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  // Runs every time its re
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response)
        // console.log(response.notification.request.content.data.game)
        console.log(
          'Starting the game = ',
          response.notification.request.content.data.game
        )
        // // Set the game to play
        setGame(response.notification.request.content.data.game)
        // Start the game
        setPageId(1)
      })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])
  //    NOTIFICATIONS END

  let scheduleNotification2 = (seconds) => {
    schedulePushNotification(seconds)
    setPageId(0)
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      {pageId === 1 && <Games onWinCondition={gameFinished} game={game} />}
      {pageId === 2 && <Alarm setNotification={scheduleNotification2} />}

      <TouchableOpacity onPress={handleGames}>
        <Text style={[styles.Button, { display }]}>Games</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAlarm}>
        <Text style={[styles.Button, { display }]}>Alarm</Text>
      </TouchableOpacity>

      {
        /* Notifications debug code */
        // <Text>Your expo push token: {expoPushToken}</Text>
        // <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        //   <Text>
        //     Title: {notification && notification.request.content.title}{' '}
        //   </Text>
        //   <Text>Body: {notification && notification.request.content.body}</Text>
        //   <Text>
        //     Data:{' '}
        //     {notification && JSON.stringify(notification.request.content.data)}
        //   </Text>
        // </View>
        // <Button
        //   title="Press to schedule a notification"
        //   onPress={async () => {
        //     await schedulePushNotification()
        //   }}
        // />
      }
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

async function schedulePushNotification(secondsForNotification) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Game 1',
      body: 'Here is the notification body',
      data: { game: '1' }
    },
    trigger: secondsForNotification
  })
}

async function registerForPushNotificationsAsync() {
  let token
  if (Constants.isDevice) {
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
    token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
  } else {
    alert('Must use physical device for Push Notifications')
  }

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
