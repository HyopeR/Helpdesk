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
import { selectConnection, deselectConnection, fetchConnection } from '../actions';
import { Card } from './common';

class ConnectionItem extends Component {

  onPressed() {
    const { connection, selected } = this.props;
    selected
    ? this.props.deselectConnection()
    : this.props.selectConnection(connection)
  }

  connectionDelete = () => {
    const { connection, selected } = this.props;
    const connectionId = connection.CustomerConnectionId;
    const sendUrl = "http://192.168.1.105:8080/api/connection/delete/"+connectionId;
    fetch(sendUrl, {
            method: 'DELETE',
            header: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
          .then((response) => response.json())
            .then((responseJson) => {
                alert("Bağlantı başarılı şekilde silindi.");
                this.props.fetchConnection();
              })
              .catch((error) => {
                console.error(error);
              });
      }

  render() {
    const { connection, selected } = this.props;

    const descriptionField = selected ? (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#d3d4d9', paddingTop: 10, paddingBottom: 10}}>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Name:</Text>
          <Text style = {styles.connectionDescription}>{this.props.connection.ConnectionName}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Type Name:</Text>
          <Text style = {styles.connectionDescription}>{this.props.connection.ConnectionTypeName}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Ip:</Text>
          <Text style = {styles.connectionDescription}>{this.props.connection.IP}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Port:</Text>
          <Text style = {styles.connectionDescription}>{this.props.connection.Port}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Username:</Text>
          <Text style = {styles.connectionDescription}>{this.props.connection.Username}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Password:</Text>
          <Text style = {styles.connectionDescription}>{this.props.connection.Password}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Created Date:</Text>
          <Text style = {styles.connectionDescription}>{this.props.connection.ConnectionsCreatedDate}</Text>
        </View>

        <View style={styles.descriptionRowArea}>

        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.buttonElements}
            onPress = {() => Actions.editConnection()}
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
            onPress = {this.connectionDelete}
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
            <Text style = {styles.customerName}>{connection.Name} ({connection.ConnectionName})</Text>
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
  const selected = state.selectedConnection && state.selectedConnection.CustomerConnectionId === props.connection.CustomerConnectionId;
  return {
    selected
  }
}

export default connect(mapStateToProps,
  {selectConnection, deselectConnection, fetchConnection})(ConnectionItem);
