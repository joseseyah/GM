import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  navigationMenu: {
    alignItems: "center",
    flexDirection: "row",
    height: 87,
    justifyContent: "space-between",
    paddingHorizontal: 4,
    width: 375,
  },
  navigationMenuItem: {
    alignItems: "center",
    flexDirection: "column",
    height: 107,
    justifyContent: "space-around",
    marginBottom: -10,
    marginTop: -10,
    width: 125,
  },
  navigationMenuItemWrapper: {
    alignItems: "center",
    flexDirection: "column",
    height: 107,
    justifyContent: "space-around",
    marginBottom: -10,
    marginLeft: -4,
    marginTop: -10,
    width: 125,
  },
  div: {
    alignItems: "center",
    flexDirection: "column",
    gap: 9, // Note: 'gap' works on modern RN versions; use marginBottom otherwise
  },
  frame: {
    alignItems: "flex-start",
    backgroundColor: "#F6F6F6", // Replace var(--grey-200)
    borderRadius: 9,
    padding: 15,
  },
  textWrapper: {
    color: "#223F7A", // dark blue
    fontSize: 16,
    fontWeight: "700", // make it bold
    height: 22,
    marginTop: -1,
    textAlign: "center",
  },
  
  elementPM: {
    color: "#223F7A", // dark blue
    fontSize: 16,
    fontWeight: "700", // make it bold
    height: 22,
    marginTop: -1,
    textAlign: "center",
  },
  
  
  textWrapper2: {
    color: "#000",    // Replace var(--textblack)
    fontSize: 14,     // Replace with actual px size
    fontWeight: "500",
    textAlign: "center",
  },
});
