import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import L from 'leaflet';
import { VisitedEntity, MapTheme } from '../../types';
import { WORLD_COUNTRIES, getCountryData } from '../../data/worldCountriesData';
import { WORLD_CITIES } from '../../data/worldCitiesData';
import { US_STATES } from '../../data/worldStatesData';
import { ScratchParticleSystem } from './ScratchParticles';

export interface WorldMapRef {
  flyTo: (lat: number, lng: number, zoom?: number) => void;
}

interface WorldMapProps {
  visitedMap: Record<string, VisitedEntity>;
  isVisited: (id: string) => boolean;
  onSelectEntity: (entity: VisitedEntity) => void;
  onToggleScratch: (
    id: string, 
    type: 'country' | 'state' | 'city', 
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
  theme: MapTheme;
  scratchMode: 'scratch' | 'click';
  onScratchEffect: (x: number, y: number) => void;
}

export const WorldMap = forwardRef<WorldMapRef, WorldMapProps>(({
  visitedMap,
  isVisited,
  onSelectEntity,
  onToggleScratch,
  theme,
  scratchMode,
  onScratchEffect
}, ref) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<ScratchParticleSystem | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const usStatesLayerRef = useRef<L.GeoJSON | null>(null);
  const cityMarkersGroupRef = useRef<L.LayerGroup | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [geoData, setGeoData] = useState<any>(null);
  const [usStatesData, setUsStatesData] = useState<any>(null);

  // Scratch interaction state
  const isScratchingRef = useRef<boolean>(false);
  const scratchTargetRef = useRef<{
    id: string;
    type: 'country' | 'state' | 'city';
    name: string;
    countryCode: string;
    countryName: string;
    accumulatedDistance: number;
    lastX: number;
    lastY: number;
  } | null>(null);

  // Expose flyTo method
  useImperativeHandle(ref, () => ({
    flyTo: (lat: number, lng: number, zoom: number = 5) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([lat, lng], zoom, {
          duration: 1.2,
          easeLinearity: 0.25
        });
      }
    }
  }));

  // Theme styling configurations
  const getThemeBaseStyles = (themeName: MapTheme) => {
    switch (themeName) {
      case 'midnight':
        return {
          ocean: '#070a12',
          unscratchedFill: '#242e42',
          unscratchedStroke: '#384763',
          scratchedOpacity: 0.95,
          highlightStroke: '#38bdf8'
        };
      case 'vintage':
        return {
          ocean: '#221a11',
          unscratchedFill: '#d7c297',
          unscratchedStroke: '#9f8355',
          scratchedOpacity: 0.92,
          highlightStroke: '#fef3c7'
        };
      case 'emerald':
        return {
          ocean: '#021815',
          unscratchedFill: '#094f3b',
          unscratchedStroke: '#0e6e53',
          scratchedOpacity: 0.95,
          highlightStroke: '#34d399'
        };
      case 'cyber':
        return {
          ocean: '#080414',
          unscratchedFill: '#23153c',
          unscratchedStroke: '#4c2c82',
          scratchedOpacity: 0.95,
          highlightStroke: '#f43f5e'
        };
      case 'gold':
      default:
        return {
          ocean: '#0b1120',
          unscratchedFill: '#cba135',
          unscratchedStroke: '#8e6b18',
          scratchedOpacity: 0.95,
          highlightStroke: '#ffffff'
        };
    }
  };

  // Fetch GeoJSON on mount
  useEffect(() => {
    let isMounted = true;
    Promise.all([
      fetch('./data/world-countries.geojson').then(r => r.json()),
      fetch('./data/us-states.geojson').then(r => r.json()).catch(() => null)
    ]).then(([world, states]) => {
      if (isMounted) {
        setGeoData(world);
        setUsStatesData(states);
        setIsLoaded(true);
      }
    }).catch(err => {
      console.error('Failed to load GeoJSON datasets', err);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize Particle system
  useEffect(() => {
    if (canvasRef.current) {
      particleSystemRef.current = new ScratchParticleSystem(canvasRef.current);
    }
  }, []);

  // Initialize Leaflet Map & Inject SVG Shaders
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [25, 10],
      zoom: 2.3,
      minZoom: 2,
      maxZoom: 10,
      maxBounds: [[-85, -180], [85, 180]],
      maxBoundsViscosity: 0.9,
      zoomControl: false,
      attributionControl: false,
      worldCopyJump: true
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // City markers layer group
    const cityGroup = L.layerGroup().addTo(map);
    cityMarkersGroupRef.current = cityGroup;

    // Inject SVG Gradient Shaders into Leaflet SVG pane
    const overlayPane = map.getPanes().overlayPane;
    let svg = overlayPane.querySelector('svg');
    if (!svg) {
      // Leaflet creates svg on first layer add, or we can create defs
      const observer = new MutationObserver(() => {
        const leafSvg = overlayPane.querySelector('svg');
        if (leafSvg && !leafSvg.querySelector('#scratch-map-defs')) {
          injectSvgGradients(leafSvg);
        }
      });
      observer.observe(overlayPane, { childList: true, subtree: true });
    } else {
      injectSvgGradients(svg);
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Helper to inject rich metallic & color gradient shaders
  const injectSvgGradients = (svgElement: SVGSVGElement) => {
    if (svgElement.querySelector('#scratch-map-defs')) return;

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.id = 'scratch-map-defs';
    defs.innerHTML = `
      <!-- Luxury Gold Foil Brushed Metallic Shader -->
      <linearGradient id="foil-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fae792" />
        <stop offset="25%" stop-color="#dfb643" />
        <stop offset="50%" stop-color="#c29329" />
        <stop offset="75%" stop-color="#ecd16f" />
        <stop offset="90%" stop-color="#a47513" />
        <stop offset="100%" stop-color="#dcb241" />
      </linearGradient>

      <!-- Midnight Titanium Shader -->
      <linearGradient id="foil-midnight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b4b66" />
        <stop offset="40%" stop-color="#1e293b" />
        <stop offset="75%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#243046" />
      </linearGradient>

      <!-- Vintage Parchment Shader -->
      <linearGradient id="foil-vintage" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#faeed6" />
        <stop offset="35%" stop-color="#d7bf92" />
        <stop offset="70%" stop-color="#c5ab78" />
        <stop offset="100%" stop-color="#b69864" />
      </linearGradient>

      <!-- Emerald Malachite Shader -->
      <linearGradient id="foil-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="50%" stop-color="#047857" />
        <stop offset="100%" stop-color="#064e3b" />
      </linearGradient>

      <!-- Cyber Neon Shader -->
      <linearGradient id="foil-cyber" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6366f1" />
        <stop offset="50%" stop-color="#31104e" />
        <stop offset="100%" stop-color="#1a0b33" />
      </linearGradient>
    `;
    svgElement.insertBefore(defs, svgElement.firstChild);
  };

  // Handle pointer / scratch events cross-browser
  const triggerScratchFlakes = useCallback((x: number, y: number) => {
    particleSystemRef.current?.emit(x, y, theme);
    onScratchEffect(x, y);
  }, [theme, onScratchEffect]);

  // Global pointer up listener
  useEffect(() => {
    const handleGlobalPointerUp = (e: PointerEvent | MouseEvent | TouchEvent) => {
      if (isScratchingRef.current && scratchTargetRef.current) {
        const target = scratchTargetRef.current;
        if (target.accumulatedDistance > 5 || target.accumulatedDistance === 0) {
          if (!visitedMap[target.id]) {
            onToggleScratch(target.id, target.type, target.name, target.countryCode, target.countryName);
          } else {
            onSelectEntity(visitedMap[target.id]);
          }
        }
      }

      isScratchingRef.current = false;
      scratchTargetRef.current = null;

      if (mapInstanceRef.current && !mapInstanceRef.current.dragging.enabled()) {
        mapInstanceRef.current.dragging.enable();
      }
    };

    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('mouseup', handleGlobalPointerUp);
    window.addEventListener('touchend', handleGlobalPointerUp);

    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('mouseup', handleGlobalPointerUp);
      window.removeEventListener('touchend', handleGlobalPointerUp);
    };
  }, [visitedMap, onToggleScratch, onSelectEntity]);

  // Style country feature
  const getCountryStyle = (feature: any) => {
    const props = feature.properties || {};
    const id = props.ISO_A3 || props.ADM0_A3 || props.GU_A3 || props.WB_A3 || props.ISO_A2 || props.NAME;
    const isScr = isVisited(id);
    const cInfo = getCountryData(id, props.NAME);
    const themeStyles = getThemeBaseStyles(theme);

    if (isScr) {
      return {
        fillColor: cInfo.color || '#3b82f6',
        weight: 1.2,
        opacity: 0.9,
        color: '#ffffff',
        fillOpacity: themeStyles.scratchedOpacity,
        className: 'scratched-country-path'
      };
    }

    return {
      fillColor: themeStyles.unscratchedFill,
      weight: 0.7,
      opacity: 0.8,
      color: themeStyles.unscratchedStroke,
      fillOpacity: 1,
      className: 'unscratched-country-path'
    };
  };

  // Style US State feature
  const getUsStateStyle = (feature: any) => {
    const stateId = String(feature?.id || feature?.properties?.name || '');
    const isScr = isVisited(`state-${stateId}`);
    const stateInfo = stateId ? US_STATES[stateId] : undefined;
    const themeStyles = getThemeBaseStyles(theme);

    if (isScr) {
      return {
        fillColor: stateInfo?.color || '#ec4899',
        weight: 1.2,
        opacity: 0.9,
        color: '#ffffff',
        fillOpacity: themeStyles.scratchedOpacity,
        className: 'scratched-state-path'
      };
    }

    return {
      fillColor: 'transparent',
      weight: 0.5,
      opacity: 0.4,
      color: themeStyles.unscratchedStroke,
      fillOpacity: 0,
      className: 'unscratched-state-path'
    };
  };

  // Update GeoJSON layers when visitedMap, theme, or geoData change
  useEffect(() => {
    if (!mapInstanceRef.current || !geoData) return;

    const map = mapInstanceRef.current;
    const themeStyles = getThemeBaseStyles(theme);

    // Make sure SVG defs exist
    const overlayPane = map.getPanes().overlayPane;
    const svg = overlayPane.querySelector('svg');
    if (svg) {
      injectSvgGradients(svg);
    }

    if (mapContainerRef.current) {
      mapContainerRef.current.style.backgroundColor = themeStyles.ocean;
    }

    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }

    // World Countries GeoJSON layer
    const worldLayer = L.geoJSON(geoData, {
      style: getCountryStyle,
      onEachFeature: (feature, layer) => {
        const props = feature.properties || {};
        const id = props.ISO_A3 || props.ADM0_A3 || props.GU_A3 || props.WB_A3 || props.ISO_A2 || props.NAME;
        const countryName = props.NAME_EN || props.NAME || props.ADMIN || 'Unknown Country';

        layer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({
              weight: 2,
              color: themeStyles.highlightStroke,
              fillOpacity: 1
            });
            l.bringToFront();
          },
          mouseout: (e) => {
            worldLayer.resetStyle(e.target);
          },
          mousedown: (e) => {
            const origEvent = e.originalEvent;
            if (origEvent) {
              const x = origEvent.clientX;
              const y = origEvent.clientY;
              isScratchingRef.current = true;
              scratchTargetRef.current = {
                id,
                type: 'country',
                name: countryName,
                countryCode: id,
                countryName,
                accumulatedDistance: 0,
                lastX: x,
                lastY: y
              };

              triggerScratchFlakes(x, y);

              if (scratchMode === 'scratch' && map.dragging.enabled()) {
                map.dragging.disable();
              }
            }
          },
          mousemove: (e) => {
            const origEvent = e.originalEvent;
            if (isScratchingRef.current && scratchTargetRef.current && origEvent) {
              const target = scratchTargetRef.current;
              const x = origEvent.clientX;
              const y = origEvent.clientY;
              const dx = x - target.lastX;
              const dy = y - target.lastY;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist > 3) {
                target.accumulatedDistance += dist;
                target.lastX = x;
                target.lastY = y;
                triggerScratchFlakes(x, y);

                if (target.accumulatedDistance > 25 && !visitedMap[id]) {
                  onToggleScratch(id, 'country', countryName, id, countryName);
                  target.accumulatedDistance = 0;
                }
              }
            }
          },
          click: (e) => {
            L.DomEvent.stopPropagation(e);
            if (visitedMap[id]) {
              onSelectEntity(visitedMap[id]);
            } else {
              triggerScratchFlakes(e.originalEvent?.clientX || 100, e.originalEvent?.clientY || 100);
              onToggleScratch(id, 'country', countryName, id, countryName);
            }
          }
        });
      }
    }).addTo(map);

    geoJsonLayerRef.current = worldLayer;

    // US States Layer
    if (usStatesData) {
      if (usStatesLayerRef.current) {
        map.removeLayer(usStatesLayerRef.current);
      }

      const statesLayer = L.geoJSON(usStatesData, {
        style: getUsStateStyle,
        onEachFeature: (feature, layer) => {
          const stateId = String(feature?.id || feature?.properties?.name || '');
          const stateInfo = stateId ? US_STATES[stateId] : undefined;
          const stateName = stateInfo?.name || feature.properties?.name || stateId;
          const entityId = `state-${stateId}`;

          layer.on({
            mouseover: (e) => {
              const l = e.target;
              l.setStyle({
                weight: 1.5,
                color: '#ffffff',
                fillOpacity: 0.9
              });
              l.bringToFront();
            },
            mouseout: (e) => {
              statesLayer.resetStyle(e.target);
            },
            mousedown: (e) => {
              const origEvent = e.originalEvent;
              if (origEvent) {
                const x = origEvent.clientX;
                const y = origEvent.clientY;
                isScratchingRef.current = true;
                scratchTargetRef.current = {
                  id: entityId,
                  type: 'state',
                  name: stateName,
                  countryCode: 'USA',
                  countryName: 'United States',
                  accumulatedDistance: 0,
                  lastX: x,
                  lastY: y
                };
                triggerScratchFlakes(x, y);
                if (scratchMode === 'scratch' && map.dragging.enabled()) {
                  map.dragging.disable();
                }
              }
            },
            mousemove: (e) => {
              const origEvent = e.originalEvent;
              if (isScratchingRef.current && scratchTargetRef.current && origEvent) {
                const target = scratchTargetRef.current;
                const x = origEvent.clientX;
                const y = origEvent.clientY;
                const dx = x - target.lastX;
                const dy = y - target.lastY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > 3) {
                  target.accumulatedDistance += dist;
                  target.lastX = x;
                  target.lastY = y;
                  triggerScratchFlakes(x, y);

                  if (target.accumulatedDistance > 25 && !visitedMap[entityId]) {
                    onToggleScratch(entityId, 'state', stateName, 'USA', 'United States');
                    target.accumulatedDistance = 0;
                  }
                }
              }
            },
            click: (e) => {
              L.DomEvent.stopPropagation(e);
              if (visitedMap[entityId]) {
                onSelectEntity(visitedMap[entityId]);
              } else {
                triggerScratchFlakes(e.originalEvent?.clientX || 100, e.originalEvent?.clientY || 100);
                onToggleScratch(entityId, 'state', stateName, 'USA', 'United States');
              }
            }
          });
        }
      }).addTo(map);

      usStatesLayerRef.current = statesLayer;
    }
  }, [geoData, usStatesData, visitedMap, theme, scratchMode, triggerScratchFlakes]);

  // Update City Markers
  useEffect(() => {
    if (!cityMarkersGroupRef.current || !mapInstanceRef.current) return;

    const group = cityMarkersGroupRef.current;
    group.clearLayers();

    const allCities = [...WORLD_CITIES];
    Object.values(visitedMap).forEach(v => {
      if (v.type === 'city' && v.lat !== undefined && v.lng !== undefined) {
        if (!allCities.some(c => c.id === v.id)) {
          allCities.push({
            id: v.id,
            name: v.name,
            countryCode: v.countryCode,
            countryName: v.countryName,
            lat: v.lat,
            lng: v.lng,
            flagEmoji: v.flagEmoji,
            landmark: v.landmark,
            stateCode: v.stateCode,
            stateName: v.stateName
          });
        }
      }
    });

    allCities.forEach((city) => {
      const isScr = isVisited(city.id);

      // If NOT scratched, only show if it is a capital city
      if (!isScr && !city.isCapital) {
        return;
      }

      const iconHtml = isScr
        ? `
          <div class="relative flex items-center justify-center group cursor-pointer animate-bounce-short">
            <div class="absolute -inset-1.5 bg-amber-400/60 rounded-full blur-[3px] animate-pulse"></div>
            <div class="relative w-7 h-7 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 border-2 border-white shadow-xl flex items-center justify-center text-xs text-slate-900 font-bold transform hover:scale-125 transition-transform duration-200">
              ${city.isCapital ? '⭐' : '📍'}
            </div>
            <div class="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 backdrop-blur-sm text-amber-300 border border-amber-500/40 text-[11px] font-bold px-2 py-0.5 rounded-full shadow-lg pointer-events-none">
              ${city.name}${city.isCapital ? ' (Capital)' : ''}
            </div>
          </div>
        `
        : `
          <div class="w-3.5 h-3.5 rounded-full bg-amber-400/50 border border-amber-300/80 hover:bg-amber-300 hover:scale-150 transition-all duration-150 shadow cursor-pointer flex items-center justify-center group">
            <div class="w-1.5 h-1.5 rounded-full bg-amber-200"></div>
          </div>
        `;

      const customIcon = L.divIcon({
        className: 'city-marker-div',
        html: iconHtml,
        iconSize: isScr ? [28, 28] : [14, 14],
        iconAnchor: isScr ? [14, 14] : [7, 7]
      });

      const marker = L.marker([city.lat, city.lng], { icon: customIcon });

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        if (visitedMap[city.id]) {
          onSelectEntity(visitedMap[city.id]);
        } else {
          triggerScratchFlakes(e.originalEvent?.clientX || 100, e.originalEvent?.clientY || 100);
          onToggleScratch(
            city.id, 
            'city', 
            city.name, 
            city.countryCode, 
            city.countryName,
            {
              lat: city.lat,
              lng: city.lng,
              flagEmoji: city.flagEmoji,
              landmark: city.landmark,
              stateCode: city.stateCode,
              stateName: city.stateName
            }
          );
        }
      });

      group.addLayer(marker);
    });
  }, [visitedMap, isVisited, triggerScratchFlakes]);

  return (
    <div 
      className={`relative w-full h-full overflow-hidden select-none scratch-map-ocean ${
        scratchMode === 'scratch' ? 'cursor-crosshair' : 'cursor-grab active:cursor-grabbing'
      }`}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Leaflet Map Target */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full z-0 scratch-map-ocean"
      />

      {/* Particle Canvas Overlay */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 text-slate-200">
          <div className="relative w-16 h-16 mb-4">
            <div className="w-16 h-16 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-xl">🗺️</div>
          </div>
          <h2 className="text-xl font-serif font-bold text-amber-300">Unrolling Ahrian's Scratch Map...</h2>
          <p className="text-xs text-slate-400 mt-1">Preparing world countries, states, and cities</p>
        </div>
      )}
    </div>
  );
});
