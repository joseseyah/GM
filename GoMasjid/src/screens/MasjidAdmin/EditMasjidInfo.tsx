import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Modal,
    Switch,
    Image,
    ActivityIndicator,
    ImageBackground,
    Dimensions,
    Platform,
} from 'react-native';

import theme, { themeFont } from '../../styles/theme';
import Header from '../../common/Header';
import { UserContext } from '../../context/UserProvider';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MasjidFacilities } from '../../common/MasjidFacilities';
import { updateMasjidData } from '../../services/api';
import { uploadImage } from '../../services/s3Upload';

const { height, width } = Dimensions.get('window');

const EditMasjidInfo = ({ navigation, route }: any) => {
    const { masjidData, masjidInfo } = route.params;
    const [loading, setLoading] = useState<any>();
    const [successModal, setSuccessModal] = useState(false);
    const { userInfo } = useContext(UserContext);
    const [masjidId, setMasjidId] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedBackgroundImage, setSelectedBackgroundImage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [masjidfacilities, setMasjidfacilities] = useState<string[]>([]);

    const defaultMasjidBackgroundImage = require('../../assets/images/HomeEventBackground.png');

    const imageSource = masjidData?.masjidImageUrl;

    const masjidCoverImage = masjidData?.masjidCoverImage
        ? { uri: masjidData.masjidCoverImage }
        : defaultMasjidBackgroundImage;

    useEffect(() => {
        setMasjidId(masjidData.masjid_id);
    }, []);

    useEffect(() => {
        setMasjidfacilities(masjidInfo);
        // console.log('masjid facilities', masjidfacilities);  
    }, [masjidInfo]);

    const submit = async () => {
        try {
            setLoading(true);
            let data = {
                masjid_id: masjidId,
                facilities: JSON.stringify(masjidfacilities),
                cover_image_url: selectedBackgroundImage,
                logo_url: selectedImage,
            };
            console.log(data);
            const userToken = userInfo?.userToken;
            const masjidUpdate = await updateMasjidData(Number(masjidId), data, userToken);

            if (masjidUpdate) {
                setLoading(false);
                setSuccessModal(true);
            }

        } catch (error) {
        }
    };

    const selectImageAndUpload = async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, async response => {
            if (response.didCancel || response.errorCode || response.errorMessage) return;

            const file = response.assets[0];

            // console.log('File:', file);
            const fileType = file.type;
            const fileExtension = fileType ? fileType.split("/")[1] : '';
            const fileName = `logo_${masjidId}.${fileExtension}`;

            if (file.uri) {
                setSelectedImage(file.uri);
            }

            if (file) {
                try {
                    setIsUploading(true);
                    const data = await uploadImage({
                        fileName: fileName,
                        uri: file.uri,
                        type: file.type
                    }, Number(masjidId));

                    // console.log('Signed URL:', data);
                    setSelectedImage(data);
                    setIsUploading(false);

                } catch (error) {
                    // console.error("Upload failed", error);
                }
            }
        });
    };

    const selectBackgroundImageAndUpload = async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, async response => {
            if (response.didCancel || response.errorCode || response.errorMessage) return;

            const file = response.assets[0];

            // console.log('File:', file);
            const fileType = file.type;
            const fileExtension = fileType ? fileType.split("/")[1] : '';
            const fileName = `cover_${masjidId}.${fileExtension}`;

            if (file.uri) {
                setSelectedBackgroundImage(file.uri);
            }

            if (file) {
                try {
                    setIsUploading(true);
                    const data = await uploadImage({
                        fileName: fileName,
                        uri: file.uri,
                        type: file.type
                    }, Number(masjidId));

                    setSelectedBackgroundImage(data);
                    setIsUploading(false);

                } catch (error) {
                }
            }
        });
    };

    const iconColor = '#F4F4F4';

    return (
        <ImageBackground
            // source={selectedBackgroundImage ? { uri: selectedBackgroundImage } : masjidCoverImage}
            source={require('../../assets/images/masjidAdminBackground.png')}
            style={{ flex: 1 }}
            resizeMode="cover">
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.mainContainer}>
                    <View>
                        <ImageBackground
                            source={selectedBackgroundImage ? { uri: selectedBackgroundImage } : masjidCoverImage}
                            resizeMode="cover"
                            style={{ width: '100%', height: 269 }}>
                            <View style={{ paddingTop: Platform.OS === 'ios' ? 40 : 10 }}>
                                <View
                                    style={[
                                        styles.container,
                                        {
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginRight: 50,
                                        },
                                    ]}>
                                    <Header
                                        title="Edit Info"
                                        onBack={() => navigation.goBack()}
                                    />
                                    <TouchableOpacity onPress={selectBackgroundImageAndUpload}>
                                        <MaterialCommunityIcons
                                            name="camera-plus-outline"
                                            size={25}
                                            color="#000"
                                            style={{ paddingTop: 10 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}>
                                <TouchableOpacity onPress={selectImageAndUpload}>
                                    {masjidData?.masjidImageUrl ? (
                                        <Image
                                            source={selectedImage ? { uri: selectedImage } : { uri: masjidData?.masjidImageUrl }}
                                            resizeMode="cover"
                                            style={{
                                                width: 110,
                                                height: 110,
                                                borderRadius: 55,
                                                backgroundColor: '#FFF',
                                                marginTop: 120,
                                            }}
                                        />
                                    ) : (
                                        <View style={{
                                            width: 110,
                                            height: 110,
                                            borderRadius: 55,
                                            marginTop: 120, backgroundColor: '#3DC8B2', justifyContent: 'center', alignItems: 'center'
                                        }}>
                                        </View>
                                    )}
                                    {isUploading && (
                                        <ActivityIndicator
                                            size="large"
                                            color="#000"
                                            style={{
                                                position: 'absolute',
                                                top: '75%', // Center vertically
                                                left: '50%', // Center horizontally
                                                marginLeft: -15, // Half of indicator size to adjust center
                                                marginTop: -15,
                                            }}
                                        />
                                    )}
                                    <MaterialCommunityIcons
                                        name="camera-plus-outline"
                                        size={20}
                                        color={'#282828'}
                                        style={{
                                            position: 'absolute',
                                            bottom: 10, // Space from the bottom of the circle
                                            alignSelf: 'center',
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                        <View style={styles.container}>
                            <View style={{ flex: 1, marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('SalahTimes', {
                                            masjid_id: masjidId
                                        })
                                    }
                                    style={{ marginTop: 50 }}>
                                    <LinearGradient
                                        colors={[
                                            'rgba(255, 255, 255, 0.25)',
                                            'rgba(42, 42, 42, 0.15)',
                                        ]}
                                        start={{ x: 0.05, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.card2}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 15,
                                            }}>
                                            {/* <Image
                                                source={require('../../assets/images/adminMasjidIcon.png')}
                                                style={{ width: 18, height: 18 }}
                                                resizeMode="cover"
                                            /> */}
                                            <Text style={styles.buttonFavouriteText}>
                                                Change Salah Times
                                            </Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        lineHeight: 14.3,
                                        marginLeft: 5,
                                        color: '#F4F4F4',
                                        fontWeight: '400',
                                        marginVertical: 10,
                                        marginTop: 25,
                                    }}>
                                    Select the Facilities available at your mosque
                                </Text>
                                <LinearGradient
                                    colors={[
                                        'rgba(255, 255, 255, 0.25)',
                                        'rgba(42, 42, 42, 0.15)',
                                    ]}
                                    start={{ x: 0.05, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.input3}
                                >
                                    {Object.entries(MasjidFacilities).map(([key, facility]) => (
                                        <View style={{ flex: 1 }} key={`facility-${key}`}>
                                            <View style={styles.settingItemContainer}>
                                                <View
                                                    style={{
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        gap: 5,
                                                    }}
                                                >
                                                    
                                                    <Image source={facility?.url} style={{ width: 24, height: 24 }} resizeMode="cover"/>
                                                    <Text style={styles.TextInside}>
                                                        {facility?.label}
                                                    </Text>
                                                    <Switch
                                                        trackColor={{ false: '#727272', true: '#3DC8B2' }}
                                                        thumbColor={masjidInfo.includes(key) ? '#F3F3F3' : '#F3F3F3'}
                                                        ios_backgroundColor="#727272"
                                                        onValueChange={value => {
                                                            if (value) {
                                                                setMasjidfacilities([...masjidfacilities, key]);
                                                            } else {
                                                                setMasjidfacilities(masjidfacilities.filter(f => f !== key));
                                                            }
                                                        }}
                                                        value={masjidfacilities.includes(key)}
                                                        style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </LinearGradient>
                            </View>
                            <TouchableOpacity style={styles.button} onPress={submit}>
                                <View
                                    style={{
                                        borderRadius: 13,
                                        paddingHorizontal: 50,
                                        paddingVertical: 15,
                                        flexDirection: 'row',
                                        alignSelf: 'center',
                                        backgroundColor: '#3DC8B2'
                                    }}>
                                    <Text style={styles.buttonText}>Update</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={successModal}
                            onRequestClose={() => {
                                setSuccessModal(false);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 10,
                                        }}>
                                        <View style={{ width: 25 }} />
                                        <TouchableOpacity
                                            onPress={() => setSuccessModal(false)}>
                                            <Ionicons name="close-sharp" size={25} color="#282828" />
                                        </TouchableOpacity>
                                    </View>

                                    <Text
                                        style={{
                                            color: '#282828',
                                            fontSize: 16,
                                            fontWeight: '500',
                                            textAlign: 'center',
                                        }}>
                                        Masjid information will be updated
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.button1}
                                        onPress={() => {
                                            setSuccessModal(false);
                                            navigation.goBack();
                                        }}>
                                        <Text style={styles.buttonText}>Ok</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        // backgroundColor: 'white',
        // fontWeight: '700',
        // paddingTop: 40,
        marginBottom: Platform.OS === 'ios' ? 80 : 60
    },
    container: {
        marginHorizontal: 15,
    },

    card2: {
        marginTop: 15,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 0.5,
        borderColor: '#FFFFFF99',
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#000000',
        fontFamily: themeFont.englishFont,
        marginHorizontal: 60,
    },

    textInfo: {
        fontSize: 15,
        fontFamily: themeFont.englishFont,
        color: '#000000',
        lineHeight: 17.61,
        marginHorizontal: 15,
    },

    text: {
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 17.61,
        color: '#000000',
        fontFamily: themeFont.englishFont,
        marginTop: 6,
    },

    termsText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 17.61,
        color: theme.colors.primary,
        fontFamily: themeFont.englishFont,
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
        shadowColor: '#000',
    },
    input2: {
        width: '100%',
        height: '15%',
        borderRadius: 15,
        marginTop: 1,
        fontFamily: themeFont.englishFont,
        fontStyle: 'normal',
        backgroundColor: '#F3F3F3',
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        textAlignVertical: 'top',
    },
    input3: {
        width: '100%',
        height: 'auto',
        borderRadius: 15,
        marginTop: 1,
        fontFamily: themeFont.englishFont,
        fontStyle: 'normal',
        // backgroundColor: '#F3F3F3',
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        // textAlignVertical: 'top',
        borderWidth: 0.5,
        borderColor: '#FFFFFF99',
    },
    button: {
        marginTop: 20,
        marginBottom: 50,
        width: 200,
        height: 48,
        // backgroundColor: '#8352EC',
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    button1: {
        marginTop: 20,
        // width: 200,
        // height: 48,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#3DC8B2',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#F4F4F4',
        fontSize: 16.63,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 19.96,
        textTransform: 'capitalize',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        // margin: 20,
        width: width / 1.3,
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingVertical: 28,
        paddingHorizontal: 25,
    },
    inputPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginTop: 1,
        backgroundColor: '#F3F3F3',
        borderRadius: 15,
        padding: 12,
        marginBottom: 10,
        shadowColor: '#000',
    },
    settingItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 35,
    },
    TextInside: {
        flex: 1,
        color: '#F4F4F4',
        fontWeight: '500',
        fontSize: 14,
        alignSelf: 'center',
        marginLeft: 6,
        lineHeight: 16.38,
        fontFamily: themeFont.englishFont,
        textTransform: 'capitalize',
    },
    buttonFavourite2: {
    },
    buttonFavouriteText: {
        color: '#F4F4F4',
        fontSize: 13.96,
        fontWeight: '500',
        lineHeight: 16.38,
        // textAlign: 'center',
        fontFamily: themeFont.englishFont,
    },
    buttonFavourite3: {
        width: 180,
        height: 46,
        backgroundColor: '#8352EC',
        color: 'black',
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    claim: {
        color: 'red', // Example: Red color for 'claim' type
    },
    other: {
        color: 'green', // Example: Green color for 'other' type
    }
});

export default EditMasjidInfo;
