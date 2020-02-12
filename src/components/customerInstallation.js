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
import { fetchInstallation } from '../actions';
import InstallationItem from './installationItem';

class CustomerInstallation extends Component {

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
    await this.props.fetchInstallation(customerId);
  }

  renderItem({item}) {
    return (
      <InstallationItem installation={item} />
    )
  }

  render () {
    const { installationList } = this.props;

    return (
      <View style={styles.formBack}>

        <View>
        {
          this.props.installationList.loading
          ?
            <FlatList
            data = {installationList.dataset}
            renderItem = { this.renderItem }
            keyExtractor = {(item) => item.InstallationId}
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
})

const mapStateToProps = (state) => {
  return {
    state: state,
    installationList: state.installationList,
    selectedCustomer: state.selectedCustomer,
  }
}

export default connect(mapStateToProps, {fetchInstallation})(CustomerInstallation);
