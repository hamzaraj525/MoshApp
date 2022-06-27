import React, {Component} from 'react';
import {View, StyleSheet, Text, SectionList, FlatList} from 'react-native';
import database from '@react-native-firebase/database';

export default class navigate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
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

  render() {
    return (
      <View style={{}}>
        <Text style={styles.store}>FireBase Flat List</Text>
        <View
          style={{
            padding: 11,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}> Name </Text>
          <Text style={{fontWeight: 'bold', fontSize: 20}}> Gender </Text>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Age </Text>
        </View>
        <FlatList
          data={this.state.list}
          renderItem={({item, index}) => (
            <View style={styles.container}>
              <View style={styles.flatListStyle}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text> {item.name} </Text>
                  <Text> {item.gender} </Text>
                  <Text> {item.age} </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.key}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  del: {
    width: '20%',
    borderRadius: 15,
    height: '122%',
    backgroundColor: '#FF1493',
  },

  header: {
    backgroundColor: 'blue',
  },
  icon: {
    width: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    padding: 11,
  },
  flatListStyle: {
    backgroundColor: 'orange',
    alignItems: 'center',
    padding: 8,
    marginBottom: 17,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  store: {
    fontSize: 32,
    alignItems: 'center',
  },
  loginText: {
    alignItems: 'center',
  },
});
