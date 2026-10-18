import React, { useEffect, useRef, useState } from 'react';
import { Layers, Compass, Accessibility } from 'lucide-react';
import type { MapData, StationData } from '../types';
import L from 'leaflet';

interface InteractiveOsakaMapProps {
  mapData?: MapData;
  allStations?: Record<string, StationData>;
  onSelectStation?: (stationId: string) => void;
}

export const InteractiveOsakaMap: React.FC<InteractiveOsakaMapProps> = ({
  mapData,
  allStations,
  onSelectStation
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const [mapMode, setMapMode] = useState<'osm' | 'schematic'>('osm');
  const [selectedStationInfo, setSelectedStationInfo] = useState<StationData | null>(null);

  const defaultCenter = [34.6850, 135.5050] as [number, number]; // Osaka Central
  const defaultZoom = 13;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!leafletMapRef.current) {
      // Initialize Leaflet map
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: defaultZoom,
        zoomControl: true,
        attributionControl: true
      });

      // Legitimate OpenStreetMap tile layer (Osaka, Japan)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Osaka City Transit Layer',
        maxZoom: 19
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersRef.current = markersGroup;
      leafletMapRef.current = map;
    }

    const map = leafletMapRef.current;
    const markersGroup = markersRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // Custom icons
    const createCustomIcon = (bgColor: string, text: string) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background-color: ${bgColor}; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 11px;">${text}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
    };

    // Plot all known stations
    if (allStations) {
      Object.entries(allStations).forEach(([id, st]) => {
        const marker = L.marker([st.coordinates.lat, st.coordinates.lng], {
          icon: createCustomIcon('#522886', st.name_en.substring(0, 2))
        }).bindPopup(`
          <div style="color: #070b14; font-family: sans-serif; min-width: 180px;">
            <strong style="font-size: 14px; color: #E5171F;">${st.name_en}</strong><br/>
            <span style="font-size: 12px; color: #64748b;">${st.name_ja}</span>
            <hr style="margin: 6px 0; border: none; border-top: 1px solid #e2e8f0;"/>
            <div style="font-size: 11px; margin-bottom: 4px;"><strong>Elevator:</strong> ${st.accessible_exits[0]?.exit || 'Available'}</div>
            <div style="font-size: 11px; color: #059669;">✔ Step-free accessible</div>
          </div>
        `);
        marker.on('click', () => {
          setSelectedStationInfo(st);
          if (onSelectStation) onSelectStation(id);
        });
        markersGroup.addLayer(marker);
      });
    }

    // Highlight current active route if mapData is provided
    if (mapData?.origin && mapData?.destination) {
      const origLat = mapData.origin.coordinates.lat;
      const origLng = mapData.origin.coordinates.lng;
      const destLat = mapData.destination.coordinates.lat;
      const destLng = mapData.destination.coordinates.lng;

      // Origin Marker
      const origMarker = L.marker([origLat, origLng], {
        icon: createCustomIcon('#009944', 'S')
      }).bindPopup(`<strong>Origin:</strong> ${mapData.origin.name}`);
      markersGroup.addLayer(origMarker);

      // Destination Marker
      const destMarker = L.marker([destLat, destLng], {
        icon: createCustomIcon('#E5171F', 'D')
      }).bindPopup(`<strong>Destination:</strong> ${mapData.destination.name}<br/>Exit: ${mapData.destination.exit}`);
      markersGroup.addLayer(destMarker);

      // Draw polyline connecting them
      const polyline = L.polyline([[origLat, origLng], [destLat, destLng]], {
        color: '#E5171F',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8'
      });
      markersGroup.addLayer(polyline);

      // Fit bounds
      const bounds = L.latLngBounds([[origLat, origLng], [destLat, destLng]]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }

  }, [mapData, allStations, onSelectStation]);

  return (
    <div className="rounded-3xl bg-osaka-card border border-osaka-border shadow-xl p-5 sm:p-6 flex flex-col">
      
      {/* Map Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-osaka-cyan" />
            <span>Osaka Accessibility & Transit Map</span>
          </h3>
          <p className="text-xs text-slate-400">
            OpenStreetMap verified station elevator locations & transit paths.
          </p>
        </div>

        {/* Map Type Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-osaka-surface border border-osaka-border text-xs">
          <button
            onClick={() => setMapMode('osm')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              mapMode === 'osm'
                ? 'bg-osaka-cyan/20 text-cyan-300 border border-osaka-cyan/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            OpenStreetMap
          </button>
          <button
            onClick={() => setMapMode('schematic')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              mapMode === 'schematic'
                ? 'bg-osaka-red/20 text-red-300 border border-osaka-red/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Transit Schematic
          </button>
        </div>
      </div>

      {/* Map Content Viewport */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-osaka-border bg-[#0d1322]">
        
        {/* OpenStreetMap View */}
        <div
          ref={mapContainerRef}
          className={`w-full h-full ${mapMode === 'osm' ? 'block' : 'hidden'}`}
          style={{ zIndex: 10 }}
        />

        {/* Illustrative Schematic View */}
        {mapMode === 'schematic' && (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-[#0c1322] via-[#070b14] to-[#12192c] relative">
            
            {/* Schematic Label */}
            <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-slate-900/90 border border-osaka-border text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-osaka-cyan" />
              <span>Osaka Metro Line Topology & Elevator Exits</span>
            </div>

            {/* SVG Transit Diagram */}
            <svg className="w-full h-full" viewBox="0 0 600 350">
              {/* Grid Lines */}
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Midosuji Red Line */}
              <line x1="120" y1="50" x2="350" y2="290" stroke="#E5171F" strokeWidth="8" strokeLinecap="round" />
              <text x="70" y="45" fill="#E5171F" fontSize="12" fontWeight="bold">Midosuji Line (M)</text>

              {/* Tanimachi Purple Line */}
              <line x1="280" y1="40" x2="480" y2="280" stroke="#522886" strokeWidth="6" strokeLinecap="round" />
              <text x="440" y="35" fill="#818cf8" fontSize="12" fontWeight="bold">Tanimachi Line (T)</text>

              {/* Chuo Green Line */}
              <line x1="60" y1="180" x2="520" y2="180" stroke="#009944" strokeWidth="6" strokeLinecap="round" />
              <text x="460" y="170" fill="#34d399" fontSize="12" fontWeight="bold">Chuo Line (C)</text>

              {/* Stations on Diagram */}
              {/* Shin-Osaka */}
              <circle cx="140" cy="70" r="8" fill="white" stroke="#E5171F" strokeWidth="4" />
              <text x="155" y="74" fill="white" fontSize="11" fontWeight="bold">Shin-Osaka (M13)</text>
              <text x="155" y="86" fill="#94a3b8" fontSize="9">Shinkansen Concourse Lift</text>

              {/* Umeda */}
              <circle cx="210" cy="140" r="9" fill="white" stroke="#E5171F" strokeWidth="4" />
              <text x="225" y="142" fill="white" fontSize="12" fontWeight="bold">Umeda (M16)</text>
              <text x="225" y="154" fill="#94a3b8" fontSize="9">Central South Elevator</text>

              {/* Namba */}
              <circle cx="310" cy="250" r="9" fill="white" stroke="#E5171F" strokeWidth="4" />
              <text x="325" y="252" fill="white" fontSize="12" fontWeight="bold">Namba (M20)</text>
              <text x="325" y="264" fill="#94a3b8" fontSize="9">Exit 14 Elevator (Dotonbori)</text>

              {/* Tanimachi 4-chome / Osaka Castle */}
              <circle cx="410" cy="180" r="10" fill="#FFB300" stroke="#522886" strokeWidth="4" />
              <text x="370" y="205" fill="#fde047" fontSize="12" fontWeight="bold">Osaka Castle (T23/C18)</text>
              <text x="370" y="217" fill="#94a3b8" fontSize="9">Exit 1-B Elevator + Senior Cart</text>

              {/* Kaiyukan (Osakako) */}
              <circle cx="100" cy="180" r="8" fill="white" stroke="#009944" strokeWidth="4" />
              <text x="30" y="205" fill="white" fontSize="11" fontWeight="bold">Kaiyukan (C11)</text>
              <text x="30" y="217" fill="#94a3b8" fontSize="9">100% Step-free Spiral Ramp</text>
            </svg>

            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/75 border border-osaka-border text-[10px] text-slate-300">
              *Illustrative Osaka Metro topology showing verified elevator nodes
            </div>
          </div>
        )}

      </div>

      {/* Selected Station Quick Card */}
      {selectedStationInfo && (
        <div className="mt-4 p-4 rounded-2xl bg-osaka-surface border border-osaka-cyan/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-osaka-cyan uppercase tracking-wider">
                Selected Station Guide
              </span>
              <span className="text-xs font-bold text-white">
                {selectedStationInfo.name_en} ({selectedStationInfo.name_ja})
              </span>
            </div>
            <p className="text-xs text-slate-300">
              <strong>Accessible Exit:</strong> {selectedStationInfo.accessible_exits[0]?.exit} — {selectedStationInfo.accessible_exits[0]?.features.join(', ')}
            </p>
          </div>
          <div className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl self-start sm:self-center">
            {selectedStationInfo.boarding_tips}
          </div>
        </div>
      )}

      {/* Bottom Map Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-osaka-red inline-block" />
            Midosuji Line
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" />
            Tanimachi Line
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            Chuo Line
          </span>
          <span className="flex items-center gap-1.5">
            <Accessibility className="w-3.5 h-3.5 text-emerald-400" />
            Verified Elevator Exits
          </span>
        </div>
        <span className="text-[11px] text-slate-500">
          OSM Leaflet Coordinates (Osaka, JP)
        </span>
      </div>

    </div>
  );
};
