export interface ProductImage {
  url: string;
  alt: string;
  isMain?: boolean;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>; // e.g. { size: '50 ml' } or { strap: 'Oystersteel & Gold' }
}

export interface ProductFeature {
  name: string;
  explanation: string;
  icon?: string;
  emoji?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: string;
  category: 'fragrances' | 'watches' | 'clothing' | 'essentials';
  categoryLabel: string;
  mrp: number;
  price: number;
  discountPercent: number;
  stock: number;
  lowStockThreshold: number;
  unit?: string;
  weight?: string;
  status: 'active' | 'draft' | 'hidden';
  shortDescription: string;
  description: string;
  images: ProductImage[];
  videoUrl?: string;
  isDemonstration?: boolean;
  disclaimer?: string;
  isIndexable: boolean;
  variants: ProductVariant[];
  features: ProductFeature[];
  specifications: Record<string, string>;
  careInstructions?: string;
  deliveryInfo?: string;
  seoTitle?: string;
  seoDescription?: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string; // unique item id (productId + variantId)
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  variantTitle?: string;
  sku: string;
  category: string;
}

export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  variantTitle?: string;
  sku: string;
}

export interface OrderTimelineEvent {
  status: string;
  title: string;
  timestamp: string;
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    isGuest: boolean;
    uid?: string;
  };
  customerUid?: string;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    deliveryNote?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  amountCollected: number;
  amountDueOnDelivery: number;
  couponCode?: string;
  giftPackaging?: boolean;
  giftNote?: string;
  paymentMethod: 'razorpay' | 'upi' | 'card' | 'netbanking' | 'cod' | 'split_shipping';
  paymentMode: 'cod' | 'online' | 'split_prepay_shipping';
  paymentId?: string;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'partial' | 'refunded';
  fulfillmentStatus: 'new' | 'processing' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  timeline: OrderTimelineEvent[];
  adminNotes?: string;
  isDemoOrder: boolean;
  isBuyNow?: boolean;
}

export interface CustomerAddress {
  id: string;
  isDefault: boolean;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerUser {
  id: string;
  uid?: string;
  name: string;
  fullName?: string;
  username?: string;
  usernameNormalized?: string;
  age?: number;
  email: string;
  authEmail?: string;
  contactEmail?: string;
  phone?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  role: 'admin' | 'customer';
  ordersCount: number;
  lifetimeSpend: number;
  lastActive: string;
  createdAt: string;
  updatedAt?: string;
  onboardingCompleted?: boolean;
  marketingConsent: boolean;
  addresses: CustomerAddress[];
  currentCart?: CartItem[];
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minCartValue: number;
  maxDiscount?: number;
  active: boolean;
  startDate?: string;
  expiryDate?: string;
  usageCount: number;
  usageLimit?: number;
}

export interface StateDeliveryInfo {
  slug: string;
  name: string;
  type: 'State' | 'Union Territory';
  capital: string;
  estimatedDays: string;
  serviceablePincodesRange: string;
  deliveryNotes: string;
  hubCity: string;
  expressAvailable: boolean;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  verifiedPurchase: boolean;
  adminReply?: string;
}

export interface CmsSectionBlock {
  id: string;
  name: string;
  type: 'hero' | 'editorial' | 'feature' | 'split' | 'cta' | 'banner';
  heading: string;
  subheading?: string;
  paragraph?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  bgColor?: string;
  textColor?: string;
  alignment: 'left' | 'center' | 'right';
  layout: 'image-left-text-right' | 'text-left-image-right' | 'center-cards' | 'text-only';
  visible: boolean;
  order: number;
}

export interface FounderContent {
  name: string;
  role: string;
  title: string;
  subtitle: string;
  heroImage: string;
  portraitPlaceholderNote: string;
  imageAlt?: string;
  bioHeading: string;
  bioParagraphs: string[];
  philosophyHeading: string;
  philosophySubheading: string;
  philosophyPoints: {
    title: string;
    description: string;
  }[];
  personalStatementHeading: string;
  personalStatement: string;
  personalStatementNote: string;
  collectionsIntro: string;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
}

