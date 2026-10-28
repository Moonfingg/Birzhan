import React, { useState } from 'react';
import { UK_COUNTRIES, UK_CITIES, UKCountry, UKCity } from './data/ukData';
import { Header } from './components/Header';
import { IntroSequence } from './components/IntroSequence';
import { UkMap } from './components/UkMap';
import { FactsDashboard } from './components/FactsDashboard';
import { CppPlayground } from './components/CppPlayground';
import { GithubExportModal } from './components/GithubExportModal';
import { sound } from './utils/soundEngine';
import { PlayCircle, ShieldCheck, MapPin, ExternalLink } from 'lucide-react';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [selectedCountry, setSelectedCountry] = useState<UKCountry>(UK_COUNTRIES[0]);
  const [selectedCity, setSelectedCity] = useState<UKCity | null>(UK_CITIES[0]);
  const [highlightedPath, setHighlightedPath] = useState<string[]>([]);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('map');

  const handleSelectCountry = (country: UKCountry) => {
    setSelectedCountry(country);
    // Find capital city
    const capCity = UK_CITIES.find((c) =>
      c.name.toLowerCase().includes(country.capital.toLowerCase().split(' ')[0])
    );
    if (capCity) {
      setSelectedCity(capCity);
    }
  };

  const handleSelectCity = (city: UKCity) => {
    setSelectedCity(city);
    const country = UK_COUNTRIES.find((c) => c.id === city.country);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handleRouteCalculated = (path: string[]) => {
    setHighlightedPath(path);
    // Scroll smoothly to map to see visualized path
    const mapEl = document.getElementById('map-stage');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b16] text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col">
      {/* 1. Engaging Intro Sequence */}
      {showIntro && (
        <IntroSequence
          onComplete={() => {
            setShowIntro(false);
            sound.playMapScan();
          }}
        />
      )}

      {/* 2. Top Bar Navigation Contract */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenGithubModal={() => setIsGithubModalOpen(true)}
      />

      {/* 3. Main Application Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <div className="relative pt-2 pb-6 border-b border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Официальный студенческий проект</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300 font-semibold">Serzhan Birzhan (Группа APE2601)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Соединенное Королевство Великобритании
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                Интерактивный аналитический портал: анимированная векторная карта, 
                чистые верифицированные факты, алгоритм маршрутизации Дейкстры на C++ и исходные файлы для GitHub.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowIntro(true);
                }}
                className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PlayCircle className="w-3.5 h-3.5 text-sky-400" />
                <span>Повторить интро-анимацию</span>
              </button>

              <button
                onClick={() => setIsGithubModalOpen(true)}
                className="px-3.5 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Файлы для GitHub</span>
              </button>
            </div>
          </div>

          {/* Visual Showcase Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-44 sm:h-52 group">
              <img
                src="/src/assets/images/uk_london_skyline_1793214339735.jpg"
                alt="London Skyline and Palace of Westminster"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
                <span className="text-[11px] font-mono text-sky-300 font-semibold uppercase">Политический & Финансовый Центр</span>
                <span className="text-sm sm:text-base font-bold text-white">Лондон · Река Темза и Вестминстерский дворец</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-800 h-44 sm:h-52 group">
              <img
                src="/src/assets/images/uk_hero_landscape_1793214338945.jpg"
                alt="Scottish Highlands and Castle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
                <span className="text-[11px] font-mono text-emerald-300 font-semibold uppercase">Природный & Исторический Рельеф</span>
                <span className="text-sm sm:text-base font-bold text-white">Шотландское нагорье (Highlands) · Замок Эйлен-Донан</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Map Stage & Interactive Inspector */}
        <section id="map" className="scroll-mt-20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider font-mono text-sky-400">
                Интерактивный картографический слой
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Карта и гео-структура Великобритании
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
              <span>Нажмите на регион или город для проигрывания звука</span>
            </div>
          </div>

          <div id="map-stage" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Map Canvas (7 cols on desktop) */}
            <div className="lg:col-span-7">
              <UkMap
                selectedCountry={selectedCountry}
                onSelectCountry={handleSelectCountry}
                selectedCity={selectedCity}
                onSelectCity={handleSelectCity}
                highlightedPath={highlightedPath}
              />
            </div>

            {/* Live Context Inspector (5 cols on desktop) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Selected Country Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: selectedCountry.accentColor }}
                />

                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{selectedCountry.flagSymbol}</span>
                    <div>
                      <h3 className="font-bold text-white text-base leading-none">
                        {selectedCountry.name}
                      </h3>
                      <span className="text-[11px] text-sky-400 font-mono">
                        {selectedCountry.nativeName}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 font-mono text-slate-300">
                    ВВП: {selectedCountry.gdpSharePercent}% UK
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 my-4 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <span className="text-slate-400 block text-[10px]">Население:</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {selectedCountry.population}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <span className="text-slate-400 block text-[10px]">Площадь:</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {selectedCountry.areaKm2.toLocaleString()} км²
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <span className="text-slate-400 block text-[10px]">Столица:</span>
                    <span className="font-semibold text-sky-300">
                      {selectedCountry.capital}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <span className="text-slate-400 block text-[10px]">Плотность:</span>
                    <span className="font-mono text-slate-200">
                      {selectedCountry.densityPerKm2} чел./км²
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="font-semibold text-slate-200 text-[11px] uppercase tracking-wider">
                    Ключевые факты региона:
                  </div>
                  {selectedCountry.summaryPoints.slice(0, 3).map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 leading-relaxed text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected City Card */}
              {selectedCity && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sky-400" />
                      <h4 className="font-bold text-white text-sm">{selectedCity.name}</h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {selectedCity.population} чел.
                    </span>
                  </div>
                  <div className="text-xs text-sky-400/90 mt-2 font-medium">
                    {selectedCity.role}
                  </div>
                  <div className="space-y-1.5 mt-2.5">
                    {selectedCity.keyFacts.map((f, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-slate-500 font-mono">›</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 2: Facts & Constituent Nations Comparison */}
        <section id="countries" className="scroll-mt-20">
          <div className="mb-4">
            <div className="text-xs uppercase tracking-wider font-mono text-sky-400">
              Статистическая верификация
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Факты и сравнительный анализ составных частей Великобритании
            </h2>
          </div>

          <FactsDashboard
            selectedCountry={selectedCountry}
            onSelectCountry={handleSelectCountry}
            selectedCity={selectedCity}
          />
        </section>

        {/* SECTION 3: C++ Graph & Transit Simulator */}
        <section id="cpp" className="scroll-mt-20">
          <div className="mb-4">
            <div className="text-xs uppercase tracking-wider font-mono text-sky-400">
              C++ Инженерный модуль (uk_analyzer.cpp)
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Алгоритм Дейкстры: Маршрутизация и оптимизация транзита
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Реализовано на современном стандарте ISO C++20 с использованием очереди с приоритетами (std::priority_queue) и списка смежности.
            </p>
          </div>

          <CppPlayground
            onRouteCalculated={handleRouteCalculated}
            onOpenGithubModal={() => setIsGithubModalOpen(true)}
          />
        </section>
      </main>

      {/* 4. Footer */}
      <footer className="mt-16 border-t border-slate-800 bg-slate-950 px-4 md:px-8 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-lg">🇬🇧</span>
            <div>
              <div className="font-bold text-white">
                United Kingdom Geo-Tech Portal
              </div>
              <div className="text-[11px] text-slate-500">
                Разработано студентом: <span className="text-slate-300 font-medium">Serzhan Birzhan</span> · Группа <span className="text-sky-400 font-mono">APE2601</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-400">Стек: C++20 · JavaScript · HTML5 · CSS3 · Web Audio API</span>
          </div>

          <div>
            <button
              onClick={() => setIsGithubModalOpen(true)}
              className="text-sky-400 hover:text-sky-300 underline font-medium cursor-pointer"
            >
              Скачать исходники для GitHub (.zip)
            </button>
          </div>
        </div>
      </footer>

      {/* 5. GitHub Export & Files Bundle Modal */}
      <GithubExportModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />
    </div>
  );
}
