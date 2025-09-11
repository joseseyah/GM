import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { UserContext } from '../../context/UserProvider';

const {height, width} = Dimensions.get('window');

const LoginSignUp = ({navigation}: any) => {
  const {setUserInfo} = useContext(UserContext);

  const asGuest = () => {
    let setData = {
      userId: '',
      emailAddress: '',
      userName: 'Guest',
      phoneNumber: '',
    };
    setUserInfo(setData);
    AsyncStorage.setItem('userInfo', JSON.stringify(setData));
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeStack'}],
    });
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageStyle}
        source={require('../../assets/images/main-background.jpeg')}
        resizeMode="cover">
        <Image
          source={require('../../assets/images/gm_logo.png')}
          style={{width: 182}}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.header}>
            Welcome to the Go Masjid application
          </Text>
          <Text style={styles.desc}>Please choose the registration method</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => navigation.navigate('RegisterAccount')}>
              <Text style={styles.singUpbuttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingTop: 30}}>
          <TouchableOpacity
            style={{width: '100%', paddingHorizontal: 50, paddingVertical: 20}}
            onPress={() => asGuest()}>
            <Text style={styles.guestText}>Continue as a Guest</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageStyle: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 150,
    fontSize: 16,
    color: '#FFF',
    fontWeight: '700',
  },
  desc: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
  signInButton: {
    backgroundColor: '#8352EC',
    opacity: 0.9,
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    shadowColor: '#545151',
  },
  signUpButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#545151',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  singUpbuttonText: {
    color: '#545151',
    fontSize: 22,
    fontWeight: '700',
  },
  buttonContainer: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  guestText: {
    color: '#FFF',
    width: '100%',
  },
});

export default LoginSignUp;