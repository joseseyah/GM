import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { themeFont } from '../styles/theme';
import { UserContext } from '../context/UserProvider';

const ProfileConversation = ({profile}: any) => {
  const { userInfo } = useContext(UserContext);
  console.log(profile, "profile")
  
  return (
    <View style={styles.scrollContainer}>
      {profile && (
        <View style={{alignItems:'center'}}>
          {(profile.img) ? (
          <Image
            source={{ uri: profile.img, cache: 'force-cache' }}
            style={{
              width: 72,
              height: 72,
              alignSelf: 'center',
              backgroundColor: '#FFF',
              marginTop: 5,
              borderRadius: 50,
            }}
            resizeMode="cover"
          />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profilePlaceholderText}>
                {profile?.name?.charAt(0) || 'A'}
              </Text>
            </View>
          )}
          <Text
            style={{
              alignSelf: 'center',
              color: '#282828',
              fontSize: 20,
              marginTop: 10,
              fontWeight: Platform.OS === 'ios' ? '600' : '700',
              fontFamily: themeFont.englishFont,
              lineHeight: 25,
            }}>{userInfo.role === 'imam' ? '' : 'Imam '}{profile.name}</Text>
          <Text
            style={{
              alignSelf: 'center',
              color: '#727272',
              fontSize: 10,
              fontWeight: Platform.OS === 'ios' ? '400' : '600',
              fontFamily: themeFont.englishFont,
              lineHeight: 11.7,
              marginTop: 6,
            }}>
            {profile.masjid_name}
          </Text>
        </View>
      )}
      {userInfo.role === 'regular' && (
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginRight: 20
        }}>
        <Image
          source={require('../assets/images/lightBulb.png')}
          style={{width: 22.27, height: 20.97}}
        />
        <Text style={styles.caution}>
          Keep your questions precise and clear. Refrain from using any foul language.
        </Text>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  caution: {
    fontFamily: themeFont.englishFont,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 13.18,
    color: '#C7C7C7',
  },
  profilePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 50,
    backgroundColor: '#8353ec',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  profilePlaceholderText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    fontFamily: themeFont.englishFont,
  },
});

export default ProfileConversation;