import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  currentSalahText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#19335A',
  },
  timeBadge: {
    marginTop: 8,
    backgroundColor: '#19335A',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  timeBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  timelineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: width - 40,
    paddingHorizontal: 10,
  },
  timelineStep: {
    alignItems: 'center',
    flex: 1,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#ccc',
    marginBottom: 4,
  },
  timelineDotActive: {
    backgroundColor: '#19335A',
  },
  timelineLabel: {
    fontSize: 12,
    color: '#999',
  },
  timelineLabelActive: {
    color: '#19335A',
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  activeLocationButton: {
    backgroundColor: '#223F7A',
    paddingVertical: 12, // increased thickness
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  activeLocationText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14, // added for thicker visual appearance
  },
  inactiveLocationButton: {
    backgroundColor: '#F0F2F5',
    paddingVertical: 12, // increased thickness
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  inactiveLocationText: {
    color: '#555',
    fontWeight: '500',
    fontSize: 14, // added for thicker visual appearance
  },

  dateRow: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '700', // Make it bold
  },

  prayerList: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 8,
  },
  prayerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#E6EAF0',
  },
  activePrayerItem: {
    backgroundColor: '#19335A10',
  },
  prayerName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  activePrayerName: {
    fontSize: 16,
    color: '#19335A',
    fontWeight: '700',
  },
  prayerTime: {
    fontSize: 15,
    color: '#666',
  },
  activePrayerTime: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
  },
  markersRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E6EAF0',
  },
  markerBox: {
    alignItems: 'center',
  },
  markerTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#19335A',
  },
  markerLabel: {
    fontSize: 12,
    color: '#555',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    borderTopWidth: 1,
    borderColor: '#E6EAF0',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  navTextActive: {
    fontSize: 12,
    color: '#19335A',
    marginTop: 4,
    fontWeight: '600',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});