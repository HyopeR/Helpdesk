import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

import { MyButtonSquare } from './common';


class AddInstallationStatus extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ins_status_name: 1,
    };
  }

  insStatusRegister = () => {
    const { ins_status_name } = this.state;

    fetch('http://192.168.1.105:8080/api/status/installation/add', {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            ins_status_name: ins_status_name,
          })
      })
      .then((response) => response.json())
        .then((responseJson) => {
            alert("Installation status kaydı tamamlandı.");
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
          placeholder='Installation Status Name'
          placeholderTextColor='#666666'
          style={styles.formInput}
          onChangeText = {ins_status_name => this.setState({ins_status_name})}
        />
        </View>

        <MyButtonSquare
          title = "Save Installation Status"
          onPress = {this.insStatusRegister}
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

export default (AddInstallationStatus);
