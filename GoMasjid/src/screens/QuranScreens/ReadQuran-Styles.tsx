
import {StyleSheet, Dimensions, Platform} from 'react-native';
import { themeFont } from '../../styles/theme';

const {height, width} = Dimensions.get('window');

export const ReadQuranStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginBottom: 10,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    backgroundColor: '#F2F2F2',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000', // Overlay color (black)
    zIndex: 10,
  },
  topBar: {
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  topBarHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    color: '#184A2C',
    fontSize: 22,
  },
  verseContainer: {
    marginVertical: 6,
    borderRadius: 15,
    height: 'auto',
    backgroundColor: '#F6F6F6', // ← add this line (light grey)
  },
  
  verseContainerSajadah:{
    marginVertical: 6,
    borderRadius: 15,
    height: 'auto',
    borderColor: "#3DC8B2",
    borderWidth: 2,
  },
  insetShadow: {
    flex: 1,
    borderRadius: 15.69,
  },
  verseInsideContainer: {
    width: '100%',
    marginVertical: 0,
    position: 'relative',
    borderRadius: 20,
    borderColor: '#E0E5EC',
    borderWidth: 1,
    backgroundColor: '#F6F6F6', // ✅ change from '#FFFFFF'
  },
  
  
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'right'
  },

  textStyle: {
    paddingVertical: 5,
    fontWeight: '400',
    lineHeight: 58.92,
    fontSize: 20,
    textAlign: 'right',
    flexShrink: 1,
    color: '#223F7A', // ← override default white
  },
  

  shadow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff', // Shadow color
    top: 4, // Adjust the top and left values to control the shadow's position
    left: 4,
    right: 0, // Adjust the right and bottom values to control the shadow's size
    bottom: 0,
    borderRadius: 15, // Border radius of the container
    zIndex: -1, // Ensure the shadow is behind the content
  },
  content: {
    flex: 1, // Ensure content takes up all available space
    borderRadius: 15, // Border radius of the content
  },

  arabicTextStyle: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    fontSize: 30,
    color: '#4C20AA',
    fontFamily: themeFont.indoPak,
    flexShrink: 1,
  },
  translateText: {
    color: '#000',
    fontSize: 16,
    marginBottom: 16,
  },
  listStyles: {
    // marginTop: 60,
  },
  numberContaier: {
    minWidth: 35,
    minHeight: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginLeft: 0,
  },
  numberStyle: {
    fontFamily: themeFont.englishFont,
    color: '#4C20AA',
    fontWeight: 'bold',
    fontSize: 16,
  },

  overlayView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  footerContainer: {
    backgroundColor: '#8352EC',
    position: 'absolute',
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  footerItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    marginTop: 790,
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollLayoutTextStyle: {
    display: 'flex',
    color: '#184A2C',
    fontFamily: themeFont.indoPak, 
    textAlign: 'right',
  },
  
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E5EC',
  },
  content1: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  innerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  shadowTop: {
    position: 'absolute',
    top: 0,
    width: '100%', 
    height: 30, 
    resizeMode: 'stretch',
    zIndex: 2
  },
  shadowBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%', 
    height: 30,  
    resizeMode: 'stretch',
    zIndex: 999
  },
  shadowLeft: {
    position: 'absolute',
    left: 0,
    top: 30,
    bottom: 30,
    width: 30, 
    resizeMode: 'repeat',
    zIndex: 1,
    height: 'auto',
  },
  shadowRight: {
    position: 'absolute',
    right: Platform.OS === 'ios' ? 0.5 : 0, 
    top: 29.9, 
    bottom: 30,
    width: Platform.OS === 'ios' ? 31.4 : 30,
    resizeMode: 'repeat',
    zIndex: 9,
    height: 'auto',
  },
});