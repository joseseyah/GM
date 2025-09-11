import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface QuranVerseRendererProps {
  tajweedText: string;
  arabicFont: string;
  arabicFontValue: number;
  textColor: string;
}

interface TextSegment {
  text: string;
  color?: string;
}

const QuranVerseRenderer: React.FC<QuranVerseRendererProps> = ({
  tajweedText,
  arabicFont,
  arabicFontValue,
  textColor
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
  
  // const parseTajweedText = (text: string): TextSegment[] => {
  //   const segments: TextSegment[] = [];
  //   const pattern = /<tajweed class=([^>]+)>([^<]+)<\/tajweed>|<span class=([^>]+)>([^<]+)<\/span>|([^<]+)/g;
    
  //   let match;
  //   while ((match = pattern.exec(text)) !== null) {
  //     if (match[1] && match[2]) {
  //       // Tajweed tag
  //       segments.push({
  //         text: match[2], // Don't trim, to preserve spaces
  //         color: tajweedColors[match[1]] || textColor
  //       });
  //     } else if (match[3] && match[4]) {
  //       // Span tag
  //       segments.push({
  //         text: match[4], // Keep spaces
  //         color: textColor
  //       });
  //     } else if (match[5]) {
  //       // Plain text (preserve spaces)
  //       segments.push({
  //         text: match[5], // Do NOT trim here
  //         color: textColor
  //       });
  //     }
  //   }
  //   return segments;
  // };  

  const parseTajweedText = (text: string): TextSegment[] => {
    const output: TextSegment[] = [];

    const stack: { tag: string; color?: string; children: TextSegment[] }[] = [];
    let i = 0;

    while (i < text.length) {
      if (text.startsWith("<tajweed", i)) {
        const tagMatch = text.slice(i).match(/^<tajweed class=([^>]+)>/);
        if (tagMatch) {
          const colorClass = tagMatch[1];
          stack.push({
            tag: "tajweed",
            color: tajweedColors[colorClass] || textColor,
            children: [],
          });
          i += tagMatch[0].length;
          continue;
        }
      } else if (text.startsWith("</tajweed>", i)) {
        const completed = stack.pop();
        if (completed) {
          const segmentText = completed.children.map((c) => c.text).join("");
          const finalSegment: TextSegment = {
            text: segmentText,
            color: completed.color,
          };
          if (stack.length > 0) {
            stack[stack.length - 1].children.push(finalSegment);
          } else {
            output.push(finalSegment);
          }
        }
        i += "</tajweed>".length;
        continue;
      } else if (text.startsWith("<span", i)) {
        const spanMatch = text.slice(i).match(/^<span class=([^>]+)>/);
        if (spanMatch) {
          const className = spanMatch[1];
          stack.push({
            tag: "span",
            color: textColor,
            children: [],
          });
          i += spanMatch[0].length;
          continue;
        }
      } else if (text.startsWith("</span>", i)) {
        const completed = stack.pop();
        if (completed) {
          const segmentText = completed.children.map((c) => c.text).join("");
          const finalSegment: TextSegment = {
            text: segmentText,
            color: completed.color,
          };
          if (stack.length > 0) {
            stack[stack.length - 1].children.push(finalSegment);
          } else {
            output.push(finalSegment);
          }
        }
        i += "</span>".length;
        continue;
      }

      // Handle plain text or inner tag content
      let nextTag = text.indexOf("<", i);
      if (nextTag === -1) nextTag = text.length;
      const content = text.slice(i, nextTag);

      const segment: TextSegment = {
        text: content,
        color: textColor,
      };

      if (stack.length > 0) {
        stack[stack.length - 1].children.push(segment);
      } else {
        output.push(segment);
      }

      i = nextTag;
    }

    return output;
  };

  const mergeSegmentsIntoWords = (segments: TextSegment[]) => {
    const mergedWords: TextSegment[][] = [];
    let currentWord: TextSegment[] = [];
  
    segments.forEach((segment, index) => {
      // Check if the text is ٱ (Alif Wasl)
      // if (segment.text === "ٱ") {
      //   // Push the current word before adding ٱ separately
      //   if (currentWord.length > 0) {
      //     mergedWords.push([...currentWord]);
      //     currentWord = [];
      //   }
  
      //   // Add ٱ as a separate word with spaces around it
      //   mergedWords.push([{ text: " ٱ", color: segment.color }]); // Spaces before
  
      // } else {
      //   // Normal text: add to current word
      //   currentWord.push(segment);
      // }
      currentWord.push(segment);
      // Push the last word at the end
      if (index === segments.length - 1 && currentWord.length > 0) {
        mergedWords.push([...currentWord]);
      }
    });
  
    return mergedWords;
  };
  
  const segments = parseTajweedText(tajweedText);
  const mergedWords = mergeSegmentsIntoWords(segments);
  // console.log("segments from pageview", segments);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.textContainer,
          {
            fontFamily: arabicFont,
            fontSize: arabicFontValue,
          }
        ]}
      >
        {mergedWords.map((word, wordIndex) => {
          // Merge text within the same word
          const fullWord = word.map((segment) => segment.text).join(""); // Join text parts
          
          return (
            <Text
              key={`word-${wordIndex}`}
              style={{
                fontFamily: arabicFont,
                fontSize: arabicFontValue,
                color: textColor, // Default color for word
              }}
            >
              {word.map((segment, segmentIndex) => {
                if (segment.color !== textColor) {
                  // Apply color only when needed
                  return (
                    <Text
                      key={`segment-${wordIndex}-${segmentIndex}`}
                      style={{ color: segment.color }}
                    >
                      {segment.text}
                    </Text>
                  );
                } else {
                  return segment.text;
                }
              })}
              {wordIndex < mergedWords.length - 1 ? " " : " "}
            </Text>
          );
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
  },
  textContainer: {
    textAlign: 'right',
    writingDirection: 'rtl',
    textAlignVertical: 'center',
    includeFontPadding: false,
    flexDirection: 'row-reverse',
  },
  wordGroup: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  arabicText: {
    textAlign: 'right',
    writingDirection: 'rtl',
    textAlignVertical: 'center',
    includeFontPadding: false,
  }
});

export default QuranVerseRenderer;