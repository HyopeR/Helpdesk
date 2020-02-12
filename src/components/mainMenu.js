import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Dimensions, View, Image, Text, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import DetailScreen from './detailScreen';
import RaportScreen from './raportScreen';

// const { width } = Dimensions.get('window');
// console.log(connect(AddConnection));
// console.log(SettingsScreen);

class MainMenu extends Component {

  render() {
    return (
      <AppDrawerNavigator />
    );
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
  <View style={{width:'100%', height: 100, paddingTop: 10}}>
  <Image source={require('./assets/helpdesk_logo.png')} style={{width:'100%', height: 80}}></Image>
  </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: <Icon name='home'/>,
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      drawerLabel: 'Settings',
      drawerIcon: <Icon name='settings'/>,
    }
  },
  Reports: {
    screen: RaportScreen,
    navigationOptions: {
      drawerLabel: 'Reports',
      drawerIcon: <Icon name='list-box'/>,
    }
  },
  Details: {
    screen: DetailScreen,
    navigationOptions: {
      drawerLabel: 'Details',
      drawerIcon: <Icon name='book'/>,
    }
  },
}, {
  contentComponent: CustomDrawerComponent,
  drawerBackgroundColor: '#e9e9ef',
  contentOptions: {
    activeTintColor: '#000',
  }
});

export default (MainMenu);
