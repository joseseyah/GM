import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SettingsContext } from '../context/SettingsProvider';
import Player from './Player';

type Props = {
  tafseer: any;
  metaData: any;
  trackChange: any;
  type: any;
  settingsModal: any;
};

const Footer = ({
  metaData,
  trackChange,
  tafseer,
  type,
  settingsModal,
}: Props) => {
  const [viewHeight, setViewHeight] = useState(0);
  const { settings } = useContext(SettingsContext);

  const handleLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  const [isButtonDisabled, setButtonDisabled] = useState(false);

  return (
    <View
      style={[
        styles.footerContainer,
        {
          backgroundColor:
            settings?.font?.theme === 'light' ? '#ffffff' : '#202020',
        },
      ]}
      onLayout={handleLayout}>
      
      {/* Book icon */}
      <TouchableOpacity style={styles.footerItem} onPress={() => tafseer()}>
        <MaterialIcons name="menu-book" size={24} color="#223F7A" />
      </TouchableOpacity>

      {/* Player component remains centered */}
      <Player
        metaData={metaData}
        type={type}
        trackChange={(id: any) => trackChange(id)}
      />

      {/* Settings icon */}
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => settingsModal()}>
        <Ionicons name="settings-sharp" size={22} color="#223F7A" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    backgroundColor: '#F3F3F3',
    marginBottom: 70,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
  },
  scrollContainer: {
    backgroundColor: '#fff',
    marginBottom: 70,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
  },
  footerContainer: {
    paddingTop: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingVertical: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  playFooterItem: {
    width: 53,
    height: 53,
    backgroundColor: '#223F7A',
    borderRadius: 26.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollItemText: {
    color: '#223F7A',
    fontSize: 10,
    marginTop: 5,
  },
  footerItemText: {
    color: '#fff',
    fontSize: 10,
    marginTop: 18,
  },
  audioIconContainer: {
    width: 53,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});

export default Footer;
