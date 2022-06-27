import React, {Component} from 'react';
import {View, StyleSheet, Text, SectionList, FlatList} from 'react-native';

import LottieView from 'lottie-react-native';
import AnimatedLoader from 'react-native-animated-loader';
export default class splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    setTimeout(() => {
      this.props.navigation.navigate('FireBaseLogin');
    }, 3200);
  }
  render() {
    return (
      <View styles={{flex: 1}}>
        {this.state.isLoading ? (
          <View style={styles.container}>
            <AnimatedLoader
              visible={this.state.isLoading}
              overlayColor="rgba(255,255,255,0.75)"
              source={require('./asserts/check.json')}
              animationStyle={styles.lottie}
              speed={1}>
              <Text> Processing...</Text>
            </AnimatedLoader>
          </View>
        ) : null}
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
  container: {
    padding: '5%',
    flex: 1,

    alignItems: 'center',
  },
});
