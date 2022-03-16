/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import {
  Alert,
  Text,
  ScrollView,
  View,
  Platform,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity
} from 'react-native'
import * as Notifications from 'expo-notifications'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import Alarm from './Alarm.js'

export default function Apps() {
  // DateTime
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [readytoSchedule, setReadytoSchedule] = useState(false)
  const [alarmNameInput, onChangeText] = React.useState('')
  const [modalVisible, setModalVisible] = useState(false)
  let [alarms, setAlarms] = useState([])

  let [selectedGame, setSelectedGame] = useState()
  useEffect(() => {
    getAllNotifications()
  }, [])

  // Run this every time date changes
  useEffect(() => {
    console.log('date changed to: ', date.toString())

    if (readytoSchedule === true) {
      setReadytoSchedule(false)
      scheduleNotification()
    }
  }, [date])

  const onDateChange = async (event, selectedDate) => {
    await setShow(Platform.OS === 'ios')
    if (mode === 'time') {
      await setReadytoSchedule(true)
      setShow(false)
    }
    await setDate(selectedDate || new Date(0))
    if (mode === 'date') {
      showMode('time')
      return
    }
    setShow(false)
  }

  const showMode = (currentMode) => {
    setMode(currentMode)
    setShow(true)
  }

  const addAlarm = () => {
    console.log('Showign date')
    showMode('date')
  }
  const showModal = () => {
    selectedGame = 0
    setModalVisible(true)
  }

  // + -> addAlarm -> mode-date -> mode-time -> setSetAlarm(true)
  // END DateTime

  // var games = [1, 2, 3, 4] // all available game names which we can show in Games.js
  // Pick a game to play on the alarm or set it to random
  // Pick a time for a notification
  // Set notification

  let scheduleNotification = async () => {
    const trigger = new Date(date)
    trigger.setSeconds(0) // Firat notification will go off at 0 seconds
    console.log('Scheduling notification for (TO STRING): ', trigger.toString())

    // const trigger = new Date(Date.now()) // + 60 * 60 * 1000 +1hour
    // trigger.setHours(17)
    // trigger.setMinutes(50)
    // console.log('Scheduling an alarm for:', trigger.toString())
    // schedulePushNotification(trigger)
    // schedulePushNotification({ seconds: 2 })
    // schedulePushNotification(trigger)

    var title = alarmNameInput
    var body = 'Rise and Shine!'
    var game = selectedGame

    // Schedule MAIN notification as ALARM
    await schedulePushNotification(title, body, game, trigger, false) // sub false

    // Schedule the other notifications as sub-notifications
    let minuteRollOverAvailable = true
    for (var i = 2; i < 60; i += 2) {
      trigger.setSeconds(i)
      schedulePushNotification(title, body, game, trigger, true)
      if (i == 58 && minuteRollOverAvailable) {
        minuteRollOverAvailable = false
        trigger.setMinutes(trigger.getMinutes() + 1)
        i = 0
      }
    }

    getAllNotifications()
    setDate(new Date(0))
    setMode('date')
    setShow(false)
    onChangeText('')
    setModalVisible(false)
  }

  async function getAllNotifications() {
    setAlarms([])
    await setAlarms(await Notifications.getAllScheduledNotificationsAsync())
    console.log(alarms)
  }

  async function deleteAlarmById(props) {
    // console.log('Alarm list deleting:', props)
    await alarms.map(async (alarm) => {
      if (alarm.content.title === props.title) {
        await Notifications.cancelScheduledNotificationAsync(alarm.identifier)
      }
    })

    getAllNotifications()
    setDate(new Date(0))
    setMode('date')
    setShow(false)
    onChangeText('')
    setModalVisible(false)
  }

  // async function cancelAllNotifications() {
  //   await Notifications.cancelAllScheduledNotificationsAsync().then(() =>
  //     console.log('Done deleting all notifications')
  //   )
  // }

  return (
    <>
      {/* <Text style={[styles.small]}>{date.toString()}</Text> */}

      <Text style={[styles.heading]}>Alarms</Text>
      <Text style={[styles.footer]} onPress={showModal}>
        +
      </Text>

      <ScrollView>
        <View style={styles.container}>
          {/* <Button title="Get all" onPress={getAllNotifications} />
          <Button title="Cancell all" onPress={cancelAllNotifications} /> */}

          {alarms.map(
            (SpecificAlarm, index) =>
              !SpecificAlarm.content.data.sub && (
                <Alarm
                  key={index}
                  title={SpecificAlarm.content.title}
                  date={new Date(SpecificAlarm.trigger.value)}
                  date2={SpecificAlarm.trigger.value}
                  game={SpecificAlarm.content.data.game}
                  body={SpecificAlarm.content.body}
                  onDelete={deleteAlarmById}
                ></Alarm>
              )
          )}

          {show && (
            <>
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalHeading]}>Your Alarm name:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                value={alarmNameInput}
              />

              <TouchableOpacity style={[styles.button, styles.buttonClose]}>
                <Picker
                  style={{ height: 30, width: 280 }}
                  selectedValue={selectedGame}
                  onValueChange={(itemValue) => setSelectedGame(itemValue)}
                >
                  <Picker.Item label="Please select a game..." value="0" />
                  <Picker.Item label="Sum-Up" value="1" />
                  <Picker.Item label="8-Puzzle" value="2" />
                  <Picker.Item label="The Simon Game" value="3" />
                </Picker>
              </TouchableOpacity>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  if (selectedGame === 0 || selectedGame === undefined) {
                    Alert.alert('Please select a game', '', [{ text: 'OK' }])
                  } else {
                    setModalVisible(!modalVisible)
                    addAlarm()
                  }
                }}
              >
                <Text style={styles.textStyle}>Next</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  )
}

// Set the content for notification
async function schedulePushNotification(
  title,
  body,
  selectedGame,
  secondsForDateForNotification,
  subNotification
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: {
        game: selectedGame,
        sub: subNotification
      }
    },
    trigger: secondsForDateForNotification
  })
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // marginTop: 22
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 20
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  modalHeading: {
    zIndex: 1,
    color: 'white',
    fontSize: 20
    // width: '100%',
  },
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
  whiteText: {
    fontSize: 40,
    backgroundColor: 'red',
    color: 'white'
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
  textInput: {
    backgroundColor: '#2673bf',
    color: 'white',
    fontSize: 20,
    width: '95%',
    padding: 10,
    margin: 20,
    borderRadius: 50
  },
  small: {
    backgroundColor: 'red',
    zIndex: 1,
    color: 'white',
    fontSize: 20,
    paddingBottom: 15,
    paddingLeft: 10,
    marginTop: 600,
    width: '100%',
    position: 'absolute'
  }
})
