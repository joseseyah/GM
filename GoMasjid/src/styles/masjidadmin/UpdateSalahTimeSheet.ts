import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center', // Center the top title
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  dbuttonContainer: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#ADD9F7', // Updated color
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#002E6E',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});
