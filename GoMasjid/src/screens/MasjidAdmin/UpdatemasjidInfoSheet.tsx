// UpdateMasjidInfoSheet.tsx

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SheetManager } from 'react-native-actions-sheet';
import ActionSheet from 'react-native-actions-sheet';
import { styles } from '../../styles/masjidadmin/UpdateMasjidInfoSheet';

const UpdateMasjidInfoSheet = () => {
  const insets = useSafeAreaInsets();

  const handleEmail = () => {
    const subject = 'Update Masjid Info Request';
    const body =
      'Please provide the details you want to update below:\n\n- New Phone Number:\n- New Address:\n- Updated Photos (you can attach):';
    const email = 'info@gomasjid.co.uk';
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch(err => console.error('Failed to open email client:', err));
  };

  return (
    <ActionSheet
      id="update_masjid_info_sheet"
      gestureEnabled
      defaultOverlayOpacity={0.3}
      containerStyle={{ paddingBottom: insets.bottom + 20, paddingHorizontal: 16, paddingTop: 20 }}
    >
      <Text style={styles.title}>Update Masjid Information</Text>
      <Text style={styles.subTitle}>
        To update your masjid's address, phone number, or photos, please contact our support team. Please include masjid name
      </Text>

      <TouchableOpacity onPress={handleEmail} style={styles.emailButton}>
        <Text style={styles.emailButtonText}>Email Us to Update Info</Text>
      </TouchableOpacity>
    </ActionSheet>
  );
};

export default UpdateMasjidInfoSheet;
