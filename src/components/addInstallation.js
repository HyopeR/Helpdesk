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
import { fetchCustomer, fetchProduct, fetchInstallationStatus } from '../actions';
import { MyButton } from './common';


class AddInstallation extends Component {

  componentDidMount() {
    var that = this;
    var date = that.getDate();
    that.setState({
      default_date: date,
      expire_date: date,
      ins_contract_date: date,
      planned_date: date,
      installation_date: date,
    });
    this.props.fetchCustomer('nullString');
    this.props.fetchProduct();
    this.props.fetchInstallationStatus();
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
      index_one: 1,
      index_two: 1,
      index_three: 1,
      default_date: '',

      cus_id: '',
      pro_id: '',
      ins_status_id: '',

      ins_name: '',
      ins_path: '',
      ins_version: '',
      number_of_license: '',
      additional_note: '',

      expire_date: '',
      ins_contract_date: '',
      planned_date: '',
      installation_date: '',

      pItemCustomer: [],
      pItemProduct: [],
      pItemStatus: [],
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

  installationRegister = () => {
    const { cus_id } = this.state;
    const { pro_id } = this.state;
    const { ins_status_id } = this.state;

    const { ins_name } = this.state;
    const { ins_path } = this.state;
    const { ins_version } = this.state;
    const { number_of_license } = this.state;
    const { additional_note } = this.state;

    const { expire_date } = this.state;
    const { ins_contract_date } = this.state;
    const { planned_date } = this.state;
    const { installation_date } = this.state;

    fetch('http://192.168.1.105:8080/api/installation/add', {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            cus_id: cus_id,
            ins_name: ins_name,
            ins_path: ins_path,
            ins_version: ins_version,
            pro_id: pro_id,
            ins_status_id: ins_status_id,
            number_of_license: number_of_license,
            expire_date: expire_date,
            additional_note: additional_note,
            ins_contract_date: ins_contract_date,
            planned_date: planned_date,
            installation_date: installation_date
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
    Actions.refresh({key: Math.random()});
    alert('Installation kaydı tamamlandı.');
  }

  controlPicker = () => {
    this.setState({pickerLoad:true, firstFetch: false})
  }

  render() {

    const { customerList, productList, installationStatusList } = this.props;

    if(this.props.customerList.loading && this.props.productList.loading && this.props.installationStatusList.loading && this.state.firstFetch){

      for (let i = 0; i < this.props.customerList.dataset.length; i++) {
        this.state.pItemCustomer.push(
          {label: this.props.customerList.dataset[i].Name, value: this.props.customerList.dataset[i].CustomerId}
        );
      }
      for (let i = 0; i < this.props.productList.dataset.length; i++) {
        this.state.pItemProduct.push(
          {label: this.props.productList.dataset[i].ProductName, value: this.props.productList.dataset[i].ProductId}
        );
      }
      for (let i = 0; i < this.props.installationStatusList.dataset.length; i++) {
        this.state.pItemStatus.push(
          {label: this.props.installationStatusList.dataset[i].Status, value: this.props.installationStatusList.dataset[i].InstallationStatusId}
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
                  <Text style={styles.addItemRowText}>Product Name:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                {
                  this.state.pickerLoad
                  ?
                  <RNPickerSelect
                      items={this.state.pItemProduct}
                      placeholder={{
                          label: 'Select Item',
                          value: null,
                          color: '#666666',
                      }}
                      value={this.state.pro_id}
                      onValueChange={value => {
                        this.setState({
                          pro_id: value,
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
                  <Text style={styles.addItemRowText}>Installation Status:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                {
                  this.state.pickerLoad
                  ?
                  <RNPickerSelect
                      items={this.state.pItemStatus}
                      placeholder={{
                          label: 'Select Item',
                          value: null,
                          color: '#666666',
                      }}
                      value={this.state.ins_status_id}
                      onValueChange={value => {
                        this.setState({
                          ins_status_id: value,
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
                  <Text style={styles.addItemRowText}>Installation Name:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextInput
                    placeholder='Installation Name'
                    placeholderTextColor='#666666'
                    style={styles.formInput}
                    onChangeText = {ins_name => this.setState({ins_name})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Installation Path:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextInput
                    placeholder='Installation Path'
                    placeholderTextColor='#666666'
                    style={styles.formInput}
                    onChangeText = {ins_path => this.setState({ins_path})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Version:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextInput
                    placeholder='Version'
                    placeholderTextColor='#666666'
                    style={styles.formInput}
                    onChangeText = {ins_version => this.setState({ins_version})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Number License:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextInput
                    placeholder='Number License'
                    placeholderTextColor='#666666'
                    style={styles.formInput}
                    onChangeText = {number_of_license => this.setState({number_of_license})}
                   />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Note:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextInput
                    placeholder='Note'
                    placeholderTextColor='#666666'
                    style={styles.formInput}
                    onChangeText = {additional_note => this.setState({additional_note})}
                   />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Expire Date:</Text>
                </View>
                  <DatePicker
                        style={styles.formInput}
                        date={this.state.expire_date}
                        mode="date"
                        placeholder="Expire Date"
                        format="YYYY-MM-DD"
                        minDate="2014-01-01"
                        maxDate="2050-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={datePickerStyle}
                        onDateChange={(date) => {this.setState({expire_date: date})}}
                      />
                <View style={styles.addItemRowRight}>

                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Contract Date:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <DatePicker
                        style={styles.formInput}
                        date={this.state.ins_contract_date}
                        mode="date"
                        placeholder="Contract Date"
                        format="YYYY-MM-DD"
                        minDate="2014-01-01"
                        maxDate="2050-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={datePickerStyle}
                        onDateChange={(date) => {this.setState({ins_contract_date: date})}}
                      />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Planned Date:</Text>
                </View>
                  <DatePicker
                        style={styles.formInput}
                        date={this.state.planned_date}
                        mode="date"
                        placeholder="Planned Date"
                        format="YYYY-MM-DD"
                        minDate="2014-01-01"
                        maxDate="2050-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={datePickerStyle}
                        onDateChange={(date) => {this.setState({planned_date: date})}}
                      />
                <View style={styles.addItemRowRight}>

                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Installation Date:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <DatePicker
                        style={styles.formInput}
                        date={this.state.installation_date}
                        mode="date"
                        placeholder="Installation Date"
                        format="YYYY-MM-DD"
                        minDate="2014-01-01"
                        maxDate="2050-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={datePickerStyle}
                        onDateChange={(date) => {this.setState({installation_date: date})}}
                      />
                </View>
              </View>

                <MyButton
                  title = "Save Installation"
                  onPress = {this.installationRegister}
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
    productList: state.productList,
    installationStatusList: state.installationStatusList,
  }
}

export default connect(mapStateToProps, {fetchCustomer, fetchProduct, fetchInstallationStatus})(AddInstallation);
