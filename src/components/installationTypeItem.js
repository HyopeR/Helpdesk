import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput
} from 'react-native';

import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { selectInstallationType, deselectInstallationType, fetchInstallationType } from '../actions';
import { Card, MyButton } from './common';

class InstallationTypeItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ins_type_name: '',
    };
  }

  onPressed() {
    const { installationType, selected } = this.props;
    selected
    ? this.props.deselectInstallationType()
    : this.props.selectInstallationType(installationType)
  }

  installationTypeUpdate = () => {
    const { installationType, selected } = this.props;
    const installationTypeId = installationType.InstallationTypeId;
    const sendUrl = "http://192.168.1.105:8080/api/typeinstallation/update/" + installationTypeId;

    const { ins_type_name } = this.state;

    fetch(sendUrl, {
        method: 'PUT',
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
            alert("Installation Type güncellendi.");
            this.props.fetchInstallationType();
          })
          .catch((error) => {
            console.error(error);
          });
  }

  installationTypeDelete = () => {
    const { installationType, selected } = this.props;
    const installationTypeId = installationType.InstallationTypeId;
    const sendUrl = "http://192.168.1.105:8080/api/typeinstallation/delete/" + installationTypeId;
    fetch(sendUrl, {
            method: 'DELETE',
            header: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
          .then((response) => response.json())
            .then((responseJson) => {
                alert("Installation Type başarılı şekilde silindi.");
                Actions.seeInstallationType();
              })
              .catch((error) => {
                console.error(error);
              });
      }

  render() {
    const { installationType, selected } = this.props;

    const descriptionField = selected ? (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#d3d4d9', paddingTop: 10, paddingBottom: 10}}>

        <View style={styles.descriptionRowArea}>
          <Text style = {{height:50, lineHeight:50}}>Installation Type:</Text>
          <TextInput
            placeholder={this.props.installationType.InstallationTypeName}
            placeholderTextColor='#666666'
            style={{marginLeft:10, height:50}}
            onChangeText = {ins_type_name => this.setState({ins_type_name})}
          />
        </View>

        <View style={styles.descriptionRowArea}>

        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.buttonElements}
            onPress = {this.installationTypeUpdate}
            underlayColor="#c6303d">
            <View style={{flexDirection: 'row'}}>
              <Icon name="create" style={styles.buttonIcon} />
              <Text style={{fontSize: 18, color: '#000'}}>Update</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.buttonElements}
            onPress = {this.installationTypeDelete}
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
            <View style={{width: '90%', flexDirection: 'column'}}>
              <Text style = {styles.customerName}>{installationType.InstallationTypeName}</Text>
            </View>
            <View style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="arrow-dropdown" style={{ fontSize:24, color: '#000', height: 24, width: 24 }} />
            </View>
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
  const selected = state.selectedInstallationType && state.selectedInstallationType.InstallationTypeId === props.installationType.InstallationTypeId;
  return {
    selected
  }
}

export default connect(mapStateToProps, {selectInstallationType, deselectInstallationType, fetchInstallationType})(InstallationTypeItem);
