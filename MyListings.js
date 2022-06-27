import React, {Component} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
class MyListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  SignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: null}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#ffe9ff',
        }}>
        <View
          style={{
            height: '16%',
            padding: 13,
            flexDirection: 'row',
            backgroundColor: 'white',
          }}>
          <Image style={styles.image} source={require('./images/nurse.png')} />
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              flexDirection: 'column',
            }}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Hamza</Text>
            <Text
              style={{
                color: 'grey',
              }}>
              RajputHamza@gmail.com
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            padding: 13,
            marginTop: '10%',
            flexDirection: 'row',
            marginBottom: '2%',
            backgroundColor: 'white',
          }}>
          <MaterialIcons name="format-list-bulleted" size={22} color={'blue'} />

          <Text style={{fontSize: 15}}>My Listings</Text>
          <MaterialIcons name="keyboard-arrow-right" size={22} color={'grey'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            padding: 13,

            flexDirection: 'row',
            backgroundColor: 'white',
          }}>
          <MaterialIcons name="message" size={22} color={'orange'} />
          <Text style={{fontSize: 15}}>My Messages</Text>
          <MaterialIcons name="keyboard-arrow-right" size={22} color={'grey'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: '10%',
            justifyContent: 'space-between',
            padding: 13,
            flexDirection: 'row',
            backgroundColor: 'white',
          }}
          onPress={() => {
            this.SignOut();
          }}>
          <Icon name="exit-to-app" color={'grey'} size={29} />
          <Text style={{fontSize: 15}}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MyListings;
const styles = StyleSheet.create({
  image: {
    width: '18.8%',
    height: '86.5%',
  },
});
