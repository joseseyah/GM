// styles/facilities.ts

import { StyleSheet } from 'react-native';

export const facilitiesStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
});
