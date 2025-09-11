import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSheetPayload, SheetManager } from 'react-native-actions-sheet';
import ActionSheet from 'react-native-actions-sheet';
import { MasjidFacilities } from '../../common/MasjidFacilities';
import { updateMasjidData } from '../../services/api';
import { UserContext } from '../../context/UserProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styles } from '../../styles/masjidadmin/editFacilitiesSheetStyles';

const EditFacilitiesSheet = () => {
  const insets = useSafeAreaInsets();
  const { userInfo } = useContext(UserContext);
  const payload = useSheetPayload('edit_facilities_sheet') || {};

  const masjidId = payload.masjidId;
  const currentFacilities = payload.currentFacilities || [];

  const [facilities, setFacilities] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    console.log('[EditFacilitiesSheet] Received payload:', payload);
    console.log('[EditFacilitiesSheet] Masjid ID:', masjidId);
    console.log('[EditFacilitiesSheet] Initial currentFacilities:', currentFacilities);

    if (Array.isArray(currentFacilities)) {
      setFacilities(currentFacilities);
    } else {
      console.warn('[EditFacilitiesSheet] currentFacilities is NOT an array');
    }

    const keys = Object.keys(MasjidFacilities);
    console.log('[EditFacilitiesSheet] MasjidFacilities keys:', keys);

    if (!keys.length) {
      console.warn('[EditFacilitiesSheet] MasjidFacilities is empty');
    }
  }, []);

  const toggleFacility = (key: string) => {
    const updated = facilities.includes(key)
      ? facilities.filter(f => f !== key)
      : [...facilities, key];

    console.log(`[EditFacilitiesSheet] Toggled: ${key}`);
    console.log('[EditFacilitiesSheet] Facilities after toggle:', updated);

    setFacilities(updated);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const userToken = userInfo?.userToken;

      console.log('[EditFacilitiesSheet] Saving with:', facilities);
      await updateMasjidData(Number(masjidId), {
        facilities: JSON.stringify(facilities),
      }, userToken);

      console.log('[EditFacilitiesSheet] Save successful');
      SheetManager.hide('edit_facilities_sheet');
    } catch (error) {
      console.error('[EditFacilitiesSheet] Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ActionSheet
      id="edit_facilities_sheet"
      gestureEnabled
      defaultOverlayOpacity={0.3}
      containerStyle={{
        ...styles.sheetContainer,
        paddingBottom: insets.bottom + 20,
      }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Edit Facilities</Text>

        <TouchableOpacity
            style={{ position: 'absolute', right: 0, padding: 4 }}
            onPress={() => SheetManager.hide('edit_facilities_sheet')}
        >
            <FontAwesome5 name="times" size={18} color="#000" />
        </TouchableOpacity>
    </View>


      {/* Facility List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(MasjidFacilities).length === 0 && (
          <Text style={{ padding: 16, color: 'red' }}>
            No facilities found. Please check the MasjidFacilities definition.
          </Text>
        )}

        {Object.entries(MasjidFacilities).map(([key, { label, component }]) => {
          const isActive = facilities.includes(key);
          return (
            <View key={key} style={styles.row}>
              <View style={styles.left}>
                <View style={styles.icon}>
                  {component?.type ? (
                    React.createElement(component.type, {
                      ...component.props,
                      size: 20,
                      color: '#333',
                    })
                  ) : (
                    <Text>❓</Text>
                  )}
                </View>
                <Text style={styles.label}>{label}</Text>
              </View>

              <Switch
                value={isActive}
                onValueChange={() => toggleFacility(key)}
                trackColor={{ false: '#ccc', true: '#002E6E' }} // ← dark blue
                thumbColor="#fff"
                ios_backgroundColor="#ccc"
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                />

            </View>
          );
        })}
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        style={[styles.saveButton, saving && { backgroundColor: '#A5E1D7' }]}
        disabled={saving}
      >
        <Text style={styles.saveText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
      </TouchableOpacity>
    </ActionSheet>
  );
};

export default EditFacilitiesSheet;
