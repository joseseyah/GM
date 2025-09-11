// styles/adminportal.ts

import { StyleSheet, Platform, Dimensions } from 'react-native';
import { themeFont } from '../../styles/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerContainer: {
    marginBottom: 24,
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },

  backButton: {
    position: 'absolute',
    left: 20,
    top: 0,
    padding: 6,
  },

  headerTitle: {
    fontSize: 16, // ⬅️ reduced from 22
    fontWeight: '600',
    color: '#000', // ⬅️ changed from #001F4D
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: themeFont.englishFont,
  },
  

  avatarFallback: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3DC8B2',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  avatarFallbackText: {
    color: '#FFFFFF',
    fontFamily: themeFont.englishFont,
    fontSize: 48,
    fontWeight: '600',
  },

  nameText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#001F4D',
    textAlign: 'center',
    fontFamily: themeFont.englishFont,
    marginTop: 12,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    marginTop: 6,
  },

  infoText: {
    fontSize: 14,
    fontFamily: themeFont.englishFont,
    color: '#444',
    textAlign: 'center',
    maxWidth: 280,
  },

  maincontainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },

  sectionContainer: {
    marginTop: 28,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000',
    fontFamily: themeFont.englishFont,
  },

  card2: {
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  cardText: {
    fontSize: 15,
    fontFamily: themeFont.englishFont,
    fontWeight: '600',
    color: '#002E6E',
  },
});
