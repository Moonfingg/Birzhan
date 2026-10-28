import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/soundEngine';
import { Compass, Volume2, ArrowRight } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [countdown, setCountdown] = useState<number>(4);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleEnter();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    sound.playIntroFanfare();
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  return (
    <AnimatePresence>
      {!isTransitioning ? (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#070b16] text-white px-4 overflow-hidden"
        >
          {/* Subtle Radar Background Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          {/* Animated Sonar Rings */}
          <div className="absolute w-[500px] h-[500px] rounded-full border border-sky-500/20 animate-ping pointer-events-none [animation-duration:4s]" />
          <div className="absolute w-[800px] h-[800px] rounded-full border border-slate-700/30 pointer-events-none" />

          <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
            {/* Academic Author Badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 mb-6 shadow-xl"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="font-semibold text-white tracking-wide">Serzhan Birzhan</span>
              <span className="text-slate-500">/</span>
              <span className="text-sky-400 font-bold">Группа APE2601</span>
            </motion.div>

            {/* Main Title Reveal */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3 mb-8"
            >
              <div className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                UNITED KINGDOM
              </div>
              <div className="text-lg md:text-xl font-medium text-sky-400/90 tracking-widest uppercase">
                Интерактивный гео-технический портал
              </div>
              <p className="text-sm md:text-base text-slate-400 max-w-lg mx-auto font-normal leading-relaxed pt-2">
                Анимированная карта Великобритании, строгие факты без лишней воды, 
                алгоритмический C++ модуль Дейкстры и готовые файлы для GitHub.
              </p>
            </motion.div>

            {/* Audio Waveform Pulse Indicator */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-1.5 mb-8 h-8"
            >
              {[18, 36, 50, 24, 60, 42, 28, 48, 20].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-1 bg-gradient-to-t from-sky-500 to-cyan-300 rounded-full animate-pulse [animation-duration:0.8s]"
                />
              ))}
              <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                Звуковой движок Web Audio активен
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            >
              <button
                onClick={handleEnter}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Compass className="w-4 h-4 text-white" />
                <span>Открыть интерактивную карту</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <span className="text-xs text-slate-500 font-mono">
                Автозапуск через {countdown}с...
              </span>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
