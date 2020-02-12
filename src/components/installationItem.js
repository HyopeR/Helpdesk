import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { selectInstallation, deselectInstallation, fetchInstallation } from '../actions';
import { Card } from './common';

class InstallationItem extends Component {

  onPressed() {
    const { installation, selected } = this.props;
    selected
    ? this.props.deselectInstallation()
    : this.props.selectInstallation(installation)
  }

  installationDelete = () => {
    const { installation, selected } = this.props;
    const installationId = installation.InstallationId;
    const sendUrl = "http://192.168.1.105:8080/api/installation/delete/"+installationId;
    fetch(sendUrl, {
            method: 'DELETE',
            header: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
          .then((response) => response.json())
            .then((responseJson) => {
                alert("Installation başarılı şekilde silindi.");
                this.props.fetchInstallation();
              })
              .catch((error) => {
                console.error(error);
              });
      }

  render() {
    const { installation, selected } = this.props;

    const descriptionField = selected ? (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#d3d4d9', paddingTop: 10, paddingBottom: 10}}>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Hotel Name:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.Name}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Install Name:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.InstallName}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Installation Path:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.InstallationPath}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Version:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.Version}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Product Name:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.ProductName}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Installation Status:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.Status}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Number License:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.NumberOfLicense}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Additional Note:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.AdditionalNotes}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Expire Date:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.ExpireDate}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Contract Date:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.InsContractDate}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Created Date:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.InsCreatedDate}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Planned Date:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.PlannedDate}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.connectionDescription}>Installation Date:</Text>
          <Text style = {styles.connectionDescription}>{this.props.installation.InstallationDate}</Text>
        </View>

        <View style={styles.descriptionRowArea}>

        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.buttonElements}
            onPress = {() => Actions.editInstallation()}
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
            onPress = {this.installationDelete}
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
            <Text style = {styles.customerName}>{installation.InstallName} ({installation.Name})</Text>
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
  const selected = state.selectedInstallation && state.selectedInstallation.InstallationId === props.installation.InstallationId;
  return {
    selected
  }
}

export default connect(mapStateToProps,
  {selectInstallation, deselectInstallation, fetchInstallation})(InstallationItem);
