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
import { fetchInstallationStatus, fetchProduct, selectInstallation } from '../actions';
import { TextArea, MyButton } from './common';

class EditInstallation extends Component {

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidMount() {
    this.props.fetchInstallationStatus();
    this.props.fetchProduct();
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    const { selectedInstallation } = this.props;
    this.state = {
      cus_hotel_name: this.props.selectedInstallation.Name,

      cus_id: this.props.selectedInstallation.CustomerId,
      pro_id: this.props.selectedInstallation.ProductId,
      ins_status_id: this.props.selectedInstallation.InstallationStatusId,

      ins_name: this.props.selectedInstallation.InstallName,
      ins_path: this.props.selectedInstallation.InstallationPath,
      ins_version: this.props.selectedInstallation.Version,
      number_of_license: this.props.selectedInstallation.NumberOfLicense,
      additional_note: this.props.selectedInstallation.AdditionalNotes,

      expire_date: this.props.selectedInstallation.ExpireDate,
      ins_contract_date: this.props.selectedInstallation.InsContractDate,
      planned_date: this.props.selectedInstallation.InsCreatedDate,
      installation_date: this.props.selectedInstallation.PlannedDate,

      pItemInsSta: [],
      pItemProduct: [],
      pickerLoad: false,
      firstFetch: true,
    };
  }

  componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      Actions.pop();
      Actions.refresh({key: Math.random()});
      return true;
  }

  installationUpdate = () => {
    const { selectedInstallation } = this.props;

    const installationId = this.props.selectedInstallation.InstallationId;
    const sendUrl = "http://192.168.1.105:8080/api/installation/update/"+installationId;

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

    fetch(sendUrl, {
        method: 'PUT',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            cus_id: cus_id,
            pro_id: pro_id,
            ins_status_id: ins_status_id,
            ins_name: ins_name,
            ins_path: ins_path,
            ins_version: ins_version,
            number_of_license: number_of_license,
            additional_note: additional_note,
            expire_date: expire_date,
            ins_contract_date: ins_contract_date,
            planned_date: planned_date,
            installation_date: installation_date
          })
      })

      .then((response) => response.json())
        .then((responseJson) => {
          let update = {
            cus_id: cus_id,
            pro_id: pro_id,
            ins_status_id: ins_status_id,
            ins_name: ins_name,
            ins_path: ins_path,
            ins_version: ins_version,
            number_of_license: number_of_license,
            additional_note: additional_note,
            expire_date: expire_date,
            ins_contract_date: ins_contract_date,
            planned_date: planned_date,
            installation_date: installation_date
          };
          this.props.selectInstallation(update);
            alert("Installation güncellendi.");
          })
          .catch((error) => {
            console.error(error);
          });
  }

  controlPicker = () => {
    this.setState({pickerLoad:true, firstFetch: false})
  }

  render () {
    const { selectedInstallation, productList, installationStatusList } = this.props;

      if(this.props.productList.loading && this.props.installationStatusList.loading && this.state.firstFetch){

        for (let i = 0; i < this.props.productList.dataset.length; i++) {
          this.state.pItemProduct.push(
            {label: this.props.productList.dataset[i].ProductName, value: this.props.productList.dataset[i].ProductId}
          );
        }
        for (let i = 0; i < this.props.installationStatusList.dataset.length; i++) {
          this.state.pItemInsSta.push(
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
                  <Text style={{padding: 5, fontSize: 14}}>{this.state.cus_hotel_name}</Text>
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
                    items={this.state.pItemInsSta}
                    placeholder={{}}
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
                  <Text style={styles.addItemRowText}>Product Name:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                {
                  this.state.pickerLoad
                  ?
                  <RNPickerSelect
                    items={this.state.pItemProduct}
                    placeholder={{}}
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
                  <Text style={styles.addItemRowText}>Install Name:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.ins_name }
                    onChangeText = {ins_name => this.setState({ins_name})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Installation Path:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.ins_path }
                    onChangeText = {ins_path => this.setState({ins_path})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Version:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.ins_version }
                    onChangeText = {ins_version => this.setState({ins_version})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Number License:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.number_of_license }
                    onChangeText = {number_of_license => this.setState({number_of_license})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Notes:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.additional_note }
                    onChangeText = {additional_note => this.setState({additional_note})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Expire Date:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <DatePicker
                    style={styles.formDatePicker}
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
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Contract Date:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <DatePicker
                    style={styles.formDatePicker}
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

                <View style={styles.addItemRowRight}>
                  <DatePicker
                    style={styles.formDatePicker}
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
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Installation Date:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <DatePicker
                    style={styles.formDatePicker}
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
                title = "Update Contact"
                onPress = {() => this.installationUpdate()}
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
    selectedInstallation: state.selectedInstallation,
    productList: state.productList,
    installationStatusList: state.installationStatusList,
  }
}

export default connect(mapStateToProps, {fetchProduct, fetchInstallationStatus, selectInstallation})(EditInstallation);
