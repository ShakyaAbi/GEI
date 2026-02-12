/**
 * Image Optimization Utilities
 * Provides functions to optimize image loading across different devices
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "jpg" | "png";
}

/**
 * Generate responsive image srcset with different quality levels
 */
export const generateImageSrcset = (
  imagePath: string,
  widths: number[] = [320, 640, 960, 1280, 1920],
): string => {
  return widths.map((width) => `${imagePath}?w=${width} ${width}w`).join(", ");
};

/**
 * Ensure image path is absolute with proper origin
 */
export const normalizeImagePath = (path: string): string => {
  if (!path) return "/faculty/placeholder.jpg";

  // Already absolute URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Prefer same-origin for public assets; use API origin for uploads.
  const apiUrl =
    typeof window !== "undefined" ? import.meta.env.VITE_API_URL : "";
  const apiBase = apiUrl ? apiUrl.replace(/\/api\/?$/, "") : "";
  const siteBase = typeof window !== "undefined" ? window.location.origin : "";

  // Already has leading slash - choose the right origin
  if (path.startsWith("/")) {
    const useApiBase = path.startsWith("/uploads/") || path.startsWith("/api/");
    const origin = useApiBase ? apiBase : siteBase;
    return origin ? `${origin}${path}` : path;
  }

  // Add leading slash and make absolute
  const normalizedPath = `/${path}`;
  const useApiBase =
    normalizedPath.startsWith("/uploads/") ||
    normalizedPath.startsWith("/api/");
  const origin = useApiBase ? apiBase : siteBase;
  return origin ? `${origin}${normalizedPath}` : normalizedPath;
};

/**
 * Get optimized image URL with fallback
 */
export const getOptimizedImageUrl = (
  imagePath: string,
  options: ImageOptimizationOptions = {},
): string => {
  const normalized = normalizeImagePath(imagePath);

  // For external images, return as is
  if (normalized.startsWith("http")) {
    return normalized;
  }

  // Build query parameters for local optimization
  const params = new URLSearchParams();
  if (options.width) params.append("w", options.width.toString());
  if (options.height) params.append("h", options.height.toString());
  if (options.quality) params.append("q", options.quality.toString());
  if (options.format) params.append("f", options.format);

  const queryString = params.toString();
  return queryString ? `${normalized}?${queryString}` : normalized;
};

/**
 * Preload image with retry logic
 */
export const preloadImage = (src: string, retries = 3): Promise<void> => {
  return new Promise((resolve, reject) => {
    const attemptLoad = (attemptsLeft: number) => {
      const img = new Image();

      img.onload = () => resolve();

      img.onerror = () => {
        if (attemptsLeft > 0) {
          setTimeout(() => attemptLoad(attemptsLeft - 1), 1000);
        } else {
          reject(
            new Error(`Failed to load image after ${retries} attempts: ${src}`),
          );
        }
      };

      img.src = normalizeImagePath(src);
    };

    attemptLoad(retries);
  });
};

/**
 * Check if WebP is supported
 */
export const isWebpSupported = (): boolean => {
  if (typeof document === "undefined") return false;

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  try {
    return canvas.toDataURL("image/webp").indexOf("image/webp") === 5;
  } catch {
    return false;
  }
};

/**
 * Get network speed for adaptive image loading
 */
export const getNetworkInfo = (): {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
} => {
  if ("connection" in navigator) {
    const conn = (navigator as any).connection;
    return {
      effectiveType: conn.effectiveType || "4g",
      downlink: conn.downlink || 10,
      rtt: conn.rtt || 0,
      saveData: conn.saveData || false,
    };
  }

  return {
    effectiveType: "4g",
    downlink: 10,
    rtt: 0,
    saveData: false,
  };
};

/**
 * Determine optimal image quality based on network
 */
export const getOptimalQuality = (): number => {
  const { effectiveType, saveData } = getNetworkInfo();

  if (saveData) return 60;
  if (effectiveType === "slow-2g" || effectiveType === "2g") return 60;
  if (effectiveType === "3g") return 75;
  if (effectiveType === "4g") return 90;

  return 85;
};

/**
 * Create a lazy-loading image component helper
 */
export const createLazyImageObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
) => {
  if (typeof window === "undefined") return null;

  const options = {
    root: null,
    rootMargin: "50px",
    threshold: 0.01,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, options);
};
