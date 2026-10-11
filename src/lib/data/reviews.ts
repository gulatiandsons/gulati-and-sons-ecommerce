import { Review } from '@/types';

export const SEED_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'prod-oud-gold',
    productName: 'Bella Vita Luxury OUD Gold Eau de Parfum',
    authorName: 'Vikramaditya S., New Delhi',
    rating: 5,
    comment: 'The scent develops with an unhurried, rich dry-down. Caramel sweetness gives way to amber and smokey wood that lasts well beyond dinner. Packaging was impeccable and arrived cleanly sealed.',
    date: '14 September 2026',
    status: 'approved',
    verifiedPurchase: true
  },
  {
    id: 'rev-02',
    productId: 'prod-leather-jacket',
    productName: 'Heritage Nappa Leather Moto Jacket',
    authorName: 'Ranveer K., Mumbai',
    rating: 5,
    comment: 'The Nappa leather is supple straight from the presentation box—no stiff break-in required. The slim cut through the shoulders fits clean over a fine knit. An understated, architectural piece.',
    date: '28 August 2026',
    status: 'approved',
    verifiedPurchase: true
  },
  {
    id: 'rev-03',
    productId: 'prod-oud-gold',
    productName: 'Bella Vita Luxury OUD Gold Eau de Parfum',
    authorName: 'Ananya M., Bengaluru',
    rating: 5,
    comment: 'Ordered as an anniversary gift. The presentation packaging and handwritten correspondence note were handled with rare care. Sillage is sophisticated without being loud.',
    date: '03 October 2026',
    status: 'approved',
    verifiedPurchase: true
  }
];
