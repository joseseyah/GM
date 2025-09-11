import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { SheetManager } from 'react-native-actions-sheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CompassHeading from 'react-native-compass-heading';
import Geolocation from 'react-native-geolocation-service';
import { styles } from '../../styles/home/qibla';

import CircleSVG from '../../assets/svgs/qibla/circle.svg';
import DirectionSVG from '../../assets/svgs/qibla/drection.svg';

const { width } = Dimensions.get('window');

const QiblaSheet = () => {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [isFacingQibla, setIsFacingQibla] = useState(false);
  const [locationName, setLocationName] = useState('...');
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') return true;
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const calculateQiblaDirection = (lat: number, lon: number) => {
    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;

    const userLatRad = (Math.PI / 180) * lat;
    const userLonRad = (Math.PI / 180) * lon;
    const kaabaLatRad = (Math.PI / 180) * kaabaLat;
    const kaabaLonRad = (Math.PI / 180) * kaabaLon;

    const deltaLon = kaabaLonRad - userLonRad;

    const y = Math.sin(deltaLon) * Math.cos(kaabaLatRad);
    const x =
      Math.cos(userLatRad) * Math.sin(kaabaLatRad) -
      Math.sin(userLatRad) * Math.cos(kaabaLatRad) * Math.cos(deltaLon);

    const angle = Math.atan2(y, x) * (180 / Math.PI);
    const direction = (angle + 360) % 360;
    setQiblaDirection(direction);
  };

  const getUserLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    if (Platform.OS === 'ios') {
      await Geolocation.requestAuthorization('whenInUse');
    }

    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        calculateQiblaDirection(latitude, longitude);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const address = data.address;

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.hamlet ||
            'Unknown Area';
          const country = address.country || '';

          setLocationName(`${city}, ${country}`);
        } catch (error) {
          console.error('Reverse geocoding failed', error);
          setLocationName('Unknown');
        }
      },
      error => {
        console.error('Location error', error);
        setLocationName('Unavailable');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    getUserLocation();

    const degreeUpdateRate = 3;
    CompassHeading.start(degreeUpdateRate, ({ heading }: { heading: number }) => {
      setHeading(heading);

      const angleDiff = Math.abs(heading - qiblaDirection);
      const normalizedDiff = angleDiff > 180 ? 360 - angleDiff : angleDiff;
      setIsFacingQibla(normalizedDiff < 10);

      Animated.timing(rotateAnim, {
        toValue: heading,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      CompassHeading.stop();
    };
  }, [qiblaDirection]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ActionSheet
      id="qibla_sheet"
      gestureEnabled
      defaultOverlayOpacity={0.4}
      containerStyle={{ ...styles.sheetBackground, height: '75%' }}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Qibla</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => SheetManager.hide('qibla_sheet')}
          >
            <FontAwesome5 name="times" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Location display */}
        <View style={styles.locationWrapper}>
          <View style={styles.locationRow}>
            <Text style={styles.locationLabel}>LOCATION</Text>
            <FontAwesome5
              name="location-arrow"
              size={10}
              color="#B3ADB4"
              style={styles.locationIcon}
            />
          </View>
          <Text style={styles.locationName}>{locationName}</Text>
        </View>

        {/* Compass display */}
        <View style={styles.centerContent}>
          <View style={styles.compass}>
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <CircleSVG width={width * 0.8} height={width * 0.8} />
            </Animated.View>
            <View style={styles.directionOverlay}>
              <DirectionSVG width={70} height={70} fill="#30C18C" />
            </View>
          </View>

          {isFacingQibla && (
            <Text style={styles.facingText}>You're Facing Makkah</Text>
          )}
        </View>
      </View>
    </ActionSheet>
  );
};

export default QiblaSheet;
