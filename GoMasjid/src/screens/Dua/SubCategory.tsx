import React, { useEffect, useState } from 'react';
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
import { themeFont } from '../../styles/theme';
// import { DuaSubCatData } from '../../common/meta/DuaFiles';
import {DuaCatData} from '../../services/fileCache';
import Header from '../../common/Header';

const {height, width} = Dimensions.get('window');

const SubCategory = ({route, navigation}: any) => {
  const {duaCategoryName, iconInfo, catId} = route.params;
  // console.log('checkig route+', route.params);
  const [categoryData, setCategoryData] = useState<any>([]);

  const loadDuaCat = async (catId: number) => {
    // return DuaSubCatData[id];
    const catData = await DuaCatData(catId);
    setCategoryData(catData);
  }

  useEffect(() => {
    loadDuaCat(catId);
    // const catData = loadDuaCat(catId);
    // // console.log("catdata", catData);
    // setCategoryData(catData);
  }, [catId]);

  return (
    <View style={styles.mainContainer}>
      <Header
        title=""
        titleColor="#000"
        iconColor="#000"
        onBack={() => navigation?.goBack()}
      />
      <ScrollView>
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
                <Text style={styles.headerText}>
                  Duas for&nbsp;{duaCategoryName}
                </Text>
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
                fontWeight: '400',
                fontSize: 8,
                lineHeight: 9.38,
                textAlign: 'center',
                color: '#000',
                marginTop: 5,
              }}>
              All Favourite Duas
            </Text>
          </TouchableOpacity>
        </View>
        
        {categoryData &&
          categoryData?.subCats?.map((cat: any, index: number) => (
            <View style={styles.container} key={`duakey-${index}`}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DuaScreen', {
                      subCatId: cat.id,
                      catId: cat.catId,
                      uri: cat.uri,
                      title: cat.title,
                      duaCategoryName: duaCategoryName,
                      iconInfo: iconInfo,
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
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 20,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 9.97,
                            lineHeight: 11.69,
                            fontFamily: themeFont.englishFont,
                            // fontWeight: '600',
                            fontWeight: Platform.OS === 'ios' ? '600' : '700', 
                          }}>
                          {index + 1}
                        </Text>
                      </ImageBackground>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                      <Text style={styles.CardText}>{cat.title}</Text>
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
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    backgroundColor: '#F4F4F4',
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  container: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#4C20AA1A'
  },
  CardText: {
    fontSize: 12.5,
    lineHeight: 18.28,
    fontFamily: themeFont.englishFont,
    fontWeight: Platform.OS === 'ios' ? '600' : '700', 
    letterSpacing: 0.09,
    flexWrap: 'wrap',
    width: width / 2,
    color: '#000'
  },
  topBar: {
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
export default SubCategory;