import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MasjidFacilities } from '../../common/MasjidFacilities';

type Props = {
  masjidInfo: {
    masjidfacilities: string[];
  };
  type: 'claimed' | 'unclaimed';
};

const Facilities = ({ masjidInfo, type }: Props) => {
  const iconColor = type === 'unclaimed' ? '#1c7c6e' : '#000000';
  const textColor = type === 'unclaimed' ? '#000000' : '#000000';

  const gradientStyle = {
    padding: 10,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
    alignItems: 'center',
    width: 80,
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 10 }}
    >
      {masjidInfo?.masjidfacilities?.map((key) => {
        const facility = MasjidFacilities[key];
        if (!facility) return null;

        return (
          <LinearGradient
            key={key}
            colors={['#ffffff', '#ffffff']}
            style={gradientStyle}
          >
            {facility.component &&
              React.cloneElement(facility.component, {
                color: iconColor,
                size: 24,
              })}
            <Text
              style={{
                fontSize: 10,
                fontWeight: '500',
                color: textColor,
                textAlign: 'center',
                marginTop: 6,
              }}
              numberOfLines={2}
            >
              {facility.label}
            </Text>
          </LinearGradient>
        );
      })}
    </ScrollView>
  );
};

export default Facilities;
