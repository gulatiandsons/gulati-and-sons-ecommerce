/**
 * Image Optimization and Transformation Utility
 * Gulati & Sons Luxury Commerce
 */

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  cropMode?: 'maintain_ratio' | 'force' | 'pad_resize';
}

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80';

/**
 * Transforms an image URL with responsive sizing and optimization parameters
 */
export function getOptimizedImageUrl(
  src: string | undefined | null,
  options: ImageTransformOptions = {}
): string {
  if (!src || typeof src !== 'string' || src.trim() === '') {
    return DEFAULT_FALLBACK_IMAGE;
  }

  const {
    width,
    height,
    quality = 85,
    format = 'auto'
  } = options;

  // Local assets (e.g. /images/..., /logo-nav.png)
  if (src.startsWith('/')) {
    return src;
  }

  // ImageKit transformations
  if (src.includes('ik.imagekit.io')) {
    const trParts: string[] = [];
    if (width) trParts.push(`w-${width}`);
    if (height) trParts.push(`h-${height}`);
    if (quality) trParts.push(`q-${quality}`);
    if (format) trParts.push(`f-${format}`);

    const trString = trParts.length > 0 ? `tr=${trParts.join(',')}` : '';
    if (!trString) return src;

    // Check if URL already has query parameters or transformation path
    const url = new URL(src);
    if (url.search) {
      url.searchParams.set('tr', trParts.join(','));
      return url.toString();
    }
    return `${src}?${trString}`;
  }

  // Unsplash image transformation handling
  if (src.includes('images.unsplash.com')) {
    try {
      const url = new URL(src);
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      if (quality) url.searchParams.set('q', quality.toString());
      if (format === 'auto') url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      return url.toString();
    } catch {
      return src;
    }
  }

  return src;
}
