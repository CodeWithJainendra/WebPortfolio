import React, { useEffect, useRef } from 'react';

type Props = {
  imageUrl: string;
  className?: string;
  width?: number;
  height?: number;
};

// Utility to clamp values
const clamp = (v: number, min = 0, max = 255) => Math.max(min, Math.min(max, v));

// Generate a random style configuration each mount
function randomStyleConfig() {
  const levels = [3, 4, 5, 6];
  const quantLevels = levels[Math.floor(Math.random() * levels.length)];
  return {
    quantLevels,
    warmth: 0.06 + Math.random() * 0.12, // increase reds/yellows
    coolness: 0.02 + Math.random() * 0.05, // slightly reduce blues
    saturationBoost: 0.05 + Math.random() * 0.15,
    grainAmount: 6 + Math.floor(Math.random() * 14),
    edgeThreshold: 24 + Math.floor(Math.random() * 24),
    blurPasses: 0 + Math.floor(Math.random() * 2),
    vignetteStrength: 0.15 + Math.random() * 0.25,
  };
}

export default function GhibliStylizer({ imageUrl, className, width = 320, height = 320 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const style = randomStyleConfig();

    img.onload = () => {
      // Fit image into canvas while preserving aspect ratio
      const scale = Math.min(width / img.width, height / img.height);
      const drawW = Math.max(1, Math.floor(img.width * scale));
      const drawH = Math.max(1, Math.floor(img.height * scale));
      const dx = Math.floor((width - drawW) / 2);
      const dy = Math.floor((height - drawH) / 2);

      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, dx, dy, drawW, drawH);

      try {
        let imageData = ctx.getImageData(0, 0, width, height);
        let data = imageData.data;

        // Optional: quick blur passes for watercolor softness
        const blur = () => {
          const tmp = ctx.createImageData(imageData);
          const td = tmp.data;
          const w = width;
          const h = height;
          const kernel = [1, 2, 1, 2, 4, 2, 1, 2, 1];
          const ksum = kernel.reduce((a, b) => a + b, 0);
          for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
              let r = 0, g = 0, b = 0;
              let i = 0;
              for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                  const idx = ((y + ky) * w + (x + kx)) * 4;
                  r += data[idx] * kernel[i];
                  g += data[idx + 1] * kernel[i];
                  b += data[idx + 2] * kernel[i];
                  i++;
                }
              }
              const idx = (y * w + x) * 4;
              td[idx] = r / ksum;
              td[idx + 1] = g / ksum;
              td[idx + 2] = b / ksum;
              td[idx + 3] = data[idx + 3];
            }
          }
          imageData = tmp;
          data = imageData.data;
        };

        for (let p = 0; p < style.blurPasses; p++) blur();

        // Posterize and color grading
        const step = Math.floor(255 / Math.max(2, style.quantLevels));
        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];

          // Posterize
          r = Math.floor(r / step) * step;
          g = Math.floor(g / step) * step;
          b = Math.floor(b / step) * step;

          // Warmth and saturation tweaks
          r = clamp(r + r * style.warmth);
          g = clamp(g + g * (style.warmth * 0.5));
          b = clamp(b - b * style.coolness);

          const avg = (r + g + b) / 3;
          r = clamp(r + (r - avg) * style.saturationBoost);
          g = clamp(g + (g - avg) * style.saturationBoost);
          b = clamp(b + (b - avg) * style.saturationBoost);

          // Grain
          const grain = (Math.random() - 0.5) * style.grainAmount;
          r = clamp(r + grain);
          g = clamp(g + grain);
          b = clamp(b + grain);

          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
        }

        // Simple edge emphasize (cartoon outlines)
        const w = width;
        const h = height;
        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = (y * w + x) * 4;
            const idxR = (y * w + (x + 1)) * 4;
            const idxD = ((y + 1) * w + x) * 4;
            const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
            const lumR = 0.299 * data[idxR] + 0.587 * data[idxR + 1] + 0.114 * data[idxR + 2];
            const lumD = 0.299 * data[idxD] + 0.587 * data[idxD + 1] + 0.114 * data[idxD + 2];
            const edge = Math.abs(lum - lumR) + Math.abs(lum - lumD);
            if (edge > style.edgeThreshold) {
              // darken for outline
              data[idx] = clamp(data[idx] * 0.6);
              data[idx + 1] = clamp(data[idx + 1] * 0.6);
              data[idx + 2] = clamp(data[idx + 2] * 0.6);
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);

        // Vignette
        const grad = ctx.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.2, width / 2, height / 2, Math.max(width, height) * 0.7);
        grad.addColorStop(0, `rgba(0,0,0,0)`);
        grad.addColorStop(1, `rgba(0,0,0,${style.vignetteStrength})`);
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
      } catch (e) {
        // If anything fails, keep original image drawn
        console.warn('Stylization failed, showing original image', e);
      }
    };
  }, [imageUrl, width, height]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-lg w-full h-auto shadow-xl"
      />
    </div>
  );
}