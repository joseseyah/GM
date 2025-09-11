import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../../styles/theme';

const {height, width} = Dimensions.get('window');

const SelectTranslation = ({
  translatorsData,
  selected,
  changeTranslation,
}: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectTranslation = (item: any) => {
    changeTranslation(item.id);
    setIsDropdownOpen(false);
    
  };

  return (
    <View style={{width: width - 100}}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Text style={styles.dropdownText}>
          {selected ? selected : 'Select Translator'}
        </Text>
        <Feather
          name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={theme.colors.primary}
        />
      </TouchableOpacity>

      {isDropdownOpen && (
        <FlatList
          data={translatorsData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelectTranslation(item)}
              style={styles.option}>
              <Text style={styles.optionText}>{item.translator_name} as</Text>
              <Text style={styles.languageText}>
                Language: {item.language_name}
              </Text>
              {selected === item.id && (
                <Feather name="check" size={20} color={theme.colors.primary} />
              )}
            </TouchableOpacity>
          )}
          style={styles.dropdownList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownList: {
    maxHeight: 200,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default SelectTranslation;
