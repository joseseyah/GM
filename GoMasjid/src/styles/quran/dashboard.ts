import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContainer: {
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 28, // More horizontal breathing space
  },
  
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 6, // NEW – adds extra space inside the row
  },
  
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bismillahWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  bismillahImage: {
    width: 260,
    height: 55,
    resizeMode: 'contain',
  },
});
