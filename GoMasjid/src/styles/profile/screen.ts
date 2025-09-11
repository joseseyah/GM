import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 28 : 18,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  screenTitle: {
    fontSize: 20, // more moderate size
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginVertical: 12,
    fontFamily: 'System',
  },
  
  profileBlock: {
    alignItems: 'center',
    marginBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingBottom: 20,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 32,
    color: '#888',
    fontWeight: '600',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'System',
  },
  joinedText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontFamily: 'System',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
    fontFamily: 'System',
  },
  statLabelListening: {
    fontSize: 11,
    backgroundColor: '#DCE6FA', // softened variant of #223F7A
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    color: '#223F7A',
    overflow: 'hidden',
    fontFamily: 'System',
  },
  statLabelRead: {
    fontSize: 11,
    backgroundColor: '#E5F5EF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    color: '#223F7A',
    overflow: 'hidden',
    fontFamily: 'System',
  },
  statLabelStreak: {
    fontSize: 11,
    backgroundColor: '#E7F0FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    color: '#223F7A',
    overflow: 'hidden',
    fontFamily: 'System',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    fontFamily: 'System',
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  
  rowText: {
    fontSize: 15,
    color: '#223F7A',
    fontWeight: '600',
    fontFamily: 'System',
  },
  
  
  arrow: {
    fontSize: 16,
    color: '#223F7A',
  },
  
  buttonBlock: {
    marginTop: 30,
    paddingBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#223F7A',
    paddingVertical: 16,
    borderRadius: 30, // ⬅️ more round
    alignItems: 'center',
    marginBottom: 12,
  },
  
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 16,
    borderRadius: 30, // ⬅️ more round
    alignItems: 'center',
  },
  
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
  deleteText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
});
