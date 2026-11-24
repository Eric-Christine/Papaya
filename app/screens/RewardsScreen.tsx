import React, { useState, useContext, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useFocusEffect } from '@react-navigation/native';
import UserContext, { ActionResult } from '../contexts/UserContext';
import { CropDefinition, CropRarity } from '../types/garden';
import {
  CROP_CATALOG,
  FERTILIZER_PACK_COST,
  FERTILIZER_PACK_COUNT,
  FERTILIZER_SINGLE_COST,
  HEART_COST,
  SHOP_UPGRADES,
  getDailyFeaturedCropId,
  getEffectiveSeedCost,
  getGardenLevel,
  getMasteryInfo,
} from '../data/shopCatalog';
import { CropPixelSprite, MasteryStars, PixelIcon } from '../../components/pixel/PixelSprite';
import { PixelIconName } from '../../components/pixel/cropSprites';
import { formatDuration } from '../../utils/formatDuration';
import {
  SunflowerBadge,
  GreenThumbBadge,
  MasterGardenerBadge,
  Level2Badge,
  Level5Badge,
} from '../../components/badges/BadgeIcons';

const badgesData = [
  {
    id: '1',
    title: 'Sunflower Badge',
    description: 'Awarded for consistent care of your garden.',
    icon: SunflowerBadge,
  },
  {
    id: '2',
    title: 'Green Thumb Badge',
    description: 'Earned after harvesting your first garden produce.',
    icon: GreenThumbBadge,
  },
  {
    id: '3',
    title: 'Master Gardener Badge',
    description: 'Given for outstanding garden achievements.',
    icon: MasterGardenerBadge,
  },
  {
    id: '4',
    title: 'Level 2 Gardener',
    description: 'Awarded for reaching Garden Level 2.',
    icon: Level2Badge,
  },
  {
    id: '5',
    title: 'Level 5 Master',
    description: 'Awarded for reaching Garden Level 5.',
    icon: Level5Badge,
  },
];

const RARITY_COLORS: Record<CropRarity, string> = {
  common: '#8D6E63',
  uncommon: '#43A047',
  rare: '#1E88E5',
  epic: '#8E24AA',
};

const UPGRADE_ICONS: Record<string, PixelIconName> = {
  rain_barrel: 'rain_barrel',
  golden_trowel: 'golden_trowel',
  scarecrow: 'scarecrow',
};

const MAX_LIVES = 10;
const LIVES_KEY = 'quizLives';

