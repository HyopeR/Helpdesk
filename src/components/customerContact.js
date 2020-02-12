import _ from 'lodash';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  BackHandler
} from 'react-native';

import { Left, Right, Icon, Body, Header, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchContact } from '../actions';
import ContactItem from './contactItem';

class CustomerContact extends Component {

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    const { selectedCustomer } = this.props;
    const customerId = this.props.selectedCustomer.CustomerId;
    this.exampleFunc(customerId);
  }

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      Actions.pop();
      Actions.refresh({key: Math.random()});
      return true;
  }

  exampleFunc = async(customerId) => {
    const { state } = this.props;
    await this.props.fetchContact(customerId);
  }

  renderItem({item}) {
    return (
      <ContactItem contact={item} />
    )
  }

  render () {
    const { contactList } = this.props;

    return (
      <View style={styles.formBack}>

        <View>
        {
          this.props.contactList.loading
          ?
            <FlatList
            data = {contactList.dataset}
            renderItem = { this.renderItem }
            keyExtractor = {(item) => item.CustomerContactId}
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
    marginBottom: 75,
  },
  tweetListContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  tweetStyle: {
    fontSize: 18,
  },
  emailStyle: {
    fontSize: 14,
    alignSelf: 'flex-end',
  }
})

const mapStateToProps = (state) => {
  return {
    state: state,
    contactList: state.contactList,
    selectedCustomer: state.selectedCustomer,
  }
}

export default connect(mapStateToProps, {fetchContact})(CustomerContact);
