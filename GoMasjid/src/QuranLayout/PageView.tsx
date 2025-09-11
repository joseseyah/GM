import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SettingsContext } from '../context/SettingsProvider';
import playerStore from '../stores/playerStore';
import SurahHeader from './SurahHeader';
import settingsStore from '../stores/settingsStore';
import { themeFont } from '../styles/theme';
import JuzHeader from './JuzHeader';
import TajweedRenderer from './TajweedRenderPage';

type Props = {
  verses: any[];
  sHeader: {
    number: number;
    type: string;
    name: string;
    total_ayah: string;
    divider_on_ayah: string[];
    divider_meta: {
      [key: string]: {
        divider_arabic: string;
        divider_english: string;
        divider_transliteration: string;
      };
    };
  };
  listRef: any;
  itemPositions: any;
};

const PageView = ({ verses, sHeader, itemPositions, listRef }: Props) => {
  const {isPlaying, isBismillah, currentTrackId} = playerStore();
  const {arabicFontValue, arabicFont} = settingsStore();
  const { settings } = useContext(SettingsContext);
  // const listRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const juzMeta = {name: sHeader.name, total_ayah: sHeader.total_ayah, number: sHeader.number};

  const renderVerseContent = () => {
    let content: React.ReactNode[] = [];
    let currentText = null;

    verses.forEach((verse, index) => {
      // Handle surah header
      if (sHeader.divider_on_ayah.includes(verse.verse_key)) {
        if (currentText) {
          content.push(
            <Text key={`text-${index}`} style={styles.verseContainer}>
              {currentText}
            </Text>
          );
          currentText = null;
        }
        
        const surahMeta = sHeader.divider_meta[verse.verse_key];
        content.push(
          <View key={`header-${verse.verse_key}`} style={styles.headerContainer}>
            <SurahHeader meta={surahMeta} isJuz={true} showBismillah={true} />
          </View>
        );
      }

      // Handle verse content
      if (settings?.font?.displayTajweed) {
        const isCurrentVerse = verse.verse_key === currentTrackId;
        const backgroundColor = isCurrentVerse && isPlaying && !isBismillah ? '#4C20AA' : 'transparent';
        const textColor = isCurrentVerse && isPlaying && !isBismillah ? '#ffffff' : 
                         settings?.font?.theme === 'light' ? '#202020' : '#ffffff';

        if (!currentText) {
          content.push(
            <View key={`tajweed-container-${index}`} style={styles.tajweedContainer}>
              <TajweedRenderer
                tajweedText={`${verse.tajweed_text} ۝ `}
                arabicFont={arabicFont}
                arabicFontValue={arabicFontValue}
                textColor={textColor}
                backgroundColor={backgroundColor}
                key={`tajweed-container-${index}`}
              />
            </View>
          );
        } else {
          content.push(
            <Text key={`text-${index}`} style={styles.verseContainer}>
              {currentText}
            </Text>
          );
          currentText = null;
        }
      } else {
        const text = settings?.font?.script === "uthmani" ? verse.text_uthmani : verse.text_indopak;
        const verseText = (
          <Text
            key={verse.verse_key}
            style={[
              styles.verseText,
              {
                fontSize: settings?.font?.arabicSize || 30,
                color: verse.verse_key === currentTrackId && isPlaying && !isBismillah 
                  ? '#ffffff' 
                  : settings?.font?.theme === 'light' ? '#202020' : '#ffffff',
                backgroundColor: verse.verse_key === currentTrackId && isPlaying && !isBismillah ? '#4C20AA' : 'transparent',
                borderRadius: verse.verse_key === currentTrackId && isPlaying && !isBismillah ? '15px' : '0',
                // fontFamily: settings?.font?.script == 'uthmani' ? themeFont.uthmaniFont : themeFont.arabicFont,
              },
            ]}>
            {text}
            <Text style={[styles.ayahSymbol, {borderRadius: verse.verse_key === currentTrackId && isPlaying && !isBismillah ? '15px' : '0'}]}> ۝ </Text>
          </Text>
        );

        currentText = [
          ...(currentText || []),
          verseText
        ];
      }
    });

    if (currentText) {
      content.push(
        <Text key="final-text" style={styles.verseContainer}>
          {currentText}
        </Text>
      );
    }

    return content;
  };

  return (
    <>
    {sHeader.type === 'surah' ? (
      <SurahHeader
        meta={sHeader}
        isJuz={false}
        showBismillah={sHeader?.number == 9 ? false : true}
      />
    ) : (
      <View style={{height: '15%'}}>
        <JuzHeader
          meta={juzMeta}
          isSurah={false}
        />
      </View>
    )}
    <ScrollView
      ref={listRef}
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <View style={[styles.pageContainer, { width: width - 32 }]}>
        <View style={styles.versesContainer}>
          {renderVerseContent()}
        </View>
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  pageContainer: {
    marginBottom: 100,
    borderColor: '#D4A9FF',
    borderWidth: 1,
    borderRadius: 15,
    borderBottomColor: 'transparent',
    padding: 15,
  },
  versesContainer: {
    width: '100%',
    // direction: 'rtl',
    textAlign: 'center',
  },
  verseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  tajweedContainer: {
    display: 'flex',
    // flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    flexDirection: 'row-reverse',
    // textAlign: 'right'
    // writingDirection: 'rtl',
    // width: '100%',
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
  },
  headerContainer: {
    width: '100%',
    marginVertical: 10,
  },
  verseText: {
    fontFamily: themeFont.indoPak,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  ayahSymbol: {
    fontSize: 24,
    color: '#666',
  },
});

export default PageView;