export default function RewardsScreen() {
  const { user, addSeeds, buyFertilizer, buySeeds, buyUpgrade } = useContext(UserContext);
  const [lives, setLives] = useState<number>(MAX_LIVES);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { level } = getGardenLevel(user.xp);
  const featuredId = getDailyFeaturedCropId(level);
  const featured = CROP_CATALOG.find(c => c.id === featuredId)!;
  const totalHarvests = Object.values(user.harvestCounts).reduce((sum, n) => sum + (n ?? 0), 0);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchLives = async () => {
        try {
          const storedLives = await AsyncStorage.getItem(LIVES_KEY);
          setLives(storedLives ? parseInt(storedLives, 10) : MAX_LIVES);
        } catch (error) {
          console.error('Failed to fetch lives:', error);
        }
      };
      fetchLives();
    }, [])
  );

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  };

  const finish = (result: ActionResult, success: string) => {
    if (result.ok) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showToast(success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert("Can't buy that yet", result.reason);
    }
  };

  const handleBuySeeds = (crop: CropDefinition, quantity: number) => {
    finish(buySeeds(crop.id, quantity), `+${quantity} ${crop.title} seed${quantity > 1 ? 's' : ''} in your bag`);
  };

  const handleBuyFertilizer = (amount: number, cost: number) => {
    if (user.seeds < cost) {
      finish({ ok: false, reason: `You need ${cost - user.seeds} more seeds.` }, '');
      return;
    }
    buyFertilizer(amount, cost);
    finish({ ok: true }, `+${amount} fertilizer`);
  };

  const handleBuyHeart = async () => {
    if (user.seeds < HEART_COST) {
      finish({ ok: false, reason: `You need ${HEART_COST - user.seeds} more seeds.` }, '');
      return;
    }
    const storedLives = await AsyncStorage.getItem(LIVES_KEY);
    const currentLives = storedLives ? parseInt(storedLives, 10) : MAX_LIVES;
    if (currentLives >= MAX_LIVES) {
      Alert.alert('Hearts Full', 'Your hearts are already full.');
      return;
    }
    addSeeds(-HEART_COST);
    await AsyncStorage.setItem(LIVES_KEY, String(currentLives + 1));
    setLives(currentLives + 1);
    finish({ ok: true }, '+1 quiz heart');
  };

  const lockReason = (crop: CropDefinition): string | null => {
    if (crop.requiredLevel && level < crop.requiredLevel) return `Farm Level ${crop.requiredLevel}`;
    if (crop.requiredLessons && user.lessonsCompleted < crop.requiredLessons) {
      return `${crop.requiredLessons} lessons`;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Market</Text>
          <View style={styles.headerChips}>
            <View style={styles.chip}>
              <PixelIcon name="seed_coin" size={18} />
              <Text style={styles.chipText}>{user.seeds}</Text>
            </View>
            <View style={styles.chip}>
              <PixelIcon name="heart" size={18} />
              <Text style={styles.chipText}>{lives}</Text>
            </View>
          </View>
        </View>

        {/* Daily special */}
        <View style={styles.special}>
          <View style={styles.specialSprite}>
            <CropPixelSprite cropId={featured.id} size={64} />
          </View>
          <View style={styles.specialInfo}>
            <Text style={styles.specialLabel}>TODAY'S SPECIAL · 25% OFF</Text>
            <Text style={styles.specialTitle}>{featured.title} seeds</Text>
            <Text style={styles.specialPrice}>
              <Text style={styles.strike}>{featured.cost}</Text> {getEffectiveSeedCost(featured, level)} seeds
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.buyButton, lockReason(featured) !== null && styles.buyButtonLocked]}
            onPress={() => handleBuySeeds(featured, 1)}
          >
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>

        {/* Seeds */}
        <Text style={styles.sectionHeader}>Seed Packets</Text>
        <Text style={styles.sectionHint}>Seeds go to your bag. Plant them on plowed soil in the Garden.</Text>
        <View style={styles.seedGrid}>
          {CROP_CATALOG.map(crop => {
            const locked = lockReason(crop);
            const price = getEffectiveSeedCost(crop, level);
            const mastery = getMasteryInfo(user.harvestCounts[crop.id] ?? 0);
            const owned = user.seedBag[crop.id] ?? 0;
            return (
              <View key={crop.id} style={[styles.seedCard, locked !== null && styles.seedCardLocked]}>
                <View style={[styles.rarityTag, { backgroundColor: RARITY_COLORS[crop.rarity] }]}>
                  <Text style={styles.rarityText}>{crop.rarity.toUpperCase()}</Text>
                </View>
                {owned > 0 && (
                  <View style={styles.ownedTag}>
                    <Text style={styles.ownedText}>×{owned}</Text>
                  </View>
                )}
                <CropPixelSprite cropId={crop.id} size={56} opacity={locked ? 0.45 : 1} />
                <Text style={styles.seedTitle}>{crop.title}</Text>
                <MasteryStars stars={mastery.stars} size={11} />
                <Text style={styles.seedStats}>
                  ⏱ {formatDuration(crop.harvestDuration / 1000)} · +{crop.xpReward} XP
                </Text>
                <Text style={styles.seedStats}>Sells for {crop.baseSellPrice}</Text>
                <Text style={styles.ecoFact} numberOfLines={3}>🌍 {crop.ecoFact}</Text>
                {locked ? (
                  <View style={styles.lockedRow}>
                    <Text style={styles.lockedText}>🔒 {locked}</Text>
                  </View>
                ) : (
                  <View style={styles.buyRow}>
                    <TouchableOpacity style={styles.buyButtonSmall} onPress={() => handleBuySeeds(crop, 1)}>
                      <Text style={styles.buyButtonText}>{price}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buyButtonSmallAlt} onPress={() => handleBuySeeds(crop, 5)}>
                      <Text style={styles.buyButtonAltText}>×5</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Supplies */}
        <Text style={styles.sectionHeader}>Supplies</Text>
        <View style={styles.listCard}>
          <PixelIcon name="fertilizer" size={40} />
          <View style={styles.listInfo}>
            <Text style={styles.listTitle}>Fertilizer</Text>
            <Text style={styles.listDescription}>Halves a crop's remaining grow time. You have {user.fertilizer}.</Text>
          </View>
          <View style={styles.listButtons}>
            <TouchableOpacity style={styles.buyButtonSmall} onPress={() => handleBuyFertilizer(1, FERTILIZER_SINGLE_COST)}>
              <Text style={styles.buyButtonText}>{FERTILIZER_SINGLE_COST}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyButtonSmallAlt}
              onPress={() => handleBuyFertilizer(FERTILIZER_PACK_COUNT, FERTILIZER_PACK_COST)}
            >
              <Text style={styles.buyButtonAltText}>×{FERTILIZER_PACK_COUNT} {FERTILIZER_PACK_COST}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listCard}>
          <PixelIcon name="heart" size={40} />
          <View style={styles.listInfo}>
            <Text style={styles.listTitle}>Quiz Heart</Text>
            <Text style={styles.listDescription}>An extra life for quizzes. {lives}/{MAX_LIVES} hearts.</Text>
          </View>
          <TouchableOpacity style={styles.buyButtonSmall} onPress={handleBuyHeart}>
            <Text style={styles.buyButtonText}>{HEART_COST}</Text>
          </TouchableOpacity>
        </View>

        {/* Upgrades */}
        <Text style={styles.sectionHeader}>Farm Upgrades</Text>
        {SHOP_UPGRADES.map(upgrade => {
          const owned = user.upgrades.includes(upgrade.id);
          const locked = !owned && upgrade.requiredLevel && level < upgrade.requiredLevel;
          return (
            <View key={upgrade.id} style={[styles.listCard, owned && styles.listCardOwned]}>
              <PixelIcon name={UPGRADE_ICONS[upgrade.id]} size={44} opacity={locked ? 0.45 : 1} />
              <View style={styles.listInfo}>
                <Text style={styles.listTitle}>{upgrade.title}</Text>
                <Text style={styles.upgradeEffect}>{upgrade.effectText}</Text>
                <Text style={styles.listDescription}>{upgrade.description}</Text>
              </View>
              {owned ? (
                <Text style={styles.ownedLabel}>OWNED</Text>
              ) : locked ? (
                <Text style={styles.lockedText}>🔒 LV {upgrade.requiredLevel}</Text>
              ) : (
                <TouchableOpacity
                  style={styles.buyButtonSmall}
                  onPress={() => finish(buyUpgrade(upgrade.id), `${upgrade.title} installed!`)}
                >
                  <Text style={styles.buyButtonText}>{upgrade.cost}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        {/* Badges */}
        <Text style={styles.sectionHeader}>Badges</Text>
        {badgesData.map(badge => {
          const BadgeIcon = badge.icon;
          let isUnlocked = false;
          switch (badge.id) {
            case '1': // Sunflower: consistent care (using XP > 0 as proxy)
              isUnlocked = user.xp > 0;
              break;
            case '2': // Green Thumb: first harvest
              isUnlocked = totalHarvests > 0 || user.inventory.length > 0;
              break;
            case '3': // Master Gardener: level 10
              isUnlocked = level >= 10;
              break;
            case '4': // Level 2
              isUnlocked = level >= 2;
              break;
            case '5': // Level 5
              isUnlocked = level >= 5;
              break;
          }

          return (
            <View key={badge.id} style={[styles.badgeCard, !isUnlocked && styles.badgeCardLocked]}>
              <BadgeIcon width={50} height={50} opacity={isUnlocked ? 1 : 0.3} />
              <View style={styles.listInfo}>
                <Text style={[styles.listTitle, !isUnlocked && { color: '#777' }]}>
                  {badge.title} {isUnlocked ? '✅' : '🔒'}
                </Text>
                <Text style={styles.listDescription}>{badge.description}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {toast && (
        <View style={styles.toast} pointerEvents="none">
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const PIXEL_FONT = 'SpaceMono';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6EBD9',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5B371C',
    borderWidth: 3,
    borderColor: '#3B2210',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontFamily: PIXEL_FONT,
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF8E1',
  },
  headerChips: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF8E1',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  chipText: {
    fontFamily: PIXEL_FONT,
    fontSize: 14,
    fontWeight: '700',
    color: '#3B2210',
  },
  special: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFF3C4',
    borderWidth: 3,
    borderColor: '#F9A825',
    borderRadius: 8,
    padding: 10,
  },
  specialSprite: {
    backgroundColor: '#FFE082',
    borderRadius: 6,
    padding: 2,
  },
  specialInfo: {
    flex: 1,
  },
  specialLabel: {
    fontFamily: PIXEL_FONT,
    fontSize: 10,
    fontWeight: '700',
    color: '#E65100',
  },
  specialTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#3B2210',
  },
  specialPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
  },
  strike: {
    textDecorationLine: 'line-through',
    color: '#A1887F',
  },
  sectionHeader: {
    fontFamily: PIXEL_FONT,
    fontSize: 18,
    fontWeight: '700',
    color: '#5B371C',
    marginTop: 22,
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 13,
    color: '#6D4C41',
    marginBottom: 10,
  },
  seedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  seedCard: {
    width: '48.5%',
    alignItems: 'center',
    backgroundColor: '#FFFDF7',
    borderWidth: 3,
    borderColor: '#C9A26B',
    borderRadius: 8,
    paddingTop: 22,
    paddingBottom: 10,
    paddingHorizontal: 8,
    gap: 3,
  },
  seedCardLocked: {
    backgroundColor: '#EFE6D6',
    borderColor: '#BCAAA4',
  },
  rarityTag: {
    position: 'absolute',
    top: 4,
    left: 4,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  rarityText: {
    fontFamily: PIXEL_FONT,
    fontSize: 8,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  ownedTag: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#5B371C',
    borderRadius: 4,
    paddingHorizontal: 5,
  },
  ownedText: {
    fontFamily: PIXEL_FONT,
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF8E1',
  },
  seedTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3B2210',
  },
  seedStats: {
    fontSize: 11,
    color: '#6D4C41',
  },
  ecoFact: {
    fontSize: 11,
    color: '#2E7D32',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 2,
    minHeight: 42,
  },
  buyRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  lockedRow: {
    marginTop: 6,
    paddingVertical: 6,
  },
  lockedText: {
    fontFamily: PIXEL_FONT,
    fontSize: 11,
    color: '#8D6E63',
    fontWeight: '700',
  },
  buyButton: {
    backgroundColor: '#43A047',
    borderWidth: 2,
    borderColor: '#2E7D32',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buyButtonLocked: {
    backgroundColor: '#A5A58D',
    borderColor: '#8A8A73',
  },
  buyButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#43A047',
    borderWidth: 2,
    borderColor: '#2E7D32',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buyButtonSmallAlt: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#43A047',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  buyButtonText: {
    fontFamily: PIXEL_FONT,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  buyButtonAltText: {
    fontFamily: PIXEL_FONT,
    fontSize: 12,
    fontWeight: '700',
    color: '#2E7D32',
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFDF7',
    borderWidth: 3,
    borderColor: '#C9A26B',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  listCardOwned: {
    borderColor: '#43A047',
    backgroundColor: '#F1F8E9',
  },
  listInfo: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B2210',
  },
  listDescription: {
    fontSize: 13,
    color: '#6D4C41',
    marginTop: 2,
  },
  listButtons: {
    gap: 6,
    alignItems: 'stretch',
  },
  upgradeEffect: {
    fontFamily: PIXEL_FONT,
    fontSize: 11,
    fontWeight: '700',
    color: '#2E7D32',
  },
  ownedLabel: {
    fontFamily: PIXEL_FONT,
    fontSize: 12,
    fontWeight: '700',
    color: '#2E7D32',
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  badgeCardLocked: {
    opacity: 0.6,
    backgroundColor: '#F0F0F0',
  },
  toast: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#1B5E20',
    borderWidth: 2,
    borderColor: '#A5D6A7',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  toastText: {
    fontFamily: PIXEL_FONT,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
