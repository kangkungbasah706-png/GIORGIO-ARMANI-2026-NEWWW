import React from 'react';
import { FORMAT_CURRENCY } from '../constants';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isExclusive = product.isExclusive === true;
  
  // Recalculate values if exclusive (force 50%)
  const displayCommission = isExclusive ? 50 : (product.commission || 0);
  const displayProfit = isExclusive ? (product.price * 0.5) : (product.profit || 0);
  
  // Use override totalIncome if provided, otherwise calculate
  const totalKeuntungan = product.totalIncome !== undefined 
    ? (isExclusive ? (product.price + displayProfit) : product.totalIncome)
    : (product.price + displayProfit);
    
  const actionText = product.statusText || 'Detail';
  
  return (
    <div 
      className={`bg-[var(--bg-panel)] border rounded-xl flex flex-row overflow-hidden shadow-2xl transition-all duration-700 group h-full relative 
        ${isExclusive 
          ? 'border-[#D4AF37] border-2 shadow-[0_0_50px_rgba(212,175,55,0.4)] ring-4 ring-[#D4AF37]/10 z-20 scale-[1.01]' 
          : 'border-[var(--color-border-dim)] hover:border-[var(--color-border-mid)] hover:shadow-[0_25px_50px_-12px_rgba(179,139,77,0.2)]'
        }`}
    >
      
      {/* EXCLUSIVE DECORATIVE GLOW (Only for Exclusive) */}
      {isExclusive && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 pointer-events-none z-0"></div>
      )}

      {/* LEFT COLUMN: PREMIUM VISUAL (60%) */}
      <div className="w-[60%] h-full relative overflow-hidden bg-black border-r border-white/5">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110 
            ${isExclusive ? 'opacity-90 grayscale-0 brightness-110' : 'opacity-75 grayscale-[10%] group-hover:opacity-100 group-hover:grayscale-0'}`}
        />
        
        {/* Subtle Luxury Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30"></div>
        
        {/* Category Label */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
           <span className="text-[clamp(11px,1vw,13px)] font-bold text-white px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 tracking-[0.15em] uppercase rounded-sm shadow-lg">
             {product.label}
           </span>
        </div>

        {/* HIGH-VISIBILITY EXCLUSIVE BADGE */}
        {isExclusive && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-black px-4 py-1.5 bg-gradient-to-r from-[#D4AF37] via-[#F9E79F] to-[#D4AF37] tracking-[0.4em] uppercase rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.4)] border border-white/20 animate-soft-pulse">
                EXCLUSIVE
              </span>
              <div className="w-1/2 h-1 bg-[#D4AF37] mt-1 rounded-full blur-[2px] opacity-60"></div>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: REVISED LUXURY PANEL (40%) */}
      <div className={`w-[40%] flex flex-col p-2.5 sm:p-4 justify-between relative backdrop-blur-md border-l border-white/10 
        ${isExclusive 
          ? 'bg-gradient-to-br from-[#2c2415] via-[#1a1a1a] to-[#121212] shadow-[inset_0_0_40px_rgba(212,175,55,0.15)]' 
          : 'bg-gradient-to-br from-[#333333] via-[#262626] to-[#1a1a1a] shadow-[inset_0_0_30px_rgba(179,139,77,0.1)]'
        }`}
      >
        
        {/* Subtle Edge Glow Overlay */}
        <div className={`absolute inset-0 pointer-events-none border transition-colors duration-700 
          ${isExclusive ? 'border-[#D4AF37]/30' : 'border-transparent group-hover:border-[var(--accent)]/20'}`}
        ></div>

        {/* Product Title Section */}
        <div className="space-y-1 sm:space-y-1.5 relative z-10 shrink-0">
          <h3 className={`text-[clamp(15px,2.2vw,19px)] font-bold leading-tight uppercase tracking-wide line-clamp-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]
            ${isExclusive ? 'text-[#F9E79F]' : 'text-[#FFFFFF]'}`}
          >
            {product.name}
          </h3>
          <div className={`h-[0.5px] w-full bg-gradient-to-r to-transparent opacity-60 
            ${isExclusive ? 'from-[#D4AF37]' : 'from-[var(--accent)]'}`}
          ></div>
        </div>

        {/* Data Matrix Grid */}
        <div className="space-y-5 sm:space-y-7 mt-auto mb-2 sm:mb-3 relative z-10">
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div className="flex flex-col">
              <span className="text-[clamp(11px,1.1vw,12px)] font-medium text-[#E5E5E5] uppercase tracking-[0.1em] mb-1 opacity-80">HARGA</span>
              <span className="text-[clamp(14px,1.6vw,17px)] font-semibold text-[#fdfcf0] tracking-tight leading-none [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                {FORMAT_CURRENCY(product.price)}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`text-[clamp(11px,1.1vw,12px)] font-medium uppercase tracking-[0.1em] opacity-100
                  ${isExclusive ? 'text-[#D4AF37]' : 'text-[var(--accent)]'}`}
                >
                  PROFIT
                </span>
                <span className={`text-[10px] font-medium opacity-70 ${isExclusive ? 'text-[#F9E79F]' : 'text-[var(--accent)]'}`}>
                  ({displayCommission}%)
                </span>
              </div>
              <span className={`text-[clamp(14px,1.6vw,17px)] font-semibold leading-none brightness-110 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]
                ${isExclusive ? 'text-[#FFD700] scale-110 origin-left transition-transform duration-500' : 'text-[#94f3b8]'}`}
              >
                {FORMAT_CURRENCY(displayProfit)}
              </span>
            </div>
          </div>

          <div className={`pt-5 sm:pt-7 border-t flex flex-col ${isExclusive ? 'border-[#D4AF37]/30' : 'border-white/20'}`}>
            <span className="text-[clamp(11px,1.1vw,12px)] font-medium text-[#E5E5E5] uppercase tracking-[0.15em] mb-1 opacity-80">Total Pendapatan</span>
            <span className={`text-[clamp(18px,2.2vw,22px)] font-bold leading-none [text-shadow:0_2px_8px_rgba(0,0,0,1)]
              ${isExclusive ? 'text-[#FFD700] text-glow-gold scale-105 origin-left' : 'text-[#ffef9c] text-glow-gold'}`}
            >
              {FORMAT_CURRENCY(totalKeuntungan)}
            </span>
          </div>
        </div>

        {/* Minimalist Detail Action */}
        <div className={`flex items-center justify-between pt-1 sm:pt-2 group/btn cursor-pointer relative z-10 border-t 
          ${isExclusive ? 'border-[#D4AF37]/20' : 'border-white/5'}`}
        >
           <span className={`text-[clamp(11px,1.1vw,12px)] font-semibold uppercase tracking-[0.2em] transition-all opacity-90
             ${isExclusive ? 'text-[#D4AF37] group-hover/btn:text-white' : 'text-[#E5E5E5] group-hover/btn:text-[var(--accent-bright)]'}`}
           >
             {actionText}
           </span>
           <div className={`flex-grow ml-2 h-[0.5px] opacity-30 group-hover/btn:opacity-80 transition-all origin-left group-hover/btn:scale-x-105
             ${isExclusive ? 'bg-[#D4AF37]' : 'bg-[var(--accent)]'}`}
           ></div>
           <svg className={`w-3 h-3 ml-1 opacity-60 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all
             ${isExclusive ? 'text-[#D4AF37]' : 'text-[var(--accent)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
           </svg>
        </div>
      </div>
      
      {/* LUXURY DECORATIVE ELEMENT */}
      <div className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl pointer-events-none transition-opacity
        ${isExclusive ? 'bg-[#D4AF37] opacity-[0.15] group-hover:opacity-[0.25]' : 'bg-[var(--accent)] opacity-[0.05] group-hover:opacity-[0.08]'}`}
      ></div>
    </div>
  );
};

export default ProductCard;