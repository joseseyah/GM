import axios from 'axios';

export const GoldAndSilver = async (currency: any) => {
  try {
    const response = await axios.get(
      'https://api.metalpriceapi.com/v1/latest',
      {
        params: {
          base: 'XAG',
          currencies: currency,
          type: 'gold & silver',
          nisab: '=INR*19.6878312',
          api_key: 'cf187916a0ca3e403218ca5db6c8f033',
        },
      },
    );
    // console.log('gold and silver', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const Location_searchData = async () => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      {
        params: {
          location: '52.9541645,-1.1696728',
          radius: 1500,
          type: 'mosque',
          keyword: 'mosque',
          key: 'AIzaSyBb6zx1cTwEeKvtMq-jbcMX9BMEeMVepeA',
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const LocationSearchData = async (
  lat: any,
  long: any,
  name: any = null,
  type: string = 'mosque',
  keyword: string = 'mosque',
) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      {
        params: {
          location: `${lat},${long}`,
          radius: 1500,
          type,
          keyword,
          key: 'AIzaSyBb6zx1cTwEeKvtMq-jbcMX9BMEeMVepeA',
          name,
        },
      },
    );
    console.log('hei wht', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAddress = async (latitude: any, longitude: any) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBb6zx1cTwEeKvtMq-jbcMX9BMEeMVepeA`;
  axios
    .get(url)
    .then(data => {
      // const address = json.results[0].formatted_address;
      console.log('Address: ', data);
      return data;
      // Do something with the address
    })
    .catch(error => {
      console.log(error);
    });
};

export const getTimings = async (lat: any, long: any) => {
  try {
    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();

    const response = await axios.get(
      `https://api.aladhan.com/v1/calendar/${currYear}/${currMonth}?method=2&latitude=${lat}&longitude=${long}`,
    );
    // console.log('json timings', JSON.stringify(response));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const currentLocationSearch = async (lat: any, long: any) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${long}&result_type=political&key=AIzaSyBb6zx1cTwEeKvtMq-jbcMX9BMEeMVepeA`,
    );
    console.log('current location', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const fetchCityCoordinates = async (cityName: string) => {
  try {
    // Replace with your preferred geocoding service API URL and make the request
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        cityName,
      )}&types=(cities)&key=AIzaSyBb6zx1cTwEeKvtMq-jbcMX9BMEeMVepeA`,
    );
    const data = await response.json();
    if (data.status === 'OK') {
      const predictionData = data.predictions.map((x: any) => {
        return {id: x.place_id, title: x.description};
      });
      console.log('yesss', predictionData);
      return predictionData;
    } else {
      console.error('predictionData request failed', data.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching city coordinates:', error);
    return null;
  }
};

export const GetGeocityName = async (RefId: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${RefId}&key=AIzaSyBb6zx1cTwEeKvtMq-jbcMX9BMEeMVepeA`,
    );
    const data = await response.json();

    // Check if the geocoding request was successful
    if (data.status === 'OK') {
      // console.log('getting data', data?.result?.geometry?.location);
      const {lat, lng} = data?.result?.geometry?.location;
      return {latitude: lat, longitude: lng};
    } else {
      console.error('Geocoding request failed:', data.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching city coordinates:', error);
    return null;
  }
};

export const PlaceId_searchData = async (placeid: any) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          placeid: placeid,
          key: 'AIzaSyBb6zx1cTwEeKvtMq-jbcMX9BMEeMVepeA',
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
