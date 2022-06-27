import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props) {
  const paperTheme = useTheme();

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image source={require('./images/nurse.png')} size={50} />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Scarlet j </Title>
                <Caption style={styles.caption}>@scarlet_j</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home" color={color} size={size} />
              )}
              label="Home"
              children={HomeStack}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="heart" color={color} size={size} />
              )}
              label="FireBaseRealTime"
              onPress={() => {
                props.navigation.navigate('FireBaseRealTime');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="menu" color={color} size={size} />
              )}
              label="FirestoreReadData"
              onPress={() => {
                props.navigation.navigate('FirestoreReadData');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="menu" color={color} size={size} />
              )}
              label="Products"
              onPress={() => {
                props.navigation.navigate('Products');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="menu" color={color} size={size} />
              )}
              label="FireStore"
              onPress={() => {
                props.navigation.navigate('FireStore');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            SignOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
