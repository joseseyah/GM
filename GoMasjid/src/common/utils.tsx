// import moment from 'moment';
import {Linking,Share} from 'react-native';
// export const formateTime = (time: string) => {
//   var dt = moment(time, ['h:mm A']).format('hh:mm A');
//   return dt;
// };
// export const formateTimeAdd = (time: any, add: any) => {
//   var dt = moment(time, ['h:mm A']).add(add, 'minutes').format('hh:mm A');
//   return dt;
// };
// const escapeRegExp = (string: string) => {
//   return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// };

export const handleMobilePress = (phoneNumber: any) => {
  Linking.openURL(`tel:${phoneNumber}`);
};
export const handleEmailPress = (email: any) => {
  Linking.openURL(`mailto:${email}`);
};
export const handleWebSearch = (website: string) => {
  const encodedWebsite = encodeURIComponent(website);
  const searchUrl = `https://www.google.com/search?q=${encodedWebsite}`;
  Linking.openURL(searchUrl);
};
export const isPlaceOpen = (openingTime: string, closingTime: string): boolean => {
  const now: Date = new Date();
  const currentHours: number = now.getHours();
  const currentMinutes: number = now.getMinutes();

  // Function to parse "06:00 AM" format
  interface ParsedTime {
    hours: number;
    minutes: number;
  }

  const parseTime = (timeStr: string): ParsedTime => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return { hours, minutes };
  };

  const { hours: openHours, minutes: openMinutes } = parseTime(openingTime);
  const { hours: closeHours, minutes: closeMinutes } = parseTime(closingTime);

  const isAfterOpening: boolean =
    currentHours > openHours || (currentHours === openHours && currentMinutes >= openMinutes);

  const isBeforeClosing: boolean =
    currentHours < closeHours || (currentHours === closeHours && currentMinutes <= closeMinutes);

  return isAfterOpening && isBeforeClosing;
};

export const handleDirection = (latitude: any, longitude: any) => {
  const GOOGLE_MAPS_API_URL = 'https://www.google.com/maps/dir/?api=1';
  const url = `${GOOGLE_MAPS_API_URL}&destination=${latitude},${longitude}`;

  Linking.openURL(url);
};

export const shareMessage = async (share_message: string) => {
  try {
    await Share.share({
      message: share_message,
    });
  } catch (error) {
    console.error('Error sharing:', error);
  }
};
// export const apiKey = 'AIzaSyBb6zx1cTwEeKvtMq-jbcMX9BMEeMVepeA';

// export const hijriDate = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
//   day: 'numeric',
//   month: 'long',
//   // weekday: 'narrow',
//   year: 'numeric',
// }).format(Date.now());
// export const removeUrlProtocol = (url: string) => {
//   return url.replace(/(^\w+:|^)\/\//, '');
// };
