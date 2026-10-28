import React, { useState } from 'react';
import { sound } from '../utils/soundEngine';
import { Volume2, VolumeX, FolderDown } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenGithubModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenGithubModal
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playCityPin();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070b16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between gap-8">
      {/* Zone 1: Brand Wordmark (Single line, author credentials) */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xl">🇬🇧</span>
        <button
          onClick={() => onNavigate('map')}
          className="text-left cursor-pointer group"
        >
          <div className="text-sm md:text-base font-extrabold tracking-tight text-white whitespace-nowrap group-hover:text-sky-400 transition-colors">
            Serzhan Birzhan
          </div>
          <div className="text-[11px] font-mono text-sky-400 font-semibold whitespace-nowrap">
            Группа APE2601
          </div>
        </button>
      </div>

      {/* Zone 2: Navigation Links (Single line, concise) */}
      <nav className="hidden lg:flex items-center gap-6 text-xs md:text-sm font-medium text-slate-300">
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('map');
          }}
          className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'map'
              ? 'text-sky-400 font-bold border-b-2 border-sky-400 pb-0.5'
              : 'hover:text-white'
          }`}
        >
          Карта Великобритании
        </button>
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('countries');
          }}
          className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'countries'
              ? 'text-sky-400 font-bold border-b-2 border-sky-400 pb-0.5'
              : 'hover:text-white'
          }`}
        >
          4 Составные Страны
        </button>
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('facts');
          }}
          className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'facts'
              ? 'text-sky-400 font-bold border-b-2 border-sky-400 pb-0.5'
              : 'hover:text-white'
          }`}
        >
          Строгие Факты
        </button>
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('cpp');
          }}
          className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeSection === 'cpp'
              ? 'text-sky-400 font-bold border-b-2 border-sky-400 pb-0.5'
              : 'hover:text-white'
          }`}
        >
          C++ Алгоритм Дейкстры
        </button>
      </nav>

      {/* Zone 3: Actions (Audio Toggle + Primary CTA) */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={handleToggleSound}
          title={isMuted ? 'Включить звук' : 'Выключить звук'}
          className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline text-rose-300">Звук: Выкл</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline text-sky-300">Звук: Вкл</span>
            </>
          )}
        </button>

        <button
          onClick={onOpenGithubModal}
          className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-sky-500/20 whitespace-nowrap shrink-0 cursor-pointer transition-all"
        >
          <FolderDown className="w-3.5 h-3.5" />
          <span>Файлы для GitHub</span>
        </button>
      </div>
    </header>
  );
};
