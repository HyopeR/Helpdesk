import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  BackHandler,
} from 'react-native';

import { Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import { MyButton } from './common';


class AddCustomer extends Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      cus_hotel_name: '',
      cus_number_room: '',
      cus_address: '',
      cus_city: '',
      cus_telephone: '',
      cus_fax: '',
      cus_url: '',
      cus_country: '',
      cus_contract_date: '',

      hiddenLoadControl: false,
    };
  }

  componentDidMount() {
    var that = this;
    that.setState({cus_contract_date: that.getDate()});
  }

  getDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var thisDate = year + "-" + month + "-" + date;
    return thisDate;
  }

  componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      Actions.popTo("menu");
      return true;
  }

  customerRegister = () => {
    const { cus_hotel_name } = this.state;
    const { cus_number_room } = this.state;
    const { cus_address } = this.state;
    const { cus_city } = this.state;
    const { cus_telephone } = this.state;
    const { cus_fax } = this.state;
    const { cus_url } = this.state;
    const { cus_country } = this.state;
    const { cus_contract_date } = this.state;

    fetch('http://192.168.1.105:8080/api/customer/add', {
        method: 'POST',
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
            this.load();
          })
          .catch((error) => {
            console.error(error);
          });
  }

  load(){
      this.setState({hiddenLoadControl: true});
      setTimeout(this.trade, 150);
    }

    trade() {
      Actions.refresh ({key: Math.random()});
      alert("Müşteri kaydı tamamlandı.");
    }

  render() {
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
                <TextInput
                  placeholder='Hotel Name'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
                  onChangeText = {cus_hotel_name => this.setState({cus_hotel_name})}
                />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Number Room:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextInput
                  placeholder='Number Room'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
                  onChangeText = {cus_number_room => this.setState({cus_number_room})}
                />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Address:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextInput
                  placeholder='Address'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
                  onChangeText = {cus_address => this.setState({cus_address})}
                />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>City:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextInput
                  placeholder='City'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
                  onChangeText = {cus_city => this.setState({cus_city})}
                />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Telephone:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextInput
                  placeholder='Telephone'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
                  onChangeText = {cus_telephone => this.setState({cus_telephone})}
                />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Fax:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextInput
                  placeholder='Fax'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
                  onChangeText = {cus_fax => this.setState({cus_fax})}
                 />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Url:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextInput
                  placeholder='Url'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
                  onChangeText = {cus_url => this.setState({cus_url})}
                 />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Country:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextInput
                  placeholder='Country'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
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
                      style={styles.formInput}
                      date={this.state.cus_contract_date}
                      mode="date"
                      placeholder="Created Date"
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
                  title = "Save Customer"
                  onPress = {this.customerRegister}
                  color = "#c6303d"
                />

            </View>
            </View>
          </ScrollView>
        </View>

        {
          this.state.hiddenLoadControl
          ?
          <View style={styles.hiddenLoadPage}>
            <View style={{flexDirection: 'column'}}>
              <Spinner color="#be1221" />
              <Text style={{color: '#fff', fontSize: 18}}>İşleminiz yapılıyor...</Text>
            </View>
          </View>
          :
          null
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  formBack: {
    flex: 1,
  },
  formInput: {
    width:'100%',
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
    width: '65%'
  },
  addItemRowText: {
    fontSize: 13,
  },
  hiddenLoadPage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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

export default (AddCustomer);
