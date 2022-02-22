/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import * as Device from 'expo-device'
// import Constants from 'expo-constants'

export default function Apps() {
  const [state, setState] = useState(0)
  async function schedulePushNotification() {
    console.log('Scheduling a notifications for 2 seconds in the future')

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'You have got mail!',
        body: 'Here is the notification body',
        data: { data: 'goes here' }
      },
      trigger: { seconds: 2 }
    })
  }

  useEffect(() => {
    registerForPushNotification()
      .then((token) => console.log('The token is: ', token))
      .catch((e) => console.log('Error:', e))
  }, [])

  async function registerForPushNotification() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      )
      let finalStatus = existingStatus
      if (existingStatus != 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }
      if (finalStatus != 'granted') {
        alert('Fail to get the push token')
        return
      }
      var token = (await Notifications.getExpoPushTokenAsync()).data
      console.log('The token is: ', token)
      setState({ expoPushToken: token })
      return token
    } else {
      alert('Must use physical device for Push Notifications')
    }
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }

  return (
    <View style={styles.container}>
      <Text onClick={schedulePushNotification}>Alarm.js page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    padding: 50
  }
})
