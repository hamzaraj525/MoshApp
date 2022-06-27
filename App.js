import React, {Component} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  Text,
} from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import FireBaseRealTime from './FireBaseRealTime.js';
import FirestoreReadData from './FirestoreReadData.js';
import FireBaseLogin from './FireBaseLogin.js';
import FirebaseForm from './FirebaseForm.js';
import FireStoreReadDataa from './FireStoreReadDataa.js';
import FireStore from './FireStore.js';
import graph from './graph.js';
import splash from './splash.js';
import itemsDetail from './itemsDetail.js';
import MyListings from './MyListings.js';

import {DrawerContent} from './DrawerContent';
const TabsTop = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const ScreenDrawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
export default class App extends Component {
  render() {
    // TabStack = () => (
    //   <TabsTop.Navigator>
    //     <TabsTop.Screen
    //       name="FireStoreReadDataa"
    //       component={FireStoreReadDataa}
    //     />
    //     <TabsTop.Screen name="graph" component={graph} />
    //   </TabsTop.Navigator>
    // );
    HomeStack = () => (
      <Stack.Navigator
        initialRouteName="FireBaseLogin"
        screenOptions={{
          headerShown: true,
        }}>
        {/* <Stack.Screen
          options={{header: () => null}}
          name="splash"
          component={splash}
        /> */}
        <Stack.Screen
          options={{header: () => null}}
          name="FireBaseLogin"
          component={FireBaseLogin}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="FirebaseForm"
          component={FirebaseForm}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="FireStoreReadDataa"
          component={FireStoreReadDataa}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="itemsDetail"
          component={itemsDetail}
        />
      </Stack.Navigator>
    );

    TabScreen = () => {
      return (
        <Tab.Navigator
          screenOptions={{
            showLabel: false,
          }}>
          <Tab.Screen
            name="FireStoreReadDataa"
            component={FireStoreReadDataa}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  styles={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons name="home" size={22} color={'red'} />
                  {/* <Image
                    styles={{
                      tintColor: focused ? 'red' : 'blue',
                      width: '11%',
                      height: '11%',
                    }}
                    source={require('./images/di.png')}
                    resizeMode={'contain'}
                  /> */}
                </View>
              ),
            }}
          />

          <Tab.Screen
            name="MyListings"
            component={MyListings}
            options={{
              tabBarIcon: ({focused}) => (
                <View
                  styles={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="account"
                    size={22}
                    color={'orange'}
                  />
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      );
    };

    return (
      // <PaperProvider theme={PaperDarkTheme}>
      // <NavigationContainer theme={DarkTheme}>
      <PaperProvider>
        <NavigationContainer>
          <ScreenDrawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
              headerShown: true,
            }}>
            <ScreenDrawer.Screen
              options={{header: () => null}}
              name="Home"
              children={HomeStack}
            />
            <ScreenDrawer.Screen
              options={{header: () => null}}
              name="FireBaseRealTime"
              component={FireBaseRealTime}
            />
            <ScreenDrawer.Screen
              options={{header: () => null}}
              name="FirestoreReadData"
              component={FirestoreReadData}
            />

            <ScreenDrawer.Screen
              options={{header: () => null}}
              name="FireStore"
              component={FireStore}
            />
            <ScreenDrawer.Screen
              options={{header: () => null}}
              name="Products"
              children={TabScreen}
            />
          </ScreenDrawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.45,
    elevation: 5,
    shadowRadius: 3.5,
  },
});
