import React from 'react';
import {View, StyleSheet, Modal, Text, TouchableOpacity} from 'react-native';
import { themeFont } from '../styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AlertModal = ({ alertModal, modalClose, modalText, buttonText1, buttonText2, actionHandle }: any) => {
  return (
    <Modal
      transparent={true}
      visible={alertModal}
      animationType="none"
      onRequestClose={modalClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{paddingVertical: 10}} />
          <View style={styles.closeIcon}>
            <TouchableOpacity onPress={modalClose}>
              <Ionicons
                name="close"
                size={25}
                color={'#282828'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>
            {modalText}
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalButton1}
              onPress={actionHandle}>
              <Text style={styles.modalButtonText}>{buttonText1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton2}
              onPress={modalClose}>
              <Text style={styles.modalButtonText}>{buttonText2}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
 );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
    maxWidth: 200,
    fontWeight: '500',
    fontFamily: themeFont.englishFont,
    color: '#282828',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  modalButton1: {
    backgroundColor: '#3DC8B2',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  modalButton2: {
    backgroundColor: '#C7C7C7',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  modalButtonText: {
    fontFamily: themeFont.englishFont,
    color: '#FFF',
    fontSize: 13,
    fontWeight: '500',
  },
  closeIcon: {
    position: 'absolute',
    right: 15,
    top: 10
  }
});
export default AlertModal;