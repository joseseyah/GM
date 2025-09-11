import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../common/Header'
import Entypo from 'react-native-vector-icons/Entypo';
import { themeFont } from '../../styles/theme';
import { useSidebarVisibility } from '../../context/SidebarContext';

const HelpCenter = ({navigation}: any) => {
  const { setVisible } = useSidebarVisibility();
  useEffect(() => {
    setVisible(false);
  });

  const openPrivacyLink = async () => {
    const url = 'https://gomasjid.co.uk/terms-of-service/';
    await Linking.openURL(url);
    // const supported = await Linking.canOpenURL(url);
    // if (supported) {
    //   await Linking.openURL(url);
    // } else {
    //   // console.log(url);
    // }
  };

  const sendEmail = async () => {
    const email = 'info@gomasjid.co.uk';
    const url = `mailto:${email}`;
    await Linking.openURL(url);
  };

  return (
    <View style={styles.maincontainer}>
      <Header title="Help Center" onBack={() => navigation.goBack()} titleColor='#000'/>
      <View style={styles.container}>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={sendEmail} style={styles.linksCon}>
            {/* onPress={() => navigation.navigate('PagesStack', { screen: 'Support' })} */}
            <Text style={styles.label}>Support</Text>
            <Entypo name="chevron-right" size={30} color='#3DC8B2' />
          </TouchableOpacity>
        </View>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={sendEmail} style={styles.linksCon} >
            <Text style={styles.label}>Contact Us</Text>
            <Entypo name="chevron-right" size={30} color='#3DC8B2' />
          </TouchableOpacity>
        </View>
        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={openPrivacyLink} style={styles.linksCon}>
            <Text style={styles.label}>Terms & Policy</Text>
            <Entypo name="chevron-right" size={30} color='#3DC8B2' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

export default HelpCenter;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: '#F4F4F4',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  container: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  linksContainer: {
    // paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    fontFamily: themeFont.englishFont,
    lineHeight: 20,
  },
  linksCon: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 10
  },
});