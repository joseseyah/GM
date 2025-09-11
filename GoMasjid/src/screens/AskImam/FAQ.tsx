import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Share,
  Platform,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Accordion from '../../common/Accordion';
import Header from '../../common/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { themeFont } from '../../styles/theme';
import { FaqCategories } from '../../common/meta/FAQCategories';
import { useFocusEffect } from '@react-navigation/native';
import { getFAQ } from '../../services/api';
const {height, width} = Dimensions.get('window');

const FAQ = ({ props, route, navigation }: any) => {
  const [FAQsData, setFAQsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFAQ = async () => {
        const FAQs = await getFAQ();
        setFAQsData(FAQs);
      };
      fetchFAQ();
    }, [])
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredData = FAQsData.filter(
    (item: any) => !selectedCategory || item.category_name === selectedCategory,
  );

  const shareQuestionAnswer = async (title: any, question: any, answer: any) => {
    try {
      await Share.share({
        message: `Title:${title}\n\nQuestion: ${question}\n\nAnswer: ${answer}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const bottomPadding = filteredData.length > 0 ? 200 : 0;

  return (
    <>
      <View style={styles.maincontainer}>
        <Header
          title="Frequently Asked Questions"
          onBack={() => navigation?.goBack()}
          titleColor='#000'
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
            marginHorizontal: 10,
            marginBottom: 10
          }}>
          <Text
            style={{
              fontFamily: themeFont.englishFont,
              fontWeight: Platform.OS === 'ios' ? '600' : '700',
              fontSize: 12.5,
              lineHeight: 18.28,
              color: '#202020',
              letterSpacing: 0.09,
            }}>
            Categories
          </Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
          style={{
            marginBottom: 20,
            marginHorizontal: 10
          }}>
          <View style={{ flexDirection: 'row', gap: 25 }}>
            {FaqCategories &&
              FaqCategories.map((cat: any, index: number) => (
                <View key={`cat-${index}`}>
                  <TouchableOpacity onPress={() => handleCategoryClick(cat.title)}>
                    <View style={[styles.catContainer, selectedCategory === cat.title && styles.selectedCategory]}>
                      {cat.imgSrc ? (
                        <Image
                          source={cat.imgSrc}
                          resizeMode="cover"
                          style={[styles.faqImg, selectedCategory === cat.title && styles.selectedCategoryIcon]}/>
                      ) : ( cat.iconSet === 'MaterialCommunityIcons' ? (
                        <MaterialCommunityIcons
                          name={cat.iconName}
                          color={selectedCategory === cat.title ? '#FFF' : cat.iconColor}
                          size={cat.iconSize}
                          style={styles.faqIcon}
                        />
                      ) : ( cat.iconSet === 'MaterialIcons' ? (
                        <MaterialIcons
                          name={cat.iconName}
                          color={selectedCategory === cat.title ? '#FFF' : cat.iconColor}
                          size={cat.iconSize}
                          style={styles.faqIcon}
                        />
                      ) : (
                        <FontAwesome5
                          name={cat.iconName}
                          color={selectedCategory === cat.title ? '#FFF' : cat.iconColor}
                          size={cat.iconSize}
                          style={styles.faqIcon}
                        />
                      )))}
                    </View>
                    <View>
                      <Text style={styles.iconTitle}>{cat.title}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            )}
          </View>
        </ScrollView>

        <ScrollView contentContainerStyle={{}} style={{
            marginBottom: 20,
            marginHorizontal: 10
          }}>
          {filteredData.length > 0 ? (
            filteredData.map((data: any, index: number) => (
              <View style={styles.accordionContainer} key={`quest-${index}`}>
                <Accordion
                  title={
                    <View style={styles.accordionTitleContainer}>
                      <Text style={styles.accordionTitleText}>
                        {data.title}
                      </Text>
                    </View>
                  }
                  isOpen={openAccordionIndex === index}
                  onToggle={() => handleAccordionToggle(index)}
                >
                  <View style={styles.accordionContent}>
                    <Text style={styles.accordionInnerText}>
                    Question: {data.question_text}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.answerText}>
                      {(data?.answer != null) ? data.answer : "Waiting for Imam to respond"}
                    </Text>
                  </View>

                  <View style={{marginBottom: 15, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                    <View>
                      {(data?.answer != null) &&
                        <View style={{flexDirection: 'row'}}>
                          <Text style={[styles.answerText, {color:'#4617A9'}]}>Answered by </Text>
                          <Text style={[styles.answerText, {color:'#4617A9'}]}>
                            {data.imam_name}
                          </Text>
                        </View>
                      }
                    </View>
                          
                    <TouchableOpacity
                      onPress={() =>
                        shareQuestionAnswer(
                          data.title,
                          data.question_text,
                          data?.answer,
                        )
                      }>
                      <Fontisto name="share-a" size={14} color={'#3DC8B2'} style={{  }} />
                    </TouchableOpacity>
                  </View>
                </Accordion>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>
              No data available for this category.
            </Text>
          )}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  accordionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA40',
    // marginHorizontal: 10,
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
  },
  accordionTitleText: {
    fontFamily: themeFont.englishFont,
    fontSize: 13,
    color: '#585858',
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    lineHeight: 15.25,
    // letterSpacing: -0.25,
    textAlign: 'justify',
  },
  accordionContent: {
    paddingTop: -10,
  },
  accordionInnerText: {
    fontFamily: themeFont.englishFont,
    fontSize: 11,
    color: '#585858',
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    lineHeight: 14.3,
    textAlign: 'justify',
  },
  answerText: {
    fontSize: 11,
    color: '#727272',
    fontFamily: themeFont.englishFont,
    fontWeight: Platform.OS === 'ios' ? '400' : '500',
    lineHeight: 14.3,
    marginTop:5
  },
  noDataText: {
    fontFamily: themeFont.englishFont,
    fontSize: 12,
    color: '#C7C7C7',
    textAlign: 'center',
    marginVertical: 35,
  },
  selectedCategoryIcon: {
    tintColor: '#FFF',
  },
  selectedCategory: {
    backgroundColor: '#3DC8B2',
  },
  faqImg: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 19.1,
    height: 16.73,
    top: 15,
  },
  faqIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    top: 15,
  },
  iconTitle: {
    fontFamily: themeFont.englishFont,
    fontSize: 10,
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
    alignSelf: 'center',
    lineHeight: 10,
    color: '#000'
  },
  catContainer: {
    backgroundColor: '#FFF',
    width: 48,
    height: 48,
    borderRadius: 27.2,
    marginBottom: 10
  },
});

export default FAQ;