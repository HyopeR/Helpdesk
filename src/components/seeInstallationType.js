import _ from "lodash";
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
import { fetchInstallationType } from '../actions';
import InstallationTypeItem from './installationTypeItem';

class SeeInstallationType extends Component {

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
    this.props.fetchInstallationType();
  }

  renderItem({item}) {
    return (
      <InstallationTypeItem installationType={item} />
    )
  }

  render () {
    const { installationTypeList } = this.props;

    return (
      <View style={styles.formBack}>

        <View style={{flex:1}}>
        {
          this.props.installationTypeList.loading
          ?
            <FlatList
            data = {installationTypeList.dataset}
            renderItem = { this.renderItem }
            keyExtractor = {(item) => item.InstallationTypeId}
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
    installationTypeList: state.installationTypeList,
  }
}

export default connect(mapStateToProps, {fetchInstallationType})(SeeInstallationType);
