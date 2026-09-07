import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Camera, 
  Layers, 
  Eye, 
  X, 
  ArrowRight, 
  Compass, 
  Palette, 
  Heart,
  ShoppingBag,
  Maximize2,
  Check,
  Tag,
  Share2,
  MapPin,
  Clock,
  Sparkle
} from 'lucide-react';
import { curatedEditorialSpreads } from '../data/curatedEditorialSpreads';
import { handleImageError } from '../utils/imageFallback';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const SEASONS = [
  { id: 'ALL', label: 'All Issues', icon: '✦' },
  { id: 'Spring', label: 'Spring Bloom', icon: '🌸' },
  { id: 'Summer', label: 'Summer Resort', icon: '🌊' },
  { id: 'Autumn', label: 'Autumn Earth', icon: '🍵' },
  { id: 'Winter', label: 'Winter Minimal', icon: '❄️' }
];

export default function EditorialLookbookPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [selectedSeason, setSelectedSeason] = useState('ALL');
  const [selectedSpread, setSelectedSpread] = useState(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [likedLooks, setLikedLooks] = useState({});

  // Filter spreads
  const filteredSpreads = useMemo(() => {
    if (selectedSeason === 'ALL') return curatedEditorialSpreads;
    return curatedEditorialSpreads.filter(
      (s) => s.season.toLowerCase() === selectedSeason.toLowerCase()
    );
  }, [selectedSeason]);

  // Cover story is the first spread in filtered list
  const coverStory = filteredSpreads[0] || curatedEditorialSpreads[0];
  const remainingSpreads = filteredSpreads.slice(1);

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikedLooks((prev) => {
      const next = !prev[id];
      if (next) showToast('Saved editorial look to your private vault! 🤍');
      return { ...prev, [id]: next };
    });
  };

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    addToCart({
      id: item.id || item.productId,
      name: item.name || item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
      size: 'M',
      color: item.color || 'Artisan Default'
    });
    showToast(`Added ${item.name || item.title} to bag! 🛒`, 'success');
  };

  const handleAddEntireLook = (spread) => {
    spread.shoppableItems.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        size: 'M',
        color: item.color || 'Artisan'
      });
    });
    showToast(`Added full ${spread.title} look (${spread.shoppableItems.length} items) to bag! ✨`, 'success');
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#2D231E] min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">

        {/* ========================================================================= */}
        {/* 1. EDITORIAL MAGAZINE MASTHEAD & HEADER (VOGUE / JAPANESE STREET STYLE) */}
        {/* ========================================================================= */}
        <header className="space-y-6 border-b border-[#D9D3C7] pb-8 text-center sm:text-left">
          
          {/* Top Issue Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-[#6B5E55]">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#2D5A27] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#2D5A27] animate-pulse" />
              <span>MATCHA ARCHIVE MAGAZINE // ISSUE NO. 04</span>
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-3 text-[11px]">
              <span>TOKYO • KYOTO • ENOSHIMA</span>
              <span className="text-[#D9D3C7]">•</span>
              <span>2026 EDITORIAL EDITION</span>
            </div>
          </div>

          {/* Bold Magazine Typography with Floating Japanese Watermark */}
          <div className="relative py-2 sm:py-4">
            <span className="absolute -top-3 right-4 sm:right-16 text-6xl sm:text-8xl md:text-9xl font-black text-[#2D5A27]/6 pointer-events-none select-none font-serif tracking-tighter">
              街頭美學
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-[#2D231E] tracking-tight font-sans leading-[0.95] drop-shadow-xs">
              Editorial <br />
              <span className="text-[#2D5A27] font-serif italic font-normal">Lookbook</span> Spread
            </h1>

            <p className="mt-4 text-xs sm:text-sm text-[#6B5E55] font-sans max-w-2xl leading-relaxed">
              ภาพถ่ายแฟชั่นชุดจริงระดับนิตยสาร ถ่ายทอดความงดงามของผ้ามัทฉะและซิลูเอทสตรีทแวร์ญี่ปุ่นในแสงธรรมชาติ พร้อมพิกัดเสื้อผ้าชิ้นจริงที่สามารถเลือกซื้อได้ทันที
            </p>
          </div>

          {/* Seasonal Switcher Navigation Bar (Animated Pills) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#D9D3C7]/60">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full font-mono text-xs">
              {SEASONS.map((s) => {
                const isActive = selectedSeason === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSeason(s.id)}
                    className={`px-4 py-2 rounded-full font-bold uppercase transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#2D5A27] text-white shadow-md scale-102 ring-2 ring-[#2D5A27]/20'
                        : 'bg-white border border-[#D9D3C7] text-[#6B5E55] hover:border-[#2D5A27] hover:text-[#2D231E]'
                    }`}
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/mix-match')}
                className="px-4 py-2 bg-white hover:bg-[#2D231E] hover:text-white border border-[#D9D3C7] rounded-full text-xs font-mono font-bold uppercase transition-all duration-300 flex items-center gap-1.5 shadow-xs cursor-pointer group"
              >
                <Sparkles size={13} className="text-[#2D5A27] group-hover:text-[#D0DEC6] transition-colors" />
                <span>Open Mix & Match Studio</span>
              </button>
            </div>
          </div>

        </header>

        {/* ========================================================================= */}
        {/* 2. THE COVER STORY: FULL-BLEED EDITORIAL MASTERPIECE WITH HOTSPOTS */}
        {/* ========================================================================= */}
        {coverStory && (
          <section className="relative bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#D9D3C7] overflow-hidden shadow-xl group/hero transition-all duration-500 hover:border-[#2D5A27]/40">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Column: Full-Height Interactive Photo with Pulsing Garment Hotspots */}
              <div 
                className="lg:col-span-7 relative min-h-[480px] sm:min-h-[580px] lg:min-h-[700px] bg-[#FAF8F5] overflow-hidden cursor-pointer select-none"
                onClick={() => setSelectedSpread(coverStory)}
              >
                <img
                  src={coverStory.heroImage}
                  alt={coverStory.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover object-center group-hover/hero:scale-104 transition-transform duration-700 ease-out"
                />

                {/* Film Shadow Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Top Issue Tag */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2D231E] font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    COVER STORY • {coverStory.vol}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#2D5A27] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {coverStory.season} Drop
                  </span>
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => toggleLike(e, coverStory.id)}
                  className={`absolute top-6 right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer ${
                    likedLooks[coverStory.id]
                      ? 'bg-rose-500 text-white scale-110'
                      : 'bg-white/90 text-[#2D231E] hover:bg-white hover:scale-105'
                  }`}
                  aria-label="Favorite Look"
                >
                  <Heart size={18} className={likedLooks[coverStory.id] ? 'fill-white' : ''} />
                </button>

                {/* Interactive Pulsing Hotspots (Shoppable Pins with Motion) */}
                {coverStory.hotspots && coverStory.hotspots.map((hs) => {
                  const isActive = activeHotspot === hs.id;
                  return (
                    <div
                      key={hs.id}
                      className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: hs.x, top: hs.y }}
                      onMouseEnter={() => setActiveHotspot(hs.id)}
                      onMouseLeave={() => setActiveHotspot(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(isActive ? null : hs.id);
                      }}
                    >
                      {/* Pulse Ping Animation */}
                      <span className="relative flex h-8 w-8 items-center justify-center cursor-pointer">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-white text-[#2D5A27] items-center justify-center font-bold text-xs shadow-lg border-2 border-[#2D5A27]">
                          +
                        </span>
                      </span>

                      {/* Hotspot Hover Card (Slide & Scale Motion) */}
                      {isActive && (
                        <div 
                          className="absolute left-1/2 -translate-x-1/2 bottom-10 w-56 p-3.5 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#D9D3C7] text-left space-y-2 animate-modal-pop z-30 pointer-events-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-2">
                            <img 
                              src={hs.image} 
                              alt={hs.title} 
                              onError={handleImageError} 
                              className="w-10 h-12 object-cover rounded-lg bg-neutral-100 shrink-0" 
                            />
                            <div className="min-w-0 flex-1">
                              <div className="text-[11px] font-bold text-[#2D231E] leading-tight truncate">
                                {hs.title}
                              </div>
                              <div className="text-xs font-mono font-black text-[#2D5A27] mt-0.5">
                                ${hs.price.toFixed(2)}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={(e) => handleQuickAdd(e, hs)}
                            className="w-full py-1.5 bg-[#2D5A27] hover:bg-[#1E3D1A] text-white font-mono text-[10px] font-bold uppercase rounded-lg shadow-sm flex items-center justify-center gap-1 transition-all cursor-pointer"
                          >
                            <ShoppingBag size={11} />
                            <span>Quick Add to Bag</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Bottom Image Caption */}
                <div className="absolute bottom-6 inset-x-6 z-10 flex items-center justify-between text-white font-mono text-xs">
                  <div className="flex items-center gap-2 drop-shadow-md">
                    <MapPin size={14} className="text-[#D0DEC6]" />
                    <span>{coverStory.location}</span>
                  </div>
                  <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] uppercase font-bold flex items-center gap-1">
                    <Maximize2 size={12} />
                    <span>Click to Inspect Full Look</span>
                  </span>
                </div>

              </div>

              {/* Right Column: Editorial Essay, Color Palette & Shoppable Products */}
              <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8 bg-white">
                
                {/* Story Info & Narrative */}
                <div className="space-y-6">
                  
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#2D5A27] tracking-widest uppercase block">
                      {coverStory.theme} // {coverStory.seasonThai}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-[#2D231E] tracking-tight font-serif leading-tight">
                      {coverStory.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-[#6B5E55]">
                      {coverStory.subtitle}
                    </p>
                  </div>

                  {/* Poetic Quote Box */}
                  <blockquote className="p-4 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#2D5A27] font-serif text-sm sm:text-base italic text-[#2D231E] leading-relaxed">
                    {coverStory.leadQuote}
                  </blockquote>

                  <p className="text-xs sm:text-sm text-[#6B5E55] leading-relaxed font-sans">
                    {coverStory.narrative}
                  </p>

                  {/* Editorial Palette Swatches */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6B5E55] block">
                      Palette Synergy:
                    </span>
                    <div className="flex items-center gap-2">
                      {coverStory.palette.map((c, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-[#FAF8F5] px-2.5 py-1 rounded-xl border border-[#D9D3C7]">
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" 
                            style={{ backgroundColor: c.hex }} 
                          />
                          <span className="text-[10px] font-mono font-bold text-[#2D231E]">
                            {c.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Shoppable Garment List (Shop The Look Direct Integration) */}
                <div className="space-y-4 pt-6 border-t border-[#D9D3C7]">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-[#2D231E] uppercase">
                      Shop This Editorial Look ({coverStory.shoppableItems.length} Pieces)
                    </span>
                    <span className="text-[#2D5A27] font-bold">100% In Stock</span>
                  </div>

                  <div className="space-y-2.5">
                    {coverStory.shoppableItems.map((item) => (
                      <div 
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8F5] border border-[#D9D3C7] hover:border-[#2D5A27] transition-all group/item"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            onError={handleImageError} 
                            className="w-11 h-13 object-cover rounded-xl bg-white border border-[#D9D3C7] shrink-0 group-hover/item:scale-105 transition-transform" 
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#2D231E] truncate">
                              {item.name}
                            </div>
                            <div className="text-[11px] font-mono text-[#6B5E55]">
                              {item.color} • ${item.price.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={(e) => handleQuickAdd(e, item)}
                          className="px-3 py-1.5 bg-[#2D5A27] hover:bg-[#1E3D1A] text-white font-mono text-[10px] font-bold uppercase rounded-lg shadow-sm transition-all cursor-pointer shrink-0 ml-2"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Entire Look Master Button */}
                  <button
                    onClick={() => handleAddEntireLook(coverStory)}
                    className="w-full py-3.5 bg-[#2D231E] hover:bg-[#1E3D1A] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md hover:shadow-xl active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles size={14} className="text-[#D0DEC6]" />
                    <span>Add Entire Look to Bag</span>
                  </button>

                </div>

              </div>

            </div>

          </section>
        )}

        {/* ========================================================================= */}
        {/* 3. ASYMMETRICAL MAGAZINE SPREADS (EDITORIAL DUO LAYOUTS) */}
        {/* ========================================================================= */}
        <section className="space-y-16 sm:space-y-24">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#D9D3C7] font-mono text-xs">
            <span className="font-bold uppercase text-[#2D231E]">
              Curated Seasonal Editions ({remainingSpreads.length} Feature Stories)
            </span>
            <span className="text-[#6B5E55]">Vol. 04 Spring-Summer-Autumn-Winter</span>
          </div>

          {remainingSpreads.map((spread, index) => {
            const isEven = index % 2 === 0;

            return (
              <article 
                key={spread.id} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                
                {/* Visual Image Column (Asymmetric Order Flip) */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  
                  <div 
                    onClick={() => setSelectedSpread(spread)}
                    className="group relative aspect-4/5 sm:aspect-3/4 rounded-3xl sm:rounded-[2rem] overflow-hidden border border-[#D9D3C7] shadow-lg hover:shadow-2xl hover:border-[#2D5A27] transition-all duration-500 cursor-pointer bg-neutral-100"
                  >
                    <img
                      src={spread.heroImage}
                      alt={spread.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient & Film Tint */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                    {/* Badges */}
                    <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2D231E] font-mono text-[10px] font-bold uppercase tracking-wider">
                        {spread.issueDate}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#2D5A27] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                        {spread.season}
                      </span>
                    </div>

                    {/* Like Button */}
                    <button
                      onClick={(e) => toggleLike(e, spread.id)}
                      className={`absolute top-5 right-5 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer ${
                        likedLooks[spread.id]
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/90 text-[#2D231E] hover:bg-white'
                      }`}
                    >
                      <Heart size={16} className={likedLooks[spread.id] ? 'fill-white' : ''} />
                    </button>

                    {/* Overlay Hover CTA */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
                      <span className="px-5 py-2.5 bg-white text-[#2D231E] font-mono text-xs font-bold uppercase rounded-full shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Maximize2 size={14} />
                        <span>Inspect Spread Details</span>
                      </span>
                    </div>

                    {/* Bottom Metadata Bar */}
                    <div className="absolute bottom-5 inset-x-5 z-10 flex items-center justify-between text-white font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-[#D0DEC6]" />
                        <span className="text-[11px] truncate max-w-[220px] sm:max-w-xs">{spread.location}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#D0DEC6]">{spread.photographer}</span>
                    </div>

                  </div>

                </div>

                {/* Editorial Text & Shoppable Product Card Column */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#BC5A36] uppercase tracking-widest block">
                      {spread.theme}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2D231E] tracking-tight font-serif">
                      {spread.title}
                    </h3>
                    <p className="text-xs font-mono text-[#6B5E55]">
                      {spread.subtitle}
                    </p>
                  </div>

                  <blockquote className="font-serif italic text-sm sm:text-base text-[#2D231E] border-l-3 border-[#BC5A36] pl-4 leading-relaxed">
                    {spread.leadQuote}
                  </blockquote>

                  <p className="text-xs sm:text-sm text-[#6B5E55] leading-relaxed">
                    {spread.narrative}
                  </p>

                  {/* Swatches */}
                  <div className="flex items-center gap-2 pt-1">
                    {spread.palette.map((p, idx) => (
                      <span 
                        key={idx}
                        title={p.name}
                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: p.hex }}
                      />
                    ))}
                  </div>

                  {/* Shoppable Outfit Mini Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D9D3C7] shadow-sm space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs font-bold text-[#2D231E]">
                      <span className="uppercase flex items-center gap-1.5">
                        <Tag size={13} className="text-[#2D5A27]" />
                        <span>Key Garments</span>
                      </span>
                      <button 
                        onClick={() => setSelectedSpread(spread)}
                        className="text-[#2D5A27] hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        <span>View All</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {spread.shoppableItems.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between py-1.5 border-b border-[#D9D3C7]/40 last:border-none text-xs"
                        >
                          <div className="min-w-0 pr-2">
                            <span className="font-bold text-[#2D231E] block truncate">{item.name}</span>
                            <span className="text-[10px] font-mono text-[#6B5E55]">${item.price.toFixed(2)}</span>
                          </div>
                          <button
                            onClick={(e) => handleQuickAdd(e, item)}
                            className="px-2.5 py-1 rounded bg-[#FAF8F5] hover:bg-[#2D5A27] hover:text-white border border-[#D9D3C7] font-mono text-[10px] font-bold uppercase transition-all cursor-pointer"
                          >
                            + Bag
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </article>
            );
          })}

        </section>

        {/* ========================================================================= */}
        {/* 4. LIGHTBOX / FULLSCREEN INSPECTION MODAL */}
        {/* ========================================================================= */}
        {selectedSpread && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in select-none"
            onClick={() => setSelectedSpread(null)}
          >
            <div 
              data-lenis-prevent="true"
              className="bg-[#FAF8F5] text-[#2D231E] rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto overscroll-contain shadow-2xl border border-[#D9D3C7] relative flex flex-col md:flex-row overflow-hidden animate-modal-pop"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedSpread(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-[#2D231E] hover:text-white border border-[#D9D3C7] flex items-center justify-center text-[#2D231E] transition-all cursor-pointer shadow-md"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* High-Res Photo Left Column */}
              <div className="md:w-3/5 bg-neutral-950 flex flex-col items-center justify-center p-4 relative">
                <img 
                  src={selectedSpread.heroImage} 
                  alt={selectedSpread.title}
                  onError={handleImageError}
                  className="max-h-[70vh] w-full object-contain rounded-2xl" 
                />

                {/* Sub-details dual row if available */}
                {selectedSpread.detailImages && (
                  <div className="flex items-center gap-2 mt-3 overflow-x-auto max-w-full pb-1">
                    {selectedSpread.detailImages.map((img, idx) => (
                      <div key={idx} className="w-16 h-20 rounded-lg overflow-hidden border border-white/20 shrink-0">
                        <img src={img} alt="Detail" onError={handleImageError} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Lookbook Specs Right Column */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-[#2D5A27] uppercase tracking-wider block">
                      {selectedSpread.theme} // {selectedSpread.seasonThai}
                    </span>
                    <h2 className="text-2xl font-black font-serif text-[#2D231E]">
                      {selectedSpread.title}
                    </h2>
                    <p className="text-xs font-mono text-[#6B5E55]">
                      {selectedSpread.location}
                    </p>
                  </div>

                  <blockquote className="p-3.5 rounded-xl bg-white border border-[#D9D3C7] text-xs font-serif italic text-[#2D231E]">
                    {selectedSpread.leadQuote}
                  </blockquote>

                  <p className="text-xs text-[#6B5E55] leading-relaxed">
                    {selectedSpread.narrative}
                  </p>

                  {/* Shoppable Products List */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6B5E55] block">
                      Shop Selected Pieces:
                    </span>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {selectedSpread.shoppableItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#D9D3C7]">
                          <div className="min-w-0 pr-2">
                            <div className="text-xs font-bold text-[#2D231E] truncate">{item.name}</div>
                            <div className="text-[11px] font-mono text-[#2D5A27] font-bold">${item.price.toFixed(2)}</div>
                          </div>
                          <button
                            onClick={(e) => handleQuickAdd(e, item)}
                            className="px-3 py-1 bg-[#2D5A27] hover:bg-[#1E3D1A] text-white font-mono text-[10px] font-bold uppercase rounded-lg shadow-xs transition-all cursor-pointer shrink-0"
                          >
                            + Bag
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="space-y-2.5 pt-4 border-t border-[#D9D3C7]">
                  <button
                    onClick={() => handleAddEntireLook(selectedSpread)}
                    className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1E3D1A] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Sparkles size={14} />
                    <span>Add Entire Look to Bag</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedSpread(null);
                      navigate('/mix-match');
                    }}
                    className="w-full py-2.5 bg-white hover:bg-[#FAF8F5] border border-[#D9D3C7] text-[#2D231E] font-mono text-xs font-bold uppercase rounded-xl transition-all cursor-pointer"
                  >
                    Open in Mix & Match Studio
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
