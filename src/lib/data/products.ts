import { Product } from '@/types';

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-oud-gold',
    name: 'Bella Vita Luxury OUD Gold Eau de Parfum',
    slug: 'bella-vita-luxury-oud-gold-eau-de-parfum',
    sku: 'GS-PERF-OUD-01',
    brand: 'Bella Vita Luxury',
    category: 'fragrances',
    categoryLabel: 'Fragrance',
    mrp: 3499,
    price: 2499,
    discountPercent: 28,
    stock: 24,
    lowStockThreshold: 5,
    unit: '50 ml',
    weight: '320 g',
    status: 'active',
    shortDescription: 'A rich, resinous oud fragrance tempered with amber, caramel, and velvety florals.',
    description: 'Bella Vita Luxury OUD Gold Eau de Parfum is an evocative woody-oriental fragrance that opens with nuanced sweetness and dries down to deep ambergris and aged woods. Housed in a heavy-base crystal flacon with gold-toned accents, this fragrance offers an imposing yet refined presence suited for evening occasions and discerning everyday wear.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85',
        alt: 'Bella Vita Luxury OUD Gold Eau de Parfum on stone surface',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
        alt: 'Fragrance bottle detail with warm directional light'
      },
      {
        url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
        alt: 'Luxury perfume packaging and textured paper presentation'
      }
    ],
    isDemonstration: false,
    isIndexable: true,
    variants: [
      {
        id: 'var-oud-50ml',
        title: '50 ml',
        sku: 'GS-PERF-OUD-50',
        price: 2499,
        stock: 18,
        attributes: { Volume: '50 ml' }
      },
      {
        id: 'var-oud-100ml',
        title: '100 ml',
        sku: 'GS-PERF-OUD-100',
        price: 3999,
        stock: 6,
        attributes: { Volume: '100 ml' }
      }
    ],
    features: [
      {
        name: 'Top Notes',
        explanation: 'Caramel, Sun-drenched Bergamot, and Sweet Citrus Nuances'
      },
      {
        name: 'Heart Notes',
        explanation: 'Damascus Rose, Florentine Orris, and Smoked Oud Wood'
      },
      {
        name: 'Base Notes',
        explanation: 'Rich Ambergris, Bourbon Vanilla, Cedar, and White Musk'
      },
      {
        name: 'Concentration',
        explanation: 'Eau de Parfum (High oil concentration for extended sillage)'
      }
    ],
    specifications: {
      'Category': 'Eau de Parfum',
      'Net Volume': '50 ml / 1.7 fl. oz.',
      'Scent Profile': 'Woody Oriental / Amber Oud',
      'Application': 'Vaporisateur Natural Spray',
      'Country of Origin': 'India',
      'Shelf Life': '36 Months from manufacturing date'
    },
    careInstructions: 'Store in a cool, dry place away from direct sunlight and temperature fluctuations. Keep bottle upright and firmly capped.',
    deliveryInfo: 'Dispatched in signature protective padded hardboard casing. Pan-India shipping typically completes within 3 to 6 business days.',
    seoTitle: 'Bella Vita Luxury OUD Gold Eau de Parfum | Gulati & Sons',
    seoDescription: 'Discover Bella Vita Luxury OUD Gold Eau de Parfum at Gulati & Sons. A refined woody-amber oud fragrance with caramel and vanilla accents.',
    tags: ['perfume', 'oud', 'fragrance', 'eau de parfum', 'luxury', 'bella vita'],
    rating: 4.8,
    reviewCount: 38,
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-10-10T12:00:00Z'
  },
  {
    id: 'prod-rolex-submariner',
    name: 'Rolex Submariner Date, Reference 126613LN',
    slug: 'rolex-submariner-date-126613ln',
    sku: 'GS-WTCH-SUB-126613',
    brand: 'Rolex',
    category: 'watches',
    categoryLabel: 'Timepieces',
    mrp: 1480000,
    price: 1420000,
    discountPercent: 4,
    stock: 2,
    lowStockThreshold: 1,
    unit: '41 mm',
    weight: '175 g',
    status: 'active',
    shortDescription: 'Two-tone 18 ct yellow gold and Oystersteel luxury sports timepiece with black Cerachrom bezel.',
    description: 'The Submariner Date Reference 126613LN exemplifies the iconic divers’ watch aesthetic, combining high-grade Oystersteel with lustrous 18 ct yellow gold (Rolesor). Featuring a unidirectional rotatable bezel with a black Cerachrom ceramic disc, high-contrast Chromalight luminescent display, and a solid-link Oyster bracelet fitted with the Oysterlock safety clasp and Glidelock extension system.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
        alt: 'Luxury two-tone gold and steel sports watch on dark walnut surface',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
        alt: 'Close-up of luxury black dial with gold bezel detailing'
      },
      {
        url: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85',
        alt: 'Precision timepiece bracelet links and clasp macro composition'
      }
    ],
    isDemonstration: true,
    disclaimer: 'DEMONSTRATION & PROTOTYPE CATALOG LISTING ONLY: Gulati & Sons is not an authorized Rolex retailer and does not claim official affiliation or trademark ownership with Rolex S.A. This entry serves to demonstrate our curated luxury timepiece viewing experience and is not verified inventory or an active public sales offer.',
    isIndexable: false, // Strict SEO compliance requirement
    variants: [
      {
        id: 'var-sub-41mm',
        title: '41 mm · Oystersteel & 18 ct Yellow Gold',
        sku: 'GS-WTCH-SUB-41',
        price: 1420000,
        stock: 2,
        attributes: { 'Case Size': '41 mm', 'Material': 'Yellow Rolesor' }
      }
    ],
    features: [
      {
        name: 'Case Architecture',
        explanation: '41 mm Oyster case in Oystersteel and 18 ct Yellow Gold'
      },
      {
        name: 'Cerachrom Bezel',
        explanation: 'Unidirectional rotatable 60-minute graduated, scratch-resistant ceramic disc'
      },
      {
        name: 'Movement',
        explanation: 'Perpetual, mechanical, self-winding calibre with precision traverse bridge'
      },
      {
        name: 'Winding Crown',
        explanation: 'Screw-down, Triplock triple waterproofness system'
      }
    ],
    specifications: {
      'Model Reference': '126613LN',
      'Case Diameter': '41 mm',
      'Material': 'Yellow Rolesor (Oystersteel and 18 ct yellow gold)',
      'Dial': 'Intense Black with Chromalight display',
      'Crystal': 'Scratch-resistant sapphire with Cyclops lens over the date',
      'Bracelet': 'Oyster, flat three-piece links with folding Oysterlock safety clasp',
      'Water Resistance': 'Waterproof to 300 metres / 1,000 feet'
    },
    careInstructions: 'Clean periodically with a microfiber cloth and lukewarm soapy water. Store in a dedicated padded watch winder or lined wooden presentation box.',
    deliveryInfo: 'High-value courier delivery with full transit insurance, secured verification upon handover, and tamper-evident seal.',
    seoTitle: 'Rolex Submariner Date 126613LN [Prototype Catalog Demo] | Gulati & Sons',
    seoDescription: 'Demonstration catalog view of the Submariner Date Reference 126613LN in Yellow Rolesor at Gulati & Sons.',
    tags: ['watch', 'timepiece', 'submariner', 'rolesor', 'luxury sports watch', 'demonstration'],
    rating: 5.0,
    reviewCount: 12,
    createdAt: '2026-01-15T09:30:00Z',
    updatedAt: '2026-10-10T12:00:00Z'
  },
  {
    id: 'prod-leather-jacket',
    name: 'Heritage Nappa Leather Moto Jacket',
    slug: 'heritage-nappa-leather-moto-jacket',
    sku: 'GS-CLTH-JKT-01',
    brand: 'Gulati & Sons Atelier',
    category: 'clothing',
    categoryLabel: 'Clothing',
    mrp: 18999,
    price: 14999,
    discountPercent: 21,
    stock: 15,
    lowStockThreshold: 3,
    unit: 'Size S to XXL',
    weight: '1,450 g',
    status: 'active',
    shortDescription: 'Black slim fit utility moto jacket in supple full-grain Nappa leather with four patch pockets.',
    description: 'The Heritage Nappa Leather Moto Jacket bridges classic utility tailoring with contemporary British estate poise. Crafted from hand-selected, buttery-soft full-grain Nappa leather in deep ink-black, it features a clean flat shirt-style collar, four symmetrical front flap-patch pockets, tonal heavy stitching, soft breathable cupro-viscose lining, and understated gunmetal hardware.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85',
        alt: 'Black tailored leather jacket on wooden hanger with textured wall background',
        isMain: true
      },
      {
        url: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=85',
        alt: 'Close-up of jacket grain, collar, and gunmetal snap button detail'
      },
      {
        url: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=85',
        alt: 'Lifestyle view of gentleman wearing slim-fit black leather moto jacket'
      }
    ],
    isDemonstration: false,
    isIndexable: true,
    variants: [
      {
        id: 'var-jkt-s',
        title: 'Size S (38)',
        sku: 'GS-CLTH-JKT-S',
        price: 14999,
        stock: 3,
        attributes: { Size: 'S (Chest 38")' }
      },
      {
        id: 'var-jkt-m',
        title: 'Size M (40)',
        sku: 'GS-CLTH-JKT-M',
        price: 14999,
        stock: 5,
        attributes: { Size: 'M (Chest 40")' }
      },
      {
        id: 'var-jkt-l',
        title: 'Size L (42)',
        sku: 'GS-CLTH-JKT-L',
        price: 14999,
        stock: 4,
        attributes: { Size: 'L (Chest 42")' }
      },
      {
        id: 'var-jkt-xl',
        title: 'Size XL (44)',
        sku: 'GS-CLTH-JKT-XL',
        price: 14999,
        stock: 2,
        attributes: { Size: 'XL (Chest 44")' }
      },
      {
        id: 'var-jkt-xxl',
        title: 'Size XXL (46)',
        sku: 'GS-CLTH-JKT-XXL',
        price: 14999,
        stock: 1,
        attributes: { Size: 'XXL (Chest 46")' }
      }
    ],
    features: [
      {
        name: 'Full-Grain Nappa Leather',
        explanation: 'Supple, glove-soft natural leather that develops an authentic patina with wear'
      },
      {
        name: 'Four Utility Pockets',
        explanation: 'Two chest flap pockets and two waist welt-patch pockets for refined utility'
      },
      {
        name: 'Shirt-Style Collar',
        explanation: 'Structured flat collar designed to be worn open or cleanly buttoned'
      },
      {
        name: 'Lining & Comfort',
        explanation: 'Smooth breathable cupro-viscose interior lining for effortless layering'
      }
    ],
    specifications: {
      'Shell Material': '100% Genuine Full-Grain Nappa Leather',
      'Body & Sleeve Lining': '100% Breathable Cupro-Viscose Blend',
      'Closure': 'Full-length heavy-duty two-way zipper with storm flap',
      'Hardware': 'Brushed Gunmetal / Antiqued Silver snap buttons',
      'Fit': 'Tailored slim cut (True to size for standard fit; size up for heavy knit layering)',
      'Origin': 'Handcrafted in specialized leather ateliers'
    },
    careInstructions: 'Specialist leather clean only. Hang on wide contoured wooden hanger. Avoid direct moisture, rain, or prolonged heat exposure.',
    deliveryInfo: 'Includes breathable cotton dust bag and cedar garment hanger. Dispatched in structured wardrobe packaging.',
    seoTitle: 'Heritage Nappa Leather Moto Jacket | Gulati & Sons',
    seoDescription: 'Handcrafted black slim-fit Nappa leather moto jacket with four front utility pockets and shirt collar from Gulati & Sons.',
    tags: ['leather jacket', 'nappa leather', 'moto jacket', 'menswear', 'clothing', 'outerwear'],
    rating: 4.9,
    reviewCount: 22,
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-10-10T12:00:00Z'
  }
];
