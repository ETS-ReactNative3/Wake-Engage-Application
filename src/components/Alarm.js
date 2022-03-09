import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native'

export default function App(props) {
  // console.log('ALARM.js -> date2.toString', new Date(props.date2).toString())

  const [isEnabled, setIsEnabled] = useState(false) // TODO get this status as a prop
  const toggleSwitch = () => {
    // console.log('toggled')
    setIsEnabled((previousState) => !previousState)
  }

  //props.title

  let getPrintableDate = () => {
    return (
      props.date.toString().split(' ')[1] +
        ' ' +
        props.date.toString().split(' ')[2] || 'Date not defined'
    )
  }

  let getPrintableTime = () => {
    return (
      props.date.getHours() + ':' + props.date.getMinutes() ||
      'Time not defined'
    )
  }

  let handlePress = () => {
    console.log('pressed')
    props.onPress(props.id)
    // console.warn(props.text)
    // TODO tell our game that I have been pressed.
  }

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={toggleSwitch}>
        <View style={[styles.topRow]}>
          <Text style={[styles.time]}>{getPrintableTime()}</Text>
          <Switch
            style={[styles.switch]}
            trackColor={{ false: '#4d4d4d', true: '#7FFF00' }}
            thumbColor={isEnabled ? '#F8F8FF' : '#F8F8FF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <View style={[styles.bottowRow]}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.date]}>{getPrintableDate()}</Text>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.text]}>{props.title || 'Default'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

// TODO make random buttom width dymanic not 350!
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    width: 380,
    marginBottom: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden'
    // justifyContent: 'flex-start'
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 35
  },
  bottowRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 35
  },
  date: {
    paddingLeft: 25,
    // textAlign: 'center',
    // alignItems: 'center',
    color: 'white',
    fontSize: 15,
    paddingBottom: 10
  },
  time: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    color: 'white',
    fontSize: 40
  },
  text: {
    alignContent: 'flex-start',
    paddingLeft: 10,
    color: 'white',
    fontSize: 15,
    paddingBottom: 10
  },
  switch: {
    alignContent: 'flex-end'
  }
})
