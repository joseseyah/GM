// navigation/BottomTabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTabNavigation } from '../context/TabNavigationContext';

// Import your screens
import ExploreScreen from '../screens/ExploreScreens/ExploreScreen';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreens/ProfileScreen';
import Masjid from '../screens/Masjid/Masjid';
import QuranDashboard from '../screens/QuranScreens/QuranDashboard';
import { MasjidStack, QuranStack } from './AppStack';
import useSidebar from '../hooks/useSidebar';
import { useFocusEffect } from '@react-navigation/native';
import { useSidebarVisibility } from '../context/SidebarContext';

// Create a placeholder for screens we don't have yet
const PlaceholderScreen = ({ name }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 20 }}>{name} Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

// Custom TabBar component
const CustomTabBar = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  const { activeTab, setActiveTab, showBottomTab } = useTabNavigation();

  if (!showBottomTab) return null;

  const iconMap = {
    PrayerTimes: { name: 'moon', label: 'Prayer times' },
    Mosques: { name: 'mosque', label: 'Mosques' },
    Quran: { name: 'book', label: 'Quran' },
    Profile: { name: 'smile', label: 'Profile' },
  };

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { name } = route;
        const icon = iconMap[name]?.name;
        const label = iconMap[name]?.label;
        const color = isFocused ? '#173C85' : '#BFBFC4';

        return (
          <TouchableOpacity
            key={name}
            style={styles.tabItem}
            onPress={() => {
              const event = navigation.emit({ type: 'tabPress', target: route.key });
              if (!isFocused && !event.defaultPrevented) {
                setActiveTab(name);
                navigation.navigate(name);
              }
            }}
          >
            <FontAwesome5 name={icon} size={22} color={color} solid />
            <Text style={[styles.label, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


const BottomTabNavigator = () => {
  const { setShowBottomTab, setActiveTab } = useTabNavigation();
  const { isVisible } = useSidebarVisibility();

  // Show the tab bar when this component is mounted
  // and hide it when unmounted
  useEffect(() => {
    setShowBottomTab(true);
    
    return () => {
      setShowBottomTab(false);
    };
  }, []);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      console.log('Keyboard opened');
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // Keyboard is closed
      console.log('Keyboard closed');
    });

    return () => {
      // Cleanup listeners on unmount
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
    
  }, []);

 useEffect(() => {
    console.log('Sidebar visibility in bottom bar:', isVisible);
  }, [isVisible]);

  return (
    <Tab.Navigator
      tabBar={props => (
        <CustomTabBar
          {...props}
          style={{ display: isKeyboardVisible || isVisible ? 'none' : 'flex' }}
        />
      )}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="PrayerTimes"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Prayer times',
          tabBarIcon: ({ focused }) => (
            <PrayerTimesIcon color={focused ? '#173C85' : '#C7C7C7'} size={30} />
          ),
        }}
        listeners={{
          tabPress: () => {
            setActiveTab('PrayerTimes');
          },
        }}
      />

      <Tab.Screen
        name="Mosques"
        component={MasjidStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <MosquesIcon color={focused ? '#173C85' : '#C7C7C7'} size={30} />
          ),
        }}
        listeners={{
          tabPress: () => {
            setActiveTab('Mosques');
          },
        }}
      />
      <Tab.Screen
        name="Quran"
        component={QuranStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <QuranIcon color={focused ? '#173C85' : '#C7C7C7'} size={30} />
          ),
        }}
        listeners={{
          tabPress: () => {
            setActiveTab('Quran');
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileIcon color={focused ? '#173C85' : '#C7C7C7'} size={30} />
          ),
        }}
        listeners={{
          tabPress: () => {
            setActiveTab('Profile');
          },
        }}
      />
    </Tab.Navigator>
  );
  
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderTopColor: '#DADADA',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
    height: Platform.OS === 'ios' ? 80 : 70,
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
    backgroundColor: '#173C85',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
  scrollContainer: {
    paddingBottom: 100, // 👈 this gives room for the nav bar
  },
  
});

export default BottomTabNavigator;