import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import ZakaatAccordion from '../../common/ZakaatAccordion';
import {zakatFaqData} from '../../common/data/zakatFaqData';
import { themeFont } from '../../styles/theme';
import Header from '../../common/Header';

const ZakatFaq = ({route, navigation}: any) => {
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{}}>
          <Header
            title="Frequently Asked Questions"
            titleColor="#000"
            iconColor="#000"
            onBack={() => navigation?.goBack()}
          />

          <View style={styles.accordionContainer}>
            {zakatFaqData.map(faq => (
              <View key={faq.id} style={styles.accordionWrapper}>
                <ZakaatAccordion
                  title={
                    <View style={styles.accordionTitleContainer}>
                      <Text style={styles.accordionTitleText}>
                        {faq.question}
                      </Text>
                    </View>
                  }>
                  <View style={styles.accordionContent}>
                    <Text style={styles.accordionInnerText}>{faq.anwer}</Text>
                  </View>
                </ZakaatAccordion>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F4F4F4',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  accordionContainer: {
    paddingBottom: 50,
  },
  accordionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA40',
    marginVertical: 5,
  },

  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTitleText: {
    fontFamily: themeFont.englishFont,
    fontSize: 13,
    color: '#585858',
    fontWeight: '500',
    letterSpacing: -0.25,
  },
  accordionContent: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  accordionInnerText: {
    fontFamily: themeFont.englishFont,
    fontSize: 11,
    color: '#727272',
    fontWeight: '400',
  },
});

export default ZakatFaq;
