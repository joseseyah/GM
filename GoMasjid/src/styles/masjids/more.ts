import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  sheetContainer: {
    height: '30%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pressed: {
    opacity: 0.5,
  },
  icon: {
    marginRight: 12,
    paddingTop: 2,
  },
  textBlock: {
    flex: 1,
  },
  primary: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  secondary: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
});
