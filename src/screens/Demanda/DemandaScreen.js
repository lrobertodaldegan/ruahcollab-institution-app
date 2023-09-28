import {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import DemandaCard from '../../components/DemandaCard';
import Label from '../../components/Label';
import Loader from '../../components/Loader';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {get} from '../../service/Rest/RestService';
import VolunteerCard from '../../components/VolunteerCard';

const DemandaScreen = ({route, navigation}) => {
  const [demand, setDemand] = useState(null);
  const [loading, setLoading] = useState(true);

  const {demandId} = route.params;

  const init = () => {
    setLoading(true);
    setDemand(null);

    get(`/demand/${demandId}`, () => navigation.navigate('login'))
    .then(response => {
      if(response.status === 200)
        setDemand(response.data);

      setLoading(false);
    }).catch(err => {console.log(err); navigation.navigate('error');});
  }

  useEffect(() => {
    init();
  }, []);

  const renderHeader = () => {
    return (
      <>
        <Header navigation={navigation}/>

        <Label style={styles.title} value='Voluntários para:'/>

        <Label style={styles.demandTitle} value={demand?.title}/>
      </>
    )
  }

  const renderDemands = () => {
    if(loading){
      return <Loader color='#8A4A20'/>
    } else {
      if(demand && demand.subscriptions && demand.subscriptions.length > 0){
        return (
          <FlatList 
            contentContainerStyle={styles.wrap}
            ListHeaderComponent={renderHeader()}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={() => init()}/>
            }
            keyExtractor={(item) => item._id ? item._id : item.id}
            data={demand.subscriptions}
            renderItem={({item}) => <VolunteerCard showDemandLbls={false} item={item}/>}
          />
        )
      } else {
        return (
          <ScrollView contentContainerStyle={styles.wrap}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={() => init()}/>}>
            
            {renderHeader()}
          
          </ScrollView>
        )
      }
    }
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      {renderDemands()}

      <Footer navigation={navigation} style={{bottom:0}} selected='demandas'/>
    </>
  );
}

const size = Dimensions.get('screen');

const styles= StyleSheet.create({
  wrap:{
    height:size.height + 70,
    width:size.width,
    backgroundColor:'#fafafa',
    padding:20,
    marginBottom:50
  },
  content:{
    marginBottom:120
  },
  title:{
    fontSize:18,
    fontFamily:"Montserrat-Bold",
    marginTop:30,
    marginBottom:20,
  },
  demandTitle:{
    fontSize:18,
    marginBottom:10
  },
});

export default DemandaScreen;