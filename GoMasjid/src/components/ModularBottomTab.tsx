// components/ModularBottomTab.tsx
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useTabNavigation } from '../context/TabNavigationContext';
import { useSidebarVisibility } from '../context/SidebarContext';

// Define SVG icon components
const HomeIcon = ({ color, size = 25 }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
    <Path 
      d="M10.3754 20.9383L10.3754 15.039H14.5284L14.5284 20.9383C14.5284 21.5094 14.9956 21.9766 15.5666 21.9766H18.6813C19.2524 21.9766 19.7196 21.5094 19.7196 20.9383L19.7196 12.9625H21.4846C21.9622 12.9625 22.1906 12.3707 21.8272 12.0592L13.1475 4.24131C12.753 3.88831 12.1508 3.88831 11.7563 4.24131L3.07661 12.0592C2.72361 12.3707 2.94164 12.9625 3.41923 12.9625H5.18424L5.18424 20.9383C5.18424 21.5094 5.65144 21.9766 6.22247 21.9766H9.33719C9.90822 21.9766 10.3754 21.5094 10.3754 20.9383Z" 
      fill={color}
    />
  </Svg>
);

const MosquesIcon = ({ color, size = 25 }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
    <Path 
      d="M12.5488 3.97656C12.7363 3.97656 12.9163 4.06647 13.0288 4.21631C14.3301 5.9507 15.9576 7.02206 18.0351 8.39309C18.2301 8.52045 18.4288 8.65531 18.6351 8.79016C19.7188 9.5094 20.3488 10.7268 20.3488 12.0155C20.3488 13.0868 19.9251 14.057 19.2313 14.765H5.86633C5.17633 14.0533 4.74883 13.0831 4.74883 12.0155C4.74883 10.7268 5.37508 9.5094 6.46258 8.79016C6.66508 8.65531 6.86758 8.5242 7.06258 8.39309C9.14008 7.02206 10.7676 5.9507 12.0688 4.21631C12.1813 4.06647 12.3613 3.97656 12.5488 3.97656ZM8.34883 23.156V20.4589C8.34883 19.9607 7.94758 19.5599 7.44883 19.5599C6.95008 19.5599 6.54883 19.9607 6.54883 20.4589V23.156H4.74883C4.08508 23.156 3.54883 22.6204 3.54883 21.9573V17.1625C3.54883 16.4994 4.08508 15.9637 4.74883 15.9637H20.3488C21.0126 15.9637 21.5488 16.4994 21.5488 17.1625V21.9573C21.5488 22.6204 21.0126 23.156 20.3488 23.156H18.5488V20.4589C18.5488 19.9607 18.1476 19.5599 17.6488 19.5599C17.1501 19.5599 16.7488 19.9607 16.7488 20.4589V23.156H14.3488V20.9834C14.3488 20.2716 14.0338 19.5974 13.4863 19.1403L12.5488 18.3612L11.6113 19.1403C11.0638 19.5974 10.7488 20.2716 10.7488 20.9834V23.156H8.34883Z" 
      fill={color}
    />
  </Svg>
);

const QuranIcon = ({ color, size = 25 }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
    <Path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M21.3694 6.87466C21.3694 6.56798 21.23 6.27793 20.9905 6.08635L20.693 5.84836C20.5608 5.7426 20.365 5.83673 20.365 6.00602V13.2194L12.7316 16.4334L5.09815 13.2194V6.00602C5.09815 5.83673 4.90231 5.7426 4.77011 5.84836L4.47263 6.08635C4.23315 6.27793 4.09375 6.56798 4.09375 6.87466V14.4246L10.7228 17.2369L6.21888 19.0385C5.90597 19.1637 5.70079 19.4667 5.70079 19.8037C5.70079 20.3954 6.30578 20.7944 6.84964 20.5613L12.7316 18.0405L18.6135 20.5613C19.1574 20.7944 19.7623 20.3954 19.7623 19.8037C19.7623 19.4667 19.5572 19.1637 19.2443 19.0385L14.7404 17.2369L21.3694 14.4246V6.87466Z" 
      fill={color}
    />
    <Path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M12.7322 15.4274C14.1384 13.2177 16.7498 13.8203 19.1604 12.2133V5.18252C19.1604 4.98164 18.7586 4.78077 18.5578 4.98164C15.9463 6.99044 12.9331 4.98164 12.5314 8.79835C12.1296 4.98164 9.11642 7.19132 6.50498 4.98164C6.3041 4.78077 5.90234 4.98164 5.90234 5.18252V12.2133C8.3129 13.6195 11.1252 13.2177 12.3305 15.4274H12.7322Z" 
      fill={color}
    />
  </Svg>
);

