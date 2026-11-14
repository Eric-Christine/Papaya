import React from 'react';
import GardenSprite, { GardenSpriteProps } from '../ui/GardenSprite';

export default function Zucchini(props: GardenSpriteProps) {
  return (
    <GardenSprite
      source={require('../../assets/images/garden/zucchini.png')}
      accessibilityLabel="Zucchini"
      {...props}
    />
  );
}
