import React, {useState} from 'react';
import {Text, View, FlatList, ImageSourcePropType} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themeFont } from '../../styles/theme';


const getIconName = (prayerName: string): string => {
  switch (prayerName) {
    case 'Fajr':
      return 'sunrise';
    case 'Zuhr':
      return 'sun';
    case 'Asr':
      return 'partly-sunny-outline';
    case 'Maghrib':
      return 'sunset';
    case 'Isha':
      return 'moon';
    default:
      return 'circle';
  }
};

const renderHeader = (type: string) => (
  <View style={styles.headerContainer}>
    <Text style={[styles.headerText, {flex: 1.5,color: type === 'unclaimed' ? '#000' : '#fff'}]}>Prayer</Text>
    <Text style={[styles.headerText,{color: type === 'unclaimed' ? '#000' : '#fff'}]}>Adhan</Text>
    <Text style={[styles.headerText,{color: type === 'unclaimed' ? '#000' : '#fff'}]}>Iqamah</Text>
  </View>
);

interface PrayerTimingsProps {
  navigation: any;
  PrayerTimingsData: {
    [key: string]: {
      Adhan: string;
      Jamaah: string;
    };
  };
  type:string;
}

const PrayerTimes: React.FunctionComponent<PrayerTimingsProps> = props => {
  const {PrayerTimingsData,type, navigation} = props;
  const [nextPrayer, setNextPrayer] = useState(0);
  
  React.useEffect(() => {
    const prayers = Object.entries(PrayerTimingsData)
      .filter(([name]) => name !== 'Sunrise' && name !== 'Jumuah')
      .map(([name, times]) => ({
        name,
        time: typeof times === 'object' ? times.Adhan : '',
      }));
  
    const now = moment();
    const nextPrayerIndex = prayers.findIndex((prayer) => {
      const prayerTime = moment(prayer.time, 'h:mm A');
      return now.isBefore(prayerTime);
    });
  
    setNextPrayer(nextPrayerIndex === -1 ? 0 : nextPrayerIndex);
  }, [navigation]);
  
  const renderItem = ({item}: {item: [string, {Adhan: string, Jamaah: string}]}) => {
    const prayerName = item[0];
    const times = item[1];

    if (prayerName === 'Sunrise' || prayerName === 'Jumuah') return null;
  
    const index = Object.keys(PrayerTimingsData)
      .filter(name => name !== 'Sunrise' && name !== 'Jumuah')
      .indexOf(prayerName);
  
    return (
      <View style={styles.rowContainer}>
        <View style={[styles.cell, {flexDirection: 'row', gap: 10, flex: 1.5}]}>
          {prayerName === 'Asr' ? 
            <Ionicons 
            name={getIconName(prayerName)}
              size={16}
              color={index === nextPrayer ? '#3DC8B2' : '#B5B5B5'}
              /> :
            <Feather
            name={getIconName(prayerName)}
            size={16}
            color={index === nextPrayer ? '#3DC8B2' : '#B5B5B5'}
          />
          }
          <Text
            style={[
              styles.cell,
              {color: index === nextPrayer ? '#3DC8B2' : '#282828'},
              {fontSize: index === nextPrayer ? 14 : 13},
              // {fontSize: 13},
              {fontWeight: index === nextPrayer ? '600' : '500'},
            ]}>
            {prayerName}
          </Text>
        </View>
        <Text
          style={[
            styles.cell,
            {color: index === nextPrayer ? '#3DC8B2' : '#B5B5B5'},
            {fontSize: index === nextPrayer ? 14 : 13},
            {fontWeight: index === nextPrayer ? '600' : '500'},
          ]}>
          {moment(times.Adhan, "HH:mm").format("hh:mm A")}
        </Text>
        <Text
          style={[
            styles.cell,
            {color: index === nextPrayer ? '#3DC8B2' : '#B5B5B5'},
            {fontSize: index === nextPrayer ? 14 : 13},
            {fontWeight: index === nextPrayer ? '600' : '500'},
          ]}>
          {moment(times.Jamaah, "HH:mm").format("hh:mm A")}
        </Text>
      </View>
    );
  };

  // Filter out Sunrise and Jumuah before passing to FlatList
  const filteredData = Object.entries(PrayerTimingsData).filter(
    ([name]) => name !== 'Sunrise' && name !== 'Jumuah'
  );

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {renderHeader(type)}
        <View>
          {filteredData.map((item, index) => (
            <React.Fragment key={item[0]}>
              {renderItem({item})}
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
};

export default PrayerTimes;

const styles = StyleSheet.create({
  outerContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  container: {
    marginLeft: 35,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 15,
    height: 400,
    // borderColor: '#c1c1c1',
    // borderWidth: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    marginLeft: 15,
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 15,
    fontFamily: themeFont.englishFont,
    color: '#000'
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#B5B5B5',
    fontFamily: themeFont.englishFont
  },
});