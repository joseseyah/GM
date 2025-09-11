import { StyleSheet, Platform, Dimensions } from 'react-native';
import { themeFont } from '../../styles/theme';

export const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F8F8F8',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 0,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 3,
      },
      cardHeader: {
        fontSize: 12,
        fontWeight: '700',
        color: '#282828',
        textTransform: 'uppercase',
      },
      cardText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#282828',
      },
      row1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
      },
      
    container: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: Platform.OS === 'ios' ? 40 : 10,
      position: 'relative',
      paddingBottom: 20,
      backgroundColor: '#fff',
    },
    container1: {
      marginBottom: Platform.OS === 'ios' ? 80 : 60,
    },
    tableContainer: {
      marginHorizontal: 15,
      marginVertical: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    rowInner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    column: {
      flex: 1.5,
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-around',
    },
    text: {
      color: '#282828',
      fontWeight: '600',
    },
    textInput: {
      color: '#282828',
      paddingHorizontal: 5,
      textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8, // reduced to tighten gap above calendar
        position: 'relative',
        paddingTop: 4,
        paddingBottom: 4,
      },
      
    dateTimeText: {
      fontSize: 18,
      marginBottom: 10,
      fontFamily: themeFont.englishFont,
      color: '#282828',
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#282828',
    },
    doneButton: {
      marginTop: 10,
      padding: 10,
    },
    doneText: {
      color: '#007AFF',
      fontSize: 16,
    },
    calendarCard: {
        backgroundColor: '#F8F8F8',
        paddingVertical: 25,
        paddingHorizontal: 25,
        borderRadius: 20,
        marginHorizontal: 0,
        marginTop: 0,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
      },
      
      
    buttonContainer: {
        backgroundColor: '#002B5B', // deep blue
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 100, // pill shape
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 30,
      },
      updatebuttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        fontFamily: themeFont.englishFont,
      },
      cardHeaderRow: {
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
        paddingBottom: 10,
      },
      
    headerContainer: {
      position: 'absolute',
      right: 20,
      top: 20,
    },
    dateContainer: {
      justifyContent: 'center',
      borderBottomColor: '#DDD',
      borderBottomWidth: 1,
      paddingVertical: 10,
    },
    date: {
      fontSize: 15,
      fontWeight: '600',
      fontFamily: themeFont.englishFont,
      color: '#282828',
      textAlign: 'center',
      lineHeight: 20,
    },
    calendar: {
      height: 150,
      width: '100%',
    },
    calendarContent: {
      flexGrow: 1,
      textAlign: 'center',
    },
    addJummahIcon: {
      position: 'absolute',
      right: -20,
      top: -18,
    },
  });