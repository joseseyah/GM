import { Platform, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../common/Header'
import { themeFont } from '../../styles/theme';
import { UserContext } from '../../context/UserProvider';
import { notificationUpdate } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationSettings = ({navigation}: any) => {
  const { userInfo, updateUserInfo } = useContext(UserContext);
  const [isEnabled, setIsEnabled] = useState(userInfo?.notifications_meta?.announcements && userInfo?.notifications_meta?.events && userInfo?.notifications_meta?.azan && userInfo?.notifications_meta?.app_update);
  const [announcement, setAnnouncement] = useState(userInfo?.notifications_meta?.announcements);
  const [eventAlerts, setEventAlerts] = useState(userInfo?.notifications_meta?.events);
  const [onazaan, setOnazaan] = useState(userInfo?.notifications_meta?.azan);
  const [appUpdates, setAppUpdates] = useState(userInfo?.notifications_meta?.app_update);
  

  const toggleSwitch = () => {
    setIsEnabled(previousState => {
      const newState = !previousState;
      if (newState) {
        // If turning on, enable all notifications
        setAnnouncement(true);
        setEventAlerts(true);
        setOnazaan(true);
        setAppUpdates(true);
      } else {
        // If turning off, disable all notifications
        setAnnouncement(false);
        setEventAlerts(false);
        setOnazaan(false);
        setAppUpdates(false);
      }
      return newState;
    });
    // notificationAPI();
  };

  useEffect(() => {
  const notificationAPI = async () => {
    console.log('Notification API called', appUpdates);
    const defaultNotf = {
      fajr: false,
      zuhr: false,
      asr: false,
      maghrib: false,
      isha: false,
    }
    const salah_notf = await AsyncStorage.getItem('azan_notification');
    
    console.log(salah_notf, "salah")
    let data = {
      announcements: announcement,
      events: eventAlerts,
      azan: onazaan,
      app_update: appUpdates,
      notify_salah: salah_notf ? salah_notf : defaultNotf
    };
    // console.log('Notification data:', data, appUpdates);

    const update = await notificationUpdate(data, userInfo?.userToken, userInfo?.deviceToken);
    if (update) {
      console.log('Notification settings updated successfully');
      updateUserInfo({...userInfo, notifications_meta: data});
      setIsEnabled(data.announcements && data.events && data.azan && data.app_update);
    }
  }
  notificationAPI();
  },[announcement, eventAlerts, onazaan, appUpdates]);

  const toggleAnnouncementSwitch = () => {setAnnouncement(previousState => !previousState); };
  const toggleEventSwitch = () => {setEventAlerts(previousState => !previousState); };
  const toggleAzanSwitch = () => {setOnazaan(previousState => !previousState); };
  const toggleAppUpdateSwitch = () => {setAppUpdates(previousState => !previousState); };

  // useEffect(() => {
  //   setAnnouncement(userInfo?.notifications_meta?.announcements);
  //   setEventAlerts(userInfo?.notifications_meta?.events);
  //   setOnazaan(userInfo?.notifications_meta?.azan);
  //   setAppUpdates(userInfo?.notifications_meta?.app_update);
  //   setIsEnabled(userInfo?.notifications_meta?.announcements && userInfo?.notifications_meta?.events && userInfo?.notifications_meta?.azan && userInfo?.notifications_meta?.app_update);
  // }, [userInfo?.notifications_meta]);

  
  return (
    <View style={styles.maincontainer}>
      <Header title="Notification Settings" onBack={() => navigation.goBack()} titleColor='#000'/>
      <View style={styles.container}>
        <View style={styles.settingItemContainer}>
          <Text style={styles.settingTitle}>Pause all Notifications</Text>
          <Switch
            trackColor={{false: '#C7C7C7', true: '#3DC8B2'}}
            thumbColor={isEnabled ? '#F3F3F3' : '#F3F3F3'}
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </View>
        <View style={styles.infoText}></View>

        <View style={styles.Cards}>
          <View style={styles.settingItemContainer}>
            <Text style={styles.TextInside}>Announcements</Text>
            <Switch
              trackColor={{false: '#C7C7C7', true: '#3DC8B2'}}
              thumbColor={announcement ? '#ffffff' : '#ffffff'}
              onValueChange={toggleAnnouncementSwitch}
              value={announcement}
              // disabled={!isEnabled}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={styles.Cards}>
          <View style={styles.settingItemContainer}>
            <Text style={styles.TextInside}>Event Alerts</Text>
            <Switch
              trackColor={{false: '#C7C7C7', true: '#3DC8B2'}}
              thumbColor={eventAlerts ? '#ffffff' : '#ffffff'}
              onValueChange={toggleEventSwitch}
              value={eventAlerts}
              // disabled={!isEnabled}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={styles.Cards}>
          <View style={styles.settingItemContainer}>
            <Text style={styles.TextInside}>Adhaan</Text>
            <Switch
              trackColor={{false: '#C7C7C7', true: '#3DC8B2'}}
              thumbColor={onazaan ? '#ffffff' : '#ffffff'}
              onValueChange={toggleAzanSwitch}
              value={onazaan}
              // disabled={!isEnabled}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={styles.Cards}>
          <View style={styles.settingItemContainer}>
            <Text style={styles.TextInside}>App Updates</Text>
            <Switch
              trackColor={{false: '#C7C7C7', true: '#3DC8B2'}}
              thumbColor={appUpdates ? '#ffffff' : '#ffffff'}
              onValueChange={toggleAppUpdateSwitch}
              value={appUpdates}
              // disabled={!isEnabled}
              style={styles.switch}
            />
          </View>
        </View>
      </View>
    </View>
  )
};

export default NotificationSettings;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: '#F4F4F4',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  container: {
    paddingHorizontal: 15,
  },
  settingItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  settingTitle: {
    fontWeight: '600',
    fontSize: 15,
    fontFamily: themeFont.englishFont,
    color: "#000"
  },
  infoText: {
    marginTop: 20,
    marginVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#C7C7C7',
  },
  Cards: {
    borderRadius: 15,
    backgroundColor: '#F3F3F3',
    shadowColor: '#000',
    paddingHorizontal:3,
  },
  TextInside: {
    color: 'black',
    fontSize: 14,
    alignSelf: 'center',
  },
  switch: {
    transform: [{scale: 0.75}],
  },
});