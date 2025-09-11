import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { themeFont } from '../../styles/theme';
import { MasjidCard } from './MasjidCard';
import { UserContext } from '../../context/UserProvider';
import { fetchUserMasjids } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../common/Header';

interface Masjid {
    is_primary: boolean;
    masjidImageUrl: string | undefined;
    id: number;
    name: string;
    address: string;
    verified: boolean;
    latitude: number | null;
    longitude: number | null;
  }

const FavouriteMasjids = ({navigation, route, props}: any) => {
const [loading, setLoading] = useState(false);
const [masjids, setMasjids] = useState<Masjid[]>([]);
const [error, setError] = useState<string | null>(null);
const {userInfo, isAuthenticated} = useContext(UserContext);

useEffect(() => {
  handleFetchMasjids();
  console.log('Masjid Fav screen mounted');
  console.log('User Info:', userInfo);
  console.log('User Auth:', isAuthenticated);
  }, []);

const renderMasjid = ({item}: {item: Masjid}) => (   
  <MasjidCard
    item={item}
    navigation={navigation}
    fav_screen={true}
  />
  );
const handleFetchMasjids = async () => {
    try {
        setLoading(true);
        if (isAuthenticated) {
          const userToken = userInfo?.userToken;
          console.log('User Token:',userToken)
          const data = await fetchUserMasjids(userToken);
          console.log('Load masjid from server')
          console.log(data)
          setMasjids(data);
        } else {
          AsyncStorage.getItem('Favourite_Masjid').then((data: any) => {
            let asyncData = JSON.parse(data) || [];
            console.log('Load masjid from locally');
            if (asyncData && asyncData.length > 0) {
              // console.log("fav data:",asyncData)
              setMasjids(asyncData);
            }
          });
        }
        const dataa = [
          {
            id: "2",
            name: "Central Mosque London",
            address: "Regents Lodge, 146 Park Road, London NW8 7RG, United Kingdom",
            latitude: 51.53177231,
            longitude: -0.16202354,
            distance: "3.6 km",
            verified: true,
            masjidImageUrl: "",
            is_primary: true,
          },
          {
            id: "4",
            name: "East London Mosque",
            address: "82-92 Whitechapel Road, London E1 1JQ, United Kingdom",
            latitude: 51.515356,
            longitude: -0.065335,
            distance: "4.41 km",
            verified: true,
            masjidImageUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
            is_primary: false,
          },
        {
          id: "3",
          name: "Masjid 3",
          address: "Location",
          latitude: 51.63152670,
          longitude: -74.00597000,
          distance: "4.51 km",
          verified: true,
          masjidImageUrl:
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
          is_primary: false,
        }
      ];
      
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error(err);
    } finally {
        setLoading(false);
    }
    };
  return (
    <View style={styles.container}>
      <Header title="Favourite Mosques" onBack={() => navigation.goBack()} titleColor='#000'/>
      <View style={styles.maincontainer}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : loading ? (
          <Text style={styles.loadingText}>Loading masjids...</Text>
        ) : (
          <FlatList
            data={masjids}
            renderItem={renderMasjid}
            // keyExtractor={item => item.id.toString()}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No favourite mosques are added</Text>
            }
          />
        )}
      </View>

    </View>
  )
}

export default FavouriteMasjids

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  maincontainer: {
    marginBottom: Platform.OS === 'ios' ? 70 : 60,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#000'
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#000'
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
})