import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  Share,
  BackHandler,
} from 'react-native';
// import {UserContext} from '../../context/UserProvider';
import {styles} from '../../styles/duaStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { themeFont } from '../../styles/theme';
import {allDuaData} from '../../common/meta/allDuaData';
import {DuaCategories} from '../../common/meta/DuaCategories'
import SidebarMenu from '../../components/sidebar/SidebarMenu';
import useSidebar from '../../hooks/useSidebar';
import { useFocusEffect } from '@react-navigation/native';
import { useSidebarVisibility } from '../../context/SidebarContext';

const {width, height} = Dimensions.get('window');

const DuaDashboard = ({navigation}: any) => {
//   const {userInfo, settings} = useContext(UserContext);
  const [randomDua, setRandomDua] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const { isSidebarVisible, openSidebar, closeSidebar, toggleSidebar } = useSidebar();
  const { setVisible } = useSidebarVisibility();

  const getRandomDua = () => {
    const randomCategoryIndex = Math.floor(Math.random() * allDuaData.length); // Random category index
    const randomCategory = allDuaData[randomCategoryIndex]; // Random category
    const randomDuaIndex = Math.floor(
      Math.random() * randomCategory.data.length,
    );
    const randomDua = randomCategory.data[randomDuaIndex]; // Random dua
    setRandomDua(randomDua);
    return randomDua; // Return the random dua
  };

  const loadDuaOfTheDay = async () => {
    try {
      const storedLastUpdated = await AsyncStorage.getItem('lastUpdated');
      const storedDua = await AsyncStorage.getItem('duaOfTheDay');

      const currentTime = Date.now();
      const oneDayInMillis = 24 * 60 * 60 * 1000;

      if (storedLastUpdated) {
        const lastUpdatedTime = parseInt(storedLastUpdated, 10);

        if (currentTime - lastUpdatedTime < oneDayInMillis && storedDua) {
          setRandomDua(JSON.parse(storedDua));
          setLastUpdated(lastUpdatedTime);
          return;
        }
      }

      // Get a new random dua and store it
      const newDua = getRandomDua();
      setLastUpdated(currentTime);
      await AsyncStorage.setItem('lastUpdated', currentTime.toString());
      await AsyncStorage.setItem('duaOfTheDay', JSON.stringify(newDua));
    } catch (error) {
      // console.error('Error loading dua of the day:', error);
    }
  };

  useEffect(() => {
    loadDuaOfTheDay();
  }, []);

  const handleShare = async (
    arabicText: string,
    englishTranslation: string,
  ) => {
    try {
      const message = `${arabicText}\n\nTranslation: ${englishTranslation}`;
      await Share.share({
        message: message,
      });
    } catch (error) {
      // console.error('Error sharing:', error.message);
    }
  };

  // Handle back button press to close sidebar if open
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isSidebarVisible) {
          closeSidebar();
          return true;
        }
        return false;
      };

      const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        backHandlerSubscription.remove();
    }, [isSidebarVisible, closeSidebar])
  );

   useEffect(() => {
    setVisible(isSidebarVisible);
  }, [isSidebarVisible]);
  
  return (
    <>
    <SidebarMenu isVisible={isSidebarVisible} onClose={closeSidebar} />
    <ImageBackground
      source={require('../../assets/images/readduaBackground.png')}
      resizeMode="cover"
      style={styles.imageStyle}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={toggleSidebar}
            style={{flexDirection: 'row', gap: 20}}>
            <Image
              source={require('../../assets/images/hamburgerMenu.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
          <Text style={styles.topBarHeader}>All Favourite Duas</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DuaBookmark')}>
            <AntDesign name="heart" size={22} color={'#3DC8B2'} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.cardTwo}>
            <Text
              style={{
                color: '#FFFFFF',
                marginBottom: 10,
                fontSize: 15,
                fontFamily: themeFont.englishFont,
                fontWeight: '600',
                lineHeight: 17.6,
                textAlign: 'center',
              }}>
              Dua of the Day
            </Text>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 30,
                textAlign: 'center',
                fontWeight: '400',
                fontFamily: themeFont.indoPak,
                color: '#FFFFFF',
              }}>
              {randomDua?.data[0]?.arabicVerse}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: '#FFFFFF',
                fontStyle: 'italic',
                lineHeight: 13,
                textAlign: 'center',
                fontFamily: themeFont.englishFont,
              }}>
              {randomDua?.data[0]?.englishTranslation}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 10,
                    color: '#3DC8B2',
                    fontWeight: '500',
                    lineHeight: 10.56,
                    textAlign: 'center',
                    fontFamily: themeFont.englishFont,
                  }}>
                  {randomDua?.data[0]?.reference}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  handleShare(
                    randomDua?.data[0]?.arabicVerse || '',
                    randomDua?.data[0]?.englishTranslation || '',
                  )
                }
                style={{justifyContent: 'flex-end', paddingRight: 0}}>
                <MaterialCommunityIcons
                  name="share"
                  size={25}
                  color="#3DC8B2"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontWeight: '600',
                marginTop: 25,
                fontSize: 15,
                fontFamily: themeFont.englishFont,
                lineHeight: 17.6,
              }}>
              Categories
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DuaCategories', {
                  duaCategoryName: 'Read Dua',
                  iconInfo: {
                    iconName: 'brightness-6',
                    iconSet: 'MaterialCommunityIcons',
                    iconColor: '#3DC8B2',
                    iconSize: 24,
                  },
                })
              }>
              <Text
                style={{
                  fontFamily: themeFont.englishFont,
                  fontSize: 10,
                  marginTop: 25,
                  lineHeight: 11.73,
                  fontWeight: '500',
                  color: '#3DC8B2',
                  paddingRight: 10,
                }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.exploreContainer}>
            <View style={styles.exploreRow}>
              {DuaCategories.slice(0, 2).map(item => (
                <TouchableOpacity
                  style={styles.topBarImageExplore}
                  key={item.id}
                  onPress={() =>
                    navigation.navigate(item.route, {
                      duaCategoryName: item.title,
                      catId: item.id,
                      iconInfo: {
                        iconName: item.iconName,
                        iconSet: item.iconSet,
                        iconColor: item.color,
                        iconSize: item.size,
                      },
                    })
                  }>
                  {item.iconSet === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons
                      name={item.iconName}
                      style={styles.icon}
                      color={item.color}
                      size={item.size}
                    />
                  ) : (
                    <MaterialIcons
                      name={item.iconName}
                      style={styles.icon}
                      color={item.color}
                      size={item.size}
                    />
                  )}

                  <Text style={styles.SectionText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.exploreRow}>
              {DuaCategories.slice(2, 4).map(item => (
                <TouchableOpacity
                  style={styles.topBarImageExplore}
                  key={item.id}
                  onPress={() =>
                    navigation.navigate(item.route, {
                      duaCategoryName: item.title,
                      catId: item.id,
                      iconInfo: {
                        iconName: item.iconName,
                        iconSet: item.iconSet,
                        iconColor: item.color,
                        iconSize: item.size,
                      },
                    })
                  }>
                  {item.iconSet === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons
                      name={item.iconName}
                      style={styles.icon}
                      color={item.color}
                      size={item.size}
                    />
                  ) : (
                    <MaterialIcons
                      name={item.iconName}
                      style={styles.icon}
                      color={item.color}
                      size={item.size}
                    />
                  )}
                  <Text style={styles.SectionText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.exploreRow}>
              {DuaCategories.slice(4, 7).map(item => (
                <TouchableOpacity
                  style={styles.topBarImageExplore}
                  key={item.id}
                  onPress={() =>
                    navigation.navigate(item.route, {
                      duaCategoryName: item.title,
                      catId: item.id,
                      iconInfo: {
                        iconName: item.iconName,
                        iconSet: item.iconSet,
                        iconColor: item.color,
                        iconSize: item.size,
                      },
                    })
                  }>
                  {item.iconSet === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons
                      name={item.iconName}
                      style={styles.icon}
                      color={item.color}
                      size={item.size}
                    />
                  ) : (
                    <MaterialIcons
                      name={item.iconName}
                      style={styles.icon}
                      color={item.color}
                      size={item.size}
                    />
                  )}
                  <Text style={styles.SectionText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.exploreRow}>
              {DuaCategories.slice(7, 9).map(item => (
                <TouchableOpacity
                  style={styles.topBarImageExplore}
                  key={item.id}
                  onPress={() =>
                    navigation.navigate(item.route, {
                      duaCategoryName: item.title,
                      catId: item.id,
                      iconInfo: {
                        iconName: item.iconName,
                        iconSet: item.iconSet,
                        iconColor: item.color,
                        iconSize: item.size,
                      },
                    })
                  }>
                  {item.iconSet === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons
                      name={item.iconName}
                      style={styles.icon}
                      color={item.color}
                      size={item.size}
                    />
                  ) : (
                    <MaterialIcons
                      name={item.iconName}
                      style={styles.icon}
                      color={item.color}
                      size={item.size}
                    />
                  )}
                  <Text style={styles.SectionText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.exploreRow}>
              {DuaCategories.slice(9, 11).map(item => (
                <TouchableOpacity
                  style={styles.topBarImageExplore}
                  key={item.id}
                  onPress={() =>
                    navigation.navigate(item.route, {
                      duaCategoryName: item.title,
                      catId: item.id,
                      iconInfo: {
                        iconName: item.iconName,
                        iconSet: item.iconSet,
                        iconColor: item.color,
                        iconSize: item.size,
                      },
                    })
                  }>
                  {item.iconSet === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons
                      name={item.iconName}
                      style={styles.icon}
                      color={item.color}
                      size={item.size}
                    />
                  ) : (
                    <MaterialIcons
                      name={item.iconName}
                      style={styles.icon}
                      color={item.color}
                      size={item.size}
                    />
                  )}
                  <Text style={styles.SectionText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.exploreRow}>
              {DuaCategories.slice(11, 12).map(item => (
                <TouchableOpacity
                  style={styles.topBarImageExplore}
                  key={item.id}
                  onPress={() =>
                    navigation.navigate(item.route, {
                      duaCategoryName: item.title,
                      catId: item.id,
                      iconInfo: {
                        iconName: item.iconName,
                        iconSet: item.iconSet,
                        iconColor: item.color,
                        iconSize: item.size,
                      },
                    })
                  }>
                  {item.iconSet === 'MaterialCommunityIcons' ? (
                    <MaterialCommunityIcons
                      name={item.iconName}
                      style={styles.icon}
                      color={item.color}
                      size={item.size}
                    />
                  ) : (
                    <MaterialIcons
                      name={item.iconName}
                      style={styles.icon}
                      color={item.color}
                      size={item.size}
                    />
                  )}
                  <Text style={styles.SectionText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
    </>
  );
};

export default DuaDashboard;