import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';

const Broccoli = (props: any) => {
    return (
        <Svg width={100} height={100} viewBox="0 0 100 100" fill="none" {...props}>
            <G transform="translate(50, 60)">
                {/* Stalk */}
                <Path d="M-10 0 Q 0 40 10 0 L 15 -20 L -15 -20 Z" fill="#AED581" />
                {/* Head */}
                <Circle cx="0" cy="-25" r="20" fill="#43A047" />
                <Circle cx="-15" cy="-15" r="15" fill="#43A047" />
                <Circle cx="15" cy="-15" r="15" fill="#43A047" />
                <Circle cx="-10" cy="-35" r="15" fill="#43A047" />
                <Circle cx="10" cy="-35" r="15" fill="#43A047" />
            </G>
        </Svg>
    );
};
export default Broccoli;
