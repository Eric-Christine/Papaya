import React from 'react';
import Svg, { Circle, Path, G } from 'react-native-svg';

const GardenGnome = (props: any) => {
    return (
        <Svg width={100} height={100} viewBox="0 0 100 100" fill="none" {...props}>
            <G transform="translate(50, 80)">
                {/* Body */}
                <Path d="M-15 0 L -15 -25 L 15 -25 L 15 0 Z" fill="#1976D2" />
                {/* Beard */}
                <Path d="M-15 -35 Q 0 -15 15 -35 Z" fill="#E0E0E0" />
                {/* Face */}
                <Circle cx="0" cy="-40" r="12" fill="#FFCCBC" />
                {/* Hat */}
                <Path d="M-13 -45 L 0 -80 L 13 -45 Z" fill="#F44336" />
            </G>
        </Svg>
    );
};
export default GardenGnome;
