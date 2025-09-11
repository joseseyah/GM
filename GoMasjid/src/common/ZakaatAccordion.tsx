import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const ZakaatAccordion = ({title, children}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleAccordion} style={styles.CardNameOne}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          {title}
        </View>
        {/* <Entypo
          name="controller-play"
          size={25}
          color="#8352EC"
          style={{marginRight: 5}}
        /> */}
        <Entypo
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#3DC8B2"
        />
      </TouchableOpacity>
      {isOpen && <View>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  CardNameOne: {
    width: '100%',
    paddingRight: 10,
    marginVertical: 5,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextInside: {
    color: '#666161',
    fontSize: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
export default ZakaatAccordion;
