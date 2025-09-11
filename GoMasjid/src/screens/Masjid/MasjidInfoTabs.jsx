import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import PrayerTimes from './PrayerTimes';
import Events from './Events';
import Facilities from './Facilities';
import { themeFont } from '../../styles/theme';

const MasjidInfoTabs = ({navigation, masjidInfo, eventsData,type}: any) => {
  const [displayType, setDisplayType] = useState('facilities');
  return (
    <View style={styles.container}>
      <View style={styles.settingCenteredView}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              displayType === 'facilities' && styles.activeTabButton,
            ]}
            onPress={() => setDisplayType('facilities')}>
            <Text
              style={[
                styles.tabButtonText,
                displayType === 'facilities' && styles.activeTabButtonText,
              ]}>
              Facilities
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              displayType === 'times' && styles.activeTabButton,
            ]}
            onPress={() => setDisplayType('times')}>
            <Text
              style={[
                styles.tabButtonText,
                displayType === 'times' && styles.activeTabButtonText,
              ]}>
              Salah Times
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              displayType === 'events' && styles.activeTabButton,
            ]}
            onPress={() => setDisplayType('events')}>
            <Text
              style={[
                styles.tabButtonText,
                displayType === 'events' && styles.activeTabButtonText,
              ]}>
              Events
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View>
            {displayType === 'facilities' &&
              (masjidInfo?.masjidfacilities && masjidInfo?.masjidfacilities.length ? (
                <>
                <Facilities masjidInfo={masjidInfo}
                        type={type} />
                        </>
              ) : (
                <View
                  style={{
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#B4B4B4', fontSize: 12,fontFamily:themeFont.englishFont}}>
                    Facilitis data not available
                  </Text>
                </View>
              ))}
            {displayType === 'times' && (
              <View style={{}}>
                {masjidInfo?.PrayerTimes && Object.keys(masjidInfo.PrayerTimes).length > 0 ?  (
                  <PrayerTimes
                    PrayerTimingsData={masjidInfo?.PrayerTimes}
                    type={type}
                    handleSubmit={() => {}}
                    navigation={navigation}
                  />
                ) : (
                  <View
                    style={{
                      height: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#B4B4B4', fontSize: 12,fontFamily:themeFont.englishFont}}>
                      Salah times not Available
                    </Text>
                  </View>
                )}
              </View>
            )}
            {displayType === 'events' &&
              (eventsData && eventsData.length ? (
                <View style={{marginTop: 10}}>
                  <Events eventsData={eventsData}
                  type={type} />
                </View>
              ) : (
                <View
                  style={{
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#B4B4B4', fontSize: 12,fontFamily:themeFont.englishFont}}>
                    No Events
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  linearGradient: {
    borderRadius: 10,
    overflow: 'hidden', // Ensure the gradient stays within its container
  },
  facilityImage: {
    height: 54,
    width: 54,
    alignSelf: 'center',
  },
  facilityText: {
    fontSize: 10,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: themeFont.englishFont
  },

  Cards: {
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 15
  },

  CardsFooter: {
    width: '100%',
    height: 70,
    borderRadius: 15,
    shadowColor: '#000',
    padding: 20,
    marginTop: 15,
  },
  TextHeader: {
    alignSelf: 'center',
    fontFamily: themeFont.englishFont,
    fontSize: 19,
    fontWeight: '700',
    color: '#202020',
    marginBottom: 10,
    marginTop: 10,
  },
  Text: {
    fontFamily: themeFont.englishFont,
    fontWeight: '600',
    fontSize: 14,
    color: '#202020',
  },
  settingItemContainer: {
    paddingTop: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  settingCenteredView: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',i
    width: '100%',
    // paddingLeft: 10,
    paddingHorizontal: 10,
    // height: 300,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },

  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width:'100%',
    flexWrap:'wrap',
    gap: 20
  },
  tabButton: {
    // paddingHorizontal: 20,
    paddingTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    // borderRadius: 28,
  },
  activeTabButton: {
    borderBottomColor: '#FFFFFF1A',
    paddingVertical: 4,
    borderBottomWidth: 1.15,
  },
  tabButtonText: {
    color: '#B5B5B5',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 23.06,
    fontFamily: themeFont.englishFont
  },
  activeTabButtonText: {
    color: '#3DC8B2', 
    fontWeight: '700',
    fontFamily: themeFont.englishFont
  },
});

export default MasjidInfoTabs;
