import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

import { MyButtonSquare } from './common';


class AddConnectionType extends Component {

  constructor(props) {
    super(props);
    this.state = {
      con_type_name: 1,
    };
  }

  connectionTypeRegister = () => {
    const { con_type_name } = this.state;

    fetch('http://192.168.1.105:8080/api/typeconnection/add', {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            con_type_name: con_type_name,
          })
      })
      .then((response) => response.json())
        .then((responseJson) => {
            alert("Connection Type kaydı tamamlandı.");
          })
          .catch((error) => {
            console.error(error);
          });
  }

  render() {
    return (
      <View style={styles.formBack}>
        <View style={styles.formContent}>
        <TextInput
          placeholder='Connection Type Name'
          placeholderTextColor='#666666'
          style={styles.formInput}
          onChangeText = {con_type_name => this.setState({con_type_name})}
        />
        </View>

        <MyButtonSquare
          title = "Save Connection Type"
          onPress = {this.connectionTypeRegister}
          color = "#c6303d"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  formBack: {
  },
  formContent: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  formInput: {
    height: 50,
    width: '100%',
  },
});

export default (AddConnectionType);
