import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const BlueberryBush = (props: any) => {
    return (
        <Svg width={100} height={100} viewBox="0 0 100 100" fill="none" {...props}>
            {/* Leaves/Bush Body */}
            <Path d="M20 80 Q 50 10 80 80 Z" fill="#4CAF50" />
            <Circle cx="35" cy="50" r="15" fill="#4CAF50" />
            <Circle cx="65" cy="50" r="15" fill="#4CAF50" />
            <Circle cx="50" cy="35" r="20" fill="#4CAF50" />

            {/* Blueberries */}
            <Circle cx="40" cy="60" r="5" fill="#1E88E5" />
            <Circle cx="60" cy="60" r="5" fill="#1E88E5" />
            <Circle cx="50" cy="45" r="5" fill="#1E88E5" />
            <Circle cx="30" cy="50" r="4" fill="#1E88E5" />
            <Circle cx="70" cy="50" r="4" fill="#1E88E5" />
        </Svg>
    );
};
export default BlueberryBush;
