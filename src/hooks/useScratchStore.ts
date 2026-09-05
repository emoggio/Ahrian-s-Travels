import { useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { VisitedEntity, TravelMemory, EntityType, MapTheme, Badge } from '../types';
import { WORLD_COUNTRIES } from '../data/worldCountriesData';
import { WORLD_CITIES } from '../data/worldCitiesData';
import { useScratchAudio } from './useScratchAudio';

const STORAGE_KEY = 'scratch_map_visited_v1';
const THEME_KEY = 'scratch_map_theme_v1';
const TOTAL_SOVEREIGN_COUNTRIES = 195;

export const useScratchStore = () => {
  const [visitedMap, setVisitedMap] = useState<Record<string, VisitedEntity>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading saved scratch data', e);
    }
    return {};
  });

  const [undoStack, setUndoStack] = useState<VisitedEntity[]>([]);
  const [redoStack, setRedoStack] = useState<VisitedEntity[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<VisitedEntity | null>(null);
  const [theme, setTheme] = useState<MapTheme>(() => {
    return (localStorage.getItem(THEME_KEY) as MapTheme) || 'gold';
  });
  const [scratchMode, setScratchMode] = useState<'scratch' | 'click'>('scratch');
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isPosterOpen, setIsPosterOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [friendName, setFriendName] = useState<string>(() => {
    const saved = localStorage.getItem('scratch_friend_name');
    if (!saved || saved === 'Emma') return 'Ahrian';
    return saved;
  });

  const { playScratchSound, playUnlockFanfare, isMuted, toggleMute } = useScratchAudio();

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visitedMap));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [visitedMap]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('scratch_friend_name', friendName);
  }, [friendName]);

  // Check if entity is visited
  const isVisited = useCallback((id: string) => {
    return !!visitedMap[id];
  }, [visitedMap]);

  // Trigger celebration confetti
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24']
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  // Scratch / Add entity
  const scratchEntity = useCallback((
    id: string, 
    type: EntityType, 
    name: string, 
    countryCode: string, 
    countryName: string,
    existingMemory?: TravelMemory,
    extraMetadata?: {
      lat?: number;
      lng?: number;
      flagEmoji?: string;
      landmark?: string;
      stateCode?: string;
      stateName?: string;
    }
  ) => {
    if (visitedMap[id]) return; // already visited

    const newEntity: VisitedEntity = {
      id,
      type,
      name,
      countryCode,
      countryName,
      lat: extraMetadata?.lat,
      lng: extraMetadata?.lng,
      flagEmoji: extraMetadata?.flagEmoji,
      landmark: extraMetadata?.landmark,
      stateCode: extraMetadata?.stateCode,
      stateName: extraMetadata?.stateName,
      scratchedAt: Date.now(),
      memory: existingMemory || {
        dateVisited: new Date().toISOString().split('T')[0],
        rating: 5,
        notes: ''
      }
    };

    setVisitedMap(prev => ({
      ...prev,
      [id]: newEntity
    }));

    setUndoStack(prev => [...prev, newEntity]);
    setRedoStack([]);
    playUnlockFanfare();
    triggerConfetti();

    setSelectedEntity(newEntity);
  }, [visitedMap, playUnlockFanfare, triggerConfetti]);

  // Unscratch / Remove entity
  const unscratchEntity = useCallback((id: string) => {
    const existing = visitedMap[id];
    if (!existing) return;

    setVisitedMap(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

    if (selectedEntity?.id === id) {
      setSelectedEntity(null);
    }
  }, [visitedMap, selectedEntity]);

  // Toggle scratch
  const toggleScratch = useCallback((
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
    if (visitedMap[id]) {
      unscratchEntity(id);
    } else {
      scratchEntity(id, type, name, countryCode, countryName, undefined, extraMetadata);
    }
  }, [visitedMap, unscratchEntity, scratchEntity]);

  // Undo last scratch
  const undo = useCallback(() => {
    if (undoStack.length === 0) return;
    const lastAction = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    setRedoStack(prev => [...prev, lastAction]);

    setVisitedMap(prev => {
      const next = { ...prev };
      delete next[lastAction.id];
      return next;
    });

    if (selectedEntity?.id === lastAction.id) {
      setSelectedEntity(null);
    }
  }, [undoStack, selectedEntity]);

  // Redo
  const redo = useCallback(() => {
    if (redoStack.length === 0) return;
    const nextAction = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    setUndoStack(prev => [...prev, nextAction]);

    setVisitedMap(prev => ({
      ...prev,
      [nextAction.id]: nextAction
    }));

    setSelectedEntity(nextAction);
  }, [redoStack]);

  // Update memory / journal
  const updateMemory = useCallback((id: string, memory: Partial<TravelMemory>) => {
    setVisitedMap(prev => {
      const target = prev[id];
      if (!target) return prev;
      const updated: VisitedEntity = {
        ...target,
        memory: {
          ...(target.memory || {}),
          ...memory
        }
      };
      if (selectedEntity?.id === id) {
        setSelectedEntity(updated);
      }
      return {
        ...prev,
        [id]: updated
      };
    });
  }, [selectedEntity]);

  // Reset entire map
  const resetMap = useCallback(() => {
    if (window.confirm('Are you sure you want to reset your scratched map? All visited records will be cleared.')) {
      setVisitedMap({});
      setUndoStack([]);
      setRedoStack([]);
      setSelectedEntity(null);
    }
  }, []);

  // Export JSON backup
  const exportData = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(visitedMap, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `scratch-map-${friendName.toLowerCase()}-backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [visitedMap, friendName]);

  // Import JSON backup
  const importData = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (typeof imported === 'object') {
          setVisitedMap(imported);
          setUndoStack([]);
          setRedoStack([]);
          alert('Map data successfully imported!');
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  }, []);

  // Compute travel statistics
  const stats = useMemo(() => {
    const visitedArray = Object.values(visitedMap);
    const countryCount = visitedArray.filter(v => v.type === 'country').length;
    const cityCount = visitedArray.filter(v => v.type === 'city').length;
    const stateCount = visitedArray.filter(v => v.type === 'state').length;

    const percentWorld = Math.min(100, Math.round((countryCount / TOTAL_SOVEREIGN_COUNTRIES) * 100));

    // Continents breakdown
    const continentBreakdown: Record<string, { visited: number; total: number }> = {
      'Europe': { visited: 0, total: 44 },
      'Asia': { visited: 0, total: 48 },
      'North America': { visited: 0, total: 23 },
      'South America': { visited: 0, total: 12 },
      'Africa': { visited: 0, total: 54 },
      'Oceania': { visited: 0, total: 14 }
    };

    visitedArray.forEach(v => {
      if (v.type === 'country') {
        const cInfo = WORLD_COUNTRIES[v.id];
        if (cInfo && continentBreakdown[cInfo.continent]) {
          continentBreakdown[cInfo.continent].visited += 1;
        }
      }
    });

    return {
      countryCount,
      cityCount,
      stateCount,
      totalPlaces: visitedArray.length,
      percentWorld,
      continentBreakdown,
      visitedArray: visitedArray.sort((a, b) => b.scratchedAt - a.scratchedAt)
    };
  }, [visitedMap]);

  // Badges system
  const badges = useMemo<Badge[]>(() => {
    return [
      {
        id: 'first-step',
        title: 'First Step Abroad',
        description: 'Scratch your very first country or city.',
        icon: '✈️',
        isUnlocked: stats.totalPlaces >= 1,
        progress: Math.min(100, (stats.totalPlaces / 1) * 100),
        reqText: '1 destination visited'
      },
      {
        id: 'city-hopper',
        title: 'Urban Explorer',
        description: 'Scratch 5 distinct world cities.',
        icon: '🏙️',
        isUnlocked: stats.cityCount >= 5,
        progress: Math.min(100, (stats.cityCount / 5) * 100),
        reqText: `${stats.cityCount} / 5 cities`
      },
      {
        id: 'globe-trotter',
        title: 'Globetrotter',
        description: 'Explore 10 countries across the globe.',
        icon: '🌍',
        isUnlocked: stats.countryCount >= 10,
        progress: Math.min(100, (stats.countryCount / 10) * 100),
        reqText: `${stats.countryCount} / 10 countries`
      },
      {
        id: 'euro-tripper',
        title: 'Euro Tripper',
        description: 'Visit at least 5 European destinations.',
        icon: '🏰',
        isUnlocked: stats.continentBreakdown['Europe']?.visited >= 5,
        progress: Math.min(100, ((stats.continentBreakdown['Europe']?.visited || 0) / 5) * 100),
        reqText: `${stats.continentBreakdown['Europe']?.visited || 0} / 5 European places`
      },
      {
        id: 'island-wanderer',
        title: 'Continental Cruiser',
        description: 'Visit places in at least 3 different continents.',
        icon: '🧭',
        isUnlocked: Object.values(stats.continentBreakdown).filter(c => c.visited > 0).length >= 3,
        progress: Math.min(100, (Object.values(stats.continentBreakdown).filter(c => c.visited > 0).length / 3) * 100),
        reqText: `${Object.values(stats.continentBreakdown).filter(c => c.visited > 0).length} / 3 continents`
      },
      {
        id: 'master-traveler',
        title: 'World Nomad',
        description: 'Scratch 25 total countries, states, or cities.',
        icon: '🌟',
        isUnlocked: stats.totalPlaces >= 25,
        progress: Math.min(100, (stats.totalPlaces / 25) * 100),
        reqText: `${stats.totalPlaces} / 25 destinations`
      }
    ];
  }, [stats]);

  return {
    visitedMap,
    isVisited,
    scratchEntity,
    unscratchEntity,
    toggleScratch,
    undo,
    redo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
    selectedEntity,
    setSelectedEntity,
    updateMemory,
    theme,
    setTheme,
    scratchMode,
    setScratchMode,
    stats,
    badges,
    isStatsOpen,
    setIsStatsOpen,
    isPosterOpen,
    setIsPosterOpen,
    isHelpOpen,
    setIsHelpOpen,
    friendName,
    setFriendName,
    resetMap,
    exportData,
    importData,
    playScratchSound,
    isMuted,
    toggleMute
  };
};

export type ScratchStore = ReturnType<typeof useScratchStore>;
