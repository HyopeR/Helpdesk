
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
import { fetchConnection } from '../actions';
import ConnectionItem from './connectionItem';

class SeeConnection extends Component {

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
    this.props.fetchConnection();
  }

  componentWillMount() {
    this.props.fetchConnection();
  }

  renderItem({item}) {
    return (
      <ConnectionItem connection={item} />
    )
  }

  render () {
    const { connectionList } = this.props;

    return (
      <View style={styles.formBack}>
        <View style={{flex:1}}>
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
  },
})

const mapStateToProps = (state) => {
  return {
    connectionList: state.connectionList,
  }
}

export default connect(mapStateToProps, {fetchConnection})(SeeConnection);
