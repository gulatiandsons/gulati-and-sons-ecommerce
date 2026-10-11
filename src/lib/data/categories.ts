export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  heroHeading: string;
  heroSubheading: string;
  description: string;
  image: string;
  productCount: number;
  subcategories: { name: string; slug: string }[];
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-fragrance',
    name: 'Fragrance',
    slug: 'fragrances',
    heroHeading: 'The Fragrance Collection.',
    heroSubheading: 'A Presence That Lingers.',
    description: 'Explore signature compositions, from smoked resinous ouds and rich ambers to sun-lit citrus and delicate floral extracts.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85',
    productCount: 1,
    subcategories: [
      { name: 'All Fragrances', slug: 'all' },
      { name: 'Eau de Parfum', slug: 'eau-de-parfum' },
      { name: 'Woody & Amber', slug: 'woody-amber' },
      { name: 'Fresh & Citrus', slug: 'fresh-citrus' },
      { name: 'Evening Sillage', slug: 'evening' }
    ]
  },
  {
    id: 'cat-watches',
    name: 'Timepieces',
    slug: 'watches',
    heroHeading: 'The Timepiece Collection.',
    heroSubheading: 'Time, Well Spent.',
    description: 'Precision engineering, distinguished case architectures, and horological heritage designed to anchor every hour.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
    productCount: 1,
    subcategories: [
      { name: 'All Timepieces', slug: 'all' },
      { name: 'Luxury Sports', slug: 'sports' },
      { name: 'Dress Chronographs', slug: 'dress' },
      { name: 'Precious Metals', slug: 'precious-metals' }
    ]
  },
  {
    id: 'cat-essentials',
    name: 'Daily Essentials',
    slug: 'essentials',
    heroHeading: 'The Everyday Collection.',
    heroSubheading: 'The Details Make the Difference.',
    description: 'Elevated grooming rituals, aluminum-free body care, and refined daily formulations crafted with considered restraint.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85',
    productCount: 1,
    subcategories: [
      { name: 'All Essentials', slug: 'all' },
      { name: 'Deodorants & Sprays', slug: 'deodorants' },
      { name: 'Grooming Tools', slug: 'grooming' },
      { name: 'Travel Sets', slug: 'travel' }
    ]
  },
  {
    id: 'cat-clothing',
    name: 'Clothing',
    slug: 'clothing',
    heroHeading: 'The Atelier Collection.',
    heroSubheading: 'Objects of Character.',
    description: 'Architectural silhouettes, supple natural leathers, and tailored essentials built to weather time.',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
    productCount: 1,
    subcategories: [
      { name: 'All Outerwear', slug: 'all' },
      { name: 'Leather Jackets', slug: 'leather-jackets' },
      { name: 'Tailored Knitwear', slug: 'knitwear' }
    ]
  }
];
