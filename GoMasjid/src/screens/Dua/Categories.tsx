import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DuaCategories} from '../../common/meta/DuaCategories'
import { themeFont } from '../../styles/theme';
import Header from '../../common/Header';

const {height, width} = Dimensions.get('window');

const AllCategories = ({route, navigation}: any) => {
  const {duaCategoryName} = route.params;
  const {iconInfo} = route.params;

  return (
    <View style={styles.mainContainer}>
      <Header
        title="All Categories"
        titleColor="#000"
        iconColor="#000"
        onBack={() => navigation?.goBack()}
      />

      <View style={{flexDirection: 'row', gap: 15, marginTop: 10}}>
        <View style={styles.insetShadow}>
          <View style={styles.header}>
            <View style={{top: 18, left: 19}}>
              {iconInfo.iconSet === 'MaterialCommunityIcons' ? (
                <MaterialCommunityIcons
                  name={iconInfo.iconName}
                  color={iconInfo.iconColor}
                  size={iconInfo.iconSize}
                />
              ) : (
                <MaterialIcons
                  name={iconInfo.iconName}
                  color={iconInfo.iconColor}
                  size={iconInfo.iconSize}
                />
              )}
              <Text style={styles.headerText}>{duaCategoryName}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('DuaBookmark')}
          style={{
            width: '20%',
            height: 46,
            justifyContent: 'center',
            alignItems: 'center',
            top: 20,
          }}>
          <MaterialCommunityIcons name="heart" size={30} color="#3DC8B2" />
          <Text
            style={{
              fontFamily: themeFont.englishFont,
              // fontWeight: '400',
              fontWeight: Platform.OS === 'ios' ? '400' : '600', 
              fontSize: 10,
              lineHeight: 9.38,
              textAlign: 'center',
              // color: '#C7C7C7',
              color: '#000',
              marginTop: 5,
            }}>
            All Favourite Duas
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {DuaCategories &&
          DuaCategories.map((dua: any, index: number) => (
            <View style={styles.container} key={`duakey-${index}`}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(dua.route, {
                      duaCategoryName: dua.title,
                      catId: dua.id,
                      iconInfo: {
                        iconName: dua.iconName,
                        iconSet: dua.iconSet,
                        iconColor: dua.color,
                        iconSize: dua.size,
                      },
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View>
                      <ImageBackground
                        source={require('../../assets/images/quranVector.png')}
                        style={{
                          width: 28.45,
                          height: 29.48,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 20,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 10,
                            lineHeight: 11.69,
                            fontFamily: themeFont.englishFont,
                            textAlign: 'center',
                            fontWeight: Platform.OS === 'ios' ? '600' : '700', 
                          }}>
                          {index + 1}
                        </Text>
                      </ImageBackground>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <Text style={styles.CardText}>{dua.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  container: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#4C20AA1A',
  },
  CardText: {
    fontSize: 12.5,
    lineHeight: 18.28,
    fontFamily: themeFont.englishFont,
    // fontWeight: '700',
    fontWeight: Platform.OS === 'ios' ? '600' : '700', 
    letterSpacing: 0.09,
    flexWrap: 'wrap',
    width: width / 2,
    color: '#000'
  },
  topBar: {
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarHeader: {
    flex: 1,
    textAlign: 'left',
    fontWeight: Platform.OS === 'ios' ? '600' : '700', 
    color: '#202020',
    fontSize: 15,
    marginLeft: 15,
    fontFamily: themeFont.englishFont,
    lineHeight: 17.6,
  },

  header: {
    // flexDirection: 'row',
  },
  headerText: {
    fontFamily: themeFont.englishFont,
    fontSize: 12.5,
    fontWeight: Platform.OS === 'ios' ? '600' : '700', 
    lineHeight: 18.28,
    letterSpacing: 0.09,
    color: '#FFFFFF',
    top: 8,
    left: 1,
  },
  insetShadow: {
    flex: 1,
    // width: 244.49,
    width: '80%',
    height: 80,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: '#4C20AA',
  },

  categoryIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
export default AllCategories;