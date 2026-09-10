import React from 'react';
import type { GameMode } from '../types';
import { sound } from '../utils/sound';
import { BookOpen, Lightbulb, PenTool, Gamepad2, Volume2, VolumeX, Trophy } from 'lucide-react';

interface HeaderProps {
  activeMode: GameMode;
  setActiveMode: (mode: GameMode) => void;
  stars: number;
  streak: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const BrandLogo = () => (
  <img
    src="/logo.png"
    alt="Logo de Liahona Asesoría Educativa"
    className="h-28 w-28 md:h-32 md:w-32 object-contain rounded-full bg-white shadow-sm"
  />
);

export const Header: React.FC<HeaderProps> = ({
  activeMode,
  setActiveMode,
  stars,
  streak,
  soundEnabled,
  setSoundEnabled,
}) => {
  const toggleSound = () => {
    const nextState = !soundEnabled;
    sound.enabled = nextState;
    setSoundEnabled(nextState);
    if (nextState) sound.playClick();
  };

  const navItems = [
    { id: 'guide' as GameMode, label: 'Aprende y Razona', icon: BookOpen, color: 'text-amber-500' },
    { id: 'examples' as GameMode, label: 'Ejemplos Resueltos', icon: Lightbulb, color: 'text-yellow-500' },
    { id: 'worksheet' as GameMode, label: 'Práctica Guiada', icon: PenTool, color: 'text-sky-500' },
    { id: 'game' as GameMode, label: 'Niveles de Juego', icon: Gamepad2, color: 'text-emerald-500' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b-4 border-blue-400 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveMode('guide')}>
            <BrandLogo />
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-[10px] md:text-xs px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider border border-blue-300">
                  Descubre tu mejor versión
                </span>
                <span className="bg-amber-100 text-amber-800 text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold border border-amber-300 flex items-center gap-1">
                  💡 Completa el 10
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-blue-900 drop-shadow-sm font-sans">
                <span className="text-blue-700">SUMAS</span> <span className="text-emerald-600">RAZONANDO</span>
              </h1>
            </div>
          </div>

          {/* Stats Bar (Stars, Streak, Sound) */}
          <div className="flex items-center gap-3 bg-blue-50/80 px-4 py-2 rounded-2xl border-2 border-blue-200">
            {/* Stars */}
            <div className="flex items-center gap-1.5 font-black text-amber-600 text-lg">
              <span className="text-2xl animate-bounce">⭐</span>
              <span>{stars}</span>
            </div>

            <div className="h-6 w-0.5 bg-blue-200" />

            {/* Streak */}
            <div className="flex items-center gap-1 font-extrabold text-orange-600 text-sm md:text-base">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Racha: {streak}</span>
            </div>

            <div className="h-6 w-0.5 bg-blue-200" />

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl transition-all ${soundEnabled
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm'
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
              title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-2 mt-3 pt-2 border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setActiveMode(item.id);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold text-sm transition-all duration-200 ${isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105 ring-2 ring-blue-300'
                  : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200'
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
