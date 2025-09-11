import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width: screenWidth} = Dimensions.get('window');

const AzanModal = (props: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => props.setModalVisible(false)}>
            <Ionicons name="close-sharp" size={25} color="#282828" />
          </TouchableOpacity>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: screenWidth / 1.3,
    paddingVertical: 28,
    paddingHorizontal: 25,
    backgroundColor: '#FFF',
    borderRadius: 25,
    marginBottom: -15,
    borderWidth: 0.5,
    borderColor: '#FFFFFF99',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, 
  },
});
export default AzanModal;