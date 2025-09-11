import React from 'react';
import { View, Text, Pressable } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Masjid } from '../../types/masjid'; // Ensure this points to your Masjid interface
import { useSheetPayload } from 'react-native-actions-sheet';

const MoreSheet = () => {
    const payload = useSheetPayload() as { masjid?: Masjid };
  const masjid = payload?.masjid;

  const handleClaimMasjid = () => {
    SheetManager.show('claim_masjid_sheet', {
      payload: {
        masjidId: masjid?.id, // or whatever key your masjid object uses
      },
    });
  };

  const handleViewGallery = () => {
    SheetManager.show('view_gallery_sheet', {
      payload: {
        masjidImages: masjid?.masjidImages || [],
      },
    });
  };

  return (
    <ActionSheet
      id="more_sheet"
      gestureEnabled
      defaultOverlayOpacity={0.3}
      containerStyle={{
        height: '30%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'flex-start',
      }}
    >
      <Pressable
        onPress={handleClaimMasjid}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <FontAwesome5 name="shield-alt" size={18} color="#000" style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>Manage Mosque</Text>
          <Text style={{ fontSize: 13, color: '#666' }}>
            Request access as a masjid admin
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={handleViewGallery}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingVertical: 16,
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <FontAwesome5 name="images" size={18} color="#000" style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>View Gallery</Text>
          <Text style={{ fontSize: 13, color: '#666' }}>
            Photos of the mosque interior/exterior
          </Text>
        </View>
      </Pressable>
    </ActionSheet>
  );
};

export default MoreSheet;
