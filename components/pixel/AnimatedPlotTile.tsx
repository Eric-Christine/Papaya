import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getGrowthStage,
  getPlotUnlockCost,
  resolveCropId,
  WATER_HYDRATION_DURATION_MS,
} from '../../app/data/shopCatalog';
import { GardenItem, GrowthStage } from '../../app/types/garden';
import { formatDuration } from '../../utils/formatDuration';
import { CropPixelSprite, PixelIcon, PlotTileBase } from './PixelSprite';

export type PlotEffectEvent = {
  id: number;
  type: 'plow' | 'plant' | 'water' | 'fertilize' | 'harvest' | 'info';
  label?: string;
  isGolden?: boolean;
};

type AnimatedPlotTileProps = {
  plotIndex: number;
  isUnlocked: boolean;
  isTilled: boolean;
  item?: GardenItem;
  now: number;
  tileSize: number;
  selected?: boolean;
  effectEvent?: PlotEffectEvent;
  onPress: () => void;
};

const STAGE_ORDER: Record<GrowthStage, number> = {
  seed: 0,
  sprout: 1,
  growing: 2,
  budding: 3,
  ripe: 4,
};

const AnimatedPlotTile: React.FC<AnimatedPlotTileProps> = ({
  plotIndex,
  isUnlocked,
  isTilled,
  item,
  now,
  tileSize,
  selected = false,
  effectEvent,
  onPress,
}) => {
  // Compute growth progress & stage
  const elapsed = item ? Math.max(0, now - item.plantedAt) : 0;
  const progress = item ? Math.min(elapsed / Math.max(1, item.harvestDuration), 1) : 0;
  const remainingSec = item ? Math.max(0, Math.ceil((item.harvestDuration - elapsed) / 1000)) : 0;
  const stage: GrowthStage = item ? getGrowthStage(progress) : 'seed';
  const isRipe = Boolean(item && progress >= 1);
  const isHydrated = Boolean(
    item?.wateredAt && now - item.wateredAt < WATER_HYDRATION_DURATION_MS
  );
  const cropId = item ? resolveCropId(item.cropId, item.title) : 'radish';

  // Living breeze sway & bounce
  const swayAnim = useRef(new Animated.Value(0)).current;
  // Pop spring whenever a crop advances a growth stage or gets planted
  const stagePopAnim = useRef(new Animated.Value(1)).current;
  // Ripe sparkle twinkle & bobbing badge
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const badgeBobAnim = useRef(new Animated.Value(0)).current;
  // Action effect particle animation (water drops / dirt clods / sparkles / harvest text)
  const effectAnim = useRef(new Animated.Value(0)).current;
  const pressScaleAnim = useRef(new Animated.Value(1)).current;

  const prevStageRef = useRef<string | null>(null);
  const lastEffectIdRef = useRef<number>(0);

  // Continuous subtle breeze / living sway loop (staggered per plotIndex)
  useEffect(() => {
    const duration = 1800 + (plotIndex % 3) * 320;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(swayAnim, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(swayAnim, {
          toValue: -1,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    const delayTimer = setTimeout(() => loop.start(), plotIndex * 180);
    return () => {
      clearTimeout(delayTimer);
      loop.stop();
    };
  }, [plotIndex, swayAnim]);

  // Trigger joyful spring growth pop whenever stage advances!
  useEffect(() => {
    const stageKey = item ? `${item.id}:${stage}` : 'empty';
    if (prevStageRef.current && prevStageRef.current !== stageKey && item) {
      stagePopAnim.setValue(0.45);
      Animated.spring(stagePopAnim, {
        toValue: 1,
        friction: 4,
        tension: 120,
        useNativeDriver: true,
      }).start();
    }
    prevStageRef.current = stageKey;
  }, [item, stage, stagePopAnim]);

  // Ripe sparkle & bobbing harvest tag animation
  useEffect(() => {
    if (!isRipe) {
      sparkleAnim.setValue(0);
      badgeBobAnim.setValue(0);
      return;
    }

    const sparkleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 650,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0.2,
          duration: 650,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    const bobLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(badgeBobAnim, {
          toValue: -5,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(badgeBobAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    sparkleLoop.start();
    bobLoop.start();
    return () => {
      sparkleLoop.stop();
      bobLoop.stop();
    };
  }, [isRipe, sparkleAnim, badgeBobAnim]);

  // One-shot particle / toast feedback animation on plot interaction
  useEffect(() => {
    if (!effectEvent || effectEvent.id === lastEffectIdRef.current) return;
    lastEffectIdRef.current = effectEvent.id;
    effectAnim.setValue(0);
    Animated.timing(effectAnim, {
      toValue: 1,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [effectEvent, effectAnim]);

  // Determine base soil tile visual
  const baseTileState: 'grass' | 'dry' | 'wet' | 'locked' = !isUnlocked
    ? 'locked'
    : item
      ? isHydrated
        ? 'wet'
        : 'dry'
      : isTilled
        ? 'dry'
        : 'grass';

  // Micro growth scale inside each stage so the plant steadily swells between stages
  const stageIdx = STAGE_ORDER[stage];
  const microScale =
    stage === 'ripe'
      ? 1.04
      : stage === 'seed'
        ? 0.92
        : 0.86 + Math.min(progress, 1) * 0.18;

  const swayRotate = swayAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: stage === 'seed' ? ['0deg', '0deg'] : isRipe ? ['-4deg', '4deg'] : ['-2.5deg', '2.5deg'],
  });

  const gentleLift = swayAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, stageIdx >= 2 ? -2 : -1, 0],
  });

  // Floating feedback interpolations
  const floatY = effectAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -30],
  });
  const floatOpacity = effectAnim.interpolate({
    inputRange: [0, 0.15, 0.75, 1],
    outputRange: [0, 1, 1, 0],
  });
  const waterDropY = effectAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-18, 16],
  });

  const handlePressIn = () => {
    Animated.spring(pressScaleAnim, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const spriteSize = Math.round(tileSize * 0.86);

  return (
    <Animated.View style={{ transform: [{ scale: pressScaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.plotOuter,
          {
            width: tileSize,
            height: tileSize + 22,
          },
          selected && styles.plotSelected,
          isRipe && styles.plotRipeGlow,
        ]}
      >
        {/* Pixel Land Tile Canvas */}
        <View style={[styles.tileViewport, { width: tileSize - 6, height: tileSize - 6 }]}>
          <PlotTileBase state={baseTileState} size={tileSize - 6} />

          {/* Growing Vegetable Sprite Overlay */}
          {isUnlocked && item && (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.cropOverlay,
                {
                  transform: [
                    { translateY: gentleLift },
                    { rotate: swayRotate },
                    { scale: Animated.multiply(stagePopAnim, microScale) },
                  ],
                },
              ]}
            >
              <CropPixelSprite cropId={cropId} stage={stage} size={spriteSize} />
            </Animated.View>
          )}

          {/* Hydrated Blue Water Drop Badge */}
          {isUnlocked && item && isHydrated && !isRipe && (
            <View style={styles.waterBadge} pointerEvents="none">
              <PixelIcon name="water_drop" size={14} />
            </View>
          )}

          {/* Fertilized Star Badge */}
          {isUnlocked && item && (item.fertilizedCount ?? 0) > 0 && !isRipe && (
            <View style={styles.fertBadge} pointerEvents="none">
              <PixelIcon name="sparkle" size={13} />
            </View>
          )}

          {/* Ripe Animated Golden Sparkles + Bobbing Harvest Pill */}
          {isUnlocked && isRipe && (
            <>
              <Animated.View
                pointerEvents="none"
                style={[styles.sparkleTopLeft, { opacity: sparkleAnim }]}
              >
                <PixelIcon name="sparkle" size={16} />
              </Animated.View>
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.sparkleBottomRight,
                  {
                    opacity: sparkleAnim.interpolate({
                      inputRange: [0.2, 1],
                      outputRange: [1, 0.25],
                    }),
                  },
                ]}
              >
                <PixelIcon name="sparkle" size={14} />
              </Animated.View>
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.harvestPill,
                  { transform: [{ translateY: badgeBobAnim }] },
                ]}
              >
                <Text style={styles.harvestPillText}>PICK!</Text>
              </Animated.View>
            </>
          )}

          {/* Empty Tilled / Grass Action Hint */}
          {isUnlocked && !item && (
            <View style={styles.emptyHintPill} pointerEvents="none">
              <PixelIcon name={isTilled ? 'seed_packet' : 'plow'} size={14} />
              <Text style={styles.emptyHintText}>{isTilled ? 'PLANT' : 'TILL'}</Text>
            </View>
          )}

          {/* Locked Plot Price Tag */}
          {!isUnlocked && (
            <View style={styles.lockedTag} pointerEvents="none">
              <Text style={styles.lockedTagText}>🔒 {getPlotUnlockCost(plotIndex)}</Text>
            </View>
          )}

          {/* Action Particle Overlays */}
          {effectEvent && (
            <>
              {effectEvent.type === 'water' && (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.waterOverlay,
                    { opacity: floatOpacity, transform: [{ translateY: waterDropY }] },
                  ]}
                >
                  <PixelIcon name="water_drop" size={16} />
                  <PixelIcon name="water_drop" size={14} />
                  <PixelIcon name="water_drop" size={16} />
                </Animated.View>
              )}

              {effectEvent.type === 'fertilize' && (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.waterOverlay,
                    { opacity: floatOpacity, transform: [{ translateY: floatY }] },
                  ]}
                >
                  <PixelIcon name="sparkle" size={18} />
                  <PixelIcon name="sparkle" size={15} />
                </Animated.View>
              )}

              {effectEvent.label && (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.floatingToast,
                    effectEvent.isGolden && styles.floatingToastGolden,
                    {
                      opacity: floatOpacity,
                      transform: [{ translateY: floatY }],
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.floatingToastText,
                      effectEvent.isGolden && styles.floatingToastTextGolden,
                    ]}
                    numberOfLines={1}
                  >
                    {effectEvent.label}
                  </Text>
                </Animated.View>
              )}
            </>
          )}
        </View>

        {/* Bottom Pixel HUD Strip */}
        <View style={styles.footerBar}>
          {!isUnlocked ? (
            <Text style={styles.footerLockedText} numberOfLines={1}>
              Expand Land
            </Text>
          ) : !item ? (
            <Text style={styles.footerEmptyText} numberOfLines={1}>
              {isTilled ? 'Plowed Soil' : 'Tap to Plow'}
            </Text>
          ) : isRipe ? (
            <Text style={styles.footerReadyText} numberOfLines={1}>
              ★ {item.title}
            </Text>
          ) : (
            <View style={styles.progressFooter}>
              <View style={styles.pixelProgressTrack}>
                <View
                  style={[
                    styles.pixelProgressFill,
                    isHydrated && styles.pixelProgressFillWet,
                    { width: `${Math.max(6, Math.round(progress * 100))}%` },
                  ]}
                />
              </View>
              <Text style={styles.footerTimerText} numberOfLines={1}>
                {formatDuration(remainingSec)}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  plotOuter: {
    backgroundColor: '#5B371C',
    borderWidth: 3,
    borderColor: '#3B2210',
    borderRadius: 6,
    paddingTop: 2,
    paddingHorizontal: 2,
    paddingBottom: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#1B1209',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 3,
  },
  plotSelected: {
    borderColor: '#FFD54F',
    backgroundColor: '#7A4A24',
  },
  plotRipeGlow: {
    borderColor: '#FFD54F',
    backgroundColor: '#6E4C1B',
  },
  tileViewport: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    borderRadius: 2,
  },
  cropOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waterBadge: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: 'rgba(15, 52, 96, 0.72)',
    borderRadius: 4,
    padding: 2,
  },
  fertBadge: {
    position: 'absolute',
    top: 3,
    left: 3,
    backgroundColor: 'rgba(66, 44, 0, 0.75)',
    borderRadius: 4,
    padding: 2,
  },
  sparkleTopLeft: {
    position: 'absolute',
    top: 2,
    left: 4,
  },
  sparkleBottomRight: {
    position: 'absolute',
    bottom: 6,
    right: 4,
  },
  harvestPill: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#FFD54F',
    borderWidth: 2,
    borderColor: '#5B371C',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  harvestPillText: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    fontWeight: '700',
    color: '#3B2210',
    letterSpacing: 0.5,
  },
  emptyHintPill: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(42, 26, 13, 0.8)',
    borderWidth: 1,
    borderColor: '#C9A26B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  emptyHintText: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    fontWeight: '700',
    color: '#FFF8E1',
  },
  lockedTag: {
    position: 'absolute',
    bottom: 4,
    backgroundColor: 'rgba(30, 20, 12, 0.86)',
    borderWidth: 1,
    borderColor: '#FFD54F',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  lockedTagText: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    fontWeight: '700',
    color: '#FFD54F',
  },
  waterOverlay: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingToast: {
    position: 'absolute',
    top: 4,
    backgroundColor: '#1B5E20',
    borderWidth: 1.5,
    borderColor: '#A5D6A7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 10,
  },
  floatingToastGolden: {
    backgroundColor: '#F57F17',
    borderColor: '#FFF59D',
  },
  floatingToastText: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  floatingToastTextGolden: {
    color: '#FFFDE7',
  },
  footerBar: {
    width: '100%',
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  footerLockedText: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    color: '#D7CCC8',
  },
  footerEmptyText: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    color: '#EFEBE9',
  },
  footerReadyText: {
    fontFamily: 'SpaceMono',
    fontSize: 9,
    fontWeight: '700',
    color: '#FFD54F',
  },
  progressFooter: {
    width: '100%',
    alignItems: 'center',
    gap: 1,
  },
  pixelProgressTrack: {
    width: '100%',
    height: 5,
    backgroundColor: '#2E1A0C',
    borderWidth: 1,
    borderColor: '#8D5A32',
    borderRadius: 2,
    overflow: 'hidden',
  },
  pixelProgressFill: {
    height: '100%',
    backgroundColor: '#7ED357',
  },
  pixelProgressFillWet: {
    backgroundColor: '#29B6F6',
  },
  footerTimerText: {
    fontFamily: 'SpaceMono',
    fontSize: 8.5,
    color: '#FFF8E1',
  },
});

export default AnimatedPlotTile;
