import {
  Dimensions,
  Image,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fetchMasjidDetails } from '../../services/api';
import React, {useContext, useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {themeFont} from '../../styles/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  removeFavouriteMasjidsData,
  storeFavouriteMasjidsData,
} from '../../services/AsyncServices';
import {UserContext} from '../../context/UserProvider';
import {
  AddUserFavMasjid,
  followMasjid,
  RemoveUserFavMasjid,
} from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessModal from '../../common/SuccessModal';
import AlertModal from '../../common/AlertModal';
const {height, width} = Dimensions.get('window');

export const MasjidCard = React.memo(
  ({ item, index, navigation, fav_screen }: any) => {
    const [masjidData, setMasjidData] = useState<any>(null);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const fullData = await fetchMasjidDetails(item.id);
          const { name, address, masjidLogo, verified, distance } = fullData;
          const miles = distance?.miles || distance?.km || 'N/A';
          setMasjidData({ name, address, masjidLogo, distance: miles, verified });

        } catch (error) {
          console.error('Error fetching masjid card data:', error);
        }
      };

      fetchData();
    }, [item.id]);

    return (
      <TouchableOpacity
        style={styles.simpleCard}
        onPress={() =>
          navigation.navigate('Mosques', {
            screen: 'MasjidDetailsScreen',
            params: { masjidId: item.id },
          })
        }
      >
        {masjidData?.masjidLogo ? (
          <Image source={{ uri: masjidData.masjidLogo }} style={styles.logo} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{masjidData?.name?.charAt(0) ?? 'M'}</Text>
          </View>
        )}
    
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            {masjidData?.name || 'Loading...'}
          </Text>
          {masjidData?.distance && masjidData.distance !== 'N/A' && (
            <Text style={styles.cardDistance}>{masjidData.distance} away</Text>
          )}
        </View>
      </TouchableOpacity>
    );
    
  });
    
  const styles = StyleSheet.create({
    topContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: Platform.OS === 'ios' ? 40 : 10,
      justifyContent: 'space-between',
    },
  
    simpleCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
  
    logo: {
      width: 64,
      height: 64,
      borderRadius: 14,
      backgroundColor: '#D1D5DB',
      marginRight: 16,
    },
  
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 14,
      backgroundColor: '#173C85',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
  
    avatarText: {
      fontSize: 22,
      fontWeight: '700',
      color: '#ffffff',
    },
  
    cardContent: {
      flex: 1,
    },
  
    cardTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: '#111827',
    },
  
    cardDistance: {
      fontSize: 13,
      color: '#6B7280',
      marginTop: 4,
    },
  });
  
  
  
  
