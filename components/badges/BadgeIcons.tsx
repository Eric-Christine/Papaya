import React from 'react';
import Svg, { Circle, Path, G, Rect, Text as SvgText } from 'react-native-svg';

export const SunflowerBadge = (props: any) => (
    <Svg width={60} height={60} viewBox="0 0 60 60" fill="none" {...props}>
        <Circle cx="30" cy="30" r="28" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="2" />
        <Circle cx="30" cy="30" r="10" fill="#6D4C41" />
        {/* Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
            <G key={index} transform={`rotate(${angle}, 30, 30)`}>
                <Path d="M30 10 Q 35 5 40 10 T 30 20" fill="#FDD835" />
            </G>
        ))}
    </Svg>
);

export const GreenThumbBadge = (props: any) => (
    <Svg width={60} height={60} viewBox="0 0 60 60" fill="none" {...props}>
        <Circle cx="30" cy="30" r="28" fill="#E8F5E9" stroke="#43A047" strokeWidth="2" />
        <Path
            d="M20 30 Q 20 15 35 15 Q 45 15 45 30 Q 45 45 35 45 Q 25 45 25 55"
            fill="#66BB6A"
            stroke="#2E7D32"
            strokeWidth="2"
        />
    </Svg>
);

export const MasterGardenerBadge = (props: any) => (
    <Svg width={60} height={60} viewBox="0 0 60 60" fill="none" {...props}>
        <Circle cx="30" cy="30" r="28" fill="#E1F5FE" stroke="#0288D1" strokeWidth="2" />
        <Path d="M15 45 L 30 15 L 45 45 Z" fill="#FFD700" stroke="#F57F17" strokeWidth="2" />
        <Circle cx="30" cy="30" r="5" fill="#FFF" />
    </Svg>
);

export const Level2Badge = (props: any) => (
    <Svg width={60} height={60} viewBox="0 0 60 60" fill="none" {...props}>
        <Rect x="5" y="5" width="50" height="50" rx="10" fill="#E0F7FA" stroke="#00BCD4" strokeWidth="3" />
        <G transform="translate(15, 15)">
            {/* Number 2 shape approximately */}
            <Path d="M5 5 H 25 V 15 H 5 V 25 H 25" stroke="#0097A7" strokeWidth="4" fill="none" strokeLinecap="round" />
        </G>
        <SvgText
            x="30"
            y="40"
            fontSize="20"
            fontWeight="bold"
            fill="#006064"
            textAnchor="middle"
        >
            Lvl 2
        </SvgText>
    </Svg>
);

export const Level5Badge = (props: any) => (
    <Svg width={60} height={60} viewBox="0 0 60 60" fill="none" {...props}>
        <Rect x="5" y="5" width="50" height="50" rx="10" fill="#F3E5F5" stroke="#9C27B0" strokeWidth="3" />
        <SvgText
            x="30"
            y="38"
            fontSize="24"
            fontWeight="bold"
            fill="#4A148C"
            textAnchor="middle"
        >
            Lvl 5
        </SvgText>
        <Path d="M10 45 L 30 55 L 50 45" fill="none" stroke="#7B1FA2" strokeWidth="2" />
    </Svg>
);
