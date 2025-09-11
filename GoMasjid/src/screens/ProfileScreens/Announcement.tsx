import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../common/Header'
import { FlatList } from 'react-native-gesture-handler';
import { themeFont } from '../../styles/theme';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../../context/UserProvider';
import { getUserAnnouncements } from '../../services/api';
import { useSidebarVisibility } from '../../context/SidebarContext';

const Announcement = ({navigation}: any) => {
  interface AnnouncementType {
    subject: string;
    body: string;
  }

  const [announcements, setAnnouncement] = useState<AnnouncementType[]>([]);
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { setVisible } = useSidebarVisibility();

  useFocusEffect(
    React.useCallback(() => {
      setLoading(false);
      const fetchUserAnnouncements = async () => {
        const announcement = await getUserAnnouncements(userInfo?.userToken);
        console.log('announcement', announcement.announcements);
        if(!announcement || !announcement.announcements) {
          setLoading(false);
          return;
        }
        setAnnouncement(announcement.announcements);
        setLoading(false);
      };
      fetchUserAnnouncements();
    }, [userInfo?.userId])
  );

  useEffect(() => {
    setVisible(false);
  });

  return (
    <View style={styles.maincontainer}>
      <Header title="Announcements" onBack={() => navigation.goBack()} titleColor='#000'/>
      <View style={styles.container}>
        {announcements.length > 0 ? (
          <FlatList
            data={announcements}
            keyExtractor={(item, index) => `ann-${index}`}
            renderItem={({ item }) => (
              <View style={styles.annContainer}>
                <Text style={styles.title}>{item.subject}</Text>
                <Text style={styles.text}>{item.body}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <Text>No Announcements</Text>
        )}
        <View style={{ marginBottom: 20 }}></View>
      </View>
    </View>
  )
};

export default Announcement;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: '#F4F4F4',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  container: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
    color: '#000',
    fontFamily: themeFont.englishFont,
  },
  text: {
    fontSize: 13,
    color: '#000',
    fontFamily: themeFont.englishFont,
    fontWeight: '400',
  },
  annContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
});