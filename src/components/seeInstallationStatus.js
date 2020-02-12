import _ from "lodash";
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  BackHandler,
} from 'react-native';

import { Left, Right, Icon, Body, Header, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchInstallationStatus } from '../actions';
import InstallationStatusItem from './installationStatusItem';

class SeeInstallationStatus extends Component {

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
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.fetchInstallationStatus();
  }

  renderItem({item}) {
    return (
      <InstallationStatusItem installationStatus={item} />
    )
  }

  render () {
    const { installationStatusList } = this.props;

    return (
      <View style={styles.formBack}>

        <View style={{flex:1}}>
        {
          this.props.installationStatusList.loading
          ?
            <FlatList
            data = {installationStatusList.dataset}
            renderItem = { this.renderItem }
            keyExtractor = {(item) => item.InstallationStatusId}
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
    installationStatusList: state.installationStatusList,
  }
}

export default connect(mapStateToProps, {fetchInstallationStatus})(SeeInstallationStatus);
