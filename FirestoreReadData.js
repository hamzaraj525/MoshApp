import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
export default class FirestoreReadData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      searchArray: [],
      showSearch: false,
    };
  }
  componentDidMount() {
    var newArray = [];

    firestore()
      .collection('FirestoreUsers')
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
      });
  }

  renderUser = ({item, index}) => {
    return (
      <View
        style={{
          borderRadius: 2,
          margin: 11,
          backgroundColor: 'pink',
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image style={styles.image} source={{uri: item.img}} />
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
      </View>
    );
  };
  LiveSearch = text => {
    this.state.showSearch = true;
    this.setState({showSearch: this.state.showSearch});
    var searchWord = text.trim();
    if (searchWord) {
      var tempArray = [];
      for (var x = 0; x < this.state.list.length; x++) {
        var arrayList = '' + this.state.list[x].Name;
        var index = arrayList.indexOf(searchWord);
        if (index != -1) {
          console.log('DATA Pushed');
          tempArray.push(this.state.list[x]);
        } else {
        }
      }
    } else {
      tempArray = this.state.list;
    }
    console.log('after search=', tempArray);
    this.setState({
      list: tempArray,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
            }}>
            Firestore Data{' '}
          </Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              this.props.navigation.navigate('FireBaseRealTime');
            }}>
            <Text>Go Back</Text>
          </TouchableOpacity>
          <Searchbar
            style={{
              width: '80%',
              borderRadius: 25,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            }}
            autoFocus={true}
            placeholder="Search"
            onChangeText={text => {
              this.LiveSearch(text);
            }}
          />
        </View>

        <FlatList
          style={styles.list}
          data={this.state.list}
          keyExtractor={item => item.key}
          renderItem={this.renderUser}
          extraData={this.state.list}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 8,
  },
  container: {
    marginTop: 22,
    flex: 1,
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
});
