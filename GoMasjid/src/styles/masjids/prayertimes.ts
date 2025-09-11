import { StyleSheet } from 'react-native';

export const prayerTimesStyles = StyleSheet.create({
  dateWrapper: {
    marginVertical: 12,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
  },
  prayerTable: {
    marginHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#F7F7F7',
    padding: 10,
  },
  prayerRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 6,
  },
  prayerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  prayerCol: {
    width: '33%',
    textAlign: 'center',
    fontSize: 14,
  },
});
