import React, {Component, useState, useEffect} from 'react';
import {
  BackHandler,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  StatusBar,
  Button,
  Image,
  TextInput,
  StyleSheet,
  Text,
  View,
} from 'react-native';
GoogleSignin.configure({
  webClientId:
    '1046924362853-b94kmonmvljvdof3mv8665j6uj4j0bv4.apps.googleusercontent.com',
});

import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import AnimatedLoader from 'react-native-animated-loader';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Firebase from '@react-native-firebase/app';
import LottieView from 'lottie-react-native';
import {SocialIcon} from 'react-native-elements';
function LogIn() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <View></View>;
  }

  return <View></View>;
}
export default class FireBaseLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nameValidate: true,
      passwordValidate: true,
      password: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 3000);
  }
  // SignUp = (email, password) => {
  //   if (this.state.email.length > 0) {
  //     if (this.state.password.length > 0) {
  //       auth()
  //         .createUserWithEmailAndPassword(email, password)
  //         .then(() => {
  //           alert(' Succesfully signed Up!');
  //         })
  //         .catch(error => {
  //           if (error.code === 'auth/email-already-in-use') {
  //             alert('That email address is already in use!');
  //           }

  //           if (error.code === 'auth/invalid-email') {
  //             alert('That email address is invalid!');
  //           }
  //           if (error.code === 'auth/wrong-password') {
  //             alert('That password is weak!');
  //           }
  //         });
  //     } else {
  //       ToastAndroid.showWithGravityAndOffset(
  //         'Paaword Cannot be empty',
  //         ToastAndroid.SHORT,
  //         ToastAndroid.BOTTOM,
  //         10,
  //         60,
  //       );
  //     }
  //   } else {
  //     ToastAndroid.showWithGravityAndOffset(
  //       'Email Cannot be empty',
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM,
  //       10,
  //       60,
  //     );
  //   }
  // };
  LogIn = (email, password) => {
    if (this.state.email.length > 0) {
      if (this.state.password.length > 0) {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            this.props.navigation.navigate('FirebaseForm');
          })
          .then(() => {
            ToastAndroid.showWithGravityAndOffset(
              'Succesfully signed in!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              10,
              60,
            );
          })

          .catch(error => {
            if (error.code === 'auth/invalid-email') {
              alert('That email address is invalid!');
            }
            if (error.code === 'auth/wrong-password') {
              alert('That password is invalid!');
            }
          });
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Password Cannot be empty',
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
  };

  forgotPassword = email => {
    if (this.state.email.length > 0) {
      auth()
        .sendPasswordResetEmail(email)
        .then(function (user) {
          alert('Please check your email...');
        })
        .catch(function (e) {
          alert(
            'You Can Not Reset Your Passwoord Because There Is No Record Found Of This Email Adress',
            e,
          );
        });
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter your Email',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        10,
        60,
      );
    }
  };
  onGoogleButtonPress = async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.showWithGravityAndOffset(
          'Yuo have Canceled the Google Sign In',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          10,
          60,
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.showWithGravityAndOffset(
          'Google Sign Already In progress',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          10,
          60,
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.showWithGravityAndOffset(
          'Play services not available or outdated',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          10,
          60,
        );
      } else {
        // some other error happened
      }
    }
  };
  anonymously = () => {
    if (this.state.email.length > 0) {
      if (this.state.password.length > 0) {
        auth()
          .signInAnonymously()
          .then(() => {
            this.props.navigation.navigate('FireStoreReadDataa');
          })
          .then(() => {
            ToastAndroid.showWithGravityAndOffset(
              'Guest User signed in!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              10,
              60,
            );
          })
          .catch(error => {
            if (error.code === 'auth/operation-not-allowed') {
              console.log('Enable anonymous in your firebase console.');
            }
            console.error(error);
          });
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Please Enter your Password',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          10,
          60,
        );
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Please Enter your Email',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        10,
        60,
      );
    }
  };
  // onFacebookButtonPress = async () => {
  //   // Attempt login with permissions
  //   const result = await LoginManager.logInWithPermissions([
  //     'public_profile',
  //     'email',
  //   ]);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }

  //   // Once signed in, get the users AccesToken
  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }

  //   // Create a Firebase credential with the AccessToken
  //   const facebookCredential = auth.FacebookAuthProvider.credential(
  //     data.accessToken,
  //   );

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(facebookCredential);
  // };
  render() {
    // const adUnitId = __DEV__
    //   ? TestIds.BANNER
    //   : 'ca-app-pub-1242285490043268/7544048252';

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('./images/nurse.png')} />
        {/* <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        /> */}
        <TextInput
          style={[styles.input, !this.state.nameValidate ? styles.error : null]}
          onChangeText={email => this.setState({email})}
          placeholder="Email"
        />
        <TextInput
          style={[
            styles.input,
            !this.state.passwordValidate ? styles.error : null,
          ]}
          onChangeText={password => this.setState({password})}
          placeholder="Password"
          secureTextEntry
          autoCorrect={false}
        />
        {/* Forgot Password Button */}
        <TouchableOpacity
          onPress={() =>
            this.forgotPassword(this.state.email, this.state.password)
          }>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
        <LogIn />
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            <ActivityIndicator
              style={styles.containerrrrr}
              color="#bc2b78"
              size="large"
            />;
            this.LogIn(this.state.email, this.state.password);
          }}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          //   onPress={() => this.props.navigation.navigate('Go')}
          onPress={() => this.props.navigation.navigate('FirebaseForm')}>
          <Text style={styles.loginText}>SIGNUP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          //   onPress={() => this.props.navigation.navigate('Go')}
          onPress={() => {
            this.anonymously(this.state.email, this.state.password);
          }}>
          <Text style={styles.loginText}>Guest User</Text>
        </TouchableOpacity>

        {/* <SocialIcon
          style={{
            marginTop: 30,
            width: '80%',
          }}
          title="Sign In With Facebook"
          button
          raised={false}
          type="facebook"
          onPress={() =>
            this.onFacebookButtonPress().then(
              () => this.props.navigation.navigate('FirebaseForm'),
              console.log('signed In'),
            )
          }
        /> */}

        {/* <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate('FirebaseForm');
            this.play_btn.play();
          }}>
          <LottieView
            ref={animation => {
              this.play_btn = animation;
            }}
            source={require('./asserts/thum.json')}
            loop={false}
          />
        </TouchableWithoutFeedback> */}
        <GoogleSigninButton
          style={styles.googleBtn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() =>
            this.onGoogleButtonPress().then(() => {
              this.props.navigation.navigate('FirebaseForm');
            })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 30,
    backgroundColor: 'orange',
  },
  googleBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  image: {
    marginBottom: '8%',
    width: '42%',
    height: '22.5%',
  },
  containerrrrr: {
    flex: 1,
    justifyContent: 'center',
  },
});
