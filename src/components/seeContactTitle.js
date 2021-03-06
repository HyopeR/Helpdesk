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
import { fetchContactTitle } from '../actions';
import ContactTitleItem from './contactTitleItem';

class SeeContactTitle extends Component {

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
    this.props.fetchContactTitle();
  }

  renderItem({item}) {
    return (
      <ContactTitleItem contactTitle={item} />
    )
  }

  render () {
    const { contactTitleList } = this.props;

    return (
      <View style={styles.formBack}>

        <View style={{flex:1}}>
        {
          this.props.contactTitleList.loading
          ?
            <FlatList
            data = {contactTitleList.dataset}
            renderItem = { this.renderItem }
            keyExtractor = {(item) => item.TitleId}
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
    contactTitleList: state.contactTitleList,
  }
}

export default connect(mapStateToProps, {fetchContactTitle})(SeeContactTitle);
