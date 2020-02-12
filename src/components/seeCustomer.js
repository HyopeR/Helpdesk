import _ from "lodash";
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableHighlight,
  BackHandler,
} from 'react-native';

import { Left, Right, Icon, Body, Header, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchCustomer } from '../actions';
import CustomerItem from './customerItem';

class SeeCustomer extends Component {

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      Actions.popTo("menu");
      return true;
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      search_customer: '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.fetchCustomer('nullString');
  }

  searchCustomer = (customerName) => {
    if(customerName === ''){
      this.props.fetchCustomer('nullString');
    }else {
      this.props.fetchCustomer(customerName);
    }
  }

  renderItem({item}) {
    return (
      <CustomerItem customer={item} />
    )
  }

  render () {
    const { customerList } = this.props;

    return (
      <View style={styles.formBack}>
        <View style={{flexDirection:'column'}}>
          <View style={{marginTop:15, marginLeft:10, marginRight:10, height:40, flexDirection:'row', backgroundColor: '#ccc', borderRadius: 25, justifyContent:'center'}}>
            <View style={{width:'85%', paddingLeft:10, justifyContent:'center'}}>
              <TextInput
                style={{width:200}}
                placeholder="Search Customer (Name)"
                placeholderTextColor= "#666"
                onChangeText = {search_customer => this.setState({search_customer})}
              />
            </View>

            <View style={{width:'15%', height: 40, justifyContent:'center'}}>
              <TouchableHighlight
              onPress = {() => this.searchCustomer(this.state.search_customer)}
              underlayColor = "transparent">
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#be1221', borderTopRightRadius: 25, borderBottomRightRadius: 25}}>
                  <Icon name='search' style={{fontSize:24, lineHeight:40}}/>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>

        <View style={{flex:1}}>
        {
          this.props.customerList.loading
          ?
            <FlatList
            data = {customerList.dataset}
            renderItem = { this.renderItem }
            keyExtractor = {(item) => item.CustomerId}
            />
          :
            <Spinner color='#be1221' />
        }
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  formBack: {
    flex: 1,
  },
})

const mapStateToProps = (state) => {
  return {
    customerList: state.customerList,
  }
}

export default connect(mapStateToProps, {fetchCustomer})(SeeCustomer);
