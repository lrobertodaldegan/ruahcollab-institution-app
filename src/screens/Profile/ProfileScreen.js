import {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Label from '../../components/Label';
import ErrorLabel from '../../components/ErrorLabel';
import {get, put} from '../../service/Rest/RestService';
import CacheService from '../../service/Cache/CacheService';

const ProfileScreen = ({navigation}) => {
  const [nome, setNome] = useState(null);
  const [email, setEmail] = useState(null);
  const [contactEmail, setContactEmail] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [telefone2, setTelefone2] = useState(null);
  const [resumo, setResumo] = useState(null);
  const [senha, setSenha] = useState(null);
  const [site, setSite] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [btnLbl, setBtnLbl] = useState('Salvar');

  useEffect(() => {
    get('/user', () => navigation.navigate('login')).then(response => {
      if(response.status == 200){
        let user = response.data;

        setTelefone(user.phone);
        setResumo(user.resume);
        setNome(user.name);
        setEmail(user.email);
        setTelefone2(user.contactPhone);
        setContactEmail(user.contactEmail);
        setSite(user.site);
        setEndereco(user.address);
        setZipcode(user.zipcode);

      }
    }).catch(err => {console.log(err); navigation.navigate('error');});
  }, []);

  const renderError = () => {
    if(errorMsg && errorMsg !== null)
      return <ErrorLabel value={errorMsg} style={styles.lblError}/>
    else
      return <></>
  }

  const handleSubmit = async () => {
    if(nome && nome != null
            && email && email != null
            && telefone && telefone != null
            && resumo && resumo != null
            && endereco && endereco != null){
      
      setErrorMsg(null);

      let body = {
        name: nome,
        phone: telefone,
        site: site,
        contactEmail: contactEmail,
        contactPhone: telefone2,
        resume: resumo,
        zipcode: zipcode,
        address: endereco
      }

      if(senha && senha != null)
        body.password = senha;

      put('/user', body, () => navigation.navigate('login')).then(response => {
        if(response.status == 200)
          setBtnLbl('Salvo!');
      }).catch(err => {console.log(err); navigation.navigate('error');});
    } else {
      setErrorMsg('Preencha todos os campos obrigatórios (*) para continuar!');
    }
  }

  const handleLogout = () => {
    CacheService.wipe('@jwt').then(() => navigation.navigate('welcome'));
  }

  return (
    <>
      <StatusBar backgroundColor='#fafafa' barStyle='dark-content'/>

      <View style={styles.wrap}>
        <Header navigation={navigation}/>

        <ScrollView contentContainerStyle={styles.formWrap}>
          <Label value='Dados da instituição' style={styles.title}/>

          <Label value={`E-mail de acesso ao app:\n${email}`} style={styles.mailInfo}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
            placeholder='Nome da instituição*'
            value={nome} onChangeText={(val) => setNome(val)}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Telefone pra contato (Ex.: 041995429288)*'
              value={telefone} onChangeText={(val) => setTelefone(val)}/>
              
          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Mais um telefone pra contato (opcional)'
              value={telefone2} onChangeText={(val) => setTelefone2(val)}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Email para contato (opcional)'
              value={contactEmail} onChangeText={(val) => setContactEmail(val)}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Nova senha da instituição'
              value={senha} onChangeText={(val) => setSenha(val)}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Informe o site (ou link da rede social) da instituição (opcional)'
              value={site} onChangeText={(val) => setSite(val)}/>

          <TextInput style={styles.txtArea} placeholderTextColor='#b57145'
              placeholder='Nos conte sobre a instituição...*' multiline={true}
              value={resumo} onChangeText={(val) => setResumo(val)}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Informe o endereço da instituição*'
              value={endereco} onChangeText={(val) => setEndereco(val)}/>

          <TextInput style={styles.input} placeholderTextColor='#b57145'
              placeholder='Informe o CEP da instituição (opcional)'
              value={zipcode} onChangeText={(val) => setZipcode(val)}/>

          {renderError()}

          <Button label={btnLbl} onPress={() => handleSubmit()}/>

          <Label value='Caso precise trocar seu e-mail, entre em contato com o nosso time.'
              style={styles.legend}/>
        
          <Button label={"Sair"} onPress={() => handleLogout()}
              style={styles.lightBtn} labelStyle={styles.lightBtnLbl}/>
        
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
  mailInfo:{
    marginVertical: 10
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
    width:size.width - 40,
    height: 150 ,
    paddingHorizontal:10,
    borderColor:'#FCF3ED',
    borderWidth:2,
    fontFamily:'Montserrat-Regular',
    color:'#8A4A20',
    flexShrink:1
  },
  legend:{
    fontSize:12,
    marginBottom:30
  },
  lightBtn: {
    backgroundColor:'#FCF3ED',
    marginBottom:200
  },
  lightBtnLbl: {
    color:'#8A4A20',
  },
});

export default ProfileScreen;