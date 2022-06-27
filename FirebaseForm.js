import React, {Component} from 'react';

import {
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Button,
  Image,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {RadioButton} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';

export default class FirebaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Fname: '',
      Lname: '',
      gender: '',
      contact: '',
      email: '',
      password: '',
      list: [],
      // health:'1',
    };
  }
  componentDidMount() {
    this.handleNotification();
  }
  SignUp = (email, password) => {
    if (this.state.Fname.length > 0) {
      if (this.state.Lname.length > 0) {
        if (this.state.gender.length > 0) {
          if (this.state.contact.length > 0) {
            if (this.state.email.length > 0) {
              if (this.state.password.length > 0) {
                auth()
                  .createUserWithEmailAndPassword(email, password)
                  .then(() => {
                    alert(' Succesfully signed Up!');
                  })
                  .then(() => {
                    this.sendDataToFireStore();
                  })
                  .then(() => {
                    this.props.navigation.navigate('FireBaseLogin');
                  })

                  .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                      alert('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                      alert('That email address is invalid!');
                    }
                    if (error.code === 'auth/wrong-password') {
                      alert('That password is weak!');
                    }
                  });
              } else {
                ToastAndroid.showWithGravityAndOffset(
                  'Paaword Cannot be empty',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  10,
                  60,
                );
              }
            } else {
              ToastAndroid.showWithGravityAndOffset(
                'Email Cannot be empty',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                10,
                60,
              );
            }
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Contact Cannot be empty',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              10,
              60,
            );
          }
        } else {
          ToastAndroid.showWithGravityAndOffset(
            'Gender Cannot be empty',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            10,
            60,
          );
        }
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Last Name Cannot be empty',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          10,
          60,
        );
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'First Name Cannot be empty',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        10,
        60,
      );
    }
  };

  sendDataToFireStore = () => {
    firestore()
      .collection('SignUpUsers')
      .doc()
      .set({
        Fname: this.state.Fname,
        Lname: this.state.Lname,
        gender: this.state.gender,
        contact: this.state.contact,
        date: new Date().toLocaleString(),
      })
      .then(() => {
        console.log('User added!');
      });
  };

  // const newReference = database().ref('/users').push();

  // newReference
  //   .set({
  //     Fname: this.state.Fname,
  //     Lname: this.state.Lname,
  //     gender: this.state.gender,
  //     contact: this.state.contact,
  //     date: new Date().toLocaleString(),
  //     // health: this.state.health,
  //   })
  //   .then(() => this.props.navigation.navigate('FireBaseLogin'));

  // // console.log('Data submitted.')

  // ToastAndroid.showWithGravityAndOffset(
  //   'Succesfully Submitted',
  //   ToastAndroid.SHORT,
  //   ToastAndroid.BOTTOM,
  //   10,
  //   60,
  // );

  // SignOut = (email, password) => {
  //   auth()
  //     .signOut()
  //     .then(() => {
  //       alert('signed out');
  //     });
  // };

  // SignOut = (email, password) => {
  //   auth()
  //     .signOut()
  //     .then(() => {
  //       alert('signed out');
  //     });
  // };
  SignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: null}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  handleNotification = (item, index) => {
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Demo App',
      message: 'Fill the Form',
      date: new Date(Date.now()),
      allowWhileIdle: true,
      repeatType: 'time',
      repeatTime: 900000,
    });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{marginBottom: '7%', fontSize: 22, fontWeight: 'bold'}}>
          Sign Up Form
        </Text>
        <TextInput
          value={this.state.Fname}
          style={styles.input}
          onChangeText={Fname => this.setState({Fname})}
          placeholder="First Name"
        />
        <TextInput
          value={this.state.Lname}
          style={styles.input}
          onChangeText={Lname => this.setState({Lname})}
          placeholder="Last Name"
        />
        <TextInput
          value={this.state.gender}
          style={styles.input}
          onChangeText={gender => this.setState({gender})}
          placeholder="Gender"
        />
        <TextInput
          value={this.state.contact}
          style={styles.input}
          onChangeText={contact => this.setState({contact})}
          placeholder="Contact"
        />
        <TextInput
          style={styles.input}
          onChangeText={email => this.setState({email})}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={password => this.setState({password})}
          placeholder="Password"
          secureTextEntry
          autoCorrect={false}
        />
        {/* Radio button  */}
        {/* <Text style={styles.labelInputText}>Your Current Health </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.labelInputText}>1</Text>
          <RadioButton
            value="1"
            status={this.state.health === '1' ? 'checked' : 'unchecked'}
            onPress={() => this.setState({health: '1'})}
          />
          <Text style={styles.labelInputText}>2</Text>
          <RadioButton
            value="2"
            status={this.state.health === '2' ? 'checked' : 'unchecked'}
            onPress={() => this.setState({health: '2'})}
          />
          <Text style={styles.labelInputText}>3</Text>
          <RadioButton
            value="3"
            status={this.state.health === '3' ? 'checked' : 'unchecked'}
            onPress={() => this.setState({health: '3'})}
          />
          <Text style={styles.labelInputText}>4</Text>
          <RadioButton
            value="4"
            status={this.state.health === '4' ? 'checked' : 'unchecked'}
            onPress={() => this.setState({health: '4'})}
          />
          <Text style={styles.labelInputText}>5</Text>
          <RadioButton
            value="5"
            status={this.state.health === '5' ? 'checked' : 'unchecked'}
            onPress={() => this.setState({health: '5'})}
          />
          <Text style={styles.labelInputText}>6</Text>
          <RadioButton
            value="6"
            status={this.state.health === '6' ? 'checked' : 'unchecked'}
            onPress={() => this.setState({health: '6'})}
          />
          <Text style={styles.labelInputText}>7</Text>
          <RadioButton
            value="7"
            status={this.state.health === '7' ? 'checked' : 'unchecked'}
            onPress={() => this.setState({health: '7'})}
          />
          <Text style={styles.labelInputText}>8</Text>
          <RadioButton
            value="7"
            status={this.state.health === '8' ? 'checked' : 'unchecked'}
            onPress={() => this.setState({health: '8'})}
          />
        </View> */}
        {/* Submit button  */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.SignUp(this.state.email, this.state.password)}>
          <Text>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            this.props.navigation.navigate('FireBaseLogin');
            this.SignOut();
          }}>
          <Text style={styles.loginText}>SIGN Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFC0CB',
    borderRadius: 5,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  container: {
    padding: '5%',

    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  error: {
    borderWidth: 4,
    borderColor: 'red',
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: 'orange',
  },
  image: {
    marginBottom: 40,
    width: '38%',
    height: '20%',
  },
  labelInputText: {
    textAlign: 'left',
    marginVertical: 10,
    fontSize: 13,
  },
});

