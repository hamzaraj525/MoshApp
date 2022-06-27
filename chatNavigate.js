import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Home from './Home.js';
import chat from './chat.js';

export default class chatNavigate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            gettingStarted
            name="chat"
            component={chat}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
