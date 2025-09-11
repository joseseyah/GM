import { StyleSheet } from 'react-native';

export const masjidDetailsStyles = StyleSheet.create({
  masjidDetails: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  masjidLogo: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 16,
    marginTop:0
  },
  masjidName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  masjidAddress: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  websiteLink: {
    fontSize: 14,
    color: '#3DC8B2',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
