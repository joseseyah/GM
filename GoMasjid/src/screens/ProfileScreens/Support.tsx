import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../common/Header'
import Accordion from '../../common/Accordion';
import { themeFont } from '../../styles/theme';
import Entypo from 'react-native-vector-icons/Entypo';

const Support = ({navigation}: any) => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(0);
  const supportData = [
    {
      id: 1,
      title: 'Find Nearest Mosque',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
    },
    {
      id: 2,
      title: 'Quran',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
    },
    {
      id: 3,
      title: 'Dua',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
    },
    {
      id: 4,
      title: 'Zakaat',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
    },
    {
      id: 5,
      title: 'Ask Imam',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
    },
  ];

  const handleAccordionToggle = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <View style={styles.maincontainer}>
      <Header title="Support" onBack={() => navigation.goBack()} titleColor='#000'/>
      <View style={styles.container}>
        {supportData.length > 0 && ( supportData?.map((data: any, index: number) => (
          <View style={styles.accordionContainer} key={data.id}>
            <TouchableOpacity onPress= {() => handleAccordionToggle(index)} style={styles.accordion}>
              <Text style={styles.title}>{data.title}</Text>
              <Entypo
                name={openAccordionIndex === index ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#3DC8B2"
              />
            </TouchableOpacity>
            {openAccordionIndex === index && (
              <View style={styles.accordionContent}>
                <Text style={styles.accordionInnerText}>{data.description}</Text>
              </View>
            )}
        
          </View>
        )))}
        
      </View>
    </View>
  )
};

export default Support;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    marginHorizontal: 15,
    backgroundColor: '#F4F4F4',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
  },
  container: {
    marginBottom: 30,
    paddingHorizontal: 15
  },
  accordionContainer: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    borderRadius: 10,
  },
  accordionContent: {
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    fontFamily: themeFont.englishFont,
    lineHeight: 20,
  },
  accordionInnerText: {
    fontFamily: themeFont.englishFont,
    fontSize: 11,
    color: '#585858',
    fontWeight: Platform.OS === 'ios' ? '400' : '500',
    lineHeight: 15,
  },
  accordion: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  }
});