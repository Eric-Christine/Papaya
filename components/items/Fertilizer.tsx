import React from 'react';
import Svg, { Path, Rect, Circle, G, Text as SvgText } from 'react-native-svg';

const Fertilizer = (props: any) => {
    return (
        <Svg width={60} height={60} viewBox="0 0 60 60" fill="none" {...props}>
            {/* Sack Body */}
            <Path
                d="M10 50 C 10 58 50 58 50 50 L 45 15 C 45 10 15 10 15 15 Z"
                fill="#8D6E63"
                stroke="#5D4037"
                strokeWidth="2"
            />
            {/* Tied Top */}
            <Path
                d="M15 15 C 15 5 45 5 45 15"
                fill="#A1887F"
                stroke="#5D4037"
                strokeWidth="2"
            />
            <Path
                d="M20 15 L 40 15"
                stroke="#5D4037"
                strokeWidth="2"
                strokeDasharray="4 2"
            />
            {/* Label/Icon on Bag */}
            <Circle cx="30" cy="35" r="10" fill="#FFF" opacity="0.8" />
            <Path
                d="M30 28 L 33 33 L 26 33 L 32 42"
                stroke="#FBC02D"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default Fertilizer;
