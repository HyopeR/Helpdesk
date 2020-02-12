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
import { selectCustomer, deselectCustomer, fetchCustomer } from '../actions';
import { Card, MyButton } from './common';

class CustomerItem extends Component {

  onPressed() {
    const { customer, selected } = this.props;
    selected
    ? this.props.deselectCustomer()
    : this.props.selectCustomer(customer)
  }

  customerDelete = () => {
    const { customer, selected } = this.props;
    const customerId = customer.CustomerId;
    const sendUrl = "http://192.168.1.105:8080/api/customer/delete/"+customerId;
    fetch(sendUrl, {
            method: 'DELETE',
            header: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
          .then((response) => response.json())
            .then((responseJson) => {
                alert("Müşteri başarılı şekilde silindi.");
                this.props.fetchCustomer('nullString');
              })
              .catch((error) => {
                console.error(error);
              });
      }

  render() {
    const { customer, selected } = this.props;

    const descriptionField = selected ? (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#d3d4d9', paddingTop: 10, paddingBottom: 10}}>
        <View style={styles.descriptionRowArea}>
          <Text style = {styles.customerDescription}>Number Room:</Text>
          <Text style = {styles.customerDescription}>{this.props.customer.Rooms}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.customerDescription}>Address:</Text>
          <Text style = {styles.customerDescription}>{this.props.customer.Address}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.customerDescription}>Telephone:</Text>
          <Text style = {styles.customerDescription}>{this.props.customer.City}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.customerDescription}>Country:</Text>
          <Text style = {styles.customerDescription}>{this.props.customer.Telephone}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.customerDescription}>Fax:</Text>
          <Text style = {styles.customerDescription}>{this.props.customer.Fax}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.customerDescription}>Url:</Text>
          <Text style = {styles.customerDescription}>{this.props.customer.Url}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.customerDescription}>Country:</Text>
          <Text style = {styles.customerDescription}>{this.props.customer.Country}</Text>
        </View>

        <View style={styles.descriptionRowArea}>
          <Text style = {styles.customerDescription}>Contract Date:</Text>
          <Text style = {styles.customerDescription}>{this.props.customer.ContractDate}</Text>
        </View>

        <View style={styles.descriptionRowArea}>

        <View style={styles.buttonWrapperTwo}>
          <TouchableHighlight
            style={styles.buttonElements}
            onPress = {() => Actions.customerConnection()}
            underlayColor="#c6303d">
            <Text style={styles.buttonText}>Connection</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonWrapperTwo}>
          <TouchableHighlight
            style={styles.buttonElements}
            onPress = {() => Actions.customerContact()}
            underlayColor="#c6303d">
            <Text style={styles.buttonText}>Contact</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonWrapperTwo}>
          <TouchableHighlight
            style={styles.buttonElements}
            onPress = {() => Actions.customerInstallation()}
            underlayColor="#c6303d">
            <Text style={styles.buttonText}>Installation</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.buttonElements}
            onPress = {() => Actions.editCustomer()}
            underlayColor="#c6303d">
            <Icon name="create" style={styles.buttonIcon} />
          </TouchableHighlight>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            style={styles.buttonElements}
            onPress = {this.customerDelete}
            underlayColor='#c6303d'>
            <Icon name="trash" style={styles.buttonIcon} />
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
            <Text style = {styles.customerName}>{customer.Name}</Text>
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
  customerDescription: {
    width: '50%',
    marginBottom: 5,
    fontSize: 13,
    textAlign: 'left',
  },
  descriptionRowArea: {
    width: '90%',
    flexDirection: 'row',
  },
  buttonWrapperTwo: {
    width: '22%',
    backgroundColor: '#be1221',
    marginTop: 10,
    borderRadius: 35,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 2,
  },
  buttonWrapper: {
    width: '14%',
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
    fontSize: 8,
    color: '#000',
    textAlign: 'center',
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
  const selected = state.selectedCustomer && state.selectedCustomer.CustomerId === props.customer.CustomerId;
  return {
    selected
  }
}

export default connect(mapStateToProps,
  {selectCustomer, deselectCustomer, fetchCustomer})(CustomerItem);
