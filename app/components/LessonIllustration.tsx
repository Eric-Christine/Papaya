import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path, Circle, G } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

export type SceneName =
  | 'land'
  | 'forest'
  | 'sea'
  | 'ice'
  | 'desert'
  | 'energy'
  | 'city'
  | 'tech'
  | 'civic'
  | 'food'
  | 'nuclear';

export type LessonArt = {
  kind: 'illustration';
  scene: SceneName;
  icon: IconName;
  accents: IconName[];
  label?: string;
};

// Build an illustration spec. Lesson image maps hold these instead of image URLs,
// so every lesson picture is drawn in code and works offline.
export const art = (
  scene: SceneName,
  icon: IconName,
  label?: string,
  accents: IconName[] = []
): LessonArt => ({ kind: 'illustration', scene, icon, accents, label });

export const isLessonArt = (value: any): value is LessonArt =>
  !!value && typeof value === 'object' && value.kind === 'illustration';

type Ground = 'hills' | 'trees' | 'waves' | 'peaks' | 'dunes' | 'skyline' | 'grid' | 'arcs';

type Scene = {
  sky: [string, string];
  ground: Ground;
  groundColors: [string, string];
  sun?: string;
  tint: string; // icon colour
};

const scenes: Record<SceneName, Scene> = {
  land: { sky: ['#81D4FA', '#E1F5FE'], ground: 'hills', groundColors: ['#81C784', '#43A047'], sun: '#FFF59D', tint: '#2E7D32' },
  forest: { sky: ['#A5D6A7', '#E8F5E9'], ground: 'trees', groundColors: ['#66BB6A', '#2E7D32'], sun: '#FFF9C4', tint: '#1B5E20' },
  sea: { sky: ['#4FC3F7', '#E1F5FE'], ground: 'waves', groundColors: ['#29B6F6', '#0277BD'], sun: '#FFF59D', tint: '#01579B' },
  ice: { sky: ['#B3E5FC', '#F1FAFF'], ground: 'peaks', groundColors: ['#FFFFFF', '#4FC3F7'], sun: '#FFFDE7', tint: '#01579B' },
  desert: { sky: ['#FFB74D', '#FFF3E0'], ground: 'dunes', groundColors: ['#FFCC80', '#F57C00'], sun: '#FFF176', tint: '#E65100' },
  energy: { sky: ['#FFD54F', '#FFF8E1'], ground: 'hills', groundColors: ['#AED581', '#7CB342'], sun: '#FFFFFF', tint: '#F57F17' },
  city: { sky: ['#80CBC4', '#E0F2F1'], ground: 'skyline', groundColors: ['#78909C', '#455A64'], sun: '#FFF59D', tint: '#00695C' },
  tech: { sky: ['#5E35B1', '#9575CD'], ground: 'grid', groundColors: ['#B39DDB', '#311B92'], tint: '#4527A0' },
  civic: { sky: ['#90CAF9', '#E3F2FD'], ground: 'arcs', groundColors: ['#64B5F6', '#1976D2'], tint: '#1565C0' },
  food: { sky: ['#FFAB91', '#FBE9E7'], ground: 'hills', groundColors: ['#FFCC80', '#FF8A65'], sun: '#FFF9C4', tint: '#D84315' },
  nuclear: { sky: ['#CE93D8', '#F3E5F5'], ground: 'hills', groundColors: ['#B39DDB', '#7E57C2'], sun: '#FFFFFF', tint: '#6A1B9A' },
};

