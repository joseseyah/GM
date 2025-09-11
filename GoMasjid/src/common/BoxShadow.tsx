import React from "react"
import { Image } from "react-native-animatable"
import { Platform, StyleSheet } from "react-native";

const BoxShadow = (props: any) => {
    return (
    <>
        <Image 
            source={props.themeMode == 'light' ? require('../assets/images/top.png') : require('../assets/images/top-black.png')}
            style={[styles.shadowTop,
                // {resizeMode: props.surahBtn ? "cover" : "stretch"}
            ]}
        />
        <Image 
            source={props.themeMode == 'light' ? require('../assets/images/bottom.png') : require('../assets/images/bottom-black.png')}
            style={[styles.shadowBottom,
                // {resizeMode: props.surahBtn ? "cover" : "stretch"}
            ]}
        />
        <Image 
            source={props.themeMode == 'light' ? require('../assets/images/left.png') : require('../assets/images/left-black.png')}
            style={[styles.shadowLeft,
            // style={[props.surahBtn ? styles.shadowBtnLeft : styles.shadowLeft,
                {resizeMode: props.repeat ? "repeat" : "cover"}
            ]}
        />
        <Image 
            source={props.themeMode == 'light' ? require('../assets/images/right.png') : require('../assets/images/right-black.png')}
            style={[styles.shadowRight,
            // style={[props.surahBtn ? styles.shadowBtnRight : styles.shadowRight,
                {resizeMode: props.repeat ? "repeat" : "cover"},
                {right: props.repeat ? 0 : 0},
                {width: props.repeat ? 31.4 : 28}
                // {width: props.shadowWidth ? 18 : 30}
            ]}
        />
    </>
    )
}

const styles = StyleSheet.create({
  shadowTop: {
      position: 'absolute',
      top: 0,
      width: '100%', 
      height: 30, 
      zIndex: 2,
      resizeMode: 'stretch'
    },
    shadowBottom: {
      position: 'absolute',
      bottom: 0,
      width: '100%', 
      height: 30,
      zIndex: 999,
      resizeMode: 'stretch'
    },
    shadowLeft: {
      position: 'absolute',
      left: 0,
      top: 30,
      bottom: 30,
      width: 30, 
      zIndex: 1,
      height: 'auto',
    },
    shadowRight: {
      position: 'absolute',
      right: Platform.OS === 'ios' ? 0.5 : 0, 
      top: 29.9, 
      bottom: 30,
      width: Platform.OS === 'ios' ? 31.4 : 30,
      zIndex: 9,
      height: 'auto',
    },
    // shadowBtnRight: {
    //     position: 'absolute',
    //     right: 0, 
    //     top: 30, 
    //     bottom: 30,
    //     width: 20,
    //     zIndex: 9,
    //     height: 11.5,
    // },
    // shadowBtnLeft: {
    //     position: 'absolute',
    //     left: 0,
    //     top: 0,
    //     bottom: 0,
    //     width: 30, 
    //     zIndex: 1,
    //     height: 'auto',
    // },
});
export default BoxShadow;