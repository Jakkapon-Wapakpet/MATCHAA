// Standard High-Quality MatchA Image Fallback Placeholder (Minimalist Artisan Garment)
export const DEFAULT_PRODUCT_FALLBACK = '/images/products/autumn/tops/jackets/color_1_brown.jpeg';

export const handleImageError = (e, fallback = DEFAULT_PRODUCT_FALLBACK) => {
  if (e?.target && e.target.src !== fallback) {
    e.target.onerror = null; // Prevent infinite loop if fallback fails
    e.target.src = fallback;
  }
};
