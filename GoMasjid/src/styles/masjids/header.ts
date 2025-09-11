import { StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
  header: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '700',
    color: '#000',
  },
});
