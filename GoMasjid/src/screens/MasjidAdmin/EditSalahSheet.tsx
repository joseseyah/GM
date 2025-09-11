import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSheetPayload, SheetManager } from 'react-native-actions-sheet';
import ActionSheet from 'react-native-actions-sheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { UserContext } from '../../context/UserProvider';
import { updatePrayerTiming } from '../../services/api';
import SalahTimes from '../MasjidAdmin/SalahTimes';
import { styles } from '../../styles/masjidadmin/salah';

const SalahSheet = () => {
  const insets = useSafeAreaInsets();
  const { userInfo } = useContext(UserContext);
  const payload = useSheetPayload('salah_times_sheet') || {};
  const masjidId = payload.masjidId;

  const [time, setTime] = useState(new Date());
  const [selectedPrayer, setSelectedPrayer] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'Adhan' | 'Jamaah'>('Adhan');
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [showPicker, setShowPicker] = useState(false);

  const initialTimings = payload.currentTimings || {
    Fajr: { Adhan: '04:45', Jamaah: '05:00' },
    Zuhr: { Adhan: '12:30', Jamaah: '13:15' },
    Asr: { Adhan: '16:25', Jamaah: '16:45' },
    Maghrib: { Adhan: '18:30', Jamaah: '18:45' },
    Isha: { Adhan: '20:00', Jamaah: '20:15' },
  };

  const [timings, setTimings] = useState<typeof initialTimings>(initialTimings);

  const showTimePicker = (prayer: string, type: 'Adhan' | 'Jamaah') => {
    setSelectedPrayer(prayer);
    setSelectedType(type);
    const fallbackTime = moment().startOf('day').toDate();
    const parsed = moment(timings[prayer]?.[type], 'HH:mm', true);
    const selected = parsed.isValid() ? parsed.toDate() : fallbackTime;

    setTime(selected);

    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: selected,
        mode: 'time',
        display: 'clock',
        onChange: (_e, d) => d && onTimeSelected(d),
      });
    } else {
      setShowPicker(true);
    }
  };

  const onTimeSelected = (d: Date) => {
    const formatted = moment(d).format('HH:mm');
    setTimings(prev => ({
      ...prev,
      [selectedPrayer]: {
        ...prev[selectedPrayer],
        [selectedType]: formatted,
      },
    }));
    setShowPicker(false);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const userToken = userInfo?.userToken;
      const formattedDateKey = moment(selectedDate).format('M-D');

      const payload = {
        [formattedDateKey]: timings,
      };

      await updatePrayerTiming(masjidId, payload, userToken);
      SheetManager.hide('salah_times_sheet');
    } catch (error) {
      console.error('[SalahSheet] Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ActionSheet
      id="salah_times_sheet"
      gestureEnabled
      defaultOverlayOpacity={0.3}
      containerStyle={{
        ...styles.sheetContainer,
        paddingBottom: insets.bottom + 20,
      }}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Edit Todays Timings</Text>
          <TouchableOpacity
            style={{ position: 'absolute', right: 0, padding: 1 }}
            onPress={() => SheetManager.hide('salah_times_sheet')}
          >
            <FontAwesome5 name="times" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {/* SalahTimes Embedded View */}
        <SalahTimes
          props={null}
          route={{
            params: {
              masjid_id: masjidId,
            },
          }}
          navigation={{
            goBack: () => SheetManager.hide('salah_times_sheet'),
            navigate: () => {},
          }}
        />
      </ScrollView>

      {/* iOS Time Picker */}
      {Platform.OS === 'ios' && showPicker && (
        <Modal transparent={true} animationType="slide" visible={showPicker}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select Time</Text>
              <DateTimePicker
                value={time}
                mode="time"
                display="spinner"
                onChange={(_e, d) => d && onTimeSelected(d)}
              />
              <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.doneButton}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ActionSheet>
  );
};

export default SalahSheet;
