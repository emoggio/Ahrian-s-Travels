import React, { useState } from 'react';
import { 
  Undo2, Redo2, Trophy, Image, Palette, Volume2, VolumeX, 
  Sparkles, MousePointerClick, Hand, Download, Upload, RotateCcw, 
  HelpCircle, Settings, ChevronDown, Check
} from 'lucide-react';
import { MapTheme } from '../../types';
import { ScratchStore } from '../../hooks/useScratchStore';

interface TopHeaderProps {
  store: ScratchStore;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ store }) => {
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const themes: { id: MapTheme; label: string; icon: string; previewColor: string }[] = [
    { id: 'gold', label: 'Gold Foil Classic', icon: '✨', previewColor: 'bg-amber-400' },
    { id: 'midnight', label: 'Midnight & Gold', icon: '🌙', previewColor: 'bg-slate-800' },
    { id: 'vintage', label: 'Vintage Parchment', icon: '📜', previewColor: 'bg-amber-100' },
    { id: 'emerald', label: 'Emerald Jade', icon: '🌿', previewColor: 'bg-emerald-600' },
    { id: 'cyber', label: 'Cyber Hologram', icon: '🔮', previewColor: 'bg-fuchsia-600' },
  ];

  return (
    <header className="relative z-30 flex items-center justify-between gap-2 px-3 py-2.5 bg-slate-950/85 backdrop-blur-md border-b border-amber-500/20 shadow-lg select-none">
      {/* Brand & Traveler Title */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-lg shadow-foil flex-shrink-0">
          🗺️
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="font-serif font-bold text-sm sm:text-base text-amber-200 tracking-wide truncate">
              {store.friendName ? `${store.friendName}'s World Map` : 'My Travel Scratch Map'}
            </h1>
          </div>
          <p className="text-[11px] text-amber-400/80 font-medium truncate hidden sm:block">
            Scratch off visited countries, states & cities
          </p>
        </div>
      </div>

      {/* Center Quick Stats Badges (Hidden on very narrow screens) */}
      <button 
        onClick={() => store.setIsStatsOpen(true)}
        className="hidden md:flex items-center gap-3 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/30 hover:border-amber-400 hover:bg-slate-800/90 transition-all text-xs text-slate-200 shadow-sm group"
      >
        <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
          <Trophy className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>{store.stats.totalPlaces} Visited</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-slate-600" />
        <div className="text-slate-300">
          <span className="font-bold text-amber-400">{store.stats.percentWorld}%</span> of World
        </div>
      </button>

      {/* Action Buttons Toolbar */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Scratch Mode Toggle (Rub vs Tap) */}
        <button
          onClick={() => store.setScratchMode(prev => prev === 'scratch' ? 'click' : 'scratch')}
          className="p-2 rounded-xl bg-slate-900 text-amber-300 hover:bg-slate-800 border border-slate-700 shadow flex items-center gap-1.5 text-xs transition-all"
        >
          {store.scratchMode === 'scratch' ? (
            <>
              <Hand className="w-4 h-4 text-amber-400" />
              <span className="hidden lg:inline">Rub Mode</span>
            </>
          ) : (
            <>
              <MousePointerClick className="w-4 h-4 text-blue-400" />
              <span className="hidden lg:inline">Tap Mode</span>
            </>
          )}
        </button>

        {/* Theme Picker Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsThemeMenuOpen(prev => !prev);
              setIsSettingsOpen(false);
            }}
            className="p-2 rounded-xl bg-slate-900 text-amber-300 hover:bg-slate-800 border border-slate-700 shadow flex items-center gap-1 text-xs"
          >
            <Palette className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline capitalize">{store.theme}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isThemeMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50 animate-fadeIn">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-2.5 py-1 tracking-wider">
                Map Theme
              </div>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    store.setTheme(t.id);
                    setIsThemeMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                    store.theme === t.id
                      ? 'bg-amber-500/20 text-amber-300 font-bold'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{t.icon}</span>
                    <span>{t.label}</span>
                  </div>
                  {store.theme === t.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Stats & Badges Button */}
        <button
          onClick={() => store.setIsStatsOpen(true)}
          className="p-2 rounded-xl bg-slate-900 text-amber-300 hover:bg-slate-800 border border-slate-700 shadow flex items-center gap-1 text-xs"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline font-semibold">Stats</span>
        </button>

        {/* Export Travel Poster */}
        <button
          onClick={() => store.setIsPosterOpen(true)}
          className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-bold hover:brightness-110 shadow-foil flex items-center gap-1.5 text-xs transition-transform active:scale-95"
        >
          <Image className="w-4 h-4" />
          <span className="hidden sm:inline">Poster</span>
        </button>

        {/* Sound FX Toggle */}
        <button
          onClick={store.toggleMute}
          className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-amber-300 hover:bg-slate-800 border border-slate-700 shadow transition-colors"
        >
          {store.isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
        </button>

        {/* More Settings / Backup Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsSettingsOpen(prev => !prev);
              setIsThemeMenuOpen(false);
            }}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700 shadow transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>

          {isSettingsOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn">
              <div className="px-2 py-1.5 border-b border-slate-800 mb-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                  Traveler Name
                </label>
                <input
                  type="text"
                  value={store.friendName}
                  onChange={(e) => store.setFriendName(e.target.value)}
                  placeholder="e.g. Sarah"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                onClick={() => {
                  store.exportData();
                  setIsSettingsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Export Map Data (JSON)</span>
              </button>

              <label className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer">
                <Upload className="w-4 h-4 text-blue-400" />
                <span>Import Map Backup</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      store.importData(file);
                      setIsSettingsOpen(false);
                    }
                  }}
                />
              </label>

              <button
                onClick={() => {
                  store.setIsHelpOpen(true);
                  setIsSettingsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>How It Works & Tips</span>
              </button>

              <div className="border-t border-slate-800 my-1" />

              <button
                onClick={() => {
                  store.resetMap();
                  setIsSettingsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <span>Reset Map Progress</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
