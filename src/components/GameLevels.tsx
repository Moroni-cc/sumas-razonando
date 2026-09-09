import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import type { DifficultyLevel, ReasoningProblem } from '../types';
import { DecompositionTree } from './DecompositionTree';
import { Gamepad2, CheckCircle2, ChevronRight } from 'lucide-react';

interface GameLevelsProps {
  onEarnStar: () => void;
  onUpdateStreak: (newStreak: number) => void;
  currentStreak: number;
}

export const GameLevels: React.FC<GameLevelsProps> = ({
  onEarnStar,
  onUpdateStreak,
  currentStreak,
}) => {
  const [activeLevel, setActiveLevel] = useState<DifficultyLevel | null>(null);
  const [problemIndex, setProblemIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // Current problem inputs
  const [treeLeftInput, setTreeLeftInput] = useState<string>('');
  const [treeRightInput, setTreeRightInput] = useState<string>('');
  const [answerInput, setAnswerInput] = useState<string>('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'error' | 'none' }>({
    text: '',
    type: 'none',
  });

  // Level Generator
  const generateProblemsForLevel = (level: DifficultyLevel): ReasoningProblem[] => {
    if (level === 'level1') {
      // Amigos del 10 (Direct complements)
      const pairs = [
        { n1: 9, n2: 1 },
        { n1: 8, n2: 2 },
        { n1: 7, n2: 3 },
        { n1: 6, n2: 4 },
        { n1: 5, n2: 5 },
        { n1: 9, n2: 2 },
        { n1: 8, n2: 3 },
        { n1: 7, n2: 4 },
      ];
      return pairs.map((p, idx) => ({
        id: `l1-${idx}`,
        num1: p.n1,
        num2: p.n2,
        neededFor10: 10 - p.n1,
        remainder: p.n2 - (10 - p.n1),
        total: p.n1 + p.n2,
      }));
    } else if (level === 'level2') {
      // Sumas Razonando 10-20
      const pairs = [
        { n1: 9, n2: 6 },
        { n1: 8, n2: 7 },
        { n1: 6, n2: 8 },
        { n1: 7, n2: 5 },
        { n1: 9, n2: 4 },
        { n1: 8, n2: 5 },
        { n1: 7, n2: 6 },
        { n1: 9, n2: 8 },
      ];
      return pairs.map((p, idx) => ({
        id: `l2-${idx}`,
        num1: p.n1,
        num2: p.n2,
        neededFor10: 10 - p.n1,
        remainder: p.n2 - (10 - p.n1),
        total: p.n1 + p.n2,
      }));
    } else {
      // Level 3: Decenas Mayores (18 + 6, 29 + 5, 37 + 5, 48 + 4)
      const pairs = [
        { n1: 18, n2: 6 },
        { n1: 29, n2: 5 },
        { n1: 37, n2: 5 },
        { n1: 48, n2: 4 },
        { n1: 19, n2: 7 },
        { n1: 28, n2: 6 },
      ];
      return pairs.map((p, idx) => {
        const nextTen = Math.ceil((p.n1 + 1) / 10) * 10;
        const needed = nextTen - p.n1;
        const rem = p.n2 - needed;
        return {
          id: `l3-${idx}`,
          num1: p.n1,
          num2: p.n2,
          neededFor10: needed,
          remainder: rem,
          total: p.n1 + p.n2,
        };
      });
    }
  };

  const [problems, setProblems] = useState<ReasoningProblem[]>([]);

  const startLevel = (lvl: DifficultyLevel) => {
    sound.playClick();
    setActiveLevel(lvl);
    const newProbs = generateProblemsForLevel(lvl);
    setProblems(newProbs);
    setProblemIndex(0);
    setScore(0);
    resetInputs();
  };

  const resetInputs = () => {
    setTreeLeftInput('');
    setTreeRightInput('');
    setAnswerInput('');
    setFeedbackMsg({ text: '', type: 'none' });
  };

  const currentProb = problems[problemIndex];

  const handleCheckAnswer = () => {
    if (!currentProb) return;

    const ansNum = parseInt(answerInput);
    const treeL = parseInt(treeLeftInput);
    const treeR = parseInt(treeRightInput);

    let isTreeValid = true;
    if (activeLevel !== 'level1') {
      isTreeValid = treeL === currentProb.neededFor10 && treeR === currentProb.remainder;
    }

    const isAnsValid = ansNum === currentProb.total;

    if (isAnsValid && isTreeValid) {
      sound.playCorrect();
      onEarnStar();
      onUpdateStreak(currentStreak + 1);
      setScore((prev) => prev + 100);
      setFeedbackMsg({ text: '¡Excelente razonamiento! 🎉 +100 Puntos', type: 'success' });
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });

      setTimeout(() => {
        if (problemIndex + 1 < problems.length) {
          setProblemIndex((prev) => prev + 1);
          resetInputs();
        } else {
          // Level Completed!
          sound.playFanfare();
          setFeedbackMsg({ text: '¡Nivel Completado con éxito! 🏆', type: 'success' });
        }
      }, 1200);
    } else {
      sound.playError();
      onUpdateStreak(0);
      if (!isTreeValid && activeLevel !== 'level1') {
        setFeedbackMsg({
          text: `Revisa la descomposición: para llegar a la decena falta ${currentProb.neededFor10}.`,
          type: 'error',
        });
      } else {
        setFeedbackMsg({
          text: 'Respuesta incorrecta. ¡Inténtalo de nuevo!',
          type: 'error',
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Level Selection View */}
      {!activeLevel ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white p-6 rounded-3xl shadow-xl border-4 border-emerald-200">
            <div className="flex items-center gap-3 mb-2">
              <Gamepad2 className="w-8 h-8 text-yellow-300" />
              <h2 className="text-3xl font-black uppercase tracking-tight">Niveles de Dificultad</h2>
            </div>
            <p className="text-emerald-100 font-medium text-sm md:text-base">
              Selecciona tu nivel para comenzar a practicar las sumas razonadas y ganar estrellas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level 1 Card */}
            <div
              onClick={() => startLevel('level1')}
              className="bg-white rounded-3xl p-6 border-4 border-emerald-300 hover:border-emerald-500 shadow-xl cursor-pointer hover:scale-102 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-black text-xl mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  1
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Principiante
                </span>
                <h3 className="text-2xl font-black text-slate-800 mt-2">Amigos del 10</h3>
                <p className="text-slate-600 text-sm font-medium mt-2">
                  Aprende y domina qué pareja de números suma exactamente 10.
                </p>
              </div>
              <button className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2">
                ¡Jugar Nivel 1! <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Level 2 Card */}
            <div
              onClick={() => startLevel('level2')}
              className="bg-white rounded-3xl p-6 border-4 border-sky-300 hover:border-sky-500 shadow-xl cursor-pointer hover:scale-102 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 bg-amber-400 text-amber-950 text-xs font-black px-4 py-1 rounded-bl-xl shadow">
                ⭐ Recomendado
              </div>
              <div>
                <div className="w-12 h-12 bg-sky-100 text-sky-800 rounded-2xl flex items-center justify-center font-black text-xl mb-4 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  2
                </div>
                <span className="bg-sky-100 text-sky-800 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Intermedio
                </span>
                <h3 className="text-2xl font-black text-slate-800 mt-2">Sumas Razonando</h3>
                <p className="text-slate-600 text-sm font-medium mt-2">
                  Descompón el segundo número para completar el 10 y calcular el resultado.
                </p>
              </div>
              <button className="mt-6 w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2">
                ¡Jugar Nivel 2! <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Level 3 Card */}
            <div
              onClick={() => startLevel('level3')}
              className="bg-white rounded-3xl p-6 border-4 border-purple-300 hover:border-purple-500 shadow-xl cursor-pointer hover:scale-102 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-purple-100 text-purple-800 rounded-2xl flex items-center justify-center font-black text-xl mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  3
                </div>
                <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Avanzado
                </span>
                <h3 className="text-2xl font-black text-slate-800 mt-2">Decenas Grandes</h3>
                <p className="text-slate-600 text-sm font-medium mt-2">
                  Aplica la estrategia completando la decena en sumas de 20, 30 o 40.
                </p>
              </div>
              <button className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2">
                ¡Jugar Nivel 3! <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Active Game Mode Screen */
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-slate-200 space-y-6">
          {/* Header Status inside Game */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <button
              onClick={() => {
                sound.playClick();
                setActiveLevel(null);
              }}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
            >
              ← Elegir otro Nivel
            </button>

            <div className="flex items-center gap-4 font-black text-slate-700">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs uppercase">
                Ejercicio {problemIndex + 1} de {problems.length}
              </span>
              <span className="text-amber-600 text-lg flex items-center gap-1">
                🏆 Puntos: {score}
              </span>
            </div>
          </div>

          {/* Current Problem Gameplay */}
          {currentProb && (
            <div className="max-w-xl mx-auto space-y-6 text-center">
              {/* Question Header */}
              <div className="bg-gradient-to-r from-sky-50 to-indigo-50 p-6 rounded-3xl border-2 border-sky-200">
                <span className="text-xs font-black text-sky-600 uppercase tracking-wider block mb-1">
                  Resuelve usando la estrategia de completar la decena
                </span>
                <div className="text-4xl md:text-5xl font-black text-slate-800 tracking-wider">
                  {currentProb.num1} + {currentProb.num2} = <span className="text-sky-600">?</span>
                </div>
              </div>

              {/* Tree for level 2 & 3 */}
              {activeLevel !== 'level1' && (
                <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
                  <span className="text-xs font-extrabold text-slate-600 block mb-2">
                    1. Descomponemos el {currentProb.num2}:
                  </span>
                  <DecompositionTree
                    topNumber={currentProb.num2}
                    isEditable
                    leftValue={treeLeftInput}
                    rightValue={treeRightInput}
                    onLeftChange={(v) => setTreeLeftInput(v)}
                    onRightChange={(v) => setTreeRightInput(v)}
                    colorTheme="purple"
                  />
                </div>
              )}

              {/* Final Result Answer Input */}
              <div className="bg-white p-6 rounded-2xl border-2 border-sky-200 shadow-inner space-y-3">
                <label className="block text-slate-700 font-extrabold text-lg">
                  {activeLevel === 'level1' ? 'Respuesta:' : '2. Escribe el Resultado Final:'}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={3}
                  placeholder="?"
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-28 h-16 border-4 border-blue-500 rounded-2xl text-center text-3xl font-black text-blue-900 outline-none focus:ring-4 focus:ring-blue-300"
                />
              </div>

              {/* Feedback Alert */}
              {feedbackMsg.text && (
                <div
                  className={`p-4 rounded-2xl font-black text-center text-sm md:text-base animate-fade-in ${
                    feedbackMsg.type === 'success'
                      ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-400'
                      : 'bg-rose-100 text-rose-900 border-2 border-rose-400'
                  }`}
                >
                  {feedbackMsg.text}
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleCheckAnswer}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xl rounded-2xl shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-6 h-6" /> Comprobar Respuesta
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
