import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import database from '@react-native-firebase/database';
import Swipeout from 'react-native-swipeout';

export default class swipeFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      close: false,
    };
  }
  item = null;
  componentDidMount() {
    database()
      .ref()
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          console.log(child.val());
          li.push({
            key: child.key,
            name: child.val().name,
            age: child.val().age,
            gender: child.val().gender,
          });
        });
        this.setState({list: li});
      });
  }
  _renderButtonDelete = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={items => {
          this.setState({
            list: [...this.state.list.filter(e => e.key != this.item.key)],
          });
          this.item = null;
        }}>
        <Text style={{fontWeight: 'bold'}}>Discharge</Text>
      </TouchableOpacity>
    );
  };

  _renderButtonClose = () => {
    return (
      <TouchableOpacity
        style={[styles.button, {backgroundColor: 'red'}]}
        onPress={() => {
          this.setState({
            close: !this.state.close,
          });
        }}>
        <Text style={{fontWeight: 'bold'}}>Close</Text>
      </TouchableOpacity>
    );
  };

  swipeoutBtns = [
    {
      // text: 'Delete',
      backgroundColor: 'white',
      component: this._renderButtonDelete(),
      // onPress: () => {
      //   Alert.alert('Delete')
      // }
    },
    {
      // text: 'Close',
      component: this._renderButtonClose(),
      backgroundColor: 'white',
      // onPress: () => {
      //   Alert.alert('Close')
      // }
    },
  ];
  actionOnRow = item => {
    var name = item.name;
    var age = item.age;
    var gender = item.gender;
    alert(name + '\n' + age + '\n' + gender);
  };
  renderItem = ({item, index}) => {
    return (
      <Swipeout
        close={this.state.close}
        onOpen={() => {
          this.item = item;
        }}
        style={{padding: 4, backgroundColor: 'white'}}
        autoClose
        right={this.swipeoutBtns}>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => this.actionOnRow(item)}
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text> {item.age} </Text>
            <Text> {item.name} </Text>
            <Text> {item.gender} </Text>
          </TouchableOpacity>
        </View>
      </Swipeout>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.list}
          keyExtractor={item => item.key}
          renderItem={this.renderItem}
          extraData={this.state.list}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 8,
  },
  item: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 17,
    padding: 8,
    backgroundColor: 'pink',
  },
  img: {
    width: 80,
    height: 80,
  },
  button: {
    marginBottom: 17,
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 11.5,
  },
});
