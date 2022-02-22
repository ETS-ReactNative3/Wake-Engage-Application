import React, { useState, useEffect, useRef } from 'react'
import { Text, View, Button, Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

export default function Apps() {
  const [state, setState] = useState(0)
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
        console.log(response)
      })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Title: {notification && notification.request.content.title}{' '}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{' '}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification()
        }}
      />
    </View>
  )
}

// async function schedulePushNotification() {
//   console.log('Scheduling a notifications for 2 seconds in the future')

//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: 'You have got mail!',
//       body: 'Here is the notification body',
//       data: { data: 'goes here' }
//     },
//     trigger: { seconds: 2 }
//   })
// }

// useEffect(() => {
//   registerForPushNotification()
//     .then((token) => console.log('The token is: ', token))
//     .catch((e) => console.log('Error:', e))
// }, [])

//   async function registerForPushNotification() {
//     if (Device.isDevice) {
//       const { status: existingStatus } = await Permissions.getAsync(
//         Permissions.NOTIFICATIONS
//       )
//       let finalStatus = existingStatus
//       if (existingStatus != 'granted') {
//         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
//         finalStatus = status
//       }
//       if (finalStatus != 'granted') {
//         alert('Fail to get the push token')
//         return
//       }
//       var token = (await Notifications.getExpoPushTokenAsync()).data
//       console.log('The token is: ', token)
//       setState({ expoPushToken: token })
//       return token
//     } else {
//       alert('Must use physical device for Push Notifications')
//     }
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C'
//     })
//   }

//   return (
//     <View style={styles.container}>
//       <Text onClick={schedulePushNotification}>Alarm.js page</Text>
//     </View>
//   )
// }

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Game 1-2',
      body: 'Here is the notification body',
      data: { game: 'Game 1' }
    },
    trigger: { seconds: 10 }
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

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 150,
//     padding: 50
//   }
// })
