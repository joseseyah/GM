import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthTest = () => {
    
    function userLogin(): void {
        let setData = {
            userId: '1w2e3r3',
            emailAddress: '',
            userName: 'Guest',
            phoneNumber: '',
          };
        //   setUserInfo(setData);
          AsyncStorage.setItem('userInfo', JSON.stringify(setData));
        //   navigation.reset({
        //     index: 0,
        //     routes: [{name: 'HomeStack'}],
        //   });
    }

  return (
    <SafeAreaView>
      <Text>AuthTest</Text>
      <TouchableOpacity
       onPress={() =>userLogin()}>
        <Text>User</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default AuthTest

const styles = StyleSheet.create({})