// UpdateSalahTimeSheet.tsx

import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from '@react-native-documents/picker';
import Feather from 'react-native-vector-icons/Feather';
import { UserContext } from '../../context/UserProvider';
import { updateSalahTime } from '../../services/api';
import SuccessModal from '../../common/SuccessModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SheetManager, useSheetPayload } from 'react-native-actions-sheet';
import ActionSheet from 'react-native-actions-sheet';
import { styles } from '../../styles/masjidadmin/UpdateSalahTimeSheet';
import { Linking } from 'react-native';

const UpdateSalahTimeSheet = () => {
  const insets = useSafeAreaInsets();
  const { userInfo } = useContext(UserContext);
  const payload = useSheetPayload('upload_salah_times_sheet') || {};
  const masjidId = payload.masjidId;

  const [salahTimeCSV, setSalahTimeCSV] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<DocumentPickerResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const salahTimeUpload = async () => {
    try {
        const res = await DocumentPicker.pick({type: [DocumentPicker.types.plainText],});
          
      setSalahTimeCSV(res[0]?.name || '');
      setFile(res);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error(err);
      }
    }
  };

  const updateMasjidSalah = async () => {
    if (!file) return;

    try {
      setLoading(true);
      const userToken = userInfo?.userToken;
      const fileObj = file[0];

      let realPath = fileObj.uri;
      if (Platform.OS === 'ios') realPath = realPath.replace('file://', '');

      const formData = new FormData();
      formData.append('salah_csv', {
        uri: realPath,
        type: fileObj.type || 'text/csv',
        name: fileObj.name || 'upload.csv',
      });

      const response = await updateSalahTime(Number(masjidId), formData, userToken);
      if (response) setSuccessModal(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    const url = 'https://admin.gomasjid.co.uk/assets/salah/salah_timing.csv';
    Linking.openURL(url);
  };

  return (
    <ActionSheet
      id="upload_salah_times_sheet"
      gestureEnabled
      defaultOverlayOpacity={0.3}
      containerStyle={{ paddingBottom: insets.bottom + 20, paddingHorizontal: 16, paddingTop: 20 }}
    >
      <Text style={styles.title}>Upload Salah Timings (CSV)</Text>
      <Text style={styles.subTitle}>Upload a CSV file in the correct format.</Text>

      <TouchableOpacity
        style={styles.inputContainer}
        onPress={salahTimeUpload}
        activeOpacity={0.7}
      >
        <Text style={styles.placeholderText}>
          {salahTimeCSV || 'Upload Salah Time CSV'}
        </Text>
        {!isUploading ? (
          <Feather name="upload" size={22} color="#c7c7c7" />
        ) : (
          <ActivityIndicator size="small" color="#000" />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={downloadFile} style={styles.dbuttonContainer}>
        <Text style={styles.buttonText}>Download Sample CSV</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#002E6E" style={{ marginTop: 20 }} />}

      <TouchableOpacity onPress={updateMasjidSalah} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Update Salah Timing</Text>
      </TouchableOpacity>

      {successModal && (
        <SuccessModal
          modalVisible={successModal}
          modalClose={() => {
            setSuccessModal(false);
            SheetManager.hide('upload_salah_times_sheet');
          }}
          modalText="Salah Timing Updated Successfully"
          buttonText="OK"
        />
      )}
    </ActionSheet>
  );
};

export default UpdateSalahTimeSheet;