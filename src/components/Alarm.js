import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'
import * as Notifications from 'expo-notifications'
export default function Apps(props) {
  // Pick a game to play on the alarm or set it to random
  // Pick a time for a notification
  // Set notification

  let scheduleNotification = () => {
    const trigger = new Date(Date.now()) // + 60 * 60 * 1000 +1hour

    trigger.setHours(17)
    trigger.setMinutes(50)
    trigger.setSeconds(0)

    console.log(trigger.toString())
    props.setNotification(trigger)
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
    >
      <Button
        title="Press to schedule a notification"
        onPress={scheduleNotification}
      />

      <Button title="Get all" onPress={getAllNotifications} />
      <Button title="Cancell all" onPress={cancelAllNotifications} />
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 150,
//     padding: 50
//   }
// })
async function getAllNotifications() {
  let hi = await Notifications.getAllScheduledNotificationsAsync()
  console.log(hi)
}

async function cancelAllNotifications() {
  let hi = await Notifications.cancelAllScheduledNotificationsAsync()
  console.log(hi)
}
