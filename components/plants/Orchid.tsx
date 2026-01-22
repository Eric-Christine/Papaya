import React from 'react';
import Svg, { Path, Ellipse, G } from 'react-native-svg';

const Orchid = (props: any) => {
    return (
        <Svg width={100} height={100} viewBox="0 0 100 100" fill="none" {...props}>
            {/* Pot */}
            <Path d="M35 80 L 40 95 L 60 95 L 65 80 Z" fill="#795548" />
            {/* Stem */}
            <Path d="M50 80 Q 50 50 50 20" stroke="#33691E" strokeWidth="3" fill="none" />
            {/* Flower 1 */}
            <G transform="translate(50, 30)">
                <Ellipse cx="0" cy="0" rx="10" ry="15" fill="#9C27B0" />
                <Ellipse cx="0" cy="0" rx="15" ry="5" fill="#BA68C8" />
            </G>
            {/* Flower 2 */}
            <G transform="translate(50, 50) scale(0.8)">
                <Ellipse cx="0" cy="0" rx="10" ry="15" fill="#9C27B0" />
                <Ellipse cx="0" cy="0" rx="15" ry="5" fill="#BA68C8" />
            </G>
        </Svg>
    );
};
export default Orchid;
