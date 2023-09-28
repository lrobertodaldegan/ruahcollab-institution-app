import {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Loader from '../../components/Loader';
import Label from '../../components/Label';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import CacheService from '../../service/Cache/CacheService';
import { post } from '../../service/Rest/RestService';

const WelcomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();

  let devId = DeviceInfo.getDeviceId();

  useEffect(() => {
    setLoading(true);

    CacheService.get('@jwt').then((jwt) => {
      if(jwt && jwt != null){
        console.log('Token encontrado em cache!');

        post('/user/device', {deviceId:devId})
        .then((response) => {
          setLoading(false);
          
          if(response.status === 200){
            if(response.data.valid)
              navigate.navigate('voluntarios');
          }
        })
        .catch((err) => console.log(err));
      } else {
        setLoading(false);
      }
    });
  }, []);

  const load = () => {
    if(loading){
      return <Loader/>
    } else {
      return (
        <View style={styles.btnWrap}>
          <Button label='Cadastrar instituição' 
              style={styles.lightBtn} labelStyle={styles.lightBtnLbl}
              onPress={() => navigate.navigate('primeiroAcesso')}/>
          <Button label='Entrar' onPress={() => navigate.navigate('login')}/>
        </View>
      );
    }
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Logo style={styles.logo} />

        <Label value='Instituições' 
            style={styles.lblInst}/>

        <Label value='Gerando a vida de Cristo através da colaboração' 
            style={styles.lbl}/>

        {load()}
      </View>
    </>
  );
}

const size = Dimensions.get('screen');

const styles= StyleSheet.create({
  wrap:{
    height:size.height,
    width:size.width,
    backgroundColor:'#fafafa',
    padding:20,
    alignItems:'center'
  },
  logo:{
    width:150,
    height:150,
    marginTop:100,
  },
  lbl:{
    fontFamily:'Montserrat-Italic',
    marginVertical:80
  },
  lblInst:{
    marginTop:20,
    fontSize:18
  },
  lightBtn: {
    backgroundColor:'#FCF3ED'
  },
  lightBtnLbl: {
    color:'#8A4A20',
  },
});

export default WelcomeScreen;