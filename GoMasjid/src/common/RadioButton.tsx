import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';

type Props = {
  style?: any;
  text: string;
  selected: boolean;
  handlePress: (a) => void;
};
const RadioButton = ({style, text, selected, handlePress}: Props) => {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', alignItems: 'center', gap: 10}}
      onPress={() => handlePress(text)}>
      <View
        style={[
          {
            height: 18,
            width: 18,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: selected ? '#376BB7' : '#282828',
            alignItems: 'center',
            justifyContent: 'center',
          },
          style,
        ]}>
        {selected ? (
          <View
            style={{
              height: 10,
              width: 10,
              borderRadius: 6,
              backgroundColor: '#376BB7',
            }}
          />
        ) : null}
      </View>
      <Text style={{color: '#000'}}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
