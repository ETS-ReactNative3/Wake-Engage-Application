import React, { useState, useEffect } from 'react'
import {
  Text,
  ScrollView,
  View,
  Button,
  Platform,
  StyleSheet
} from 'react-native'
import * as Notifications from 'expo-notifications'
import DateTimePicker from '@react-native-community/datetimepicker'
import Alarm from './Alarm.js'

export default function Apps() {
  // DateTime
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [alarms, setAlarms] = useState([])
  const [setAlarm, setSetAlarm] = useState(false)

  useEffect(() => {
    console.log('the date has changed', date.toString())
  }, [date])

  useEffect(() => {
    if (setAlarm === true) {
      // console.log('calling schedule notification')
      scheduleNotification()
      setSetAlarm(false)
    }
  }, [setAlarm])

  const onDateChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios')

    setDate(selectedDate||date)

    if (mode === 'date') {
      showTimepicker()
      return
    }
    if (mode === 'time') {
      setSetAlarm(true)
      setShow(false)
      return
    }
    setShow(false)
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }

  const addAlarm = () => {
    showDatepicker()
  }
  // END DateTime

  var games = [1, 2, 3, 4] // all available game names which we can show in Games.js
  // Pick a game to play on the alarm or set it to random
  // Pick a time for a notification
  // Set notification

  let scheduleNotification = () => {
    const trigger = new Date(date)
    // const trigger = new Date(Date.now()) // + 60 * 60 * 1000 +1hour

    // trigger.setHours(17)
    // trigger.setMinutes(50)
    trigger.setSeconds(0)

    console.log('Scheduling an alarm for:', trigger.toString())

    // schedulePushNotification(trigger)
    // schedulePushNotification({ seconds: 2 })
    schedulePushNotification(trigger)
  }

  async function getAllNotifications() {
    setAlarms(await Notifications.getAllScheduledNotificationsAsync())
    console.log(alarms)
  }

  return (
    <>
      <Text style={[styles.small]}>{date.toString()}</Text>

      {/* <Text style={[styles.heading]}>Alarms</Text> */}
      <Text style={[styles.footer]} onPress={addAlarm}>
        +
      </Text>

      <ScrollView>
        <View style={styles.container}>
          {/* <Alarm title="Get 1" date={date}></Alarm>
          <Alarm title="Get 2" date={date}></Alarm>
          <Alarm title="Get 3" date={date}></Alarm>
          <Alarm title="Get 4" date={date}></Alarm>
          <Alarm title="Get 5" date={date}></Alarm>
          <Alarm title="Get 6" date={date}></Alarm>
          <Alarm title="Get 7" date={date}></Alarm>
          <Alarm title="Get 8" date={date}></Alarm>
          <Alarm title="Get 9" date={date}></Alarm> */}

          <Button title="Get all" onPress={getAllNotifications} />
          <Button title="Cancell all" onPress={cancelAllNotifications} />

          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>
      </ScrollView>
    </>
  )
}

async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync()
}

// Set the content for notification
// TODO make game selectable from the Alarm.js
async function schedulePushNotification(secondsForDateForNotification) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Alarmity',
      body: 'wakey wakey:)',
      data: { game: '1' }
    },
    trigger: secondsForDateForNotification
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 'auto',
    alignItems: 'center',
    paddingTop: 110
    // justifyContent: 'space-around'
  },
  heading: {
    backgroundColor: 'black',
    zIndex: 1,
    color: 'white',
    fontSize: 40,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingTop: 10,
    width: '100%',
    top: 20,
    position: 'absolute'
  },
  button: {
    zIndex: 1,
    backgroundColor: 'red',
    marginTop: 20
  },
  footer: {
    backgroundColor: '#2673bf',
    alignItems: 'flex-end',
    zIndex: 1,
    color: 'white',
    fontSize: 40,
    // paddingBottom: 15,
    // paddingLeft: 10,
    bottom: 10,
    right: 10,
    paddingHorizontal: 15,
    // width: '100%',
    position: 'absolute',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200
  },
  small: {
    backgroundColor: 'black',
    zIndex: 1,
    color: 'white',
    fontSize: 20,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingTop: 10,
    width: '100%',
    top: 20,
    position: 'absolute'
  }
})
