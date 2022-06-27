import React, {Component} from 'react';
import {Appbar} from 'react-native-paper';
import {
  View,
  StyleSheet,
  StatusBar,
  SectionList,
  FlatList,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';

const percent = 10;
export default class JSX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: [
        {id: 101, name: 'Ali', rollNo: 9, collegeName: 'PG'},
        {id: 102, name: 'Hamza', rollNo: 3, collegeName: 'GC'},
        {id: 103, name: 'Ahmed', rollNo: 20, collegeName: 'Imperior'},
        {id: 104, name: 'Fahad', rollNo: 2, collegeName: 'I.E.T'},
        {id: 105, name: 'Faisal', rollNo: 50, collegeName: 'FC'},
      ],
    };
  }

  render() {
    const {stock} = this.state;
    return (
      <View>
        <FlatList
          data={stock}
          renderItem={({item, index}) => (
            <View style={styles.container}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    marginBottom: '1%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'red',
                      width: '35%',
                      height: 111,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        marginTop: '30%',
                        textAlign: 'center',
                        fontSize: 19,
                      }}>
                      {item.rollNo}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#FF69B4',
                      width: '64%',
                      height: 111,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        marginTop: '20%',
                        textAlign: 'center',
                        fontSize: 19,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginBottom: '1%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#800080',
                    width: Dimensions.get('window').width,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      marginTop: '30%',
                      textAlign: 'center',
                      fontSize: 19,
                    }}>
                    {item.rollNo}
                  </Text>
                </View>

                <View
                  style={{
                    marginBottom: '1%',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <View
                    style={{
                      marginRight: 14,
                      backgroundColor: '#9400D3',
                      width: '35%',
                      height: 111,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        marginTop: '30%',
                        textAlign: 'center',
                        fontSize: 19,
                      }}>
                      {item.collegeName}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginRight: 14,
                      backgroundColor: '#9932CC',
                      width: '35%',
                      height: 111,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        marginTop: '30%',
                        textAlign: 'center',
                        fontSize: 19,
                      }}>
                      {' '}
                      {item.name}
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
                      backgroundColor: '#87CEFA',
                      width: '35%',
                      height: 111,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        marginTop: '30%',
                        textAlign: 'center',
                        fontSize: 19,
                      }}>
                      {item.rollNo}
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
                    marginBottom: '1%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#87CEFA',
                    width: Dimensions.get('window').width,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      marginTop: '30%',
                      textAlign: 'center',
                      fontSize: 19,
                    }}>
                    {item.rollNo}
                  </Text>
                </View>
                <View
                  style={{
                    marginBottom: '1%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#ADD8E6',
                      width: '64%',
                      height: 111,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        marginTop: '20%',
                        textAlign: 'center',
                        fontSize: 19,
                      }}>
                      {item.collegeName}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#9b7653',
                      width: '35%',
                      height: 111,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        marginTop: '50%',
                        textAlign: 'center',
                        fontSize: 19,
                      }}>
                      {item.rollNo}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'blue',
  },

  container: {
    flex: 1,
  },

  loginText: {
    alignItems: 'center',
  },
});
