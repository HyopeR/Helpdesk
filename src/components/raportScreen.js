import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, ImageBackground, StatusBar, Dimensions, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Left, Right, Icon, Body } from 'native-base';
import { Card, MyButton } from './common';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import PieGraph from './graphPie';
import ContGraph from './graphCont';

const FirstRoute = () => (
  <PieGraph/>
);

const SecondRoute = () => (
  <ContGraph/>
);

class RaportScreen extends Component {

  handleBackButtonClick() {
      Actions.refresh({key: Math.random()});
      return true;
  }

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Month' },
        { key: 'second', title: 'Year' },
      ],
    };
  }

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  render() {
    return (
      <View style={styles.formBack}>
      <Header style={{backgroundColor: '#be1221'}}>
      <Left style={{ flex: 1 }}>
        <Icon name='menu' onPress={ () => this.props.navigation.openDrawer() } />
      </Left>
      <Body style={{ flex: 5, alignItems: 'center' }}>
        <Text style={{ color: '#000', fontSize: 16 }}>Reports</Text>
      </Body>
      <Right style={{ flex: 1 }}>
      </Right>
      </Header>

      <StatusBar hidden />
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props =>
            <TabBar
                {...props}
                style={styles.bubble}
                indicatorStyle={{ backgroundColor: '#be1221' }}
                labelStyle={styles.noLabel}
            />
        }
        tabBarPosition={'top'}
      />
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
    marginBottom: 75,
  },
  scene: {
    flex: 1,
  },
  noLabel: {
    color: '#000',
  },
  bubble: {
    backgroundColor: '#ccc',
  },
});

export default (RaportScreen);
