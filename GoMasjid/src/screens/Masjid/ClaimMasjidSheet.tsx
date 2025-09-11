import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { uploadImage } from '../../services/s3Upload';
import { UserContext } from '../../context/UserProvider';
import { ClaimMasjidReq } from '../../services/api';
import SuccessModal from '../../common/SuccessModal';
import { useSheetPayload } from 'react-native-actions-sheet';

const COLORS = {
  darkBlue: '#0C2340',
  lightGray: '#f4f4f4',
  inputText: '#444',
  error: 'red',
  white: '#fff',
  link: '#007bff',
};

const ClaimMasjidSheet = () => {
  const payload = useSheetPayload() as { masjidId?: number };
  const { userInfo, isAuthenticated } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [claimInProgress, setClaimInProgress] = useState(false);
  const [idProofImg, setIdProofImg] = useState('');
  const [affProofImg, setAffProofImg] = useState('');
  const [idProofImgName, setIdProofImgName] = useState('');
  const [affProofImgName, setAffProofImgName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingAffImg, setIsUploadingAffImg] = useState(false);

  const masjidId = payload?.masjidId;
  const userId = userInfo?.userId;

  useEffect(() => {
    setName(userInfo?.userName || '');
    setEmail(userInfo?.email || '');
    setNumber(userInfo?.phoneNumber || '');
  }, [userInfo]);

  const handleTextChange = (text: string) => {
    setNumber(text.replace(/[^0-9+]/g, ''));
  };

  const handleImageUpload = async (type: 'id' | 'aff') => {
    if (!masjidId || !userId) return;

    const options = { mediaType: 'photo', quality: 1 };
    launchImageLibrary(options, async response => {
      const file = response?.assets?.[0];
      if (!file) return;

      const fileName = `claim_mid${masjidId}_uid${userId}_${type}proof_${file.fileName}`;
      const setNameFn = type === 'id' ? setIdProofImgName : setAffProofImgName;
      const setUrlFn = type === 'id' ? setIdProofImg : setAffProofImg;
      const setUploadingFn = type === 'id' ? setIsUploading : setIsUploadingAffImg;

      setNameFn(file.fileName || 'try again');
      setUploadingFn(true);

      try {
        const url = await uploadImage(
          {
            fileName,
            uri: file.uri,
            type: file.type,
          },
          masjidId
        );
        setUrlFn(url);
      } catch (err) {
        setError(`Upload failed for ${type} proof`);
      } finally {
        setUploadingFn(false);
      }
    });
  };

  const claimProcess = async () => {
    if (!number || !idProofImg || !affProofImg) {
      setError('All fields and uploads are required.');
      return;
    }

    if (!isAuthenticated) {
      setError('You must be logged in to claim a masjid.');
      return;
    }

    const reqData = {
      UserName: name,
      email,
      ContactPerson: number,
      masjidId,
      userId,
      idProofImg,
      affProofImg,
      createdDate: new Date(),
    };

    setClaimInProgress(true);
    try {
      const claimRes = await ClaimMasjidReq(masjidId!, reqData, userInfo.userToken);
      if (claimRes) {
        setSuccessModal(true);
      }
    } catch (err) {
      console.error('ClaimMasjidReq error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setClaimInProgress(false);
    }
  };

  return (
    <ActionSheet
      id="claim_masjid_sheet"
      gestureEnabled
      defaultOverlayOpacity={0.4}
      containerStyle={styles.sheetContainer}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Claim Mosque</Text>
        <Text style={styles.caption}>
          I am an administrative authority of this masjid and have explicit permission to claim it.
        </Text>

        <TextInput style={styles.input} value={name} editable={false} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

        <TextInput
          style={styles.input}
          value={number}
          onChangeText={handleTextChange}
          keyboardType="phone-pad"
          placeholder="Contact Number"
        />

        <TouchableOpacity style={styles.uploadButton} onPress={() => handleImageUpload('id')}>
          <Text style={styles.uploadText}>{idProofImgName || 'Upload ID Proof'}</Text>
          {isUploading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <MaterialCommunityIcons name="camera-plus-outline" size={20} color="#000" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadButton} onPress={() => handleImageUpload('aff')}>
          <Text style={styles.uploadText}>{affProofImgName || 'Upload Affiliation Proof'}</Text>
          {isUploadingAffImg ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Feather name="upload" size={20} color="#000" />
          )}
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.claimBtn, claimInProgress && { backgroundColor: '#ccc' }]}
          onPress={claimProcess}
          disabled={claimInProgress}
        >
          {claimInProgress ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.claimBtnText}>Submit Claim</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://gomasjid.co.uk/privacy-policy/')}>
          <Text style={styles.termsLink}>View Terms & Conditions</Text>
        </TouchableOpacity>
      </ScrollView>

      {successModal && (
        <SuccessModal
          modalVisible={successModal}
          modalClose={() => setSuccessModal(false)}
          modalText="Thank you! Your claim request has been sent. GoMasjid team will get in touch with you shortly."
          buttonText="OK"
        />
      )}
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    height: '85%',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    color: COLORS.darkBlue,
  },
  caption: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '400',
  },
  input: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 14,
    color: COLORS.inputText,
  },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  uploadText: {
    color: COLORS.inputText,
    fontSize: 14,
    flex: 1,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 13,
  },
  claimBtn: {
    backgroundColor: COLORS.darkBlue,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  claimBtnText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 15,
  },
  termsLink: {
    textAlign: 'center',
    color: COLORS.link,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});

export default ClaimMasjidSheet;
