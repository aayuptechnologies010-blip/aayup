import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Optimizes Supabase image URLs by adding transformation parameters
 * @param url - Original Supabase image URL
 * @param width - Desired width
 * @param quality - Image quality (1-100)
 * @returns Optimized image URL
 */
export function optimizeSupabaseImage(
  url: string | null | undefined,
  width: number = 200,
  quality: number = 75
): string | null {
  if (!url) return null;

  // Check if it's a Supabase URL
  if (!url.includes("supabase.co")) return url;

  try {
    const urlObj = new URL(url);
    // Add transformation parameters for better optimization
    urlObj.searchParams.set("width", width.toString());
    urlObj.searchParams.set("height", width.toString()); // Maintain aspect ratio
    urlObj.searchParams.set("quality", quality.toString());
    urlObj.searchParams.set("format", "webp");
    urlObj.searchParams.set("resize", "cover"); // Better resize algorithm
    return urlObj.toString();
  } catch (e) {
    return url;
  }
}

/**
 * Debounce function to limit execution rate
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
