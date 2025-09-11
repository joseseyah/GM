import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {MasjidCard} from '../Masjid/MasjidCard';
import {UserContext} from '../../context/UserProvider';
import Header from '../../common/Header';
import { themeFont } from '../../styles/theme';
import ImamList from './ImamListComponent';
import { useFocusEffect } from '@react-navigation/native';
import { getMasjidImaams } from '../../services/api';

const ChangeImam = ({ props, route, navigation }: any) => {
  const {userInfo} = useContext(UserContext);
  const [masjidData, setMasjidData] = useState<any>([]);
  const [imaamData, setImaamData] = useState<any>([]);
  const [masjidId, setMasjidId] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMasjidId(userInfo?.followedMasjid_id);
  }, [userInfo?.followedMasjid_id]);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const fetchMasjidImams = async () => {
        if (masjidId !== undefined) {
          const imaamsList = await getMasjidImaams(Number(masjidId));
          setImaamData(imaamsList?.imams);
          setMasjidData(imaamsList?.masjid);
          setLoading(false);
        }
      };
      fetchMasjidImams();
    }, [masjidId])
  );

  return (
    <View style={styles.container}>
      <Header
        title="Choose Imam"
        onBack={() => navigation?.goBack()}
        titleColor='#000'
      />
      
      <View style={styles.containerView}> 
        {loading ? (
          <ActivityIndicator size="large" color="#283025" />
        ) : (
          <View style={{justifyContent: 'center'}}>
            <MasjidCard
              item={masjidData}
              navigation={navigation}
              fav_screen={true}
            />
          </View>
        )}
        <View style={{flex:1}}>
          <ImamList imamData={imaamData} onNavigate={() => navigation?.navigate('AskImamDashboard')}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    
  },
  heading: {
    fontWeight: '600',
    fontSize: 15,
    fontFamily: themeFont.englishFont,
    lineHeight: 18,
  },
  containerView: {
    flex: 1,
    paddingBottom: 10,
    gap: 10,
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? 70 : 60,
  },
});

export default ChangeImam;