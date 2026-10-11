'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Heart,
  ShieldCheck,
  Truck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Star
} from 'lucide-react';
import { useCommerce } from '@/lib/store/commerceStore';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { CartItem } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { products, addToCart, setBuyNowItem, isInWishlist, toggleWishlist, reviews, addReview } = useCommerce();

  const product = products.find((p) => p.slug === slug) || products[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string>('specifications');

  // Review submission state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedVariantId(product.variants[0]?.id || '');
      const mainIdx = product.images.findIndex((img) => img.isMain);
      setActiveImageIdx(mainIdx >= 0 ? mainIdx : 0);
    }
  }, [product]);

  // 5-second automatic image rotation slideshow
  useEffect(() => {
    if (!product || product.images.length <= 1) return;

    // Respect user reduced-motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const interval = setInterval(() => {
      // Pause if browser tab/document is hidden
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;
      setActiveImageIdx((prev) => (prev + 1) % product.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [product, activeImageIdx]);

  const handlePrevImage = () => {
    if (!product || product.images.length <= 1) return;
    setActiveImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleNextImage = () => {
    if (!product || product.images.length <= 1) return;
    setActiveImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handleNextImage(); // Swiped left -> Next
      } else {
        handlePrevImage(); // Swiped right -> Prev
      }
    }
    setTouchStartX(null);
  };

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-serif text-3xl">This Piece Is No Longer Available.</h1>
        <Link href="/collections/all" className="mt-4 inline-block text-xs uppercase tracking-wider text-[#51292D]">
          Return to Collections
        </Link>
      </div>
    );
  }

  const currentVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const price = currentVariant ? currentVariant.price : product.price;
  const inWishlist = isInWishlist(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id && r.status === 'approved');

  const handleAdd = () => {
    setIsAddedFeedback(true);
    addToCart(product, selectedVariantId, 1);
    setTimeout(() => setIsAddedFeedback(false), 300);
  };

  const handleBuyNow = () => {
    const selectedVariant = product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
    const buyItem: CartItem = {
      id: `${product.id}-${selectedVariant?.id || 'standard'}`,
      productId: product.id,
      variantId: selectedVariant?.id,
      name: product.name,
      slug: product.slug,
      image: product.images.find((img) => img.isMain)?.url || product.images[0]?.url || '',
      price,
      quantity: 1,
      variantTitle: selectedVariant?.title,
      sku: selectedVariant?.sku || product.sku,
      category: product.category
    };
    setBuyNowItem(buyItem);
    router.push('/checkout?buynow=1');
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.length !== 6 || !/^\d+$/.test(pincodeInput)) {
      setPincodeStatus('unavailable');
      return;
    }
    setPincodeStatus('checking');
    setTimeout(() => {
      // Indian pincodes check simulation
      setPincodeStatus('available');
    }, 600);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;
    addReview({
      productId: product.id,
      productName: product.name,
      authorName: newReviewAuthor,
      rating: newReviewRating,
      comment: newReviewComment,
      verifiedPurchase: true
    });
    setNewReviewAuthor('');
    setNewReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="w-full pt-24 pb-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto space-y-12">
      <ProductJsonLd
        name={product.name}
        description={product.shortDescription || product.description}
        image={product.images[0]?.url || ''}
        price={price}
        sku={product.sku || product.id}
        availability={product.stock > 0 ? 'InStock' : 'OutOfStock'}
        url={`https://gulatiandsons.com/products/${product.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://gulatiandsons.com' },
          { name: product.categoryLabel, url: `https://gulatiandsons.com/collections/${product.category}` },
          { name: product.name, url: `https://gulatiandsons.com/products/${product.slug}` }
        ]}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs font-mono text-[#252522]/60 uppercase tracking-widest">
        <Link href="/" className="hover:text-[#51292D]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/collections/${product.category}`} className="hover:text-[#51292D]">{product.categoryLabel}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#51292D] font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main 60:40 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Product Gallery (60% ~ 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className="relative w-full aspect-[4/5] bg-[#E2D9C8] border border-[#CCC5B9]/80 shadow-md overflow-hidden group select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={product.images[activeImageIdx]?.url || product.images[0]?.url || ''}
              alt={product.images[activeImageIdx]?.alt || product.name}
              fill
              priority
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 1024px) 100vw, 700px"
            />
            {product.isDemonstration && (
              <div className="absolute top-4 left-4 bg-[#3C2921]/90 text-[#F3EFE6] px-3 py-1 text-[12px] font-mono uppercase tracking-widest z-10">
                Prototype Demonstration
              </div>
            )}

            {/* Previous and Next Navigation Controls */}
            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#252522]/60 hover:bg-[#51292D] text-[#F3EFE6] flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 z-10 backdrop-blur-sm"
                  aria-label="Previous gallery image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#252522]/60 hover:bg-[#51292D] text-[#F3EFE6] flex items-center justify-center transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 z-10 backdrop-blur-sm"
                  aria-label="Next gallery image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Slideshow progress indicator dot bar */}
                <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-1.5 z-10">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImageIdx(i)}
                      className={`h-1.5 transition-all rounded-full ${
                        activeImageIdx === i ? 'w-6 bg-[#F3EFE6]' : 'w-1.5 bg-[#F3EFE6]/50'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-20 h-24 shrink-0 border transition-all ${
                    activeImageIdx === idx
                      ? 'border-[#51292D] ring-1 ring-[#51292D]'
                      : 'border-[#CCC5B9] opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Purchase Information Column (40% ~ 5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div>
            <span className="text-[13px] font-mono uppercase tracking-[0.25em] text-[#A58B5F] block">
              {product.brand} · {product.categoryLabel}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#252522] leading-tight font-normal mt-1">
              {product.name}
            </h1>
            <p className="text-xs text-[#252522]/70 font-mono mt-1">
              SKU: {currentVariant ? currentVariant.sku : product.sku}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-[#A58B5F]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-[#252522]/80">
              {product.rating} ({product.reviewCount} verified reviews)
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pt-2 border-t border-[#CCC5B9]/60">
            <span className="font-serif text-3xl sm:text-4xl text-[#252522] font-medium">
              ₹{price.toLocaleString('en-IN')}
            </span>
            {product.mrp > price && (
              <div className="flex items-center gap-2">
                <span className="text-xs line-through text-[#252522]/50 font-mono">
                  MRP ₹{product.mrp.toLocaleString('en-IN')}
                </span>
                <span className="text-[13px] font-mono text-[#34483D] bg-[#34483D]/10 px-2 py-0.5">
                  Save {product.discountPercent}%
                </span>
              </div>
            )}
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-[#252522]/80 leading-relaxed font-sans">
            {product.shortDescription}
          </p>

          {/* Demonstration Disclaimer for Rolex */}
          {product.isDemonstration && (
            <div className="p-4 bg-[#E2D9C8]/60 border border-[#A58B5F]/50 text-xs text-[#3C2921] space-y-1.5">
              <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5 text-[#51292D]">
                <ShieldAlert className="w-4 h-4 shrink-0" /> Horological Demonstration Notice
              </span>
              <p className="leading-relaxed font-sans">
                {product.disclaimer}
              </p>
            </div>
          )}

          {/* Variants Selector */}
          {product.variants.length > 1 && (
            <div className="space-y-2 pt-2">
              <label className="block text-xs uppercase tracking-[0.2em] font-mono text-[#51292D]">
                Select Edition / Dimension:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`px-4 py-2.5 text-xs font-sans transition-all border ${
                      selectedVariantId === v.id
                        ? 'border-[#51292D] bg-[#51292D] text-[#F3EFE6] shadow-sm'
                        : 'border-[#CCC5B9] bg-[#E2D9C8]/40 text-[#252522] hover:bg-[#E2D9C8]'
                    }`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Availability */}
          <div className="flex items-center gap-2 text-xs font-mono">
            {product.stock > 0 ? (
              <span className="text-[#34483D] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34483D]" />
                In Stock ({product.stock} units reserved in atelier)
              </span>
            ) : (
              <span className="text-[#51292D] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#51292D]" />
                Presently Awaiting Batch Allocation
              </span>
            )}
          </div>

          {/* Pincode Serviceability Checker */}
          <div className="p-4 bg-[#E2D9C8]/40 border border-[#CCC5B9] space-y-2">
            <span className="text-xs uppercase tracking-wider font-mono text-[#252522]/80 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#51292D]" /> Verify Pincode Serviceability
            </span>
            <form onSubmit={checkPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => setPincodeInput(e.target.value)}
                placeholder="Enter 6-digit postal code"
                className="flex-1 px-3 py-2 bg-[#F3EFE6] border border-[#CCC5B9] text-xs font-mono text-[#252522] outline-none focus:border-[#51292D]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#51292D] text-[#F3EFE6] text-xs font-sans uppercase tracking-wider hover:bg-[#3C2921]"
              >
                Check
              </button>
            </form>
            {pincodeStatus === 'available' && (
              <p className="text-xs text-[#34483D] font-mono flex items-center gap-1 mt-1">
                <Check className="w-3.5 h-3.5" /> Pincode {pincodeInput} is serviceable. Express dispatch available.
              </p>
            )}
            {pincodeStatus === 'unavailable' && (
              <p className="text-xs text-[#51292D] font-mono mt-1">
                Please enter a valid 6-digit postal code.
              </p>
            )}
          </div>

          {/* Purchasing Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAdd}
              disabled={product.stock <= 0}
              className={`w-full py-4 text-xs font-sans uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] ${
                isAddedFeedback
                  ? 'bg-[#34483D] text-[#F3EFE6]'
                  : 'bg-[#51292D] text-[#F3EFE6] hover:bg-[#3C2921]'
              } disabled:opacity-50`}
            >
              {isAddedFeedback ? (
                <>
                  <Check className="w-4 h-4" /> Added to Bag
                </>
              ) : (
                <>
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="w-full py-3.5 bg-transparent border border-[#51292D] text-[#51292D] hover:bg-[#51292D] hover:text-[#F3EFE6] text-xs font-sans uppercase tracking-[0.2em] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>Instant Acquisition</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-full py-2.5 text-center text-xs font-sans text-[#252522]/80 hover:text-[#51292D] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-[#51292D] text-[#51292D]' : ''}`} />
              <span>{inWishlist ? 'Saved in Personal Wishlist' : 'Add to Personal Wishlist'}</span>
            </button>
          </div>

          {/* Vertically Expanding Accordions (As specifically instructed by Baymard research) */}
          <div className="border-t border-[#CCC5B9] pt-6 space-y-3">
            <h2 className="sr-only">Product Dossier, Specifications and Patron Reviews</h2>
            {/* Accordion 1: Description */}
            <div className="border-b border-[#CCC5B9]/60 pb-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'description' ? '' : 'description')}
                className="w-full flex justify-between items-center text-left py-2 text-xs uppercase tracking-widest font-mono text-[#252522]"
              >
                <span>About The Piece</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'description' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'description' && (
                <div className="pt-2 text-xs text-[#252522]/80 font-sans leading-relaxed space-y-2 animate-in fade-in duration-200">
                  <p>{product.description}</p>
                </div>
              )}
            </div>

            {/* Accordion 2: Specifications */}
            <div className="border-b border-[#CCC5B9]/60 pb-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'specifications' ? '' : 'specifications')}
                className="w-full flex justify-between items-center text-left py-2 text-xs uppercase tracking-widest font-mono text-[#252522]"
              >
                <span>Dossier & Specifications</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'specifications' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'specifications' && (
                <div className="pt-2 space-y-2 animate-in fade-in duration-200">
                  <dl className="divide-y divide-[#CCC5B9]/40 text-xs">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="py-2 flex justify-between gap-4 font-mono">
                        <dt className="text-[#252522]/60">{key}</dt>
                        <dd className="text-[#252522] font-medium text-right">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            {/* Accordion 3: Care & Maintenance */}
            <div className="border-b border-[#CCC5B9]/60 pb-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'care' ? '' : 'care')}
                className="w-full flex justify-between items-center text-left py-2 text-xs uppercase tracking-widest font-mono text-[#252522]"
              >
                <span>Care & Preservation</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'care' && (
                <div className="pt-2 text-xs text-[#252522]/80 font-sans leading-relaxed animate-in fade-in duration-200">
                  <p>{product.careInstructions || 'Preserve away from direct thermal exposure and high humidity.'}</p>
                </div>
              )}
            </div>

            {/* Accordion 4: Delivery & Returns */}
            <div className="border-b border-[#CCC5B9]/60 pb-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                className="w-full flex justify-between items-center text-left py-2 text-xs uppercase tracking-widest font-mono text-[#252522]"
              >
                <span>Pan-India Delivery & Returns</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'shipping' && (
                <div className="pt-2 text-xs text-[#252522]/80 font-sans leading-relaxed space-y-2 animate-in fade-in duration-200">
                  <p>{product.deliveryInfo}</p>
                  <p>
                    Returns accepted within 7 days of delivery for untampered, original packaging specimens.{' '}
                    <Link href="/returns" className="text-[#51292D] underline">
                      Review return conditions.
                    </Link>
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 5: Verified Patron Reviews */}
            <div className="border-b border-[#CCC5B9]/60 pb-3">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'reviews' ? '' : 'reviews')}
                className="w-full flex justify-between items-center text-left py-2 text-xs uppercase tracking-widest font-mono text-[#252522]"
              >
                <span>Verified Reviews ({productReviews.length})</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'reviews' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'reviews' && (
                <div className="pt-4 space-y-4 animate-in fade-in duration-200">
                  {productReviews.length > 0 ? (
                    productReviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-[#E2D9C8]/40 border border-[#CCC5B9]/60 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-xs text-[#252522]">{rev.authorName}</span>
                          <span className="text-[12px] font-mono text-[#252522]/50">{rev.date}</span>
                        </div>
                        <p className="text-xs text-[#252522]/80 italic">&ldquo;{rev.comment}&rdquo;</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#252522]/60">No reviews published yet for this piece.</p>
                  )}

                  {!showReviewForm ? (
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="text-xs text-[#51292D] underline font-mono"
                    >
                      Write a Patron Review
                    </button>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="p-4 bg-[#E2D9C8]/60 border border-[#CCC5B9] space-y-3">
                      <h3 className="font-serif text-sm">Submit Patron Feedback</h3>
                      <input
                        type="text"
                        placeholder="Your Name and City"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        required
                        className="w-full px-3 py-1.5 text-xs bg-[#F3EFE6] border border-[#CCC5B9] outline-none"
                      />
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full px-3 py-1.5 text-xs bg-[#F3EFE6] border border-[#CCC5B9]"
                      >
                        <option value={5}>5 Stars - Exceptional</option>
                        <option value={4}>4 Stars - Distinguished</option>
                        <option value={3}>3 Stars - Satisfactory</option>
                      </select>
                      <textarea
                        placeholder="Your observations on scent, craftsmanship or wear..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        rows={3}
                        required
                        className="w-full px-3 py-1.5 text-xs bg-[#F3EFE6] border border-[#CCC5B9] outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-[#51292D] text-[#F3EFE6] text-xs uppercase tracking-wider"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="px-4 py-1.5 bg-transparent border border-[#CCC5B9] text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Add-To-Bag Action Bar (Baymard Mobile Best Practice) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F3EFE6]/95 backdrop-blur-md border-t border-[#CCC5B9] px-4 py-3 shadow-[0_-4px_16px_rgba(37,37,34,0.08)] flex items-center justify-between gap-3 safe-bottom">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-serif font-semibold text-[#252522] truncate">{product.name}</p>
          <p className="text-xs font-mono font-bold text-[#51292D]">₹{price.toLocaleString('en-IN')}</p>
        </div>
        <button
          onClick={handleAdd}
          disabled={product.stock <= 0}
          className={`px-5 py-2.5 text-xs font-sans uppercase tracking-wider font-medium shrink-0 min-h-[44px] transition-colors shadow-sm ${
            isAddedFeedback
              ? 'bg-[#34483D] text-[#F3EFE6]'
              : 'bg-[#51292D] text-[#F3EFE6] active:bg-[#3C2921]'
          } disabled:opacity-50`}
        >
          {isAddedFeedback ? 'Added' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
}
