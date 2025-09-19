import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  // Header (like Qibla)
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#223F7A',
  },
  closeButton: { padding: 6 },

  // Search row
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  // THICK, FULL-WIDTH field
  inputWrapper: {
    flex: 1,
    width: '100%',                 // 👈 force full width
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F4F7',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 54,                    // 👈 thicker bar
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 17,
    color: '#0A0A0A',
    paddingVertical: 0,            // avoid extra Android height
    marginHorizontal: 10,          // spacing between icons and text
  },

  clearBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelButton: {
    marginLeft: 12,
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  cancelText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
  },
});
