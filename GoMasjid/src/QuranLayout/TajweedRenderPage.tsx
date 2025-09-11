import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TajweedRenderPageProps {
  tajweedText: string;
  arabicFont: string;
  arabicFontValue: number;
  textColor: string;
  backgroundColor: string;
}

interface TextSegment {
  text: string;
  color?: string;
}

const TajweedRenderPage: React.FC<TajweedRenderPageProps> = ({
  tajweedText,
  arabicFont,
  arabicFontValue,
  textColor,
  backgroundColor
}) => {
  const tajweedColors = {
    ghunnah: "#FF7E1E",
    qalaqah: "#DD0008",
    idgham_ghunnah: "#169200",
    idgham_wo_ghunnah: "#169200",
    iqlab: "#26BFFD",
    ikhafa: "#9400A8",
    ikhafa_shafawi: "#D500B7",
    idgham_shafawi: "#58B800",
    slnt: "#AAAAAA",
    ham_wasl: "#AAAAAA",
    madda_necessary: "#000EBC",
    madda_obligatory: "#2144C1",
    madda_permissible: "#4050FF",
    madda_normal: "#537FFF",
    idgham_mutajanisayn: "#A1A1A1",
    laam_shamsiyah: "#169200"
  };

  const parseTajweedText = (text: string): TextSegment[] => {
    const segments: TextSegment[] = [];
    const pattern = /<tajweed class=([^>]+)>([^<]+)<\/tajweed>|<span class=([^>]+)>([^<]+)<\/span>|([^<]+)/g;
    
    let match;
    while ((match = pattern.exec(text)) !== null) {
      if (match[1] && match[2]) {
        // Tajweed tag
        segments.push({
          text: match[2].trim(), // Ensure no extra spaces
          color: tajweedColors[match[1]] || textColor
        });
      } else if (match[3] && match[4]) {
        // Handle span tags properly (remove class but keep text)
        segments.push({
          text: match[4].trim(),
          color: textColor // Default color for non-Tajweed spans
        });
      } else if (match[5]) {
        // Plain text (removes any leftover HTML artifacts)
        const cleanedText = match[5].replace(/<\/?[^>]+(>|$)/g, "").trim();
        if (cleanedText) {
          segments.push({
            text: cleanedText,
            color: textColor
          });
        }
      }
    }
    return segments;
  };  
  
  const mergeSegmentsIntoWords = (segments: TextSegment[]) => {
    const mergedWords: TextSegment[][] = [];
    let currentWord: TextSegment[] = [];
  
    segments.forEach((segment, index) => {
      // Check if the text is ٱ (Alif Wasl)
      if (segment.text === "ٱ") {
        // Push the current word before adding ٱ separately
        if (currentWord.length > 0) {
          mergedWords.push([...currentWord]);
          currentWord = [];
        }
  
        // Add ٱ as a separate word with spaces around it
        mergedWords.push([{ text: " ٱ", color: segment.color }]); // Spaces before
  
      } else {
        // Normal text: add to current word
        currentWord.push(segment);
      }
  
      // Push the last word at the end
      if (index === segments.length - 1 && currentWord.length > 0) {
        mergedWords.push([...currentWord]);
      }
    });
  
    return mergedWords;
  };
  
  const segments = parseTajweedText(tajweedText);
  const mergedWords = mergeSegmentsIntoWords(segments);
//   console.log("segments from pageview", segments);

  return (
    // <View style={{ width: "100%", paddingHorizontal: 10 }}>
  <Text
    style={{
      writingDirection: "rtl",
      textAlign: "right",
      fontFamily: arabicFont,
      fontSize: arabicFontValue,
      color: textColor,
      backgroundColor: backgroundColor
    //   width: "100%", // Ensures wrapping inside the screen width
    //   flexWrap: "wrap", // Should allow text to break naturally
    }}
  >
    {mergedWords.map((word, wordIndex) => (
      <Text key={`word-${wordIndex}`}>
        {word.map((segment, segmentIndex) => (
          <Text key={`segment-${wordIndex}-${segmentIndex}`} style={{ color: segment.color }}>
            {segment.text}
          </Text>
        ))}
        {"\u00A0"} {/* Keeps spacing between words */}
      </Text>
    ))}
  </Text>
// </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
  },
  textContainer: {
    // textAlign: 'right',
    // writingDirection: 'rtl',
    // textAlignVertical: 'center',
    // includeFontPadding: false,
    // flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    writingDirection: 'rtl',
    textAlign: 'right',
  alignSelf: 'flex-start',
  },
  wordGroup: {
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  arabicText: {
    textAlign: 'center',
    writingDirection: 'rtl',
    textAlignVertical: 'center',
    includeFontPadding: false,
  }
});

export default TajweedRenderPage;