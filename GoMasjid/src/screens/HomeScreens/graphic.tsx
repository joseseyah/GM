import React from "react";
import { ScrollView, View, Dimensions, StyleSheet } from "react-native";
import Curve from "../../assets/svgs/graphic/curve.svg";
import Line from "../../assets/svgs/graphic/line.svg"; // 👈 import your new line

const screenWidth = Dimensions.get("window").width;

export const Graphic = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{}}
    >
      <View
        style={{
          width: screenWidth * 2,
          aspectRatio: 829 / 112,
          marginBottom: 8,
        }}
      >
        {/* Both SVGs stacked on top of each other */}
        <View style={StyleSheet.absoluteFillObject}>
          <Line width="100%" height="100%" />
        </View>
        <View style={StyleSheet.absoluteFillObject}>
          <Curve width="100%" height="100%" />
        </View>
      </View>
    </ScrollView>
  );
};
