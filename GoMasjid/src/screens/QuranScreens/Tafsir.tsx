import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
  Dimensions,
  Platform
} from 'react-native';
import theme, { themeFont } from '../../styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import HTMLView from 'react-native-htmlview';
import { handleShare } from '../../services';
const {height, width} = Dimensions.get('window');
type Props = {
  close: any;
  data: any;
  tafsirKey: any;
};

const Tafsir = ({close, data, tafsirKey}: Props) => {

  const handleShareTafsir = () => {
    console.log("yes inside");
    const tafsirShare = data.replace(/<\/?[^>]+(>|$)/g, '');
    handleShare(
      'Go Masjid Quran',
      null,
      `Quran (${tafsirKey}) \n${tafsirShare}`,
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(242, 242, 242, 1)', 'rgba(242, 242, 242, 1)']}
        start={{x: 0.0, y: 0.0}}
        end={{x: 0.0, y: 0.0}}
        locations={[0, 0]}
        style={styles.gradient}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={handleShareTafsir}>
              <Entypo
                name="forward"
                size={20}
                color="#3DC8B2"
              />
            </TouchableOpacity>
            <Text style={styles.title}>Tafsir</Text>

            <TouchableOpacity onPress={close}>
              <Image
                source={require('../../assets/images/close.png')}
                style={{
                  alignSelf: 'flex-end',
                  height: 14,
                  width: 14,
                }}
              />
            </TouchableOpacity>
            
          </View>
          <ScrollView
            contentContainerStyle={{ 
              flexGrow: 1,
              paddingBottom: Platform.OS === 'ios' ? 420 : height * 0.6 
            }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={true}
            scrollEnabled={true}
            style={{
              flex: 1,
              marginHorizontal: 10,
            }}>
            {/* <View style={{
              paddingBottom: Platform.OS === 'ios' ? 420 : height * 0.6
            }}> */}
            <View>
              <HTMLView value={data} stylesheet={styles} />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: '#202020',
    textAlign: 'center',
    fontFamily: themeFont.englishFont,
    flex: 1,
  },
  tafseer: {
    color: '#202020',
    fontSize: 14,
    fontFamily: themeFont.englishFont,
    fontWeight: '500',
  },
  tafseerarabi: {
    color: theme.colors.primary,
    margin: 8,
    fontSize: 14,
    lineHeight: 14.09,
    fontFamily: themeFont.indoPak,
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  h2: {
    fontSize: 16,
    color: '#000',
  },
  p: {
    fontSize: 14,
    color: 'black',
  },
});
export default Tafsir;