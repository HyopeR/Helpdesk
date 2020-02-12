import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Spinner } from 'native-base';
import { fetchCustomer } from '../actions';
class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadState: 0,
      loadStop: false,
    };
  }

  componentDidMount() {
    this.load();
  }

  load(){
    setTimeout(this.trade, 750)
  }

  trade() {
    Actions.menu();
  }

  render() {

    return (
      <View style={styles.formBack}>
      <StatusBar hidden />
      <View style={{width:'90%', alignItems: 'center'}}>

      {
        this.state.loadStop
          ?
          null
          :
          <View style={{width:'100%', height: 150, alignItems: 'center'}}>
            <Image source={require('./assets/helpdesk_logo.png')} style={{width:'90%', maxWidth: 300, height: 80, maxHeight: 125}}></Image>
            <Spinner color='#be1221' />
          </View>
      }
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  formBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default (WelcomeScreen);
