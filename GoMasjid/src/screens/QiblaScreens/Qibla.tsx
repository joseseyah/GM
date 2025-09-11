import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import Geolocation from 'react-native-geolocation-service';
import { moderateScale } from 'react-native-size-matters';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Header from '../../common/Header';
import { themeFont } from '../../styles/theme';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Qibla = ({navigation, route}: any) => {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [message, setMessage] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [isFacingQibla, setIsFacingQibla] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });
  const rotateValue = new Animated.Value(0);

  useEffect(() => {
    const degreeUpdateRate = 3;

    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        return true; // iOS automatically handles permissions
      }

      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'App Location Permission',
            message: 'App needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Location permission error:', err);
        return false;
      }
    };

    // const calculateQiblaDirection = (userLat: number, userLon: number) => {
    //   const kaabaLat = 21.4225; // Kaaba latitude
    //   const kaabaLon = 39.8262; // Kaaba longitude

    //   const deltaLon = kaabaLon - userLon;
    //   const y =
    //     Math.sin(deltaLon * (Math.PI / 180)) *
    //     Math.cos(kaabaLat * (Math.PI / 180));
    //   const x =
    //     Math.cos(userLat * (Math.PI / 180)) *
    //       Math.sin(kaabaLat * (Math.PI / 180)) -
    //     Math.sin(userLat * (Math.PI / 180)) *
    //       Math.cos(kaabaLat * (Math.PI / 180)) *
    //       Math.cos(deltaLon * (Math.PI / 180));

    //   const qiblaAngle = Math.atan2(y, x) * (180 / Math.PI);
    //   const adjustedQiblaDirection = (qiblaAngle + 360) % 360; // Normalize to 0-360

    //   setQiblaDirection(adjustedQiblaDirection);
    // };

    const calculateQiblaDirection = (userLat: number, userLon: number) => {
      const kaabaLat = 21.4225;
      const kaabaLon = 39.8262;

      const userLatRad = (Math.PI / 180) * userLat;
      const userLonRad = (Math.PI / 180) * userLon;
      const kaabaLatRad = (Math.PI / 180) * kaabaLat;
      const kaabaLonRad = (Math.PI / 180) * kaabaLon;

      const deltaLon = kaabaLonRad - userLonRad;

      const y = Math.sin(deltaLon) * Math.cos(kaabaLatRad);
      const x =
        Math.cos(userLatRad) * Math.sin(kaabaLatRad) -
        Math.sin(userLatRad) * Math.cos(kaabaLatRad) * Math.cos(deltaLon);

      const angle = Math.atan2(y, x) * (180 / Math.PI);
      const qiblaDirection = (angle + 360) % 360; // Normalize to 0-360

      setQiblaDirection(qiblaDirection);
    };

    const getUserPosition = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        console.log('No permission for Location Access');
        setMessage('App requires location access. Please enable it.');
        return;
      }

      setMessage('');

      if (Platform.OS === 'ios') {
        await Geolocation.requestAuthorization('whenInUse');
      }

      Geolocation.getCurrentPosition(
        async position => {
          const userPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          console.log('User position:', userPosition);
          setCurrentLocation(userPosition);
          calculateQiblaDirection(
            userPosition.latitude,
            userPosition.longitude,
          );
          console.log(
            'Fetching location for:',
            userPosition.latitude,
            userPosition.longitude,
          );
          // Reverse geocoding to get the city name
          // fetch(
          //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userPosition.latitude},${userPosition.longitude}&key=AIzaSyBb6zx1cTwEeKvtMq-jbcMX9BMEeMVepeA`,
          // )
          //   .then(response => response.json())
          //   .then(data => {
          //     console.log('Geocoding data:', data); // Log the full response
          //     if (data.results && data.results.length > 0) {
          //       const addressComponents = data.results[0].address_components;
          //       const cityComponent = addressComponents.find(
          //           (component: { types: string | string[]; }) =>
          //           component.types.includes('locality') ||
          //           component.types.includes('administrative_area_level_1'),
          //       );
          //       const city = cityComponent
          //         ? cityComponent.long_name
          //         : 'Unknown City';
          //       setCurrentCity(city);
          //     } else {
          //       setCurrentCity('No results found');
          //     }
          //   })
          //   .catch(error => {
          //     console.warn('Geocoding error:', error);
          //     setCurrentCity('Error fetching city');
          //   });
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${userPosition.latitude}&lon=${userPosition.longitude}&format=json`
          );
          const data = await response.json();
          const address = data.address;

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.hamlet ||
            'Unknown';
            const country = address.country || 'Unknown';

          console.log('City:', city, country);
          const current = city+", "+country; 
          setCurrentCity(current);
        },
        error => {
          console.log('Geolocation error:', error.code, error.message);
          setMessage('Unable to retrieve location. Please try again.');
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    };

    const startCompass = () => {
      CompassHeading.start(degreeUpdateRate, ({ heading, accuracy }: { heading: number; accuracy: number }) => {
        if (accuracy < 0) {
          console.error('Compass accuracy is too low:', accuracy);
          return;
        }
        setHeading(heading);

        // Check if facing Qibla
        const angleDifference = Math.abs(heading - qiblaDirection);
        setIsFacingQibla(angleDifference < 10); // 10 degrees threshold

        // Rotate the compass image
        Animated.timing(rotateValue, {
          toValue: heading,
          duration: 100,
          useNativeDriver: true,
        }).start();
      });
    };

    getUserPosition();
    startCompass();

    return () => {
      CompassHeading.stop();
    };
  }, [qiblaDirection]); // Re-run effect when qiblaDirection changes

  const rotateStyle = {
    transform: [{rotate: `${-heading}deg`}],
  };

  const getCardinalDirection = () => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(heading / 45) % 8;
    return directions[index];
  };

  const getRotationInstruction = () => {
    if (isFacingQibla) {
      return 'Now you are facing Qibla!';
    } else {
      const angleDifference = (qiblaDirection - heading + 360) % 360;
      return angleDifference <= 180
        ? 'Rotate right to face Qibla'
        : 'Rotate left to face Qibla';
    }
  };

  return ( 
    <ImageBackground
      source={require('../../assets/images/readduaBackground.png')}
      style={styles.mainContainer}>
      <View>
        <Header
          title="Qibla"
          onBack={() => navigation.goBack()}
          titleColor="#F4F4F4"
          iconColor="#F4F4F4"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end', // Align items to the right
            width: '100%',
            top: -40,
            gap: 5,
          }}>
          <Text
            style={{
              color: '#F4F4F4',
              marginRight: 5,
              fontSize: 13,
              fontWeight: '500',
            }}>
            {currentCity}
          </Text>
          <FontAwesome6 name="location-dot" color="#F4F4F4" size={13} />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.compassContainer}>
        {isFacingQibla ? (
          <Animated.Image
            source={require('../../assets/images/QiblaFinder.png')}
            style={[styles.compassImage, rotateStyle]}
          />
          ) : <Animated.Image
          source={require('../../assets/images/QiblaFinderWrongDirection.png')}
          style={[styles.compassImage, rotateStyle]}
          />
          }
          <View style={styles.overlay}>
            <Text style={styles.headingValue}>{`${heading.toFixed(2)}°`}</Text>
            <Text style={styles.qiblaDirection}>{getCardinalDirection()}</Text>
            {message ? (
              <Text style={styles.errorMessage}>{message}</Text>
            ) : null}

            {/* Show Qibla image when facing Qibla */}
            {isFacingQibla && (
              <Image
                source={require('../../assets/images/Qibla.png')}
                style={styles.qiblaImage}
              />
            )}
          </View>
        </View>
        <Text style={styles.rotationDirection}>{getRotationInstruction()}</Text>
      </View>
      {/* <BottomMenu /> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    paddingHorizontal: 15,
    paddingBottom: screenHeight / 6,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  compassImage: {
    width: moderateScale(400, 0.25),
    height: moderateScale(400, 0.25),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingValue: {
    fontSize: 20,
    color: '#F4F4F4',
    position: 'absolute',
    top: '54%',
    lineHeight: 22.34,
  },
  qiblaDirection: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F4F4F4',
    position: 'absolute',
    top: '44%',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    position: 'absolute',
    top: '64%',
  },
  qiblaImage: {
    width: moderateScale(50, 0.25),
    height: moderateScale(50, 0.25),
    position: 'absolute',
    top: '20%',
    left: '40%', // Center horizontally
  },
  rotationDirection: {
    color: '#F4F4F4',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
    fontFamily: themeFont.englishFont,
  },
});

export default Qibla;
