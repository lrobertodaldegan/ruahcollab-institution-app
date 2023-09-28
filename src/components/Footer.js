import { 
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Icon from "./Icon";
import { faWind, faLungs } from '@fortawesome/free-solid-svg-icons'


const Footer = ({selected='home', style={}, navigation}) => {
  return (
    <View style={[styles.footer,style]}>

      <TouchableHighlight underlayColor='#fafafa' 
          onPress={() => navigation.navigate('voluntarios')}
          style={[styles.footerIconWrap, selected === 'voluntarios'
                                                    ? styles.footerIconWrapSelected 
                                                    : {} ]}>

        <Icon size={22} icon={faWind} 
            style={[styles.footerIcon, selected === 'voluntarios' 
                                                  ? styles.footerIconSelected 
                                                  : {}]} />
      </TouchableHighlight>

      <TouchableHighlight underlayColor='#fafafa'
          onPress={() => navigation.navigate('demandas')}
          style={[styles.footerIconWrap, selected === 'demandas'
                                                  ? styles.footerIconWrapSelected 
                                                  : {} ]}>

        <Icon size={22} icon={faLungs} 
            style={[styles.footerIcon, selected === 'demandas' 
                                                  ? styles.footerIconSelected 
                                                  : {}]} />
      </TouchableHighlight>
    </View>
  );
}

const size = Dimensions.get('screen');

const styles = StyleSheet.create({
  footer:{
    flexDirection:'row',
    position:'absolute',
    bottom:70,
    paddingHorizontal:size.width/4,
    paddingVertical:20,
    width:size.width,
    justifyContent:'space-between',
    backgroundColor:'#fafafa',
  },
  footerIconWrap:{
    borderRadius:5,
    height:40,
    width:40,
    justifyContent:'center',
    alignItems:'center'
  },
  footerIconWrapSelected:{
    backgroundColor:'#8A4A20'
  },
  footerIcon:{
    color:'#8A4A20'
  },
  footerIconSelected:{
    color:'#fafafa'
  },
});

export default Footer;