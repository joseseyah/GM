import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { UserContext } from '../../context/UserProvider';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { uploadProfileImage } from '../../services/s3Upload';
import { profileUpdate } from '../../services/api';
import type { ImageLibraryOptions } from 'react-native-image-picker';
import { Linking } from 'react-native';


import { handleLogout } from '../../utils/logout';


import { styles } from '../../styles/profile/screen';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen = ({ navigation }: any) => {
  const { userInfo, updateUserInfo, setUserInfo, setIsAuthenticated } = useContext(UserContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    userName: '',
    password: '',
  });
  const [isNameChanging, setIsNameChanging] = useState(false);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {

    console.log('[ProfileScreen] userInfo:', userInfo);
    if(userInfo.userName === 'Guest') {
      setLoginModal(true);
    }
  }, [userInfo.userName]);

  const validatUserName = () => {
    if (userName.trim() === '') {
      setErrors(prevState => ({
        ...prevState,
        userName: 'Please Enter Name',
      }));
      return true;
    } else {
      setErrors(prevState => ({...prevState, userName: ''}));
      return false;
    }
  };

  const validatePassword = () => {
    const passwordTrim = password.trim();
    if (passwordTrim === '') {
      setErrors(prevState => ({
        ...prevState,
        password: 'Please enter the password',
      }));
      return true;
    } else if (passwordTrim.length < 7) {
      setErrors(prevState => ({
        ...prevState,
        password: 'Password must be at least 8 characters',
      }));
      return true;
    } else {
      setErrors(prevState => ({...prevState, password: ''}));
      return false;
    }
  };

  const supportItems = [
    { title: 'FAQs', link: 'https://gomasjid.co.uk/FAQs' },
    { title: 'Contact Us', link: 'https://gomasjid.co.uk/contact/' },
    { title: 'Send Feedback', link: 'https://gomasjid.co.uk/feedback/' },
    { title: 'Privacy Policy', link: 'https://gomasjid.co.uk/privacy-policy/' },
    { title: 'Conditions Of Use', link: 'https://gomasjid.co.uk/privacy-policy/' },
  ];

  const renderManageMasjidSection = () => {
    if (userInfo?.role !== 'masjid_admin' || !Array.isArray(userInfo?.masjidAdmin)) {
      return null;
    }
  
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manage Masjid</Text>
        {userInfo.masjidAdmin.map((masjid, index) => (
          <TouchableOpacity
            key={index}
            style={styles.rowItem}
            onPress={() =>
              navigation.navigate('MasjidAdminStack', {
                screen: 'MasjidPortal',
                params: { masjidId: masjid.masjidId },
              })
            }
          >
            <Text style={styles.rowText}>{masjid.masjidName}</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  
  

  const saveUserName = () => {
    const isUserNameValid = validatUserName();
    console.log('isUserNameValid', isUserNameValid);
    if (isUserNameValid) {
      return;
    }
    setLoading(true);
    updateUserInfo({...userInfo, userName: userName});
    handleProfileAPI();
    setLoading(false);
    setIsNameChanging(false);
    setUserName('');
    setModalText('Name updated successfully');
    setModalVisible(true);
  }

  const savePassword = () => {
    const isPasswordValid = validatePassword();
    console.log('isPasswordValid', isPasswordValid);
    if (isPasswordValid) {
      return;
    }
    setLoadingPass(true);
    handleProfileAPI();
    setLoadingPass(false);
    setIsPasswordChanging(false);
    setPassword('');
    setModalText('Password updated successfully');
    setModalVisible(true);
  }

  const handleChangePicture = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel || response.errorCode || response.errorMessage) return;

      if (!response.assets || response.assets.length === 0) return;
      const file = response.assets[0];

      const fileName = `profile_${userInfo.userId}`;

      if (file.uri) {
        setSelectedImage(file.uri);
      }
      
      if(file) {
        try {
          setIsUploading(true);
          const data = await uploadProfileImage({
            fileName: fileName,
            uri: file.uri,
            type: file.type
          });
          console.log('data', data);
          setSelectedImage(data);
          handleSavePicture();
          setIsUploading(false);
            
        } catch (error) {
        }
      }
    });
  };

  const handleSavePicture = async () => {
    if(selectedImage) {
      const updated = await handleProfileAPI();
      updateUserInfo({...userInfo, photoURL: selectedImage});
      if(updated) {
        setSelectedImage('');
        setIsUploading(false);
        setModalText('Profile updated successfully');
        setModalVisible(true);
      }
    }
  };

  const handleProfileAPI = async () => {
    const data = {
      name: userName,
      password: password,
      profile_picture_url: selectedImage
    };
    const userToken = userInfo?.userToken;
    // console.log('data', userToken);
    const update = await profileUpdate(data, userToken);
    // console.log('update', update);
    if(update) {
      return true;
    } else {
      return false;
    }
  };
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ paddingTop: Platform.OS === 'ios' ? 28 : 18, paddingBottom: 12, backgroundColor: '#FFF' }}>
        <Text style={styles.screenTitle}>Settings</Text>
      </View>
  
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.profileBlock}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userInfo?.userName?.charAt(0)}</Text>
            </View>
            <Text style={styles.nameText}>{userInfo?.userName}</Text>
  
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>569</Text>
                <Text style={styles.statLabelListening}>LISTENING</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabelRead}>READ</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>17</Text>
                <Text style={styles.statLabelStreak}>STREAK</Text>
              </View>
            </View>
          </View>
  
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity style={styles.rowItem}>
              <Text style={styles.rowText}>Change Password</Text>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>
  
          {renderManageMasjidSection()}
  
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            {supportItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.rowItem}
                onPress={() => {
                  if (item.link) Linking.openURL(item.link);
                  else console.log(`${item.title} pressed`);
                }}
              >
                <Text style={styles.rowText}>{item.title}</Text>
                <Text style={styles.arrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
  
          <View style={styles.buttonBlock}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => handleLogout(navigation, setUserInfo, setIsAuthenticated)}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
};

export default ProfileScreen;