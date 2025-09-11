import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Temp = ({navigation}: any) => {
  return (
    <SafeAreaView>
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <TouchableOpacity
            onPress={() =>
                navigation.navigate("Masjid")}>
                <Text style={{color: '#000', fontSize: 20}}>Nearby Masjid</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("MasjidPortal")
                }>
                <Text style={{color: '#000', fontSize: 20}}>Masjid Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("MasjidPortal")
                }>
                <Text style={{color: '#000', fontSize: 20}}>Masjid Imaam</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("AskImamDashboard")
                }>
                <Text style={{color: '#000', fontSize: 20}}>AskImamDashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("ConversationScreen")
                }>
                <Text style={{color: '#000', fontSize: 20}}>ConversationScreen</Text>
            </TouchableOpacity>
             <TouchableOpacity
                onPress={() =>
                    navigation.navigate("ImamDashboard")
                }>
                <Text style={{color: '#000', fontSize: 20}}>Imam DashBoard</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Temp

const styles = StyleSheet.create({})