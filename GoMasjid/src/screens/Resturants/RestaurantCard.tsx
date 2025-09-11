import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {themeFont} from '../../styles/theme';
import {handleDirection} from '../../common/utils';

const {height, width} = Dimensions.get('window');

export const RestaurantCard = React.memo(
  ({item}: any) => {

    const renderStars = (rating: number) => {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

      const stars = [];
      for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesome key={`full-${i}`} name="star" size={18} color="#3DC8B2" />);
      }

      if (halfStar) {
        stars.push(<FontAwesome key={`half`} name="star-half-full" size={18} color="#3DC8B2" />);
      }

      for (let i = 0; i < emptyStars; i++) {
        stars.push(<FontAwesome key={`empty-${i}`} name="star-o" size={18} color="#3DC8B2" />);
      }

      return stars;
    };

    return (
      <View style={styles.restrauntContainer}>
        <TouchableOpacity
          onPress={() =>
            handleDirection(item.latitude, item.longitude)
          }>
          {item.image ? (
            <Image source={{uri: item.image}} style={styles.img} />
          ) : (
            <View style={styles.imgTextCont}>
              <Text style={styles.imgText}>
                {item.name.charAt(0)}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() =>
              handleDirection(item.latitude, item.longitude)
            }>
            <View style={styles.cardContainer}>
              <Text style={styles.CardText}>{item.name}</Text>
              <Text style={styles.CardTwoText}>{item.distance} away</Text>
            </View>
            <View style={styles.ratingContainer}>
              {renderStars(item.rating)}
            </View>
          </TouchableOpacity>
        </View>

        {/* icon */}
        <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={styles.buttonView}
            onPress={() =>
              handleDirection(item.latitude, item.longitude)
            }>
            <FontAwesome
              name="chevron-right"
              size={20}
              color='#3DC8B2'
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);
const styles = StyleSheet.create({
  img: {
    width: 90,
    height: '100%',
    borderRadius: 12.56,
    backgroundColor: '#3DC8B2',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5
  },
  CardText: {
    fontFamily: themeFont.englishFont,
    fontWeight: '500',
    lineHeight: 15.25,
    letterSpacing: -0.25,
    fontSize: 14,
    color: '#202020',
  },
  CardTwoText: {
    color: '#727272',
    fontSize: 13,
    // fontWeight: '500',
    fontFamily: themeFont.englishFont,
    lineHeight: 18,
    marginTop: 5,
  },
  buttonView: {
    paddingLeft: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  restrauntContainer: {
    borderRadius: 15,
    backgroundColor:'#FFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 1.5,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    maxHeight: 120,
    height: 'auto'
  },
  imgTextCont: {
    width: 90,
    height: '100%',
    borderRadius: 12.56,
    backgroundColor: '#3DC8B2',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  imgText: {
    textAlign: 'center',
    fontSize: 41.98,
    fontWeight: '500',
    color: '#FFF',
  }
});
