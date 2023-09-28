import {
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native';
import Label from './Label';
import Icon from './Icon';

const TipoDemandaBtn = ({label, icon, selected=false, onPress=()=>null}) => {
  return (
    <TouchableHighlight
        onPress={() => onPress()} underlayColor={'#fafafa'}>
          
      <View style={[styles.il, selected === true ? styles.ilSlctd : {}]}>
        <Icon icon={icon} size={selected === true ? 20 : 18} 
            style={[styles.icon, selected === true ? styles.iconSlctd : {}]}/>

        <Label value={label} 
            style={[styles.detail, selected === true ? styles.detailSlctd : {}]}/>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  il:{
    flexDirection:'row',
    marginVertical:4,
    padding:5,
    borderRadius:5,
  },
  ilSlctd:{
    backgroundColor:'#8A4A20'
  },
  icon:{
    color:'#8A4A20',
  },
  iconSlctd:{
    color:'#fafafa',
  },
  detail:{
    color:'#8A4A20',
    fontSize:14,
    marginLeft:10,
    width:'85%'
  },
  detailSlctd:{
    color:'#fafafa',
    fontSize:16,
  },
});

export default TipoDemandaBtn;