import { useState, useEffect } from 'react';
import type { GameMode } from './types';
import { Header } from './components/Header';
import { InteractiveGuide } from './components/InteractiveGuide';
import { ExamplesGallery } from './components/ExamplesGallery';
import { WorksheetPractice } from './components/WorksheetPractice';
import { GameLevels } from './components/GameLevels';
import { Heart } from 'lucide-react';

export function App() {
  const [activeMode, setActiveMode] = useState<GameMode>('guide');
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('sumas_razonando_stars');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [streak, setStreak] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem('sumas_razonando_stars', stars.toString());
  }, [stars]);

  const handleEarnStar = () => {
    setStars((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-yellow-200">
      {/* Top Sticky Header */}
      <Header
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        stars={stars}
        streak={streak}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8">
        {activeMode === 'guide' && <InteractiveGuide />}
        {activeMode === 'examples' && <ExamplesGallery />}
        {activeMode === 'worksheet' && <WorksheetPractice onEarnStar={handleEarnStar} />}
        {activeMode === 'game' && (
          <GameLevels
            onEarnStar={handleEarnStar}
            onUpdateStreak={setStreak}
            currentStreak={streak}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-xs md:text-sm font-medium">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-blue-900">SUMAS RAZONANDO</span>
            <span>• Método Didáctica Integrando</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <span>Creado con</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline" />
            <span>para el aprendizaje matemático de los niños</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
