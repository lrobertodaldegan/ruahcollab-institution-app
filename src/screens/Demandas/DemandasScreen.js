import {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  FlatList,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';
import DemandaCard from '../../components/DemandaCard';
import Label from '../../components/Label';
import Loader from '../../components/Loader';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Icon from '../../components/Icon';
import {get} from '../../service/Rest/RestService';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';

const DemandaScreen = ({navigation}) => {
  const [demands, setDemands] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  const init = () => {
    setLoading(true);
    setDemands([]);

    get('/demand/institution', () => navigation.navigate('login'))
    .then(response => {
      if(response.status === 200)
        setDemands(response.data);

      setLoading(false);
    }).catch(err => {console.log(err); navigation.navigate('error');});
  }

  useEffect(() => {
    init();
  }, [isFocused]);

  const renderHeader = () => {
    return (
      <>
        <Header navigation={navigation}/>

        <View style={styles.demandHeader}>
          <Label style={styles.title} value='Demandas'/>

          <TouchableHighlight underlayColor='#fafafa' 
              onPress={() => navigation.navigate('novademanda')}>
            <Icon icon={faFileCirclePlus} size={25} style={styles.dhIcon}/>
          </TouchableHighlight>
        </View>
      </>
    )
  }

  const renderDemands = () => {
    if(loading){
      return <Loader color='#8A4A20'/>
    } else {
      if(demands && demands.length > 0){
        return (
          <FlatList 
            contentContainerStyle={styles.wrap}
            ListHeaderComponent={renderHeader()}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={() => init()}/>
            }
            keyExtractor={(item) => item._id ? item._id : item.id}
            data={demands}
            renderItem={({item}) => {
              return (
                <DemandaCard navigation={navigation} item={item}
                    onDelete={() => init()}/>
              )
            }}
          />
        )
      } else {
        return (
          <ScrollView contentContainerStyle={styles.wrap}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={() => init()}/>}>
            
            {renderHeader()}
            
            <Label value='Suas demandas aparecerão aqui'/>
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
  demandHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  dhIcon: {
    color:'#8A4A20',
  },
});

export default DemandaScreen;