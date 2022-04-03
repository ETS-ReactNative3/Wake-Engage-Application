import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function App(props) {
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

  let handleDeleteAlarm = () => {
    props.onDelete(props)
  }

  return (
    <View style={[styles.container]}>
      <TouchableOpacity>
        <View style={[styles.topRow]}>
          <Text style={[styles.time]}>{getPrintableTime()}</Text>
          <Ionicons
            onPress={handleDeleteAlarm}
            style={[styles.switch]}
            name="trash"
            size={25}
            color="#bfbfbf"
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262626',
    width: 380,
    marginBottom: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden'
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
    color: '#bfbfbf',
    fontSize: 15,
    paddingBottom: 10
  },
  time: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    color: '#bfbfbf',
    fontSize: 40
  },
  text: {
    alignContent: 'flex-start',
    paddingLeft: 10,
    color: '#bfbfbf',
    fontSize: 15,
    paddingBottom: 10
  },
  switch: {
    marginRight: 10,
    marginTop: 10,
    alignContent: 'flex-end'
  }
})
