import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';
import database from '@react-native-firebase/database';
import Swipeout from 'react-native-swipeout';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Card, Title, Button, Paragraph, Searchbar} from 'react-native-paper';
export default class HostApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLoading: true,
      close: false,
      refreshing: false,
      seed: 1,
      colorId: 0,
      isFiltered: false,
      fliterList: [],
    };
  }
  componentDidMount() {
    this.makeRemoteRequest();

    setTimeout(() => {
      this.setState({isLoading: false});
    }, 2000);
  }
  makeRemoteRequest = () => {
    this.setState({refreshing: true});
    var newArray = [];

    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        console.log('New Array Push is =', newArray);
        this.setState({list: newArray});
        this.setState({refreshing: false});
      });
  };
  //   notifyHost = (item, index) => {
  //     PushNotification.cancelAllLocalNotifications();
  //     PushNotification.localNotification({
  //       channelId: 'test-channel',
  //       title: 'Host App',
  //       message: 'A New Patient is weak In the List ',
  //       color: 'blue',
  //     });
  //   };
  //   handleNotification = (item, index) => {
  //     PushNotification.localNotification({
  //       channelId: 'test-channel',
  //       title: 'Host App',
  //       message: 'A New Patient is Added In the List ',
  //       color: 'blue',
  //     });
  //   };
  //   note = (item, index) => {
  //     PushNotification.localNotification({
  //       channelId: 'test-channel',
  //       title: 'Host App',
  //       message: 'A Patient is Deleted In the List ',
  //       color: 'blue',
  //     });
  //   };
  deleteUser = Item => {
    // database()
    //   .ref('users/' + Item.key)
    //   .remove()
    //   .then(() => {
    //     // this.note();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    ///
    firestore()
      .collection('users')
      .doc('' + Item.key)
      .delete()
      .then(() => {
        alert('User deleted!');
      });
  };

  actionOnRow = item => {
    var Title = item.title;
    var Price = item.price;
    var Description = item.description;
    var Contact = item.contact;
    var DDate = item.date;
    var image = item.image;

    // alert(Name + '\n' + Gender + '\n' + contact + '\n' + Age);
    this.props.navigation.navigate('itemsDetail', {
      Title,
      Price,
      DDate,
      image,
      Contact,
    });
  };

  handleRefresh = () => {
    this.setState(
      {page: 1, refreshing: true, seed: this.state.seed + 1},
      () => {
        this.makeRemoteRequest();
      },
    );
  };
  cameraFilter = () => {
    const {list} = this.state;
    let filterArray = list.filter((val, i) => {
      if (val.Category == 'camera') {
        return val;
      }
    });
    this.setState({list: filterArray});
  };
  lampFilter = () => {
    const {list} = this.state;
    let filterArray = list.filter((val, i) => {
      if (val.Category == 'lamp') {
        return val;
      }
    });
    this.setState({list: filterArray});
  };
  onPress = id => {
    this.setState({colorId: id});
  };
  renderUser = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.actionOnRow(item)}
          style={{
            padding: 11,

            // margin: 11,
            // backgroundColor: 'pink',
            // flex: 1,
            // justifyContent: 'space-between',
            // flexDirection: 'row',
            // alignItems: 'center',
          }}>
          <Card>
            <Card.Cover source={{uri: item.image}} />
            <Card.Title title={item.Title} subtitle={item.Price} />
            <Card.Actions></Card.Actions>
          </Card>
          {/* <Image style={styles.image} source={{uri: item.img}} />
        <Text
          style={{
            fontSize: 18,
          }}>
          {item.Name}
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}>
          {item.Age}{' '}
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}>
          {item.Gender}{' '}
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}>
          {item.Contact}{' '}
        </Text>
        <TouchableHighlight onPress={() => this.deleteUser(item)}>
          <Image
            style={[styles.loginBtn]}
            source={require('./images/clss.png')}
          />
        </TouchableHighlight> */}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {list} = this.state;
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{flex: 1}}
              contentContainerStyle={{padding: 11, paddingBottom: 22}}>
              <SkeletonPlaceholder>
                <View style={{width: '150%', height: 180, borderRadius: 4}} />
                <View
                  style={{
                    width: '40%',
                    height: 20,
                    borderRadius: 4,
                    marginTop: 15,
                  }}
                />
                <View
                  style={{
                    width: '20%',
                    height: 15,
                    borderRadius: 4,
                    marginTop: 15,
                  }}
                />
                <View
                  style={{
                    width: '120%',
                    height: 180,
                    borderRadius: 4,
                    marginTop: 23,
                  }}
                />
                <View
                  style={{
                    width: '40%',
                    height: 25,
                    borderRadius: 4,
                    marginTop: 15,
                  }}
                />
                <View
                  style={{
                    width: '20%',
                    height: 15,
                    borderRadius: 4,
                    marginTop: 15,
                  }}
                />
              </SkeletonPlaceholder>
            </ScrollView>
          </View>
        ) : (
          <View>
            <ScrollView
              contentContainerStyle={{paddingRight: '227%'}}
              horizontal
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                color={this.state.btnColor}
                style={this.state.colorId === 1 ? styles.red : styles.button}
                onPress={() => {
                  this.lampFilter();
                  this.onPress(1);
                }}>
                <MaterialCommunityIcons
                  name="lamp"
                  size={22}
                  color={'orange'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                color={this.state.btnColor}
                style={this.state.colorId === 3 ? styles.red : styles.button}
                onPress={() => {
                  this.lampFilter();
                  this.onPress(3);
                }}>
                <MaterialCommunityIcons name="car" size={22} color={'red'} />
              </TouchableOpacity>
              <TouchableOpacity
                color={this.state.btnColor}
                style={this.state.colorId === 4 ? styles.red : styles.button}
                onPress={() => {
                  this.cameraFilter();
                  this.onPress(4);
                }}>
                <Fontisto name="camera" size={19} color={'red'} />
              </TouchableOpacity>
              <TouchableOpacity
                color={this.state.btnColor}
                style={this.state.colorId === 5 ? styles.red : styles.button}
                onPress={() => {
                  this.lampFilter();
                  this.onPress(5);
                }}>
                <SimpleLineIcons
                  name="game-controller"
                  size={22}
                  color={'red'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                color={this.state.btnColor}
                style={this.state.colorId === 6 ? styles.red : styles.button}
                onPress={() => {
                  this.lampFilter();

                  this.onPress(6);
                }}>
                <MaterialCommunityIcons
                  name="shoe-heel"
                  size={22}
                  color={'red'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                color={this.state.btnColor}
                style={this.state.colorId === 7 ? styles.red : styles.button}
                onPress={() => {
                  this.lampFilter();

                  this.onPress(7);
                }}>
                <MaterialIcons
                  name="sports-basketball"
                  size={22}
                  color={'red'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                color={this.state.btnColor}
                style={this.state.colorId === 8 ? styles.red : styles.button}
                onPress={() => {
                  this.lampFilter();

                  this.onPress(8);
                }}>
                <MaterialCommunityIcons
                  name="headphones"
                  size={22}
                  color={'red'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                color={this.state.btnColor}
                style={this.state.colorId === 9 ? styles.red : styles.button}
                onPress={() => {
                  this.lampFilter();

                  this.onPress(9);
                }}>
                <MaterialCommunityIcons
                  name="book-open-variant"
                  size={22}
                  color={'red'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                color={this.state.btnColor}
                style={this.state.colorId === 10 ? styles.red : styles.button}
                onPress={() => {
                  this.lampFilter();

                  this.onPress(10);
                }}>
                <Ionicons
                  name="tablet-landscape-outline"
                  size={22}
                  color={'red'}
                />
              </TouchableOpacity>
            </ScrollView>
            <FlatList
              data={this.state.list}
              keyExtractor={item => item.key}
              renderItem={this.renderUser}
              extraData={this.state.list}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  red: {
    height: 38,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: 'grey',
    margin: 5,
    marginBottom: 20,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 38,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: 'white',
    margin: 5,
    marginBottom: 20,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    padding: 8,
  },
  container: {
    flex: 1,
    padding: 11,
  },
  loginBtn: {
    width: '22%',
    borderRadius: 25,
    height: '16%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: 'orange',
  },
  item: {
    flexDirection: 'row',
    marginBottom: '2%',
    borderRadius: 22,
    backgroundColor: '#fff',
  },
  image: {
    width: 40,
    height: 40,
  },
  singleExplore: {
    height: 35,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: 'white',
    margin: 5,
    marginBottom: 20,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreText: {
    fontSize: 13,
    color: 'white',
  },
});
