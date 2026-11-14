import React from 'react';
import GardenSprite, { GardenSpriteProps } from '../ui/GardenSprite';

export default function Orchid(props: GardenSpriteProps) {
  return (
    <GardenSprite
      source={require('../../assets/images/garden/orchid.png')}
      accessibilityLabel="Orchid"
      {...props}
    />
  );
}
