import React, {
  useState,
  useEffect,
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getMasjidDetail} from '../../services/api';
import { SheetManager } from 'react-native-actions-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from '../../styles/masjidadmin/adminportal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { height, width } = Dimensions.get('window');

const ActionCard = ({
  title,
  iconName,
  onPress,
}: {
  title: string;
  iconName: string;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={{ width: '100%', marginTop: 10 }}>
    <View style={styles.card2}>
      <View style={styles.cardContent}>
        <FontAwesome5
          name={iconName}
          size={20}
          color="#333"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.cardText}>{title}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const AdminPortal = ({ navigation, route }: any) => {

  const insets = useSafeAreaInsets();

  interface MasjidInfo {
    masjid_id: any;
    masjidCoverImage?: string;
    masjidImageUrl?: string;
    name?: string;
    address?: string;
    contact_numbers?: string[];
    website?: string;
  }
  
  const [masjidData, setMasjidData] = useState<MasjidInfo>({
    masjid_id: null,
    masjidCoverImage: '',
    masjidImageUrl: '',
    name: '',
    address: '',
    contact_numbers: [],
    website: '',
  });
  const [loading, setLoading] = useState(true);
  const [masjidInfo, setMasjidInfo] = useState();
  const [masjidId, setMasjidId] = useState<number>();

  useEffect(() => {
    console.log("masjid did: ", route)
    setMasjidId(route?.params?.masjidId);
  }, [route?.params?.masjidId]);

  useFocusEffect(
    React.useCallback(() => {
        const fetchMasjidDetails = async () => {
          const masjidAdmin = await getMasjidDetail(route?.params?.masjidId);
          const formattedData = {
            ...masjidAdmin,
            contact_numbers: masjidAdmin.contact_numbers
              ? masjidAdmin.contact_numbers.map((num: string) => num.replace(/[\[\]"]/g, '')) // Remove [ " and ]
              : [],
          };
          console.log("mas", masjidAdmin);
    
          setMasjidData(formattedData);
          setMasjidInfo(masjidAdmin?.masjidfacilities || []);
          setMasjidId(masjidAdmin.masjid_id)
          setLoading(false);
        };
        fetchMasjidDetails();
      // }
    }, [masjidId])
  );
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#282828"
          style={styles.loadingIndicator}
        />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Header */}
          <View style={[styles.headerContainer, { marginTop: insets.top + 20 }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
  
            <Text style={styles.headerTitle}>Admin Portal</Text>
  
            {masjidData?.masjidImageUrl ? (
              <Image
                source={{ uri: masjidData.masjidImageUrl }}
                resizeMode="cover"
                style={styles.avatarFallback}
              />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarFallbackText}>
                  {masjidData?.name?.charAt(0) ?? '?'}
                </Text>
              </View>
            )}
          </View>
  
          {/* Masjid Info */}
          <View style={{ alignItems: 'center', width: '90%', alignSelf: 'center' }}>
            {!!masjidData?.name && <Text style={styles.nameText}>{masjidData.name}</Text>}
  
            {!!masjidData?.address && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="map-outline" size={15} color="#333" />
                <Text style={styles.infoText}>{masjidData.address}</Text>
              </View>
            )}
  
            {!!masjidData?.contact_numbers?.[0] && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="phone-outline" size={15} color="#333" />
                <Text style={styles.infoText}>{masjidData.contact_numbers[0]}</Text>
              </View>
            )}
  
            {!!masjidData?.website && (
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="web" size={15} color="#333" />
                <Text style={styles.infoText}>{masjidData.website}</Text>
              </View>
            )}
          </View>
  
          {/* Section: Masjid Details */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Masjid Details</Text>
  
            <View style={{ gap: 12 }}>
              <ActionCard
                title="Edit Masjid Info"
                iconName="edit"
                onPress={() => SheetManager.show('update_masjid_info_sheet')}
              />
  
              <ActionCard
                title="Edit Facilities"
                iconName="tools"
                onPress={() =>
                  SheetManager.show('edit_facilities_sheet', {
                    payload: {
                      masjidId,
                      currentFacilities: masjidInfo ?? [],
                    },
                  })
                }
              />
            </View>
          </View>
  
          {/* Section: Prayer Times */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Prayer Times</Text>
  
            <View style={{ gap: 12 }}>
              <ActionCard
                title="Edit Salah Times"
                iconName="clock"
                onPress={() =>
                  SheetManager.show('salah_times_sheet', {
                    payload: {
                      masjidId,
                      currentTimings: masjidInfo ?? {},
                    },
                  })
                }
              />
  
              <ActionCard
                title="Upload Salah Times"
                iconName="upload"
                onPress={() =>
                  SheetManager.show('upload_salah_times_sheet', {
                    payload: { masjidId },
                  })
                }
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
  
  
  
  
  
};

export default AdminPortal;  