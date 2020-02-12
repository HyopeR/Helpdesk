import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Picker,
  BackHandler
} from 'react-native';

import { Left, Right, Icon, Body, Header, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import { fetchContactTitle, selectContact } from '../actions';
import { TextArea, MyButton } from './common';

class EditContact extends Component {

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.fetchContactTitle();
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    const { selectedContact } = this.props;
    this.state = {
      title_index: this.props.selectedContact.TitleId,
      cus_hotel_name: this.props.selectedContact.Name,
      cus_id: this.props.selectedContact.CustomerId,
      title_id: this.props.selectedContact.TitleId,
      contact_fname: this.props.selectedContact.Firstname,
      contact_lname: this.props.selectedContact.Lastname,
      contact_gsm: this.props.selectedContact.GSM,
      contact_ext: this.props.selectedContact.Extension,
      contact_email: this.props.selectedContact.Email,
      contact_date: this.props.selectedContact.ContactCreatedDate,

      pItemConTitle: [],
      pickerLoad: false,
      firstFetch: true,
    };
  }

  handleBackButtonClick() {
      Actions.pop();
      Actions.refresh({key: Math.random()});
      return true;
  }

  conctactUpdate = () => {
    const { selectedContact } = this.props;

    const contactId = this.props.selectedContact.CustomerContactId;
    const sendUrl = "http://192.168.1.105:8080/api/contact/update/"+contactId;

    const { cus_id } = this.state;
    const { title_id } = this.state;
    const { contact_fname } = this.state;
    const { contact_lname } = this.state;
    const { contact_gsm } = this.state;
    const { contact_ext } = this.state;
    const { contact_email } = this.state;
    const { contact_date } = this.state;

    fetch(sendUrl, {
        method: 'PUT',
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
            let update = {
              cus_id: cus_id,
              title_id: title_id,
              contact_fname: contact_fname,
              contact_lname: contact_lname,
              contact_gsm: contact_gsm,
              contact_ext: contact_ext,
              contact_email: contact_email,
              contact_date: contact_date
            };
            this.props.selectContact(update);
            alert("Contact güncellendi.");
          })
          .catch((error) => {
            console.error(error);
          });
  }

  controlPicker = () => {
    this.setState({pickerLoad:true, firstFetch: false})
  }

  render () {
    const { selectedContact, contactTitleList } = this.props;

    if(this.props.contactTitleList.loading && this.state.firstFetch){
        for (let i = 0; i < this.props.contactTitleList.dataset.length; i++) {
          this.state.pItemConTitle.push(
            {label: this.props.contactTitleList.dataset[i].TitleName, value: this.props.contactTitleList.dataset[i].TitleId}
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
                <Text style={{padding: 5, fontSize: 14}}>{this.state.cus_hotel_name}</Text>
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Title Name:</Text>
              </View>

              <View style={styles.addItemRowRight}>
              {
                this.state.pickerLoad
                ?
                <RNPickerSelect
                    items={this.state.pItemConTitle}
                    placeholder={{}}
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
                <TextArea placeholder = "Type here.."
                  value = { this.state.contact_fname }
                  onChangeText = {contact_fname => this.setState({contact_fname})}
                />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Last Name:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextArea placeholder = "Type here.."
                  value = { this.state.contact_lname }
                  onChangeText = {contact_lname => this.setState({contact_lname})}
                />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Gsm:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextArea placeholder = "Type here.."
                  value = { this.state.contact_gsm }
                  onChangeText = {contact_gsm => this.setState({contact_gsm})}
                />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Extension:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextArea placeholder = "Type here.."
                  value = { this.state.contact_ext }
                  onChangeText = {contact_ext => this.setState({contact_ext})}
                />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Email:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextArea placeholder = "Type here.."
                  value = { this.state.contact_email }
                  onChangeText = {contact_email => this.setState({contact_email})}
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
                title = "Update Contact"
                onPress = {() => this.conctactUpdate()}
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
    selectedContact: state.selectedContact,
    contactTitleList: state.contactTitleList,
  }
}

export default connect(mapStateToProps, {fetchContactTitle, selectContact})(EditContact);
