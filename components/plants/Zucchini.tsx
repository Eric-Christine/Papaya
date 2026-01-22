import React from 'react';
import Svg, { Path, Ellipse, G } from 'react-native-svg';

const Zucchini = (props: any) => {
    return (
        <Svg
            width={100}
            height={100}
            viewBox="0 0 100 100"
            fill="none"
            {...props}
        >
            <G transform="rotate(-45, 50, 50)">
                {/* Main Zucchini Body */}
                <Ellipse
                    cx="50"
                    cy="50"
                    rx="15"
                    ry="40"
                    fill="#43A047"
                    stroke="#2E7D32"
                    strokeWidth="2"
                />
                {/* Texture/Stripes */}
                <Path
                    d="M45 20 Q 55 50 45 80"
                    stroke="#81C784"
                    strokeWidth="2"
                    opacity="0.5"
                />
                <Path
                    d="M55 20 Q 45 50 55 80"
                    stroke="#81C784"
                    strokeWidth="2"
                    opacity="0.5"
                />
                {/* Stem */}
                <Path
                    d="M50 10 L 50 15"
                    stroke="#8D6E63"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
            </G>
        </Svg>
    );
};

export default Zucchini;
