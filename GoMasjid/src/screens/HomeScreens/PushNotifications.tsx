import { Alert, Platform, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AzanModal from './AzanModal';
import { themeFont } from '../../styles/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../../context/UserProvider';
import { notificationUpdate } from '../../services/api';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from "react-native-push-notification";
import { useNavigation } from '@react-navigation/native';
// import { s } from 'react-native-size-matters';

const PushNotifications = ({modalVisible, PrayerTimingsData, setModalVisible, onSwitchesChange}: any) => {
  const [switches, setSwitches] = useState<Record<string, boolean>>({
    fajr: false,
    zuhr: false,
    asr: false,
    maghrib: false,
    isha: false,
  });
  const navigation = useNavigation();
  const { userInfo } = useContext(UserContext);

  const saveSwitchesToStorage = async (
    updatedSwitches: Record<string, boolean>,
  ) => {
    try {
      await AsyncStorage.setItem('azan_notification', JSON.stringify(updatedSwitches));
    } catch (error) {
      console.error('Failed to save switches to storage', error);
    }
  };

  const toggleSwitch = async (name: string) => {
    // if(userInfo?.userId) {
      setSwitches(prevState => {
        const updatedSwitches = {
          ...prevState,
          [name]: !prevState[name],
        };
        
        saveSwitchesToStorage(updatedSwitches);
        onSwitchesChange(updatedSwitches);
       
        const prayer = PrayerTimingsData.find((p: { name: string; }) => p.name === name);
        // console.log('Prayer:', prayer);
        // if (prayer) {
        //   if (updatedSwitches[name]) {
        //     scheduleNotification(prayer);
        //   } else {
        //     cancelNotificationsForPrayer(prayer);
        //   }
        // }
        notificationAPI(updatedSwitches);
        return updatedSwitches;
      });
    // }
  };

  const notificationAPI = async (salah_notf: { [x: string]: boolean; }) => {
   let data = {
      announcements: userInfo?.notifications_meta?.announcements ? userInfo?.notifications_meta?.announcements : false,
      events: userInfo?.notifications_meta?.events ? userInfo?.notifications_meta?.events  : false,
      azan: userInfo?.notifications_meta?.azan ? userInfo?.notifications_meta?.azan  : false,
      app_update: userInfo?.notifications_meta?.app_update ? userInfo?.notifications_meta?.app_update  : false,
      notify_salah: salah_notf
    };

    const update = await notificationUpdate(data, userInfo?.userToken, userInfo?.deviceToken);
    // console.log("update",update)
  }

  useEffect(() => {
    // Configure push notifications
    PushNotification.configure({
      onNotification: function (notification) {
        // console.log('Notification received in foreground:', notification);
        // Alert.alert('Prayer Time', typeof notification.message === 'string' ? notification.message : JSON.stringify(notification.message));
        const data = notification.data;
        if (data.type === 'quran') {
          navigation.navigate('QuranStack', { screen: 'QuranDashboard' });
        } else if (data.type === 'dua') {
          navigation.navigate('DuaStack', { screen: 'DuaDashboard'});
        } else if (data.type === 'event') {
          navigation.navigate('EventsStack', { screen: 'EventDashboard'});
        } else if (data.type === 'announcement') {
          navigation.navigate('PagesStack', { screen: 'userAnnouncement' });
        } else if (data.type === 'askimam') {
          navigation.navigate('AskImaamStack', { screen: 'AskImamDashboard'});
        } else if (data.type === 'masjid') {
          navigation.navigate('MasjidStack', { screen: 'Masjid'});
        } else if (data.type === 'imam') {
          navigation.navigate('ImamDashboardStack');
        } else {
          // home
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
    // console.log('PushNotification configured');

    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'adhan_time',
          channelName: 'goMasjid Notifications',
          channelDescription: 'Notifications for prayer times',
          playSound: true,
          soundName: 'adhan.mp3',
          importance: Importance.HIGH,
          vibrate: true,
        },
        // created => console.log(`createChannel returned '${created}'`),
      );

      PushNotification.createChannel(
        {
          channelId: 'gomasjid_notifications',
          channelName: 'GoMasjid Notifications',
          channelDescription: 'GoMasjid Notifications',
          playSound: true,
          soundName: 'default',
          importance: Importance.HIGH,
          vibrate: true,
        },
        created => console.log(`createChannel returned '${created}'`),
      );
    }

    PushNotification.checkPermissions(permission => {
      console.log('Notification permissions:', permission);
    });

    if (Platform.OS === 'ios') {
      PushNotificationIOS.requestPermissions();
    }
  }, []);

  useEffect(() => {
    const loadSwitchesFromStorage = async () => {
      try {
        const storedSwitches = await AsyncStorage.getItem('azan_notification');
        if (storedSwitches) {
          const parsedSwitches = JSON.parse(storedSwitches);
          setSwitches(parsedSwitches);
          onSwitchesChange(parsedSwitches);
          // console.log('Loaded switches from storage:', parsedSwitches);
        }
      } catch (error) {
        console.error('Failed to load switches from storage', error);
      }
    };

    loadSwitchesFromStorage();

    // Update notifications when PrayerTimingsData changes
    // PrayerTimingsData.forEach((prayer: { name: any; azan: any; iqama: any; }) => {
    //   if (switches[prayer.name]) {
    //     scheduleNotification(prayer); // Reschedule notifications for enabled prayers
    //   }
    // });
  }, []); 

  useEffect(() => {
    onSwitchesChange(switches);
  }, []);

  return (
    <>

      {/* Adhaan Modal */}
      {modalVisible && (
        <AzanModal setModalVisible={setModalVisible}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: '600',
                lineHeight: 17.6,
                fontFamily: themeFont.englishFont,
                color: '#282828',
                marginBottom: 10,
              }}>
              Set Adhaan
            </Text>
          </View>
          <View style={{}}>
            {Object.entries(switches).map(([name, isEnabled]) => (
              <View
                key={name}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    flex: 1,
                    color: '#282828',
                    fontSize: 13,
                    fontWeight: '500',
                    lineHeight: 15.25,
                    fontFamily: themeFont.englishFont,
                  }}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                  }}>
                  <MaterialCommunityIcons
                    name={isEnabled ? 'bell-ring' : 'bell-off-outline'}
                    color="#C7C7C7"
                    size={18}
                  />
                  <Switch
                    trackColor={{
                      false: '#474747',
                      true: '#3DC8B2',
                    }}
                    ios_backgroundColor="#474747"
                    thumbColor="#F3F3F3"
                    onValueChange={() => toggleSwitch(name)}
                    value={switches[name]}
                    style={styles.switch}
                  />
                </View>
              </View>
            ))}
          </View>
        </AzanModal>
      )}
    </>
  )
};

export default PushNotifications;

const styles = StyleSheet.create({
  switch: {
    transform: [{scale: Platform.OS === 'ios' ? 0.6 : 1}],
    borderRadius: 35,
  },
});