import React, { useState } from 'react';
import { X, Trophy, Globe, MapPin, Award, Calendar, Star, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ScratchStore } from '../../hooks/useScratchStore';
import { VisitedEntity } from '../../types';

interface StatsModalProps {
  store: ScratchStore;
}

export const StatsModal: React.FC<StatsModalProps> = ({ store }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'destinations' | 'badges'>('overview');

  if (!store.isStatsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-xl shadow-foil flex-shrink-0">
              🏆
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-amber-200">
                {store.friendName ? `${store.friendName}'s Travel Passport` : 'World Travel Passport'}
              </h2>
              <p className="text-xs text-slate-400">
                {store.stats.totalPlaces} destinations scratched across the globe
              </p>
            </div>
          </div>

          <button
            onClick={() => store.setIsStatsOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/60 px-4 gap-2 flex-shrink-0 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>World Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('destinations')}
            className={`py-3 px-3 font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'destinations'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Visited Places ({store.stats.totalPlaces})</span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`py-3 px-3 font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'badges'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Badges ({store.badges.filter(b => b.isUnlocked).length}/{store.badges.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-slate-300 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Big Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl text-center shadow-sm">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 block">
                    {store.stats.percentWorld}%
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-1 block">
                    World Explored
                  </span>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl text-center shadow-sm">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-blue-400 block">
                    {store.stats.countryCount}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-1 block">
                    Countries
                  </span>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl text-center shadow-sm">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400 block">
                    {store.stats.cityCount}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-1 block">
                    Cities
                  </span>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl text-center shadow-sm">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-purple-400 block">
                    {store.stats.stateCount}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mt-1 block">
                    States
                  </span>
                </div>
              </div>

              {/* Progress Bar of World */}
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-300">Global Coverage</span>
                  <span className="text-amber-400 font-bold">{store.stats.countryCount} / 195 Sovereign Nations</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${Math.max(2, store.stats.percentWorld)}%` }}
                  />
                </div>
              </div>

              {/* Continents Breakdown */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-400">
                  Continent Exploration
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(store.stats.continentBreakdown).map(([cont, data]) => {
                    const pct = Math.round((data.visited / data.total) * 100);
                    return (
                      <div key={cont} className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200">{cont}</span>
                          <span className="text-amber-300 font-mono font-bold">{data.visited} visited</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISITED DESTINATIONS LIST */}
          {activeTab === 'destinations' && (
            <div className="space-y-3">
              {store.stats.visitedArray.length > 0 ? (
                store.stats.visitedArray.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    onClick={() => {
                      store.setSelectedEntity(item);
                      store.setIsStatsOpen(false);
                    }}
                    className="p-3.5 bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 rounded-2xl flex items-center justify-between cursor-pointer transition-all hover:bg-slate-900 group"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-base flex-shrink-0">
                        {item.type === 'city' ? '🏙️' : item.type === 'state' ? '🇺🇸' : '🌍'}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-100 flex items-center gap-2 truncate">
                          <span>{item.name}</span>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-medium">
                            {item.type}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          {item.memory?.dateVisited && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-amber-400" />
                              <span>{item.memory.dateVisited}</span>
                            </span>
                          )}
                          {item.memory?.rating && (
                            <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                              <Star className="w-3 h-3 fill-amber-400" />
                              <span>{item.memory.rating}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-amber-400 group-hover:translate-x-1 transition-transform">
                      <span className="hidden sm:inline">Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <MapPin className="w-10 h-10 mx-auto mb-2 text-slate-600" />
                  <p className="font-semibold text-slate-300">No destinations scratched yet</p>
                  <p className="text-xs text-slate-500 mt-1">Start scratching countries or cities on the map!</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BADGES */}
          {activeTab === 'badges' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {store.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    badge.isUnlocked
                      ? 'bg-gradient-to-b from-amber-500/10 to-slate-950/80 border-amber-500/40 shadow-foil'
                      : 'bg-slate-950/40 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{badge.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-100">{badge.title}</h4>
                        {badge.isUnlocked && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {badge.description}
                      </p>
                      <div className="mt-2.5">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                          <span>{badge.reqText}</span>
                          <span>{Math.round(badge.progress)}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              badge.isUnlocked ? 'bg-amber-400' : 'bg-slate-600'
                            }`}
                            style={{ width: `${badge.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
