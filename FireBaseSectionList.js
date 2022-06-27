import React, {Component} from 'react';
import {View, StyleSheet, Text, SectionList, FlatList} from 'react-native';
import database from '@react-native-firebase/database';

export default class FireBaseSectionList extends Component {
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
            contact: child.val().contact,
          });
        });
        this.setState({list: li});
      });
  }

  render() {
    return (
      <View>
        <Text style={styles.store}>FireBase section List</Text>

        <FlatList
          contentContainerStyle={{paddingBottom: '16%'}}
          data={this.state.list}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
              }}>
              <Text style={styles.sectionHeader}>{item.name}</Text>

              <View style={styles.item}>
                <Text> {item.age} </Text>
                <Text> {item.gender} </Text>
                <Text> {item.contact} </Text>
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
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
    marginBottom: 17,
    padding: 8,
    backgroundColor: 'pink',
  },
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
  sectionHeader: {
    paddingTop: '4%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    height: 54,
    fontSize: 17,
    color: 'white',
    backgroundColor: 'red',
  },
});
