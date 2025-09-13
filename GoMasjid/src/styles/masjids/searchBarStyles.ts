import { StyleSheet } from "react-native";

export const searchBarStyles = StyleSheet.create({
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 12,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // Android shadow
    borderWidth: 2,
    borderColor: "#1D3F84", // matches your outlined boxes
  },
  textInput: {
    flex: 1,
    height: 44,
    color: "#000",
    fontSize: 15,
    paddingHorizontal: 8,
  },
  description: {
    color: "#000",
    fontSize: 14,
  },
  listView: {
    maxHeight: 500,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    elevation: 2,
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
});
