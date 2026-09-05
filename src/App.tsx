import React, { useRef, useCallback } from 'react';
import { WorldMap, WorldMapRef } from './components/Map/WorldMap';
import { TopHeader } from './components/Navigation/TopHeader';
import { SearchBar } from './components/Navigation/SearchBar';
import { LocationDrawer } from './components/Drawer/LocationDrawer';
import { StatsModal } from './components/Stats/StatsModal';
import { PosterModal } from './components/Stats/PosterModal';
import { HelpModal } from './components/UI/HelpModal';
import { useScratchStore } from './hooks/useScratchStore';
import { EntityType, VisitedEntity } from './types';

export function App() {
  const store = useScratchStore();
  const mapRef = useRef<WorldMapRef>(null);

  const handleFlyTo = useCallback((lat: number, lng: number, zoom: number = 6) => {
    mapRef.current?.flyTo(lat, lng, zoom);
  }, []);

  const handleSelectEntity = useCallback((entity: VisitedEntity) => {
    store.setSelectedEntity(entity);
  }, [store]);

  const handleToggleScratch = useCallback((
    id: string,
    type: EntityType,
    name: string,
    countryCode: string,
    countryName: string,
    extraMetadata?: {
      lat?: number;
      lng?: number;
      flagEmoji?: string;
      landmark?: string;
      stateCode?: string;
      stateName?: string;
    }
  ) => {
    store.toggleScratch(id, type, name, countryCode, countryName, extraMetadata);
  }, [store]);

  const handleScratchEffect = useCallback((x: number, y: number) => {
    store.playScratchSound();
  }, [store]);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Top Navigation & Toolbar */}
      <TopHeader store={store} />

      {/* Main Map Container Area */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        {/* Floating Search Bar (Top-Center on Map) */}
        <div className="absolute top-3 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-20 w-auto sm:w-96 max-w-full">
          <SearchBar
            onFlyTo={handleFlyTo}
            onToggleScratch={handleToggleScratch}
            onSelectEntity={handleSelectEntity}
            isVisited={store.isVisited}
            visitedMap={store.visitedMap}
          />
        </div>

        {/* Interactive Vector Map with Scratch Layer */}
        <WorldMap
          ref={mapRef}
          visitedMap={store.visitedMap}
          isVisited={store.isVisited}
          onSelectEntity={handleSelectEntity}
          onToggleScratch={handleToggleScratch}
          theme={store.theme}
          scratchMode={store.scratchMode}
          onScratchEffect={handleScratchEffect}
        />

        {/* Location Details Sub-Menu Drawer */}
        <LocationDrawer
          entity={store.selectedEntity}
          onClose={() => store.setSelectedEntity(null)}
          onToggleScratch={handleToggleScratch}
          onUpdateMemory={store.updateMemory}
          isVisited={store.selectedEntity ? store.isVisited(store.selectedEntity.id) : false}
        />

        {/* Heartfelt Dedication in Bottom Corner */}
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/30 text-xs text-amber-200 font-medium shadow-lg">
          <span>Have a safe trip, Eugenio</span>
          <span className="text-rose-400">❤️</span>
        </div>
      </main>

      {/* Floating Quick Action Footer on Mobile */}
      <div className="md:hidden z-20 flex items-center justify-around bg-slate-950/90 backdrop-blur-xl border-t border-amber-500/20 px-3 py-2 text-xs">
        <button
          onClick={() => store.setIsStatsOpen(true)}
          className="flex flex-col items-center gap-1 text-slate-300 hover:text-amber-300"
        >
          <span className="text-base">🏆</span>
          <span className="text-[10px] font-semibold">{store.stats.totalPlaces} Visited</span>
        </button>

        <button
          onClick={() => store.setScratchMode(prev => prev === 'scratch' ? 'click' : 'scratch')}
          className="flex flex-col items-center gap-1 text-amber-300"
        >
          <span className="text-base">{store.scratchMode === 'scratch' ? '🖐️' : '👆'}</span>
          <span className="text-[10px] font-semibold">{store.scratchMode === 'scratch' ? 'Rub Mode' : 'Tap Mode'}</span>
        </button>

        <button
          onClick={() => store.setIsPosterOpen(true)}
          className="flex flex-col items-center gap-1 text-amber-400 font-bold"
        >
          <span className="text-base">📜</span>
          <span className="text-[10px] font-semibold">Poster</span>
        </button>
      </div>

      {/* Modals */}
      <StatsModal store={store} />
      <PosterModal store={store} />
      <HelpModal store={store} />
    </div>
  );
}

export default App;
