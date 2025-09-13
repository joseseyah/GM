import { StyleSheet } from "react-native";

export const prayertimes = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderWidth: 2,          // 👈 add this
    borderColor: "#1D3F84",  // 👈 blue outline
  },
  

  mosqueContainer: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#f9f9f9",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  prayersLabel: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.5,
  },

  beginsLabel: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.5,
  },

  jamaatLabel: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.5,
  },

  prayerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  prayerRowActive: {
    backgroundColor: "#1D3F84",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 4,
  },

  prayerNameColumn: {
    minWidth: 80,
  },

  prayerTimeColumn: {
    minWidth: 70,
    alignItems: "flex-end",
  },

  prayerNameInactive: {
    color: "#000", // changed from #666 to black
    fontSize: 15,
    fontWeight: "500",
  },
  
  prayerTimeInactive: {
    color: "#000", // changed from #666 to black
    fontSize: 14,
    fontWeight: "500",
  },
  

  prayerNameActive: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  prayerTimeActive: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  prayerTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  notifyIcon: {
    height: 24,
    width: 24,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
