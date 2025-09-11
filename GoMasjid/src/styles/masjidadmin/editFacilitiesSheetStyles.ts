import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  sheetContainer: {
    height: height * 0.65,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingVertical: 8,
  },
  
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#282828',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#002E6E',
    paddingVertical: 16,
    borderRadius: 999, // ← fully rounded
    alignItems: 'center',
    marginTop: 20,
  },
  
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
