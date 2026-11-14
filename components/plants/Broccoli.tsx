import React from 'react';
import GardenSprite, { GardenSpriteProps } from '../ui/GardenSprite';

export default function Broccoli(props: GardenSpriteProps) {
  return (
    <GardenSprite
      source={require('../../assets/images/garden/broccoli.png')}
      accessibilityLabel="Broccoli"
      {...props}
    />
  );
}
