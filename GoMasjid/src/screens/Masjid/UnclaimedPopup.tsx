import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import theme, { themeFont } from '../../styles/theme';
import {handleShare} from '../../services';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  claim: any;
  share?: any;
  close: any;
  visible: boolean;
};

const {width: width, height: height} = Dimensions.get('window');

const UnclaimedPopup = ({claim, share, close, visible}: Props) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => close()}>
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <TouchableOpacity
            onPress={() => close()}
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Ionicons name="close" size={22} color="#282828" />
          </TouchableOpacity>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 15,
                alignSelf: 'center',
              }}>
              <Text style={styles.title}>
                Do you want to share it with the Masjid Board?
              </Text>
            </View>

            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  justifyContent: 'center',
                  // margin: 20,
                  gap: 10,
                }}>
                <TouchableOpacity
                  style={styles.buttonShare}
                  onPress={() =>
                    handleShare(
                      share.name,
                      null,
                      `Assalamu Alaikum,\n\nI came across our local mosque and would like to share with the board so that the right person can claim the authority of this mosque on the Go Masjid app.\n\nJazak’Allah Khayr\nMasjid name: ${share.name}\nDownload Go Masjid App`,
                    )
                  }>
                  <Text style={styles.buttonFollowText}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonClaim}
                  onPress={() => claim()}>
                  <Text style={styles.buttonFavouriteText}>Claim Yourself</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },

  popupContainer: {
    width: width / 1.3,
    backgroundColor: '#FFF',
    paddingVertical: 28,
    paddingHorizontal: 25,
    borderRadius: 25,
  },

  container: {
    borderRadius: 25,
    alignSelf: 'center',
  },

  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#282828',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: themeFont.englishFont,
    lineHeight: 19,
  },

  buttonShare: {
    // width: '60%',
    // height: 'auto',
    backgroundColor: '#3DC8B2',
    borderRadius: 13,
    // margin:10,
    // padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },

  buttonClaim: {
    // width: 'auto',
    // height: 'auto',
    backgroundColor: '#C7C7C7',
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 15,
    // margin:10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonFollowText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
  },

  buttonFavouriteText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
  },
});

export default UnclaimedPopup;
