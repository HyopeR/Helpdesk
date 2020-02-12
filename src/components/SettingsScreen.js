import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, StatusBar, BackHandler } from 'react-native';
import { Header, Left, Right, Icon, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Accordion from 'react-native-collapsible/Accordion';

import AddProduct from './addProduct';
import AddContactTitle from './addContactTitle';
import AddConnectionType from './addConnectionType';
import AddInstallationStatus from './addInstallationStatus';
import AddInstallationType from './addInstallationType';

const SECTIONS = [
  {
    title: <Icon name="add" style={{ fontSize:24, color: '#000', height: 24, marginTop: 13 }} />,
    content: <AddProduct/>,
    category: 'Product',
    id: '1',
  },
  {
    title: <Icon name="add" style={{ fontSize:24, color: '#000', height: 24, marginTop: 13 }} />,
    content: <AddContactTitle/>,
    category: 'Contact Title',
    id: '2',
  },
  {
    title: <Icon name="add" style={{ fontSize:24, color: '#000', height: 24, marginTop: 13 }} />,
    content: <AddConnectionType/>,
    category: 'Connection Type',
    id: '3',
  },
  {
    title: <Icon name="add" style={{ fontSize:24, color: '#000', height: 24, marginTop: 13 }} />,
    content: <AddInstallationStatus/>,
    category: 'Installation Status',
    id: '4',
  },
  {
    title: <Icon name="add" style={{ fontSize:24, color: '#000', height: 24, marginTop: 13 }} />,
    content: <AddInstallationType/>,
    category: 'Installation Type',
    id: '5',
  },
];

class SettingsScreen extends Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      activeSections: [],
    };
  }

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      Actions.refresh({key: Math.random()});
      return true;
  }

  controlIdSection = (id) => {
    id = parseInt(id);
    switch (id) {
      case 1:
        Actions.push("seeProduct");
        break;

      case 2:
        Actions.push("seeContactTitle");
        break;

      case 3:
        Actions.push("seeConnectionType");
        break;

      case 4:
        Actions.push("seeInstallationStatus");
        break;

      case 5:
        Actions.push("seeInstallationType");
        break;

      default:
        break;
    }
  }

  _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
      </View>
    );
  };

  _renderHeader = section => {
    return (
      <View style={styles.header}>

        <View style={styles.settingsMenuWrapper}>

            <View style={styles.inWrapLeft}>
              <Text style={{ fontSize:18, color: '#000'}}>{section.category}</Text>
            </View>

            <View style={styles.inWrapRight}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {section.title}
              </View>
            </View>

            <View style={styles.inWrapRight}>
              <TouchableHighlight style = {styles.inWrapTouch} underlayColor="#c6303d" onPress = {() => this.controlIdSection(section.id)}>
                <View style={{alignItems: 'center'}}>
                  <Icon name="eye" style={{ fontSize:24, color: '#000', height: 24 }} />
                </View>
              </TouchableHighlight>
            </View>

        </View>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.settingsAccordionDetail}>
        {section.content}
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <View style={styles.formBack}>
      <Header style={{backgroundColor: '#be1221'}}>
      <Left style={{ flex: 1 }}>
        <Icon name='menu' onPress={ () => this.props.navigation.openDrawer() } />
      </Left>
      <Body style={{ flex: 5, alignItems: 'center' }}>
        <Text style={{ color: '#000', fontSize: 16 }}>Settings</Text>
      </Body>
      <Right style={{ flex: 1 }}>
      </Right>
      </Header>

        <View style={styles.formOutBody}>
        <StatusBar hidden />
          <ScrollView style={styles.formInBodyScroll}>
            <View style={{alignItems: 'center'}}>
              <View style={styles.formInBody}>

              <Accordion
              sections={SECTIONS}
              activeSections={this.state.activeSections}
              renderSectionTitle={this._renderSectionTitle}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections}
              underlayColor="transparent"
            />

              </View>
            </View>
          </ScrollView>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  formBack: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  formInBody: {
    width:'90%',
    marginTop:10,
  },
  formInBodyScroll: {
    width:'100%',
  },
  formOutBody: {
    alignItems: 'center',
    flex: 1,
  },
  settingsMenuWrapper: {
    flexDirection: 'row',
    height: 50,
    flex: 1,
    backgroundColor: '#ccc',
    marginTop: 15,
  },
  inWrapLeft: {
    width: '70%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  inWrapRight: {
    width: '15%',
    height: 50,
    backgroundColor: '#be1221',
  },
  inWrapTouch: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  settingsAccordion: {
    flexDirection: 'row',
    width: '100%',
  },
  settingsAccordionDetail: {
    backgroundColor: '#ddd',
    paddingTop: 10,
  }
});

export default (SettingsScreen);
