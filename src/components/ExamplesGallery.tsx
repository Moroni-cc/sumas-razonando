import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { DecompositionTree } from './DecompositionTree';
import { Lightbulb, Eye } from 'lucide-react';

interface ExampleCardProps {
  id: number;
  num1: number;
  num2: number;
  part1: number;
  part2: number;
  total: number;
  colorTheme: 'green' | 'blue' | 'yellow' | 'pink';
}

export const ExamplesGallery: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const examples: ExampleCardProps[] = [
    {
      id: 1,
      num1: 8,
      num2: 4,
      part1: 2,
      part2: 2,
      total: 12,
      colorTheme: 'green',
    },
    {
      id: 2,
      num1: 7,
      num2: 5,
      part1: 3,
      part2: 2,
      total: 12,
      colorTheme: 'blue',
    },
    {
      id: 3,
      num1: 9,
      num2: 3,
      part1: 1,
      part2: 2,
      total: 12,
      colorTheme: 'yellow',
    },
    {
      id: 4,
      num1: 6,
      num2: 8,
      part1: 4,
      part2: 4,
      total: 14,
      colorTheme: 'pink',
    },
  ];

  const themeClasses = {
    green: {
      cardBg: 'bg-emerald-50/90 hover:bg-emerald-50',
      border: 'border-emerald-300',
      tagBg: 'bg-emerald-600 text-white',
      boxBorder: 'border-emerald-500 bg-emerald-100 text-emerald-800',
      badgeBg: 'bg-emerald-200 text-emerald-900',
    },
    blue: {
      cardBg: 'bg-sky-50/90 hover:bg-sky-50',
      border: 'border-sky-300',
      tagBg: 'bg-sky-600 text-white',
      boxBorder: 'border-sky-500 bg-sky-100 text-sky-800',
      badgeBg: 'bg-sky-200 text-sky-900',
    },
    yellow: {
      cardBg: 'bg-amber-50/90 hover:bg-amber-50',
      border: 'border-amber-300',
      tagBg: 'bg-amber-500 text-white',
      boxBorder: 'border-amber-500 bg-amber-100 text-amber-900',
      badgeBg: 'bg-amber-200 text-amber-950',
    },
    pink: {
      cardBg: 'bg-rose-50/90 hover:bg-rose-50',
      border: 'border-rose-300',
      tagBg: 'bg-rose-600 text-white',
      boxBorder: 'border-rose-500 bg-rose-100 text-rose-800',
      badgeBg: 'bg-rose-200 text-rose-950',
    },
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-200 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider mb-2 border border-amber-300">
          <Lightbulb className="w-4 h-4 text-amber-600" /> Ejemplos Resueltos
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
          SUMAS <span className="text-emerald-600">RAZONANDO</span>
        </h2>
        <p className="text-slate-600 font-bold mt-1 text-sm md:text-base">
          Ejemplos resueltos paso a paso: completa el 10 y luego suma. Toca cualquier tarjeta para inspeccionar su árbol de descomposición.
        </p>
      </div>

      {/* Grid of 4 Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {examples.map((ex) => {
          const theme = themeClasses[ex.colorTheme];
          const isExpanded = activeCardId === ex.id;

          return (
            <div
              key={ex.id}
              onClick={() => {
                sound.playClick();
                setActiveCardId(isExpanded ? null : ex.id);
              }}
              className={`rounded-3xl p-6 border-4 shadow-lg transition-all duration-300 cursor-pointer relative ${
                theme.cardBg
              } ${theme.border} ${isExpanded ? 'scale-102 ring-4 ring-blue-300' : 'hover:scale-101'}`}
            >
              {/* Header Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-4 py-1 rounded-full font-black text-xs uppercase tracking-wider ${theme.tagBg}`}>
                  Ejemplo {ex.id}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {isExpanded ? 'Ver Menos' : 'Ver Árbol'}
                </span>
              </div>

              {/* Main Question */}
              <div className="text-center py-2">
                <div className="text-3xl md:text-4xl font-black text-slate-800 tracking-wider">
                  {ex.num1} + {ex.num2} = <span className="text-blue-600">?</span>
                </div>
              </div>

              {/* Explanation Text */}
              <div className="text-center my-3 text-slate-700 font-extrabold text-sm md:text-base">
                Descomponemos el <strong className="text-slate-900 underline">{ex.num2}</strong> en{' '}
                <span className="text-emerald-700">{ex.part1}</span> y{' '}
                <span className="text-blue-700">{ex.part2}</span>.
              </div>

              {/* Step Equations with Rounded Boxes */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border-2 border-slate-200/80 my-3 space-y-3 text-center shadow-inner">
                {/* Line 1: num1 + [part1] + [part2] */}
                <div className="text-2xl md:text-3xl font-black text-slate-800 flex items-center justify-center gap-2">
                  <span>{ex.num1} +</span>
                  <span className={`px-3 py-0.5 rounded-xl border-2 font-black ${theme.boxBorder}`}>
                    {ex.part1}
                  </span>
                  <span>+</span>
                  <span className={`px-3 py-0.5 rounded-xl border-2 font-black ${theme.boxBorder}`}>
                    {ex.part2}
                  </span>
                </div>

                {/* Line 2: 10 + part2 = total */}
                <div className="text-2xl md:text-3xl font-black text-slate-800 flex items-center justify-center gap-2">
                  <span className="text-amber-600">10</span>
                  <span>+</span>
                  <span className="text-blue-600">{ex.part2}</span>
                  <span>=</span>
                  <span className="text-emerald-600 font-extrabold">{ex.total}</span>
                </div>

                {/* Final Big Number */}
                <div className="text-3xl font-black text-emerald-700 pt-1 border-t border-slate-200">
                  {ex.total}
                </div>
              </div>

              {/* Interactive Expanded Decomposition Tree */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t-2 border-dashed border-slate-300 bg-white p-4 rounded-2xl shadow-md animate-fade-in">
                  <div className="text-center text-xs font-bold text-slate-500 uppercase mb-2">
                    Visualización del Árbol de Descomposición
                  </div>
                  <DecompositionTree
                    topNumber={ex.num2}
                    leftValue={ex.part1}
                    rightValue={ex.part2}
                    colorTheme={ex.colorTheme}
                  />
                  <div className="text-center text-xs font-semibold text-slate-600 mt-2">
                    💡 <span className="font-bold">{ex.num1}</span> + <span className="font-bold">{ex.part1}</span> = 10. ¡Luego sumamos <span className="font-bold">{ex.part2}</span>!
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Tip Banner */}
      <div className="bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-200 rounded-2xl p-4 border-2 border-amber-300 flex items-center gap-4 shadow-md">
        <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center text-white text-2xl shadow shrink-0">
          ⭐
        </div>
        <div>
          <h4 className="font-black text-amber-950 text-base">Recuerda:</h4>
          <p className="text-amber-900 font-bold text-sm">
            Siempre completamos 10 primero con el primer número y luego le sumamos lo que queda.
          </p>
        </div>
      </div>
    </div>
  );
};
