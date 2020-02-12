import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import {ContributionGraph} from 'react-native-chart-kit';
import { Spinner } from 'native-base';

const { width } = Dimensions.get('window');

class ContGraph extends Component {

  constructor() {
    super();
    this.state = {
      contData: [],
      listContData: [],
      loadingListData: false,
      loadingDateData: false,
      yearEndDate: '',
      currentYear: '',
      okData: false,
      okInfo: '',
    }
  }

  componentDidMount() {
    let currentYear = new Date().getFullYear();
    let endYear = new Date(currentYear, 11, 31).getDay();
    let yearEndDate = currentYear+"-12-31";
    this.setState({yearEndDate: yearEndDate, currentYear: currentYear});
    this.fetchDateData();
    this.fetchListData();
  }

  fetchListData = () => {
    try {
      fetch('http://192.168.1.105:8080/api/raport/installations/listcontribution')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson.length);
          if(responseJson.length > 0){
            this.setState({listContData: responseJson, loadingListData: true, okData: true});
          }else{
            this.setState({loadingListData: true, okData: false, okInfo: this.state.currentYear + ' yılına ait installation kaydı yoktur.'});
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error(e);
    }
  }

  fetchDateData = () => {
    try {
      fetch('http://192.168.1.105:8080/api/raport/installations/contribution')
        .then((response) => response.json())
        .then((responseJson) => {
          for (let i = 0; i < responseJson.length; i++) {
            this.state.contData.push(
              {date: responseJson[i].PlannedDate, count: responseJson[i].count_ins * 1}
            );
          }
          this.setState({loadingDateData: true});
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error(e);
    }
  }

 render() {
    return (
      <View style={styles.formBack}>
      <ScrollView>
        <Text style={{marginTop:25, marginLeft:10, fontSize:18}}>{this.state.currentYear} yılı ısı haritası.</Text>

        <View style={{alignItems: 'center',}}>
        <ScrollView horizontal={true} showHorizontalScrollIndicator={false} style={{width: '90%'}}>
          <View>
          {
            this.state.loadingDateData
            ?
            <ContributionGraph
              values={this.state.contData}
              endDate={this.state.yearEndDate}
              numDays={365}
              width={1175}
              height={220}
              chartConfig={{
                backgroundGradientFrom: '#e9e9ef',
                backgroundGradientTo: '#e9e9ef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
            :
            null
          }
          </View>
        </ScrollView>
        </View>

          <View style={{flexDirection:'column', flex:1, alignItems:'center', marginTop: 10}}>
            <View style={{flexDirection:'row', marginBottom:5, marginTop:5, backgroundColor:'#ccc', paddingLeft:15, paddingTop:10, paddingBottom:10, justifyContent:'center', width:'100%'}}>
              <Text style={styles.subTitle}>Month</Text>
              <Text style={styles.subTitle}>Count</Text>
            </View>
            <View style={{width:'90%'}}>
              {
                this.state.loadingListData
                ?
                  this.state.okData
                  ?
                  <FlatList
                    data={this.state.listContData}
                    renderItem={({item}) =>
                      <View style={{flexDirection:'row', marginBottom:5, marginTop:5}}>
                        <Icon name='square' style={styles.flatIcon}/>
                        <Text style={styles.flatText}>{item.month_name}</Text>
                        <Text style={styles.flatText}>{item.count_ins}</Text>
                      </View>}
                    keyExtractor = {(item) => item.month_id}
                  />
                  :
                  <View style={{flexDirection:'row', marginBottom:5, marginTop:5}}>
                    <Text style={styles.infoText}>{this.state.okInfo}</Text>
                  </View>
                :
                <Spinner color='#be1221' />
              }
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formBack: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  flatIcon: {
    fontSize: 22,
  },
  flatText: {
    marginLeft: 10,
    fontSize: 14,
    width: '45%'
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    width: '90%'
  },
  subTitle: {
    fontSize: 16,
    width: '45%',
    marginLeft: 10,
  }
});
export default (ContGraph);
