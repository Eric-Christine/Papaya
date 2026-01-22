import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const RoseBush = (props: any) => {
    return (
        <Svg width={100} height={100} viewBox="0 0 100 100" fill="none" {...props}>
            {/* Bush */}
            <Path d="M25 85 Q 50 15 75 85 Z" fill="#2E7D32" />
            <Circle cx="35" cy="55" r="15" fill="#2E7D32" />
            <Circle cx="65" cy="55" r="15" fill="#2E7D32" />
            <Circle cx="50" cy="40" r="18" fill="#2E7D32" />

            {/* Roses */}
            <Circle cx="40" cy="60" r="6" fill="#E91E63" />
            <Circle cx="60" cy="60" r="6" fill="#E91E63" />
            <Circle cx="50" cy="40" r="7" fill="#C2185B" />
            <Circle cx="25" cy="70" r="5" fill="#E91E63" />
            <Circle cx="75" cy="70" r="5" fill="#E91E63" />
        </Svg>
    );
};
export default RoseBush;
