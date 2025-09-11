import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: "#FFF",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12, // ✅ reduced spacing between title and chip
    paddingHorizontal: 6,
  },
  headingText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    fontFamily: "System",
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#223F7A",
    justifyContent: "center",
    alignItems: "center",
  },
  chipWrapper: {
    marginTop: 0,
    alignSelf: "flex-start",
    backgroundColor: "#223F7A",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "System",
    color: "#FFF",
  },
});
