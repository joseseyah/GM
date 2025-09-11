import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ScrollView, Platform } from 'react-native';
import { themeFont } from '../../styles/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UserContext } from '../../context/UserProvider';
import { ChangeImam } from '../../services/api';

const ImamList = ({imamData, onNavigate}: any) => {
  const {userInfo, updateUserInfo} = useContext(UserContext);

  const changePrimaryImam = async (imam_id: any) => {
    console.log(imam_id);
    const userToken = userInfo?.userToken;
    const changeImam = await ChangeImam(userToken, imam_id, Number(userInfo?.followedMasjid_id));
    if (changeImam) {
      updateUserInfo({...userInfo, FollowedImamId: imam_id});
    }
    onNavigate();
  };

  const renderHeader = () => (
    <Text style={styles.headerText}>All Imams</Text>
  );

  const renderImam = ({ item }: any) => (
    <ScrollView>
      <View style={styles.imamContainer}>
        <View style={styles.leftContainer}>
          <View style={[styles.imageContainer, {borderColor: userInfo.FollowedImamId === item.imam_id ? '#3DC8B2' : '#E0E0E0'}]}>
            <Image source={{ uri: item?.imam_photo, cache: 'force-cache' }} style={styles.imamImage} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.imamName}>{item.imam_name}</Text>
            {userInfo.FollowedImamId === item.imam_id && (
              <Text style={styles.statusText}>Active Conversation</Text>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton} 
          onPress={() => 
          {userInfo.FollowedImamId === item.imam_id 
            ? onNavigate() 
            : changePrimaryImam(item.imam_id)
          }}
        >
          <Text style={styles.actionButtonText}>
            {userInfo.FollowedImamId === item.imam_id ? 'View' : 'Ask Question'}
          </Text>
          <View style={styles.iconContainer}>
            {userInfo.FollowedImamId === item.imam_id ? (
              <TouchableOpacity style={{}}>
                <FontAwesome name="send" size={16} color="#3DC8B2" />
              </TouchableOpacity>
            ) : (
              <Image source={require('../../assets/images/Imamicon.png')} style={styles.iconImg} />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={imamData}
        renderItem={renderImam}
        keyExtractor={item => item.imam_id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  listContainer: {
    padding: 10,
  },
  headerText: {
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    fontSize: 15,
    fontFamily: themeFont.englishFont,
    lineHeight: 18,
    marginBottom: 16,
    color: '#000',
  },
  imamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1
  },
  imamImage: {
    width: '100%',
    height: '100%',
  },
  iconImg: {
    width: 18,
    height: 18,
  },
  textContainer: {
    marginLeft: 12,
  },
  imamName: {
    fontSize: 13,
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
    color: '#000',
    fontFamily: themeFont.englishFont,
  },
  statusText: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: themeFont.englishFont,
    color: '#3DC8B2'
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionButtonText: {
    fontSize: 11,
    marginRight: 4,
    fontFamily: themeFont.englishFont,
    color: '#3DC8B2',
    fontWeight: '500',
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImamList;