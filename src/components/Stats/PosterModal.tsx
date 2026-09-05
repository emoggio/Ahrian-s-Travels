import React, { useRef, useState } from 'react';
import { X, Download, Share2, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ScratchStore } from '../../hooks/useScratchStore';

interface PosterModalProps {
  store: ScratchStore;
}

export const PosterModal: React.FC<PosterModalProps> = ({ store }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  if (!store.isPosterOpen) return null;

  const handleDownloadImage = async () => {
    if (!posterRef.current) return;
    try {
      setIsExporting(true);
      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        backgroundColor: '#090d16',
        useCORS: true
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${(store.friendName || 'travel').toLowerCase()}-scratch-map-poster.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export poster image', err);
      alert('Could not export image. Try taking a screenshot!');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif font-bold text-amber-200">
              Personalized Travel Poster
            </h2>
          </div>
          <button
            onClick={() => store.setIsPosterOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Poster Preview Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center">
          <div
            ref={posterRef}
            className="w-full bg-gradient-to-b from-[#0e1626] to-[#080d17] border-4 border-amber-500/60 p-6 sm:p-8 rounded-2xl shadow-2xl relative flex flex-col items-center text-center text-slate-100"
          >
            {/* Elegant Corner Ornaments */}
            <div className="absolute top-2 left-2 text-amber-400/60 text-xs">❖</div>
            <div className="absolute top-2 right-2 text-amber-400/60 text-xs">❖</div>
            <div className="absolute bottom-2 left-2 text-amber-400/60 text-xs">❖</div>
            <div className="absolute bottom-2 right-2 text-amber-400/60 text-xs">❖</div>

            {/* Poster Header */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-2xl shadow-foil mb-3 border-2 border-white/20">
              🗺️
            </div>
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400/90 mb-1">
              Official World Traveler Certificate
            </p>
            <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-amber-200 tracking-wide mb-1">
              {store.friendName ? `${store.friendName.toUpperCase()}'S TRAVEL ADVENTURES` : 'SCRATCH THE WORLD'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mb-6">
              A journey of a thousand miles across foreign skies, vibrant cultures, and unforgettable horizons.
            </p>

            {/* Poster Stats Grid */}
            <div className="w-full grid grid-cols-3 gap-2 py-4 px-2 border-y border-amber-500/30 bg-slate-950/40 rounded-xl mb-6">
              <div>
                <span className="text-2xl font-serif font-bold text-amber-400 block">
                  {store.stats.totalPlaces}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Places Scratched
                </span>
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-blue-400 block">
                  {store.stats.countryCount}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Countries
                </span>
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-emerald-400 block">
                  {store.stats.percentWorld}%
                </span>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  World Explored
                </span>
              </div>
            </div>

            {/* Visited Places Badges Preview */}
            <div className="w-full">
              <h4 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                Recently Visited & Unlocked
              </h4>
              <div className="flex flex-wrap justify-center gap-1.5 max-h-32 overflow-hidden">
                {store.stats.visitedArray.slice(0, 12).map((item) => (
                  <span
                    key={`${item.type}-${item.id}`}
                    className="px-2.5 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-xs text-amber-200 font-medium flex items-center gap-1 shadow-sm"
                  >
                    <span>✨</span>
                    <span>{item.name}</span>
                  </span>
                ))}
                {store.stats.visitedArray.length > 12 && (
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-xs text-slate-400 font-medium">
                    +{store.stats.visitedArray.length - 12} more
                  </span>
                )}
              </div>
            </div>

            {/* Footer Date */}
            <div className="mt-6 pt-3 border-t border-amber-500/20 w-full flex items-center justify-end text-xs text-amber-200/90 font-serif">
              <span className="text-[10px] text-slate-400 font-mono not-italic">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={handleCopyLink}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-slate-400" />}
            <span>{copied ? 'Link Copied!' : 'Share Map Link'}</span>
          </button>

          <button
            onClick={handleDownloadImage}
            disabled={isExporting}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:brightness-110 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 shadow-foil transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating Poster...' : 'Download Image'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
