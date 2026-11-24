// app/screens/GardenScreen.tsx
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import UserContext, { ActionResult } from '../contexts/UserContext';
import { CropId, GardenTool } from '../types/garden';
import CraftingArea from '../components/crafting/CraftingArea';
import {
  CROP_CATALOG,
  TOTAL_FARM_PLOTS,
  WATER_HYDRATION_DURATION_MS,
  generateFarmOrder,
  getCropById,
  getGardenLevel,
  getMasteryInfo,
  getPlotUnlockCost,
  getWaterState,
  resolveCropId,
} from '../data/shopCatalog';
import AnimatedPlotTile, { PlotEffectEvent } from '../../components/pixel/AnimatedPlotTile';
import { CropPixelSprite, MasteryStars, PixelIcon } from '../../components/pixel/PixelSprite';
import { PixelIconName } from '../../components/pixel/cropSprites';
import { formatDuration } from '../../utils/formatDuration';

const TOOLS: { id: GardenTool; label: string; icon: PixelIconName }[] = [
  { id: 'smart', label: 'Auto', icon: 'sparkle' },
  { id: 'plow', label: 'Plow', icon: 'plow' },
  { id: 'plant', label: 'Plant', icon: 'seed_packet' },
  { id: 'water', label: 'Water', icon: 'watering_can' },
  { id: 'fertilize', label: 'Boost', icon: 'fertilizer' },
  { id: 'harvest', label: 'Pick', icon: 'basket' },
];

const GRID_GAP = 8;
const FIELD_PADDING = 10;
const FIELD_BORDER = 4;

