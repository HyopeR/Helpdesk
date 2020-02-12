import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  BackHandler
} from 'react-native';

import { Left, Right, Icon, Body, Header } from 'native-base';
import { connect } from 'react-redux';
import { selectCustomer } from '../actions';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { TextArea, MyButton } from './common';

class EditCustomer extends Component {

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    const { selectedCustomer } = this.props;
    this.state = {
      cus_hotel_name: this.props.selectedCustomer.Name,
      cus_number_room: this.props.selectedCustomer.Rooms,
      cus_address: this.props.selectedCustomer.Address,
      cus_city: this.props.selectedCustomer.City,
      cus_telephone: this.props.selectedCustomer.Telephone,
      cus_fax: this.props.selectedCustomer.Fax,
      cus_url: this.props.selectedCustomer.Url,
      cus_country: this.props.selectedCustomer.Country,
      cus_contract_date: this.props.selectedCustomer.ContractDate,
    };
  }

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      Actions.pop();
      Actions.refresh({key: Math.random()});
      return true;
  }

  customerUpdate = () => {
    const { selectedCustomer } = this.props;

    const customerId = this.props.selectedCustomer.CustomerId;
    const sendUrl = "http://192.168.1.105:8080/api/customer/update/"+customerId;

    const { cus_hotel_name } = this.state;
    const { cus_number_room } = this.state;
    const { cus_address } = this.state;
    const { cus_city } = this.state;
    const { cus_telephone } = this.state;
    const { cus_fax } = this.state;
    const { cus_url } = this.state;
    const { cus_country } = this.state;
    const { cus_contract_date } = this.state;

    fetch(sendUrl, {
        method: 'PUT',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            cus_hotel_name: cus_hotel_name,
            cus_number_room: cus_number_room,
            cus_address: cus_address,
            cus_city: cus_city,
            cus_telephone: cus_telephone,
            cus_fax: cus_fax,
            cus_url: cus_url,
            cus_country: cus_country,
            cus_contract_date: cus_contract_date
          })
      })
      .then((response) => response.json())
        .then((responseJson) => {
            let update = {
              cus_hotel_name: cus_hotel_name,
              cus_number_room: cus_number_room,
              cus_address: cus_address,
              cus_city: cus_city,
              cus_telephone: cus_telephone,
              cus_fax: cus_fax,
              cus_url: cus_url,
              cus_country: cus_country,
              cus_contract_date: cus_contract_date
            };
            this.props.selectCustomer(update);
            alert("Müşteri güncellendi.");
          })
          .catch((error) => {
            console.error(error);
          });
  }

  render () {
    const { selectedCustomer } = this.props;

    return (
      <View style={styles.formBack}>

        <View style={styles.formOutBody}>
          <ScrollView style={styles.formInBodyScroll}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.formInBody}>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Hotel Name:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.cus_hotel_name }
                    onChangeText = {cus_hotel_name => this.setState({cus_hotel_name})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Number Room:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.cus_number_room }
                    onChangeText = {cus_number_room => this.setState({cus_number_room})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Address:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.cus_address }
                    onChangeText = {cus_address => this.setState({cus_address})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>City:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.cus_city }
                    onChangeText = {cus_city => this.setState({cus_city})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Telephone:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.cus_telephone }
                    onChangeText = {cus_telephone => this.setState({cus_telephone})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Fax:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.cus_fax }
                    onChangeText = {cus_fax => this.setState({cus_fax})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Url:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.cus_url }
                    onChangeText = {cus_url => this.setState({cus_url})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Country:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.cus_country }
                    onChangeText = {cus_country => this.setState({cus_country})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Created Date:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <DatePicker
                    style={styles.formDatePicker}
                    date={this.state.cus_contract_date}
                    mode="date"
                    placeholder="Contract Date"
                    format="YYYY-MM-DD"
                    minDate="2014-01-01"
                    maxDate="2050-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={datePickerStyle}
                    onDateChange={(date) => {this.setState({cus_contract_date: date})}}
                  />
                </View>
              </View>

              <MyButton
                title = "Update Customer"
                onPress = {this.customerUpdate}
                color = "#c6303d"
              />

            </View>
            </View>
          </ScrollView>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  formBack: {
    flex: 1,
  },
  formInBody: {
    width:'90%',
    marginTop:10,
  },
  formInBodyScroll: {
    width:'100%',
  },
  formOutBody: {
    flex: 1,
    alignItems: 'center',
  },
  formDatePicker: {
    width: '100%',
  },
  addItemRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  addItemRowLeft: {
    width: '35%',
    justifyContent: 'center',
  },
  addItemRowRight: {
    width: '65%',
  },
  addItemRowText: {
    fontSize: 13,
  },
});

const datePickerStyle = StyleSheet.create({
  dateIcon: {
    position: 'absolute',
    left: 0,
  },
  dateInput: {
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 45,
  },
  placeholderText: {
    color: '#919196',
    textAlign: 'left',
  }
});

const mapStateToProps = (state) => {
  return {
    selectedCustomer: state.selectedCustomer,
  }
}

export default connect(mapStateToProps, {selectCustomer})(EditCustomer);
