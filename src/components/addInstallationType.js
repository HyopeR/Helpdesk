import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

import { MyButtonSquare } from './common';


class AddInstallationType extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ins_type_name: 1,
    };
  }

  insTypeRegister = () => {
    const { ins_type_name } = this.state;

    fetch('http://192.168.1.105:8080/api/typeinstallation/add', {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            ins_type_name: ins_type_name,
          })
      })
      .then((response) => response.json())
        .then((responseJson) => {
            alert("Installation type kaydı tamamlandı.");
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
          placeholder='Installation Type Name'
          placeholderTextColor='#666666'
          style={styles.formInput}
          onChangeText = {ins_type_name => this.setState({ins_type_name})}
        />
        </View>

        <MyButtonSquare
          title = "Save Installation Type"
          onPress = {this.insTypeRegister}
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

export default (AddInstallationType);
