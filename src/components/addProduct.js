import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
} from 'react-native';

import { Left, Right, Icon, Body, Header, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';
import { fetchInstallationType } from '../actions';
import { MyButtonSquare } from './common';


class AddProduct extends Component {

  componentDidMount() {
    this.props.fetchInstallationType();
  }

  constructor(props) {
    super(props);
    this.state = {
      index_id: 1,
      pro_name: '',
      ins_type_id: '',

      pItemProduct: [],
      pickerLoad: false,
      firstFetch: true,
    };
  }

  productRegister = () => {
    const { pro_name } = this.state;
    const { ins_type_id } = this.state;

    fetch('http://192.168.1.105:8080/api/product/add', {
        method: 'POST',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            pro_name: pro_name,
            ins_type_id: ins_type_id,
          })
      })
      .then((response) => response.json())
        .then((responseJson) => {
            alert("Ürün kaydı tamamlandı.");
          })
          .catch((error) => {
            console.error(error);
          });
  }

  controlPicker = () => {
    this.setState({pickerLoad:true, firstFetch: false})
  }

  render() {
    const { installationTypeList } = this.props;

    if(this.props.installationTypeList.loading && this.state.firstFetch){

      for (let i = 0; i < this.props.installationTypeList.dataset.length; i++) {
        this.state.pItemProduct.push(
          {label: this.props.installationTypeList.dataset[i].InstallationTypeName, value: this.props.installationTypeList.dataset[i].InstallationTypeId}
        );
      }
      this.controlPicker();
    }

    return (
      <View style={styles.formBack}>

        <View style={styles.formContent}>
        <TextInput
          placeholder='Product Name'
          placeholderTextColor='#666666'
          style={styles.formInput}
          onChangeText = {pro_name => this.setState({pro_name})}
        />

        <View style={styles.addItemRow}>
          <View style={styles.addItemRowLeft}>
            <Text style={styles.addItemRowText}>Installation Type:</Text>
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
              value={this.state.ins_type_id}
              onValueChange={value => {
                this.setState({
                  ins_type_id: value,
                });
              }}
            />
            :
            <Spinner color='#be1221' />
          }

          </View>
        </View>
        </View>

          <MyButtonSquare
            title = "Save Product"
            onPress = {this.productRegister}
            color = "#c6303d"
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  formBack: {
  },
  formContent: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  formInBody: {
    width:'90%',
    marginTop:10,
  },
  formInput: {
    height: 50,
    width: '100%',
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
    height: 50,
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

const mapStateToProps = (state) => {
  return {
    installationTypeList: state.installationTypeList,
  }
}

export default connect(mapStateToProps, {fetchInstallationType})(AddProduct);
