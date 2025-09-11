import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ZakaatAccordion from '../../common/ZakaatAccordion';
import { UserContext } from '../../context/UserProvider';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from '../../common/CustomModal';
import { zakatFaqData } from '../../common/data/zakatFaqData';
import { themeFont } from '../../styles/theme';
// In Zakaat.tsx
import { deleteZakatRecord } from '../../services/api';
import SidebarMenu from '../../components/sidebar/SidebarMenu';
import { useFocusEffect } from '@react-navigation/native';
import useSidebar from '../../hooks/useSidebar';
import { useSidebarVisibility } from '../../context/SidebarContext';

const {height, width} = Dimensions.get('window');

// Helper function to get currency icon
const getCurrencyIcon = (currency: string) => {
  const currencyIcons: Record<string, string> = {
    'GBP': 'pound-sign',
    'USD': 'dollar-sign',
    'INR': 'rupee-sign',
    'AED': 'money-bill-alt',
    'PKR': 'money-bill-alt',
    'AFN': 'money-bill-alt',
    // Add more currency mappings as needed
  };
  
  return currencyIcons[currency] || 'money-bill-alt';
};

const Zakaat = ({route, navigation}: any) => {
  const {userInfo} = useContext(UserContext);
  const [zakatData, setZakatData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const firstThreeFaqs = zakatFaqData.slice(1, 4);

  const handleSubmit = () => {
    navigation.navigate('ZakatCalulator');
  };

  const handleEdit = (data: any) => {
    // The data is now nested in metadata
    const metadata = data.metadata || data;
    
    // Format the data for the ZakatNisab screen
    const editData = {
      nisabvalue: metadata.nisab.toString(),
      eligibility: parseFloat(metadata.nisab) < parseFloat(metadata.netWorth) ? 'YES' : 'NO',
      netWorth: metadata.netWorth.toString(),
      amountToPay: metadata.amount.toString(),
      currency: metadata.currency,
      currencyIcon: getCurrencyIcon(metadata.currency),
      id: data.id, // Pass the ID for updating
      calculatorData: {
        cashInHand: metadata.cashInHand || 0,
        cashInBankAccount: metadata.cashInBankAccount || 0,
        otherSavings: metadata.otherSavings || 0,
        investment: metadata.investment || 0,
        moneyOwed: metadata.moneyOwed || 0,
        businessAssets: metadata.businessAssets || 0,
        goldInGrams: metadata.goldInGrams || 0,
        silverInGrams: metadata.silverInGrams || 0,
        utilityBillsValue: metadata.utilityBillsValue || 0,
        personalLoansValue: metadata.personalLoansValue || 0,
        overdraftValue: metadata.overdraftValue || 0,
        creditCardsValue: metadata.creditCardsValue || 0,
        businessLiabilitiesValue: metadata.businessLiabilitiesValue || 0,
        totalAssets: metadata.totalAssets || 0,
        totalLiabilities: metadata.totalLiabilities || 0,
      }
    };
    
    navigation.navigate('ZakatNisab', editData);
  };

  // Fetch Zakat records when the screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Zakaat screen focused, fetching data...');
      zakatlist();
    });
    return unsubscribe;
  }, [navigation]);

  // Fetch Zakat records from the API
  const zakatlist = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Only fetch from API if user is authenticated and has a token
      if (userInfo.userToken) {
        // Log the raw response first
        console.log('Fetching with token:', userInfo.userToken);
        
        const response = await axios.get(`https://admin.gomasjid.co.uk/app/api/zakat`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.userToken}`
          }
        });
        
        // Log the raw response
        console.log('Raw API response:', JSON.stringify(response.data));
        
        // Now try to extract the data
        const apiData = response.data;
        
        if (apiData && apiData.zakat_history && Array.isArray(apiData.zakat_history)) {
          console.log('Found zakat_history array with length:', apiData.zakat_history.length);
          setZakatData(apiData.zakat_history);
        } else {
          console.log('API response structure:', Object.keys(apiData));
          console.log('zakat_history exists:', !!apiData.zakat_history);
          console.log('zakat_history is array:', Array.isArray(apiData.zakat_history));
          setZakatData([]);
        }
      } else {
        console.log('User not authenticated, cannot fetch Zakat history');
        setZakatData([]);
        setError('You need to be logged in to view your Zakat history');
      }
    } catch (error) {
      console.error('Error fetching Zakat history:', error);
      setZakatData([]);
      setError('Failed to load Zakat history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Clear all Zakat records
  const handleClear = async () => {
    if (!userInfo.userToken) {
      setError('You need to be logged in to clear records');
      return;
    }
    
    try {
      setLoading(true);
      
      // Confirm with the user
      Alert.alert(
        'Clear All Records',
        'Are you sure you want to delete all your Zakat records? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete All', 
            style: 'destructive',
            onPress: async () => {
              // Delete each record individually
              for (const record of zakatData) {
                await deleteZakatRecord(record.id, userInfo.userToken);
              }
              
              setZakatData([]);
              setOpen(false);
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error clearing Zakat records:', error);
      setError('Failed to clear records. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a single Zakat record
// In handleDelete function:
const handleDelete = async (id: number) => {
  if (!id) {
    console.error('No ID provided for deletion');
    return;
  }
  
  try {
    setLoading(true);
    
    if (!userInfo.userToken) {
      setError('You need to be logged in to delete records');
      return;
    }
    
    console.log('Deleting record with ID:', id, 'Type:', typeof id);
    
    // Try to convert the ID if it's a string (just to be safe)
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    await deleteZakatRecord(numericId, userInfo.userToken);
    
    // After successful deletion, refresh the list
    await zakatlist();
    setDeleteOpen(false);
  } catch (error) {
    console.error('Error deleting Zakat record:', error);
    setError('Failed to delete record. Please try again.');
  } finally {
    setLoading(false);
  }
};

const { isSidebarVisible, openSidebar, closeSidebar, toggleSidebar } = useSidebar();
const { setVisible } = useSidebarVisibility();
// Handle back button press to close sidebar if open
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isSidebarVisible) {
          closeSidebar();
          return true;
        }
        return false;
      };

      const backHandlerSubscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        backHandlerSubscription.remove();
    }, [isSidebarVisible, closeSidebar])
  );
  useEffect(() => {
    setVisible(isSidebarVisible);
  }, [isSidebarVisible]);

  return (
    <>
    <SidebarMenu isVisible={isSidebarVisible} onClose={closeSidebar} />
    <ImageBackground
      source={require('../../assets/images/newUi/zakatBackground.png')}
      resizeMode="cover"
      style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={toggleSidebar}
            style={{flexDirection: 'row', gap: 20}}>
            <Image
              source={require('../../assets/images/newUi/hamburgerMenu.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.Card}>
          <View
            style={{
              width: '100%',
              gap: 5,
              rowGap: 10,
              justifyContent: 'center',
            }}>
            <View style={{}}>
              <MaterialCommunityIcons
                name="hand-heart-outline"
                size={25}
                color="#3DC8B2"
              />
            </View>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 15,
                fontWeight: '600',
                lineHeight: 17.6,
                fontFamily: themeFont.englishFont,
              }}>
              What is Zakaat?
            </Text>
            <Text
              style={{
                color: '#DBDBDB',
                fontSize: 11,
                fontWeight: '400',
                flexWrap: 'wrap',
                lineHeight: 14.3,
                fontFamily: themeFont.englishFont,
              }}>
              Zakat, the third pillar of Islam, is a donation that Muslims
              regard as a mandatory act within their faith. Followers of Islam
              who have at least a minimum amount of wealth are required to give
              2.5% of their liquid assets away to charity each year.
            </Text>

            <View>
              <TouchableOpacity
                style={styles.buttonCalculateNow}
                onPress={handleSubmit}>
                <Text style={styles.buttonCalculateNowText}>
                  Calculate your Zakaat
                </Text>
                <AntDesign name="arrowright" size={25} color="#3DC8B2" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: themeFont.englishFont,
              fontWeight: '600',
              fontSize: 15,
              color: '#fff',
            }}>
            Zakaat History
          </Text>
        </View>

        <View style={styles.Cardtwo}>
          {loading ? (
            <ActivityIndicator size="small" color="#3DC8B2" style={{marginVertical: 20}} />
          ) : error ? (
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 12,
                fontWeight: '400',
                color: '#FF5757',
                fontFamily: themeFont.englishFont,
                lineHeight: 14.08,
                marginVertical: 20,
              }}>
              {error}
            </Text>
          ) : zakatData.length === 0 ? (
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 12,
                fontWeight: '400',
                color: '#C7C7C7',
                fontFamily: themeFont.englishFont,
                lineHeight: 14.08,
                marginVertical: 20,
              }}>
              No history
            </Text>
          ) : (
            <ScrollView>
              {zakatData.map((d: any) => (
                <TouchableOpacity
                  style={styles.Card3}
                  key={d.id}
                  onPress={() => handleEdit(d)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.CardtwoText}>Zakaat Due</Text>
                      <Text style={styles.CardtwoDate}>
                        {new Date(d.created_at_formatted || d.created_at || d.date).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.CardtwoAmount}>
                      {parseFloat(d.zakat_amount || d.amount).toFixed(2)}
                    </Text>
                    <TouchableOpacity
                      style={{
                        paddingVertical: 6,
                        marginLeft: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        // Make sure to convert string IDs to numbers if needed
                        const recordId = typeof d.id === 'string' ? parseInt(d.id, 10) : d.id;
                        console.log('Setting record ID for deletion:', recordId, 'Original ID:', d.id);
                        setDeleteIndex(recordId);
                        setDeleteOpen(true);
                      }}>
                      <Feather name="trash" size={20} color="#3DC8B2" />
                    </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text
            style={{
              color: '#FFF',
              fontWeight: '600',
              fontSize: 15,
              lineHeight: 17.6,
              fontFamily: themeFont.englishFont,
            }}>
            Frequently Asked Questions
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ZakatFaq')}>
            <Text
              style={{
                color: '#3DC8B2',
                fontWeight: '500',
                lineHeight: 11.73,
                fontSize: 10,
                fontFamily: themeFont.englishFont,
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.accordionContainer}>
          {firstThreeFaqs.map(faq => (
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

        <CustomModal modalVisible={open} setModalVisible={setOpen}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '900',
                fontFamily: 'Bold',
                fontSize: 16,
              }}>
              Are you sure to Clear?
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  handleClear();
                  setOpen(false);
                }}>
                <Text style={{color: '#FFFFFF'}}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton2}
                onPress={() => setOpen(false)}>
                <Text style={{color: '#FFFFFF'}}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CustomModal>
        <CustomModal modalVisible={deleteOpen} setModalVisible={setDeleteOpen}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '500',
                fontFamily: themeFont.englishFont,
                fontSize: 15,
                lineHeight: 19,
                color: '#282828',
              }}>
              Are you sure you want to delete this record?
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  if (deleteIndex !== null) {
                    handleDelete(deleteIndex);
                  }
                  setDeleteOpen(false);
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontWeight: '500',
                    fontSize: 13,
                    lineHeight: 14.08,
                    fontFamily: themeFont.englishFont,
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton2}
                onPress={() => setDeleteOpen(false)}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 13,
                    fontWeight: '500',
                    lineHeight: 14.08,
                    fontFamily: themeFont.englishFont,
                  }}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </CustomModal>
      </ScrollView>
    </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  editButton: {
    width: '25%',
    paddingVertical: 15,
    backgroundColor: '#3DC8B2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 15,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  editButton2: {
    width: '25%',
    paddingVertical: 15,
    backgroundColor: '#C7C7C7',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 15,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
    paddingBottom: 15,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    marginBottom: Platform.OS === 'ios' ? 80 : 60,
  },
  topBar: {
    fontFamily: themeFont.englishFont,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    color: '#184A2C',
    fontSize: 22,
  },
  Card: {
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.21)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 30,
    flexDirection: 'row',
    padding: 15,
  },
  buttonCalculateNow: {
    alignSelf: 'flex-end',
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
  buttonCalculateNowText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    fontFamily: themeFont.englishFont,
    lineHeight: 15.25,
    letterSpacing: -0.25,
    alignSelf: 'center',
  },
  Cardtwo: {
    borderRadius: 15,
    marginTop: 10,
    paddingRight: 10,
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  CardtwoText: {
    color: '#C7C7C7',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14.08,
    fontFamily: themeFont.englishFont,
  },
  CardtwoDate: {
    color: '#A8A8A8',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12.08,
    fontFamily: themeFont.englishFont,
    marginTop: 3,
  },
  CardtwoAmount: {
    color: '#C7C7C7',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 15.25,
    fontFamily: themeFont.englishFont,
  },
  Card3: {
    borderRadius: 1.5,
    // marginTop: 20,
    justifyContent: 'center',
    gap: 5,
  },
  accordionContainer: {
    // No specific styling needed
  },
  accordionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA40',
  },
  accordionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTitleText: {
    fontFamily: themeFont.englishFont,
    fontSize: 13,
    color: '#FFF',
    fontWeight: '500',
    lineHeight: 15.25,
    letterSpacing: -0.25,
  },
  accordionContent: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  accordionInnerText: {
    fontFamily: themeFont.englishFont,
    fontSize: 11,
    color: '#DBDBDB',
    fontWeight: '400',
    lineHeight: 14.3,
  },
});

export default Zakaat;
