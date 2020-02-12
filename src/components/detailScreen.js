import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, ImageBackground, StatusBar, BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Left, Right, Icon, Body } from 'native-base';

class DetailScreen extends Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      Actions.refresh({key: Math.random()});
      return true;
  }

  render() {
    return (
      <View style={styles.formBack}>
      <Header style={{backgroundColor: '#be1221'}}>
      <Left style={{ flex: 1 }}>
        <Icon name='menu' onPress={ () => this.props.navigation.openDrawer() } />
      </Left>
      <Body style={{ flex: 5, alignItems: 'center' }}>
        <Text style={{ color: '#000', fontSize: 16 }}>Details</Text>
      </Body>
      <Right style={{ flex: 1 }}>
      </Right>
      </Header>

      <View style={styles.formOutBody}>

      <StatusBar hidden />
        <ScrollView style={styles.formInBodyScroll}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.formInBody}>

              <View>
                <ImageBackground source={require('./assets/ep-slide-1.jpg')} style={styles.detailImageWrapper}>

                  <View style={{width: '90%'}}>
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', height: 50, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{color: '#FFF', fontSize: 20}}>Destek</Text>
                    </View>

                    <View style={styles.detailTelView}>
                      <Text style={styles.detailTelText}>+09 232 4637920</Text>
                    </View>
                    <View style={styles.detailTelView}>
                      <Text style={styles.detailTelText}>+09 542 2808338</Text>
                    </View>
                  </View>

                </ImageBackground>
              </View>

              <TouchableHighlight>
              <View style={styles.detailAdressWrapper}>

                <View style={styles.detailAdressTitleArea}>
                  <View style={{flexDirection: 'row'}}>
                  <Icon name='briefcase'/>
                  <Text style={styles.detailAdressTitle}>İstanbul Şube</Text>
                  </View>
                </View>

                <View style={{backgroundColor:'#ccc', height: 3}}></View>

                <View style={{alignItems: 'center', marginTop: 5}}>
                  <Text style={styles.detailAdressContent}>Büyükdere Caddesi, Hukukçular Sitesi, No: 24A, Kat: 4, Daire: 40B</Text>
                  <Text style={styles.detailAdressContent}>Mecidiyeköy / Istanbul</Text>
                  <Text style={styles.detailAdressContent}>İrtibat: +09 212 347 8052</Text>
                </View>

              </View>
              </TouchableHighlight>

              <TouchableHighlight>
              <View style={styles.detailAdressWrapper}>

                <View style={styles.detailAdressTitleArea}>
                  <View style={{flexDirection: 'row'}}>
                  <Icon name='briefcase'/>
                  <Text style={styles.detailAdressTitle}>İzmir Şube</Text>
                  </View>
                </View>

                <View style={{backgroundColor:'#ccc', height: 3}}></View>

                <View style={{alignItems: 'center', marginTop: 5}}>
                  <Text style={styles.detailAdressContent}>Cumhuriyet Bulvarı, No: 140/2, Kat: 7, Anıt İş Merkezi</Text>
                  <Text style={styles.detailAdressContent}>Alsancak / Izmir</Text>
                  <Text style={styles.detailAdressContent}>İrtibat: +09 232 463 7920</Text>
                </View>

              </View>
              </TouchableHighlight>


            </View>
          </View>
        </ScrollView>
      </View>

      <View style={{position: 'absolute', bottom: 5, alignItems: 'center', width: '100%', flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name='information-circle' style={{fontSize:18, marginRight:5}} />
          <Text>Designed by Tolgahan Çelik for EuroProtel</Text>
        </View>
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
    position: 'relative',
  },
  formInBody: {
    width:'100%',
  },
  formInBodyScroll: {
    width:'100%',
  },
  formOutBody: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 15,
  },
  detailImageWrapper: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTelView: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTelText: {
    color: '#FFF',
    fontSize: 16,
  },
  detailAdressWrapper: {
    flexDirection: 'column',
    margin: 20,
  },
  detailAdressTitleArea: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailAdressTitle: {
    fontSize: 20,
    marginLeft: 15,
  },
  detailAdressContent: {
    textAlign: 'center',
  },
});

export default (DetailScreen);
