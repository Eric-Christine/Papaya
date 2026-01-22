import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Heart = (props: any) => {
    return (
        <Svg
            width={100}
            height={100}
            viewBox="0 0 100 100"
            fill="none"
            {...props}
        >
            <Path
                d="M50 88.9L44.2 83.6C23.6 64.9 10 52.6 10 37.5C10 25.2 19.7 15.5 32 15.5C38.9 15.5 45.6 18.7 50 23.8C54.4 18.7 61.1 15.5 68 15.5C80.3 15.5 90 25.2 90 37.5C90 52.6 76.4 64.9 55.8 83.6L50 88.9Z"
                fill="#E53935"
                stroke="#C62828"
                strokeWidth="2"
            />
        </Svg>
    );
};

export default Heart;
