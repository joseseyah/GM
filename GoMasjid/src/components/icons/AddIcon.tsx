import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface AddIconProps {
  color: string;
  size?: number;
}

const AddIcon: React.FC<AddIconProps> = ({ color, size = 25 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M12.5 5V20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M5 12.5H20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default AddIcon;