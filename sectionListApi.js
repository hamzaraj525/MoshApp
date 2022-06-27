import React, {Component} from 'react';
import axios from 'react-native-axios';
import {
  View,
  Alert,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  SectionList,
  Text,
} from 'react-native';

export default class sectionListApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    this.apiCall();
  }

  apiCall() {
    axios.get(`https://jsonplaceholder.typicode.com/todos`).then(response => {
      const DATA = response.data;

      let array = [];

      for (let a of DATA) {
        temp = array.filter(x => x.userId === a.userId);
        if (temp.length > 0) {
          var obj = {
            id: a.id,
            title: a.title,
            completed: a.completed,
          };

          var existingIndex = array.indexOf(temp[0]);
          array[existingIndex].data.push(obj);
        } else {
          let item = {
            userId: a.userId,
            data: [
              {
                id: a.id,
                title: a.title,
                completed: a.completed,
              },
            ],
          };
          array.push(item);
        }
      }

      // alert(JSON.stringify(array))

      this.setState({data: array});
      console.log(response);
    });
  }

  render() {
    const {data} = this.state;
    return (
      <SectionList
        sections={data}
        renderItem={({item, section}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}>
            <Text style={styles.sectionHeader}>{item.title}</Text>
            <View
              style={{
                marginTop: '4%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  borderRadius: 4,
                  backgroundColor: '#30D5C8',
                  width: 122,
                  height: 177,
                }}>
                <Text
                  style={{
                    color: 'white',
                    marginTop: '30%',
                    textAlign: 'center',
                    fontSize: 19,
                  }}>
                  {item.id}
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 4,
                  backgroundColor: '#2ecc71',
                  width: 122,
                  height: 177,
                }}>
                <Text
                  style={{
                    color: 'white',
                    marginTop: '30%',
                    textAlign: 'center',
                    fontSize: 19,
                  }}>
                  {' '}
                  {item.id}
                </Text>
                <Text
                  style={{
                    color: 'white',

                    textAlign: 'center',
                    fontSize: 15,
                  }}></Text>
              </View>
              <View
                style={{
                  borderRadius: 4,
                  backgroundColor: '#3498DB',
                  width: 122,
                  height: 177,
                }}>
                <Text
                  style={{
                    color: 'white',
                    marginTop: '30%',
                    textAlign: 'center',
                    fontSize: 19,
                  }}>
                  {item.id}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 15,
                  }}></Text>
              </View>
            </View>

            <View
              style={{
                marginTop: '4%',
                marginBottom: '4%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  borderRadius: 4,
                  backgroundColor: '#9966cc',
                  width: 122,
                  height: 177,
                }}>
                <Text
                  style={{
                    color: 'white',
                    marginTop: '30%',
                    textAlign: 'center',
                    fontSize: 19,
                  }}>
                  {item.id}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 15,
                  }}></Text>
              </View>
              <View
                style={{
                  borderRadius: 4,
                  backgroundColor: '#989cab',
                  width: 122,
                  height: 177,
                }}>
                <Text
                  style={{
                    color: 'white',
                    marginTop: '30%',
                    textAlign: 'center',
                    fontSize: 19,
                  }}>
                  {item.id}
                </Text>
                <Text
                  style={{
                    color: 'white',

                    textAlign: 'center',
                    fontSize: 15,
                  }}></Text>
              </View>
              <View
                style={{
                  borderRadius: 4,
                  backgroundColor: 'orange',
                  width: 122,
                  height: 177,
                }}>
                <Text
                  style={{
                    color: 'white',
                    marginTop: '30%',
                    textAlign: 'center',
                    fontSize: 19,
                  }}>
                  {item.id}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 15,
                  }}></Text>
              </View>
            </View>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item, index) => index}
      />
    );
  }
}
const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: '4%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    height: 54,
    fontSize: 17,
    color: 'white',
    backgroundColor: '#636E72',
  },
});
