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
import { fetchConnectionType } from '../actions';
import ConnectionTypeItem from './connectionTypeItem';

class SeeConnectionType extends Component {

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
    this.props.fetchConnectionType();
  }

  renderItem({item}) {
    return (
      <ConnectionTypeItem connectionType={item} />
    )
  }

  render () {
    const { connectionTypeList } = this.props;

    return (
      <View style={styles.formBack}>

        <View style={{flex:1}}>
        {
          this.props.connectionTypeList.loading
          ?
            <FlatList
            data = {connectionTypeList.dataset}
            renderItem = { this.renderItem }
            keyExtractor = {(item) => item.ConnectionTypeId}
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
    connectionTypeList: state.connectionTypeList,
  }
}

export default connect(mapStateToProps, {fetchConnectionType})(SeeConnectionType);
