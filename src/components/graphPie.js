import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Text, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import { PieChart } from 'react-native-chart-kit';
import { Spinner } from 'native-base';
const { width } = Dimensions.get('window');

class PieGraph extends Component {

  constructor() {
    super();
    this.state = {
      pieData: [],
      listPieData: [],
      pieceColor: '',
      loadingPieData: false,
      loadingListData: false,
      thisMonth: '',
      okData: false,
      okInfo: '',
    }
  }

  componentDidMount() {
    this.fetchPieData();
    this.fetchListData();

    let aylar = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let monthEndDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    this.setState({thisMonth: aylar[currentMonth]});

    let endMonthDate = currentYear + '-' + currentMonth + '-' + monthEndDay;
    let startMonthDate = currentYear + '-' + currentMonth + '-1';
  }

  fetchListData = async() => {
    try {
      fetch('http://192.168.1.105:8080/api/raport/installations/listpie')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({listPieData: responseJson, loadingListData: true});
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.error(e);
    }

  }

  fetchPieData = async() => {
    try {
      fetch('http://192.168.1.105:8080/api/raport/installations/pie')
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.length > 0){

            for (let i = 0; i < responseJson.length; i++) {
              switch (parseInt(responseJson[i].InstallationStatusId)) {
                case 1:
                this.setState({pieceColor: '#ee4540'});
                  break;

                case 2:
                this.setState({pieceColor: '#801336'});
                  break;

                case 3:
                this.setState({pieceColor: '#c72c41'});
                  break;

                case 4:
                this.setState({pieceColor: '#2d132c'});
                  break;

                default:
                  break;
              }

              this.state.pieData.push(
                {name: responseJson[i].Status, count: responseJson[i].ins_count * 1, color: this.state.pieceColor, legendFontColor: '#000', legendFontSize: 11}
              );
            }
            this.setState({loadingPieData: true, okData: true});

          }else{
            this.setState({loadingPieData: true, okInfo: this.state.thisMonth + ' ayına ait installation kaydı yoktur.'});
          }
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
        <View>
        {
          this.state.loadingPieData
          ?
            this.state.okData
            ?
            <View>
              <Text style={{marginTop:25, marginLeft:10, fontSize:18}}>{this.state.thisMonth} ayı installation işlemleri.</Text>
              <PieChart
              data={this.state.pieData}
              width={ Dimensions.get('window').width - 25}
              height={200}
              chartConfig={{
                color: () => `#000`,
              }}
              accessor="count"
              paddingLeft="10"
              backgroundColor="transparent"
              absolute //for the absolute number remove if you want percentage
            />

            <View style={{flexDirection:'column', flex:1, alignItems:'center', marginTop: 10}}>
              <View style={{flexDirection:'row', marginBottom:5, marginTop:5, backgroundColor:'#ccc', paddingLeft:15, paddingTop:10, paddingBottom:10, justifyContent:'center', width:'100%'}}>
                <Text style={styles.subTitle}>Install Name{"\n"}(Customer Name)</Text>
                <Text style={styles.subTitle}>Status</Text>
                <Text style={styles.subTitle}>Planned Date</Text>
              </View>
              <View style={{width:'90%'}}>
                {
                  this.state.loadingListData
                  ?
                  <FlatList
                    data={this.state.listPieData}
                    renderItem={({item}) =>
                      <View style={{flexDirection:'row', marginBottom:5, marginTop:5}}>
                        <Icon name='square' style={styles.flatIcon}/>
                        <Text style={styles.flatText}>{item.InstallName}{"\n"}({item.Name})</Text>
                        <Text style={styles.flatText}>{item.Status}</Text>
                        <Text style={styles.flatText}>{item.PlannedDate}</Text>
                      </View>}
                    keyExtractor = {(item) => item.InstallationId}
                  />
                  :
                  null
                }
              </View>
            </View>
          </View>

            :
            <View style={{flexDirection:'row', marginBottom:5, marginTop:10, padding: 10, alignItems: 'center'}}>
              <Icon name='alert' style={{ fontSize: 18 }}/>
              <Text style={{fontSize: 15, marginLeft: 5}}>{this.state.okInfo}</Text>
            </View>
          :
          <Spinner color='#be1221' />
        }
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
    fontSize: 18,
  },
  flatText: {
    marginLeft: 10,
    fontSize: 12,
    width: '30%'
  },
  subTitle: {
    fontSize: 12,
    width: '30%',
    marginLeft: 10,
  }
});

export default (PieGraph);
