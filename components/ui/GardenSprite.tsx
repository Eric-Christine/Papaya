import React from 'react';
import { Image, ImageProps } from 'react-native';

export type GardenSpriteProps = Omit<ImageProps, 'source'>;

// Local PNG sources are bundled by Metro for offline garden and shop displays.
export default function GardenSprite({
  width = 100,
  height = 100,
  style,
  resizeMode = 'contain',
  ...props
}: ImageProps) {
  return (
    <Image
      {...props}
      resizeMode={resizeMode}
      style={[{ width, height }, style]}
    />
  );
}
