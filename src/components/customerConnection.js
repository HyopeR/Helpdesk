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
import { fetchConnection } from '../actions';
import ConnectionItem from './connectionItem';

class CustomerConnection extends Component {

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
    await this.props.fetchConnection(customerId);
  }

  renderItem({item}) {
    return (
      <ConnectionItem connection={item} />
    )
  }

  render () {
    const { connectionList, selectedCustomer } = this.props;

    return (
      <View style={styles.formBack}>

        <View>
        {
          this.props.connectionList.loading
          ?
            <FlatList
            data = {connectionList.dataset}
            renderItem = { this.renderItem }
            keyExtractor = {(item) => item.CustomerConnectionId}
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
    flexDirection:'column',
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
    connectionList: state.connectionList,
    selectedCustomer: state.selectedCustomer,
  }
}

export default connect(mapStateToProps, {fetchConnection})(CustomerConnection);
