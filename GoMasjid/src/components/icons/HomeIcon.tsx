import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface HomeIconProps {
  color: string;
  size?: number;
}

const HomeIcon: React.FC<HomeIconProps> = ({ color, size = 25 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path 
        d="M10.3754 20.9383L10.3754 15.039H14.5284L14.5284 20.9383C14.5284 21.5094 14.9956 21.9766 15.5666 21.9766H18.6813C19.2524 21.9766 19.7196 21.5094 19.7196 20.9383L19.7196 12.9625H21.4846C21.9622 12.9625 22.1906 12.3707 21.8272 12.0592L13.1475 4.24131C12.753 3.88831 12.1508 3.88831 11.7563 4.24131L3.07661 12.0592C2.72361 12.3707 2.94164 12.9625 3.41923 12.9625H5.18424L5.18424 20.9383C5.18424 21.5094 5.65144 21.9766 6.22247 21.9766H9.33719C9.90822 21.9766 10.3754 21.5094 10.3754 20.9383Z" 
        fill={color}
      />
    </Svg>
  );
};

export default HomeIcon;