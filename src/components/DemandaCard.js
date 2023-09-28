import {useState, useEffect} from 'react';
import{
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import { 
  faCalendarDays, 
} from '@fortawesome/free-solid-svg-icons'
import Label from './Label';
import DetalheDemandaLabel from './DetalheDemandaLabel';
import Button from './Button';
import { del } from '../service/Rest/RestService';

const DemandaCard = ({item, navigation, onDelete=()=>null}) => {

  const getDemand = () => {
    if(item.demand){
      return item.demand;//item == subscription
    } else {
      return item;//item == demand
    }
  }

  const handleDelete = () => {
    del(`/demand/${getDemand().id}`, () => navigation.navigate('error'))
    .then(response => {
      if(response.status === 200)
        onDelete();
    });
  }

  return (
    <View style={styles.wrap}>
      <Label value={getDemand().title} style={styles.title}/>

      <Label value={getDemand().resume} style={styles.desc}/>

      <View style={styles.instituicaoWrap}>
        <DetalheDemandaLabel label={getDemand().recurrence} 
            icon={faCalendarDays}/>
      </View>

      <View style={styles.btnsWrap}>
        <Button style={[styles.btn, styles.btnLight]} 
            label={`Voluntários (${item.subscriptions})`}
            labelStyle={styles.lightBtnLbl}
            onPress={() => navigation.navigate('demanda', {demandId:getDemand().id})}/>

        <Button style={[styles.btn]} label='Apagar demanda'
            onPress={() => handleDelete()}/>
      </View>
    </View>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    width:size.width - 40,
    minHeight: (size.height / 4 ) - 20,
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
    marginVertical:5,

  },
  instituicaoWrap:{
    marginVertical:10
  },
  btnsWrap:{
    flexDirection:'row'
  },
  btn:{
    width: (size.width * 0.5) - 40,
    marginTop:20
  },
  btnLight:{
    backgroundColor:'#FCF3ED'
  },
  lightBtnLbl:{
    color:'#8A4A20'
  }
});

export default DemandaCard;