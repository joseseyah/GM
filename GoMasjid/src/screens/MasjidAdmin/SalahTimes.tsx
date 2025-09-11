import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  ImageBackground,
  Platform,
} from 'react-native';
import moment from 'moment';
import { themeFont } from '../../styles/theme';
import Header from '../../common/Header';
import { Calendar } from 'react-native-calendars';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { UserContext } from '../../context/UserProvider';
import { updatePrayerTiming } from '../../services/api';
import SuccessModal from '../../common/SuccessModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formattedHijri} from '../../common/HijriDate';

import { styles } from '../../styles/masjidadmin/SalahTimes';

const SalahTimes = ({props, route, navigation}: any) => {
  const [time, setTime] = useState(new Date());
  const [masjidId, setMasjidId] = useState(route?.params?.masjid_id);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const month = today.getMonth() + 1; 
    const day = today.getDate();
    return `${month}-${day}`; 
  });
  const [loading, setLoading] = useState<any>();
  const [isFriday, setIsFriday] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { userInfo } = useContext(UserContext);
  const [selectedDateString, setSelectedDateString] = useState(new Date().toISOString().split('T')[0]);
  const [timings, setTimings] = useState(
    {
      "Fajr": {
        "Adhan": "04:45",
        "Jamaah": "05:00"
      },
      "Zuhr": {
        "Adhan": "12:30",
        "Jamaah": "13:15"
      },
      "Asr": {
        "Adhan": "16:25",
        "Jamaah": "16:15"
      },
      "Maghrib": {
        "Adhan": "18:30",
        "Jamaah": "18:45"
      },
      "Isha": {
        "Adhan": "20:00",
        "Jamaah": "20:15"
      }
    }
  );
  const [otherTimings, setOtherTimings] = useState(timings);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState<keyof typeof timings>('Fajr');
  const [selectedPrayerType, setSelectedPrayerType] = useState<'Adhan' | 'Jamaah' | null>(null);
  const [jummahs, setJummahs] = useState([
    { Adhan: '', Jamaah: '' }
  ]);
  const [jummahCount, setJummahCount] = useState(0);

  useEffect(() => {
    setMasjidId(route?.params?.masjid_id);
  }, []);
  
  const showPickerModal = (prayer: any, type: any) => {
    setSelectedPrayer(prayer);
    setSelectedPrayerType(type);

    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: time,
        mode: 'time',
        display: 'clock',
        onChange: handleDateChange,
      });
    } else {
      setShowPicker(true);
    }
  }

  const handleDateChange = (event: any, selectedValue?: Date) => {
    if (selectedValue) {
      // console.log(selectedValue);
      setTime(selectedValue);
      const hours = selectedValue.getHours().toString().padStart(2, '0');
      const minutes = selectedValue.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;

      const updatedTimings = {
        ...timings,
        [selectedPrayer]: {
          ...(timings[selectedPrayer] || {}),
          ...(selectedPrayerType ? { [selectedPrayerType]: formattedTime } : {}),
        }
      };
  
      setTimings(updatedTimings);
    }
    // setShowPicker(false); // Close modal after selection
  };

  const updateMasjidSalah = async () => {
    const payload = {
      [selectedDate]: {
        ...timings
      }
    };
    const userToken = userInfo?.userToken;
    const masjidUpdate = await updatePrayerTiming(Number(masjidId), payload, userToken);

    if(masjidUpdate) {
      setLoading(false);
      setSuccessModal(true);
    }
  };

  // moment().format('iD iMMM iYYYY [AH]');

  const addJummah = () => {
    setTimings(prev => {
      const newTimings = { ...prev };
      
      let newCount = jummahCount + 1;
      let entries = Object.entries(newTimings);
      let updatedEntries = [...entries];

      if(jummahCount === 0) {
        updatedEntries = updatedEntries.map(([key, value]) => {
          if (key === 'Jummah') return ['Jummah1', value];
          return [key, value];
        });
        newCount = newCount+1;
      }
      setJummahCount(newCount);

      const newJummahKey = `Jummah${newCount}`;
  
      // Create new Jummah timing
      const newJummah = {
        Adhan: "12:30",
        Jamaah: "13:15"
      };
      // Find index of Asr
      const asrIndex = updatedEntries.findIndex(([key]) => key === "Asr");
      // Insert before Asr
      updatedEntries.splice(asrIndex, 0, [newJummahKey, newJummah]);
  
      // Rebuild the object with updated order
      const ordered = Object.fromEntries(updatedEntries);
      
      return ordered;
    });
  };
  
  const renameZuhrToJummah = () => {
    setTimings(prev => {
      const newTimings = { ...prev };
      let entries = Object.entries(newTimings);
      let updatedEntries = [...entries];

      updatedEntries = updatedEntries.map(([key, value]) => {
        if (key === 'Zuhr') return ['Jummah', value];
        return [key, value];
      });
      
      return Object.fromEntries(updatedEntries);
    });
  };
  

  const removeJummah = (index: number) => {
    const updatedJummahs = [...jummahs];
    updatedJummahs.splice(index, 1);
    setJummahs(updatedJummahs);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateSalahTime', { masjidId })}
          style={styles.headerContainer}
        >
          <MaterialCommunityIcons name="dots-vertical" color="#333" size={25} />
        </TouchableOpacity>
  
        <View style={styles.calendarCard}>
          <Calendar
            hideArrows={false}
            hideExtraDays={false}
            firstDay={0}
            current={new Date().toISOString().split('T')[0]}
            onDayPress={day => {
              setSelectedDateString(day.dateString);
              const month = day.month + '-' + day.day;
              setSelectedDate(month);

              const selected = new Date(day.dateString);
              const dayOfWeek = selected.getDay();

              if (dayOfWeek === 5) {
                setIsFriday(true);
                renameZuhrToJummah();
              } else {
                setIsFriday(false);
                setTimings(otherTimings);
                setJummahCount(0);
              }
            }}
            markedDates={{
              [selectedDateString]: {
                selected: true,
                marked: true,
                selectedColor: '#002D72', // deep blue
              },
            }}
            theme={{
              backgroundColor: '#F8F8F8',
              calendarBackground: '#F8F8F8',
              textSectionTitleColor: '#002D72',
              selectedDayBackgroundColor: '#002D72',
              selectedDayTextColor: '#fff',
              todayTextColor: '#002D72',
              dayTextColor: '#333',
              textDisabledColor: '#CCC',
              monthTextColor: '#002D72',
              arrowColor: '#002D72',
            }}
          />
        </View>

  
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {moment().format('ddd, DD MMM YYYY')} {formattedHijri}
          </Text>
        </View>
  
        {/* PRAYER TIME TABLE */}
        <View style={styles.card}>
        <View style={[styles.row, styles.cardHeaderRow]}>
          <Text style={[styles.cardHeader, { flex: 1.5 }]}>PRAYERS</Text>
          <Text style={[styles.cardHeader, { flex: 1 }]}>BEGINS</Text>
          <Text style={[styles.cardHeader, { flex: 1 }]}>JAMAAT</Text>
        </View>

        {Object.entries(timings).map(([name, timeChange]: [string, any]) => (
          <View style={styles.row1} key={name}>
            <Text style={[styles.cardText, { flex: 1.5 }]}>{name}</Text>

            <TouchableOpacity onPress={() => showPickerModal(name, 'Adhan')} style={{ flex: 1 }}>
              <Text style={styles.cardText}>
                {moment(timeChange.Adhan, 'HH:mm').format('hh:mm A')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => showPickerModal(name, 'Jamaah')} style={{ flex: 1 }}>
              <Text style={styles.cardText}>
                {moment(timeChange.Jamaah, 'HH:mm').format('hh:mm A')}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>



  
        <TouchableOpacity onPress={updateMasjidSalah}>
          <View style={styles.buttonContainer}>
            <Text style={styles.updatebuttonText}>Update</Text>
          </View>
        </TouchableOpacity>
  
        {/* iOS Picker Modal */}
        {showPicker && Platform.OS === 'ios' && (
          <Modal transparent={true} animationType="slide" visible={showPicker}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Select Time</Text>
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="spinner"
                  onChange={handleDateChange}
                />
                <TouchableOpacity
                  onPress={() => setShowPicker(false)}
                  style={styles.doneButton}
                >
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
  
        {/* Success Modal */}
        {successModal && (
          <SuccessModal
            modalVisible={successModal}
            modalClose={() => {
              setSuccessModal(false);
              navigation.goBack();
            }}
            modalText="Salah Timing Updated Successfully"
            buttonText="OK"
          />
        )}
      </ScrollView>
    </View>
  );
  
  
};

export default SalahTimes;
