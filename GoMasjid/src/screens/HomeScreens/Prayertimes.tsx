import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";
import { prayertimes } from "../../styles/home/prayertimes";

interface SalahTiming {
  name: string;
  azan: string;
  iqama?: string;
}

interface PrayerTimesProps {
  viewType: "location" | "mosque";
  currentSalah?: string;
  salahTiming?: SalahTiming[]; // 👈 make optional, since we’ll default it
  setModalVisible: (visible: boolean) => void;
}

const PrayerTimes = ({
  viewType,
  currentSalah = "",
  salahTiming = [], // 👈 default to empty array
  setModalVisible,
}: PrayerTimesProps): React.ReactElement => {
  const formattedTime = (time: string) =>
    moment(time, "HH:mm").format("h:mm A");

  return (
    <View style={prayertimes.wrapper}>
      <View style={prayertimes.mosqueContainer}>
        {/* Header */}
        <View style={prayertimes.headerRow}>
          <Text style={prayertimes.prayersLabel}>PRAYERS</Text>
          <Text style={prayertimes.beginsLabel}>BEGINS</Text>
          {viewType === "mosque" && (
            <Text style={prayertimes.jamaatLabel}>JAMAAT</Text>
          )}
        </View>

        {/* Salah Rows */}
        {salahTiming.map(({ name, azan, iqama }) => {
          const isActive =
            ["fajr", "zuhr", "asr", "maghrib", "isha"].includes(
              currentSalah.toLowerCase()
            ) && name.toLowerCase() === currentSalah.toLowerCase();

          const azanTime = formattedTime(azan);
          const iqamaTime = iqama ? formattedTime(iqama) : "";

          return (
            <TouchableOpacity
              key={name}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.7}
              style={[
                prayertimes.prayerRow,
                isActive && prayertimes.prayerRowActive,
              ]}
            >
              <View style={prayertimes.prayerNameColumn}>
                <Text
                  style={
                    isActive
                      ? prayertimes.prayerNameActive
                      : prayertimes.prayerNameInactive
                  }
                >
                  {name.toUpperCase()}
                </Text>
              </View>

              <View style={prayertimes.prayerTimeColumn}>
                <Text
                  style={
                    isActive
                      ? prayertimes.prayerTimeActive
                      : prayertimes.prayerTimeInactive
                  }
                >
                  {azanTime}
                </Text>
              </View>

              {viewType === "mosque" && (
                <View style={prayertimes.prayerTimeColumn}>
                  <Text
                    style={
                      isActive
                        ? prayertimes.prayerTimeActive
                        : prayertimes.prayerTimeInactive
                    }
                  >
                    {iqamaTime || "–"}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default PrayerTimes;
