import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Circle, Ellipse, Path, G, Rect } from 'react-native-svg';

const PapayaAppIcon = ({ size = 1024 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none">
      <Defs>
        {/* Background gradient - fresh green/yellow */}
        <LinearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FFB347" />
          <Stop offset="100%" stopColor="#FF8C42" />
        </LinearGradient>

        {/* Papaya gradient */}
        <LinearGradient id="papayaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FFD166" />
          <Stop offset="50%" stopColor="#FF9E44" />
          <Stop offset="100%" stopColor="#FF6B35" />
        </LinearGradient>

        {/* Leaf gradient */}
        <LinearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#7FD957" />
          <Stop offset="100%" stopColor="#5CB85C" />
        </LinearGradient>

        {/* Inner flesh gradient */}
        <LinearGradient id="fleshGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FFE5B4" />
          <Stop offset="100%" stopColor="#FFDAB9" />
        </LinearGradient>
      </Defs>

      {/* Background */}
      <Rect width="1024" height="1024" fill="url(#bgGradient)" rx="180" />

      {/* Main papaya fruit (sliced in half showing seeds) */}
      <G transform="translate(512, 550)">
        {/* Outer skin - left half */}
        <Ellipse
          cx="-100"
          cy="0"
          rx="200"
          ry="250"
          fill="url(#papayaGradient)"
          opacity="0.95"
        />

        {/* Outer skin - right half */}
        <Ellipse
          cx="100"
          cy="0"
          rx="200"
          ry="250"
          fill="url(#papayaGradient)"
          opacity="0.95"
        />

        {/* Inner flesh - left */}
        <Ellipse
          cx="-100"
          cy="0"
          rx="160"
          ry="210"
          fill="url(#fleshGradient)"
        />

        {/* Inner flesh - right */}
        <Ellipse
          cx="100"
          cy="0"
          rx="160"
          ry="210"
          fill="url(#fleshGradient)"
        />

        {/* Cavity center - left */}
        <Ellipse
          cx="-100"
          cy="0"
          rx="80"
          ry="100"
          fill="#FFB84D"
        />

        {/* Cavity center - right */}
        <Ellipse
          cx="100"
          cy="0"
          rx="80"
          ry="100"
          fill="#FFB84D"
        />

        {/* Seeds - left half */}
        {[-120, -100, -80, -120, -100, -80, -120, -100, -80].map((x, i) => (
          <Circle
            key={`left-${i}`}
            cx={x}
            cy={-60 + (i % 3) * 60}
            r="12"
            fill="#2C3E50"
            opacity="0.7"
          />
        ))}

        {/* Seeds - right half */}
        {[80, 100, 120, 80, 100, 120, 80, 100, 120].map((x, i) => (
          <Circle
            key={`right-${i}`}
            cx={x}
            cy={-60 + (i % 3) * 60}
            r="12"
            fill="#2C3E50"
            opacity="0.7"
          />
        ))}
      </G>

      {/* Leaves on top - sustainability symbol */}
      <G transform="translate(512, 280)">
        {/* Left leaf */}
        <Path
          d="M -80 0 Q -150 -80 -120 -160 Q -100 -200 -50 -180 Q -60 -120 -40 -60 Q -50 -20 -80 0 Z"
          fill="url(#leafGradient)"
          opacity="0.9"
        />

        {/* Center leaf */}
        <Path
          d="M 0 -20 Q -20 -100 0 -200 Q 20 -220 40 -180 Q 30 -120 20 -60 Q 10 -30 0 -20 Z"
          fill="url(#leafGradient)"
          opacity="0.95"
        />

        {/* Right leaf */}
        <Path
          d="M 80 0 Q 150 -80 120 -160 Q 100 -200 50 -180 Q 60 -120 40 -60 Q 50 -20 80 0 Z"
          fill="url(#leafGradient)"
          opacity="0.9"
        />

        {/* Leaf veins for detail */}
        <Path
          d="M -80 0 Q -95 -60 -85 -120"
          stroke="#4A7C3B"
          strokeWidth="3"
          fill="none"
          opacity="0.4"
        />
        <Path
          d="M 0 -20 Q 5 -80 8 -150"
          stroke="#4A7C3B"
          strokeWidth="3"
          fill="none"
          opacity="0.4"
        />
        <Path
          d="M 80 0 Q 95 -60 85 -120"
          stroke="#4A7C3B"
          strokeWidth="3"
          fill="none"
          opacity="0.4"
        />
      </G>

      {/* Subtle highlight on papaya */}
      <Ellipse
        cx="420"
        cy="450"
        rx="60"
        ry="80"
        fill="#FFF"
        opacity="0.2"
      />

      <Ellipse
        cx="600"
        cy="480"
        rx="50"
        ry="70"
        fill="#FFF"
        opacity="0.15"
      />
    </Svg>
  );
};

export default PapayaAppIcon;
