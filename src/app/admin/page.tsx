'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Edit,
  ShoppingBag,
  Users,
  ShoppingCart,
  PlusCircle,
  MoreHorizontal,
  Settings,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  TrendingUp,
  Package,
  AlertTriangle,
  CreditCard,
  Trash2,
  Eye,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Shield,
  FileText,
  Sliders,
  DollarSign,
  Gift,
  HelpCircle,
  Tag,
  Star,
  RefreshCw,
  UserCheck,
  Menu,
  CheckCircle2
} from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';
import { useAuth } from '@/lib/store/authStore';
import { PaymentAdapter } from '@/lib/payments/razorpay';
import { Product, Order, CmsSectionBlock, Coupon } from '@/types';

export default function SuperAdminDashboard() {
  const router = useRouter();
  const {
    products,
    trashProducts,
    orders,
    customers,
    coupons,
    reviews,
    cmsSections,
    founderContent,
    settings,
    auditLogs,
    notifications,
    saveProduct,
    deleteProduct,
    restoreProduct,
    permanentlyDeleteProduct,
    quickUpdateStock,
    updateOrderStatus,
    updatePaymentStatus,
    saveCmsSections,
    publishCms,
    updateFounderContent,
    addCoupon,
    deleteCoupon,
    moderateReview,
    updateSettings,
    markNotificationRead,
    showToast
  } = useCommerce();

  const { isAdmin, logout } = useAuth();

  // Active module navigation
  const [activeModule, setActiveModule] = useState<
    | 'home'
    | 'edit'
    | 'founder'
    | 'orders'
    | 'users'
    | 'cart-users'
    | 'add'
    | 'inventory'
    | 'payments'
    | 'discounts'
    | 'reviews'
    | 'analytics'
    | 'seo'
    | 'audit'
    | 'trash'
    | 'settings'
  >('home');

  // Search in Admin
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');

  const handleNav = (module: typeof activeModule) => {
    setActiveModule(module);
    setMobileNavOpen(false);
  };

  // Selected sub-entities for editing/viewing
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<Product | null>(null);
  const [editingCmsSection, setEditingCmsSection] = useState<CmsSectionBlock | null>(null);

  // Founder CMS form state
  const [founderForm, setFounderForm] = useState(founderContent);
  useEffect(() => {
    if (founderContent) {
      setFounderForm(founderContent);
    }
  }, [founderContent]);


  // Order filters
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [productFilter, setProductFilter] = useState<string>('all');

  // Add Product Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<'fragrances' | 'watches' | 'clothing' | 'essentials'>('fragrances');
  const [newProductPrice, setNewProductPrice] = useState(2499);
  const [newProductMrp, setNewProductMrp] = useState(3499);
  const [newProductStock, setNewProductStock] = useState(20);
  const [newProductSku, setNewProductSku] = useState('');
  const [newProductShortDesc, setNewProductShortDesc] = useState('');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductImageUrl, setNewProductImageUrl] = useState('');

  // Add Coupon form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponVal, setNewCouponVal] = useState(10);
  const [newCouponMin, setNewCouponMin] = useState(2000);

  // Abandoned / active cart simulated patrons
  const activeCartUsers = [
    {
      id: 'cu-1',
      name: 'Yashveer Singh Gulati',
      email: 'yashveer@gulatiandsons.com',
      phone: '+91 98110 12345',
      itemsCount: 1,
      cartValue: 2499,
      lastActive: '12 minutes ago',
      itemNames: ['Bella Vita Luxury OUD Gold (50 ml)'],
      isRegistered: true
    },
    {
      id: 'cu-2',
      name: 'Aaditya Singhania',
      email: 'aaditya.singhania@heritage.co',
      phone: '+91 98200 88219',
      itemsCount: 2,
      cartValue: 17498,
      lastActive: '45 minutes ago',
      itemNames: ['Heritage Nappa Leather Moto Jacket (Size L)', 'Bella Vita OUD Gold'],
      isRegistered: true
    }
  ];

  // Business statistics
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrdersCount = orders.filter((o) => o.fulfillmentStatus === 'new' || o.fulfillmentStatus === 'processing').length;
  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;

  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#252522] flex flex-col font-sans select-none">
      {/* Top Super Admin Utility Bar */}
      <header className="h-16 bg-[#3C2921] text-[#F3EFE6] px-3 sm:px-6 flex items-center justify-between border-b border-[#A58B5F]/40 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Drawer Toggle */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="lg:hidden p-2 text-[#E2D9C8] hover:text-[#F3EFE6] min-h-[44px] min-w-[44px] flex items-center justify-center -ml-1 transition-colors"
            aria-label="Open Admin Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="relative h-7 w-28 sm:h-9 sm:w-36">
            <Image
              src="/logo-nav.png"
              alt="Gulati & Sons"
              fill
              className="object-contain brightness-0 invert"
              sizes="(max-width: 640px) 112px, 144px"
            />
          </Link>
          <span className="hidden sm:inline-block px-2 py-0.5 bg-[#51292D] text-[#A58B5F] text-[12px] font-mono uppercase tracking-widest border border-[#A58B5F]/30">
            Super Administrator
          </span>
          <span className="lg:hidden text-[11px] font-mono uppercase px-2 py-0.5 bg-[#252522] text-[#A58B5F] border border-[#A58B5F]/30 truncate max-w-[120px]">
            {activeModule}
          </span>
        </div>

        {/* Global Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Universal Search Bar */}
          <div className="hidden md:flex items-center gap-2 bg-[#252522] border border-[#A58B5F]/40 px-3 py-1.5 w-64 text-xs font-mono">
            <Search className="w-3.5 h-3.5 text-[#A58B5F]" />
            <input
              type="text"
              value={adminSearchQuery}
              onChange={(e) => setAdminSearchQuery(e.target.value)}
              placeholder="Search orders, products, users (Ctrl+K)"
              className="bg-transparent border-none outline-none text-[#F3EFE6] placeholder:text-[#E2D9C8]/40 w-full text-xs"
            />
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationsModal(!showNotificationsModal)}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#E2D9C8] hover:text-[#F3EFE6] transition-colors relative"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#51292D] rounded-full ring-2 ring-[#3C2921]" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotificationsModal && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#252522] text-[#F3EFE6] border border-[#A58B5F]/40 shadow-2xl p-4 space-y-3 z-50 animate-in fade-in duration-200">
                <div className="flex justify-between items-center border-b border-[#A58B5F]/30 pb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#A58B5F]">
                    Alerts & Audit Events
                  </span>
                  <button
                    onClick={() => setShowNotificationsModal(false)}
                    className="text-[#E2D9C8]/60 hover:text-[#F3EFE6] p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-2.5 border border-[#3C2921] transition-colors cursor-pointer text-xs ${
                        n.read ? 'bg-[#252522]/60 opacity-70' : 'bg-[#3C2921]'
                      }`}
                    >
                      <p className="font-semibold text-[#A58B5F]">{n.title}</p>
                      <p className="text-[#E2D9C8]/80 text-[13px] mt-0.5">{n.message}</p>
                      <span className="text-[11px] font-mono text-[#E2D9C8]/40 block mt-1">{n.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Exit / Return to storefront */}
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-wider text-[#A58B5F] hover:text-[#F3EFE6] flex items-center gap-1.5 min-h-[44px] px-2"
          >
            <span className="hidden sm:inline">Live Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#252522]/85 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
        >
          <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-xs bg-[#3C2921] text-[#E2D9C8] p-4 flex flex-col justify-between overflow-y-auto shadow-2xl border-r border-[#A58B5F]/40 animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-[#A58B5F]/30">
                <div>
                  <span className="text-[12px] font-mono uppercase tracking-widest text-[#A58B5F] block">
                    Gulati & Sons
                  </span>
                  <span className="font-serif text-lg text-[#F3EFE6]">Executive Suite</span>
                </div>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="p-2 text-[#E2D9C8]/70 hover:text-[#F3EFE6] min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Core Operations in Drawer */}
              <div className="space-y-1">
                <span className="text-[12px] font-mono uppercase tracking-widest text-[#A58B5F] px-3 block mb-2">
                  Core Operations
                </span>

                <button
                  onClick={() => handleNav('home')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'home' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-[#A58B5F]" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => handleNav('edit')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'edit' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <Edit className="w-4 h-4 text-[#A58B5F]" />
                  <span>Visual CMS Edit</span>
                </button>

                <button
                  onClick={() => handleNav('founder')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'founder' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-[#A58B5F]" />
                  <span>Founder CMS</span>
                </button>

                <button
                  onClick={() => handleNav('orders')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'orders' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-[#A58B5F]" />
                    <span>Orders</span>
                  </div>
                  <span className="px-1.5 py-0.5 bg-[#51292D] text-[12px] text-[#F3EFE6]">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => handleNav('users')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'users' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-[#A58B5F]" />
                    <span>Patrons / Users</span>
                  </div>
                  <span className="px-1.5 py-0.5 bg-[#A58B5F]/20 text-[12px] text-[#A58B5F]">
                    {customers.length}
                  </span>
                </button>

                <button
                  onClick={() => handleNav('cart-users')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'cart-users' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-4 h-4 text-[#A58B5F]" />
                    <span>Cart Users</span>
                  </div>
                  <span className="px-1.5 py-0.5 bg-[#A58B5F]/20 text-[12px] text-[#A58B5F]">
                    {activeCartUsers.length}
                  </span>
                </button>

                <button
                  onClick={() => handleNav('add')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'add' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <PlusCircle className="w-4 h-4 text-[#A58B5F]" />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Advanced Modules in Drawer */}
              <div className="space-y-1 pt-3 border-t border-[#A58B5F]/20">
                <span className="text-[12px] font-mono uppercase tracking-widest text-[#A58B5F] px-3 block mb-2">
                  Advanced Administration
                </span>

                <button
                  onClick={() => handleNav('inventory')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'inventory' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <Package className="w-4 h-4 text-[#A58B5F]" />
                  <span>Inventory & Stock</span>
                </button>

                <button
                  onClick={() => handleNav('payments')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'payments' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <DollarSign className="w-4 h-4 text-[#A58B5F]" />
                  <span>Payments & Gateway</span>
                </button>

                <button
                  onClick={() => handleNav('discounts')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'discounts' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <Tag className="w-4 h-4 text-[#A58B5F]" />
                  <span>Coupons & Offers</span>
                </button>

                <button
                  onClick={() => handleNav('reviews')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'reviews' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <Star className="w-4 h-4 text-[#A58B5F]" />
                  <span>Reviews Moderation</span>
                </button>

                <button
                  onClick={() => handleNav('analytics')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'analytics' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 text-[#A58B5F]" />
                  <span>Sales Analytics</span>
                </button>

                <button
                  onClick={() => handleNav('audit')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'audit' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#A58B5F]" />
                  <span>Audit Activity Log</span>
                </button>

                <button
                  onClick={() => handleNav('trash')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'trash' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <Trash2 className="w-4 h-4 text-[#A58B5F]" />
                  <span>Trash Recovery ({trashProducts.length})</span>
                </button>

                <button
                  onClick={() => handleNav('settings')}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                    activeModule === 'settings' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                  }`}
                >
                  <Settings className="w-4 h-4 text-[#A58B5F]" />
                  <span>Store Settings</span>
                </button>
              </div>
            </div>

            {/* User footer in Drawer */}
            <div className="pt-4 border-t border-[#A58B5F]/20 flex items-center justify-between text-xs font-mono">
              <div>
                <p className="text-[#F3EFE6] font-medium">Yashveer Singh</p>
                <span className="text-[12px] text-[#A58B5F]">Owner / Super Admin</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push('/admin/login');
                }}
                className="p-2 text-[#E2D9C8]/60 hover:text-[#F3EFE6]"
                title="Log Out Admin"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Body with Sidebar Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Navigation Sidebar (Hidden on mobile/tablet) */}
        <aside className="hidden lg:flex w-64 bg-[#3C2921] text-[#E2D9C8] border-r border-[#A58B5F]/30 p-4 flex-col justify-between shrink-0">
          <div className="space-y-6">
            {/* Primary Nav Section */}
            <div className="space-y-1">
              <span className="text-[12px] font-mono uppercase tracking-widest text-[#A58B5F] px-3 block mb-2">
                Core Operations
              </span>

              <button
                onClick={() => handleNav('home')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'home' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-[#A58B5F]" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => handleNav('edit')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'edit' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <Edit className="w-4 h-4 text-[#A58B5F]" />
                <span>Visual CMS Edit</span>
              </button>

              <button
                onClick={() => handleNav('founder')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'founder' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <UserCheck className="w-4 h-4 text-[#A58B5F]" />
                <span>Founder CMS</span>
              </button>

              <button
                onClick={() => handleNav('orders')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'orders' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 text-[#A58B5F]" />
                  <span>Orders</span>
                </div>
                <span className="px-1.5 py-0.5 bg-[#51292D] text-[12px] text-[#F3EFE6]">
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => handleNav('users')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'users' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-[#A58B5F]" />
                  <span>Patrons / Users</span>
                </div>
                <span className="px-1.5 py-0.5 bg-[#A58B5F]/20 text-[12px] text-[#A58B5F]">
                  {customers.length}
                </span>
              </button>

              <button
                onClick={() => handleNav('cart-users')}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'cart-users' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-4 h-4 text-[#A58B5F]" />
                  <span>Cart Users</span>
                </div>
                <span className="px-1.5 py-0.5 bg-[#A58B5F]/20 text-[12px] text-[#A58B5F]">
                  {activeCartUsers.length}
                </span>
              </button>

              <button
                onClick={() => handleNav('add')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'add' ? 'bg-[#51292D] text-[#F3EFE6] font-medium' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-[#A58B5F]" />
                <span>Add (Creation Hub)</span>
              </button>
            </div>

            {/* Secondary Modules */}
            <div className="space-y-1 pt-4 border-t border-[#A58B5F]/20">
              <span className="text-[12px] font-mono uppercase tracking-widest text-[#A58B5F] px-3 block mb-2">
                Advanced Administration
              </span>

              <button
                onClick={() => handleNav('inventory')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'inventory' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <Package className="w-4 h-4 text-[#A58B5F]" />
                <span>Inventory & Stock</span>
              </button>

              <button
                onClick={() => handleNav('payments')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'payments' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <DollarSign className="w-4 h-4 text-[#A58B5F]" />
                <span>Payments & Gateway</span>
              </button>

              <button
                onClick={() => handleNav('discounts')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'discounts' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <Tag className="w-4 h-4 text-[#A58B5F]" />
                <span>Coupons & Offers</span>
              </button>

              <button
                onClick={() => handleNav('reviews')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'reviews' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <Star className="w-4 h-4 text-[#A58B5F]" />
                <span>Reviews Moderation</span>
              </button>

              <button
                onClick={() => handleNav('analytics')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'analytics' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-[#A58B5F]" />
                <span>Sales Analytics</span>
              </button>

              <button
                onClick={() => handleNav('audit')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'audit' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <FileText className="w-4 h-4 text-[#A58B5F]" />
                <span>Audit Activity Log</span>
              </button>

              <button
                onClick={() => handleNav('trash')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'trash' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <Trash2 className="w-4 h-4 text-[#A58B5F]" />
                <span>Trash Recovery ({trashProducts.length})</span>
              </button>

              <button
                onClick={() => handleNav('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors ${
                  activeModule === 'settings' ? 'bg-[#51292D] text-[#F3EFE6]' : 'hover:bg-[#252522]/50 text-[#E2D9C8]'
                }`}
              >
                <Settings className="w-4 h-4 text-[#A58B5F]" />
                <span>Store Settings</span>
              </button>
            </div>
          </div>

          {/* Bottom user card */}
          <div className="pt-4 border-t border-[#A58B5F]/20 flex items-center justify-between text-xs font-mono">
            <div>
              <p className="text-[#F3EFE6] font-medium">Yashveer Singh</p>
              <span className="text-[12px] text-[#A58B5F]">Owner / Super Admin</span>
            </div>
            <button
              onClick={() => {
                logout();
                router.push('/admin/login');
              }}
              className="p-1.5 text-[#E2D9C8]/60 hover:text-[#F3EFE6]"
              title="Log Out Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Main Content Workspace */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-10 pb-24 lg:pb-12 overflow-y-auto w-full max-w-full">
          {/* ============================================================== */}
          {/* MODULE 1: DASHBOARD HOME */}
          {/* ============================================================== */}
          {activeModule === 'home' && (
            <div className="space-y-10 max-w-7xl">
              <div>
                <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                  AT-A-GLANCE STORE HEALTH
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                  Executive Operations Overview
                </h1>
              </div>

              {/* Top Quick Statistics (8 Key Indicators) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 bg-[#E2D9C8]/40 border border-[#CCC5B9] shadow-sm">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Orders Today</span>
                  <span className="font-serif text-3xl text-[#51292D] mt-1 block">{orders.length}</span>
                </div>
                <div className="p-5 bg-[#E2D9C8]/40 border border-[#CCC5B9] shadow-sm">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Revenue Today</span>
                  <span className="font-serif text-3xl text-[#34483D] mt-1 block">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-5 bg-[#E2D9C8]/40 border border-[#CCC5B9] shadow-sm">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Active Cart Users</span>
                  <span className="font-serif text-3xl text-[#252522] mt-1 block">{activeCartUsers.length}</span>
                </div>
                <div className="p-5 bg-[#E2D9C8]/40 border border-[#CCC5B9] shadow-sm">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Low Stock Alerts</span>
                  <span className={`font-serif text-3xl mt-1 block ${lowStockCount > 0 ? 'text-[#51292D]' : 'text-[#34483D]'}`}>
                    {lowStockCount}
                  </span>
                </div>
                <div className="p-5 bg-[#E2D9C8]/40 border border-[#CCC5B9] shadow-sm">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Pending Orders</span>
                  <span className="font-serif text-3xl text-[#51292D] mt-1 block">{pendingOrdersCount}</span>
                </div>
                <div className="p-5 bg-[#E2D9C8]/40 border border-[#CCC5B9] shadow-sm">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Total Customers</span>
                  <span className="font-serif text-3xl text-[#252522] mt-1 block">{customers.length}</span>
                </div>
                <div className="p-5 bg-[#E2D9C8]/40 border border-[#CCC5B9] shadow-sm">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Failed Payments</span>
                  <span className="font-serif text-3xl text-[#34483D] mt-1 block">0</span>
                </div>
                <div className="p-5 bg-[#E2D9C8]/40 border border-[#CCC5B9] shadow-sm">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Average Order Value</span>
                  <span className="font-serif text-3xl text-[#252522] mt-1 block">
                    ₹{orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString('en-IN') : 0}
                  </span>
                </div>
              </div>

              {/* Five Large Primary Action Cards */}
              <div className="space-y-4 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#51292D] block">
                  Primary Action Portals
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {/* Card 1: EDIT */}
                  <button
                    onClick={() => setActiveModule('edit')}
                    className="p-6 bg-[#3C2921] text-[#F3EFE6] border border-[#A58B5F]/40 shadow-lg text-left hover:bg-[#51292D] transition-all group flex flex-col justify-between h-44"
                  >
                    <Edit className="w-6 h-6 text-[#A58B5F] group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-serif text-2xl font-medium">Edit</h3>
                      <p className="text-[13px] text-[#E2D9C8]/70 font-mono mt-1">
                        Visual Website Pages & Blocks
                      </p>
                    </div>
                  </button>

                  {/* Card 2: FOUNDER CMS */}
                  <button
                    onClick={() => setActiveModule('founder')}
                    className="p-6 bg-[#3C2921] text-[#F3EFE6] border border-[#A58B5F]/40 shadow-lg text-left hover:bg-[#51292D] transition-all group flex flex-col justify-between h-44"
                  >
                    <UserCheck className="w-6 h-6 text-[#A58B5F] group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-serif text-2xl font-medium">Founder</h3>
                      <p className="text-[13px] text-[#E2D9C8]/70 font-mono mt-1">
                        Varun Gulati Profile & Philosophy
                      </p>
                    </div>
                  </button>

                  {/* Card 3: ORDERS */}
                  <button
                    onClick={() => setActiveModule('orders')}
                    className="p-6 bg-[#3C2921] text-[#F3EFE6] border border-[#A58B5F]/40 shadow-lg text-left hover:bg-[#51292D] transition-all group flex flex-col justify-between h-44"
                  >
                    <ShoppingBag className="w-6 h-6 text-[#A58B5F] group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-serif text-2xl font-medium">Orders</h3>
                      <p className="text-[13px] text-[#E2D9C8]/70 font-mono mt-1">
                        Dispatch, Packing & Courier
                      </p>
                    </div>
                  </button>

                  {/* Card 3: USERS */}
                  <button
                    onClick={() => setActiveModule('users')}
                    className="p-6 bg-[#3C2921] text-[#F3EFE6] border border-[#A58B5F]/40 shadow-lg text-left hover:bg-[#51292D] transition-all group flex flex-col justify-between h-44"
                  >
                    <Users className="w-6 h-6 text-[#A58B5F] group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-serif text-2xl font-medium">Users</h3>
                      <p className="text-[13px] text-[#E2D9C8]/70 font-mono mt-1">
                        Patron Dossiers & Lifetime Spend
                      </p>
                    </div>
                  </button>

                  {/* Card 4: CART USERS */}
                  <button
                    onClick={() => setActiveModule('cart-users')}
                    className="p-6 bg-[#3C2921] text-[#F3EFE6] border border-[#A58B5F]/40 shadow-lg text-left hover:bg-[#51292D] transition-all group flex flex-col justify-between h-44"
                  >
                    <ShoppingCart className="w-6 h-6 text-[#A58B5F] group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-serif text-2xl font-medium">Cart Users</h3>
                      <p className="text-[13px] text-[#E2D9C8]/70 font-mono mt-1">
                        Active Baskets & Concierge Outreach
                      </p>
                    </div>
                  </button>

                  {/* Card 5: ADD */}
                  <button
                    onClick={() => setActiveModule('add')}
                    className="p-6 bg-[#51292D] text-[#F3EFE6] border border-[#A58B5F]/40 shadow-lg text-left hover:bg-[#3C2921] transition-all group flex flex-col justify-between h-44"
                  >
                    <PlusCircle className="w-6 h-6 text-[#F3EFE6] group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="font-serif text-2xl font-medium">Add</h3>
                      <p className="text-[13px] text-[#E2D9C8]/80 font-mono mt-1">
                        New Product, Category or Section
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Quick Products Overview */}
              <div className="space-y-4 pt-4 border-t border-[#CCC5B9]/80">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-2xl text-[#252522]">Catalog Pieces</h3>
                  <button
                    onClick={() => setActiveModule('add')}
                    className="text-xs font-mono uppercase text-[#51292D] underline"
                  >
                    + Add New Piece
                  </button>
                </div>

                <div className="divide-y divide-[#CCC5B9]/60 border border-[#CCC5B9] bg-[#F3EFE6]">
                  {products.map((p) => (
                    <div key={p.id} className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-14 bg-[#E2D9C8] relative shrink-0 border border-[#CCC5B9]">
                          <Image src={p.images[0]?.url || ''} alt={p.name} fill className="object-cover" sizes="48px" />
                        </div>
                        <div>
                          <h4 className="font-serif text-base text-[#252522]">{p.name}</h4>
                          <span className="text-[13px] font-mono text-[#252522]/60">
                            SKU: {p.sku} · Stock: {p.stock} units
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-serif text-base text-[#51292D] font-medium">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedProductForEdit(p);
                            setActiveModule('add');
                          }}
                          className="px-3 py-1 bg-[#E2D9C8] hover:bg-[#51292D] hover:text-[#F3EFE6] text-xs font-mono transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE 2: VISUAL CMS EDIT (Section Blocks Editor) */}
          {/* ============================================================== */}
          {activeModule === 'edit' && (
            <div className="space-y-8 max-w-5xl">
              <div className="flex justify-between items-end border-b border-[#CCC5B9]/80 pb-4">
                <div>
                  <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                    CONTENT MANAGEMENT SYSTEM
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                    Visual Section Editor
                  </h1>
                  <p className="text-xs text-[#252522]/70 font-sans mt-1">
                    Reorder, modify copy, customize backgrounds, and publish live storefront sections without code.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => saveCmsSections(cmsSections)}
                    className="px-4 py-2 bg-[#E2D9C8] border border-[#CCC5B9] text-xs font-mono uppercase tracking-wider hover:bg-[#CCC5B9]"
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={() => publishCms(cmsSections)}
                    className="px-5 py-2 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#3C2921]"
                  >
                    Publish Live
                  </button>
                </div>
              </div>

              {/* Section Blocks List with Move Up / Move Down / Reorder */}
              <div className="space-y-4">
                {cmsSections.map((sec, idx) => (
                  <div
                    key={sec.id}
                    className="p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#51292D] text-[#F3EFE6] text-[12px] font-mono uppercase">
                          Block {idx + 1}
                        </span>
                        <span className="text-xs font-mono text-[#A58B5F] uppercase">{sec.type}</span>
                        {!sec.visible && (
                          <span className="text-[12px] font-mono text-[#51292D] border border-[#51292D] px-1.5 py-0.2">
                            Hidden
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl text-[#252522] font-medium">{sec.heading}</h3>
                      <p className="text-xs text-[#252522]/70 font-sans line-clamp-1">{sec.paragraph}</p>
                    </div>

                    {/* Block Action Controls */}
                    <div className="flex items-center gap-2 self-end md:self-auto">
                      {/* Move Up */}
                      <button
                        disabled={idx === 0}
                        onClick={() => {
                          const updated = [...cmsSections];
                          const temp = updated[idx - 1];
                          updated[idx - 1] = updated[idx];
                          updated[idx] = temp;
                          saveCmsSections(updated);
                        }}
                        className="p-2 bg-[#F3EFE6] border border-[#CCC5B9] hover:bg-[#51292D] hover:text-[#F3EFE6] disabled:opacity-30 transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      {/* Move Down */}
                      <button
                        disabled={idx === cmsSections.length - 1}
                        onClick={() => {
                          const updated = [...cmsSections];
                          const temp = updated[idx + 1];
                          updated[idx + 1] = updated[idx];
                          updated[idx] = temp;
                          saveCmsSections(updated);
                        }}
                        className="p-2 bg-[#F3EFE6] border border-[#CCC5B9] hover:bg-[#51292D] hover:text-[#F3EFE6] disabled:opacity-30 transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      {/* Toggle Visibility */}
                      <button
                        onClick={() => {
                          const updated = cmsSections.map((s) =>
                            s.id === sec.id ? { ...s, visible: !s.visible } : s
                          );
                          saveCmsSections(updated);
                        }}
                        className="p-2 bg-[#F3EFE6] border border-[#CCC5B9] hover:bg-[#51292D] hover:text-[#F3EFE6] transition-colors"
                        title={sec.visible ? 'Hide Section' : 'Show Section'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit Content */}
                      <button
                        onClick={() => setEditingCmsSection(sec)}
                        className="px-4 py-2 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#3C2921]"
                      >
                        Edit Block
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Modal for Selected Section Block */}
              {editingCmsSection && (
                <div className="fixed inset-0 z-50 bg-[#252522]/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-2xl bg-[#F3EFE6] border border-[#A58B5F]/40 p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-[#CCC5B9]/80 pb-3">
                      <h3 className="font-serif text-2xl text-[#252522]">
                        Editing: {editingCmsSection.name}
                      </h3>
                      <button
                        onClick={() => setEditingCmsSection(null)}
                        className="text-[#252522]/60 hover:text-[#51292D]"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4 text-xs font-sans">
                      <div>
                        <label className="block font-mono uppercase text-[#252522]/70 mb-1">Headline (H2)</label>
                        <input
                          type="text"
                          value={editingCmsSection.heading}
                          onChange={(e) =>
                            setEditingCmsSection({ ...editingCmsSection, heading: e.target.value })
                          }
                          className="w-full p-2.5 bg-[#E2D9C8]/40 border border-[#CCC5B9] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-mono uppercase text-[#252522]/70 mb-1">Eyebrow / Subheading</label>
                        <input
                          type="text"
                          value={editingCmsSection.subheading || ''}
                          onChange={(e) =>
                            setEditingCmsSection({ ...editingCmsSection, subheading: e.target.value })
                          }
                          className="w-full p-2.5 bg-[#E2D9C8]/40 border border-[#CCC5B9] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-mono uppercase text-[#252522]/70 mb-1">Editorial Paragraph</label>
                        <textarea
                          rows={3}
                          value={editingCmsSection.paragraph || ''}
                          onChange={(e) =>
                            setEditingCmsSection({ ...editingCmsSection, paragraph: e.target.value })
                          }
                          className="w-full p-2.5 bg-[#E2D9C8]/40 border border-[#CCC5B9] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono uppercase text-[#252522]/70 mb-1">Button Text</label>
                          <input
                            type="text"
                            value={editingCmsSection.buttonText || ''}
                            onChange={(e) =>
                              setEditingCmsSection({ ...editingCmsSection, buttonText: e.target.value })
                            }
                            className="w-full p-2.5 bg-[#E2D9C8]/40 border border-[#CCC5B9] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-mono uppercase text-[#252522]/70 mb-1">Button Target Link</label>
                          <input
                            type="text"
                            value={editingCmsSection.buttonLink || ''}
                            onChange={(e) =>
                              setEditingCmsSection({ ...editingCmsSection, buttonLink: e.target.value })
                            }
                            className="w-full p-2.5 bg-[#E2D9C8]/40 border border-[#CCC5B9] outline-none"
                          />
                        </div>
                      </div>

                      {/* Brand color presets */}
                      <div>
                        <label className="block font-mono uppercase text-[#252522]/70 mb-1">
                          Background Tone & Palette Presets
                        </label>
                        <div className="flex gap-2 items-center">
                          {[
                            { name: 'Estate Ivory', hex: '#F3EFE6' },
                            { name: 'Parchment', hex: '#E2D9C8' },
                            { name: 'Forest Green', hex: '#34483D' },
                            { name: 'Walnut Dark', hex: '#3C2921' },
                            { name: 'Oxblood Red', hex: '#51292D' }
                          ].map((c) => (
                            <button
                              key={c.hex}
                              type="button"
                              onClick={() =>
                                setEditingCmsSection({
                                  ...editingCmsSection,
                                  bgColor: c.hex,
                                  textColor: c.hex === '#F3EFE6' || c.hex === '#E2D9C8' ? '#252522' : '#F3EFE6'
                                })
                              }
                              className="w-7 h-7 rounded-full border border-[#CCC5B9] shadow-sm"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                          <span className="font-mono text-[13px] ml-2 text-[#252522]/60">
                            Current: {editingCmsSection.bgColor}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-[#CCC5B9]/80">
                      <button
                        onClick={() => setEditingCmsSection(null)}
                        className="px-4 py-2 border border-[#CCC5B9] text-xs font-mono uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          const updated = cmsSections.map((s) =>
                            s.id === editingCmsSection.id ? editingCmsSection : s
                          );
                          saveCmsSections(updated);
                          setEditingCmsSection(null);
                        }}
                        className="px-6 py-2 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE: FOUNDER CMS MANAGEMENT */}
          {/* ============================================================== */}
          {activeModule === 'founder' && (
            <div className="space-y-8 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#CCC5B9]/80 pb-4 gap-4">
                <div>
                  <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                    EDITORIAL CONTENT MANAGEMENT
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                    Founder Profile CMS
                  </h1>
                  <p className="font-sans text-xs sm:text-sm text-[#252522]/70 mt-1">
                    Manage Varun Gulati&apos;s biographical narrative, philosophical tenets, direct personal statement, and SEO metadata.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="/founder"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 border border-[#51292D] text-[#51292D] hover:bg-[#51292D]/10 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Live Page</span>
                  </a>
                  <button
                    onClick={() => {
                      updateFounderContent(founderForm);
                    }}
                    className="px-6 py-2 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#3C2921] transition-colors shadow-sm flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Founder Profile</span>
                  </button>
                </div>
              </div>

              {/* Founder Editor Form Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left 2 Cols: Form Controls */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Section 1: Identity */}
                  <div className="p-6 bg-[#E2D9C8]/30 border border-[#CCC5B9] space-y-4 shadow-sm">
                    <h3 className="font-serif text-lg text-[#252522] border-b border-[#CCC5B9]/60 pb-2 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-[#51292D]" />
                      <span>1. Founder Identity & Header</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={founderForm.name}
                          onChange={(e) => setFounderForm({ ...founderForm, name: e.target.value })}
                          className="w-full px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-serif text-[#252522] focus:border-[#51292D] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">
                          Official Title
                        </label>
                        <input
                          type="text"
                          value={founderForm.title}
                          onChange={(e) => setFounderForm({ ...founderForm, title: e.target.value })}
                          className="w-full px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] focus:border-[#51292D] outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">
                        Subtitle / Tagline
                      </label>
                      <input
                        type="text"
                        value={founderForm.subtitle}
                        onChange={(e) => setFounderForm({ ...founderForm, subtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] focus:border-[#51292D] outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">
                          Portrait Image URL
                        </label>
                        <input
                          type="text"
                          value={founderForm.heroImage}
                          onChange={(e) => setFounderForm({ ...founderForm, heroImage: e.target.value })}
                          className="w-full px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono text-[#252522] focus:border-[#51292D] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">
                          Image Alt Text
                        </label>
                        <input
                          type="text"
                          value={founderForm.imageAlt}
                          onChange={(e) => setFounderForm({ ...founderForm, imageAlt: e.target.value })}
                          className="w-full px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] focus:border-[#51292D] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Bio Paragraphs */}
                  <div className="p-6 bg-[#E2D9C8]/30 border border-[#CCC5B9] space-y-4 shadow-sm">
                    <h3 className="font-serif text-lg text-[#252522] border-b border-[#CCC5B9]/60 pb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#51292D]" />
                      <span>2. Biographical Narrative</span>
                    </h3>
                    <p className="text-xs text-[#252522]/60">
                      Restrained, authentic editorial narrative. Emphasizes curation and craft without fictional pedigree.
                    </p>
                    {founderForm.bioParagraphs.map((para, idx) => (
                      <div key={idx}>
                        <label className="block text-[13px] font-mono uppercase text-[#252522]/70 mb-1">
                          Narrative Paragraph {idx + 1}
                        </label>
                        <textarea
                          rows={3}
                          value={para}
                          onChange={(e) => {
                            const next = [...founderForm.bioParagraphs];
                            next[idx] = e.target.value;
                            setFounderForm({ ...founderForm, bioParagraphs: next });
                          }}
                          className="w-full p-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] focus:border-[#51292D] outline-none leading-relaxed"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Section 3: Philosophy Tenets */}
                  <div className="p-6 bg-[#E2D9C8]/30 border border-[#CCC5B9] space-y-4 shadow-sm">
                    <h3 className="font-serif text-lg text-[#252522] border-b border-[#CCC5B9]/60 pb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#51292D]" />
                      <span>3. Four Philosophy Tenets</span>
                    </h3>
                    <div className="space-y-4">
                      {founderForm.philosophyPoints.map((point, idx) => (
                        <div key={idx} className="p-3.5 bg-[#F3EFE6] border border-[#CCC5B9]/80 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-[#51292D] font-bold">0{idx + 1}.</span>
                            <input
                              type="text"
                              value={point.title}
                              onChange={(e) => {
                                const next = [...founderForm.philosophyPoints];
                                next[idx] = { ...next[idx], title: e.target.value };
                                setFounderForm({ ...founderForm, philosophyPoints: next });
                              }}
                              className="w-full px-2 py-1 bg-white border border-[#CCC5B9] text-xs font-serif text-[#252522]"
                              placeholder="Pillar title"
                            />
                          </div>
                          <textarea
                            rows={2}
                            value={point.description}
                            onChange={(e) => {
                              const next = [...founderForm.philosophyPoints];
                              next[idx] = { ...next[idx], description: e.target.value };
                              setFounderForm({ ...founderForm, philosophyPoints: next });
                            }}
                            className="w-full p-2 bg-white border border-[#CCC5B9] text-xs font-sans text-[#252522]"
                            placeholder="Pillar description"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 4: Personal Statement */}
                  <div className="p-6 bg-[#E2D9C8]/30 border border-[#CCC5B9] space-y-4 shadow-sm">
                    <h3 className="font-serif text-lg text-[#252522] border-b border-[#CCC5B9]/60 pb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#51292D]" />
                      <span>4. Personal Statement & Direct Note</span>
                    </h3>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">
                        Highlighted Pull Quote / Personal Statement
                      </label>
                      <textarea
                        rows={2}
                        value={founderForm.personalStatement}
                        onChange={(e) => setFounderForm({ ...founderForm, personalStatement: e.target.value })}
                        className="w-full p-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-serif italic text-[#252522]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">
                        Personal Note Headline
                      </label>
                      <input
                        type="text"
                        value={founderForm.personalStatementHeading}
                        onChange={(e) => setFounderForm({ ...founderForm, personalStatementHeading: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-serif text-[#252522]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">
                        Personal Note Letter Body
                      </label>
                      <textarea
                        rows={4}
                        value={founderForm.personalStatementNote}
                        onChange={(e) => setFounderForm({ ...founderForm, personalStatementNote: e.target.value })}
                        className="w-full p-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522] leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Section 5: SEO Fields */}
                  <div className="p-6 bg-[#E2D9C8]/30 border border-[#CCC5B9] space-y-4 shadow-sm">
                    <h3 className="font-serif text-lg text-[#252522] border-b border-[#CCC5B9]/60 pb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#51292D]" />
                      <span>5. Search & Social Metadata (SEO)</span>
                    </h3>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={founderForm.seoTitle}
                        onChange={(e) => setFounderForm({ ...founderForm, seoTitle: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono text-[#252522]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">
                        Meta Description
                      </label>
                      <textarea
                        rows={2}
                        value={founderForm.seoDescription}
                        onChange={(e) => setFounderForm({ ...founderForm, seoDescription: e.target.value })}
                        className="w-full p-2.5 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans text-[#252522]"
                      />
                    </div>
                  </div>
                </div>

                {/* Right 1 Col: Live Visual Preview Card */}
                <div className="space-y-6">
                  <div className="p-6 bg-[#3C2921] text-[#F3EFE6] border border-[#A58B5F]/40 shadow-lg space-y-4 sticky top-6">
                    <span className="text-[12px] font-mono uppercase tracking-[0.2em] text-[#A58B5F] block">
                      Live Preview Snapshot
                    </span>
                    <div className="relative aspect-[3/4] w-full bg-[#252522] overflow-hidden border border-[#A58B5F]/30">
                      <Image
                        src={founderForm.heroImage || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80'}
                        alt={founderForm.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-xl text-[#F3EFE6]">{founderForm.name}</h4>
                      <p className="text-xs font-mono text-[#A58B5F]">{founderForm.title}</p>
                      <p className="text-[13px] text-[#E2D9C8]/80 font-serif italic pt-2 border-t border-[#A58B5F]/20">
                        &ldquo;{founderForm.personalStatement.slice(0, 110)}...&rdquo;
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        updateFounderContent(founderForm);
                      }}
                      className="w-full py-3 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-widest hover:bg-[#A58B5F] hover:text-[#252522] transition-colors mt-4 flex items-center justify-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save & Publish</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE 3: ORDERS MANAGEMENT */}
          {/* ============================================================== */}
          {activeModule === 'orders' && (
            <div className="space-y-6 max-w-7xl">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#CCC5B9]/80 pb-4 gap-4">
                <div>
                  <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                    TRANSACTION RECONCILIATION
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                    Orders Fulfillment
                  </h1>
                </div>

                {/* Filter Status Selector */}
                <div className="flex gap-2 text-xs font-mono overflow-x-auto pb-1 max-w-full">
                  {['all', 'new', 'processing', 'packed', 'shipped', 'delivered'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderFilter(st)}
                      className={`px-3 py-1.5 uppercase transition-colors border whitespace-nowrap min-h-[38px] ${
                        orderFilter === st
                          ? 'bg-[#51292D] text-[#F3EFE6] border-[#51292D]'
                          : 'bg-[#E2D9C8]/40 border-[#CCC5B9] text-[#252522] hover:bg-[#E2D9C8]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile View: Responsive Order Cards (Under 768px) */}
              <div className="md:hidden space-y-3">
                {orders
                  .filter((o) => orderFilter === 'all' || o.fulfillmentStatus === orderFilter)
                  .map((ord) => (
                    <div key={ord.id} className="p-4 bg-[#F3EFE6] border border-[#CCC5B9] shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-mono font-bold text-base text-[#51292D]">#{ord.orderNumber}</span>
                          <span className="font-serif text-base text-[#252522] block font-medium mt-0.5">{ord.customer.name}</span>
                          <span className="text-[12px] font-mono text-[#252522]/60">
                            {ord.shippingAddress.city}, {ord.shippingAddress.state}
                          </span>
                        </div>
                        <span className="font-serif text-lg font-semibold text-[#252522]">
                          ₹{ord.total.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[11px] font-mono uppercase pt-1">
                        <span className="px-2 py-0.5 bg-[#34483D]/10 text-[#34483D] border border-[#34483D]/20">
                          {ord.paymentStatus}
                        </span>
                        <span className="px-2 py-0.5 bg-[#51292D]/10 text-[#51292D] border border-[#51292D]/20">
                          {ord.fulfillmentStatus}
                        </span>
                        <span className="px-2 py-0.5 bg-[#E2D9C8] text-[#252522]/70">
                          {ord.items.length} piece{ord.items.length > 1 ? 's' : ''}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedOrderForModal(ord)}
                        className="w-full py-2.5 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#3C2921] transition-colors min-h-[44px] flex items-center justify-center gap-2"
                      >
                        <span>Manage Consignment</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
              </div>

              {/* Desktop View: Full Orders Table (768px and up) */}
              <div className="hidden md:block border border-[#CCC5B9] bg-[#F3EFE6] shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#E2D9C8]/70 border-b border-[#CCC5B9] text-[#252522]/80 uppercase">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Patron Name</th>
                      <th className="p-4">Pieces</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Fulfillment Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#CCC5B9]/60 font-sans">
                    {orders
                      .filter((o) => orderFilter === 'all' || o.fulfillmentStatus === orderFilter)
                      .map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#E2D9C8]/30 transition-colors">
                          <td className="p-4 font-mono font-medium text-[#51292D]">#{ord.orderNumber}</td>
                          <td className="p-4">
                            <span className="font-medium text-[#252522] block">{ord.customer.name}</span>
                            <span className="text-[13px] font-mono text-[#252522]/60">{ord.shippingAddress.city}, {ord.shippingAddress.state}</span>
                          </td>
                          <td className="p-4 font-mono">{ord.items.length}</td>
                          <td className="p-4 font-serif text-sm font-semibold text-[#252522]">
                            ₹{ord.total.toLocaleString('en-IN')}
                          </td>
                          <td className="p-4">
                            <span className="text-[12px] font-mono uppercase px-2 py-0.5 bg-[#34483D]/10 text-[#34483D] border border-[#34483D]/20">
                              {ord.paymentStatus}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-[12px] font-mono uppercase px-2 py-0.5 bg-[#51292D]/10 text-[#51292D] border border-[#51292D]/20">
                              {ord.fulfillmentStatus}
                            </span>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => setSelectedOrderForModal(ord)}
                              className="px-3 py-1.5 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#3C2921]"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Order Detail Modal (Responsive Dialog) */}
              {selectedOrderForModal && (
                <div className="fixed inset-0 z-50 bg-[#252522]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
                  <div className="w-full max-w-2xl bg-[#F3EFE6] border border-[#A58B5F]/40 p-5 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-[#CCC5B9]/80 pb-3">
                      <div>
                        <span className="text-[12px] font-mono uppercase text-[#A58B5F]">Order Management</span>
                        <h3 className="font-serif text-2xl text-[#252522]">
                          #{selectedOrderForModal.orderNumber}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedOrderForModal(null)}
                        className="text-[#252522]/60 hover:text-[#51292D] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Close modal"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Customer & Shipping snapshot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-[#E2D9C8]/40 p-4 border border-[#CCC5B9]">
                      <div>
                        <span className="text-[#252522]/50 uppercase block">Customer</span>
                        <p className="font-medium text-[#252522] text-sm">{selectedOrderForModal.customer.name}</p>
                        <p>{selectedOrderForModal.customer.phone}</p>
                        <p className="truncate">{selectedOrderForModal.customer.email}</p>
                      </div>
                      <div>
                        <span className="text-[#252522]/50 uppercase block">Delivery Address</span>
                        <p>{selectedOrderForModal.shippingAddress.addressLine1}</p>
                        <p>{selectedOrderForModal.shippingAddress.city}, {selectedOrderForModal.shippingAddress.state} - {selectedOrderForModal.shippingAddress.pincode}</p>
                      </div>
                    </div>

                    {/* Frozen Product Snapshots */}
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase text-[#252522]/70 block">Commissioned Pieces</span>
                      <div className="divide-y divide-[#CCC5B9]/60 border border-[#CCC5B9] bg-[#F3EFE6]">
                        {selectedOrderForModal.items.map((item, idx) => (
                          <div key={idx} className="p-3 flex items-center justify-between text-xs">
                            <span className="font-serif text-sm">{item.name} {item.variantTitle ? `(${item.variantTitle})` : ''}</span>
                            <span className="font-mono">Qty: {item.quantity} · ₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status change actions */}
                    <div className="space-y-2 pt-2 border-t border-[#CCC5B9]/60">
                      <span className="text-xs font-mono uppercase text-[#252522]/70 block">
                        Advance Fulfillment Status:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(['processing', 'packed', 'shipped', 'out_for_delivery', 'delivered'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => {
                              updateOrderStatus(selectedOrderForModal.id, st);
                              setSelectedOrderForModal(null);
                            }}
                            className="px-3 py-2 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase hover:bg-[#3C2921] min-h-[40px] flex items-center"
                          >
                            Mark {st.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 text-right">
                      <button
                        onClick={() => setSelectedOrderForModal(null)}
                        className="px-6 py-2.5 border border-[#CCC5B9] text-xs font-mono uppercase min-h-[44px]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE: PATRONS & USERS */}
          {/* ============================================================== */}
          {activeModule === 'users' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#CCC5B9]/80 pb-4 gap-4">
                <div>
                  <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                    CLIENT DOSSIERS
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                    Registered Patrons & Clients
                  </h1>
                  <p className="text-xs text-[#252522]/70 font-sans mt-1">
                    Direct access to verified customer profiles, lifetime purchase records, and concierge outreach.
                  </p>
                </div>

                {/* Customer Search Bar */}
                <div className="flex items-center gap-2 bg-[#E2D9C8]/50 border border-[#CCC5B9] px-3 py-2 w-full sm:w-64 text-xs font-mono">
                  <Search className="w-3.5 h-3.5 text-[#51292D]" />
                  <input
                    type="text"
                    value={customerSearchQuery}
                    onChange={(e) => setCustomerSearchQuery(e.target.value)}
                    placeholder="Search patrons..."
                    className="bg-transparent border-none outline-none text-[#252522] placeholder:text-[#252522]/50 w-full text-xs"
                  />
                </div>
              </div>

              {/* Patron Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-4 bg-[#E2D9C8]/40 border border-[#CCC5B9]">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Total Dossiers</span>
                  <span className="font-serif text-2xl sm:text-3xl text-[#51292D] mt-1 block">{customers.length}</span>
                </div>
                <div className="p-4 bg-[#E2D9C8]/40 border border-[#CCC5B9]">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Active Baskets</span>
                  <span className="font-serif text-2xl sm:text-3xl text-[#34483D] mt-1 block">{activeCartUsers.length}</span>
                </div>
                <div className="p-4 bg-[#E2D9C8]/40 border border-[#CCC5B9] col-span-2 sm:col-span-1">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Verified VIPs</span>
                  <span className="font-serif text-2xl sm:text-3xl text-[#252522] mt-1 block">
                    {customers.filter((c) => c.role === 'admin' || c.ordersCount > 0).length}
                  </span>
                </div>
              </div>

              {/* Mobile View: Responsive Patron Cards */}
              <div className="md:hidden space-y-3">
                {customers
                  .filter((c) =>
                    !customerSearchQuery ||
                    c.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
                    c.email.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
                    (c.phone && c.phone.includes(customerSearchQuery))
                  )
                  .map((cust) => (
                    <div key={cust.id} className="p-4 bg-[#F3EFE6] border border-[#CCC5B9] shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif text-lg text-[#252522] font-medium">{cust.name}</h4>
                          <span className="text-[12px] font-mono text-[#51292D] block">{cust.email}</span>
                        </div>
                        <span className="text-[11px] font-mono uppercase px-2 py-0.5 bg-[#34483D]/10 text-[#34483D] border border-[#34483D]/20">
                          {cust.role}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-[#252522]/70 space-y-1 pt-1 border-t border-[#CCC5B9]/50">
                        {cust.phone && <p>Tel: {cust.phone}</p>}
                        <p>Orders: {cust.ordersCount} · Lifetime Spend: ₹{(cust.lifetimeSpend || 0).toLocaleString('en-IN')}</p>
                        {cust.addresses && cust.addresses[0] && (
                          <p className="text-[12px] text-[#252522]/60">
                            Location: {cust.addresses[0].city}, {cust.addresses[0].state}
                          </p>
                        )}
                      </div>

                      {cust.phone && (
                        <a
                          href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(cust.name)}%2C%20Gulati%20%26%20Sons%20Concierge%20here...`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-2.5 bg-[#34483D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 min-h-[44px] hover:bg-[#252522] transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>WhatsApp Outreach</span>
                        </a>
                      )}
                    </div>
                  ))}
              </div>

              {/* Desktop View: Full Table */}
              <div className="hidden md:block border border-[#CCC5B9] bg-[#F3EFE6] shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#E2D9C8]/70 border-b border-[#CCC5B9] text-[#252522]/80 uppercase">
                    <tr>
                      <th className="p-4">Patron</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Primary Destination</th>
                      <th className="p-4">Orders</th>
                      <th className="p-4">Lifetime Spend</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#CCC5B9]/60 font-sans">
                    {customers
                      .filter((c) =>
                        !customerSearchQuery ||
                        c.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
                        c.email.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
                        (c.phone && c.phone.includes(customerSearchQuery))
                      )
                      .map((cust) => (
                        <tr key={cust.id} className="hover:bg-[#E2D9C8]/30 transition-colors">
                          <td className="p-4 font-serif text-sm font-medium text-[#252522]">
                            {cust.name}
                            <span className="block text-[11px] font-mono text-[#A58B5F] uppercase mt-0.5">{cust.role}</span>
                          </td>
                          <td className="p-4 font-mono text-xs">
                            <span className="text-[#252522] block">{cust.email}</span>
                            <span className="text-[#252522]/60">{cust.phone || 'No phone'}</span>
                          </td>
                          <td className="p-4 font-mono text-xs text-[#252522]/70">
                            {cust.addresses && cust.addresses[0]
                              ? `${cust.addresses[0].city}, ${cust.addresses[0].state}`
                              : 'Not recorded'}
                          </td>
                          <td className="p-4 font-mono font-medium">{cust.ordersCount}</td>
                          <td className="p-4 font-serif text-sm font-semibold text-[#51292D]">
                            ₹{(cust.lifetimeSpend || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="p-4">
                            {cust.phone ? (
                              <a
                                href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(cust.name)}%2C%20Gulati%20%26%20Sons%20Concierge...`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-[#34483D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#252522] inline-flex items-center gap-1"
                              >
                                Concierge
                              </a>
                            ) : (
                              <span className="text-[#252522]/40 text-xs font-mono">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE 4: CART USERS (Active & Abandoned Baskets) */}
          {/* ============================================================== */}
          {activeModule === 'cart-users' && (
            <div className="space-y-6 max-w-5xl">
              <div className="border-b border-[#CCC5B9]/80 pb-4">
                <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                  BASKET SURVEILLANCE & RECOVERY
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                  Active Cart Users
                </h1>
                <p className="text-xs text-[#252522]/70 font-sans mt-1">
                  Patrons with pending selections in bag. Direct outreach via WhatsApp and concierge email with polite assistance copy.
                </p>
              </div>

              <div className="space-y-4">
                {activeCartUsers.map((cu) => (
                  <div
                    key={cu.id}
                    className="p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-xl text-[#252522] font-medium">{cu.name}</span>
                        <span className="text-[12px] font-mono uppercase px-2 py-0.5 bg-[#34483D]/10 text-[#34483D] border border-[#34483D]/30">
                          Contact Available
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[#252522]/60">
                        {cu.phone} · {cu.email} · Last active: {cu.lastActive}
                      </p>
                      <div className="text-xs text-[#252522]/80 font-serif">
                        Pieces in bag: {cu.itemNames.join(', ')}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4">
                      <span className="font-serif text-2xl text-[#51292D] font-medium">
                        ₹{cu.cartValue.toLocaleString('en-IN')}
                      </span>

                      <div className="flex gap-2">
                        {/* WhatsApp Action with prewritten message */}
                        <a
                          href={`https://wa.me/${cu.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Greetings from Gulati & Sons Concierge. We noticed your interest in ${cu.itemNames[0]}. May we assist with fragrance consultation or delivery arrangements?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#34483D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#252522] transition-colors flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Assistance
                        </a>

                        {/* Email Action */}
                        <a
                          href={`mailto:${cu.email}?subject=${encodeURIComponent(
                            'Gulati & Sons: Assistance with Your Private House Selection'
                          )}&body=${encodeURIComponent(
                            `Dear ${cu.name},\n\nWe noticed you selected ${cu.itemNames[0]} at Gulati & Sons. If we can assist with sizing, fragrance sillage, or white-glove delivery, please reply to this note.\n\nWarm regards,\nGulati & Sons Concierge`
                          )}`}
                          className="px-4 py-2 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#3C2921] transition-colors"
                        >
                          Send Email
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE 5: ADD (Creation Hub & Product Wizard) */}
          {/* ============================================================== */}
          {activeModule === 'add' && (
            <div className="space-y-8 max-w-4xl">
              <div className="border-b border-[#CCC5B9]/80 pb-4">
                <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                  CREATION SUITE
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                  Add Catalog Piece Wizard
                </h1>
                <p className="text-xs text-[#252522]/70 font-sans mt-1">
                  Step-by-step catalog commissioning wizard with live preview and automatic slug generation.
                </p>
              </div>

              {/* Wizard Steps Navigation */}
              <div className="flex border-b border-[#CCC5B9] text-xs font-mono">
                {[
                  { step: 1, title: 'Basics & Title' },
                  { step: 2, title: 'Pricing & Stock' },
                  { step: 3, title: 'Media & Description' },
                  { step: 4, title: 'Review & Publish' }
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setWizardStep(s.step)}
                    className={`px-4 py-2 uppercase border-b-2 transition-colors ${
                      wizardStep === s.step
                        ? 'border-[#51292D] text-[#51292D] font-semibold'
                        : 'border-transparent text-[#252522]/60'
                    }`}
                  >
                    0{s.step}. {s.title}
                  </button>
                ))}
              </div>

              {/* Step 1: Basics */}
              {wizardStep === 1 && (
                <div className="p-8 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Piece Title</label>
                    <input
                      type="text"
                      value={newProductName}
                      onChange={(e) => {
                        setNewProductName(e.target.value);
                        setNewProductSku(`GS-${e.target.value.substring(0, 4).toUpperCase()}-${Math.floor(10 + Math.random() * 89)}`);
                      }}
                      placeholder="e.g. Royal Mysore Sandalwood Eau de Parfum"
                      className="w-full p-3 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans outline-none focus:border-[#51292D]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Category</label>
                      <select
                        value={newProductCategory}
                        onChange={(e) => setNewProductCategory(e.target.value as any)}
                        className="w-full p-3 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans outline-none focus:border-[#51292D]"
                      >
                        <option value="fragrances">Fragrances</option>
                        <option value="watches">Timepieces</option>
                        <option value="essentials">Daily Essentials</option>
                        <option value="clothing">Clothing Atelier</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Generated SKU</label>
                      <input
                        type="text"
                        value={newProductSku}
                        onChange={(e) => setNewProductSku(e.target.value)}
                        placeholder="GS-XXXX-01"
                        className="w-full p-3 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setWizardStep(2)}
                      className="px-6 py-2.5 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider"
                    >
                      Next: Pricing & Stock &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Pricing & Stock */}
              {wizardStep === 2 && (
                <div className="p-8 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Selling Price (₹)</label>
                      <input
                        type="number"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(Number(e.target.value))}
                        className="w-full p-3 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">MRP Benchmark (₹)</label>
                      <input
                        type="number"
                        value={newProductMrp}
                        onChange={(e) => setNewProductMrp(Number(e.target.value))}
                        className="w-full p-3 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Stock Quantity</label>
                      <input
                        type="number"
                        value={newProductStock}
                        onChange={(e) => setNewProductStock(Number(e.target.value))}
                        className="w-full p-3 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setWizardStep(1)}
                      className="px-6 py-2.5 border border-[#CCC5B9] text-xs font-mono uppercase"
                    >
                      &larr; Back
                    </button>
                    <button
                      onClick={() => setWizardStep(3)}
                      className="px-6 py-2.5 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider"
                    >
                      Next: Media & Description &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Media & Description */}
              {wizardStep === 3 && (
                <div className="p-8 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">ImageKit / Photography URL</label>
                    <input
                      type="url"
                      value={newProductImageUrl}
                      onChange={(e) => setNewProductImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full p-3 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Short Description (Card Summary)</label>
                    <input
                      type="text"
                      value={newProductShortDesc}
                      onChange={(e) => setNewProductShortDesc(e.target.value)}
                      placeholder="A short one-line summary..."
                      className="w-full p-3 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#252522]/70 mb-1">Full Editorial Description</label>
                    <textarea
                      rows={3}
                      value={newProductDesc}
                      onChange={(e) => setNewProductDesc(e.target.value)}
                      placeholder="Detailed craftsmanship and formulation notes..."
                      className="w-full p-3 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans outline-none"
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setWizardStep(2)}
                      className="px-6 py-2.5 border border-[#CCC5B9] text-xs font-mono uppercase"
                    >
                      &larr; Back
                    </button>
                    <button
                      onClick={() => setWizardStep(4)}
                      className="px-6 py-2.5 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider"
                    >
                      Next: Review & Publish &rarr;
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Publish */}
              {wizardStep === 4 && (
                <div className="p-8 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-6">
                  <h3 className="font-serif text-2xl text-[#252522]">Piece Dossier Summary</h3>

                  <div className="space-y-2 text-xs font-mono bg-[#F3EFE6] p-4 border border-[#CCC5B9]">
                    <p><span className="text-[#252522]/60">Name:</span> {newProductName || 'Untitled Piece'}</p>
                    <p><span className="text-[#252522]/60">SKU:</span> {newProductSku}</p>
                    <p><span className="text-[#252522]/60">Category:</span> {newProductCategory}</p>
                    <p><span className="text-[#252522]/60">Selling Price:</span> ₹{newProductPrice.toLocaleString('en-IN')}</p>
                    <p><span className="text-[#252522]/60">Stock:</span> {newProductStock} units</p>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setWizardStep(3)}
                      className="px-6 py-2.5 border border-[#CCC5B9] text-xs font-mono uppercase"
                    >
                      &larr; Back
                    </button>
                    <button
                      onClick={() => {
                        const created: Product = {
                          id: 'prod-' + Date.now(),
                          name: newProductName || 'New House Piece',
                          slug: (newProductName || 'new-piece').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                          sku: newProductSku || 'GS-ITEM-01',
                          brand: 'Gulati & Sons Atelier',
                          category: newProductCategory,
                          categoryLabel: newProductCategory.toUpperCase(),
                          mrp: newProductMrp,
                          price: newProductPrice,
                          discountPercent: Math.round(((newProductMrp - newProductPrice) / newProductMrp) * 100),
                          stock: newProductStock,
                          lowStockThreshold: 3,
                          status: 'active',
                          shortDescription: newProductShortDesc || 'A newly curated addition to the Private House.',
                          description: newProductDesc || 'Crafted and curated with considered restraint.',
                          images: [
                            {
                              url: newProductImageUrl || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85',
                              alt: newProductName
                            }
                          ],
                          isIndexable: true,
                          variants: [
                            {
                              id: 'var-std',
                              title: 'Standard Edition',
                              sku: newProductSku || 'GS-ITEM-01',
                              price: newProductPrice,
                              stock: newProductStock,
                              attributes: { Edition: 'Standard' }
                            }
                          ],
                          features: [
                            { name: 'House Selection', explanation: 'Approved under Gulati & Sons standards' }
                          ],
                          specifications: { Category: newProductCategory },
                          tags: [newProductCategory, 'new-arrival'],
                          rating: 5.0,
                          reviewCount: 0,
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString()
                        };

                        saveProduct(created);
                        setActiveModule('home');
                        setWizardStep(1);
                        setNewProductName('');
                      }}
                      className="px-8 py-3 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-[0.2em] hover:bg-[#3C2921]"
                    >
                      Commission & Publish Piece
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE 6: INVENTORY & STOCK QUICK UPDATE */}
          {/* ============================================================== */}
          {activeModule === 'inventory' && (
            <div className="space-y-6 max-w-5xl">
              <div className="border-b border-[#CCC5B9]/80 pb-4">
                <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                  STOCK LEVEL CONTROLS
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                  Inventory Management
                </h1>
              </div>

              <div className="border border-[#CCC5B9] bg-[#F3EFE6] divide-y divide-[#CCC5B9]/60 shadow-sm">
                {products.map((p) => (
                  <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-14 bg-[#E2D9C8] relative shrink-0 border border-[#CCC5B9]">
                        <Image src={p.images[0]?.url || ''} alt={p.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div>
                        <h4 className="font-serif text-base text-[#252522]">{p.name}</h4>
                        <span className="text-[13px] font-mono text-[#252522]/60">SKU: {p.sku}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#CCC5B9]/40">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#252522]/70">Stock:</span>
                        <input
                          type="number"
                          defaultValue={p.stock}
                          onBlur={(e) => quickUpdateStock(p.id, Number(e.target.value))}
                          className="w-20 px-2 py-1.5 bg-[#E2D9C8]/40 border border-[#CCC5B9] text-xs font-mono text-center outline-none focus:border-[#51292D]"
                        />
                      </div>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-2 text-[#252522]/50 hover:text-[#51292D] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        title="Move to Trash"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE: PAYMENTS & GATEWAY SETTINGS */}
          {/* ============================================================== */}
          {activeModule === 'payments' && (
            <div className="space-y-6 max-w-5xl">
              <div className="border-b border-[#CCC5B9]/80 pb-4">
                <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                  FINANCIAL INFRASTRUCTURE
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                  Payment Gateway Integration
                </h1>
                <p className="text-xs text-[#252522]/70 font-sans mt-1">
                  Configure Razorpay processing mode, test simulated bank handshakes, and verify RBI PCI-DSS compliance parameters.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 sm:p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-[#252522]/70">Gateway Mode</span>
                    <span className="px-2.5 py-1 text-xs font-mono uppercase bg-[#34483D]/10 text-[#34483D] border border-[#34483D]/30 font-semibold">
                      {PaymentAdapter.getMode().toUpperCase()} MODE ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-[#252522]/80 leading-relaxed font-sans">
                    Storefront transactions are safely operating in verified Interactive Demo Mode. In this state, customer orders undergo complete payment verification handshakes, generate unique transaction identifiers, and create confirmed orders without charging live credit cards.
                  </p>
                  <div className="p-3 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#252522]/60">Razorpay Key ID:</span>
                      <span className="text-[#252522] font-bold">
                        {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? 'Configured on Server' : 'rzp_test_placeholder (Demo)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#252522]/60">Supported Rails:</span>
                      <span className="text-[#252522]">UPI · Cards · NetBanking · COD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#252522]/60">Settlement Currency:</span>
                      <span className="text-[#252522]">INR (₹)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-4 shadow-sm">
                  <span className="text-xs font-mono uppercase text-[#252522]/70 block">Banking Webhook & Verification</span>
                  <p className="text-xs text-[#252522]/80 leading-relaxed font-sans">
                    Webhook signatures are cryptographically validated against secret credentials at <code className="px-1.5 py-0.5 bg-[#F3EFE6] text-[#51292D] text-[11px] font-mono">/api/payments/verify</code>.
                  </p>
                  <div className="p-4 bg-[#F3EFE6] border border-[#CCC5B9] space-y-2">
                    <span className="text-[12px] font-mono uppercase text-[#A58B5F] block">Production Switch Guide</span>
                    <ol className="text-xs font-sans text-[#252522]/80 space-y-1.5 list-decimal pl-4">
                      <li>Supply <code className="text-[#51292D] font-mono">NEXT_PUBLIC_RAZORPAY_KEY_ID</code> in environment.</li>
                      <li>Supply <code className="text-[#51292D] font-mono">RAZORPAY_KEY_SECRET</code> in secure server variables.</li>
                      <li>PaymentAdapter automatically transitions to Live RBI Domestic Settlement.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE: COUPONS & DISCOUNTS */}
          {/* ============================================================== */}
          {activeModule === 'discounts' && (
            <div className="space-y-6 max-w-5xl">
              <div className="border-b border-[#CCC5B9]/80 pb-4">
                <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                  PROMOTIONAL ARCHITECTURE
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                  Coupons & Private Invitations
                </h1>
                <p className="text-xs text-[#252522]/70 font-sans mt-1">
                  Issue private acquisition vouchers, percentage privileges, and minimum basket requirements.
                </p>
              </div>

              {/* Add New Coupon Card */}
              <div className="p-4 sm:p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-4 shadow-sm">
                <h3 className="font-serif text-lg text-[#252522]">Create New Promotional Voucher</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#252522]/70 mb-1">Coupon Code</label>
                    <input
                      type="text"
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                      placeholder="e.g. HERITAGE15"
                      className="w-full px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono uppercase outline-none focus:border-[#51292D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#252522]/70 mb-1">Discount Type</label>
                    <select
                      value={newCouponType}
                      onChange={(e) => setNewCouponType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-sans outline-none focus:border-[#51292D]"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#252522]/70 mb-1">Value ({newCouponType === 'percentage' ? '%' : '₹'})</label>
                    <input
                      type="number"
                      value={newCouponVal}
                      onChange={(e) => setNewCouponVal(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono outline-none focus:border-[#51292D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#252522]/70 mb-1">Min Cart Value (₹)</label>
                    <input
                      type="number"
                      value={newCouponMin}
                      onChange={(e) => setNewCouponMin(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono outline-none focus:border-[#51292D]"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      if (!newCouponCode.trim()) return;
                      addCoupon({
                        id: 'cp-' + Date.now().toString(36),
                        code: newCouponCode.trim().toUpperCase(),
                        type: newCouponType,
                        value: newCouponVal,
                        minCartValue: newCouponMin,
                        active: true,
                        usageCount: 0
                      });
                      setNewCouponCode('');
                    }}
                    className="px-6 py-2.5 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase tracking-wider hover:bg-[#3C2921] transition-colors min-h-[44px]"
                  >
                    Issue Coupon
                  </button>
                </div>
              </div>

              {/* Active Coupons List */}
              <div className="border border-[#CCC5B9] bg-[#F3EFE6] divide-y divide-[#CCC5B9]/60 shadow-sm">
                {coupons.map((c) => (
                  <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-[#51292D]">{c.code}</span>
                        <span className="text-[11px] font-mono uppercase px-2 py-0.5 bg-[#34483D]/10 text-[#34483D] border border-[#34483D]/20">
                          {c.active ? 'Active' : 'Expired'}
                        </span>
                      </div>
                      <p className="text-xs font-sans text-[#252522]/70">
                        {c.type === 'percentage' ? `${c.value}% reduction` : `₹${c.value} discount`} · Min Cart ₹{c.minCartValue.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteCoupon(c.id)}
                      className="px-3 py-1.5 border border-[#51292D] text-[#51292D] text-xs font-mono uppercase hover:bg-[#51292D] hover:text-[#F3EFE6] transition-colors self-start sm:self-auto min-h-[38px]"
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE 7: AUDIT LOG */}
          {/* ============================================================== */}
          {activeModule === 'audit' && (
            <div className="space-y-6 max-w-5xl">
              <div className="border-b border-[#CCC5B9]/80 pb-4">
                <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                  SECURITY & TRACEABILITY
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                  Administrative Audit Log
                </h1>
              </div>

              <div className="border border-[#CCC5B9] bg-[#F3EFE6] divide-y divide-[#CCC5B9]/60 font-mono text-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[#51292D] font-semibold">{log.action}</span>
                      <p className="text-[#252522]/80 mt-0.5 font-sans">{log.details}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[#A58B5F] block">{log.admin}</span>
                      <span className="text-[#252522]/40 text-[12px] block">{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE 8: TRASH RECOVERY */}
          {/* ============================================================== */}
          {activeModule === 'trash' && (
            <div className="space-y-6 max-w-5xl">
              <div className="border-b border-[#CCC5B9]/80 pb-4">
                <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                  SAFETY RETENTION
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                  Trash & Recovery Archive
                </h1>
              </div>

              {trashProducts.length > 0 ? (
                <div className="border border-[#CCC5B9] bg-[#F3EFE6] divide-y divide-[#CCC5B9]/60">
                  {trashProducts.map((tp) => (
                    <div key={tp.id} className="p-4 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-serif text-base text-[#252522]">{tp.name}</h4>
                        <span className="text-[13px] font-mono text-[#252522]/60">SKU: {tp.sku}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => restoreProduct(tp.id)}
                          className="px-3 py-1 bg-[#34483D] text-[#F3EFE6] text-xs font-mono uppercase hover:bg-[#252522]"
                        >
                          Restore
                        </button>
                        <button
                          onClick={() => permanentlyDeleteProduct(tp.id)}
                          className="px-3 py-1 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase hover:bg-[#3C2921]"
                        >
                          Permanent Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-mono text-[#252522]/60">The trash archive is currently clean.</p>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE 9: SETTINGS */}
          {/* ============================================================== */}
          {activeModule === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#CCC5B9]/80 pb-4">
                <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                  OPERATIONAL PARAMETERS
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                  Store Settings
                </h1>
              </div>

              <div className="p-8 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-4 text-xs font-sans">
                <div>
                  <label className="block font-mono uppercase text-[#252522]/70 mb-1">Store Legal Name</label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={(e) => updateSettings({ storeName: e.target.value })}
                    className="w-full p-2.5 bg-[#F3EFE6] border border-[#CCC5B9] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-[#252522]/70 mb-1">Concierge Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                    className="w-full p-2.5 bg-[#F3EFE6] border border-[#CCC5B9] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono uppercase text-[#252522]/70 mb-1">Top Announcement Strip Text</label>
                  <input
                    type="text"
                    value={settings.announcementText}
                    onChange={(e) => updateSettings({ announcementText: e.target.value })}
                    className="w-full p-2.5 bg-[#F3EFE6] border border-[#CCC5B9] outline-none"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-mono">
                    <input
                      type="checkbox"
                      checked={settings.showAnnouncement}
                      onChange={(e) => updateSettings({ showAnnouncement: e.target.checked })}
                      className="accent-[#51292D]"
                    />
                    <span>Enable Announcement Strip</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE 10: REVIEWS MODERATION */}
          {/* ============================================================== */}
          {activeModule === 'reviews' && (
            <div className="space-y-6 max-w-5xl">
              <div className="border-b border-[#CCC5B9]/80 pb-4">
                <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                  PATRON FEEDBACK VERIFICATION
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                  Reviews Moderation Desk
                </h1>
              </div>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-sm">{rev.authorName}</span>
                        <span className="text-xs font-mono text-[#252522]/50 ml-2">({rev.productName})</span>
                      </div>
                      <span className={`text-[12px] font-mono uppercase px-2 py-0.5 border ${
                        rev.status === 'approved' ? 'bg-[#34483D]/10 text-[#34483D] border-[#34483D]' : 'bg-[#51292D]/10 text-[#51292D] border-[#51292D]'
                      }`}>
                        {rev.status}
                      </span>
                    </div>
                    <p className="font-serif text-base text-[#252522] italic">&ldquo;{rev.comment}&rdquo;</p>
                    <div className="flex gap-2 pt-2">
                      {rev.status !== 'approved' && (
                        <button
                          onClick={() => moderateReview(rev.id, 'approved')}
                          className="px-3 py-1 bg-[#34483D] text-[#F3EFE6] text-xs font-mono uppercase"
                        >
                          Approve
                        </button>
                      )}
                      {rev.status !== 'rejected' && (
                        <button
                          onClick={() => moderateReview(rev.id, 'rejected')}
                          className="px-3 py-1 bg-[#51292D] text-[#F3EFE6] text-xs font-mono uppercase"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* MODULE 11: ANALYTICS */}
          {/* ============================================================== */}
          {activeModule === 'analytics' && (
            <div className="space-y-6 max-w-5xl">
              <div className="border-b border-[#CCC5B9]/80 pb-4">
                <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#51292D] block">
                  COMMERCE PERFORMANCE
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] font-normal mt-1">
                  Sales & Conversion Analytics
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9]">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Total Gross Merchandise Value</span>
                  <span className="font-serif text-3xl text-[#51292D] mt-2 block">₹{totalRevenue.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9]">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Completed Acquisitions</span>
                  <span className="font-serif text-3xl text-[#252522] mt-2 block">{orders.length} Orders</span>
                </div>
                <div className="p-6 bg-[#E2D9C8]/40 border border-[#CCC5B9]">
                  <span className="text-[12px] font-mono uppercase text-[#252522]/60 block">Top Category by Sales</span>
                  <span className="font-serif text-2xl text-[#34483D] mt-2 block">Artisanal Fragrance</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Admin Bottom Quick-Bar */}
      <nav
        aria-label="Mobile Administration Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#3C2921] border-t border-[#A58B5F]/40 px-2 py-1 flex items-center justify-around shadow-2xl"
      >
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-3 text-[11px] font-mono uppercase tracking-wider transition-colors ${
            activeModule === 'home' ? 'text-[#F3EFE6] font-bold' : 'text-[#A58B5F] hover:text-[#F3EFE6]'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNav('orders')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-3 text-[11px] font-mono uppercase tracking-wider transition-colors relative ${
            activeModule === 'orders' ? 'text-[#F3EFE6] font-bold' : 'text-[#A58B5F] hover:text-[#F3EFE6]'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span>Orders</span>
          {orders.length > 0 && (
            <span className="absolute top-1 right-2 px-1.5 bg-[#51292D] text-[10px] text-[#F3EFE6] rounded-full">
              {orders.length}
            </span>
          )}
        </button>

        <button
          onClick={() => handleNav('add')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-3 text-[11px] font-mono uppercase tracking-wider transition-colors ${
            activeModule === 'add' ? 'text-[#F3EFE6] font-bold' : 'text-[#A58B5F] hover:text-[#F3EFE6]'
          }`}
        >
          <PlusCircle className="w-5 h-5 mb-0.5 text-[#E2D9C8]" />
          <span>Add</span>
        </button>

        <button
          onClick={() => handleNav('inventory')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-3 text-[11px] font-mono uppercase tracking-wider transition-colors ${
            activeModule === 'inventory' ? 'text-[#F3EFE6] font-bold' : 'text-[#A58B5F] hover:text-[#F3EFE6]'
          }`}
        >
          <Package className="w-5 h-5 mb-0.5" />
          <span>Stock</span>
        </button>

        <button
          onClick={() => setMobileNavOpen(true)}
          className="flex flex-col items-center justify-center min-h-[48px] py-1 px-3 text-[11px] font-mono uppercase tracking-wider text-[#A58B5F] hover:text-[#F3EFE6]"
        >
          <Sliders className="w-5 h-5 mb-0.5" />
          <span>Menu</span>
        </button>
      </nav>
    </div>
  );
}
