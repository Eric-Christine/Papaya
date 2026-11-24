import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

export type PixelPalette = Record<string, string>;

export type PixelGridAsset = {
  grid: string[];
  palette: PixelPalette;
};

type MergedRect = {
  x: number;
  y: number;
  w: number;
  fill: string;
};

function compileGrid(grid: string[], palette: PixelPalette): { width: number; height: number; rects: MergedRect[] } {
  const height = grid.length;
  const width = height > 0 ? grid[0].length : 16;
  const rects: MergedRect[] = [];

  for (let y = 0; y < height; y++) {
    const row = grid[y];
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      const fill = ch === '.' || ch === ' ' ? undefined : palette[ch];
      if (!fill) {
        x++;
        continue;
      }
      let run = 1;
      while (x + run < row.length && row[x + run] === ch) {
        run++;
      }
      rects.push({ x, y, w: run, fill });
      x += run;
    }
  }

  return { width, height, rects };
}

type PixelCanvasProps = {
  asset: PixelGridAsset;
  size?: number;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
};

const PixelCanvas: React.FC<PixelCanvasProps> = React.memo(
  ({ asset, size = 48, width, height, style, opacity = 1 }) => {
    const compiled = useMemo(
      () => compileGrid(asset.grid, asset.palette),
      [asset]
    );

    const w = width ?? size;
    const h = height ?? size;

    return (
      <Svg
        width={w}
        height={h}
        viewBox={`0 0 ${compiled.width} ${compiled.height}`}
        style={style}
        opacity={opacity}
      >
        {compiled.rects.map((r, idx) => (
          <Rect
            key={idx}
            x={r.x}
            y={r.y}
            // Overlap neighbours slightly so anti-aliasing leaves no hairline seams
            width={r.w + 0.04}
            height={1.04}
            fill={r.fill}
          />
        ))}
      </Svg>
    );
  }
);

PixelCanvas.displayName = 'PixelCanvas';

export default PixelCanvas;
