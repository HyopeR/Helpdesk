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
import { fetchInstallationType, selectProduct, fetchProduct } from '../actions';
import { TextArea, MyButton } from './common';

class EditProduct extends Component {

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidMount() {
    this.props.fetchInstallationType();
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    const { selectedContact } = this.props;
    this.state = {
      index_id: this.props.selectedProduct.InstallationTypeId,
      pro_name: this.props.selectedProduct.ProductName,
      ins_type_id: this.props.selectedProduct.InstallationTypeId,

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
      setTimeout(()=> this.props.fetchProduct(),2);
      return true;
  }

  productUpdate = () => {
    const { selectedProduct } = this.props;

    const productId = this.props.selectedProduct.ProductId;
    const sendUrl = "http://192.168.1.105:8080/api/product/update/"+productId;

    const { pro_name } = this.state;
    const { ins_type_id } = this.state;

    fetch(sendUrl, {
        method: 'PUT',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            pro_name: pro_name,
            ins_type_id: ins_type_id
          })
      })

      .then((response) => response.json())
        .then((responseJson) => {
            let update = {
              pro_name: pro_name,
              ins_type_id: ins_type_id
            };
            this.props.selectProduct(update);
            alert("Product güncellendi.");
          })
          .catch((error) => {
            console.error(error);
          });
  }

  controlPicker = () => {
    this.setState({pickerLoad:true, firstFetch: false})
  }

  render() {
    const { selectedProduct, installationTypeList } = this.props;

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

        <View style={styles.formOutBody}>
          <ScrollView style={styles.formInBodyScroll}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.formInBody}>

            <View style={styles.addItemRow}>
              <View style={styles.addItemRowLeft}>
                <Text style={styles.addItemRowText}>Product Name:</Text>
              </View>

              <View style={styles.addItemRowRight}>
                <TextArea placeholder = "Type here.."
                  value = { this.state.pro_name }
                  onChangeText = {pro_name => this.setState({pro_name})}
                />
              </View>
            </View>

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
                  placeholder={{}}
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

              <MyButton
                title = "Update Product"
                onPress = {() => this.productUpdate()}
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

const mapStateToProps = (state) => {
  return {
    selectedProduct: state.selectedProduct,
    installationTypeList: state.installationTypeList,
  }
}

export default connect(mapStateToProps, {fetchInstallationType, selectProduct, fetchProduct})(EditProduct);
