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
import { fetchProduct } from '../actions';
import ProductItem from './productItem';

class SeeProduct extends Component {

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
    this.props.fetchProduct();
  }

  renderItem({item}) {
    return (
      <ProductItem product={item} />
    )
  }

  render () {
    const { productList } = this.props;

    return (
      <View style={styles.formBack}>

        <View style={{flex:1}}>
        {
          this.props.productList.loading
          ?
            <FlatList
            data = {productList.dataset}
            renderItem = { this.renderItem }
            keyExtractor = {(item) => item.ProductId}
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
    productList: state.productList,
  }
}

export default connect(mapStateToProps, {fetchProduct})(SeeProduct);
