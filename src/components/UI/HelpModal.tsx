import React from 'react';
import { X, Hand, Search, Sparkles, Heart, Award, Undo2, Image } from 'lucide-react';
import { ScratchStore } from '../../hooks/useScratchStore';

interface HelpModalProps {
  store: ScratchStore;
}

export const HelpModal: React.FC<HelpModalProps> = ({ store }) => {
  if (!store.isHelpOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <h3 className="font-serif font-bold text-amber-200">How to Use Your Scratch Map</h3>
          </div>
          <button
            onClick={() => store.setIsHelpOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <Hand className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-100 mb-0.5">Scratch & Tap Modes</h4>
              <p>Rub or click on any country, state, or city to reveal its vibrant colors underneath with metallic scratch sound effects!</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <Search className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-100 mb-0.5">Search & Filter Hub</h4>
              <p>Use the search bar at the top or bottom to filter specifically by Countries, Cities, or States with instant zoom.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-100 mb-0.5">Granular City Scratching</h4>
              <p>Scratching a city reveals that specific city landmark and pinpoint badge without scratching the entire surrounding country or state.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <Heart className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-100 mb-0.5">Personal Travel Journal</h4>
              <p>Open any scratched location to record visit dates, travel companion notes, 1-5 star ratings, and upload photos.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <Undo2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-100 mb-0.5">Undo & Persistence</h4>
              <p>Made a mistake? Click Undo anytime. Your map progress is automatically saved to your browser and can be exported as a JSON backup.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
            <Image className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-100 mb-0.5">Shareable Travel Poster</h4>
              <p>Click "Poster" in the top bar to generate and download a gorgeous high-res traveler certificate to share with friends!</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
          <button
            onClick={() => store.setIsHelpOpen(false)}
            className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
          >
            Got It, Let's Explore!
          </button>
        </div>
      </div>
    </div>
  );
};
