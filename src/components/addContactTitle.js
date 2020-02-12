import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

import { MyButtonSquare } from './common';


class AddContactTitle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title_name: 1,
    };
  }

  contactTitleRegister = () => {
    const { title_name } = this.state;

    fetch('http://192.168.1.105:8080/api/title/add', {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title_name: title_name,
          })
      })
      .then((response) => response.json())
        .then((responseJson) => {
            alert("Contact title kaydı tamamlandı.");
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
          placeholder='Contact Title Name'
          placeholderTextColor='#666666'
          style={styles.formInput}
          onChangeText = {title_name => this.setState({title_name})}
        />
        </View>

        <MyButtonSquare
          title = "Save Contact Title"
          onPress = {this.contactTitleRegister}
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

export default (AddContactTitle);
