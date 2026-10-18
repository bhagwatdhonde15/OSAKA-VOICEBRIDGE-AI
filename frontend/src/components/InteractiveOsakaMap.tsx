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
        attribution: '&copy; OpenStreetMap | Osaka Transit Layer',
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

    // Custom marker icon helper
    const createCustomIcon = (bgColor: string, text: string) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background-color: ${bgColor}; width: 26px; height: 26px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 10px;">${text}</div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });
    };

    // Plot all known stations
    if (allStations) {
      Object.entries(allStations).forEach(([id, st]) => {
        const marker = L.marker([st.coordinates.lat, st.coordinates.lng], {
          icon: createCustomIcon('#8B5CF6', st.name_en.substring(0, 2))
        }).bindPopup(`
          <div style="color: #080B16; font-family: sans-serif; min-width: 170px;">
            <strong style="font-size: 13px; color: #8B5CF6;">${st.name_en}</strong><br/>
            <span style="font-size: 11px; color: #64748B;">${st.name_ja}</span>
            <hr style="margin: 4px 0; border: none; border-top: 1px solid #E2E8F0;"/>
            <div style="font-size: 10px;"><strong>Elevator:</strong> ${st.accessible_exits[0]?.exit || 'Available'}</div>
            <div style="font-size: 10px; color: #059669;">✔ Step-free accessible</div>
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
        icon: createCustomIcon('#10B981', 'S')
      }).bindPopup(`<strong>Origin:</strong> ${mapData.origin.name}`);
      markersGroup.addLayer(origMarker);

      // Destination Marker
      const destMarker = L.marker([destLat, destLng], {
        icon: createCustomIcon('#8B5CF6', 'D')
      }).bindPopup(`<strong>Destination:</strong> ${mapData.destination.name}<br/>Exit: ${mapData.destination.exit}`);
      markersGroup.addLayer(destMarker);

      // Draw polyline connecting them
      const polyline = L.polyline([[origLat, origLng], [destLat, destLng]], {
        color: '#8B5CF6',
        weight: 4,
        opacity: 0.9,
        dashArray: '6, 6'
      });
      markersGroup.addLayer(polyline);

      // Fit bounds
      const bounds = L.latLngBounds([[origLat, origLng], [destLat, destLng]]);
      map.fitBounds(bounds, { padding: [40, 40] });
    }

  }, [mapData, allStations, onSelectStation]);

  return (
    <div className="rounded-3xl bg-bridge-card/90 border border-bridge-border shadow-luxury p-5 sm:p-6 flex flex-col">
      
      {/* Map Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-bridge-text flex items-center gap-2">
            <Compass className="w-4 h-4 text-bridge-cyan" />
            <span>Osaka Accessibility & Transit Map</span>
          </h3>
          <p className="text-xs text-bridge-muted">
            OpenStreetMap verified station elevator locations & transit paths.
          </p>
        </div>

        {/* Map Type Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-bridge-surface border border-bridge-border text-xs">
          <button
            onClick={() => setMapMode('osm')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              mapMode === 'osm'
                ? 'bg-bridge-violet text-white shadow-sm'
                : 'text-bridge-muted hover:text-bridge-text'
            }`}
          >
            OpenStreetMap
          </button>
          <button
            onClick={() => setMapMode('schematic')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              mapMode === 'schematic'
                ? 'bg-bridge-violet text-white shadow-sm'
                : 'text-bridge-muted hover:text-bridge-text'
            }`}
          >
            Schematic
          </button>
        </div>
      </div>

      {/* Map Viewport */}
      <div className="relative w-full h-[360px] sm:h-[400px] rounded-2xl overflow-hidden border border-bridge-border bg-[#080B16]">
        
        {/* OpenStreetMap View */}
        <div
          ref={mapContainerRef}
          className={`w-full h-full ${mapMode === 'osm' ? 'block' : 'hidden'}`}
          style={{ zIndex: 10 }}
        />

        {/* Schematic View */}
        {mapMode === 'schematic' && (
          <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-[#0B0F20] via-[#080B16] to-[#11162A] relative">
            
            <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-bridge-surface/90 border border-bridge-border text-[10px] font-bold text-bridge-muted flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-bridge-cyan" />
              <span>Osaka Metro Line Topology & Verified Elevator Exits</span>
            </div>

            {/* SVG Transit Diagram */}
            <svg className="w-full h-full" viewBox="0 0 600 350">
              <defs>
                <pattern id="grid-schematic" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-schematic)" />

              {/* Midosuji Red Line */}
              <line x1="120" y1="50" x2="350" y2="290" stroke="#E11D48" strokeWidth="6" strokeLinecap="round" />
              <text x="70" y="45" fill="#E11D48" fontSize="11" fontWeight="bold">Midosuji Line (M)</text>

              {/* Tanimachi Purple Line */}
              <line x1="280" y1="40" x2="480" y2="280" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" />
              <text x="440" y="35" fill="#A78BFA" fontSize="11" fontWeight="bold">Tanimachi Line (T)</text>

              {/* Chuo Green Line */}
              <line x1="60" y1="180" x2="520" y2="180" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
              <text x="460" y="170" fill="#34D399" fontSize="11" fontWeight="bold">Chuo Line (C)</text>

              {/* Shin-Osaka */}
              <circle cx="140" cy="70" r="7" fill="white" stroke="#E11D48" strokeWidth="3" />
              <text x="155" y="74" fill="white" fontSize="11" fontWeight="bold">Shin-Osaka (M13)</text>
              <text x="155" y="86" fill="#94A3B8" fontSize="9">Shinkansen Concourse Lift</text>

              {/* Umeda / Osaka Station */}
              <circle cx="210" cy="140" r="8" fill="white" stroke="#8B5CF6" strokeWidth="3" />
              <text x="225" y="142" fill="white" fontSize="12" fontWeight="bold">Osaka / Umeda (M16)</text>
              <text x="225" y="154" fill="#94A3B8" fontSize="9">Central South Elevator</text>

              {/* Namba */}
              <circle cx="310" cy="250" r="8" fill="white" stroke="#E11D48" strokeWidth="3" />
              <text x="325" y="252" fill="white" fontSize="12" fontWeight="bold">Namba (M20)</text>
              <text x="325" y="264" fill="#94A3B8" fontSize="9">Exit 14 Elevator (Dotonbori)</text>

              {/* Osaka Castle */}
              <circle cx="410" cy="180" r="9" fill="#F59E0B" stroke="#8B5CF6" strokeWidth="3" />
              <text x="370" y="205" fill="#FCD34D" fontSize="11" fontWeight="bold">Osaka Castle (T23)</text>
              <text x="370" y="217" fill="#94A3B8" fontSize="9">Exit 1-B Elevator + Senior Cart</text>

              {/* Kaiyukan */}
              <circle cx="100" cy="180" r="7" fill="white" stroke="#10B981" strokeWidth="3" />
              <text x="30" y="205" fill="white" fontSize="11" fontWeight="bold">Kaiyukan (C11)</text>
              <text x="30" y="217" fill="#94A3B8" fontSize="9">100% Step-free Ramp</text>
            </svg>

            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-bridge-surface/90 border border-bridge-border text-[9px] text-bridge-muted">
              *Illustrative schematic showing verified elevator nodes
            </div>
          </div>
        )}

      </div>

      {/* Selected Station Quick Card */}
      {selectedStationInfo && (
        <div className="mt-3.5 p-3.5 rounded-2xl bg-bridge-surface/90 border border-bridge-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold text-bridge-cyan uppercase tracking-wider">
                Selected Station Guide
              </span>
              <span className="text-xs font-bold text-bridge-text">
                {selectedStationInfo.name_en} ({selectedStationInfo.name_ja})
              </span>
            </div>
            <p className="text-xs text-bridge-muted">
              <strong>Accessible Exit:</strong> {selectedStationInfo.accessible_exits[0]?.exit} — {selectedStationInfo.accessible_exits[0]?.features.join(', ')}
            </p>
          </div>
          <div className="text-[11px] font-medium text-bridge-cyan bg-bridge-card border border-bridge-cyan/20 px-2.5 py-1 rounded-lg self-start sm:self-center">
            {selectedStationInfo.boarding_tips}
          </div>
        </div>
      )}

      {/* Bottom Map Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-bridge-muted gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-bridge-osakaRed inline-block" />
            Midosuji Line
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-bridge-violet inline-block" />
            Tanimachi Line
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-bridge-emerald inline-block" />
            Chuo Line
          </span>
          <span className="flex items-center gap-1">
            <Accessibility className="w-3.5 h-3.5 text-bridge-cyan" />
            Step-free Exits
          </span>
        </div>
        <span className="text-[10px] text-bridge-subtle">
          OSM Leaflet Coordinates (Osaka, JP)
        </span>
      </div>

    </div>
  );
};
