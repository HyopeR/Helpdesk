import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, ImageBackground, StatusBar, BackHandler, Animated, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Left, Right, Icon, Body } from 'native-base';

let {width, height} = Dimensions.get('window');

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.springValue = new Animated.Value(100);
    this.state = {
        backClickCount: 0
    };
  }

  componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  _spring() {
          this.setState({backClickCount: 1}, () => {
              Animated.sequence([
                  Animated.spring(
                      this.springValue,
                      {
                          toValue: -.15 * height,
                          friction: 5,
                          duration: 300,
                          useNativeDriver: true,
                      }
                  ),
                  Animated.timing(
                      this.springValue,
                      {
                          toValue: 100,
                          duration: 300,
                          useNativeDriver: true,
                      }
                  ),

              ]).start(() => {
                  this.setState({backClickCount: 0});
              });
          });

      }


      handleBackButtonClick = () => {
          this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
          return true;
      };


  render() {
    return (
      <View style={styles.formBack}>
      <Header style={{backgroundColor: '#be1221'}}>
      <Left style={{ flex: 1 }}>
        <Icon name='menu' onPress={ () => this.props.navigation.openDrawer() } />
      </Left>
      <Body style={{ flex: 5, alignItems: 'center' }}>
        <Text style={{ color: '#000', fontSize: 16 }}>Home</Text>
      </Body>
      <Right style={{ flex: 1 }}>
      </Right>
      </Header>

      <View style={styles.formOutBody}>

      <StatusBar hidden />
        <ScrollView style={styles.formInBodyScroll}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.formInBody}>

              <View style={styles.categoryWrapper}>
                <TouchableHighlight>

                <ImageBackground source={require('./assets/asset1.jpg')} style={styles.categoryWrapperImage}>
                  <View style={styles.categoryInBody}>

                    <View style={styles.categoryButton}>
                      <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.7)" style={styles.categoryTouch} onPress = {() => Actions.seeCustomer()}>
                        <View style={styles.categoryTouchIn}><Icon name="eye" style={styles.categoryIcon}/></View>
                      </TouchableHighlight>
                    </View>

                    <View style={styles.categoryCenter}>
                      <TouchableHighlight><View style={styles.categoryTextWrapper}><Text style={styles.categoryText}>Customers</Text></View></TouchableHighlight>
                    </View>

                    <View style={styles.categoryButton}>
                      <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.7)" style={styles.categoryTouch} onPress = {() => Actions.addCustomer()}>
                        <View style={styles.categoryTouchIn}><Icon name="add" style={styles.categoryIcon}/></View>
                      </TouchableHighlight>
                    </View>

                  </View>
                  </ImageBackground>

                </TouchableHighlight>
              </View>

              <View style={styles.categoryWrapper}>
                <TouchableHighlight>

                <ImageBackground source={require('./assets/asset2.jpg')} style={styles.categoryWrapperImage}>
                  <View style={styles.categoryInBody}>

                    <View style={styles.categoryButton}>
                      <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.7)" style={styles.categoryTouch} onPress = {() => Actions.seeConnection()}>
                        <View style={styles.categoryTouchIn}><Icon name="eye" style={styles.categoryIcon}/></View>
                      </TouchableHighlight>
                    </View>

                    <View style={styles.categoryCenter}>
                      <TouchableHighlight><View style={styles.categoryTextWrapper}><Text style={styles.categoryText}>Connections</Text></View></TouchableHighlight>
                    </View>

                    <View style={styles.categoryButton}>
                      <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.7)" style={styles.categoryTouch} onPress = {() => Actions.addConnection()}>
                        <View style={styles.categoryTouchIn}><Icon name="add" style={styles.categoryIcon}/></View>
                      </TouchableHighlight>
                    </View>

                  </View>
                  </ImageBackground>

                </TouchableHighlight>
              </View>

              <View style={styles.categoryWrapper}>
                <TouchableHighlight>

                <ImageBackground source={require('./assets/asset3.jpg')} style={styles.categoryWrapperImage}>
                  <View style={styles.categoryInBody}>

                    <View style={styles.categoryButton}>
                      <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.7)" style={styles.categoryTouch} onPress = {() => Actions.seeContact()}>
                        <View style={styles.categoryTouchIn}><Icon name="eye" style={styles.categoryIcon}/></View>
                      </TouchableHighlight>
                    </View>

                    <View style={styles.categoryCenter}>
                      <TouchableHighlight><View style={styles.categoryTextWrapper}><Text style={styles.categoryText}>Contacts</Text></View></TouchableHighlight>
                    </View>

                    <View style={styles.categoryButton}>
                      <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.7)" style={styles.categoryTouch} onPress = {() => Actions.addContact()}>
                        <View style={styles.categoryTouchIn}><Icon name="add" style={styles.categoryIcon}/></View>
                      </TouchableHighlight>
                    </View>

                  </View>
                  </ImageBackground>

                </TouchableHighlight>
              </View>

              <View style={styles.categoryWrapper}>
                <TouchableHighlight>

                <ImageBackground source={require('./assets/asset4.jpg')} style={styles.categoryWrapperImage}>
                  <View style={styles.categoryInBody}>

                    <View style={styles.categoryButton}>
                      <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.7)" style={styles.categoryTouch} onPress = {() => Actions.seeInstallation()}>
                        <View style={styles.categoryTouchIn}><Icon name="eye" style={styles.categoryIcon}/></View>
                      </TouchableHighlight>
                    </View>

                    <View style={styles.categoryCenter}>
                      <TouchableHighlight><View style={styles.categoryTextWrapper}><Text style={styles.categoryText}>Installations</Text></View></TouchableHighlight>
                    </View>

                    <View style={styles.categoryButton}>
                      <TouchableHighlight underlayColor="rgba(0, 0, 0, 0.7)" style={styles.categoryTouch} onPress = {() => Actions.addInstallation()}>
                        <View style={styles.categoryTouchIn}><Icon name="add" style={styles.categoryIcon}/></View>
                      </TouchableHighlight>
                    </View>

                  </View>
                  </ImageBackground>

                </TouchableHighlight>
              </View>

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
    marginBottom:10,
  },
  formInBodyScroll: {
    width:'100%',
  },
  formOutBody: {
    alignItems: 'center',
    flex: 1,
  },
  categoryWrapper: {
    flexDirection: 'column',
    width: '100%',
    height: 140,
    backgroundColor: '#ccc',
    borderRadius: 25,
    marginTop: 10,
  },
  categoryWrapperImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  categoryInBody: {
    height: 140,
    flexDirection: 'row',
    borderRadius: 25,
  },
  categoryButton: {
    height: 140,
    width: '20%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  categoryCenter: {
    height: 140,
    justifyContent: 'center',
    width: '60%',
    alignItems: 'center',
  },
  categoryTextWrapper: {
    width: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 5,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 18,
    color: '#FFF',
  },
  categoryIcon: {
    fontSize:32,
    color: '#FFF',
    height: 32,
  },
  categoryTouch: {
    width: '100%',
    height: '100%',
  },
  categoryTouchIn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  }
});

export default (HomeScreen);
