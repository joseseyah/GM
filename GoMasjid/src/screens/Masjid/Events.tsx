import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { themeFont } from '../../styles/theme';

type Props = {
  eventsData: any[];
  type: string;
};

const {height, width} = Dimensions.get('window');
const Events = ({eventsData,type}: Props) => {
  const navigation = useNavigation();
  const textColor = type === 'unclaimed' ? '#282828' : '#ffffff';
  const iconColor = type === 'unclaimed' ? '#51c8b2' : '#ffffff';
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{overflow: 'visible'}}>
      {eventsData.map((EventData: any, index: number) => (
        <View style={{marginLeft: 10}} key={`${EventData.id}+${index}`}>
          <LinearGradient
            colors={type === 'unclaimed' ? ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)'] : ['rgba(255, 255, 255, 0.25)', 'rgba(42, 42, 42, 0.15)']}
          
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={[styles.insetShadow,{borderColor: type === 'unclaimed' ? 'rgba(181, 181, 181,0.4)' : 'rgba(255, 255, 255, 0.6)'}]}>
            <View style={styles.container}>
              <Image
                style={{
                  height: height / 9,
                  width: '100%',
                  minWidth: 180,
                  borderRadius: 7.5,
                }}
                resizeMode="cover"
                resizeMethod="resize"
                source={{
                  uri: EventData?.image_url,
                }}
              />
              <View style={{marginVertical: 5}}>
                <Text style={[styles.eventTitle,{color: textColor}]}>{EventData.title}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  marginBottom: 5,
                }}>
                <Text style={styles.DateIdtext}>
                  {EventData?.date &&
                    moment(EventData?.date).format(
                      'Do MMM, YYYY',
                    )}
                </Text>
              </View>
              
              {EventData?.registration ? (
              <TouchableOpacity
                style={styles.Viewbuttontext}
                onPress={() =>
                  navigation.navigate('EventsStack', { screen: 'EventInfo', params: { eventId: EventData.id, isRegister: false } })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.buttonText,{color:iconColor}]}>Register</Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={25}
                    color={iconColor}
                    style={{alignSelf: 'center'}}
                  />
                </View>
              </TouchableOpacity>
              ) :
              <View
                style={styles.Viewbuttontext}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.buttonText}>Registration Closed</Text>
                  {/* <MaterialCommunityIcons
                    name="arrow-right"
                    size={25}
                    color="#fff"
                    style={{alignSelf: 'center'}}
                  /> */}
                </View>
              </View> }
            </View>
          </LinearGradient>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  insetShadow: {
    borderRadius: 15,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 0.8,
  },
  container: {
    marginRight: 2,
    paddingBottom: 10,
    paddingHorizontal: 11,
    paddingVertical: 11,
  },
  eventTitle: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
    marginVertical: 4,
    lineHeight: 15.25,
    color: '#000'
  },
  DateIdtext: {
    color: '#B5B5B5',
    fontSize: 11,
    fontWeight: '500',
    fontFamily: themeFont.englishFont,
    alignSelf: 'center',
    lineHeight: 10.56,
  },
  Viewbuttontext: {
    marginTop: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: themeFont.englishFont,
    lineHeight: 15.25,
    alignSelf: 'center',
    color: '#000',
  },
});

export default Events;
