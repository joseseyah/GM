import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { themeFont } from '../styles/theme';

const Header = ({onBack, title, titleColor, iconColor = '#282828'}: any) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        onPress={() => onBack()}
        style={{flexDirection: 'row', gap: 20}}>
        <Entypo name="chevron-left" size={30} color={iconColor} />
      </TouchableOpacity>
      <Text style={[styles.topBarHeader, {color: titleColor}]}>{title}</Text>
      <View>
        {/* <SimpleLineIcons name="magnifier" size={20} color="#8352EC" /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    fontFamily: themeFont.englishFont,
    paddingVertical: 15,
    // paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topBarHeader: {
    flex: 1,
    textAlign: 'left',
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    color: '#282828',
    fontSize: 15,
    fontFamily: themeFont.englishFont,
    lineHeight: 17.6,
  },
});
export default Header;
