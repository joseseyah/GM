import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  Switch,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  Animated,
  FlatList,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {SettingsContext} from '../../context/SettingsProvider';
import CustomModal from '../../common/CustomModal';
import settingsStore from '../../stores/settingsStore';
import RadioButton from '../../common/RadioButton';
import DeviceBrightness from '@adrianso/react-native-device-brightness';
// import TrackPlayer from 'react-native-track-player';
import theme, { themeFont } from '../../styles/theme';
import translators from '../../common/meta/translations-meta.json'; 
import allReciters from '../../common/meta/reciters.json'; 
import { recitersImg } from '../../common/meta/reciters';
import SelectTranslation from './SelectTranslation';

const {width} = Dimensions.get('window');
const speedValues = [0.25, 0.5, 0.725, 1, 1.25, 1.5, 1.725, 2];

const SettingScreens = ({visible,onClose,navigation, navigateReciter, updateTransltorSlug,updateShowTranslation, updateQuranView, updateAppTheme}: any) => {
  // const {recitersData, getRecitersData} = quranStore();
  const [recitersData, setRecitersData] = useState<any[]>([]);
  const {settings, changeSettings} = useContext(SettingsContext);
  const {
    showSettingScreen,
    theme,
    setTheme,
    quranView,
    setQuranView,
    audioAutoScroll,
  } = settingsStore();

  const [isEnabled, setIsEnabled] = useState(false);
  const [arabicFontValue, setArabicFontValue] = useState(
    settings?.font?.arabicSize,
  );
  const [englishFontValue, setEnglishFontValue] = useState(
    settings?.font?.englishSize,
  );
  const [selectedReciter, setSelectedReciter] = useState(
    settings?.reciter
  );
  const [displayEnglish, setDisplayEnglish] = useState(settings?.font?.displayEnglish);
  const [displayTajweed, setTajweed] = useState(settings?.font?.displayTajweed);
  const [displayTafsir, setDisplayTafsir] = useState(settings?.font?.displayTafsir);
  const [displayTransliteration, setDisplayTransliteration] = useState(settings?.font?.displayTransliteration);
  const [open, setOpen] = useState(false);
  const [openTranslation, setOpenTranslation] = useState(false);
  const [brightness, setBrightness] = useState(1); // Default brightness

  const [script, setScript] = useState<string>(
    settings?.font?.script || 'indopak',
  );
  const [trans, setTrans] = useState<number>(
    settings?.font?.translation || 20,
  );
  const [tafsir, setTafsir] = useState(settings?.font?.tafsir);
  const [translatorsData, setTranslatorsData] = useState<any[]>([]);
  const [selectedTranslator, setSelectedTranslator] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [displayType, setdisplayType] = useState('display');
  const [showChangeText, setShowChangeText] = useState('arabic');
  const [audioSpeed, setAudioSpeed] = useState(settings?.font?.audioSpeed);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [thumbX, setThumbX] = useState(new Animated.Value(0));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  useEffect(() => {
    // Get the current brightness level when the component mounts
    DeviceBrightness.getBrightnessLevel().then(level => {
      setBrightness(level);
    });
    setRecitersData(allReciters);
    let setting: any = settings;
    if(displayEnglish === undefined){
      console.log("it is undefined");
      setting.font.displayEnglish = true;
      changeSettings(setting);
    }
    if(trans === undefined){
      console.log("it is undefined");
      setting.font.translation = 20;
      changeSettings(setting);
    }
    if(script === undefined){
      console.log("it is undefined");
      setting.font.script = 'indopak';
      changeSettings(setting);
    }
    if(theme === undefined){
      console.log("it is undefined");
      setting.font.theme = 'light';
      changeSettings(setting);
    }
  }, []);

  useEffect(() => {
    // console.log("updated");
    // console.log(showSettingScreen);
    setModalVisible(showSettingScreen);
  }, [showSettingScreen]);

  // useEffect(() => {
  //   if (!recitersData) {
  //     getRecitersData();
  //   }
  // }, [recitersData]);

  useEffect(() => {
    if (translatorsData) {
      let f = translatorsData.find(x => x.id == trans);
      setSelectedTranslator(f);
    }
  }, [translatorsData]);

  const changeFont = (type: string, value: any) => {
    let setting: any = settings;
    if (type == 'arabic') {
      setting.font.arabicSize = value;
    } else {
      setting.font.englishSize = value;
    }
    changeSettings(setting);
  };

  const changeScript = (value: string) => {
    let setting = settings;
    setting.font.script = value;
    changeSettings(setting);
  };

  const changeTranslation = (value: any, slug: any, language_name: any) => {
    console.log(value);
    // Create a shallow copy of the settings to avoid direct state mutation
    const updatedSettings = {
      ...settings,
      font: {
        ...settings.font,
        translation: value, // Corrected from `trasnlation` to `translation`
        translation_slug: slug,
        displayEnglish: displayEnglish,
        trnslationLang: language_name
      },
    };
    setTrans(value);
    updateTransltorSlug(slug);
    // Find the selected translator based on the updated translation value
    const selectedTranslator = translatorsData.find(
      (x: any) => x.id === updatedSettings.font.translation,
    );
    console.log("selected translator:");
    console.log(selectedTranslator);
    // Update state with the new selected translator and updated settings
    setSelectedTranslator(selectedTranslator);
    changeSettings(updatedSettings);

    // Close the dropdown
    setIsDropdownOpen(false);
  };

  const setFontSize = (key: any, value: any) => {
    let setting: any = settings;
    setting.font[key] = value;
    changeSettings(setting);
  };

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={{padding: 10}}
      onPress={() => changeTranslation(item.id, item.slug, item.language_name)}>
      <Text>{item.language_name}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    // getTranslatorsData().then(data => {
    //   console.log("translators data");
    //   console.log(data.data);
    //   setTranslatorsData(data.data.translations);
    // });
    setTranslatorsData(translators?.translations);
  }, []);

  const themeChange = (type: string) => {
    console.log('type', type);
  };

  const selectReciter = (value: any) => {
    // console.log('selectReciter', value);
    let setting = settings;
    setting.reciter = value;
    setSelectedReciter(value);
    changeSettings(setting);
  };

  const handleSpeedChange = async (value: number) => {
    // Find the closest speed value from the predefined list
    const closestSpeed = speedValues.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
    );
    setAudioSpeed(closestSpeed);

    let setting: any = settings;
    setting.font.audioSpeed = closestSpeed;
    changeSettings(setting);
    // await TrackPlayer.setRate(closestSpeed);
    // Calculate thumb position
    const thumbPos = ((closestSpeed - 0.25) / (2.5 - 0.25)) * sliderWidth;
    Animated.timing(thumbX, {
      toValue: thumbPos,
      duration: 0,
      useNativeDriver: false,
    }).start();
    // console.log("closestSpeed",closestSpeed);
  };

  const updateTheme = (theme: string) => {
    let setting = settings;
    setting.font.theme = theme;
    changeSettings(setting);
  };
  const updateView = (view: string) => {
    let setting = settings;
    setting.font.quranView = view;
    // settingsStore.setState({setQuranView: view})
    
    changeSettings(setting);
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        // visible={modalVisible}
        visible={visible}
        onRequestClose={onClose}
        // onRequestClose={() => {
        //   setModalVisible(!modalVisible);
        // }}
        >
        <View style={styles.settingCenteredView}>
          <LinearGradient
            colors={['rgba(242, 242, 242, 1)', 'rgba(247, 247, 247, 1)']}
            start={{x: 0.0, y: 0.0}}
            end={{x: 1.0, y: 1.0}}
            locations={[0, 0.85]}
            style={styles.settingsModalView}>
            <View style={{
              paddingVertical: 20,
              paddingHorizontal: 15,
              paddingBottom: 50
                }}>
            <View>
              <Text
                style={{
                  alignSelf: 'center',
                  marginBottom: 20,
                  fontSize: 15,
                  lineHeight: 17.6,
                  fontWeight: Platform.OS === 'ios' ? '600' : '700', 
                  fontFamily: themeFont.englishFont,
                  color: '#282828',
                }}>
                Settings
              </Text>
            </View>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={onClose}
              // onPress={() => {
              //   setModalVisible(!modalVisible);
              //   settingsStore.setState({showSettingScreen: !modalVisible});
              // }}
              >
              <MaterialCommunityIcons name="close" size={25} color="#000" />
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  {
                    backgroundColor:
                      displayType === 'display' ? '#376BB7' : 'transparent',
                  },
                ]}
                onPress={() => {
                  setdisplayType('display');
                }}>
                <Text
                  style={[
                    styles.tabButtonText,
                    {color: displayType === 'display' ? '#fff' : '#000'},
                  ]}>
                  Display
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  {
                    backgroundColor:
                      displayType === 'text' ? '#376BB7' : 'transparent',
                  },
                ]}
                onPress={() => {
                  setdisplayType('text');
                }}>
                <Text
                  style={[
                    styles.tabButtonText,
                    {color: displayType === 'text' ? '#fff' : '#000'},
                  ]}>
                  Text
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  {
                    backgroundColor:
                      displayType === 'audio' ? '#376BB7' : 'transparent',
                  },
                ]}
                onPress={() => {
                  setdisplayType('audio');
                }}>
                <Text
                  style={[
                    styles.tabButtonText,
                    {color: displayType === 'audio' ? '#fff' : '#000'},
                  ]}>
                  Audio
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <View>
                {displayType === 'display' && (
                  <View style={styles.Cards}>
                    <View>
                      <Text style={styles.Text}>Themes</Text>
                      <View
                        style={{flexDirection: 'row', gap: 20, marginTop: 10}}>
                        <RadioButton
                          selected={theme === 'dark'}
                          text={'Dark Mode'}
                          handlePress={() => {
                            setTheme('dark');
                            updateTheme('dark');
                            updateAppTheme('dark');
                          }}
                        />
                        <RadioButton
                          selected={theme === 'light'}
                          text={'Light Mode'}
                          handlePress={() => {
                            setTheme('light');
                            updateTheme('light');
                            updateAppTheme('light');
                          }}
                        />
                      </View>
                      <View style={{marginTop: 20}}>
                        <Text style={styles.Text}>View</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 20,
                            marginTop: 10,
                          }}>
                          <RadioButton
                            selected={settings.font.quranView === 'list'}
                            text={'List'}
                            handlePress={() => {
                              updateView('list');
                              setQuranView('list');
                              updateQuranView('list');
                            }}
                          />
                          <RadioButton
                            selected={settings.font.quranView === 'page'}
                            text={'Page'}
                            handlePress={() => {
                              updateView('page');
                              setQuranView('page');
                              updateQuranView('page');
                            }}
                          />
                        </View>
                      </View>
                      <Text
                        style={[
                          styles.Text,
                          {marginTop: 20, marginBottom: 10},
                        ]}>
                        Brightness
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Slider
                          minimumValue={0}
                          maximumValue={1}
                          step={0.01}
                          onValueChange={value => {
                            setBrightness(value);
                            DeviceBrightness.setBrightnessLevel(value);
                            settingsStore.setState({
                              brightness: value,
                            });
                          }}
                          minimumTrackTintColor={'#376BB7'}
                          maximumTrackTintColor={'#376BB7'}
                          thumbTintColor="#376BB7"
                          style={{
                            width: '80%',
                          }}
                          thumbImage={require('../../assets/images/brightness.png')}
                        />
                      </View>
                    </View>
                  </View>
                )}

                {displayType === 'text' && (
                  <View style={styles.Cards}>
                    <View>
                      <View>
                        <Text
                          style={{
                            fontSize: 12.5,
                            lineHeight: 18.28,
                            fontWeight: Platform.OS === 'ios' ? '600' : '700',
                            fontFamily: themeFont.englishFont,
                            color: '#282828',
                            // marginHorizontal: 10,
                          }}>
                          Font Size
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View>
                          <View style={[styles.settingItemContainer]}>
                            <Text
                              style={[
                                styles.Text,
                                {fontSize: 12, fontWeight: '400'},
                              ]}>
                              Arabic
                            </Text>
                            <Slider
                              step={4}
                              maximumValue={50}
                              minimumValue={25}
                              minimumTrackTintColor={'#376BB7'}
                              maximumTrackTintColor={'#376BB7'}
                              thumbTintColor="#376BB7"
                              onValueChange={value => {
                                setArabicFontValue(value);
                                changeFont('arabic', value);
                                setShowChangeText('arabic');
                                settingsStore.setState({
                                  arabicFontValue: value,
                                });
                              }}
                              value={arabicFontValue}
                              style={{width: '50%'}}
                            />
                          </View>

                          <View style={styles.settingItemContainer}>
                            <Text
                              style={[
                                styles.Text,
                                {fontSize: 12, fontWeight: '400'},
                              ]}>
                              Translation
                            </Text>
                            <Slider
                              step={4}
                              maximumValue={30}
                              minimumValue={12}
                              minimumTrackTintColor={'#376BB7'}
                              maximumTrackTintColor={'#376BB7'}
                              thumbTintColor="#376BB7"
                              onValueChange={value => {
                                setEnglishFontValue(value);
                                changeFont('english', value);
                                setShowChangeText('english');
                                settingsStore.setState({
                                  englishFontValue: value,
                                });
                              }}
                              value={englishFontValue}
                              style={{width: '50%'}}
                            />
                          </View>
                        </View>
                        {showChangeText == 'arabic' ? (
                          <View style={styles.fontBox}>
                            <Text
                              style={{
                                fontWeight: '600',
                                color: '#376BB7',
                                alignSelf: 'center',
                                fontSize: arabicFontValue,
                                fontFamily: themeFont.indoPak,
                              }}>
                              ٱللَّٰه
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              width: 100,
                              height: 100,
                              justifyContent: 'center',
                              overflow: 'scroll',
                              borderWidth: 0.5,
                              borderColor: '#376BB7',
                            }}>
                            <Text
                              style={{
                                fontWeight: '600',
                                alignSelf: 'center',
                                fontSize: englishFontValue,

                                color: '#376BB7',
                              }}>
                              Alhamdulillah
                            </Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.settingItemContainer1}>
                        <Text style={styles.Text}>Change Translation</Text>
                        <TouchableOpacity
                          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 10, // Increased touch area
                          }}>
                          <Text
                            style={{
                              color: '#282828',
                              lineHeight: 11.73,
                              fontFamily: themeFont.englishFont,
                              fontSize: Platform.OS === 'ios' ? 10 : 12,
                              fontWeight: Platform.OS === 'ios' ? '400' : '500'
                            }}>
                            {selectedTranslator
                              ? `Selected: ${selectedTranslator.translator_name}` // Change this to show the translator name
                              : 'Select Translation'}
                          </Text>
                          <Feather
                            name={
                              isDropdownOpen ? 'chevron-up' : 'chevron-down'
                            }
                            size={20}
                            color="#376BB7"
                            style={{marginLeft: 5}} // Add some spacing
                          />
                        </TouchableOpacity>
                        {isDropdownOpen && (
                          // <View style={ Platform.OS === 'android' ? styles.absoluteContainer : ''}>
                          <View >
                          <View style={styles.dropdownContainer}>
                            <FlatList
                              data={translatorsData}
                              keyExtractor={item => item.id.toString()}
                              renderItem={({item}) => (
                                <TouchableOpacity
                                  onPress={() => {
                                    changeTranslation(item.id, item.slug, item.language_name);
                                    setTrans(item.id);
                                    setIsDropdownOpen(false); // Close dropdown after selection
                                  }}
                                  style={styles.option}>
                                  <Text style={styles.optionText}>
                                    {item.translator_name}
                                  </Text>
                                  <Text style={styles.languageText}>
                                    Language: {item.language_name}
                                  </Text>
                                  {selectedTranslator === item.id && (
                                    <Feather
                                      name="check"
                                      size={20}
                                      color="#376BB7"
                                    />
                                  )}
                                </TouchableOpacity>
                              )}
                            />
                          </View>
                          </View>
                        )}
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 50,
                          marginTop: 20,
                          // paddingHorizontal: 10,
                        }}>
                        <Text style={styles.Text}>Arabic Script</Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 10,
                          }}>
                          <RadioButton
                            selected={script === 'uthmani'}
                            text={'Uthmani'}
                            handlePress={() => {
                              setScript('uthmani');
                              changeScript('uthmani');
                            }}
                          />
                          <RadioButton
                            selected={script === 'indopak'}
                            text={'IndoPak'}
                            handlePress={() => {
                              setScript('indopak');
                              changeScript('indopak');
                            }}
                          />
                        </View>
                      </View>
                      <View style={styles.settingItemContainerToggle}>
                        <Text style={styles.Text}>View Translation</Text>
                        <Switch
                          trackColor={{false: '#C7C7C7', true: '#376BB7'}}
                          thumbColor={displayEnglish ? '#F3F3F3' : '#F3F3F3'}
                          ios_backgroundColor="#C7C7C7"
                          onValueChange={value => {
                            setDisplayEnglish(value);
                            setFontSize('displayEnglish', value);
                            updateShowTranslation(value);
                          }}
                          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                          value={displayEnglish}
                        />
                      </View>

                      <View style={styles.settingItemContainerToggle}>
                        <Text style={styles.Text}>View Transliteration</Text>
                        <Switch
                          trackColor={{false: '#C7C7C7', true: '#376BB7'}}
                          thumbColor={displayTransliteration ? '#F3F3F3' : '#F3F3F3'}
                          ios_backgroundColor="#C7C7C7"
                          onValueChange={value => {
                            setDisplayTransliteration(value);
                            setFontSize('displayTransliteration', value);
                          }}
                          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                          value={displayTransliteration}
                        />
                      </View>

                      <View style={styles.settingItemContainerToggle}>
                        <Text style={[styles.Text]}>
                        {/* <Text style={[styles.Text, {color: '#C7C7C7'}]}></Text> */}
                          Tajweed Guide
                        </Text>
                        <Switch
                          trackColor={{false: '#FF0000', true: '#376BB7'}}
                          thumbColor={displayTajweed ? '#F3F3F3' : '#F3F3F3'}
                          ios_backgroundColor="#C7C7C7"
                          
                          onValueChange={value => {
                            setTajweed(value);
                            setFontSize('displayTajweed', value);
                          }}
                          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                          value={displayTajweed}
                        />
                      </View>
                    </View>
                  </View>
                )}
                {displayType === 'audio' && (
                  <View style={styles.Cards}>
                    <View>
                      <View
                        style={[styles.settingItemContainer, {paddingTop: 0}]}>
                        <View>
                          <Text style={styles.Text}>Audio Auto-scroll</Text>
                          <Text
                            style={{
                              fontSize: 10,
                              color: '#202020',
                              fontWeight: '400',
                            }}>
                            Screen always on
                          </Text>
                        </View>
                        <Switch
                          trackColor={{false: '#C7C7C7', true: '#376BB7'}}
                          thumbColor={isEnabled ? '#F3F3F3' : '#F3F3F3'}
                          ios_backgroundColor="#C7C7C7"
                          onValueChange={value => {
                            settingsStore.setState({
                              audioAutoScroll: value,
                            });
                          }}
                          style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                          value={audioAutoScroll}
                        />
                      </View>
                      <View style={{paddingTop: 15, paddingHorizontal: 10}}>
                        <Text style={styles.Text}>Speed</Text>
                        <View
                          style={{position: 'relative', marginVertical: 20}}>
                          <View
                            style={{
                              // flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                              // backgroundColor: '#F5FCFF',
                            }}>
                            <Animated.View
                              style={[
                                styles.thumbTextContainer,
                                {
                                  transform: [
                                    {
                                      translateX: thumbX.interpolate({
                                        inputRange: [0, sliderWidth],
                                        outputRange: [0, sliderWidth],
                                        extrapolate: 'clamp',
                                      }),
                                    },
                                  ],
                                },
                              ]}>
                              <Text style={styles.thumbText}>
                                {audioSpeed}x
                              </Text>
                            </Animated.View>
                            <Slider
                              minimumValue={0.25}
                              maximumValue={2.5}
                              step={0.25}
                              value={audioSpeed}
                              onValueChange={handleSpeedChange}
                              minimumTrackTintColor={'#376BB7'}
                              maximumTrackTintColor={'#376BB7'}
                              thumbTintColor="#376BB7"
                              onLayout={event => {
                                const {width} = event.nativeEvent.layout;
                                setSliderWidth(width);
                              }}
                              // onValueChange={value => {
                              //   setAudioSpeed(value);
                              //   // changeFont('arabic', value);
                              // }}
                              style={{width: 200, height: 40}}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={{paddingHorizontal: 10}}>
                        <Text style={[styles.Text, {marginBottom: 20}]}>
                          Reciters
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                          }}>
                          {recitersData.slice(0, 4).map((reciter: any) => (
                            <TouchableOpacity
                              key={reciter.id}
                              onPress={() => { 
                                selectReciter(reciter); 
                                setModalVisible(!modalVisible);
                                settingsStore.setState({showSettingScreen: !modalVisible});
                                navigateReciter();
                              }}>
                              <Image
                                source={recitersImg[reciter.slug]}
                                style={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: 50,
                                  resizeMode: 'cover',
                                  alignSelf: 'center',
                                }}
                              />
                              {selectedReciter?.id == reciter.id && (
                                <Image
                                  source={require('../../assets/images/choosen.png')}
                                  style={{
                                    position: 'absolute',
                                    width: 14,
                                    height: 14,
                                    bottom: 25,
                                    right: 10,
                                    resizeMode: 'cover',
                                  }}
                                />
                              )}
                              <Text
                                style={{
                                  fontSize: 8,
                                  color: '#282828',
                                  textAlign: 'center',
                                  width: width / 6,
                                  gap: 10,
                                  marginTop: 5,
                                  // flexWrap: 'wrap',
                                }}>
                                {reciter.name}
                              </Text>
                            </TouchableOpacity>
                          ))}
                          <TouchableOpacity
                            onPress={() => {
                              setModalVisible(!modalVisible);
                              settingsStore.setState({showSettingScreen: !modalVisible});
                              navigateReciter();
                            }}>
                            <Text
                              style={{
                                fontSize: 8,
                                color: '#376BB7',
                                fontWeight: '400',
                                lineHeight: 9.38,
                              }}>
                              View More
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
            </View>
          </LinearGradient>
        </View>
      </Modal>

      <CustomModal
        modalVisible={openTranslation}
        setModalVisible={(value: boolean | ((prevState: boolean) => boolean)) => {
          setOpenTranslation(value);
          setModalVisible(true);
        }}>
        <SelectTranslation
          translatorsData={translatorsData}
          selected={settings?.font?.translation}
          changeTranslation={changeTranslation}
          setOpen={setOpenTranslation}
        />
      </CustomModal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // width: width,
    backgroundColor: 'white',
    // paddingHorizontal: 20,
    // paddingBottom: 30,
  },
  Cards: {
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 15,
    position: 'relative',  
  },
  linearGradient: {
    borderRadius: 25,
    // marginBottom: 20,
    marginVertical: 15,
  },
  CardsFooter: {
    width: '100%',
    height: 70,
    borderRadius: 15,
    backgroundColor: '#F3F3F3',
    shadowColor: '#000',
    padding: 20,
    marginTop: 15,
  },
  TextHeader: {
    alignSelf: 'center',
    fontFamily: themeFont.englishFont,
    fontSize: 19,
    fontWeight: '700',
    color: '#202020',
    marginBottom: 10,
    marginTop: 10,
  },
  Text: {
    fontFamily: themeFont.englishFont,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    fontSize: 14,
    color: '#202020',
  },
  settingItemContainer: {
    paddingTop: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  settingItemContainerToggle: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#376BB7',
    borderRadius: 10,
  },
  updateText: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontFamily: themeFont.englishFont,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18.78,
  },
  settingCenteredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalClose: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  settingsModalView: {
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    margin: 0,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 28,
  },
  activeTabButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 28,
    backgroundColor: '#376BB7',
  },
  tabButtonText: {
    color: '#000',
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  fontBox: {
    width: 100,
    height: 100,
    overflow: 'scroll',
    borderWidth: 0.5,
    borderColor: '#376BB7',
    justifyContent: 'center',
  },

  thumbTextContainer: {
    position: 'absolute',
    bottom: 30, // Adjust this value as needed
    left: 20,
  },
  thumbText: {
    fontSize: 12,
    // backgroundColor: 'white',
    // padding: 5,
    // borderRadius: 5,
    paddingBottom: 5,
    paddingHorizontal: -5,
    overflow: 'hidden',
    color: '#376BB7',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  thumb: {
    height: 20,
    width: 20,
  },
  settingItemContainer1: {
    marginBottom: 10,
    paddingTop: 15,
    width: '100%',
    // position: 'relative',
  },
  absoluteContainer: {
    // position: 'absolute',
    // top: 40,
    left: 0,
    right: 0,
    zIndex: 999, 
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
    width: '100%', 
    maxHeight: 200, 
    overflow: 'hidden', 
    // position: 'absolute',
    // top: 60
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  languageText: {
    fontSize: 14,
    color: '#555',
  },
});
export default SettingScreens;