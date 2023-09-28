import {useState} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Label from '../../components/Label';
import Footer from '../../components/Footer';
import {post} from '../../service/Rest/RestService';
import { faCalendar, faCalendarDay, faCalendarDays, faCalendarWeek, faDiceOne, faDiceThree, faDiceTwo } from '@fortawesome/free-solid-svg-icons';
import TipoDemandaBtn from '../../components/TipoDemandaBtn';

const NovaDemandaScreen = ({navigation}) => {
  const [title, setTitle] = useState(null);
  const [resume, setResume] = useState(null);
  const [recurrence, setRecurrence] = useState('Pontual');

  const handleSubmit = () => {
    let body = {title, resume, recurrence};

    post('/demand', body, ()=>navigation.navigate('error'))
    .then(response => {
      if(response.status === 201)
        navigation.navigate('demandas');
    });
  }

  const handleRecSelection = (val) => {
    if(recurrence === val)
      setRecurrence(null);
    else
      setRecurrence(val);
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Header navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.formWrap}>
          <Label value='Nova demanda' style={styles.title}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
            placeholder='Título da demanda'
            value={title} onChangeText={(val) => setTitle(val)}/>

          <TextInput style={styles.txtArea} placeholderTextColor='#b57145'
              placeholder='Descrição da demanda' multiline={true}
              value={resume} onChangeText={(val) => setResume(val)}/>

          <View style={styles.recOptWrap}>
            <TipoDemandaBtn label={'Pontual'} icon={faCalendar}
                selected={recurrence === 'Pontual'}
                onPress={() => handleRecSelection('Pontual')}/>
            
            <TipoDemandaBtn label={'Diária'} icon={faCalendarDay}
                selected={recurrence === 'Diária'}
                onPress={() => handleRecSelection('Diária')}/>

            <TipoDemandaBtn label={'Semanal'} icon={faCalendarWeek}
                selected={recurrence === 'Semanal'}
                onPress={() => handleRecSelection('Semanal')}/>

            <TipoDemandaBtn label={'Mensal'} icon={faCalendarDays}
                selected={recurrence === 'Mensal'}
                onPress={() => handleRecSelection('Mensal')}/>

            <TipoDemandaBtn label={'Bimestral'} icon={faDiceTwo}
                selected={recurrence === 'Bimestral'}
                onPress={() => handleRecSelection('Bimestral')}/>

            <TipoDemandaBtn label={'Trimestral'} icon={faDiceThree}
                selected={recurrence === 'Trimestral'}
                onPress={() => handleRecSelection('Trimestral')}/>

            <TipoDemandaBtn label={'Anual'} icon={faDiceOne}
                selected={recurrence === 'Anual'}
                onPress={() => handleRecSelection('Anual')}/>
          </View>

          <Button label='Salvar' onPress={() => handleSubmit()}
              style={{marginBottom:300}}/>
        
        </ScrollView>
        
        <Footer navigation={navigation} />

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
  },
  title:{
    fontSize:18,
    fontFamily:"Montserrat-Bold",
    marginTop:30,
    marginBottom:20,
  },
  input:{
    borderRadius:10,
    marginVertical: 5,
    width:size.width - 40,
    height: 50 ,
    paddingHorizontal:10,
    borderColor:'#FCF3ED',
    borderWidth:2,
    fontFamily:'Montserrat-Regular',
    color:'#8A4A20'
  },
  txtArea:{
    borderRadius:10,
    marginVertical: 5,
    marginBottom:20,
    width:size.width - 40,
    height: 150 ,
    paddingHorizontal:10,
    borderColor:'#FCF3ED',
    borderWidth:2,
    fontFamily:'Montserrat-Regular',
    color:'#8A4A20'
  },
  recOptWrap:{
    marginBottom:10
  },
});

export default NovaDemandaScreen;