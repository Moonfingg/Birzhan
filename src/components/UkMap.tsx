import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UKCountry, UKCity, UK_COUNTRIES, UK_CITIES } from '../data/ukData';
import { sound } from '../utils/soundEngine';
import { MapPin, Navigation, Eye } from 'lucide-react';

interface UkMapProps {
  selectedCountry: UKCountry | null;
  onSelectCountry: (country: UKCountry) => void;
  selectedCity: UKCity | null;
  onSelectCity: (city: UKCity) => void;
  highlightedPath?: string[];
}

export const UkMap: React.FC<UkMapProps> = ({
  selectedCountry,
  onSelectCountry,
  selectedCity,
  onSelectCity,
  highlightedPath = []
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<UKCity | null>(null);
  const [activeLayer, setActiveLayer] = useState<'all' | 'countries' | 'cities' | 'graph'>('all');

  const handleCountryClick = (countryId: UKCountry['id']) => {
    const found = UK_COUNTRIES.find((c) => c.id === countryId);
    if (found) {
      sound.playRegionSelect(countryId === 'scotland' ? 0 : countryId === 'england' ? 1 : countryId === 'wales' ? 2 : 3);
      onSelectCountry(found);
    }
  };

  const handleCityClick = (city: UKCity) => {
    sound.playCityPin();
    onSelectCity(city);
  };

  // Convert percentage coordinates into SVG viewBox 0 0 500 650
  const getSvgCoords = (coords: { x: number; y: number }) => {
    return {
      x: (coords.x / 100) * 500,
      y: (coords.y / 100) * 650
    };
  };

  return (
    <div className="relative w-full bg-[#0a0f1d] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Map Control Bar */}
      <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Navigation className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-white">Векторная карта Великобритании</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">Координатная сетка 500×650</span>
        </div>

        {/* Layer Switches */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => {
              setActiveLayer('all');
              sound.playClick();
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeLayer === 'all'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Все объекты
          </button>
          <button
            onClick={() => {
              setActiveLayer('countries');
              sound.playClick();
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeLayer === 'countries'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4 Страны
          </button>
          <button
            onClick={() => {
              setActiveLayer('cities');
              sound.playClick();
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeLayer === 'cities'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Города (10)
          </button>
          <button
            onClick={() => {
              setActiveLayer('graph');
              sound.playClick();
            }}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeLayer === 'graph'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Транзитный граф
          </button>
        </div>
      </div>

      {/* SVG Canvas Stage */}
      <div className="relative flex-1 p-4 flex items-center justify-center min-h-[460px] md:min-h-[520px]">
        {/* Subtle Sonar Sweep Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-sky-400/25 to-transparent animate-[scan_5s_ease-in-out_infinite]" />
        </div>

        <svg
          viewBox="0 0 500 650"
          className="w-full max-w-[460px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] select-none"
        >
          <defs>
            {/* Gradients for Regions */}
            <linearGradient id="grad-scotland" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="grad-england" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e11d48" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#9f1239" stopOpacity="0.65" />
            </linearGradient>
            <linearGradient id="grad-wales" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#15803d" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="grad-ni" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#c2410c" stopOpacity="0.7" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Ocean Coordinates Grid */}
          <g opacity="0.08" stroke="#38bdf8" strokeWidth="0.5">
            <line x1="50" y1="0" x2="50" y2="650" />
            <line x1="150" y1="0" x2="150" y2="650" />
            <line x1="250" y1="0" x2="250" y2="650" />
            <line x1="350" y1="0" x2="350" y2="650" />
            <line x1="450" y1="0" x2="450" y2="650" />
            <line x1="0" y1="100" x2="500" y2="100" />
            <line x1="0" y1="200" x2="500" y2="200" />
            <line x1="0" y1="300" x2="500" y2="300" />
            <line x1="0" y1="400" x2="500" y2="400" />
            <line x1="0" y1="500" x2="500" y2="500" />
          </g>

          {/* REGION 1: SCOTLAND */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => handleCountryClick('scotland')}
            onMouseEnter={() => setHoveredRegion('scotland')}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M 235 50 
                 C 255 45, 275 60, 290 85 
                 C 305 105, 330 130, 325 165 
                 C 320 195, 305 215, 290 235 
                 C 270 248, 255 250, 240 252 
                 L 220 252 
                 C 195 240, 180 230, 170 205 
                 C 155 170, 160 135, 175 100 
                 C 190 70, 215 55, 235 50 Z"
              fill={selectedCountry?.id === 'scotland' || hoveredRegion === 'scotland' ? '#0284c7' : 'url(#grad-scotland)'}
              stroke={selectedCountry?.id === 'scotland' ? '#38bdf8' : '#0f172a'}
              strokeWidth={selectedCountry?.id === 'scotland' ? 3.5 : 1.5}
              className="transition-colors duration-200"
            />
            <text x="245" y="150" fill="#ffffff" fontSize="12" fontWeight="700" letterSpacing="2" textAnchor="middle" pointerEvents="none">
              SCOTLAND
            </text>
            <text x="245" y="165" fill="#bae6fd" fontSize="9" textAnchor="middle" pointerEvents="none">
              5.48M · 77,933 km²
            </text>
          </g>

          {/* REGION 2: WALES */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => handleCountryClick('wales')}
            onMouseEnter={() => setHoveredRegion('wales')}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M 215 380 
                 C 240 380, 250 395, 245 425 
                 C 240 455, 248 480, 240 505 
                 C 230 520, 205 525, 185 510 
                 C 165 490, 160 455, 175 425 
                 C 185 400, 200 385, 215 380 Z"
              fill={selectedCountry?.id === 'wales' || hoveredRegion === 'wales' ? '#16a34a' : 'url(#grad-wales)'}
              stroke={selectedCountry?.id === 'wales' ? '#4ade80' : '#0f172a'}
              strokeWidth={selectedCountry?.id === 'wales' ? 3.5 : 1.5}
              className="transition-colors duration-200"
            />
            <text x="210" y="450" fill="#ffffff" fontSize="11" fontWeight="700" letterSpacing="1.5" textAnchor="middle" pointerEvents="none">
              WALES
            </text>
            <text x="210" y="464" fill="#bbf7d0" fontSize="8" textAnchor="middle" pointerEvents="none">
              3.11M · 20,779 km²
            </text>
          </g>

          {/* REGION 3: NORTHERN IRELAND */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => handleCountryClick('northern-ireland')}
            onMouseEnter={() => setHoveredRegion('northern-ireland')}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M 110 270 
                 C 135 260, 160 270, 165 295 
                 C 170 320, 155 350, 135 355 
                 C 115 360, 95 345, 90 325 
                 C 85 300, 95 280, 110 270 Z"
              fill={selectedCountry?.id === 'northern-ireland' || hoveredRegion === 'northern-ireland' ? '#ea580c' : 'url(#grad-ni)'}
              stroke={selectedCountry?.id === 'northern-ireland' ? '#fb923c' : '#0f172a'}
              strokeWidth={selectedCountry?.id === 'northern-ireland' ? 3.5 : 1.5}
              className="transition-colors duration-200"
            />
            <text x="130" y="312" fill="#ffffff" fontSize="10" fontWeight="700" letterSpacing="1" textAnchor="middle" pointerEvents="none">
              N. IRELAND
            </text>
            <text x="130" y="325" fill="#fed7aa" fontSize="8" textAnchor="middle" pointerEvents="none">
              1.91M · 14,130 km²
            </text>
          </g>

          {/* REGION 4: ENGLAND */}
          <g
            className="cursor-pointer transition-all duration-200"
            onClick={() => handleCountryClick('england')}
            onMouseEnter={() => setHoveredRegion('england')}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <path
              d="M 240 252 
                 C 255 250, 270 248, 290 235 
                 C 320 255, 345 285, 360 320 
                 C 385 375, 415 440, 420 480 
                 C 425 520, 385 570, 340 575 
                 C 290 580, 250 560, 230 550 
                 L 245 425 
                 C 250 395, 240 380, 215 380 
                 L 220 252 Z"
              fill={selectedCountry?.id === 'england' || hoveredRegion === 'england' ? '#e11d48' : 'url(#grad-england)'}
              stroke={selectedCountry?.id === 'england' ? '#fb7185' : '#0f172a'}
              strokeWidth={selectedCountry?.id === 'england' ? 3.5 : 1.5}
              className="transition-colors duration-200"
            />
            <text x="325" y="420" fill="#ffffff" fontSize="14" fontWeight="800" letterSpacing="2" textAnchor="middle" pointerEvents="none">
              ENGLAND
            </text>
            <text x="325" y="438" fill="#fecdd3" fontSize="9.5" textAnchor="middle" pointerEvents="none">
              56.5M · 130,278 km² · £3.0T GDP
            </text>
          </g>

          {/* TRANSIT GRAPH LINES (When activeLayer is 'graph' or 'all') */}
          {(activeLayer === 'all' || activeLayer === 'graph') && (
            <g stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4">
              {/* London to Oxford */}
              <line x1="372" y1="516" x2="335" y2="500" />
              {/* London to Cambridge */}
              <line x1="372" y1="516" x2="365" y2="477" />
              {/* London to Birmingham */}
              <line x1="372" y1="516" x2="302" y2="464" />
              {/* London to Cardiff */}
              <line x1="372" y1="516" x2="240" y2="513" />
              {/* Oxford to Birmingham */}
              <line x1="335" y1="500" x2="302" y2="464" />
              {/* Birmingham to Manchester */}
              <line x1="302" y1="464" x2="285" y2="416" />
              {/* Birmingham to Cardiff */}
              <line x1="302" y1="464" x2="240" y2="513" />
              {/* Manchester to Edinburgh */}
              <line x1="285" y1="416" x2="270" y2="256" />
              {/* Edinburgh to Glasgow */}
              <line x1="270" y1="256" x2="235" y2="258" />
              {/* Edinburgh to Aberdeen */}
              <line x1="270" y1="256" x2="317" y2="182" />
              {/* Glasgow to Belfast */}
              <line x1="235" y1="258" x2="132" y2="321" strokeDasharray="4 4" stroke="#f59e0b" />
            </g>
          )}

          {/* HIGHLIGHTED C++ DIJKSTRA ROUTE PATH */}
          {highlightedPath.length > 1 && (
            <g filter="url(#glow)">
              {highlightedPath.map((cityName, idx) => {
                if (idx === 0) return null;
                const prevCity = UK_CITIES.find(
                  (c) => c.name.toLowerCase().includes(highlightedPath[idx - 1].toLowerCase())
                );
                const currCity = UK_CITIES.find(
                  (c) => c.name.toLowerCase().includes(cityName.toLowerCase())
                );
                if (!prevCity || !currCity) return null;
                const p1 = getSvgCoords(prevCity.coordinates);
                const p2 = getSvgCoords(currCity.coordinates);
                return (
                  <line
                    key={`hl-${idx}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                );
              })}
            </g>
          )}

          {/* CITIES PINS (When activeLayer is 'all' or 'cities') */}
          {(activeLayer === 'all' || activeLayer === 'cities') &&
            UK_CITIES.map((city) => {
              const pt = getSvgCoords(city.coordinates);
              const isSelected = selectedCity?.id === city.id;
              const isHighlighted = highlightedPath.some((h) =>
                city.name.toLowerCase().includes(h.toLowerCase())
              );

              return (
                <g
                  key={city.id}
                  className="cursor-pointer group"
                  onClick={() => handleCityClick(city)}
                  onMouseEnter={() => setHoveredCity(city)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  {/* Pulse ring for selected / highlighted */}
                  {(isSelected || isHighlighted) && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="12"
                      fill="none"
                      stroke={isSelected ? '#38bdf8' : '#eab308'}
                      strokeWidth="1.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Outer circle marker */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected || isHighlighted ? '6' : '4.5'}
                    fill={isSelected ? '#38bdf8' : isHighlighted ? '#eab308' : '#ffffff'}
                    stroke="#0a0f1d"
                    strokeWidth="1.5"
                    className="transition-transform duration-200 group-hover:scale-125"
                  />

                  {/* Inner dot */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="2"
                    fill={isSelected ? '#ffffff' : '#0f172a'}
                  />

                  {/* City Label */}
                  <text
                    x={pt.x + 8}
                    y={pt.y + 3.5}
                    fill={isSelected ? '#38bdf8' : '#f1f5f9'}
                    fontSize="9.5"
                    fontWeight={isSelected ? '700' : '500'}
                    className="pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                  >
                    {city.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
        </svg>

        {/* Live Hover Float Card */}
        {hoveredCity && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-slate-900/95 border border-sky-500/40 backdrop-blur-md rounded-xl p-3 shadow-2xl z-20 pointer-events-none text-xs"
          >
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-bold text-white text-sm">{hoveredCity.name}</span>
            </div>
            <div className="text-slate-400 text-[11px] mb-1.5">{hoveredCity.role}</div>
            <div className="flex justify-between items-center text-[10px] text-slate-300 border-t border-slate-800 pt-1.5">
              <span>Население:</span>
              <span className="font-mono font-semibold text-sky-300">{hoveredCity.population}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Selection Status Strip */}
      <div className="px-5 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-sky-400" />
          <span>
            {selectedCountry ? (
              <span className="text-slate-200">
                Выбран регион: <strong className="text-white">{selectedCountry.name}</strong> ({selectedCountry.capital})
              </span>
            ) : (
              'Нажмите на страну или город для перехода к фактам'
            )}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#e11d48]" /> Англия
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#0284c7]" /> Шотландия
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#16a34a]" /> Уэльс
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#ea580c]" /> Сев. Ирландия
          </span>
        </div>
      </div>
    </div>
  );
};
