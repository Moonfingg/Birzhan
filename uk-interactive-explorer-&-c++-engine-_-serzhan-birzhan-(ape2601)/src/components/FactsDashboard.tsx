import React from 'react';
import { UKCountry, UK_COUNTRIES, UK_OVERVIEW, UK_GEOGRAPHY_MILESTONES, UKCity } from '../data/ukData';
import { sound } from '../utils/soundEngine';
import { Building2, Globe2, Landmark, Award, Mountain, Waves, Compass, CheckCircle2 } from 'lucide-react';

interface FactsDashboardProps {
  selectedCountry: UKCountry;
  onSelectCountry: (country: UKCountry) => void;
  selectedCity: UKCity | null;
}

export const FactsDashboard: React.FC<FactsDashboardProps> = ({
  selectedCountry,
  onSelectCountry,
  selectedCity
}) => {
  return (
    <div className="space-y-8">
      {/* 1. Quick Master Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Население UK</span>
            <Globe2 className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white">67.8M</div>
          <div className="text-[11px] text-slate-500 mt-0.5">84% проживает в Англии</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Номинальный ВВП</span>
            <Landmark className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white">$3.49T</div>
          <div className="text-[11px] text-slate-500 mt-0.5">6-я экономика мира (£2.7T)</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Общая территория</span>
            <Compass className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white">242,495 км²</div>
          <div className="text-[11px] text-slate-500 mt-0.5">93,628 кв. миль</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Валюта & Статус</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white">GBP (£)</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Пост. член СБ ООН, G7, NATO</div>
        </div>
      </div>

      {/* 2. Interactive 4 Constituent Nations Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* Selector Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-semibold text-white tracking-wide">
              4 Составные части Великобритании (Constituent Countries)
            </h2>
          </div>

          {/* Segmented Country Selector Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
            {UK_COUNTRIES.map((country, idx) => {
              const isActive = selectedCountry.id === country.id;
              return (
                <button
                  key={country.id}
                  onClick={() => {
                    sound.playRegionSelect(idx);
                    onSelectCountry(country);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{country.flagSymbol}</span>
                  <span className="hidden sm:inline">{country.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Nation Deep Dive */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Column: Key Stats Table */}
            <div className="w-full lg:w-72 shrink-0 bg-slate-950/80 rounded-xl p-4 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-2xl">{selectedCountry.flagSymbol}</span>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{selectedCountry.nativeName}</div>
                  <div className="text-[11px] text-sky-400">{selectedCountry.nationalDay}</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Столица:</span>
                  <span className="font-semibold text-white">{selectedCountry.capital}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Население:</span>
                  <span className="font-mono font-semibold text-white">{selectedCountry.population}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Площадь:</span>
                  <span className="font-mono font-semibold text-white">{selectedCountry.areaKm2.toLocaleString()} км²</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Плотность:</span>
                  <span className="font-mono text-slate-300">{selectedCountry.densityPerKm2} чел./км²</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Доля в ВВП UK:</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedCountry.gdpSharePercent}%</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-800/50">
                  <span className="text-slate-400">Высшая точка:</span>
                  <span className="font-medium text-slate-200">{selectedCountry.highestPoint} ({selectedCountry.highestPointElevationM} м)</span>
                </div>
                <div className="flex justify-between items-start py-1">
                  <span className="text-slate-400">Парламент:</span>
                  <span className="font-medium text-right text-slate-200 max-w-[140px]">{selectedCountry.legislature}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Key Facts & Strategic Industries */}
            <div className="flex-1 space-y-5">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <span>{selectedCountry.name}</span>
                </h3>
                <div className="text-xs text-slate-400 mb-4">
                  Законодательный статус: {selectedCountry.devolutionYear}
                </div>

                {/* Pure Facts List */}
                <div className="space-y-2.5">
                  {selectedCountry.summaryPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Industries */}
              <div className="border-t border-slate-800 pt-4">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                  Ключевые отрасли экономики и инноваций:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCountry.keyIndustries.map((ind, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-200 flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Major Cities tags */}
              <div className="border-t border-slate-800 pt-3">
                <span className="text-xs text-slate-400 mr-2">Крупнейшие города:</span>
                <span className="text-xs text-slate-200 font-medium">
                  {selectedCountry.majorCities.join(' · ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Comparative Summary Table (Strict tabular discipline) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-950/70">
          <h3 className="text-sm font-semibold text-white">
            Сводная таблица стран Великобритании (Официальные данные ONS)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Страна</th>
                <th className="py-3 px-4">Столица</th>
                <th className="py-3 px-4 text-right">Население (млн)</th>
                <th className="py-3 px-4 text-right">Площадь (км²)</th>
                <th className="py-3 px-4 text-right">Плотность (чел/км²)</th>
                <th className="py-3 px-4 text-right">Доля в ВВП</th>
                <th className="py-3 px-4">Законодательный орган</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {UK_COUNTRIES.map((c) => {
                const isSelected = selectedCountry.id === c.id;
                return (
                  <tr
                    key={c.id}
                    onClick={() => {
                      sound.playClick();
                      onSelectCountry(c);
                    }}
                    className={`transition-colors cursor-pointer ${
                      isSelected ? 'bg-sky-500/10' : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                      <span>{c.flagSymbol}</span>
                      <span>{c.name.split(' ')[0]}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{c.capital.split(' ')[0]}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-white">{c.populationRaw.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-300">{c.areaKm2.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-300">{c.densityPerKm2}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-emerald-400 font-bold">{c.gdpSharePercent}%</td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">{c.legislature.split('(')[0]}</td>
                  </tr>
                );
              })}
              <tr className="bg-slate-950/90 font-bold border-t-2 border-slate-700">
                <td className="py-3 px-4 text-white">ВСЯ ВЕЛИКОБРИТАНИЯ (UK)</td>
                <td className="py-3 px-4 text-slate-300">Лондон</td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-sky-400">67.80</td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-200">242,495</td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-200">279</td>
                <td className="py-3 px-4 text-right font-mono tabular-nums text-emerald-400">100.0%</td>
                <td className="py-3 px-4 text-slate-400">Парламент Великобритании</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Geography Milestones & Scientific Heritage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Physical Geography Points */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Mountain className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-semibold text-white">
              Ключевые географические рекорды Великобритании
            </h3>
          </div>
          <div className="space-y-3">
            {UK_GEOGRAPHY_MILESTONES.map((geo, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-white">{geo.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{geo.detail}</div>
                  <div className="text-[10px] text-sky-400/80 mt-1">{geo.location}</div>
                </div>
                <div className="font-mono font-bold text-sky-400 text-sm shrink-0">
                  {geo.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UK Tech & Science Pioneers */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Waves className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">
              Вклад Великобритании в мировые технологии и науку
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="font-semibold text-white flex justify-between">
                <span>Алан Тьюринг (Alan Turing)</span>
                <span className="text-sky-400 font-mono">1936–1945</span>
              </div>
              <div className="text-slate-400 text-[11px] mt-1">
                Создатель теоретической концепции компьютера (Машина Тьюринга), взлом шифра Enigma в Блетчли-Парк.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="font-semibold text-white flex justify-between">
                <span>Тим Бернерс-Ли (Tim Berners-Lee)</span>
                <span className="text-sky-400 font-mono">1989</span>
              </div>
              <div className="text-slate-400 text-[11px] mt-1">
                Изобретатель Всемирной паутины (WWW, HTML, HTTP и URL), открывший эпоху современного интернета.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="font-semibold text-white flex justify-between">
                <span>ARM Holdings (Кембридж)</span>
                <span className="text-sky-400 font-mono">1990–наст. вр.</span>
              </div>
              <div className="text-slate-400 text-[11px] mt-1">
                Архитектура процессоров ARM лежит в основе 99% всех смартфонов на планете и современных чипов Apple Silicon.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="font-semibold text-white flex justify-between">
                <span>Google DeepMind (Лондон)</span>
                <span className="text-sky-400 font-mono">2010–наст. вр.</span>
              </div>
              <div className="text-slate-400 text-[11px] mt-1">
                Мировой лидер фундаментального искусственного интеллекта (AlphaGo, AlphaFold для биомолекулярных структур).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