// import React, {useState, useEffect} from 'react';
// import {
//   ActivityIndicator,
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Animated,
// } from 'react-native';

// const marginBottomItem = 20;
// const paddingItem = 10;
// const imgHeight = 100;
// const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;

// const BASE_URL = 'https://dummyapi.io/data/api';
// const APP_ID = '6081e1754a7541617d41334a';
// const backgroundImg =
//   'https://i.pinimg.com/originals/2a/24/74/2a24740658e1910bcfedbbdd83098c4e.jpg';

// const FirebaseForm = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsloading] = useState(false);
//   const Yscroll = React.useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     setIsloading(true);
//     getAllUsers();
//     return () => {};
//   }, []);

//   getAllUsers = () => {
//     fetch(`${BASE_URL}/user`, {headers: {'app-id': APP_ID}})
//       .then(res => res.json())
//       .then(resJson => {
//         setData(resJson.data);
//       })
//       .catch(console.error)
//       .finally(() => setIsloading(false));
//   };

//   const renderUser = ({item, index}) => {
//     const scale = Yscroll.interpolate({
//       inputRange: [-1, 0, sizeOfItem * index, sizeOfItem * (index + 2)],
//       outputRange: [1, 1, 1, 0],
//     });
//     return (
//       <Animated.View
//         style={[
//           styles.item,
//           {
//             transform: [{scale}],
//           },
//         ]}>
//         <Image
//           style={styles.image}
//           source={{uri: item.picture}}
//           resizeMode="contain"
//           contentContainerStyle={{padding: 20}}
//         />
//         <View style={styles.wrapText}>
//           <Text
//             style={
//               styles.fontSize
//             }>{`${item.title} ${item.firstName} ${item.lastName}`}</Text>
//         </View>
//       </Animated.View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Image
//         source={{uri: backgroundImg}}
//         style={StyleSheet.absoluteFillObject}
//         blurRadius={80}
//       />
//       {isLoading ? (
//         <ActivityIndicator />
//       ) : (
//         <Animated.FlatList
//           data={data}
//           keyExtractor={item => `key-${item.id}`}
//           renderItem={renderUser}
//           contentContainerStyle={{
//             padding: 20,
//           }}
//           onScroll={Animated.event(
//             [{nativeEvent: {contentOffset: {y: Yscroll}}}],
//             {useNativeDriver: true},
//           )}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   fontSize: {
//     fontSize: 18,
//   },
//   image: {
//     width: 100,
//     height: imgHeight,
//   },
//   wrapText: {
//     flex: 1,
//     marginLeft: 10,
//     justifyContent: 'center',
//   },
//   item: {
//     flexDirection: 'row',
//     marginBottom: marginBottomItem,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 30,
//     padding: paddingItem,
//   },
//   container: {
//     flex: 1,
//   },
// });

// export default FirebaseForm;
