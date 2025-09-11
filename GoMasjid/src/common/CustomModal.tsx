import React from 'react';
import {View, StyleSheet, Modal, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';

const {width: screenWidth} = Dimensions.get('window');
const CustomModal = (props: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}>
      <View style={styles.centeredView}>
        <BlurView blurType="light" blurAmount={10} style={{borderRadius: 25}}>
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 1)', // #FFFFFF 25%
              'rgba(255, 255, 255, 1)', // #FFFFFF 25%
              'rgba(255, 255, 255, 1)',
              'rgba(255, 255, 255, 1)',
            ]}
            start={{x: 1, y: 2}}
            end={{x: 1, y: 1}}
            style={styles.modalView}>
            {props.children}
          </LinearGradient>
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 282,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    // width: screenWidth / 1.3,
    paddingVertical: 28,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 0.5,
    width: 300,
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center'
  },
});
export default CustomModal;