const ProfileIcon = ({ color, size = 25 }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
    <Path 
      d="M9.82617 9.55551C9.82617 11.253 11.1722 12.6345 12.8262 12.6345C14.4802 12.6345 15.8262 11.253 15.8262 9.55551C15.8262 7.85798 14.4802 6.47656 12.8262 6.47656C11.1722 6.47656 9.82617 7.85798 9.82617 9.55551ZM18.1595 19.4766H18.8262V18.7924C18.8262 16.152 16.7322 14.0029 14.1595 14.0029H11.4928C8.91951 14.0029 6.82617 16.152 6.82617 18.7924V19.4766H18.1595Z" 
      fill={color}
    />
  </Svg>
);

const AddIcon = ({ color = "#FFFFFF", size = 30 }) => (
  <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
    <Path
      d="M12.5 5V20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M5 12.5H20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

type TabType = 'Home' | 'Mosques' | 'Explore' | 'Quran' | 'Profile';

const ModularBottomTab = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { activeTab, setActiveTab, showBottomTab } = useTabNavigation();
  const { isVisible } = useSidebarVisibility();

  // Don't render if bottom tab should be hidden
  if (!showBottomTab) {
    return null;
  }
  
  const navigateToTab = (tab: TabType) => {
    setActiveTab(tab);
    
    // Navigate to the main tabs navigator with the selected tab
    navigation.dispatch(
      CommonActions.navigate({
        name: 'HomeStack', 
        params: {
          screen: 'MainTabs',
          params: {
            screen: tab
          }
        }
      })
    );
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // Keyboard is closed
    });

    return () => {
      // Cleanup listeners on unmount
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
    
  }, []);
  
  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom, display: (isKeyboardVisible || isVisible) ? 'none' : 'flex' }]}>
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => navigateToTab('Home')}
      >
        <HomeIcon color={activeTab === 'Home' ? '#41C4AC' : '#C7C7C7'} />
        <Text style={[styles.label, { color: activeTab === 'Home' ? '#41C4AC' : '#D1D1D6' }]}>
          Home
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => navigateToTab('Mosques')}
      >
        <MosquesIcon color={activeTab === 'Mosques' ? '#41C4AC' : '#C7C7C7'} />
        <Text style={[styles.label, { color: activeTab === 'Mosques' ? '#41C4AC' : '#D1D1D6' }]}>
          Mosques
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.centerTab} 
        onPress={() => navigateToTab('Explore')}
      >
        <View style={styles.exploreButton}>
          <AddIcon color="#FFFFFF" size={30} />
        </View>
        <Text style={[styles.label, { color: activeTab === 'Explore' ? '#41C4AC' : '#D1D1D6' }]}>
          Explore
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => navigateToTab('Quran')}
      >
        <QuranIcon color={activeTab === 'Quran' ? '#41C4AC' : '#C7C7C7'} />
        <Text style={[styles.label, { color: activeTab === 'Quran' ? '#41C4AC' : '#D1D1D6' }]}>
          Quran
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tabItem} 
        onPress={() => navigateToTab('Profile')}
      >
        <ProfileIcon color={activeTab === 'Profile' ? '#41C4AC' : '#C7C7C7'} />
        <Text style={[styles.label, { color: activeTab === 'Profile' ? '#41C4AC' : '#D1D1D6' }]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent', // Change from 'white' to 'transparent' 
    borderTopWidth: 0, // Remove the border
    height: 70,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  centerTab: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: -30,
  },
  exploreButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#41C4AC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default ModularBottomTab;