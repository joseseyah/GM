import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { styles as baseStyles } from "../../styles/home/headings";
import { SheetManager } from 'react-native-actions-sheet';

interface HeadingProps {
  currentSalah: string;
  timeLeft: string;
  nextSalah: string;
  onKaabaPress?: () => void;
  debug?: boolean;
}

export const Heading = ({
  currentSalah,
  timeLeft,
  nextSalah,
  onKaabaPress,
  debug = false,
}: HeadingProps): React.ReactElement => {
  useEffect(() => {
  }, [onKaabaPress]);

  const formattedTimeLeft = (): string => {
    const [hStr = "0", mStr = "0", sStr = "0"] = timeLeft.split(":");
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    const s = parseInt(sStr, 10);
    const next = nextSalah.toUpperCase();
  
    if (h > 0 && m > 0) return `${h} hr${h > 1 ? "s" : ""} ${m} min${m > 1 ? "s" : ""} UNTIL ${next}`;
    if (h > 0) return `${h} hr${h > 1 ? "s" : ""} UNTIL ${next}`;
    if (m > 0) return `${m} min${m > 1 ? "s" : ""} UNTIL ${next}`;
    return `${s} sec${s > 1 ? "s" : ""} UNTIL ${next}`;
  };
  

  const formatSalahLabel = (label: string): string => {
    return label
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <View style={baseStyles.container}>
      <View style={baseStyles.row}>
        <Text style={baseStyles.headingText}>
          {formatSalahLabel(currentSalah)}
        </Text>

        <TouchableOpacity
          style={[baseStyles.iconWrapper, debug && styles.debugIconWrapper]}
          activeOpacity={0.7}
          onPress={() => {
            SheetManager.show('qibla_sheet');
          }}
        >
          <FontAwesome5 name="kaaba" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={baseStyles.chipWrapper}>
        <Text style={baseStyles.chipText}>{formattedTimeLeft()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  debugIconWrapper: {
    zIndex: 999,
    position: "relative",
    padding: 12,
    backgroundColor: "#223F7A",
    borderRadius: 999,
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});
