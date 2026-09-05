import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Search, MapPin, Globe, Sparkles, X, CheckCircle2, Loader2 } from 'lucide-react';
import { SearchFilterType, EntityType, VisitedEntity } from '../../types';
import { WORLD_COUNTRIES } from '../../data/worldCountriesData';
import { WORLD_CITIES } from '../../data/worldCitiesData';
import { US_STATES } from '../../data/worldStatesData';

interface SearchResultItem {
  id: string;
  type: EntityType;
  name: string;
  countryCode: string;
  countryName: string;
  flagEmoji: string;
  extraInfo?: string;
  lat?: number;
  lng?: number;
  stateCode?: string;
  stateName?: string;
  landmark?: string;
  isDynamic?: boolean;
}

interface SearchBarProps {
  onFlyTo: (lat: number, lng: number, zoom?: number) => void;
  onToggleScratch: (
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
  ) => void;
  onSelectEntity: (entity: VisitedEntity) => void;
  isVisited: (id: string) => boolean;
  visitedMap: Record<string, VisitedEntity>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onFlyTo,
  onToggleScratch,
  onSelectEntity,
  isVisited,
  visitedMap
}) => {
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<SearchFilterType>('all');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [dynamicCityResults, setDynamicCityResults] = useState<SearchResultItem[]>([]);
  const [isSearchingOnline, setIsSearchingOnline] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Built-in searchable items
  const localSearchItems = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    // Countries
    Object.values(WORLD_COUNTRIES).forEach(country => {
      items.push({
        id: country.id,
        type: 'country',
        name: country.name,
        countryCode: country.isoA3,
        countryName: country.name,
        flagEmoji: country.flagEmoji,
        extraInfo: `Capital: ${country.capital} • ${country.continent}`
      });
    });

    // Cities
    WORLD_CITIES.forEach(city => {
      items.push({
        id: city.id,
        type: 'city',
        name: city.name,
        countryCode: city.countryCode,
        countryName: city.countryName,
        flagEmoji: city.flagEmoji || '📍',
        extraInfo: city.landmark ? `${city.countryName} • ${city.landmark}` : city.countryName,
        lat: city.lat,
        lng: city.lng,
        stateCode: city.stateCode,
        stateName: city.stateName
      });
    });

    // Also include any custom cities that user has already visited/scratched
    Object.values(visitedMap).forEach(v => {
      if (v.type === 'city' && !WORLD_CITIES.some(c => c.id === v.id)) {
        items.push({
          id: v.id,
          type: 'city',
          name: v.name,
          countryCode: v.countryCode,
          countryName: v.countryName,
          flagEmoji: v.flagEmoji || '📍',
          extraInfo: `${v.countryName}${v.stateName ? `, ${v.stateName}` : ''}`,
          lat: v.lat,
          lng: v.lng,
          stateCode: v.stateCode,
          stateName: v.stateName
        });
      }
    });

    // States
    Object.values(US_STATES).forEach(state => {
      items.push({
        id: `state-${state.id}`,
        type: 'state',
        name: `${state.name} (${state.id})`,
        countryCode: 'USA',
        countryName: 'United States',
        flagEmoji: '🇺🇸',
        extraInfo: state.capital ? `State Capital: ${state.capital}, USA` : 'United States State'
      });
    });

    return items;
  }, [visitedMap]);

  // Local filtered results
  const localFilteredResults = useMemo(() => {
    if (!query.trim()) return [];

    const lower = query.toLowerCase().trim();
    return localSearchItems.filter(item => {
      if (filter === 'country' && item.type !== 'country') return false;
      if (filter === 'city' && item.type !== 'city') return false;
      if (filter === 'state' && item.type !== 'state') return false;

      const matchName = item.name.toLowerCase().includes(lower);
      const matchCountry = item.countryName.toLowerCase().includes(lower);
      const matchExtra = item.extraInfo?.toLowerCase().includes(lower);
      const matchCode = item.countryCode.toLowerCase().includes(lower);

      return matchName || matchCountry || matchExtra || matchCode;
    }).slice(0, 8);
  }, [query, filter, localSearchItems]);

  // Live Geocoding for Small Towns & Cities worldwide via Photon (OpenStreetMap)
  const fetchLiveCities = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim() || searchTerm.length < 2) {
      setDynamicCityResults([]);
      setIsSearchingOnline(false);
      return;
    }

    if (filter === 'country' || filter === 'state') {
      setDynamicCityResults([]);
      return;
    }

    try {
      setIsSearchingOnline(true);
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(searchTerm)}&limit=6`
      );
      if (!res.ok) return;

      const data = await res.json();
      const features = data.features || [];

      const results: SearchResultItem[] = [];
      const seenNames = new Set<string>();

      features.forEach((feat: any) => {
        const props = feat.properties || {};
        const geom = feat.geometry || {};
        const coords = geom.coordinates || []; // [lng, lat]
        const cityName = props.name || props.city || props.town || props.village;
        const countryName = props.country || 'World';
        const countryCode = (props.countrycode || 'WLD').toUpperCase();
        const stateName = props.state;

        if (cityName && coords.length === 2) {
          const key = `${cityName.toLowerCase()}-${countryCode.toLowerCase()}`;
          if (!seenNames.has(key)) {
            seenNames.add(key);
            const cityId = `custom-city-${cityName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${countryCode.toLowerCase()}`;

            // Country flag emoji fallback generator
            let flag = '📍';
            if (countryCode && countryCode.length === 2) {
              const codePoints = countryCode
                .toUpperCase()
                .split('')
                .map((c: string) => 127397 + c.charCodeAt(0));
              try {
                flag = String.fromCodePoint(...codePoints);
              } catch {
                flag = '📍';
              }
            }

            results.push({
              id: cityId,
              type: 'city',
              name: cityName,
              countryCode,
              countryName,
              flagEmoji: flag,
              extraInfo: stateName ? `${countryName}, ${stateName}` : countryName,
              lat: coords[1],
              lng: coords[0],
              stateName,
              isDynamic: true
            });
          }
        }
      });

      setDynamicCityResults(results);
    } catch {
      // Offline fallback
    } finally {
      setIsSearchingOnline(false);
    }
  }, [filter]);

  // Debounced search trigger
  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    if (query.trim().length >= 2) {
      debounceTimerRef.current = setTimeout(() => {
        fetchLiveCities(query.trim());
      }, 250);
    } else {
      setDynamicCityResults([]);
      setIsSearchingOnline(false);
    }

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [query, fetchLiveCities]);

  // Combined Results (Local matches first, followed by live worldwide geocoding results)
  const allResults = useMemo(() => {
    const existingIds = new Set(localFilteredResults.map(r => r.id));
    const uniqueDynamic = dynamicCityResults.filter(d => !existingIds.has(d.id));
    return [...localFilteredResults, ...uniqueDynamic].slice(0, 12);
  }, [localFilteredResults, dynamicCityResults]);

  const handleSelect = (item: SearchResultItem) => {
    if (item.lat !== undefined && item.lng !== undefined) {
      onFlyTo(item.lat, item.lng, 7);
    }

    if (visitedMap[item.id]) {
      onSelectEntity(visitedMap[item.id]);
    } else {
      onToggleScratch(
        item.id,
        item.type,
        item.name,
        item.countryCode,
        item.countryName,
        {
          lat: item.lat,
          lng: item.lng,
          flagEmoji: item.flagEmoji,
          landmark: item.landmark,
          stateCode: item.stateCode,
          stateName: item.stateName
        }
      );
    }

    setIsOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || allResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < allResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : allResults.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(allResults[selectedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      {/* Search Input Bar */}
      <div className="relative flex items-center bg-slate-900/95 backdrop-blur-md rounded-2xl border border-amber-500/30 shadow-foil p-1 transition-all focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/20">
        <div className="pl-3 text-amber-400 flex items-center">
          {isSearchingOnline ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search any country, small town, or city on Earth..."
          className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 px-3 py-2 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              setDynamicCityResults([]);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-full hover:bg-slate-800 transition-colors mr-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-2 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto text-xs">
            {(['all', 'country', 'city', 'state'] as SearchFilterType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 rounded-lg font-medium transition-all capitalize whitespace-nowrap ${
                  filter === tab
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {tab === 'all' ? '✨ All' : tab === 'country' ? '🌍 Countries' : tab === 'city' ? '🏙️ Cities & Towns' : '🇺🇸 States'}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/50">
            {allResults.length > 0 ? (
              allResults.map((item, idx) => {
                const visited = isVisited(item.id);
                const isSelected = idx === selectedIndex;

                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between px-3.5 py-2.5 cursor-pointer transition-colors ${
                      isSelected ? 'bg-amber-500/10 text-slate-100' : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <span className="text-xl flex-shrink-0">{item.flagEmoji}</span>
                      <div className="truncate">
                        <div className="text-sm font-semibold text-slate-100 flex items-center gap-2 truncate">
                          <span>{item.name}</span>
                          <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded font-mono font-medium ${
                            item.type === 'country' 
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                              : item.type === 'city' 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                              : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}>
                            {item.type}
                          </span>
                          {item.isDynamic && (
                            <span className="text-[9px] bg-slate-800 text-slate-400 px-1 rounded">Worldwide</span>
                          )}
                        </div>
                        {item.extraInfo && (
                          <div className="text-xs text-slate-400 truncate">{item.extraInfo}</div>
                        )}
                      </div>
                    </div>

                    {/* Quick Scratch / Visited Indicator */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleScratch(
                          item.id,
                          item.type,
                          item.name,
                          item.countryCode,
                          item.countryName,
                          {
                            lat: item.lat,
                            lng: item.lng,
                            flagEmoji: item.flagEmoji,
                            landmark: item.landmark,
                            stateCode: item.stateCode,
                            stateName: item.stateName
                          }
                        );
                      }}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        visited
                          ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {visited ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Scratched</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Scratch</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })
            ) : query.trim() ? (
              <div className="p-6 text-center text-slate-400">
                {isSearchingOnline ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-6 h-6 animate-spin text-amber-400 mb-2" />
                    <p className="text-sm font-medium text-slate-300">Searching worldwide atlas for "{query}"...</p>
                  </div>
                ) : (
                  <>
                    <Globe className="w-8 h-8 mx-auto mb-2 text-slate-600 opacity-60" />
                    <p className="text-sm font-medium">No places found matching "{query}"</p>
                    <p className="text-xs text-slate-500 mt-1">Check spelling or search for country name</p>
                  </>
                )}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                Type any city, town, or country worldwide to scratch...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
