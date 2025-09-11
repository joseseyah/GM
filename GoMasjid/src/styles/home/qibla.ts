import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  sheetBackground: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -10 }],
    padding: 8,
  },

  locationWrapper: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  locationLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#444",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  locationIcon: {
    marginLeft: 6,
    marginTop: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },

  compass: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginTop: 10,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  
  directionOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  facingText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "700",
    color: "#30C18C",
    textAlign: 'center',
  },
});
