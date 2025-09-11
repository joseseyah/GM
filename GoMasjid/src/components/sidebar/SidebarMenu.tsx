import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../../context/UserProvider';
import { themeFont } from '../../styles/theme';

const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75; // 75% of screen width

interface SidebarMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

// Admin icon SVG component
const AdminIcon = () => (
  <Svg width="17" height="17" viewBox="0 0 17 17" fill="none">
    <Path d="M2.98763 11.7161V11.2828C2.98763 11.0561 3.0943 10.8428 3.26096 10.7428C4.38763 10.0695 5.6743 9.71615 6.98763 9.71615C7.00763 9.71615 7.02096 9.71615 7.04096 9.72281C7.10763 9.25615 7.24096 8.80948 7.4343 8.40281C7.28763 8.38948 7.14096 8.38281 6.98763 8.38281C5.3743 8.38281 3.86763 8.82948 2.58096 9.59615C1.9943 9.94281 1.6543 10.5961 1.6543 11.2828V13.0495H7.82763C7.54763 12.6495 7.32763 12.1961 7.18096 11.7161H2.98763Z" fill="#3DC8B2"/>
    <Path d="M6.98763 7.71615C8.46096 7.71615 9.6543 6.52281 9.6543 5.04948C9.6543 3.57615 8.46096 2.38281 6.98763 2.38281C5.5143 2.38281 4.32096 3.57615 4.32096 5.04948C4.32096 6.52281 5.5143 7.71615 6.98763 7.71615ZM6.98763 3.71615C7.72096 3.71615 8.32096 4.31615 8.32096 5.04948C8.32096 5.78281 7.72096 6.38281 6.98763 6.38281C6.2543 6.38281 5.6543 5.78281 5.6543 5.04948C5.6543 4.31615 6.2543 3.71615 6.98763 3.71615Z" fill="#3DC8B2"/>
    <Path d="M14.1543 10.3828C14.1543 10.2361 14.1343 10.1028 14.1143 9.96281L14.8743 9.28948L14.2076 8.13615L13.241 8.46281C13.0276 8.28281 12.7876 8.14281 12.521 8.04281L12.321 7.04948H10.9876L10.7876 8.04281C10.521 8.14281 10.281 8.28281 10.0676 8.46281L9.10096 8.13615L8.4343 9.28948L9.1943 9.96281C9.1743 10.1028 9.1543 10.2361 9.1543 10.3828C9.1543 10.5295 9.1743 10.6628 9.1943 10.8028L8.4343 11.4761L9.10096 12.6295L10.0676 12.3028C10.281 12.4828 10.521 12.6228 10.7876 12.7228L10.9876 13.7161H12.321L12.521 12.7228C12.7876 12.6228 13.0276 12.4828 13.241 12.3028L14.2076 12.6295L14.8743 11.4761L14.1143 10.8028C14.1343 10.6628 14.1543 10.5295 14.1543 10.3828ZM11.6543 11.7161C10.921 11.7161 10.321 11.1161 10.321 10.3828C10.321 9.64948 10.921 9.04948 11.6543 9.04948C12.3876 9.04948 12.9876 9.64948 12.9876 10.3828C12.9876 11.1161 12.3876 11.7161 11.6543 11.7161Z" fill="#3DC8B2"/>
  </Svg>
);

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isVisible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { userInfo, setIsAuthenticated, setUserInfo } = useContext(UserContext);

  // This effect will run whenever isVisible changes
  useEffect(() => {
    if (isVisible) {
      // Open animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Close animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SIDEBAR_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, slideAnim, fadeAnim]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('isAuthenticated');
      await AsyncStorage.removeItem('Favourite_Masjid');
      
      setUserInfo({
        userId: '',
        userName: '',
        password: '',
        emailAddress: '',
        email: '',
        role: '',
        type: '',
        loginFrom: '',
        photoURL: '',
        phoneNumber: '',
        newAccount: true,
        masjidAdmin: [],
        Imam_Name: '',
        userToken: '',
        masjids: [],
        followedMasjid_id: '',
        FollowedImamId: '',
        followingImamData: [],
        deviceToken: '',
      });
      setIsAuthenticated(false);
      onClose();
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthStack' as never }],
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navigateTo = (screenName: string) => {
    onClose();
    navigation.navigate(screenName as never);
  };

  // const navigateTo = (screenName: string, params: object = {}) => {
  //   onClose();  // Close sidebar
  //   navigation.navigate(screenName as never, params as never);
  // };  

  // Check if user is admin or imam
  const isAdmin = userInfo?.role === 'masjid_admin';
  // || (userInfo?.masjidAdmin && userInfo.masjidAdmin.length > 0);
  const isImam = userInfo?.role === 'imam';
  // Conditionally render the component to ensure it's present in the DOM 
  // for the animation to work properly
  if (!isVisible && slideAnim._value === -SIDEBAR_WIDTH) {
    return null;
  }

  // Get the masjids from the user data
  const masjids = userInfo?.masjids || userInfo?.masjidAdmin || [];

  return (
    <View style={styles.container} pointerEvents="box-none">
      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: fadeAnim,
          },
        ]}
        pointerEvents={isVisible ? 'auto' : 'none'}
        onTouchStart={onClose}
      />

      {/* Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {/* Close Button */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>

              {/* User Profile Section */}
              <View style={styles.userSection}>
                <View style={styles.userProfileContainer}>
                  {userInfo?.photoURL ? (
                    <Image
                      source={{ uri: userInfo.photoURL, cache: 'force-cache'  }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <View style={styles.profilePlaceholder}>
                      <Text style={styles.profilePlaceholderText}>
                        {userInfo?.userName?.charAt(0) || 'A'}
                      </Text>
                    </View>
                  )}
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>
                      {userInfo?.userName}
                    </Text>
                    <TouchableOpacity onPress={() => {
                      userInfo?.userId ? navigation.navigate('PagesStack', { screen: 'Profile' }) : navigation.navigate('AuthStack', { screen: 'Login' });
                      onClose();
                    }}>
                      <Text style={styles.userRole}>{userInfo?.userId ? 'Manage Account' : 'Become a member'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              <View style={{
                borderBottomColor: '#CFCFCF',
                borderBottomWidth: 1
              }}>
              {/* Admin Portal Section (if user is admin or imam) */}
              {(isAdmin || isImam) && (
                <View style={styles.adminSection}>
                  <View style={styles.adminHeader}>
                    <AdminIcon />
                    <View style={styles.adminTitleContainer}>
                      <Text style={styles.adminTitle}>
                        {isAdmin ? 'Admin Portal' : 'Imam Dashboard'}
                      </Text>
                      <Text style={styles.adminSubtitle}>
                        {isAdmin ? 'Manage your masjid' : 'Answer Questions'}
                      </Text>
                    </View>
                  </View>

                  {/* Masjid List */}
                  {masjids && masjids.length > 0 && (
                    <View style={styles.masjidList}>
                      {masjids.map((masjid: any, index: number) => {
                        // Get the masjid name from either format
                        const masjidName = masjid.masjidName || masjid.masjid_name || 'Masjid';
                        const masjidId = masjid.masjid_id || masjid.masjidId || '';
                        // Get the first letter for the placeholder
                        const firstLetter = masjidName.charAt(0).toUpperCase();
                        // Get the masjid logo/image if available
                        const masjidLogo = masjid.masjidLogo || masjid.masjid_logo || null;

                        return (
                          <TouchableOpacity 
                            key={index}
                            style={styles.masjidItem}                             
                            onPress={() => {isAdmin ? 
                              navigation.navigate('MasjidAdminStack', { screen: 'MasjidPortal', params: { masjidId: masjidId } }) : 
                              navigation.navigate('ImamDashboardStack', { screen: 'ImamDashboard', params: { masjidId: masjidId } });
                              // navigateTo('ImamDashboardStack');
                              onClose();
                            }}
                          >
                            {masjidLogo ? (
                              <Image 
                                source={{ uri: masjidLogo }} 
                                style={styles.masjidLogo}
                              />
                            ) : (
                              <View style={styles.masjidIconContainer}>
                                <Text style={styles.masjidIconText}>
                                  {firstLetter}
                                </Text>
                              </View>
                            )}
                            <Text style={styles.masjidName}>{masjidName}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              )}
              </View>

              {/* Divider */}
              {/* Menu Items */}
              <View style={styles.menuSection}>
                <TouchableOpacity 
                  style={styles.menuItem} 
                  onPress={() => navigation.navigate('PagesStack' as never, { screen: 'HomeScreen' } as never)}
                >
                  <Text style={styles.menuItemText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('MasjidStack' as never, { screen: 'Masjid' } as never)}
                  // onPress={() => navigateTo('MasjidStack')}
                >
                  <Text style={styles.menuItemText}>Change your masjid</Text>
                </TouchableOpacity>

                {(!isAdmin && !isImam) && (
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('AskImaamStack', { screen: 'AskImamDashboard' })}
                >
                  <Text style={styles.menuItemText}>Ask Imam</Text>
                </TouchableOpacity>
                )}

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {navigation.navigate('EventsStack', { screen: 'EventDashboard' })}}
                >
                  <Text style={styles.menuItemText}>My Events</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('ZakaatStack')}
                >
                  <Text style={styles.menuItemText}>Zakaat Calculator</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('ResturantStack')}
                >
                  <Text style={styles.menuItemText}>Halal Restaurants</Text>
                </TouchableOpacity>

                {userInfo?.userToken && (
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('PagesStack', { screen: 'userAnnouncement' })}
                >
                  <Text style={styles.menuItemText}>Announcements</Text>
                </TouchableOpacity>
                )}

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('PagesStack', { screen: 'HelpCenter' })}
                >
                  <Text style={styles.menuItemText}>Help Centre</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => { 
                    userInfo?.userId ? navigation.navigate('PagesStack', { screen: 'Feedback' }) : navigation.navigate('AuthStack', { screen: 'Login' });
                    onClose();
                  }}
                >
                  <Text style={styles.menuItemText}>Give Feedback</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Logout Button - Fixed at the bottom */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <MaterialIcons name="logout" size={20} color="#3DC8B2" />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000'
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: '#FFF'
  },
  safeArea: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },
  scrollView: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    padding: 5,
  },
  userSection: {
    paddingTop: 50,
    paddingBottom: 15,
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#4C20AA',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profilePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#8353ec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePlaceholderText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    fontFamily: themeFont.englishFont,
  },
  userInfo: {
    marginLeft: 10,
    flex: 1
  },
  userName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    fontFamily: themeFont.englishFont,
    
  },
  userRole: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: themeFont.englishFont,
    opacity: 0.9,
    marginTop: 5,
  },
  adminSection: {
    marginTop: 15,
    marginBottom: 15,
  },
  adminHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  adminTitleContainer: {
    marginLeft: 8,
  },
  adminTitle: {
    color: '#3DC8B2',
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    fontSize: 14,
    fontFamily: themeFont.englishFont,
  },
  adminSubtitle: {
    fontSize: 11,
    color: '#727272',
    fontFamily: themeFont.englishFont,
  },
  masjidList: {
    marginTop: 8,
  },
  masjidItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  masjidIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3DC8B2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  masjidLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  masjidIconText: {
    color: '#FFF',
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    fontFamily: themeFont.englishFont,
  },
  masjidName: {
    marginLeft: 10,
    fontFamily: themeFont.englishFont,
    flex: 1,
    fontSize: 13,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    flexWrap: 'wrap',
    color: "#000"
  },
  menuSection: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 14,
    color: '#282828',
    fontFamily: themeFont.englishFont,
    fontWeight: Platform.OS === 'ios' ? '500' : '600', 
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 0,
    borderTopColor: '#F0F0F0',
    marginBottom: 70
  },
  logoutText: {
    color: '#3DC8B2',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    fontFamily: themeFont.englishFont,
  },
});

export default SidebarMenu;