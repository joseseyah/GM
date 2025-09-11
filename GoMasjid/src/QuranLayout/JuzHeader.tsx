import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { SettingsContext } from '../context/SettingsProvider';
import { themeFont } from '../styles/theme';

import BismillahSvg from '../assets/svgs/bismillah.svg';

type Props = {
  meta: any;
  isSurah: boolean;
};

const JuzHeader = ({ meta, isSurah }: Props) => {
  const { settings } = useContext(SettingsContext);

  return (
    <View
      style={{
        backgroundColor: '#223F7A',
        borderRadius: 16,
        marginVertical: 10,
        paddingVertical: 16,
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {/* Left: Juz Name */}
        <View style={{ flexDirection: 'column', maxWidth: '50%' }}>
          <Text
            style={{
              fontSize: 18,
              color: '#FFFFFF',
              fontFamily: themeFont.englishFont,
              fontWeight: '700',
              marginBottom: 2,
            }}>
            {meta?.name}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#ADD9F7',
              fontFamily: themeFont.englishFont,
              fontWeight: '500',
            }}>
            Juz {meta?.number}
          </Text>
        </View>

        {/* Right: Bismillah + Meta */}
        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
          <View style={{ marginBottom: 10 }}>
            <BismillahSvg width={140} height={30} fill="#C7DFF5" />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 11,
                color: '#ADD9F7',
                fontFamily: themeFont.englishFont,
                textTransform: 'uppercase',
                marginRight: 6,
              }}>
              {meta?.revelation_place}
            </Text>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: '#ADD9F7',
                marginRight: 6,
              }}
            />
            <Text
              style={{
                fontSize: 11,
                color: '#ADD9F7',
                fontFamily: themeFont.englishFont,
              }}>
              {meta?.total_ayah} VERSES
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default JuzHeader;
