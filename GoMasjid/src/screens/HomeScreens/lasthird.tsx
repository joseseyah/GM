import React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import { styles } from "../../styles/home/lastthird";

interface NavigationMenuProps {
  currentTime: moment.Moment;
  sunriseTime: moment.Moment;
  midnightTime: moment.Moment;
  lastThirdTime: moment.Moment;
  dhuhrTime: moment.Moment;
}

export const NavigationMenu = ({
  currentTime,
  sunriseTime,
  midnightTime,
  lastThirdTime,
  dhuhrTime,
}: NavigationMenuProps): React.ReactElement => {
  const highlightSunrise =
    currentTime.isSameOrAfter(sunriseTime) && currentTime.isBefore(dhuhrTime);
  const highlightMidnight =
    currentTime.isSameOrAfter(midnightTime) && currentTime.isBefore(lastThirdTime);
  const highlightLastThird =
    currentTime.isSameOrAfter(lastThirdTime) && currentTime.isBefore(sunriseTime);

  const getFrameStyle = (highlight: boolean) => [
    styles.frame,
    highlight && { backgroundColor: "#223F7A" },
  ];
  const getTextStyle = (highlight: boolean) => [
    styles.textWrapper,
    highlight && { color: "#FFF" },
  ];

  return (
    <View style={styles.navigationMenu}>
    {/* Sunrise */}
    <View style={styles.navigationMenuItem}>
      <View style={styles.div}>
        <View style={getFrameStyle(highlightSunrise)}>
          <Text style={getTextStyle(highlightSunrise)}>
            {sunriseTime.format("h:mm A")}
          </Text>
        </View>
        <Text style={styles.textWrapper2}>Sunrise</Text>
      </View>
    </View>

    {/* Midnight */}
    <View style={styles.navigationMenuItemWrapper}>
      <View style={styles.div}>
        <View style={getFrameStyle(highlightMidnight)}>
          <Text style={[styles.elementPM, highlightMidnight && { color: "#FFF" }]}>
            {midnightTime.format("h:mm A")}
          </Text>
        </View>
        <Text style={styles.textWrapper2}>Midnight</Text>
      </View>
    </View>

    {/* Last Third */}
    <View style={styles.navigationMenuItemWrapper}>
      <View style={styles.div}>
        <View style={getFrameStyle(highlightLastThird)}>
          <Text style={getTextStyle(highlightLastThird)}>
            {lastThirdTime.format("h:mm A")}
          </Text>
        </View>
        <Text style={styles.textWrapper2}>Last Third</Text>
      </View>
    </View>
  </View>

  );
};
