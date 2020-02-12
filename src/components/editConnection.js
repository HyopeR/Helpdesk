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
import { fetchConnectionType, selectConnection } from '../actions';
import { TextArea, MyButton } from './common';

class EditConnection extends Component {

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.fetchConnectionType();
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    const { selectedConnection } = this.props;
    this.state = {
      state_type: this.props.selectedConnection.ConnectionTypeId,
      cus_hotel_name: this.props.selectedConnection.Name,
      cus_id: this.props.selectedConnection.CustomerId,
      con_name: this.props.selectedConnection.ConnectionName,
      con_type_id: this.props.selectedConnection.ConnectionTypeId,
      con_ip: this.props.selectedConnection.IP,
      con_port: this.props.selectedConnection.Port,
      con_username: this.props.selectedConnection.Username,
      con_password: this.props.selectedConnection.Password,
      con_created_date: this.props.selectedConnection.ConnectionsCreatedDate,

      pItemConType: [],
      pickerLoad: false,
      firstFetch: true,
    };
  }

  handleBackButtonClick() {
      Actions.pop();
      Actions.refresh({key: Math.random()});
      return true;
  }


  connectionUpdate = () => {
    const { selectedConnection } = this.props;

    const connectionId = this.props.selectedConnection.CustomerConnectionId;
    const sendUrl = "http://192.168.1.105:8080/api/connection/update/"+connectionId;

    const { cus_id } = this.state;
    const { con_name } = this.state;
    const { con_type_id } = this.state;
    const { con_ip } = this.state;
    const { con_port } = this.state;
    const { con_username } = this.state;
    const { con_password } = this.state;
    const { con_created_date } = this.state;

    fetch(sendUrl, {
        method: 'PUT',
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
            let update = {
              cus_id: cus_id,
              con_name: con_name,
              con_type_id: con_type_id,
              con_ip: con_ip,
              con_port: con_port,
              con_username: con_username,
              con_password: con_password,
              con_created_date: con_created_date
            };
            this.props.selectConnection(update);
            alert("Bağlantı güncellendi.");
          })
          .catch((error) => {
            console.error(error);
          });
  }

  controlPicker = () => {
    this.setState({pickerLoad:true, firstFetch: false})
  }

  render () {
    const { selectedConnection, connectionTypeList } = this.props;

    if(this.props.connectionTypeList.loading && this.state.firstFetch){
      for (let i = 0; i < this.props.connectionTypeList.dataset.length; i++) {
        this.state.pItemConType.push(
          {label: this.props.connectionTypeList.dataset[i].ConnectionTypeName, value: this.props.connectionTypeList.dataset[i].ConnectionTypeId}
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
                  <Text style={styles.addItemRowText}>Connection Name:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.con_name }
                    onChangeText = {con_name => this.setState({con_name})}
                  />
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
                      placeholder={{}}
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
                  <Text style={styles.addItemRowText}>Ip:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.con_ip }
                    onChangeText = {con_ip => this.setState({con_ip})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Port:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.con_port }
                    onChangeText = {con_port => this.setState({con_port})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Username:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.con_username }
                    onChangeText = {con_username => this.setState({con_username})}
                  />
                </View>
              </View>

              <View style={styles.addItemRow}>
                <View style={styles.addItemRowLeft}>
                  <Text style={styles.addItemRowText}>Password:</Text>
                </View>

                <View style={styles.addItemRowRight}>
                  <TextArea placeholder = "Type here.."
                    value = { this.state.con_password }
                    onChangeText = {con_password => this.setState({con_password})}
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
                title = "Update Connection"
                onPress = {this.connectionUpdate}
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
    selectedConnection: state.selectedConnection,
    connectionTypeList: state.connectionTypeList,
  }
}

export default connect(mapStateToProps, {fetchConnectionType, selectConnection})(EditConnection);
