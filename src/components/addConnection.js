import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  BackHandler
} from 'react-native';

import { Left, Right, Icon, Body, Header, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import { fetchCustomer, fetchConnectionType } from '../actions';
import { MyButton } from './common';


class AddConnection extends Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      cus_id: 1,
      con_name: '',
      con_type_id: 1,
      con_ip: '',
      con_port: '',
      con_username: '',
      con_password: '',
      con_created_date: '',
      pItemCustomer: [],
      pItemConType: [],
      pickerLoad: false,
      firstFetch: true,

      hiddenLoadControl: false,
    };
  }

  componentDidMount() {
    var that = this;
    that.setState({con_created_date: that.getDate()});
    this.props.fetchCustomer('nullString');
    this.props.fetchConnectionType();
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

  connectionRegister = () => {
    const { cus_id } = this.state;
    const { con_name } = this.state;
    const { con_type_id } = this.state;
    const { con_ip } = this.state;
    const { con_port } = this.state;
    const { con_username } = this.state;
    const { con_password } = this.state;
    const { con_created_date } = this.state;

    fetch('http://192.168.1.105:8080/api/connection/add', {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            cus_id: cus_id,
            con_name: con_name,
            con_type_id: con_type_id,
            con_ip: con_ip,
            con_port: con_port,
            con_username: con_username,
            con_password: con_password,
            con_created_date: con_created_date
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

  controlPicker = () => {
    this.setState({pickerLoad:true, firstFetch: false})
  }

  load(){
    this.setState({hiddenLoadControl: true});
    setTimeout(this.trade, 150);
  }

  trade() {
    Actions.refresh ({key: Math.random()});
    alert("Bağlantı kaydı tamamlandı.");
  }

  render() {

    const { connectionTypeList, customerList } = this.props;

    if(this.props.connectionTypeList.loading && this.props.customerList.loading && this.state.firstFetch){
      for (let i = 0; i < this.props.connectionTypeList.dataset.length; i++) {
        this.state.pItemConType.push(
          {label: this.props.connectionTypeList.dataset[i].ConnectionTypeName, value: this.props.connectionTypeList.dataset[i].ConnectionTypeId}
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
                <Text style={styles.addItemRowText}>Connection Type:</Text>
              </View>

              <View style={styles.addItemRowRight}>
              {
                this.state.pickerLoad
                ?
                <RNPickerSelect
                    items={this.state.pItemConType}
                    placeholder={{
                        label: 'Select Item',
                        value: null,
                        color: '#666666',
                    }}
                    value={this.state.con_type_id}
                    onValueChange={value => {
                      this.setState({
                        con_type_id: value,
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
                <Text style={styles.addItemRowText}>Connection Name:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextInput
                  placeholder='Connection Name'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
                  onChangeText = {con_name => this.setState({con_name})}
                />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Ip:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextInput
                  placeholder='Ip'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
                  onChangeText = {con_ip => this.setState({con_ip})}
                />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Port:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextInput
                  placeholder='Port'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
                  onChangeText = {con_port => this.setState({con_port})}
                />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Username:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextInput
                  placeholder='Username'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
                  onChangeText = {con_username => this.setState({con_username})}
                 />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Password:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextInput
                  placeholder='Password'
                  placeholderTextColor='#666666'
                  style={styles.formInput}
                  onChangeText = {con_password => this.setState({con_password})}
                 />
              </View>
            </View>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Connection Date:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <DatePicker
                      style={styles.formInput}
                      date={this.state.con_created_date}
                      mode="date"
                      placeholder="Connection Created Date"
                      format="YYYY-MM-DD"
                      minDate="2014-01-01"
                      maxDate="2050-12-31"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={datePickerStyle}
                      onDateChange={(date) => {this.setState({con_created_date: date})}}
                    />
              </View>
            </View>

                <MyButton
                  title = "Save Connection"
                  onPress = {this.connectionRegister}
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
    connectionTypeList: state.connectionTypeList,
  }
}

export default connect(mapStateToProps, {fetchCustomer, fetchConnectionType})(AddConnection);
