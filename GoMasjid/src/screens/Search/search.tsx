import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { SheetManager } from 'react-native-actions-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchSheet = () => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  return (
    <ActionSheet
      id="search_sheet"
      gestureEnabled
      defaultOverlayOpacity={0.4}
      keyboardHandlerEnabled
      onOpen={() => setTimeout(() => inputRef.current?.focus(), 50)}
      containerStyle={{
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '80%',
      }}
    >
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 14 }}>
        {/* Header (same pattern as Qibla) */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#223F7A' }}>Search</Text>
          <TouchableOpacity onPress={() => SheetManager.hide('search_sheet')} style={{ padding: 6 }}>
            <FontAwesome name="times" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* >>> THICK, FULL-WIDTH SEARCH BAR <<< */}
        <View style={{ width: '100%', marginBottom: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F2F4F7',
              borderRadius: 16,
              paddingHorizontal: 14,
              height: 40,        
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
              elevation: 2,
            }}
          >
            <FontAwesome name="search" size={18} color="#8E8E93" />
            <TextInput
              ref={inputRef}
              style={{
                flex: 1,
                fontSize: 17,
                color: '#0A0A0A',
                paddingVertical: 0,
                marginLeft: 10,
              }}
              placeholder="Search…"
              placeholderTextColor="#8E8E93"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              autoCorrect={false}
              autoCapitalize="none"
              clearButtonMode={Platform.OS === 'ios' ? 'while-editing' : 'never'}
            />
          </View>
        </View>

        {/* Results area (empty for now) */}
        <View style={{ flex: 1 }} />
      </View>
    </ActionSheet>
  );
};

export default SearchSheet;
