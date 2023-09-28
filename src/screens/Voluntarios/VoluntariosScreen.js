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
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Label from '../../components/Label';
import Loader from '../../components/Loader';
import VolunteerCard from '../../components/VolunteerCard';
import { get } from '../../service/Rest/RestService';

const VoluntariosScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [inscricoes, setInscricoes] = useState([]);
  const [subtitle, setSubtitle] = useState('Há voluntários disponíveis!');

  const init = () => {
    setLoading(true);
    setInscricoes([]);

    get('/subscription/institution', () => navigation.navigate('error')).then(response => {
      if(response.status === 200){
        setInscricoes(response.data);

        if(response.data.length < 1)
          setSubtitle('Voluntários');
      }

      setLoading(false);
    });
  }

  useEffect(() => {
    init();
  }, []);

  const renderHeader = () => {
    return (
      <>
        <Header navigation={navigation}/>

        <Label style={styles.title}
            value={subtitle}/>
      </>
    )
  }

  const renderSubs = () => {
    if(loading){
      return <Loader color='#8A4A20'/>
    } else {
      if(inscricoes && inscricoes.length > 0){
        return (
          <FlatList
              contentContainerStyle={styles.wrap}
              ListHeaderComponent={renderHeader()}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={() => init()}/>
              }
              keyExtractor={(item) => item.id ? item.id : item._id}
              data={inscricoes}
              renderItem={({item}) => {
                if(item)
                  return <VolunteerCard item={item}/>
                else
                  return <></>
              }}
          />
        )
      } else {
        return (
          <ScrollView contentContainerStyle={styles.wrap}
              refreshControl={<RefreshControl refreshing={loading} onRefresh={() => init()}/>}>
            {renderHeader()}
            <Label value='Quando os voluntários se escreverem em suas demandas, serão listados aqui para sua aprovação.'/>
          </ScrollView>
        )
      }
    }
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      {renderSubs()}

      <Footer navigation={navigation} style={{bottom:0}} selected='voluntarios'/>
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
  title:{
    fontSize:18,
    fontFamily:"Montserrat-Bold",
    marginTop:30,
    marginBottom:20,
  },
});

export default VoluntariosScreen;