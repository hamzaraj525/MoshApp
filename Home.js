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
import PushNotification from 'react-native-push-notification';
import database from '@react-native-firebase/database';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      close: false,
    };
  }
  componentDidMount() {
    database()
      .ref('/users')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          // console.log(child.val());
          li.push({
            key: child.key,
            name: child.val().name,
            date: child.val().date,
          });
        });
        this.setState({list: li});
      });
  }

  deleteUser = Item => {
    database()
      .ref('users/' + Item.key)
      .remove()
      .then(() => {
        this.note();
      })
      .catch(err => {
        console.log(err);
      });
  };

  actionOnRow = item => {
    var Name = item.name;
    // alert(Name + '\n' + Gender + '\n' + contact + '\n' + Age);
    this.props.navigation.navigate('chat', {
      Name,
    });
  };
  renderUser = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => this.actionOnRow(item)}
        style={{
          height: '22%',

          margin: 11,
          backgroundColor: 'pink',
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
          }}>
          {item.name}{' '}
        </Text>
        <TouchableHighlight onPress={() => this.deleteUser(item)}>
          <Image
            style={[styles.loginBtn]}
            source={require('./images/clss.png')}
          />
        </TouchableHighlight>
      </TouchableOpacity>
    );
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
            ChatApp
          </Text>
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
    width: 25,
    height: 25,
    marginTop: '7%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    marginBottom: '2%',
    borderRadius: 22,
    backgroundColor: '#fff',
  },
});
