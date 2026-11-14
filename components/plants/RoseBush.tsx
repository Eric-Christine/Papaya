import React from 'react';
import GardenSprite, { GardenSpriteProps } from '../ui/GardenSprite';

export default function RoseBush(props: GardenSpriteProps) {
  return (
    <GardenSprite
      source={require('../../assets/images/garden/rose-bush.png')}
      accessibilityLabel="Rose Bush"
      {...props}
    />
  );
}
