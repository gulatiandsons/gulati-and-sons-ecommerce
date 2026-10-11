'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, CustomerUser, Coupon, Review, CmsSectionBlock } from '@/types';
import { SEED_PRODUCTS } from '@/lib/data/products';
import { SEED_REVIEWS } from '@/lib/data/reviews';
import { INITIAL_CMS_SECTIONS } from '@/lib/data/initialCms';

export interface AuditLogItem {
  id: string;
  timestamp: string;
  admin: string;
  action: string;
  details: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'stock' | 'payment' | 'review';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface StoreSettings {
  storeName: string;
  domain: string;
  contactEmail: string;
  contactPhone: string;
  supportWhatsApp: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  freeShippingThreshold: number;
  standardShippingFee: number;
  orderIdPrefix: string;
  maintenanceMode: boolean;
  announcementText: string;
  showAnnouncement: boolean;
  paymentMode: 'demo' | 'live';
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'Gulati & Sons',
  domain: 'gulatiandsons.com',
  contactEmail: 'concierge@gulatiandsons.com',
  contactPhone: '+91 11 4982 0000',
  supportWhatsApp: '+91 98110 00000',
  currency: 'INR',
  currencySymbol: '₹',
  taxRate: 0.18, // 18% GST (already inclusive in retail price)
  freeShippingThreshold: 5000,
  standardShippingFee: 250,
  orderIdPrefix: 'GS-',
  maintenanceMode: false,
  announcementText: 'Complimentary white-glove Pan-India delivery on orders above ₹5,000.',
  showAnnouncement: true,
  paymentMode: 'demo'
};

const DEFAULT_COUPONS: Coupon[] = [
  {
    id: 'coup-house10',
    code: 'HOUSE10',
    type: 'percentage',
    value: 10,
    minCartValue: 2000,
    maxDiscount: 1000,
    active: true,
    usageCount: 14,
    usageLimit: 100
  },
  {
    id: 'coup-welcome500',
    code: 'WELCOME500',
    type: 'fixed',
    value: 500,
    minCartValue: 3000,
    active: true,
    usageCount: 32,
    usageLimit: 200
  }
];

const INITIAL_CUSTOMERS: CustomerUser[] = [
  {
    id: 'cust-01',
    name: 'Yashveer Singh Gulati',
    email: 'yashveer@gulatiandsons.com',
    phone: '+91 98110 12345',
    role: 'admin',
    ordersCount: 4,
    lifetimeSpend: 42490,
    lastActive: 'Just now',
    createdAt: '2026-01-01T10:00:00Z',
    marketingConsent: true,
    addresses: [
      {
        id: 'addr-01',
        isDefault: true,
        addressLine1: 'The Gulati Residence, 14 Amrita Shergill Marg',
        city: 'New Delhi',
        state: 'Delhi',
        pincode: '110003'
      }
    ]
  },
  {
    id: 'cust-02',
    name: 'Devraj Chauhan',
    email: 'devraj.chauhan@outlook.com',
    phone: '+91 98765 43210',
    role: 'customer',
    ordersCount: 2,
    lifetimeSpend: 17498,
    lastActive: '2 hours ago',
    createdAt: '2026-02-15T11:20:00Z',
    marketingConsent: true,
    addresses: [
      {
        id: 'addr-02',
        isDefault: true,
        addressLine1: 'Flat 402, Sea Face Apartments, Worli',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400018'
      }
    ]
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-1001',
    orderNumber: 'GS-8921',
    createdAt: '2026-10-10T08:00:00.000Z',
    customer: {
      name: 'Yashveer Singh Gulati',
      email: 'yashveer@gulatiandsons.com',
      phone: '+91 98110 12345',
      isGuest: false
    },
    shippingAddress: {
      addressLine1: '14 Amrita Shergill Marg',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110003',
      deliveryNote: 'Leave with estate security.'
    },
    items: [
      {
        productId: 'prod-oud-gold',
        name: 'Bella Vita Luxury OUD Gold Eau de Parfum',
        slug: 'bella-vita-luxury-oud-gold-eau-de-parfum',
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
        price: 2499,
        quantity: 1,
        variantTitle: '50 ml',
        sku: 'GS-PERF-OUD-50'
      }
    ],
    subtotal: 2499,
    discount: 0,
    shippingFee: 0,
    total: 2499,
    paymentMethod: 'upi',
    paymentId: 'pay_demo_772189a',
    paymentStatus: 'paid',
    fulfillmentStatus: 'processing',
    timeline: [
      {
        status: 'Order Placed',
        title: 'Order Placed & Verified',
        timestamp: '10/10/2026, 08:00:00 AM'
      },
      {
        status: 'Processing',
        title: 'Boutique Packaging in Progress',
        timestamp: '10/10/2026, 10:00:00 AM'
      }
    ],
    adminNotes: 'VIP patron order. Ensure signature brass seal.',
    isDemoOrder: true
  }
];

interface CommerceContextType {
  products: Product[];
  trashProducts: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  customers: CustomerUser[];
  coupons: Coupon[];
  reviews: Review[];
  cmsSections: CmsSectionBlock[];
  settings: StoreSettings;
  auditLogs: AuditLogItem[];
  notifications: AdminNotification[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  quickViewProduct: Product | null;
  activeToast: string | null;

  // Actions
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  showToast: (msg: string) => void;

  addToCart: (product: Product, variantId?: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  placeOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, fulfillmentStatus: Order['fulfillmentStatus'], adminNote?: string) => void;
  updatePaymentStatus: (orderId: string, paymentStatus: Order['paymentStatus']) => void;

  saveProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  restoreProduct: (productId: string) => void;
  permanentlyDeleteProduct: (productId: string) => void;
  quickUpdateStock: (productId: string, stock: number) => void;

  saveCmsSections: (sections: CmsSectionBlock[]) => void;
  publishCms: (sections: CmsSectionBlock[]) => void;

  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;

  moderateReview: (id: string, status: 'approved' | 'rejected', reply?: string) => void;
  addReview: (review: Omit<Review, 'id' | 'date' | 'status'>) => void;

  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  markNotificationRead: (id: string) => void;
  addAuditLog: (action: string, details: string) => void;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [trashProducts, setTrashProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<CustomerUser[]>(INITIAL_CUSTOMERS);
  const [coupons, setCoupons] = useState<Coupon[]>(DEFAULT_COUPONS);
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);
  const [cmsSections, setCmsSections] = useState<CmsSectionBlock[]>(INITIAL_CMS_SECTIONS);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([
    {
      id: 'log-1',
      timestamp: '10:00:00 AM',
      admin: 'Super Admin',
      action: 'System Initialized',
      details: 'Gulati & Sons commerce store ready in demo mode.'
    }
  ]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: 'notif-1',
      title: 'Store Ready',
      message: 'Demo store initialized with 3 curated catalog pieces.',
      type: 'order',
      read: false,
      timestamp: 'Just now'
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('gs_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('gs_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('gs_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedProducts = localStorage.getItem('gs_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedSettings = localStorage.getItem('gs_settings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));
    } catch {
      // Ignore local storage errors
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('gs_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('gs_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('gs_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('gs_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  const showToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => {
      setActiveToast((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLogItem = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleTimeString('en-IN'),
      admin: 'Administrator',
      action,
      details
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  const addToCart = (product: Product, variantId?: string, quantity: number = 1) => {
    const selectedVariant = variantId ? product.variants.find((v) => v.id === variantId) : product.variants[0];
    const itemId = `${product.id}-${selectedVariant?.id || 'standard'}`;
    const price = selectedVariant ? selectedVariant.price : product.price;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        variantId: selectedVariant?.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0]?.url || '',
        price,
        quantity,
        variantTitle: selectedVariant?.title,
        sku: selectedVariant?.sku || product.sku,
        category: product.category
      };
      return [...prev, newItem];
    });

    showToast(`Added "${product.name}" to your bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from bag.');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from saved items.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to saved items.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const placeOrder = (orderData: Partial<Order>): Order => {
    const orderNumber = `${settings.orderIdPrefix}${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      createdAt: new Date().toISOString(),
      customer: orderData.customer || {
        name: 'Guest Patron',
        email: 'patron@example.com',
        phone: '+91 98000 00000',
        isGuest: true
      },
      shippingAddress: orderData.shippingAddress || {
        addressLine1: 'Address',
        city: 'City',
        state: 'Delhi',
        pincode: '110001'
      },
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      discount: orderData.discount || 0,
      shippingFee: orderData.shippingFee || 0,
      total: orderData.total || 0,
      couponCode: orderData.couponCode,
      giftPackaging: orderData.giftPackaging,
      giftNote: orderData.giftNote,
      paymentMethod: orderData.paymentMethod || 'upi',
      paymentId: orderData.paymentId || `pay_demo_${Date.now().toString(36)}`,
      paymentStatus: 'paid',
      fulfillmentStatus: 'new',
      timeline: [
        {
          status: 'Order Placed',
          title: 'Order Confirmed',
          timestamp: new Date().toLocaleString('en-IN')
        }
      ],
      adminNotes: 'Simulated order placed via Demo Mode.',
      isDemoOrder: true
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Deduct stock safely
    newOrder.items.forEach((item) => {
      setProducts((currentProducts) =>
        currentProducts.map((p) => {
          if (p.id === item.productId) {
            const newStock = Math.max(0, p.stock - item.quantity);
            return { ...p, stock: newStock };
          }
          return p;
        })
      );
    });

    // Notify admin
    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        title: 'New Order Received',
        message: `Order #${newOrder.orderNumber} placed for ₹${newOrder.total.toLocaleString('en-IN')}`,
        type: 'order',
        read: false,
        timestamp: 'Just now',
        link: `/admin/orders`
      },
      ...prev
    ]);

    addAuditLog('Order Created', `Order #${newOrder.orderNumber} confirmed by ${newOrder.customer.name}`);
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    fulfillmentStatus: Order['fulfillmentStatus'],
    adminNote?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const statusLabels: Record<Order['fulfillmentStatus'], string> = {
            new: 'Order Received',
            processing: 'Processing in Atelier',
            packed: 'Packed & Sealed with Heritage Wax',
            shipped: 'Handed to Dedicated Logistics Carrier',
            out_for_delivery: 'Out for Handover to Patron',
            delivered: 'Successfully Delivered to Patron',
            cancelled: 'Order Cancelled'
          };

          const newTimeline = [
            ...ord.timeline,
            {
              status: fulfillmentStatus,
              title: statusLabels[fulfillmentStatus] || fulfillmentStatus,
              timestamp: new Date().toLocaleString('en-IN'),
              note: adminNote
            }
          ];

          return {
            ...ord,
            fulfillmentStatus,
            timeline: newTimeline,
            adminNotes: adminNote ? `${ord.adminNotes || ''}\n${adminNote}` : ord.adminNotes
          };
        }
        return ord;
      })
    );
    addAuditLog('Order Status Updated', `Order ${orderId} moved to ${fulfillmentStatus}`);
    showToast(`Order status updated to ${fulfillmentStatus}.`);
  };

  const updatePaymentStatus = (orderId: string, paymentStatus: Order['paymentStatus']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, paymentStatus } : ord))
    );
    addAuditLog('Payment Status Changed', `Order ${orderId} marked as ${paymentStatus}`);
  };

  const saveProduct = (product: Product) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...product, updatedAt: new Date().toISOString() };
        return updated;
      }
      return [product, ...prev];
    });
    addAuditLog('Product Saved', `Product "${product.name}" (${product.sku}) updated.`);
    showToast('Product saved successfully.');
  };

  const deleteProduct = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setTrashProducts((prev) => [prod, ...prev]);
      addAuditLog('Product Moved to Trash', `Product "${prod.name}" moved to Trash.`);
      showToast('Product moved to Trash. It can be restored anytime.');
    }
  };

  const restoreProduct = (productId: string) => {
    const prod = trashProducts.find((p) => p.id === productId);
    if (prod) {
      setTrashProducts((prev) => prev.filter((p) => p.id !== productId));
      setProducts((prev) => [prod, ...prev]);
      addAuditLog('Product Restored', `Product "${prod.name}" restored from Trash.`);
      showToast('Product restored to catalog.');
    }
  };

  const permanentlyDeleteProduct = (productId: string) => {
    setTrashProducts((prev) => prev.filter((p) => p.id !== productId));
    addAuditLog('Product Deleted Permanently', `Product ${productId} purged from system.`);
    showToast('Product permanently deleted.');
  };

  const quickUpdateStock = (productId: string, stock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock } : p))
    );
    addAuditLog('Stock Quick Update', `Stock for product ${productId} adjusted to ${stock}.`);
    showToast('Stock quantity updated.');
  };

  const saveCmsSections = (sections: CmsSectionBlock[]) => {
    setCmsSections(sections);
    showToast('CMS changes saved to Draft.');
  };

  const publishCms = (sections: CmsSectionBlock[]) => {
    setCmsSections(sections);
    addAuditLog('CMS Published', 'Homepage and visual sections published to live website.');
    showToast('Website changes published live!');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev]);
    addAuditLog('Coupon Added', `Coupon code "${coupon.code}" created.`);
    showToast(`Coupon ${coupon.code} created.`);
  };

  const updateCoupon = (coupon: Coupon) => {
    setCoupons((prev) => prev.map((c) => (c.id === coupon.id ? coupon : c)));
    addAuditLog('Coupon Updated', `Coupon code "${coupon.code}" updated.`);
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    addAuditLog('Coupon Deleted', `Coupon ${id} removed.`);
  };

  const moderateReview = (id: string, status: 'approved' | 'rejected', reply?: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, adminReply: reply } : r))
    );
    addAuditLog('Review Moderated', `Review ${id} set to ${status}.`);
    showToast(`Review ${status}.`);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'status'>) => {
    const newRev: Review = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'pending'
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you. Your review has been submitted for verification.');
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => {
      const merged = { ...prev, ...newSettings };
      try {
        localStorage.setItem('gs_settings', JSON.stringify(merged));
      } catch {}
      return merged;
    });
    addAuditLog('Settings Updated', 'Store configuration changed.');
    showToast('Store settings updated.');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <CommerceContext.Provider
      value={{
        products,
        trashProducts,
        cart,
        wishlist,
        orders,
        customers,
        coupons,
        reviews,
        cmsSections,
        settings,
        auditLogs,
        notifications,
        isCartOpen,
        isSearchOpen,
        quickViewProduct,
        activeToast,
        setIsCartOpen,
        setIsSearchOpen,
        setQuickViewProduct,
        showToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        updateOrderStatus,
        updatePaymentStatus,
        saveProduct,
        deleteProduct,
        restoreProduct,
        permanentlyDeleteProduct,
        quickUpdateStock,
        saveCmsSections,
        publishCms,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        moderateReview,
        addReview,
        updateSettings,
        markNotificationRead,
        addAuditLog
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const ctx = useContext(CommerceContext);
  if (!ctx) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return ctx;
}
