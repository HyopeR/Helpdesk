// import firebase from 'firebase';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';

import WelcomeScreen from './components/welcomeScreen';

//MENU PAGE IMPORT
import MainMenu from './components/mainMenu';

//ANA TABLO IMPORT
import AddCustomer from './components/addCustomer';
import SeeCustomer from './components/seeCustomer';
import EditCustomer from './components/editCustomer';

import AddConnection from './components/addConnection';
import SeeConnection from './components/seeConnection';
import EditConnection from './components/editConnection';
import CustomerConnection from './components/customerConnection';

import AddContact from './components/addContact';
import SeeContact from './components/seeContact';
import EditContact from './components/editContact';
import CustomerContact from './components/customerContact';

import AddInstallation from './components/addInstallation';
import SeeInstallation from './components/seeInstallation';
import EditInstallation from './components/editInstallation';
import CustomerInstallation from './components/customerInstallation';

//YAN TABLO IMPORT
import SeeProduct from './components/seeProduct';
import EditProduct from './components/editProduct';

import SeeContactTitle from './components/seeContactTitle';
import SeeConnectionType from './components/seeConnectionType';
import SeeInstallationStatus from './components/seeInstallationStatus';
import SeeInstallationType from './components/seeInstallationType';

const RouterComp = () => {

  return (
    <Router navigationBarStyle = { styles.navigationWrapper} >
      <Scene titleStyle = { styles.sceneTitle } key = "root" hideNavBar = {true}>

        <Scene key='welcome' initial>
          <Scene key='welcome'
            component={WelcomeScreen}
            title='Welcome'
            hideNavBar
            initial
          />
        </Scene>

        <Scene key='menu'>
          <Scene key='menu'
            component={MainMenu}
            title = "Home"
            hideNavBar
            initial
          />
          <Scene key='addCustomer'
            component={AddCustomer}
            title = "Add Customer"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='seeCustomer'
            component={SeeCustomer}
            title = "See Customer"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='editCustomer'
            component={EditCustomer}
            title = "Edit Customer"
            onLeft= {() => {
              Actions.pop();
              setTimeout(()=> Actions.refresh({key: Math.random()}),2);
            }}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='customerConnection'
            component={CustomerConnection}
            title = "X / Connection"
            onLeft= {() => {
              Actions.popTo("seeCustomer");
              Actions.refresh({key: Math.random()});
            }}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='addConnection'
            component={AddConnection}
            title = "Add Connection"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='seeConnection'
            component={SeeConnection}
            title = "See Connection"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='editConnection'
            component={EditConnection}
            title = "Edit Connection"
            onLeft= {() => {
              Actions.pop();
              setTimeout(()=> Actions.refresh({key: Math.random()}),2);
            }}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='addContact'
            component={AddContact}
            title = "Add Contact"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='seeContact'
            component={SeeContact}
            title = "See Contact"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='editContact'
            component={EditContact}
            title = "Edit Contact"
            onLeft= {() => {
              Actions.pop();
              setTimeout(()=> Actions.refresh({key: Math.random()}),2);
            }}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='customerContact'
            component={CustomerContact}
            title = "X / Contact"
            onLeft= {() => {
              Actions.popTo("seeCustomer");
              Actions.refresh({key: Math.random()});
            }}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='addInstallation'
            component={AddInstallation}
            title = "Add Installation"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='seeInstallation'
            component={SeeInstallation}
            title = "See Installation"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='editInstallation'
            component={EditInstallation}
            title = "Edit Installation"
            onLeft= {() => {
              Actions.pop();
              setTimeout(()=> Actions.refresh({key: Math.random()}),2);
            }}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene key='customerInstallation'
            component={CustomerInstallation}
            title = "X / Installation"
            onLeft= {() => {
              Actions.popTo("seeCustomer");
              Actions.refresh({key: Math.random()});
            }}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene
            key='seeProduct'
            component={SeeProduct}
            title = "See Product"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene
            key='editProduct'
            component={EditProduct}
            title = "Edit Product"
            onLeft= {() => {
              Actions.pop();
              setTimeout(()=> Actions.refresh({key: Math.random()}),2);
            }}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene
            key='seeContactTitle'
            component={SeeContactTitle}
            title = "See Contact Title"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene
            key='seeConnectionType'
            component={SeeConnectionType}
            title = "See Connection Type"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene
            key='seeInstallationStatus'
            component={SeeInstallationStatus}
            title = "See Installation Status"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
          <Scene
            key='seeInstallationType'
            component={SeeInstallationType}
            title = "See Installation Type"
            onLeft= {() => {Actions.popTo("menu")}}
            leftTitle = <Icon name='arrow-round-back'/>
            onRight = {() => {}}
            headerForceInset={{ top: 'never' }}
          />
        </Scene>

      </Scene>
    </Router>
  );
};

const styles = StyleSheet.create({
  navigationWrapper: {
    textAlign: 'center',
    backgroundColor: '#be1221',
  },
  sceneTitle: {
    color: '#000',
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300'
  }
})

export default RouterComp;
