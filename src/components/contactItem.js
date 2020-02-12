import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { selectContact, deselectContact, fetchContact } from '../actions';
import { Card, MyButton } from './common';

class ContactItem extends Component {

  onPressed() {
    const { contact, selected } = this.props;
    selected
    ? this.props.deselectContact()
    : this.props.selectContact(contact)
  }

  contactDelete = () => {
    const { contact, selected } = this.props;
    const contactId = contact.CustomerContactId;
    const sendUrl = "http://192.168.1.105:8080/api/contact/delete/"+contactId;
    fetch(sendUrl, {
            method: 'DELETE',
            header: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
          .then((response) => response.json())
            .then((responseJson) => {
                alert("Contact başarılı şekilde silindi.");
                this.props.fetchContact();
              })
              .catch((error) => {
                console.error(error);
              });
      }

  render() {
    const { contact, selected } = this.props;

    const descriptionField = selected ? (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#d3d4d9', paddingTop: 10, paddingBottom: 10}}>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>First Name:</Text>
          <Text style = {styles.connectionDescription}>{this.props.contact.Firstname}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Last Name:</Text>
          <Text style = {styles.connectionDescription}>{this.props.contact.Lastname}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Gsm:</Text>
          <Text style = {styles.connectionDescription}>{this.props.contact.GSM}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Extension:</Text>
          <Text style = {styles.connectionDescription}>{this.props.contact.Extension}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Email:</Text>
          <Text style = {styles.connectionDescription}>{this.props.contact.Email}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Contact Date:</Text>
          <Text style = {styles.connectionDescription}>{this.props.contact.ContactCreatedDate}</Text>
        </View>

        <View style={styles.descriptionRowArea}>

        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.buttonElements}
            onPress = {() => Actions.editContact()}
            underlayColor="#c6303d">
            <View style={{flexDirection: 'row'}}>
              <Icon name="create" style={styles.buttonIcon} />
              <Text style={{fontSize: 18, color: '#000'}}>Edit</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.buttonElements}
            onPress = {this.contactDelete}
            underlayColor="#c6303d">
            <View style={{flexDirection: 'row'}}>
              <Icon name="trash" style={styles.buttonIcon} />
              <Text style={{fontSize: 18, color: '#000'}}>Delete</Text>
            </View>
          </TouchableHighlight>
        </View>

        </View>

      </View>
    ) : null

    return (
      <View>
      <TouchableOpacity onPress={this.onPressed.bind(this)}>
        <Card>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style = {styles.customerName}>{contact.Name} ({contact.TitleName})</Text>
            <Icon name="arrow-dropdown" style={{ fontSize:24, color: '#000', height: 24, width: 24 }} />
          </View>
        </Card>
      </TouchableOpacity>
      {descriptionField}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  customerName: {
    fontSize: 17,
    color: '#000000',
    marginLeft: 10,
    width: '90%',
  },
  connectionDescription: {
    width: '50%',
    marginBottom: 5,
    fontSize: 13,
    textAlign: 'left',
  },
  descriptionRowArea: {
    width: '90%',
    flexDirection: 'row',
  },
  buttonWrapper: {
    width: '50%',
    backgroundColor: '#be1221',
    marginTop: 10,
    borderRadius: 35,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 2,
  },
  buttonElements: {
    backgroundColor: '#be1221',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  buttonText: {
    fontSize: 17,
    color: '#000',
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    color: '#000',
    height: 24,
    width: 24,
    textAlign: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = (state, props) => {
  const selected = state.selectedContact && state.selectedContact.CustomerContactId === props.contact.CustomerContactId;
  return {
    selected
  }
}

export default connect(mapStateToProps, {selectContact, deselectContact, fetchContact})(ContactItem);
