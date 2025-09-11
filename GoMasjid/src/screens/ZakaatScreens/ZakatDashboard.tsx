import React, { useContext, useEffect, useState } from 'react';

import {
  Dimensions,
  FlatList,
  Keyboard,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import ZakaatCustomModal from '../../common/ZakaatCustomModal';
import { UserContext } from '../../context/UserProvider';
import { GoldAndSilver } from '../../services/Services';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { themeFont } from '../../styles/theme';

const {width: screenWidth} = Dimensions.get('window');

const ZakatDashboard = ({props, navigation}: any) => {
  const [text, setText] = useState<any>(0);
  // const [mortgageValue, setMortgageValue] = useState(0);
  const [utilityBillsValue, setUtilityBillsValue] = useState(0);
  const [personalLoansValue, setPersonalLoansValue] = useState(0);
  const [overdraftValue, setOverdraftValue] = useState(0);
  const [creditCardsValue, setCreditCardsValue] = useState(0);
  const [businessLiabilitiesValue, setBusinessLiabilitiesValue] = useState(0);

  const [currency, setCurrency] = useState<any>('');
  const [selectedItem, setSelecteItem] = useState<any>();
  const [cashInHand, setCashInHand] = useState<any>(0);
  const [cashInBankAccount, setCashInBankAccount] = useState<any>(0);
  const [otherSavings, setOtherSavings] = useState<any>(0);
  const [investment, setInvestment] = useState<any>(0);
  const [moneyOwed, setMoneyOwed] = useState<any>(0);
  const [businessAssets, setBusineesAssets] = useState<any>(0);
  const [goldValue, setGoldValue] = useState();
  const [silverValue, setSilverVAlue] = useState();
  const [goldInGrams, setGoldInGrams] = useState<any>(0);
  const [goldYouOwned, setGoldYouOwned] = useState<any>(0);
  const [silverInGrams, setSilverInGrams] = useState<any>(0);
  const [silverYouOwned, setSilverYouOwned] = useState<any>(0);
  const {userInfo, setUserInfo, updateUserInfo} = useContext(UserContext);
  const [goldData, setGoldData] = useState();
  const [nisabValue, setNisabValue] = useState<any>(0);
  const [showError, setShowError] = useState<any>(false);
  const [error, setError] = useState<any>('');
  const [currencyType, setCurrencyType] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('Currency');
  const [netWorth, setNetWorth] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const allCountries = [
    {
      title: 'GBP',
      value: 'Pound Sterling',
      icon: 'pound-sign',
    },
    {
      title: 'USD',
      value: 'United States Dollar',
      icon: 'dollar-sign',
    },
    {
      title: 'INR',
      value: 'Indian Rupee',
      icon: 'rupee-sign',
    },
    {
      title: 'AED',
      value: 'UAE Dirham',
      icon: 'money-bill-alt',
    },
    {
      title: 'AFN',
      value: 'Afghan Afghani',
      icon: 'money-bill-alt',
    },
    {
      title: 'PKR',
      value: 'Pakistani Rupee',
      icon: 'money-bill-alt',
    },
    // {
    //   title: 'ALL',
    //   value: 'Albanian Lek',
    // },
    // {
    //   title: 'AMD',
    //   value: 'Armenian Dram',
    // },
    // {
    //   title: 'ANG',
    //   value: 'Netherlands Antillean Guilder',
    // },
    // {
    //   title: 'AOA',
    //   value: 'Angolan Kwanza',
    // },
    // {
    //   title: 'ARS',
    //   value: 'Argentine Peso',
    // },
    // {
    //   title: 'AUD',
    //   value: 'Australian Dollar',
    // },
    // {
    //   title: 'AZN',
    //   value: 'Azerbaijan Manat',
    // },
    // {
    //   title: 'BAM',
    //   value: 'Bosnia And Herzegovina Convertible Mark',
    // },
    // {
    //   title: 'BBD',
    //   value: 'Barbadian Dollar',
    // },
    // {
    //   title: 'BDT',
    //   value: 'Bangladeshi Taka',
    // },
    // {
    //   title: 'BGN',
    //   value: 'Bulgarian Lev',
    // },
    // {
    //   title: 'BHD',
    //   value: 'Bahraini Dinar',
    // },
    // {
    //   title: 'BIF',
    //   value: 'Burundi Franc',
    // },
    // {
    //   title: 'BIH',
    //   value: 'Bosnia-Herzegovina Convertible Mark',
    // },
    // {
    //   title: 'BND',
    //   value: 'Brunei Dollar',
    // },
    // {
    //   title: 'BOB',
    //   value: 'Bolivian Boliviano',
    // },
    // {
    //   title: 'BRL',
    //   value: 'Brazilian Real',
    // },
    // {
    //   title: 'BSD',
    //   value: 'Bahamian Dollar',
    // },
    // {
    //   title: 'BTC',
    //   value: 'Bitcoin',
    // },
    // {
    //   title: 'BTN',
    //   value: 'Bhutanese Ngultrum',
    // },
    // {
    //   title: 'BYN',
    //   value: 'Belarusian Ruble',
    // },
    // {
    //   title: 'BZD',
    //   value: 'Belize Dollar',
    // },
    // {
    //   title: 'CAD',
    //   value: 'Canadian Dollar',
    // },
    // {
    //   title: 'CDF',
    //   value: 'Congolese Franc',
    // },
    // {
    //   title: 'CHF',
    //   value: 'Swiss Franc',
    // },
    // {
    //   title: 'CLF',
    //   value: 'Chilean Unit Of Account',
    // },
    // {
    //   title: 'CLP',
    //   value: 'Chilean Peso',
    // },
    // {
    //   title: 'CNY',
    //   value: 'Chinese Yuan Renminbi',
    // },
    // {
    //   title: 'COP',
    //   value: 'Colombian Peso',
    // },
    // {
    //   title: 'CRC',
    //   value: 'Costa Rican Colon',
    // },
    // {
    //   title: 'CVE',
    //   value: 'Cape Verdean Escudo',
    // },
    // {
    //   title: 'CZK',
    //   value: 'Czech Koruna',
    // },
    // {
    //   title: 'DJF',
    //   value: 'Djiboutian Franc',
    // },
    // {
    //   title: 'DKK',
    //   value: 'Danish Krone',
    // },
    // {
    //   title: 'DOP',
    //   value: 'Dominican Peso',
    // },
    // {
    //   title: 'DZD',
    //   value: 'Algerian Dinar',
    // },
    // {
    //   title: 'EGP',
    //   value: 'Egyptian Pound',
    // },
    // {
    //   title: 'ERN',
    //   value: 'Eritrean Nakfa',
    // },
    // {
    //   title: 'ETB',
    //   value: 'Ethiopian Birr',
    // },
    // {
    //   title: 'ETH',
    //   value: 'Ethereum',
    // },
    // {
    //   title: 'EUR',
    //   value: 'European Euro',
    // },
    // {
    //   title: 'FJD',
    //   value: 'Fijian Dollar',
    // },
    // {
    //   title: 'FKP',
    //   value: 'Falkland Islands Pound',
    // },
    // {
    //   title: 'GEL',
    //   value: 'Georgian Lari',
    // },
    // {
    //   title: 'GHS',
    //   value: 'Ghanaian Cedi',
    // },
    // {
    //   title: 'GIP',
    //   value: 'Gibraltar Pound',
    // },
    // {
    //   title: 'GMD',
    //   value: 'Gambian Dalasi',
    // },
    // {
    //   title: 'GNF',
    //   value: 'Guinean Franc',
    // },
    // {
    //   title: 'GTQ',
    //   value: 'Guatemalan Quetzal',
    // },
    // {
    //   title: 'GYD',
    //   value: 'Guyanese Dollar',
    // },
    // {
    //   title: 'HKD',
    //   value: 'Hong Kong Dollar',
    // },
    // {
    //   title: 'HNL',
    //   value: 'Honduran Lempira',
    // },
    // {
    //   title: 'HRK',
    //   value: 'Croatian Kuna',
    // },
    // {
    //   title: 'HTG',
    //   value: 'Haitian Gourde',
    // },
    // {
    //   title: 'HUF',
    //   value: 'Hungarian Forint',
    // },
    // {
    //   title: 'IDR',
    //   value: 'Indonesian Rupiah',
    // },
    // {
    //   title: 'ILS',
    //   value: 'Israeli New Shekel',
    // },

    // {
    //   title: 'IQD',
    //   value: 'Iraqi Dinar',
    // },
    // {
    //   title: 'IRR',
    //   value: 'Iranian Rial',
    // },
    // {
    //   title: 'ISK',
    //   value: 'Icelandic Krona',
    // },
    // {
    //   title: 'JMD',
    //   value: 'Jamaican Dollar',
    // },
    // {
    //   title: 'JOD',
    //   value: 'Jordanian Dinar',
    // },
    // {
    //   title: 'JPY',
    //   value: 'Japanese Yen',
    // },
    // {
    //   title: 'KES',
    //   value: 'Kenyan Shilling',
    // },
    // {
    //   title: 'KGS',
    //   value: 'Kyrgyzstani Som',
    // },
    // {
    //   title: 'KHR',
    //   value: 'Cambodian Riel',
    // },
    // {
    //   title: 'KMF',
    //   value: 'Comorian Franc',
    // },
    // {
    //   title: 'KRW',
    //   value: 'South Korean Won',
    // },
    // {
    //   title: 'KWD',
    //   value: 'Kuwaiti Dinar',
    // },
    // {
    //   title: 'KYD',
    //   value: 'Cayman Islands Dollar',
    // },
    // {
    //   title: 'KZT',
    //   value: 'Kazakhstani Tenge',
    // },
    // {
    //   title: 'LAK',
    //   value: 'Lao Kip',
    // },
    // {
    //   title: 'LBMA-XAG',
    //   value: 'LBMA Silver',
    // },
    // {
    //   title: 'LBMA-XAU-AM',
    //   value: 'LBMA Gold AM',
    // },
    // {
    //   title: 'LBMA-XAU-PM',
    //   value: 'LBMA Gold PM',
    // },
    // {
    //   title: 'LBMA-XPD-AM',
    //   value: 'LBMA Palladium AM',
    // },
    // {
    //   title: 'LBMA-XPD-PM',
    //   value: 'LBMA Palladium PM',
    // },
    // {
    //   title: 'LBMA-XPT-AM',
    //   value: 'LBMA Platinum AM',
    // },
    // {
    //   title: 'LBMA-XPT-PM',
    //   value: 'LBMA Platinum PM',
    // },
    // {
    //   title: 'LBP',
    //   value: 'Lebanese Pound',
    // },
    // {
    //   title: 'LKR',
    //   value: 'Sri Lankan Rupee',
    // },
    // {
    //   title: 'LRD',
    //   value: 'Liberian Dollar',
    // },
    // {
    //   title: 'LSL',
    //   value: 'Lesotho Loti',
    // },
    // {
    //   title: 'LYD',
    //   value: 'Libyan Dinar',
    // },
    // {
    //   title: 'MAD',
    //   value: 'Moroccan Dirham',
    // },
    // {
    //   title: 'MDL',
    //   value: 'Moldovan Leu',
    // },
    // {
    //   title: 'MGA',
    //   value: 'Malagasy Ariary',
    // },
    // {
    //   title: 'MKD',
    //   value: 'Macedonian Denar',
    // },
    // {
    //   title: 'MMK',
    //   value: 'Myanmar Kyat',
    // },
    // {
    //   title: 'MNT',
    //   value: 'Mongolian Tugrik',
    // },
    // {
    //   title: 'MOP',
    //   value: 'Macanese Pataca',
    // },
    // {
    //   title: 'MRO',
    //   value: 'Mauritanian Ouguiya',
    // },
    // {
    //   title: 'MUR',
    //   value: 'Mauritian Rupee',
    // },
    // {
    //   title: 'MVR',
    //   value: 'Maldivian Rufiyaa',
    // },
    // {
    //   title: 'MWK',
    //   value: 'Malawian Kwacha',
    // },
    // {
    //   title: 'MXN',
    //   value: 'Mexican Peso',
    // },
    // {
    //   title: 'MYR',
    //   value: 'Malaysian Ringgit',
    // },
    // {
    //   title: 'MZN',
    //   value: 'Mozambican Metical',
    // },
    // {
    //   title: 'NAD',
    //   value: 'Namibian Dollar',
    // },
    // {
    //   title: 'NGN',
    //   value: 'Nigerian Naira',
    // },
    // {
    //   title: 'NIO',
    //   value: 'Nicaraguan Cordoba',
    // },
    // {
    //   title: 'NOK',
    //   value: 'Norwegian Krone',
    // },
    // {
    //   title: 'NPR',
    //   value: 'Nepalese Rupee',
    // },
    // {
    //   title: 'NZD',
    //   value: 'New Zealand Dollar',
    // },
    // {
    //   title: 'OMR',
    //   value: 'Omani Rial',
    // },
    // {
    //   title: 'PAB',
    //   value: 'Panamanian Balboa',
    // },
    // {
    //   title: 'PEN',
    //   value: 'Peruvian Sol',
    // },
    // {
    //   title: 'PHP',
    //   value: 'Philippine Peso',
    // },
    // {
    //   title: 'PLN',
    //   value: 'Polish Zloty',
    // },
    // {
    //   title: 'PYG',
    //   value: 'Paraguayan Guarani',
    // },
    // {
    //   title: 'QAR',
    //   value: 'Qatari Riyal',
    // },
    // {
    //   title: 'RON',
    //   value: 'Romanian Leu',
    // },
    // {
    //   title: 'RSD',
    //   value: 'Serbian Dinar',
    // },
    // {
    //   title: 'RUB',
    //   value: 'Russian Ruble',
    // },
    // {
    //   title: 'RWF',
    //   value: 'Rwandan Franc',
    // },
    // {
    //   title: 'SAR',
    //   value: 'Saudi Arabian Riyal',
    // },
    // {
    //   title: 'SCR',
    //   value: 'Seychellois Rupee',
    // },
    // {
    //   title: 'SDG',
    //   value: 'Sudanese Pound',
    // },
    // {
    //   title: 'SEK',
    //   value: 'Swedish Krona',
    // },
    // {
    //   title: 'SGD',
    //   value: 'Singapore Dollar',
    // },
    // {
    //   title: 'SHP',
    //   value: 'Saint Helena Pound',
    // },
    // {
    //   title: 'SLL',
    //   value: 'Sierra Leonean Leone',
    // },
    // {
    //   title: 'SOS',
    //   value: 'Somali Shilling',
    // },
    // {
    //   title: 'SRD',
    //   value: 'Surinamese Dollar',
    // },
    // {
    //   title: 'STN',
    //   value: 'Sao Tome And Principe Dobra',
    // },
    // {
    //   title: 'SVC',
    //   value: 'Salvadoran Colón',
    // },
    // {
    //   title: 'SZL',
    //   value: 'Swazi Lilangeni',
    // },
    // {
    //   title: 'THB',
    //   value: 'Thai Baht',
    // },
    // {
    //   title: 'TJS',
    //   value: 'Tajikistani Somoni',
    // },
    // {
    //   title: 'TMT',
    //   value: 'Turkmen Manat',
    // },
    // {
    //   title: 'TND',
    //   value: 'Tunisian Dinar',
    // },
    // {
    //   title: 'TOP',
    //   value: 'Tongan Pa†anga',
    // },
    // {
    //   title: 'TRY',
    //   value: 'Turkish Lira',
    // },
    // {
    //   title: 'TTD',
    //   value: 'Trinidad And Tobago Dollar',
    // },
    // {
    //   title: 'TWD',
    //   value: 'New Taiwan Dollar',
    // },
    // {
    //   title: 'TZS',
    //   value: 'Tanzanian Shilling',
    // },
    // {
    //   title: 'UAH',
    //   value: 'Ukrainian Hryvnia',
    // },
    // {
    //   title: 'UGX',
    //   value: 'Ugandan Shilling',
    // },
    // {
    //   title: 'UYU',
    //   value: 'Uruguayan Peso',
    // },
    // {
    //   title: 'UZS',
    //   value: 'Uzbekistani Som',
    // },
    // {
    //   title: 'VES',
    //   value: 'Venezuelan Bolivar',
    // },
    // {
    //   title: 'VND',
    //   value: 'Vietnamese Dong',
    // },
    // {
    //   title: 'VUV',
    //   value: 'Vanuatu Vatu',
    // },
    // {
    //   title: 'WST',
    //   value: 'Samoan Tala',
    // },
    // {
    //   title: 'XAF',
    //   value: 'Central African CFA Franc',
    // },
    // {
    //   title: 'XAG',
    //   value: 'Silver',
    // },
    // {
    //   title: 'XAU',
    //   value: 'Gold',
    // },
    // {
    //   title: 'XCD',
    //   value: 'East Caribbean Dollar',
    // },
    // {
    //   title: 'XOF',
    //   value: 'West African CFA Franc',
    // },
    // {
    //   title: 'XPD',
    //   value: 'Palladium',
    // },
    // {
    //   title: 'XPF',
    //   value: 'CFP Franc',
    // },
    // {
    //   title: 'XPT',
    //   value: 'Platinum',
    // },
    // {
    //   title: 'XRP',
    //   value: 'Ripple',
    // },
    // {
    //   title: 'YER',
    //   value: 'Yemeni Rial',
    // },
    // {
    //   title: 'ZAR',
    //   value: 'South African Rand',
    // },
    // {
    //   title: 'ZMK',
    //   value: 'Zambian Kwacha (pre-2013)',
    // },
    // {
    //   title: 'ZMW',
    //   value: 'Zambian Kwacha',
    // },
  ];

  // var result = Object.keys(currency).map((key:string) => {title:key,value:currency[key]});

  const handleAdd = () => {
    const totalAssets =
      parseFloat(cashInHand) +
      parseFloat(cashInBankAccount) +
      parseFloat(otherSavings) +
      parseFloat(investment) +
      parseFloat(moneyOwed) +
      parseFloat(businessAssets) +
      parseFloat(goldInGrams) +
      parseFloat(silverInGrams);

    const totalLiabilities =
      utilityBillsValue +
      personalLoansValue +
      overdraftValue +
      creditCardsValue +
      businessLiabilitiesValue;

    const netWorth = totalAssets - totalLiabilities;

    if (currency === '') {
      setError('Please select currency first');
      return;
    }
    
    setError('');
    setShowError(nisabValue === '0');

    const goldValue = 1;
    const silverValue = 1;

    const goldOwned = parseFloat(goldInGrams) * goldValue;
    const silverOwned = parseFloat(silverInGrams) * silverValue;
    const nisabValueNum = parseFloat(nisabValue);
    const amountToPay = (netWorth - nisabValueNum) * 0.025;

    // Create calculator data object with all inputs
    const calculatorData = {
      // Assets
      cashInHand: parseFloat(cashInHand),
      cashInBankAccount: parseFloat(cashInBankAccount),
      otherSavings: parseFloat(otherSavings),
      investment: parseFloat(investment),
      moneyOwed: parseFloat(moneyOwed),
      businessAssets: parseFloat(businessAssets),
      goldInGrams: parseFloat(goldInGrams),
      silverInGrams: parseFloat(silverInGrams),
      
      // Liabilities
      utilityBillsValue,
      personalLoansValue,
      overdraftValue,
      creditCardsValue,
      businessLiabilitiesValue,
      
      // Totals
      totalAssets,
      totalLiabilities
    };

    navigation.navigate('ZakatNisab', {
      nisabvalue: nisabValue,
      eligibility: nisabValueNum < netWorth ? 'YES' : 'NO',
      netWorth: netWorth.toString(),
      amountToPay: amountToPay > 0 ? amountToPay.toFixed(1) : '0',
      currency,
      currencyIcon: getSelectedCurrencyIcon(),
      goldOwned,
      silverOwned,
      goldData,
      calculatorData // Pass all calculator data
    });
  };

  useEffect(() => {
    const totalAssets =
      parseFloat(cashInHand) +
      parseFloat(cashInBankAccount) +
      parseFloat(otherSavings) +
      parseFloat(investment) +
      parseFloat(moneyOwed) +
      parseFloat(businessAssets) +
      parseFloat(goldInGrams) +
      parseFloat(silverInGrams);

    const totalLiabilities =
      // mortgageValue +
      utilityBillsValue +
      personalLoansValue +
      overdraftValue +
      creditCardsValue +
      businessLiabilitiesValue;

    const netWorth = totalAssets - totalLiabilities;
    setNetWorth(netWorth || 0);
  }, [
    cashInHand,
    cashInBankAccount,
    otherSavings,
    investment,
    moneyOwed,
    businessAssets,
    goldInGrams,
    silverInGrams,
    // mortgageValue,
    utilityBillsValue,
    personalLoansValue,
    overdraftValue,
    creditCardsValue,
    businessLiabilitiesValue,
    nisabValue,
  ]);

  useEffect(() => {
    GoldAndSilver(currency).then((data: any) => {
      console.log('myData', data, data.rates[currency], currency);
      if (data.rates[currency]) {
        // setGoldData(data.goldData);

        const n = parseFloat(data.rates[currency]) * 19.6878312;
        console.log('My Nisab', n);
        setNisabValue(n.toFixed(1));
      }
    });
  }, [currency]);

  const getSelectedCurrencyIcon = () => {
    const selectedCurrencyObj = allCountries.find(
      item => item.title === selectedCurrency,
    );
    return selectedCurrencyObj ? selectedCurrencyObj.icon : null;
  };

  // Handle text input
  const handleChangeText = setter => text => {
    const filteredText = text.replace(/\D/g, '');
    if (filteredText.length <= 7) {
      setter(filteredText);
    }
  };

const [isKeyboardVisible, setKeyboardVisible] = useState(false);

useEffect(() => {
  const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
    console.log('Keyboard opened');
    setKeyboardVisible(true);
  });
  const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardVisible(false); // Keyboard is closed
    console.log('Keyboard closed');
  });

  return () => {
    // Cleanup listeners on unmount
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  };
  
}, []);

  return (
    <View style={[styles.container, {paddingBottom: isKeyboardVisible? 10 : 100}]}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', gap: 20}}>
          <Entypo name="chevron-left" size={30} color="#282828" />
        </TouchableOpacity>
        <Text style={styles.topBarHeader}>Zakaat Calculator</Text>

        <TouchableOpacity
          onPress={() => setCurrencyType(true)}
          style={styles.currencyButton}>
          <Text style={styles.currencyButtonText}>{selectedCurrency}</Text>
          <FontAwesome5
            name={getSelectedCurrencyIcon()}
            size={12}
            color="#3DC8B2"
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <ZakaatCustomModal
          modalVisible={currencyType}
          setModalVisible={setCurrencyType}>
          <Text style={styles.modalTitle}>Set Currency</Text>
          <FlatList
            data={allCountries}
            keyExtractor={item => item.title}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.currencyItem,
                  item.title === selectedItem && styles.selectedCurrencyItem,
                ]}
                onPress={() => {
                  setSelectedCurrency(item.title);
                  setCurrency(item.title);
                  setCurrencyType(false);
                }}>
                <View style={styles.currencyRow}>
                  <Text
                    style={[
                      styles.currencyText1,
                      item.title === selectedCurrency &&
                        styles.selectedCurrencyText,
                    ]}>
                    {item.value}
                  </Text>
                  <Text
                    style={[
                      styles.currencyText2,
                      item.title === selectedCurrency &&
                        styles.selectedCurrencyText,
                    ]}>
                    {item.title}
                  </Text>
                  <FontAwesome5
                    name={item.icon}
                    size={15}
                    color={
                      item.title === selectedCurrency ? '#8352EC' : '#202020'
                    }
                    style={styles.currencyIcon}
                  />
                  <View style={{alignSelf: 'center', marginLeft: 5}}>
                    {item.title === selectedCurrency && (
                      <Entypo name="check" size={15} color="#8352EC" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ZakaatCustomModal>
      </View>
      <ScrollView style={{marginHorizontal: 5}}>
        <View style={{flex: 1, marginHorizontal: 5, marginTop: -10}}>
          {/* My Savings */}
          <View
            style={{
              borderRadius: 15,
              backgroundColor: 'white',
              paddingVertical: 10,
              marginTop: 15,
              paddingLeft: 15,
            }}>
            <ScrollView>
              <View style={{backgroundColor: '#FFFFFF', paddingBottom: 10}}>
                <Text style={styles.titleH}>
                  Money
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 10,
                  }}>
                  <View style={styles.cardOne}>
                    <Text style={styles.dropText}>Cash at home</Text>
                  </View>
                  <View style={styles.cardTwo}>
                    <TextInput
                      placeholder="0"
                      keyboardType="numeric"
                      placeholderTextColor={'#787878'}
                      returnKeyType="done"
                      autoFocus={true}
                      // onChangeText={text => setCashInHand(text)}
                      onChangeText={handleChangeText(setCashInHand)}
                      value={cashInHand}
                      style={styles.textNumber}
                      maxLength={7}
                    />
                    <FontAwesome5
                      name={getSelectedCurrencyIcon()}
                      size={12}
                      color="#3DC8B2"
                      style={styles.inputIcon}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={styles.cardOne}>
                    <Text style={styles.dropText}>Cash at bank account</Text>
                  </View>
                  <View style={styles.cardTwo}>
                    <TextInput
                      placeholder="0"
                      keyboardType="numeric"
                      placeholderTextColor={'#787878'}
                      returnKeyType="done"
                      // onChangeText={text => setCashInBankAccount(text)}
                      onChangeText={handleChangeText(setCashInBankAccount)}
                      value={cashInBankAccount}
                      style={styles.textNumber}
                      maxLength={7}
                    />
                    <FontAwesome5
                      name={getSelectedCurrencyIcon()}
                      size={12}
                      color="#3DC8B2"
                      style={styles.inputIcon}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={styles.cardOne}>
                    <Text style={styles.dropText}>Other savings</Text>
                  </View>
                  <View style={styles.cardTwo}>
                    <TextInput
                      placeholder="0"
                      placeholderTextColor={'#787878'}
                      keyboardType="numeric"
                      returnKeyType="done"
                      // onChangeText={text => setOtherSavings(text)}
                      onChangeText={handleChangeText(setOtherSavings)}
                      value={otherSavings}
                      style={styles.textNumber}
                      maxLength={7}
                    />
                    <FontAwesome5
                      name={getSelectedCurrencyIcon()}
                      size={12}
                      color="#3DC8B2"
                      style={styles.inputIcon}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={styles.cardOne}>
                    <Text style={styles.dropText}>
                      Investment & share values
                    </Text>
                  </View>
                  <View style={styles.cardTwo}>
                    <TextInput
                      placeholder="0"
                      placeholderTextColor={'#787878'}
                      keyboardType="numeric"
                      returnKeyType="done"
                      // onChangeText={text => setInvestment(text)}
                      onChangeText={handleChangeText(setInvestment)}
                      value={investment}
                      style={styles.textNumber}
                      maxLength={7}
                    />
                    <FontAwesome5
                      name={getSelectedCurrencyIcon()}
                      size={12}
                      color="#3DC8B2"
                      style={styles.inputIcon}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={styles.cardOne}>
                    <Text style={styles.dropText}>Money owed to you</Text>
                  </View>
                  <View style={styles.cardTwo}>
                    <TextInput
                      placeholder="0"
                      placeholderTextColor={'#787878'}
                      keyboardType="numeric"
                      returnKeyType="done"
                      // onChangeText={text => setMoneyOwed(text)}
                      onChangeText={handleChangeText(setMoneyOwed)}
                      value={moneyOwed}
                      style={styles.textNumber}
                      maxLength={7}
                    />
                    <FontAwesome5
                      name={getSelectedCurrencyIcon()}
                      size={12}
                      color="#3DC8B2"
                      style={styles.inputIcon}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={styles.cardOne}>
                    <Text style={styles.dropText}>Business Assets</Text>
                  </View>
                  <View style={styles.cardTwo}>
                    <TextInput
                      placeholder="0"
                      placeholderTextColor={'#787878'}
                      keyboardType="numeric"
                      returnKeyType="done"
                      // onChangeText={text => setBusineesAssets(text)}
                      onChangeText={handleChangeText(setBusineesAssets)}
                      value={businessAssets}
                      style={styles.textNumber}
                      maxLength={7}
                    />
                    <FontAwesome5
                      name={getSelectedCurrencyIcon()}
                      size={12}
                      color="#3DC8B2"
                      style={styles.inputIcon}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              borderRadius: 15,
              backgroundColor: 'white',
              paddingVertical: 10,
              marginTop: 15,
              paddingLeft: 15,
            }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingBottom: 10,
              }}>
              <Text style={styles.titleH}>
                Gold & Silver
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                }}>
                <View style={styles.cardOne}>
                  <Text style={styles.dropText}>Value of Gold</Text>
                </View>
                <View style={styles.cardTwo}>
                  <TextInput
                    placeholder="0"
                    placeholderTextColor={'#787878'}
                    keyboardType="numeric"
                    returnKeyType="done"
                    // onChangeText={text => setGoldInGrams(text)}
                    onChangeText={handleChangeText(setGoldInGrams)}
                    value={goldInGrams}
                    maxLength={7}
                    style={styles.textNumber}
                  />
                  <FontAwesome5
                    name={getSelectedCurrencyIcon()}
                    size={12}
                    color="#3DC8B2"
                    style={styles.inputIcon}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={styles.cardOne}>
                  <Text style={styles.dropText}>Value of Silver</Text>
                </View>
                <View style={styles.cardTwo}>
                  <TextInput
                    placeholder="0"
                    placeholderTextColor={'#787878'}
                    keyboardType="numeric"
                    returnKeyType="done"
                    // onChangeText={text => setSilverYouOwned(text)}
                    onChangeText={handleChangeText(setSilverInGrams)}
                    value={silverInGrams}
                    maxLength={7}
                    style={styles.textNumber}
                  />
                  <FontAwesome5
                    name={getSelectedCurrencyIcon()}
                    size={12}
                    color="#3DC8B2"
                    style={styles.inputIcon}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              borderRadius: 15,
              backgroundColor: 'white',
              paddingVertical: 10,
              marginTop: 15,
              paddingLeft: 15,
            }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingBottom: 10,
              }}>
              <Text style={styles.titleH}>
                Short Term Liabilities
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: 10,
                }}>
                <View style={styles.cardOne}>
                  <Text style={styles.dropText}>Utility bills</Text>
                </View>
                <View style={styles.cardTwo}>
                  <TextInput
                    placeholder="0"
                    placeholderTextColor={'#787878'}
                    keyboardType="numeric"
                    returnKeyType="done"
                    maxLength={7}
                    onChangeText={value => {
                      if (value === '') {
                        setUtilityBillsValue(0);
                      } else {
                        setUtilityBillsValue(parseFloat(value));
                      }
                    }}
                    style={styles.textNumber}
                  />
                  <FontAwesome5
                    name={getSelectedCurrencyIcon()}
                    size={12}
                    color="#3DC8B2"
                    style={styles.inputIcon}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={styles.cardOne}>
                  <Text style={styles.dropText}>Personal Loans</Text>
                </View>
                <View style={styles.cardTwo}>
                  <TextInput
                    placeholder="0"
                    placeholderTextColor={'#787878'}
                    keyboardType="numeric"
                    returnKeyType="done"
                    maxLength={7}
                    onChangeText={value => {
                      if (value === '') {
                        setPersonalLoansValue(0);
                      } else {
                        setPersonalLoansValue(parseFloat(value));
                      }
                    }}
                    style={styles.textNumber}
                  />
                  <FontAwesome5
                    name={getSelectedCurrencyIcon()}
                    size={12}
                    color="#3DC8B2"
                    style={styles.inputIcon}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={styles.cardOne}>
                  <Text style={styles.dropText}>Overdraft</Text>
                </View>
                <View style={styles.cardTwo}>
                  <TextInput
                    placeholder="0"
                    placeholderTextColor={'#787878'}
                    keyboardType="numeric"
                    returnKeyType="done"
                    maxLength={7}
                    onChangeText={value => {
                      if (value === '') {
                        setOverdraftValue(0);
                      } else {
                        setOverdraftValue(parseFloat(value));
                      }
                    }}
                    style={styles.textNumber}
                  />
                  <FontAwesome5
                    name={getSelectedCurrencyIcon()}
                    size={12}
                    color="#3DC8B2"
                    style={styles.inputIcon}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={styles.cardOne}>
                  <Text style={styles.dropText}>Credit Cards</Text>
                </View>
                <View style={styles.cardTwo}>
                  <TextInput
                    placeholder="0"
                    placeholderTextColor={'#787878'}
                    keyboardType="numeric"
                    returnKeyType="done"
                    maxLength={7}
                    onChangeText={value => {
                      if (value === '') {
                        setCreditCardsValue(0);
                      } else {
                        setCreditCardsValue(parseFloat(value));
                      }
                    }}
                    style={styles.textNumber}
                  />
                  <FontAwesome5
                    name={getSelectedCurrencyIcon()}
                    size={12}
                    color="#3DC8B2"
                    style={styles.inputIcon}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={styles.cardOne}>
                  <Text style={styles.dropText}>Business Liabilities</Text>
                </View>
                <View style={styles.cardTwo}>
                  <TextInput
                    placeholder="0"
                    placeholderTextColor={'#787878'}
                    keyboardType="numeric"
                    returnKeyType="done"
                    maxLength={7}
                    onChangeText={value => {
                      if (value === '') {
                        setBusinessLiabilitiesValue(0);
                      } else {
                        setBusinessLiabilitiesValue(parseFloat(value));
                      }
                    }}
                    style={styles.textNumber}
                  />
                  <FontAwesome5
                    name={getSelectedCurrencyIcon()}
                    size={12}
                    color="#3DC8B2"
                    style={styles.inputIcon}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 10,
            // marginBottom: 5,
            marginTop: 10,
          }}>
          <View style={styles.cardOne}>
            <Text
              style={{
                color: '#3DC8B2',
                fontFamily: themeFont.englishFont,
                fontSize: 15,
                lineHeight: 17.6,
                fontWeight: Platform.OS === 'ios' ? '600' : '700',
                // marginLeft: 15,
                textAlign: 'center',
              }}>
              Net Assets
            </Text>
          </View>

          <View style={styles.cardTwo}>
            <FontAwesome5
              name={getSelectedCurrencyIcon()}
              size={12}
              color="#3DC8B2"
              style={[styles.inputIcon, {transform: [{translateY: -15}]}]}
            />
            <Text
              style={{
                color: '#282828',
                fontFamily: themeFont.englishFont,
                fontSize: 13,
                lineHeight: 15.25,
                fontWeight: '500',
                textAlign: 'center',
                // marginLeft: 15,
                // marginRight: 40,
              }}>
              {netWorth}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <View style={styles.cardOne}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#3DC8B2',
                  fontFamily: themeFont.englishFont,
                  fontSize: 15,
                  lineHeight: 17.6,
                  fontWeight: Platform.OS === 'ios' ? '600' : '700',
                  // marginLeft: 15,
                  textAlign: 'center',
                }}>
                Nisab Threshold
              </Text>
              <TouchableOpacity onPress={openModal}>
                <SimpleLineIcons
                  name="question"
                  size={13}
                  color="#8352EC"
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardTwo}>
            <FontAwesome5
              name={getSelectedCurrencyIcon()}
              size={12}
              color="#3DC8B2"
              style={[styles.inputIcon, {transform: [{translateY: -15}]}]}
            />
            <Text
              style={{
                color: '#282828',
                fontFamily: themeFont.englishFont,
                fontSize: 13,
                lineHeight: 15.25,
                fontWeight: '500',
                textAlign: 'center',
                // marginLeft: 15,
                // marginRight: 40,
              }}>
              {nisabValue}
            </Text>
          </View>
        </View>

        <View style={{paddingTop: 20}}>
          {error != '' && (
            <Text
              style={{
                textAlign: 'center',
                marginBottom: 15,
                color: '#FF0000',
                fontSize: 13,
                fontWeight: '500',
                lineHeight: 15,
                fontFamily: themeFont.englishFont,
              }}>
              {error}
            </Text>
          )}

          <TouchableOpacity style={styles.SubmitButton} onPress={handleAdd}>
            <View
              style={{
                borderRadius: 15,
                backgroundColor: '#4C20AA',
                paddingVertical: 11,
                paddingHorizontal: 45,
                flexDirection: 'row',
                gap: 5,
              }}>
              <Text
                style={{
                  color: '#F4F9F0',
                  alignSelf: 'center',
                  fontSize: 16.63,
                  fontWeight: Platform.OS === 'ios' ? '600' : '700',
                  lineHeight: 19.96,
                  fontFamily: themeFont.englishFont,
                }}>
                Calculate
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              {/* <Text style={styles.closeButtonText}>×</Text> */}
              <Ionicons name="close" size={25} color={'#282828'} />
            </TouchableOpacity>
            <Text style={styles.nisabmodalTitle}>Nisab Threshold:</Text>
            <Text style={styles.modalText}>
              Nisab is the minimum amount that a Muslim must have before being
              obliged to zakat. The Nisab was set by Prophet Muhammad (peace be
              upon him) at a rate equivalent to: 87.48 grams of gold and 612.36
              grams of silver.
            </Text>
          </View>
        </View>
      </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#F4F4F4',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
  inputIcon: {
    position: 'absolute',
    right: 85,
    top: '50%',
    transform: [{translateY: -13}],
  },
  topBar: {
    fontFamily: themeFont.englishFont,
    paddingVertical: 15,
    // paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarHeader: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
    fontSize: 15,
    fontFamily: themeFont.englishFont,
    lineHeight: 17.6,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    color: '#282828'
  },
  cardText: {
    backgroundColor: '#8352EC',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    gap: 15,
  },
  card: {
    backgroundColor: '#F3F3F3',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 59,
    paddingVertical: 10,
  },
  currencyText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#666161',
  },
  SubmitButton: {
    paddingBottom: 15,
    fontSize: 16.63,
    fontWeight: '700',
    borderRadius: 12.47,
    // backgroundColor: '#4C20AA',
    // width: 241.95,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    borderRadius: 15,
    marginTop: 1,
    fontFamily: themeFont.englishFont,
    fontStyle: 'normal',
    backgroundColor: '#F3F3F3',
    padding: 15,
    marginBottom: 10,
  },
  cardOne: {
    // backgroundColor: '#FFFFFF',
    borderRadius: 15.87,
    paddingHorizontal: 20,
    marginBottom: 15,
    textAlign: 'left',
    width: '70%',
    // height: 52,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardTwo: {
    // borderRadius: 15.87,
    width: '30%',
    flexDirection: 'column',
    // height: 52,
    // paddingHorizontal: 10,
  },
  textNumber: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: themeFont.englishFont,
    // lineHeight: 15.25,
    color: '#202020',
    height: Platform.OS === 'ios' ? 'auto' : 40,
    marginTop: Platform.OS === 'ios' ? 0 : -8,
  },
  dropText: {
    textAlign: 'center',
    color: '#4C20AA',
    fontSize: 14,
    justifyContent: 'center',
    // lineHeight: 14.08,
    fontFamily: themeFont.englishFont,
    fontWeight: '400',
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    // backgroundColor: '#F3F3F3',
    borderRadius: 8,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // borderWidth: 1,
    // borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {
    // color: '#444',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '400',
  },
  dropdown1DropdownStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)', // Semi-transparent background color
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
  },
  dropdown1RowStyle: {
  },
  dropdown1RowTxtStyle: {color: '#202020', textAlign: 'center', fontSize: 14},

  currencyButton: {
    flexDirection: 'row',
    marginRight: 15,
    gap: 1,
  },
  currencyButtonText: {
    color: '#3DC8B2',
    fontSize: 12,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    lineHeight: 20,
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 15,
    marginBottom: 20,
    alignSelf: 'center',
    lineHeight: 17.6,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    color: '#282828',
    fontFamily: themeFont.englishFont,
    textAlign: 'center',
  },

  nisabmodalTitle: {
    fontSize: 16,
    // marginBottom: 20,
    alignSelf: 'flex-start',
    lineHeight: 19,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    color: '#282828',
    fontFamily: themeFont.englishFont,
    // textAlign: 'center',
  },
  currencyItem: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'flex-start',
    color: '#000'
  },
  selectedCurrencyItem: {
    // backgroundColor: 'rgba(128, 0, 128, 0.1)',i // Light purple background
  },
  currencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currencyText1: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    lineHeight: 15.25,
    fontFamily: themeFont.englishFont,
    color: '#000'
  },
  currencyText2: {
    fontSize: 12,
    flex: 0,
    lineHeight: 20,
    fontFamily: themeFont.englishFont,
    fontWeight: '600',
    color: '#000'
  },
  selectedCurrencyText: {
    color: '#8352EC',
  },
  currencyIcon: {
    // marginRight: 10,
    marginLeft: 5,
    alignSelf: 'center',
  },
  insetShadow: {
    flex: 1,
    borderRadius: 15.69,
    marginBottom: 15,
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: screenWidth / 1.3,
    backgroundColor: '#F4F4F4',
    borderRadius: 25,
    paddingVertical: 28,
    paddingHorizontal: 25,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#000',
  },

  modalText: {
    marginTop: 5,
    textAlign: 'justify',
    fontFamily: themeFont.englishFont,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    // letterSpacing: -0.25,
    color: '#000'
  },
  titleH: {
    fontFamily: themeFont.englishFont,
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
    lineHeight: 15.25,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
    color: '#000'
  }
});

export default ZakatDashboard;