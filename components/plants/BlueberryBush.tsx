import React from 'react';
import GardenSprite, { GardenSpriteProps } from '../ui/GardenSprite';

export default function BlueberryBush(props: GardenSpriteProps) {
  return (
    <GardenSprite
      source={require('../../assets/images/garden/blueberry-bush.png')}
      accessibilityLabel="Blueberry Bush"
      {...props}
    />
  );
}
