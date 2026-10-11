export interface JournalArticle {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  summary: string;
  content: string[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: 'the-art-of-fragrance-concentration',
    title: 'The Architecture of Scent: Understanding Concentrations',
    subtitle: 'From Eau de Cologne to Pure Parfum, decoding longevity, sillage, and oil density.',
    date: 'October 2026',
    readTime: '5 min read',
    category: 'Fragrance',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
    summary: 'A perfume’s endurance is not merely a matter of quantity applied, but of aromatic molecular weight and resinous suspension.',
    content: [
      'When exploring artisanal fragrances, one frequently encounters classifications such as Eau de Toilette (EDT), Eau de Parfum (EDP), and Extrait de Parfum. Far from marketing jargon, these terms denote the precise ratio of aromatic fragrance oils dissolved in high-grade perfumer’s alcohol.',
      'Eau de Parfum, typically calibrated between 15% to 20% aromatic concentration, represents an ideal balance for connoisseurs. It provides sufficient projection without overpowering intimate quarters, lingering on textiles and warm skin for six to ten hours.',
      'To maximize sillage, apply directly to pulse points—the warm hollow of the collarbone, the inside wrists, and behind the earlobes. Avoid rubbing wrists together, as thermal friction disrupts volatile top notes before they naturally unfold.'
    ]
  },
  {
    slug: 'demystifying-watch-case-proportions',
    title: 'The Collector’s Wrist: Choosing the Right Case Diameter',
    subtitle: 'Why lug-to-lug distance matters more than dial millimeters in horological elegance.',
    date: 'September 2026',
    readTime: '6 min read',
    category: 'Horology',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
    summary: 'Proportion in horology is rooted in wrist curvature rather than brute millimeter dimensions.',
    content: [
      'A common misconception among watch enthusiasts is selecting a timepiece solely based on case diameter (such as 39 mm, 41 mm, or 44 mm). In practice, the critical metric determining comfort and aesthetic balance is the lug-to-lug distance.',
      'If the case lugs overhang the edges of your wrist, the watch appears unbalanced and ungainly regardless of its provenance. Conversely, a 41 mm diver like the Submariner fits comfortably on a 6.75-inch wrist due to curved, downward-sweeping lug geometry that hugs the anatomy.',
      'For formal tailoring, a profile below 12 mm thickness slides effortlessly beneath a double cuff, while tool and sports watches can assertively accommodate up to 13.5 mm.'
    ]
  },
  {
    slug: 'caring-for-full-grain-leather',
    title: 'Patina and Preservation: Caring for Nappa Leather',
    subtitle: 'How considered maintenance transforms natural hide into an heirloom garment.',
    date: 'August 2026',
    readTime: '4 min read',
    category: 'Craftsmanship',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
    summary: 'Authentic leather is an organic material that breathes, adapts, and gains character over seasons.',
    content: [
      'Full-grain Nappa leather represents the pinnacle of tactile luxury. Because the natural grain surface remains unbuffed and uncorrected, each skin bears subtle grain variations that deepen with age.',
      'To preserve suppleness, always hang leather outerwear on contoured wide wooden hangers rather than wire frames. Store in breathable cotton garment covers rather than synthetic plastic, which can trap ambient moisture and cause mildew.',
      'Should your jacket encounter unexpected rain, do not apply direct heat from radiators or hair dryers. Allow it to air-dry naturally at ambient room temperature, and apply a light beeswax or lanolin-based conditioner annually.'
    ]
  }
];
