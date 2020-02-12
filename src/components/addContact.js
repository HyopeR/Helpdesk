import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  BackHandler,
} from 'react-native';

import { Left, Right, Icon, Body, Header, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import { fetchCustomer, fetchContactTitle } from '../actions';
import { MyButton } from './common';


class AddContact extends Component {

  componentDidMount() {
    var that = this;
    that.setState({contact_date: that.getDate()});
    this.props.fetchCustomer('nullString');
    this.props.fetchContactTitle();
  }

  getDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var thisDate = year + "-" + month + "-" + date;
    return thisDate;
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      cus_id: '',
      title_id: '',
      contact_fname: '',
      contact_lname: '',
      contact_gsm: '',
      contact_ext: '',
      contact_email: '',
      contact_date: '',
      pItemConTitle: [],
      pItemCustomer: [],
      pickerLoad: false,
      firstFetch: true,

      hiddenLoadControl: false,
    };
  }

  componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      Actions.popTo("menu");
      return true;
  }

  contactRegister = () => {
    const { cus_id } = this.state;
    const { title_id } = this.state;
    const { contact_fname } = this.state;
    const { contact_lname } = this.state;
    const { contact_gsm } = this.state;
    const { contact_ext } = this.state;
    const { contact_email } = this.state;
    const { contact_date } = this.state;

    fetch('http://192.168.1.105:8080/api/contact/add', {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            cus_id: cus_id,
            title_id: title_id,
            contact_fname: contact_fname,
            contact_lname: contact_lname,
            contact_gsm: contact_gsm,
            contact_ext: contact_ext,
            contact_email: contact_email,
            contact_date: contact_date
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
      alert("Contact kaydı tamamlandı.");
    }

    controlPicker = () => {
      this.setState({pickerLoad:true, firstFetch: false})
    }

  render() {

  const { customerList, contactTitleList } = this.props;

  if(this.props.contactTitleList.loading && this.props.customerList.loading && this.state.firstFetch){

    for (let i = 0; i < this.props.contactTitleList.dataset.length; i++) {
      this.state.pItemConTitle.push(
        {label: this.props.contactTitleList.dataset[i].TitleName, value: this.props.contactTitleList.dataset[i].TitleId}
      );
    }

    for (let i = 0; i < this.props.customerList.dataset.length; i++) {
      this.state.pItemCustomer.push(
        {label: this.props.customerList.dataset[i].Name, value: this.props.customerList.dataset[i].CustomerId}
      );
    }
    this.controlPicker();
  }

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
                {
                  this.state.pickerLoad
                  ?
                  <RNPickerSelect
                      items={this.state.pItemCustomer}
                      placeholder={{
                          label: 'Select Item',
                          value: null,
                          color: '#666666',
                      }}
                      value={this.state.cus_id}
                      onValueChange={value => {
                        this.setState({
                          cus_id: value,
                        });
                      }}
                    />
                  :
                  <Spinner color='#be1221' />
                }
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Contact Title:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                {
                  this.state.pickerLoad
                  ?
                  <RNPickerSelect
                      items={this.state.pItemConTitle}
                      placeholder={{
                          label: 'Select Item',
                          value: null,
                          color: '#666666',
                      }}
                      value={this.state.title_id}
                      onValueChange={value => {
                        this.setState({
                          title_id: value,
                        });
                      }}
                    />
                  :
                  <Spinner color='#be1221' />
                }
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>First Name:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextInput
                    placeholder='First Name'
                    placeholderTextColor='#666666'
                    style={styles.formInput}
                    onChangeText = {contact_fname => this.setState({contact_fname})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Last Name:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextInput
                    placeholder='Last Name'
                    placeholderTextColor='#666666'
                    style={styles.formInput}
                    onChangeText = {contact_lname => this.setState({contact_lname})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Gsm:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextInput
                    placeholder='GSM'
                    placeholderTextColor='#666666'
                    style={styles.formInput}
                    onChangeText = {contact_gsm => this.setState({contact_gsm})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Extension:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextInput
                    placeholder='Extension'
                    placeholderTextColor='#666666'
                    style={styles.formInput}
                    onChangeText = {contact_ext => this.setState({contact_ext})}
                   />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Email:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextInput
                    placeholder='Email'
                    placeholderTextColor='#666666'
                    style={styles.formInput}
                    onChangeText = {contact_email => this.setState({contact_email})}
                   />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Contact Date:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <DatePicker
                        style={styles.formInput}
                        date={this.state.contact_date}
                        mode="date"
                        placeholder="Contact Created Date"
                        format="YYYY-MM-DD"
                        minDate="2014-01-01"
                        maxDate="2050-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={datePickerStyle}
                        onDateChange={(date) => {this.setState({contact_date: date})}}
                      />
                </View>
              </View>

                <MyButton
                  title = "Save Contact"
                  onPress = {this.contactRegister}
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

const mapStateToProps = (state) => {
  return {
    customerList: state.customerList,
    contactTitleList: state.contactTitleList,
  }
}

export default connect(mapStateToProps, {fetchCustomer, fetchContactTitle})(AddContact);
