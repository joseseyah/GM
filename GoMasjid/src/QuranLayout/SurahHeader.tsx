import React, { useContext } from 'react';
import { Text, View, Image } from 'react-native';
import { SettingsContext } from '../context/SettingsProvider';
import { themeFont } from '../styles/theme';

import BismillahSvg from '../assets/svgs/bismillah.svg';

type Props = {
  meta: any;
  isJuz: Boolean;
  showBismillah: Boolean;
};

const SurahHeader = ({ meta, isJuz, showBismillah }: Props) => {
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
        {/* Left side: Surah name and translation */}
        <View style={{ flexDirection: 'column', maxWidth: '50%' }}>
          {isJuz ? (
            <Text
              style={{
                fontSize: 30,
                marginBottom: 4,
                color: '#FFFFFF',
                fontFamily: themeFont.indoPak,
                fontWeight: '600',
              }}>
              {meta?.divider_arabic}
            </Text>
          ) : (
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
          )}
          {isJuz ? (
            <Text
              style={{
                fontSize: 12,
                color: '#ADD9F7',
                fontFamily: themeFont.englishFont,
                fontWeight: '500',
                lineHeight: 14,
              }}>
              {meta?.divider_transliteration} – {meta?.divider_translated_name}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 13,
                color: '#ADD9F7',
                fontFamily: themeFont.englishFont,
                fontWeight: '500',
              }}>
              {meta?.translated_name}
            </Text>
          )}
        </View>

        {/* Right side: Bismillah and metadata */}
        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
        {showBismillah && (
          <View style={{ marginBottom: 10 }}>
            <BismillahSvg width={140} height={30} fill="#C7DFF5" />
          </View>
        )}

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 11,
                color: '#ADD9F7',
                fontFamily: themeFont.englishFont,
                textTransform: 'uppercase',
                marginRight: 6,
              }}>
              {isJuz ? meta?.divider_revelation_place : meta?.revelation_place}
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
              {isJuz ? meta?.divider_verses_count : meta?.total_ayah} VERSES
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SurahHeader;
