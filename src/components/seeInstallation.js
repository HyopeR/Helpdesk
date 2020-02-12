import _ from "lodash";
import React, { Component, Colors } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  BackHandler,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import { Left, Right, Icon, Body, Header, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import RNPickerSelect from 'react-native-picker-select';
import { fetchInstallation, fetchInstallationStatus, searchInstallation } from '../actions';
import InstallationItem from './installationItem';

class SeeInstallation extends Component {

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
    this.state = {
      search_installation: '',
      default_start: true,

      pItemInsSta: [],
      pickerLoad: false,
      firstFetch: true,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.props.fetchInstallation();
    this.props.fetchInstallationStatus();
  }

  searchInstallation = (installationStatus) => {
    if(installationStatus != undefined){
      if(installationStatus.length == 0){
        this.props.fetchInstallation();
      }else {
        this.props.searchInstallation(installationStatus);
      }
    }else{
      this.props.fetchInstallation();
    }
  }

  changeSearchArea = (more) => {
    switch (more) {
      case true:
      this.setState({default_start: false});
        break;

      case false:
      this.setState({default_start: true});
        break;

      default:
        break;
    }
  }

  controlPicker = () => {
    this.setState({pickerLoad:true, firstFetch: false})
  }

  renderItem({item}) {
    return (
      <InstallationItem installation={item} />
    )
  }

  render () {
    const { installationList, installationStatusList } = this.props;

    if(this.props.installationStatusList.loading && this.state.firstFetch){

      for (let i = 0; i < this.props.installationStatusList.dataset.length; i++) {
        this.state.pItemInsSta.push(
          {label: this.props.installationStatusList.dataset[i].Status, value: this.props.installationStatusList.dataset[i].InstallationStatusId}
        );
      }

      this.controlPicker();
    }

    return (
      <View style={styles.formBack}>

        <View style={{flexDirection:'column'}}>
          <View style={{marginTop:15, marginLeft:10, marginRight:10, height:40, flexDirection:'row', backgroundColor: '#ccc', borderRadius: 25}}>
          <View style={{width:'15%', height: 40, justifyContent:'center'}}>

              <TouchableHighlight
                onPress = {() => {this.changeSearchArea(this.state.default_start)}}
                underlayColor = "transparent">
                <View style={{flexDirection:'row', justifyContent:'center',  alignItems:'center', backgroundColor:'#be1221', borderTopLeftRadius: 25, borderBottomLeftRadius: 25}}>
                  <Icon name='more' style={{fontSize:24, lineHeight:40}}/>
                </View>
              </TouchableHighlight>
            </View>

            <View style={{width:'70%', paddingLeft:10, justifyContent:'center'}}>
            {
              this.state.default_start
              ?
              <View>
              {
                this.state.pickerLoad
                ?
                <RNPickerSelect
                    style={{height:40, color: '#666'}}
                    placeholder={{
                        label: 'Select Item',
                        value: null,
                        color: '#666',
                    }}
                    items={this.state.pItemInsSta}
                    value={this.state.search_installation}
                    onValueChange={value => {
                      this.setState({
                        search_installation: value,
                      });
                    }}
                  />
                :
                <Spinner color='#be1221' />
              }
              </View>
              :
              <View>
                <TextInput
                  style={{width:'100%'}}
                  placeholder="Install Name"
                  placeholderTextColor='#666666'
                  onChangeText = {search_installation => this.setState({search_installation})}
                />
              </View>
            }
            </View>



            <View style={{width:'15%', height: 40, justifyContent:'center'}}>
              <TouchableHighlight
                onPress = {() => this.searchInstallation(this.state.search_installation)}
                underlayColor = "transparent">
                <View style={{flexDirection:'row', justifyContent:'center',  alignItems:'center', backgroundColor:'#be1221', borderTopRightRadius: 25, borderBottomRightRadius: 25}}>
                  <Icon name='search' style={{fontSize:24, lineHeight:40}}/>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>

        <View style={{flex:1}}>
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
  },
})

const mapStateToProps = (state) => {
  return {
    installationList: state.installationList,
    installationStatusList: state.installationStatusList,
  }
}

export default connect(mapStateToProps, {fetchInstallation, fetchInstallationStatus, searchInstallation})(SeeInstallation);
