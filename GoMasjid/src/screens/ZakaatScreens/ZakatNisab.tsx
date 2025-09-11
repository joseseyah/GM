import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { UserContext } from '../../context/UserProvider';
import { saveZakatData } from '../../services/api';
import { themeFont } from '../../styles/theme';

interface ZakatNisabProps {
  navigation: any;
  route: {
    params: {
      nisabvalue: string;
      eligibility: string;
      netWorth: string;
      amountToPay: string;
      currency: string;
      editIndex?: number;
      currencyIcon: string;
      goldOwned: number;
      silverOwned: number;
      goldData: any;
      id?: number; // Add id for editing existing records
      calculatorData: {
        cashInHand: number;
        cashInBankAccount: number;
        otherSavings: number;
        investment: number;
        moneyOwed: number;
        businessAssets: number;
        goldInGrams: number;
        silverInGrams: number;
        utilityBillsValue: number;
        personalLoansValue: number;
        overdraftValue: number;
        creditCardsValue: number;
        businessLiabilitiesValue: number;
        totalAssets: number;
        totalLiabilities: number;
      };
    };
  };
}

const ZakatNisab: React.FC<ZakatNisabProps> = ({ route, navigation }) => {
  const {
    nisabvalue,
    eligibility,
    netWorth,
    amountToPay,
    currency,
    editIndex,
    currencyIcon,
    calculatorData,
    id
  } = route.params;
  
  const {height, width} = Dimensions.get('window');
  const {userInfo} = useContext(UserContext);
  
  const [nisab, setNisab] = useState<string>(nisabvalue);
  const [eligible, setEligible] = useState<string>(eligibility);
  const [amount, setAmount] = useState<number>(parseFloat(amountToPay));
  const [netWorthData, setNetWorthData] = useState<string>(netWorth);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currencyData, setCurrencyData] = useState<string>(currency);
  const [isEditMode, setIsEditMode] = useState<boolean>(!!id);

  useEffect(() => {
    setEligible(parseFloat(nisab) < parseFloat(netWorthData) ? 'YES' : 'NO');
    const newValue = (parseFloat(netWorthData) - parseFloat(nisab)) * 0.025;
    setAmount(newValue > 0 ? newValue : 0);
  }, [nisab, netWorthData]);

  const onSubmit = async () => {
    setLoading(true);
    setError('');
    
    // Create the complete data payload
    const completeData = {
      // Result data
      nisab: parseFloat(nisab),
      netWorth: parseFloat(netWorthData),
      amount: amount,
      eligibility: eligible,
      userId: userInfo.userId,
      currency: currencyData,
      date: new Date().toISOString(),
      
      // Include ID if we're editing an existing record
      ...(id ? { id } : {}),
      
      // Include all calculator input data
      ...calculatorData,
    };
  
    try {
      // Use the correct property name for the token
      const token = userInfo.userToken;
      console.log('UserInfo token:', token);
      
      // Try to save via API
      if (isEditMode && id) {
        // If editing, use PUT request to update existing record
        await axios.put(`https://admin.gomasjid.co.uk/app/api/zakat/${id}`, completeData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Zakat data updated successfully');
      } else {
        // If creating new, use POST request
        await saveZakatData(completeData, token);
        console.log('Zakat data saved successfully');
      }
      
      // Navigate back with updated data
      navigation.navigate('Zakaat', { 
        updated: true,
        nisab, 
        netWorth: netWorthData, 
        amount,
        currency: currencyData
      });
    } catch (error) {
      console.error('Error saving zakat data:', error);
      
      // If we get a 401 error and don't have a token, we can show a more helpful message
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (!userInfo.userToken) {
          setError('You need to be logged in to save your calculation. Please log in and try again.');
        } else {
          setError('Your session has expired. Please log in again to save your calculation.');
        }
      } else {
        setError('Failed to save data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row'}}>
          <Entypo name="chevron-left" size={30} color="#282828" />
        </TouchableOpacity>
        <Text style={styles.topBarHeader}>
          {isEditMode ? 'Edit Zakaat Calculation' : 'Zakaat Calculator'}
        </Text>
      </View>

      <ScrollView>
        <View style={{marginHorizontal: 5, marginVertical: 10}}>
          <View
            style={{
              borderRadius: 15,
              backgroundColor: 'white',
              paddingVertical: 10,
              marginTop: 15,
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <View style={{backgroundColor: '#FFF'}}>
              <View style={styles.row}>
                <View style={styles.cardOne}>
                  <Text style={styles.dropText}>Nisab Value</Text>
                </View>
                <View style={styles.cardTwo}>
                  <FontAwesome5
                    name={currencyIcon}
                    size={12}
                    color="#3DC8B2"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textNumber}
                    keyboardType="numeric"
                    onChangeText={text => setNisab(text)}
                    value={nisab}
                  />
                </View>
              </View>

              <View style={[styles.row, {marginBottom: Platform.OS === 'ios' ? 0 : 10}]}>
                <View style={styles.cardOne}>
                  <Text style={styles.dropText}>
                    You are eligible to pay zakat
                  </Text>
                </View>
                <View style={styles.cardTwo}>
                  <Text style={styles.textNumber1}>{eligible}</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.cardOne}>
                  <Text style={styles.dropText}>Net Worth</Text>
                </View>
                <View style={styles.cardTwo}>
                  <FontAwesome5
                    name={currencyIcon}
                    size={12}
                    color="#3DC8B2"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    onChangeText={text => setNetWorthData(text)}
                    style={styles.textNumber}
                    value={netWorthData}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.cardOne}>
                  <Text style={styles.dropText1}>Total Amount to Pay</Text>
                </View>
                <View style={styles.cardTwo}>
                  <Text style={styles.textNumber1}>
                    <FontAwesome5
                      name={currencyIcon}
                      size={12}
                      color="#3DC8B2"
                      style={[styles.inputIcon]}
                    />
                    &nbsp; 
                    {amount.toFixed(1)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <ScrollView>
        <View>
          <View
            style={{
              borderRadius: 15,
              backgroundColor: '#3DC8B2',
              paddingVertical: 10,
              marginTop: 15,
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <View style={{}}>
              <View style={styles.card}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    width: '100%',
                  }}>
                  <Text style={styles.cardText}>Value of your Zakat</Text>
                  <Text style={styles.cardAmount}>
                    <FontAwesome5
                      name={currencyIcon}
                      size={12}
                      color="#282828"
                      style={styles.inputIcon}
                    />
                    &nbsp;
                    {amount.toFixed(1)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      
        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#4617A9" />
          ) : (
            <TouchableOpacity style={styles.saveButton} onPress={onSubmit}>
              <View
                style={{
                  borderRadius: 15,
                  backgroundColor: '#4617A9',
                  paddingVertical: 11,
                  paddingHorizontal: 45,
                  flexDirection: 'row',
                  gap: 5,
                }}>
                <Text style={styles.buttonText}>
                  {isEditMode ? 'Update' : 'Save'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 15,
    color: '#F5F5F5',
  },
  topBar: {
    fontFamily: themeFont.englishFont,
    // paddingTop: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
  },
  topBarHeader: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    color: '#202020',
    fontSize: 15,
    fontFamily: themeFont.englishFont,
    lineHeight: 17.6,
  },
  inputIcon: {
    // position: 'absolute',
    // right: 85,
    // top: '50%',
    transform: [{translateY: 2}],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3DC8B2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardText: {
    fontFamily: themeFont.englishFont,
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
    color: '#282828',
  },
  cardAmount: {
    fontSize: 13,
    fontWeight: '500',
    color: '#282828',
    lineHeight: 15.25,
  },
  cardOne: {
    flex: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    width: '100%',
    alignItems: 'flex-start',
  },
  cardTwo: {
    borderRadius: 3,
    color: '#2b4014',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    marginBottom: 5,
    width: '30%',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  dropText1: {
    color: '#282828',
    fontSize: 15,
    fontFamily: themeFont.englishFont,
    fontWeight: '500',
  },
  dropText: {
    color: '#282828',
    fontSize: 14,
    fontFamily: themeFont.englishFont,
    fontWeight: '400',
  },
  textNumber: {
    color: '#202020',
    fontSize: 13,
    fontFamily: themeFont.englishFont,
    fontWeight: '500',
    textAlign: 'right',
    height: Platform.OS === 'ios' ? 'auto' : 40,
    marginTop: Platform.OS === 'ios' ? 0 : -11,
  },
  textNumber1: {
    color: '#202020',
    fontSize: 13,
    fontFamily: themeFont.englishFont,
    lineHeight: 15.25,
    fontWeight: '500',
    textAlign: 'right',
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  saveButton: {
    alignSelf: 'center',
  },
  buttonText: {
    color: '#F4F9F0',
    alignSelf: 'center',
    fontSize: 16.63,
    fontWeight: '700',
    lineHeight: 19.96,
    fontFamily: themeFont.englishFont,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: themeFont.englishFont,
  },
});

export default ZakatNisab;