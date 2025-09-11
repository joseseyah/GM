import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  isOpen,
  onToggle,
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onToggle} style={styles.CardNameOne}>
        {title}
        <Entypo
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#8352EC"
        />
      </TouchableOpacity>
      {isOpen && <View>{children}</View>}

      <TouchableOpacity></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  CardNameOne: {
    width: '100%',
    backgroundColor: '#F3F3F3',
    shadowColor: '#000',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  TextInside: {
    color: '#666161',
    fontSize: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default Accordion;