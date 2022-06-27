import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedLoader from 'react-native-animated-loader';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SwipeUpDownModal from 'react-native-swipe-modal-up-down';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
export default class Firestore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      title: '',
      price: '',
      description: '',
      contact: '',
      category: '',
      image: '',
      list: [],
      ShowComment: false,
      animateModal: false,
      isLoading: false,
      submitted: false,
      submit_loop: false,
    };
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({isLoading: false});
  //   }, 3000);
  // }
  onPressButton = () => {
    var count = '' + this.state.list.length;
    if (this.state.title.length > 0) {
      if (this.state.price.length > 0) {
        firestore()
          .collection('users')
          .doc(count)
          .set({
            Title: this.state.title,
            Price: this.state.price,
            Description: this.state.description,
            Contact: this.state.contact,
            Category: this.state.category,
            image: this.state.image,
            key: count,
          })
          .then(() => {
            console.log('Product added!');
            this.props.navigation.navigate('FireBaseLogin');
          })
          .catch(error => {
            console.log(error);
          });

        // this.callfunctiontopopulateFlatList();
      } else {
        Alert.alert('Title can not be empty');
      }
    } else {
      Alert.alert('Price Name Cannot be empty');
    }
  };

  // callfunctiontopopulateFlatList = () => {
  //   var newArray = [];

  //   firestore()
  //     .collection('users')
  //     .get()
  //     .then(querySnapshot => {
  //       console.log('Total users: ', querySnapshot.size);

  //       querySnapshot.forEach(documentSnapshot => {
  //         newArray.push(documentSnapshot.data());
  //       });
  //     })
  //     .then(testing => {
  //       console.log('New Array Push is =', newArray);
  //       this.setState({list: newArray});
  //     });
  // };
  // chooseFile = () => {
  //   const options = {noData: true};
  //   launchImageLibrary(options, response => {
  //     console.log('response', response);
  //     if (response.uri) {
  //       this.setState({photo: response});
  //     }
  //   });
  // };
  openCamera = () => {
    launchImageLibrary({quality: 0.5}, fileobj => {
      //    console.log(fileobj)
      const uploadTask = storage()
        .ref()
        .child(`/items/${Date.now()}`)
        .putFile(fileobj.uri);
      uploadTask.on(
        'state_changed',
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) {
            alert('uploaded');
          }
        },
        error => {
          alert('something went wrong');
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.setState({downloadURL: this.state.image});
          });
        },
      );
    });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{}}
            contentContainerStyle={{
              paddingBottom: 50,
            }}>
            <Text
              style={{
                marginBottom: '7%',
                marginTop: '7%',
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              New Listing
            </Text>

            <TouchableOpacity
              onPress={this.openCamera}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                backgroundColor: '#F6F3F5',
                borderRadius: 10,
                width: '35%',
                height: '20%',
              }}>
              <MaterialCommunityIcons name="camera" size={30} color={'grey'} />
            </TouchableOpacity>

            <View style={styles.passwordContainer}>
              <MaterialCommunityIcons name="pencil" size={20} color={'pink'} />
              <TextInput
                style={{width: '90%', marginLeft: 6}}
                value={this.state.title}
                onChangeText={title => this.setState({title})}
                placeholder="Title"
                placeholderTextColor="black"
              />
            </View>
            <View
              style={[
                styles.passwordContainer,
                {alignSelf: 'flex-start', width: '30%'},
              ]}>
              <FontAwesome name="dollar" size={20} color={'pink'} />
              <TextInput
                placeholderTextColor="black"
                style={{marginLeft: 14}}
                placeholder="Price"
                value={this.state.price}
                onChangeText={price => this.setState({price})}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.setState({ShowComment: true})}
              style={styles.categBtn}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="apps-sharp" size={20} color={'pink'} />
                <Text
                  style={{
                    marginLeft: 6,
                  }}>
                  {this.state.category ? this.state.category : 'Category'}
                </Text>
              </View>
              <SimpleLineIcons name="arrow-down" size={10} color={'pink'} />
            </TouchableOpacity>

            <View
              style={[
                styles.passwordContainer,
                {marginBottom: 0, width: '100%'},
              ]}>
              <AntDesign name="calendar" size={20} color={'pink'} />
              <TextInput
                placeholderTextColor="black"
                value={this.state.description}
                style={{width: '90%', marginLeft: 6}}
                onChangeText={description => this.setState({description})}
                placeholder="Description"
              />
            </View>

            <TouchableOpacity
              onPress={() => this.onPressButton}
              style={[
                styles.loginBtn,
                {marginTop: 15, backgroundColor: '#FB5B64'},
              ]}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                POST
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert('Canceled')}
              style={[
                styles.loginBtn,
                {
                  marginTop: '5%',
                  backgroundColor: 'white',
                },
              ]}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>

            <View>
              <SwipeUpDownModal
                modalVisible={this.state.ShowComment}
                PressToanimate={this.state.animateModal}
                ContentModalStyle={styles.Modal}
                ContentModal={
                  <View>
                    <View style={styles.containerContent}>
                      <View style={styles.exploreSection}>
                        <Text style={styles.exploreHeader}>
                          Select a Category{' '}
                        </Text>
                        <View style={styles.exploreContent}>
                          <TouchableOpacity
                            style={[
                              styles.singleExplore,
                              {backgroundColor: '#f44a53'},
                            ]}
                            onPress={() =>
                              this.setState({
                                ShowComment: true,
                                animateModal: true,
                                category: 'Furniture',
                              })
                            }>
                            <MaterialCommunityIcons
                              name="lamp"
                              size={22}
                              color={'white'}
                            />
                            <Text style={styles.exploreText}>Furniture</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.singleExplore,
                              {backgroundColor: '#fb8634'},
                            ]}
                            onPress={() =>
                              this.setState({
                                ShowComment: true,
                                animateModal: true,
                                category: 'Cars',
                              })
                            }>
                            <MaterialCommunityIcons
                              name="car"
                              size={22}
                              color={'white'}
                            />
                            <Text style={styles.exploreText}>Cars</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.singleExplore,
                              {backgroundColor: '#FACA2E'},
                            ]}
                            onPress={() =>
                              this.setState({
                                ShowComment: true,
                                animateModal: true,
                                category: 'Cameras',
                              })
                            }>
                            <Fontisto name="camera" size={22} color={'white'} />
                            <Text style={styles.exploreText}>Cameras</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.singleExplore,
                              {backgroundColor: '#21D973'},
                            ]}
                            onPress={() =>
                              this.setState({
                                ShowComment: true,
                                animateModal: true,
                                category: 'Games',
                              })
                            }>
                            <SimpleLineIcons
                              name="game-controller"
                              size={22}
                              color={'white'}
                            />
                            <Text style={styles.exploreText}>Games</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.singleExplore,
                              {
                                marginRight: 'auto',
                                backgroundColor: '#32BBAC',
                                marginLeft: '7%',
                              },
                            ]}
                            onPress={() =>
                              this.setState({
                                ShowComment: true,
                                animateModal: true,
                                category: 'Clothing',
                              })
                            }>
                            <MaterialCommunityIcons
                              name="shoe-heel"
                              size={22}
                              color={'white'}
                            />
                            <Text style={styles.exploreText}>Clothing</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.singleExplore,
                              {
                                marginRight: 'auto',
                                backgroundColor: '#399CF0',
                                marginLeft: '7%',
                              },
                            ]}
                            onPress={() =>
                              this.setState({
                                ShowComment: true,
                                animateModal: true,
                                category: 'Sports',
                              })
                            }>
                            <MaterialIcons
                              name="sports-basketball"
                              size={22}
                              color={'white'}
                            />
                            <Text style={styles.exploreText}>Sports</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                ShowComment: true,
                                animateModal: true,
                                category: 'Movies',
                              })
                            }
                            style={[
                              styles.singleExplore,
                              {
                                marginRight: 'auto',
                                backgroundColor: '#3D6AE9',
                              },
                            ]}>
                            <MaterialCommunityIcons
                              name="headphones"
                              size={22}
                              color={'white'}
                            />
                            <Text style={styles.exploreText}>Movies</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                ShowComment: true,
                                animateModal: true,
                                category: 'Books',
                              })
                            }
                            style={[
                              styles.singleExplore,
                              {
                                marginLeft: '7%',
                                marginRight: 'auto',
                                backgroundColor: '#984DE6',
                              },
                            ]}>
                            <MaterialCommunityIcons
                              name="book-open-variant"
                              size={22}
                              color={'white'}
                            />
                            <Text style={styles.exploreText}>Books</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({
                                ShowComment: true,
                                animateModal: true,
                                category: 'Others',
                              })
                            }
                            style={[
                              styles.singleExplore,
                              {
                                marginLeft: '7%',
                                marginRight: 'auto',
                                backgroundColor: '#6C7C90',
                              },
                            ]}>
                            <Ionicons
                              name="tablet-landscape-outline"
                              size={22}
                              color={'white'}
                            />
                            <Text style={styles.exploreText}>Others</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                }
                onClose={() => {
                  this.setState({ShowComment: false});
                  this.setState({animateModal: false});
                }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F6F3F5',
    width: '70%',
    height: 45,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  container: {
    margin: 18,
    flex: 1,
    backgroundColor: 'white',
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
    width: '100%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: 'orange',
  },
  categBtn: {
    width: '60%',
    flexDirection: 'row',
    borderRadius: 25,
    height: 50,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#F6F3F5',
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
  Modal: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: '15%',
    backgroundColor: 'white',
  },
  modalInnerBtn: {
    width: '13%',
    borderRadius: 25,
    height: '6%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',
    backgroundColor: 'orange',
  },
  containerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreSection: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  exploreHeader: {
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 18,
  },
  exploreContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  singleExplore: {
    height: 80,
    width: '28%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: 'white',
    margin: 1,
    marginBottom: 20,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  exploreText: {
    fontSize: 13,
    color: 'white',
  },
  buttons: {
    width: 400,
    height: 150,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#F6F3F5',
    borderRadius: 25,
    padding: 12,
    width: '100%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
  },
});

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: 'red',
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: 'red',
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });
