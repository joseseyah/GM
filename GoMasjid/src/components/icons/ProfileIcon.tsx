import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ProfileIconProps {
  color: string;
  size?: number;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ color, size = 25 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path 
        d="M9.82617 9.55551C9.82617 11.253 11.1722 12.6345 12.8262 12.6345C14.4802 12.6345 15.8262 11.253 15.8262 9.55551C15.8262 7.85798 14.4802 6.47656 12.8262 6.47656C11.1722 6.47656 9.82617 7.85798 9.82617 9.55551ZM18.1595 19.4766H18.8262V18.7924C18.8262 16.152 16.7322 14.0029 14.1595 14.0029H11.4928C8.91951 14.0029 6.82617 16.152 6.82617 18.7924V19.4766H18.1595Z" 
        fill={color}
      />
    </Svg>
  );
};

export default ProfileIcon;