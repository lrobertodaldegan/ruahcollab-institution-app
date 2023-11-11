import {useState, useEffect} from 'react';
import{
  StyleSheet,
  Dimensions,
  View,
  Linking,
} from 'react-native';
import { 
  faPhone,
  faEnvelope,
  faScroll,
} from '@fortawesome/free-solid-svg-icons'
import Label from './Label';
import DetalheDemandaLabel from './DetalheDemandaLabel';
import Button from './Button';
import { put } from '../service/Rest/RestService';

const VolunteerCard = ({item, showDemandLbls=true}) => {
  const [btnLbl, setBtnLbl] = useState('Aceitar!');

  useEffect(() => {
    setBtnLbl(item.status === 'pendente' ? 'Aceitar!' : 'ACEITO!');
  }, []);

  const handleAcceptVol = () => {
    if(item.status === 'pendente'){
      setBtnLbl('Aceitando...');

      put(`/subscription/${item.id}`, {}, () => navigation.navigate('error'))
      .then(response => {
        if(response.status === 200)
          setBtnLbl('ACEITO!');
      });
    } else {
      setBtnLbl('ACEITO!');
    }
  }

  const renderInstructions = () => {
    if(btnLbl === 'ACEITO!' || item.status !== 'pendente'){
      return (
        <Label value='Wow! Entre em contato com o voluntário!' 
            style={styles.instructions}/>
      )
    } else {
      return <></>
    }
  }

  const renderDemandsLbls = () => {
    if(showDemandLbls === true){
      return (
        <>
          <Label value='Se voluntariou para sua demanda:' style={styles.desc}/>

          <Label value={item.demand} style={styles.demandTitle}/>
        </>
      )
      } else {
        return <></>
      }
  }

  return (
    <View style={styles.wrap}>
      <Label value={item.voluntair.name} style={styles.title}/>

      {renderDemandsLbls()}
      
      <View style={styles.contactWrap}>
        <DetalheDemandaLabel icon={faPhone} 
            action={async () => await Linking.openURL(`tel:${item.voluntair.phone}`)}
            label={item.voluntair.phone } 
        />

        <DetalheDemandaLabel icon={faEnvelope} 
            action={async () => await Linking.openURL(`mailto:${item.voluntair.email}`)}
            label={item.voluntair.email} 
        />

        <DetalheDemandaLabel icon={faScroll} 
            label={`Sobre o voluntário:\n\n${item.voluntair.resume ? item.voluntair.resume : '' }`} 
        />

        <Button label={btnLbl} style={styles.ruahBtn}
            labelStyle={styles.ruahBtnLbl}
            onPress={() => handleAcceptVol()}/>

        {renderInstructions()}
      </View>
    </View>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    width:size.width - 40,
    minHeight: (size.height /2.7 ),
    backgroundColor:'#8A4A20',
    borderRadius:10,
    marginVertical:10,
    alignItems:'center',
    paddingVertical:20,
    paddingHorizontal:10
  },
  title:{
    color:'#fafafa',
    fontFamily:'Montserrat-Bold',
  },
  desc:{
    color:'#fafafa',
    marginVertical:10,
  },
  demandTitle: {
    fontFamily:'Montserrat-Italic',
    color:'#fafafa',
    marginBottom: 15
  },
  ruahBtn:{
    backgroundColor:'#FCF3ED',
    width:size.width / 2,
    marginLeft: size.width / 7,
    marginTop: 20
  },
  ruahBtnLbl:{
    marginRight:10,
    fontSize:20,
    fontFamily:'Montserrat-Bold',
    color:'#8A4A20'
  },
  instructions:{
    color:'#fafafa',
    fontSize:12,
    textAlign:'center'
  }
});

export default VolunteerCard;