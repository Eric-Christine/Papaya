import React from 'react';
import GardenSprite, { GardenSpriteProps } from '../ui/GardenSprite';

export default function Fertilizer(props: GardenSpriteProps) {
  return (
    <GardenSprite
      source={require('../../assets/images/garden/fertilizer.png')}
      accessibilityLabel="Fertilizer" width={60} height={60}
      {...props}
    />
  );
}
