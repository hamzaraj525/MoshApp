import React, {Component} from 'react';
import {Appbar} from 'react-native-paper';

import {
  View,
  StyleSheet,
  Vibration,
  ToastAndroid,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Sound from 'react-native-sound';
import moment from 'moment';
const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

export default class Alarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  sound = new Sound('motorcycle.mp3');

  handleAlarm = () => {
    var date = moment().format('hh:mm a');
    if (this.state.input == date) {
      Vibration.vibrate(PATTERN);
      ToastAndroid.showWithGravityAndOffset(
        'Vibrating',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        10,
        60,
      );
      this.sound.play();
    } else {
      alert('Time Passed:' + date);
    }
  };
  render() {
    var date = moment().format('hh:mm a');
    return (
      <View style={styles.container}>
        <Text style={styles.loginText}>Alarm App</Text>
        <TextInput
          style={[styles.input, !this.state.nameValidate ? styles.error : null]}
          onChangeText={input => this.setState({input})}
          placeholder="Type time (hh:mm pm/am)"
        />
        {/* <Text style={{alignItems: 'center'}}>{date}</Text> */}

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.handleAlarm()}>
          <Text style={{alignItems: 'center'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loginBtn: {
    width: '60%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '6%',
    backgroundColor: 'orange',
  },
  input: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  container: {
    paddingTop: '20%',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  loginText: {
    fontSize: 22,
    fontWeight: 'bold',
    alignItems: 'center',
    marginBottom: '4%',
  },
});
