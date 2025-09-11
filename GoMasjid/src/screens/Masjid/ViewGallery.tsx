import React from 'react';
import { View, Text, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { useSheetPayload } from 'react-native-actions-sheet';

const { width } = Dimensions.get('window');

const ViewGallery = () => {
  const payload = useSheetPayload() as { masjidImages?: string[] };
  const masjidImages = payload?.masjidImages || [];

  const [outsideImage, insideImage] = masjidImages;

  return (
    <ActionSheet
      id="view_gallery_sheet"
      gestureEnabled
      defaultOverlayOpacity={0.4}
      containerStyle={styles.sheetContainer}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>View Gallery</Text>

        {outsideImage && (
          <>
            <Text style={styles.sectionLabel}>Outside</Text>
            <Image source={{ uri: outsideImage }} style={styles.image} resizeMode="cover" />
          </>
        )}

        {insideImage && (
          <>
            <Text style={styles.sectionLabel}>Inside</Text>
            <Image source={{ uri: insideImage }} style={styles.image} resizeMode="cover" />
          </>
        )}
      </ScrollView>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  content: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
});

export default ViewGallery;
