import React from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { themeFont } from '../styles/theme';

const SuccessModal = ({ successModal, modalClose, modalText, buttonText }: any) => {
  return (
    <Modal
      transparent
      visible={successModal}
      animationType="slide"
      onRequestClose={modalClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeIcon} onPress={modalClose}>
            <Ionicons name="close" size={22} color={'#282828'} />
          </TouchableOpacity>

          <Text style={styles.modalText}>{modalText}</Text>

          <TouchableOpacity style={styles.modalButton} onPress={modalClose}>
            <Text style={styles.modalButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  modalText: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: themeFont.englishFont,
    color: '#282828',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 25,
  },
  modalButton: {
    backgroundColor: '#223F7A',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 14,
    minWidth: 150,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
  },
});

export default SuccessModal;
