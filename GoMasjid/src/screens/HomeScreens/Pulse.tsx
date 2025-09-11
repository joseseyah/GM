import React from "react";
import { View, StyleSheet } from "react-native";

export const Pulse = (): React.ReactElement => {
  return (
    <View style={styles.pulseWrapper}>
      <View style={styles.outerCircle}>
        <View style={styles.innerDot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pulseWrapper: {
    position: "absolute",
    top: 18,
    left: 227,
    width: 20,
    height: 20,
  },
  outerCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1.69,
    borderColor: "rgba(34, 63, 122, 1)", // sleep-500
    justifyContent: "center",
    alignItems: "center",
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(34, 63, 122, 1)",
  },
});
