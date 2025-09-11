import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ViewToken,
} from 'react-native';
import styles from '../../styles/home/homescreen';
import Icon from 'react-native-vector-icons/Feather';

interface LocationSwitcherProps {
  locations: string[];
  selected: string;
  onSelect: (location: string) => void;
  onDelete: (location: string) => void;
}

const LocationSwitcher: React.FC<LocationSwitcherProps> = ({
  locations,
  selected,
  onSelect,
  onDelete,
}) => {
  const [showDelete, setShowDelete] = useState<string | null>(null);
  const listRef = useRef<FlatList<string>>(null);

  // Auto-scroll to selected item
  useEffect(() => {
    const index = locations.indexOf(selected);
    if (index !== -1 && listRef.current) {
      listRef.current.scrollToIndex({ index, animated: true });
    }
  }, [selected, locations]);

  const renderItem = ({ item }: { item: string }) => {
    const isActive = selected === item;
    const isDeletable = item !== 'Location';

    return (
      <TouchableOpacity
        onPress={() => onSelect(item)}
        onLongPress={() => {
          if (isDeletable) setShowDelete(item);
        }}
        style={[
          isActive ? styles.activeLocationButton : styles.inactiveLocationButton,
          { marginRight: 8 }, // 👈 Spacing between tabs
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={isActive ? styles.activeLocationText : styles.inactiveLocationText}>
            {item}
          </Text>
          {showDelete === item && (
            <TouchableOpacity onPress={() => onDelete(item)} style={{ marginLeft: 6 }}>
              <Icon name="x-circle" size={18} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ref={listRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={locations}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingHorizontal: 12, // 👈 Spacing from screen edge
        alignItems: 'center',
      }}
    />
  );
};

export default LocationSwitcher;
