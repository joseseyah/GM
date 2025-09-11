import React from 'react';
import {Text} from 'react-native';
import {View, StyleSheet} from 'react-native';
import { themeFont } from '../styles/theme';

export const EightPointBurst = ({number}: any) => {
  return (
    <View style={styles.eightPointBurst}>
      <View style={styles.eightPointBurst20} />
      <View style={styles.eightPointBurst155} />
      <View style={styles.textContainer}>
        <Text style={styles.textStyles}>{number}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eightPointBurst: {},
  eightPointBurst20: {
    width: 28,
    height: 28,
    backgroundColor: '#3DC8B2',
    borderRadius: 5,
    transform: [{rotate: '20deg'}],
  },
  eightPointBurst155: {
    width: 28,
    height: 28,
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: '#3DC8B2',
    top: 0,
    left: 0,
    transform: [{rotate: '155deg'}],
  },
  textContainer: {
    position: 'absolute',
    top: 0, // Adjust as needed
    left: 0, // Adjust as needed
    width: 28, // Adjust as needed
    height: 28, // Adjust as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyles: {
    fontSize: 9.97,
    fontFamily: themeFont.englishFont,
    fontWeight: '600',
    lineHeight: 11.69,
    textAlign: 'center',
    color: '#4C20AA',
    // fontWeight: 'bold',
  },
});
