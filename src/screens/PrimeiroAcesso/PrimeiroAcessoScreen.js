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
import Logo from '../../components/Logo';
import Label from '../../components/Label';
import DeviceInfo from 'react-native-device-info';
import CacheService from '../../service/Cache/CacheService';
import {post} from '../../service/Rest/RestService';

const PrimeiroAcessoScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [contactEmail, setContactEmail] = useState(null);
  const [nome, setNome] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [telefone2, setTelefone2] = useState(null);
  const [resumo, setResumo] = useState(null);
  const [senha, setSenha] = useState(null);
  const [site, setSite] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [zipcode, setZipcode] = useState(null);

  const handleSubmit = () => {
    let deviceId = DeviceInfo.getDeviceId();
    let uniqueId = DeviceInfo.getUniqueIdSync();

    let device = {
      id: deviceId,
      uniqueId: uniqueId,
    }

    let user = {
      name: nome,
      email: email,
      phone: telefone,
      site: site,
      contactEmail: contactEmail,
      contactPhone: telefone2,
      resume: resumo,
      zipcode: zipcode,
      address: endereco
    }

    post('/auth/i/signup', {...user, password:senha, device:device}).then(response => {
      if(response.status == 201){
        handleSignin();
      } else {
        navigation.navigate('error');
      }
    }).catch(err => {
      console.log(err); 
      navigation.navigate('error');
    });
  }

  const handleSignin = () => {
    post('/auth/signin', {email:email, password:senha}).then(response => {
      if(response.status == 200){
        CacheService.register('@jwt', response.data.token)
          .then(() => navigation.navigate('voluntarios'))
          .catch((err) => console.log(err));
      }
    }).catch(err => {console.log(err); navigation.navigate('error');});
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <ScrollView contentContainerStyle={styles.wrap}>
        <Logo style={styles.logo} />

        <Label value='Informe seus dados para cadastro:' style={styles.title}/>

        <TextInput style={styles.input} placeholderTextColor='#b57145'
            placeholder='Nome da instituição'
            value={nome} onChangeText={(val) => setNome(val)}/>

        <TextInput style={styles.input} placeholderTextColor='#b57145'
            placeholder='Telefone pra contato (Ex.: 041995429288)'
            value={telefone} onChangeText={(val) => setTelefone(val)}/>
            
        <TextInput style={styles.input} placeholderTextColor='#b57145'
            placeholder='Mais um telefone pra contato (opcional)'
            value={telefone2} onChangeText={(val) => setTelefone2(val)}/>

        <TextInput style={styles.input} placeholderTextColor='#b57145'
            placeholder='Email para acessar o app'
            value={email} onChangeText={(val) => setEmail(val)}/>

        <TextInput style={styles.input} placeholderTextColor='#b57145'
            placeholder='Email para contato (opcional)'
            value={contactEmail} onChangeText={(val) => setContactEmail(val)}/>

        <TextInput style={styles.input} placeholderTextColor='#b57145'
            placeholder='Senha da instituição'
            value={senha} onChangeText={(val) => setSenha(val)}/>

        <TextInput style={styles.txtArea} placeholderTextColor='#b57145'
            placeholder='Informe o site (ou link da rede social) da instituição (opcional)'
            value={site} onChangeText={(val) => setSite(val)}/>

        <TextInput style={styles.txtArea} placeholderTextColor='#b57145'
            placeholder='Nos conte sobre a instituição...'
            value={resumo} onChangeText={(val) => setResumo(val)}/>

        <TextInput style={styles.txtArea} placeholderTextColor='#b57145'
            placeholder='Informe o endereço da instituição'
            value={endereco} onChangeText={(val) => setEndereco(val)}/>

        <TextInput style={styles.txtArea} placeholderTextColor='#b57145'
            placeholder='Informe o CEP da instituição (opcional)'
            value={zipcode} onChangeText={(val) => setZipcode(val)}/>

        <Button label={'Pronto!'} onPress={() => handleSubmit()}/>

        <Label value='Fique tranquilo(a)! Não compartilharemos seus dados com terceiros.'
            style={styles.legend}/>
      </ScrollView>
    </>
  );
}

const size = Dimensions.get('screen');

const styles= StyleSheet.create({
  wrap:{
    minHeight:size.height,
    width:size.width,
    backgroundColor:'#fafafa',
    padding:20,
    alignItems:'center'
  },
  logo:{
    width:150,
    height:150,
    marginTop:50,
    marginBottom:20
  },
  title:{},
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
  legend:{
    fontSize:12
  },
});

export default PrimeiroAcessoScreen;