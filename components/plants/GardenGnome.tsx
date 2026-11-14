import React from 'react';
import GardenSprite, { GardenSpriteProps } from '../ui/GardenSprite';

export default function GardenGnome(props: GardenSpriteProps) {
  return (
    <GardenSprite
      source={require('../../assets/images/garden/garden-gnome.png')}
      accessibilityLabel="Garden Gnome"
      {...props}
    />
  );
}
