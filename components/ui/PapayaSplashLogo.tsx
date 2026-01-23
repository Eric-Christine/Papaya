import React from 'react';
import Svg, { Path, Circle, G, Defs, RadialGradient, Stop, Ellipse } from 'react-native-svg';

const PapayaSplashLogo = (props: any) => {
    return (
        <Svg width={200} height={200} viewBox="0 0 200 200" fill="none" {...props}>
            <Defs>
                <RadialGradient id="grad1" cx="50%" cy="50%" rx="50%" ry="50%" fx="50%" fy="50%">
                    <Stop offset="0%" stopColor="#FB8C00" stopOpacity="1" />
                    <Stop offset="100%" stopColor="#EF6C00" stopOpacity="1" />
                </RadialGradient>
            </Defs>

            {/* Papaya Shape */}
            <Path
                d="M100 20 C 60 20 30 60 30 100 C 30 150 60 180 100 180 C 140 180 170 150 170 100 C 170 60 140 20 100 20 Z"
                fill="url(#grad1)"
                stroke="#E65100"
                strokeWidth="4"
            />

            {/* Inner Flesh Highlight */}
            <Path
                d="M100 35 C 75 35 50 70 50 100 C 50 140 70 160 100 160 C 130 160 150 140 150 100 C 150 70 125 35 100 35 Z"
                fill="#FFECB3"
                opacity="0.3"
            />

            {/* Seeds Center */}
            <Ellipse cx="100" cy="100" rx="30" ry="45" fill="#3E2723" />

            {/* Individual Seeds Details (stylized dots) */}
            <Circle cx="90" cy="90" r="3" fill="#5D4037" />
            <Circle cx="110" cy="90" r="3" fill="#5D4037" />
            <Circle cx="90" cy="110" r="3" fill="#5D4037" />
            <Circle cx="110" cy="110" r="3" fill="#5D4037" />
            <Circle cx="100" cy="80" r="3" fill="#5D4037" />
            <Circle cx="100" cy="120" r="3" fill="#5D4037" />
            <Circle cx="80" cy="100" r="3" fill="#5D4037" />
            <Circle cx="120" cy="100" r="3" fill="#5D4037" />

            {/* Stem */}
            <Path
                d="M100 20 L 100 10"
                stroke="#33691E"
                strokeWidth="6"
                strokeLinecap="round"
            />

            {/* Leaf */}
            <Path
                d="M100 15 Q 120 5 130 15 Q 120 25 100 15"
                fill="#43A047"
                stroke="#2E7D32"
                strokeWidth="1"
            />
        </Svg>
    );
};

export default PapayaSplashLogo;
