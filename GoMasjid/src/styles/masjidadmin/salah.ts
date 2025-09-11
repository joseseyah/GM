import { StyleSheet, Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  sheetContainer: {
    height: height * 0.85,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 5,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#282828',
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  calendarWrapper: {
    marginBottom: 16,
  },
  tableContainer: {
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 6,
  },
  rowInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontWeight: '500',
    fontSize: 14,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 15,
    color: '#666',
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minWidth: width * 0.2,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#002E6E',
  },
  saveButton: {
    backgroundColor: '#002E6E',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: Platform.OS === 'ios' ? 30 : 20,
  },
  saveText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
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
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  doneButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#002E6E',
    borderRadius: 8,
  },
  doneText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  
});