export default function GardenScreen() {
  const {
    user,
    sellItem,
    fertilizeItem,
    plowPlot,
    plantCrop,
    waterPlot,
    harvestPlot,
    unlockPlot,
    deliverOrder,
    skipOrder,
  } = useContext(UserContext);
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();

  const [now, setNow] = useState(Date.now());
  const [tool, setTool] = useState<GardenTool>('smart');
  const [selectedSeed, setSelectedSeed] = useState<CropId | null>(null);
  const [effects, setEffects] = useState<Record<number, PlotEffectEvent>>({});
  const effectCounter = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { level, xpInLevel, xpForNextLevel, progress: levelProgress } = getGardenLevel(user.xp);
  const water = getWaterState(user.waterDrops, user.waterUpdatedAt, user.upgrades, now);
  const order = generateFarmOrder(level, user.orderNumber);

  const fieldWidth = Math.min(width, 520) - 32;
  const tileSize = Math.floor((fieldWidth - (FIELD_PADDING + FIELD_BORDER) * 2 - GRID_GAP * 2) / 3);

  const seedsInBag = CROP_CATALOG.filter(c => (user.seedBag[c.id] ?? 0) > 0);
  const activeSeed: CropId | null =
    selectedSeed && (user.seedBag[selectedSeed] ?? 0) > 0 ? selectedSeed : seedsInBag[0]?.id ?? null;

  const ripePlots = user.garden
    .filter(g => now - g.plantedAt >= g.harvestDuration)
    .map(g => g.plotIndex!)
    .filter(p => p !== undefined);

  const showEffect = (plotIndex: number, event: Omit<PlotEffectEvent, 'id'>) => {
    effectCounter.current += 1;
    setEffects(prev => ({ ...prev, [plotIndex]: { ...event, id: effectCounter.current } }));
  };

  const refuse = (plotIndex: number, result: ActionResult) => {
    if (!result.ok) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      showEffect(plotIndex, { type: 'info', label: result.reason });
    }
  };

  const goToShop = () => navigation.navigate('Shop');

  const doHarvest = (plotIndex: number, quiet = false) => {
    const levelBefore = getGardenLevel(user.xp).level;
    const result = harvestPlot(plotIndex);
    if (!result) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    showEffect(plotIndex, {
      type: 'harvest',
      label: result.isGolden ? `GOLDEN! +${result.xpEarned} XP` : `+${result.xpEarned} XP`,
      isGolden: result.isGolden,
    });
    if (quiet) return;
    const levelAfter = getGardenLevel(user.xp + result.xpEarned).level;
    if (levelAfter > levelBefore) {
      const unlocked = CROP_CATALOG.filter(c => c.requiredLevel === levelAfter).map(c => c.title);
      Alert.alert(
        `Farm Level ${levelAfter}!`,
        unlocked.length ? `New seeds in the Shop: ${unlocked.join(', ')}.` : 'Your farm is growing. Keep it up!'
      );
    } else if (result.unlockedNewStar) {
      Alert.alert(
        `${result.item.title} Mastery ★${result.masteryStars}`,
        'Mastered crops grow faster, sell for more and turn golden more often.'
      );
    }
  };

  const handleLockedPlot = (plotIndex: number) => {
    if (plotIndex !== user.unlockedPlots) {
      Alert.alert('Expand in order', 'Unlock the next plot of land first.');
      return;
    }
    const cost = getPlotUnlockCost(plotIndex);
    Alert.alert('Expand your farm?', `Clear this plot of land for ${cost} seeds.`, [
      { text: 'Not now', style: 'cancel' },
      {
        text: `Buy for ${cost}`,
        onPress: () => {
          const result = unlockPlot();
          if (result.ok) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            showEffect(plotIndex, { type: 'plow', label: 'New land!' });
          } else {
            Alert.alert('Not enough seeds', result.reason);
          }
        },
      },
    ]);
  };

  const handlePlotPress = (plotIndex: number) => {
    if (plotIndex >= user.unlockedPlots) {
      handleLockedPlot(plotIndex);
      return;
    }
    const item = user.garden.find(g => g.plotIndex === plotIndex);
    const isTilled = user.tilledPlots.includes(plotIndex);
    const isRipe = Boolean(item && now - item.plantedAt >= item.harvestDuration);
    const isWet = Boolean(item?.wateredAt && now - item.wateredAt < WATER_HYDRATION_DURATION_MS);

    let action: GardenTool = tool;
    if (tool === 'smart') {
      if (!item) action = isTilled ? 'plant' : 'plow';
      else if (isRipe) action = 'harvest';
      else if (!isWet && water.drops > 0) action = 'water';
      else {
        const left = Math.ceil((item.harvestDuration - (now - item.plantedAt)) / 1000);
        showEffect(plotIndex, { type: 'info', label: `${formatDuration(left)} left` });
        return;
      }
    }

    switch (action) {
      case 'plow': {
        const result = plowPlot(plotIndex);
        if (result.ok) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          showEffect(plotIndex, { type: 'plow', label: '+1 XP' });
        } else refuse(plotIndex, result);
        return;
      }
      case 'plant': {
        if (!activeSeed) {
          Alert.alert('Seed bag is empty', 'Buy seed packets in the Shop to plant more crops.', [
            { text: 'Later', style: 'cancel' },
            { text: 'Go to Shop', onPress: goToShop },
          ]);
          return;
        }
        const result = plantCrop(plotIndex, activeSeed);
        if (result.ok) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          showEffect(plotIndex, { type: 'plant', label: getCropById(activeSeed)?.title });
        } else refuse(plotIndex, result);
        return;
      }
      case 'water': {
        const result = waterPlot(plotIndex);
        if (result.ok) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          showEffect(plotIndex, { type: 'water', label: 'Growing faster!' });
        } else refuse(plotIndex, result);
        return;
      }
      case 'fertilize': {
        if (!item) {
          refuse(plotIndex, { ok: false, reason: 'Nothing to boost.' });
          return;
        }
        if (user.fertilizer <= 0) {
          Alert.alert('No fertilizer', 'Buy fertilizer in the Shop or earn it from orders.', [
            { text: 'Later', style: 'cancel' },
            { text: 'Go to Shop', onPress: goToShop },
          ]);
          return;
        }
        if (fertilizeItem(item.id)) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          showEffect(plotIndex, { type: 'fertilize', label: 'Time halved!' });
        } else refuse(plotIndex, { ok: false, reason: 'Already ripe!' });
        return;
      }
      case 'harvest': {
        if (!isRipe) {
          refuse(plotIndex, { ok: false, reason: item ? 'Not ripe yet' : 'Nothing to pick' });
          return;
        }
        doHarvest(plotIndex);
        return;
      }
    }
  };

  const harvestAll = () => {
    ripePlots.forEach(p => doHarvest(p, true));
  };

  const handleDeliver = () => {
    const result = deliverOrder();
    if (result.ok) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(
        'Order delivered!',
        `${order.customerName} paid ${order.rewardSeeds} seeds, ${order.rewardXp} XP` +
          (order.rewardFertilizer ? ` and ${order.rewardFertilizer} fertilizer.` : '.')
      );
    } else {
      Alert.alert('Not ready yet', result.reason);
    }
  };

  // Barn: group harvested crops by type, golden ones separately
  const barn = useMemo(() => {
    const groups = new Map<string, { cropId: CropId; title: string; isGolden: boolean; ids: string[]; price: number }>();
    user.inventory.forEach(item => {
      const cropId = resolveCropId(item.cropId, item.title);
      const key = `${cropId}:${item.isGolden ? 'g' : 'n'}`;
      const group = groups.get(key);
      if (group) {
        group.ids.push(item.id);
        group.price += item.sellPrice;
      } else {
        groups.set(key, { cropId, title: item.title, isGolden: Boolean(item.isGolden), ids: [item.id], price: item.sellPrice });
      }
    });
    return [...groups.values()];
  }, [user.inventory]);

  const countInBarn = (cropId: CropId) =>
    user.inventory.filter(i => resolveCropId(i.cropId, i.title) === cropId).length;
  const orderReady = order.requirements.every(r => countInBarn(r.cropId) >= r.quantity);

  const sellGroup = (ids: string[], title: string, total: number) => {
    ids.forEach(id => sellItem(id));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Sold!', `${ids.length} × ${title} for ${total} seeds.`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* HUD */}
        <View style={styles.hud}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelBadgeLabel}>LV</Text>
            <Text style={styles.levelBadgeValue}>{level}</Text>
          </View>
          <View style={styles.hudMain}>
            <Text style={styles.farmTitle}>{user.name}'s Farm</Text>
            <View style={styles.xpTrack}>
              <View style={[styles.xpFill, { width: `${Math.max(4, levelProgress * 100)}%` }]} />
            </View>
            <Text style={styles.xpLabel}>
              {xpInLevel}/{xpForNextLevel} XP to level {level + 1}
            </Text>
          </View>
        </View>

        <View style={styles.resourceRow}>
          <View style={styles.resourceChip}>
            <PixelIcon name="seed_coin" size={20} />
            <Text style={styles.resourceText}>{user.seeds}</Text>
          </View>
          <View style={styles.resourceChip}>
            <PixelIcon name="water_drop" size={20} />
            <Text style={styles.resourceText}>
              {water.drops}/{water.max}
            </Text>
            {water.msToNext > 0 && (
              <Text style={styles.resourceSub}>+1 in {formatDuration(Math.ceil(water.msToNext / 1000))}</Text>
            )}
          </View>
          <View style={styles.resourceChip}>
            <PixelIcon name="fertilizer" size={20} />
            <Text style={styles.resourceText}>{user.fertilizer}</Text>
          </View>
        </View>

        {/* Tool bar */}
        <View style={styles.toolbar}>
          {TOOLS.map(t => (
            <TouchableOpacity
              key={t.id}
              style={[styles.toolButton, tool === t.id && styles.toolButtonActive]}
              onPress={() => {
                Haptics.selectionAsync();
                setTool(t.id);
              }}
              accessibilityRole="button"
              accessibilityState={{ selected: tool === t.id }}
              accessibilityLabel={`${t.label} tool`}
            >
              <PixelIcon name={t.icon} size={26} />
              <Text style={[styles.toolLabel, tool === t.id && styles.toolLabelActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Farm field */}
        <View style={[styles.field, { width: fieldWidth, padding: FIELD_PADDING }]}>
          <View style={[styles.grid, { gap: GRID_GAP }]}>
            {Array.from({ length: TOTAL_FARM_PLOTS }, (_, plotIndex) => (
              <AnimatedPlotTile
                key={plotIndex}
                plotIndex={plotIndex}
                isUnlocked={plotIndex < user.unlockedPlots}
                isTilled={user.tilledPlots.includes(plotIndex)}
                item={user.garden.find(g => g.plotIndex === plotIndex)}
                now={now}
                tileSize={tileSize}
                effectEvent={effects[plotIndex]}
                onPress={() => handlePlotPress(plotIndex)}
              />
            ))}
          </View>
        </View>

        {ripePlots.length > 1 && (
          <TouchableOpacity style={styles.harvestAllButton} onPress={harvestAll}>
            <PixelIcon name="basket" size={22} />
            <Text style={styles.harvestAllText}>Harvest all ({ripePlots.length})</Text>
          </TouchableOpacity>
        )}

        {/* Seed bag */}
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <PixelIcon name="seed_packet" size={22} />
            <Text style={styles.panelTitle}>Seed Bag</Text>
            <TouchableOpacity onPress={goToShop} style={styles.panelLink}>
              <Text style={styles.panelLinkText}>Buy seeds ›</Text>
            </TouchableOpacity>
          </View>
          {seedsInBag.length === 0 ? (
            <Text style={styles.emptyText}>Your seed bag is empty. Visit the Shop to buy seed packets.</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.seedTray}>
              {seedsInBag.map(crop => {
                const selected = activeSeed === crop.id;
                const mastery = getMasteryInfo(user.harvestCounts[crop.id] ?? 0);
                return (
                  <TouchableOpacity
                    key={crop.id}
                    style={[styles.seedCard, selected && styles.seedCardActive]}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setSelectedSeed(crop.id);
                      setTool(current => (current === 'smart' ? 'smart' : 'plant'));
                    }}
                    accessibilityLabel={`${crop.title} seeds, ${user.seedBag[crop.id]} left`}
                  >
                    <CropPixelSprite cropId={crop.id} size={40} />
                    <Text style={styles.seedName} numberOfLines={1}>{crop.title}</Text>
                    <MasteryStars stars={mastery.stars} size={10} />
                    <View style={styles.seedCount}>
                      <Text style={styles.seedCountText}>×{user.seedBag[crop.id]}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* Order board */}
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <PixelIcon name="crate" size={22} />
            <Text style={styles.panelTitle}>Order Board</Text>
          </View>
          <Text style={styles.orderTitle}>{order.title}</Text>
          <Text style={styles.orderCustomer}>for {order.customerName}</Text>
          <View style={styles.orderReqs}>
            {order.requirements.map(req => {
              const have = countInBarn(req.cropId);
              const met = have >= req.quantity;
              return (
                <View key={req.cropId} style={[styles.orderReq, met && styles.orderReqMet]}>
                  <CropPixelSprite cropId={req.cropId} size={34} />
                  <Text style={styles.orderReqText}>
                    {Math.min(have, req.quantity)}/{req.quantity}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.orderReward}>
            Reward: {order.rewardSeeds} seeds · {order.rewardXp} XP
            {order.rewardFertilizer ? ` · ${order.rewardFertilizer} fertilizer` : ''}
          </Text>
          <View style={styles.orderButtons}>
            <TouchableOpacity
              style={[styles.deliverButton, !orderReady && styles.deliverButtonDisabled]}
              onPress={handleDeliver}
            >
              <Text style={styles.deliverButtonText}>{orderReady ? 'Deliver' : 'Grow the crops'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton} onPress={skipOrder}>
              <Text style={styles.skipButtonText}>New order</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Barn */}
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <PixelIcon name="basket" size={22} />
            <Text style={styles.panelTitle}>Barn</Text>
          </View>
          {barn.length === 0 ? (
            <Text style={styles.emptyText}>Harvested crops are stored here until you sell, cook or deliver them.</Text>
          ) : (
            barn.map(group => (
              <View key={`${group.cropId}:${group.isGolden}`} style={[styles.barnRow, group.isGolden && styles.barnRowGolden]}>
                <CropPixelSprite cropId={group.cropId} size={40} />
                <View style={styles.barnInfo}>
                  <Text style={styles.barnTitle}>
                    {group.isGolden ? '✨ Golden ' : ''}
                    {group.title} ×{group.ids.length}
                  </Text>
                  <Text style={styles.barnPrice}>{Math.round(group.price / group.ids.length)} seeds each</Text>
                </View>
                <TouchableOpacity
                  style={styles.sellButton}
                  onPress={() => sellGroup(group.ids, group.title, group.price)}
                >
                  <Text style={styles.sellButtonText}>Sell {group.price}</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <CraftingArea />
      </ScrollView>
    </SafeAreaView>
  );
}

const PIXEL_FONT = 'SpaceMono';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#CFE8B4',
  },
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
    paddingBottom: 40,
  },
  hud: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5B371C',
    borderWidth: 3,
    borderColor: '#3B2210',
    borderRadius: 8,
    padding: 10,
    gap: 12,
  },
  levelBadge: {
    width: 54,
    height: 54,
    borderRadius: 6,
    backgroundColor: '#FFD54F',
    borderWidth: 3,
    borderColor: '#F9A825',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelBadgeLabel: {
    fontFamily: PIXEL_FONT,
    fontSize: 10,
    color: '#5B371C',
    lineHeight: 12,
  },
  levelBadgeValue: {
    fontFamily: PIXEL_FONT,
    fontSize: 22,
    fontWeight: '700',
    color: '#3B2210',
    lineHeight: 26,
  },
  hudMain: {
    flex: 1,
  },
  farmTitle: {
    fontFamily: PIXEL_FONT,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF8E1',
    marginBottom: 6,
  },
  xpTrack: {
    height: 12,
    backgroundColor: '#2E1A0C',
    borderWidth: 2,
    borderColor: '#8D5A32',
    borderRadius: 3,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#7ED357',
  },
  xpLabel: {
    fontFamily: PIXEL_FONT,
    fontSize: 10,
    color: '#E6D3B8',
    marginTop: 4,
  },
  resourceRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  resourceChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    backgroundColor: '#FFF8E1',
    borderWidth: 2,
    borderColor: '#C9A26B',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  resourceText: {
    fontFamily: PIXEL_FONT,
    fontSize: 14,
    fontWeight: '700',
    color: '#3B2210',
  },
  resourceSub: {
    fontFamily: PIXEL_FONT,
    fontSize: 9,
    color: '#6D4C41',
    width: '100%',
  },
  toolbar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 4,
  },
  toolButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    backgroundColor: '#8D5A32',
    borderWidth: 2,
    borderColor: '#5B371C',
    borderRadius: 6,
  },
  toolButtonActive: {
    backgroundColor: '#FFD54F',
    borderColor: '#F57F17',
    transform: [{ translateY: -2 }],
  },
  toolLabel: {
    fontFamily: PIXEL_FONT,
    fontSize: 9,
    color: '#FFF8E1',
    marginTop: 2,
  },
  toolLabelActive: {
    color: '#3B2210',
    fontWeight: '700',
  },
  field: {
    marginTop: 12,
    backgroundColor: '#5DA548',
    borderWidth: FIELD_BORDER,
    borderColor: '#8D5A32',
    borderRadius: 8,
    shadowColor: '#1B1209',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 0,
    elevation: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  harvestAllButton: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFD54F',
    borderWidth: 3,
    borderColor: '#F57F17',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  harvestAllText: {
    fontFamily: PIXEL_FONT,
    fontSize: 14,
    fontWeight: '700',
    color: '#3B2210',
  },
  panel: {
    width: '100%',
    marginTop: 16,
    backgroundColor: '#FFF8E1',
    borderWidth: 3,
    borderColor: '#C9A26B',
    borderRadius: 8,
    padding: 12,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  panelTitle: {
    fontFamily: PIXEL_FONT,
    fontSize: 16,
    fontWeight: '700',
    color: '#5B371C',
    flex: 1,
  },
  panelLink: {
    paddingVertical: 4,
    paddingLeft: 8,
  },
  panelLinkText: {
    fontFamily: PIXEL_FONT,
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '700',
  },
  emptyText: {
    fontSize: 14,
    color: '#6D4C41',
    lineHeight: 20,
  },
  seedTray: {
    gap: 8,
    paddingVertical: 2,
  },
  seedCard: {
    width: 78,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0CDA9',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 4,
    gap: 2,
  },
  seedCardActive: {
    borderColor: '#2E7D32',
    backgroundColor: '#E8F5E9',
  },
  seedName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3B2210',
  },
  seedCount: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#5B371C',
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  seedCountText: {
    fontFamily: PIXEL_FONT,
    fontSize: 10,
    color: '#FFF8E1',
    fontWeight: '700',
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B2210',
  },
  orderCustomer: {
    fontSize: 13,
    color: '#6D4C41',
    marginBottom: 8,
  },
  orderReqs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  orderReq: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0CDA9',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  orderReqMet: {
    borderColor: '#43A047',
    backgroundColor: '#E8F5E9',
  },
  orderReqText: {
    fontFamily: PIXEL_FONT,
    fontSize: 13,
    fontWeight: '700',
    color: '#3B2210',
  },
  orderReward: {
    fontSize: 13,
    color: '#5B371C',
    fontWeight: '600',
  },
  orderButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  deliverButton: {
    flex: 1,
    backgroundColor: '#43A047',
    borderWidth: 2,
    borderColor: '#2E7D32',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  deliverButtonDisabled: {
    backgroundColor: '#A5A58D',
    borderColor: '#8A8A73',
  },
  deliverButtonText: {
    fontFamily: PIXEL_FONT,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  skipButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#C9A26B',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    fontFamily: PIXEL_FONT,
    fontSize: 12,
    color: '#5B371C',
  },
  barnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0CDA9',
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
  },
  barnRowGolden: {
    borderColor: '#FFD54F',
    backgroundColor: '#FFFDE7',
  },
  barnInfo: {
    flex: 1,
  },
  barnTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3B2210',
  },
  barnPrice: {
    fontSize: 12,
    color: '#6D4C41',
  },
  sellButton: {
    backgroundColor: '#F9A825',
    borderWidth: 2,
    borderColor: '#F57F17',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  sellButtonText: {
    fontFamily: PIXEL_FONT,
    fontSize: 12,
    fontWeight: '700',
    color: '#3B2210',
  },
});