// All ground shapes are drawn in a 600x400 viewBox.
const renderGround = (ground: Ground, [light, dark]: [string, string]) => {
  switch (ground) {
    case 'hills':
      return (
        <G>
          <Path d="M0 300 Q150 220 320 290 T600 270 V400 H0 Z" fill={light} />
          <Path d="M0 340 Q200 280 380 340 T600 320 V400 H0 Z" fill={dark} />
        </G>
      );
    case 'trees':
      return (
        <G>
          <Path d="M0 310 Q300 260 600 310 V400 H0 Z" fill={light} />
          {[30, 110, 200, 400, 490, 570].map((x, i) => (
            <Path
              key={x}
              d={`M${x} ${220 + (i % 2) * 20} L${x + 38} 330 H${x - 38} Z`}
              fill={dark}
              opacity={0.85}
            />
          ))}
          <Path d="M0 350 Q300 310 600 350 V400 H0 Z" fill={dark} />
        </G>
      );
    case 'waves':
      return (
        <G>
          <Path d="M0 290 Q50 270 100 290 T200 290 T300 290 T400 290 T500 290 T600 290 V400 H0 Z" fill={light} />
          <Path d="M0 330 Q50 310 100 330 T200 330 T300 330 T400 330 T500 330 T600 330 V400 H0 Z" fill={dark} />
        </G>
      );
    case 'peaks':
      return (
        <G>
          <Path d="M40 320 L130 190 L190 260 L240 210 L330 320 Z" fill={light} />
          <Path d="M360 320 L450 220 L500 270 L540 240 L600 320 Z" fill={light} opacity={0.9} />
          <Path d="M0 320 Q50 305 100 320 T200 320 T300 320 T400 320 T500 320 T600 320 V400 H0 Z" fill={dark} />
        </G>
      );
    case 'dunes':
      return (
        <G>
          <Path d="M0 310 Q120 230 260 300 Q400 240 600 300 V400 H0 Z" fill={light} />
          <Path d="M0 350 Q180 290 340 345 Q470 310 600 345 V400 H0 Z" fill={dark} />
        </G>
      );
    case 'skyline':
      return (
        <G>
          {[
            [10, 250, 60], [80, 210, 50], [140, 270, 70], [220, 230, 45],
            [345, 240, 55], [410, 200, 50], [470, 260, 60], [540, 225, 50],
          ].map(([x, y, w]) => (
            <Rect key={x} x={x} y={y} width={w} height={400 - y} rx={4} fill={light} />
          ))}
          <Rect x={0} y={345} width={600} height={55} fill={dark} />
        </G>
      );
    case 'grid':
      return (
        <G opacity={0.45}>
          {[80, 160, 240, 320].map(y => (
            <Path key={`h${y}`} d={`M0 ${y} H600`} stroke={light} strokeWidth={1.5} />
          ))}
          {[75, 150, 225, 300, 375, 450, 525].map(x => (
            <Path key={`v${x}`} d={`M${x} 0 V400`} stroke={light} strokeWidth={1.5} />
          ))}
          {[[75, 80], [225, 320], [450, 160], [525, 240], [150, 240], [375, 80]].map(([x, y]) => (
            <Circle key={`${x}-${y}`} cx={x} cy={y} r={7} fill={light} />
          ))}
        </G>
      );
    case 'arcs':
      return (
        <G>
          <Circle cx={90} cy={420} r={170} fill={light} opacity={0.55} />
          <Circle cx={520} cy={430} r={200} fill={dark} opacity={0.45} />
          <Circle cx={300} cy={470} r={170} fill={dark} opacity={0.6} />
        </G>
      );
  }
};

type Props = {
  art: LessonArt;
  style?: StyleProp<ViewStyle>;
};

export default function LessonIllustration({ art, style }: Props) {
  const scene = scenes[art.scene];
  const gradientId = `sky-${art.scene}`;

  return (
    <View
      style={[styles.container, style]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={art.label ? `Illustration: ${art.label}` : 'Lesson illustration'}
    >
      <Svg style={StyleSheet.absoluteFill} viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={scene.sky[0]} />
            <Stop offset="1" stopColor={scene.sky[1]} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={600} height={400} fill={`url(#${gradientId})`} />
        {scene.sun && (
          <G>
            <Circle cx={500} cy={85} r={62} fill={scene.sun} opacity={0.35} />
            <Circle cx={500} cy={85} r={40} fill={scene.sun} />
          </G>
        )}
        {renderGround(scene.ground, scene.groundColors)}
      </Svg>

      <View style={styles.iconRow}>
        {art.accents[0] && (
          <View style={[styles.badge, styles.accentBadge, styles.accentLow]}>
            <MaterialCommunityIcons name={art.accents[0]} size={26} color={scene.tint} />
          </View>
        )}
        <View style={[styles.badge, styles.mainBadge]}>
          <MaterialCommunityIcons name={art.icon} size={60} color={scene.tint} />
        </View>
        {art.accents[1] && (
          <View style={[styles.badge, styles.accentBadge, styles.accentHigh]}>
            <MaterialCommunityIcons name={art.accents[1]} size={26} color={scene.tint} />
          </View>
        )}
      </View>

      {art.label && (
        <View style={styles.labelPill}>
          <Text style={[styles.labelText, { color: scene.tint }]} numberOfLines={1}>
            {art.label}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  mainBadge: {
    width: 104,
    height: 104,
    borderRadius: 52,
    marginHorizontal: 14,
  },
  accentBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  accentLow: {
    marginTop: 44,
  },
  accentHigh: {
    marginBottom: 44,
  },
  labelPill: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(255,255,255,0.94)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
    maxWidth: '90%',
  },
  labelText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
