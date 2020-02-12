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
import { fetchContact } from '../actions';
import ContactItem from './contactItem';

class SeeContact extends Component {

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
    this.props.fetchContact();
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

        <View style={{flex:1}}>
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
  },
})

const mapStateToProps = (state) => {
  return {
    contactList: state.contactList,
  }
}

export default connect(mapStateToProps, {fetchContact})(SeeContact);
