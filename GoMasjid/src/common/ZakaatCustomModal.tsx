import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';

const {width: screenWidth} = Dimensions.get('window');

const ZakaatCustomModal = (props: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}>
      <View style={styles.centeredView}>
        {/* <BlurView blurType="light" blurAmount={10} style={{borderRadius: 25}}> */}
        <View
          // colors={[
          //   // 'rgba(255, 255, 255, 0.25)', // #FFFFFF 25%
          //   // 'rgba(255, 255, 255, 0.25)', // #FFFFFF 25%
          //   // 'rgba(57, 28, 1, 1)', // #391C01 100%
          //   // 'rgba(169, 169, 169, 0.2)', // #A9A9A9 20%
          //   'rgba(244, 244, 244, 1)',
          //   'rgba(244, 244, 244, 1)',
          //   'rgba(244, 244, 244, 1)',
          //   'rgba(244, 244, 244, 1)',
          // ]}
          // start={{x: 1, y: 2}}
          // end={{x: 1, y: 1}}
          style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => props.setModalVisible(false)}>
            <Ionicons name="close-sharp" size={24} color="black" />
          </TouchableOpacity>
          {props.children}
        </View>
        {/* </BlurView> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: screenWidth / 1.3,
    // margin: 20,
    paddingVertical: 28,
    paddingHorizontal: 25,
    backgroundColor: '#FFF',
    borderRadius: 25,
    // borderWidth: 0.5,
    // borderColor: 'rgba(255, 255, 255, 0.21)',
  },
  closeButton: {
    position: 'absolute',
    top: 23,
    right: 28,
    zIndex: 1, // Ensures the close button is above other modal contents
  },
});
export default ZakaatCustomModal;
