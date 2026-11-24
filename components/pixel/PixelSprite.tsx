import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { CropId, GrowthStage } from '../../app/types/garden';
import PixelCanvas from './PixelCanvas';
import { getCropStageAsset, PIXEL_ICONS, PixelIconName, PLOT_TILES } from './cropSprites';

export const PlotTileBase: React.FC<{
  state: 'grass' | 'dry' | 'wet' | 'locked';
  size?: number;
  style?: StyleProp<ViewStyle>;
}> = React.memo(({ state, size = 84, style }) => {
  return <PixelCanvas asset={PLOT_TILES[state]} size={size} style={style} />;
});

PlotTileBase.displayName = 'PlotTileBase';

export const CropPixelSprite: React.FC<{
  cropId: CropId;
  stage?: GrowthStage;
  size?: number;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
}> = React.memo(({ cropId, stage = 'ripe', size = 48, style, opacity = 1 }) => {
  const asset = getCropStageAsset(cropId, stage);
  return <PixelCanvas asset={asset} size={size} style={style} opacity={opacity} />;
});

CropPixelSprite.displayName = 'CropPixelSprite';

export const PixelIcon: React.FC<{
  name: PixelIconName;
  size?: number;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
}> = React.memo(({ name, size = 24, style, opacity = 1 }) => {
  return <PixelCanvas asset={PIXEL_ICONS[name]} size={size} style={style} opacity={opacity} />;
});

PixelIcon.displayName = 'PixelIcon';

export const MasteryStars: React.FC<{
  stars: number;
  size?: number;
}> = React.memo(({ stars, size = 14 }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3].map(idx => (
        <PixelIcon
          key={idx}
          name={stars >= idx ? 'star_filled' : 'star_empty'}
          size={size}
        />
      ))}
    </View>
  );
});

MasteryStars.displayName = 'MasteryStars';
