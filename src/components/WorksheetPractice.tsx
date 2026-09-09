import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { DecompositionTree } from './DecompositionTree';
import { PenTool, CheckCircle2, RotateCcw, Award } from 'lucide-react';

interface WorksheetCard {
  id: number;
  num1: number;
  num2: number;
  needed: number;
  remainder: number;
  total: number;
}

interface CardState {
  treeLeft: string;
  treeRight: string;
  line1Val1: string;
  line1Val2: string;
  line2Val: string;
  response: string;
  isChecked?: boolean;
  isCorrect?: boolean;
}

interface WorksheetPracticeProps {
  onEarnStar: () => void;
}

export const WorksheetPractice: React.FC<WorksheetPracticeProps> = ({ onEarnStar }) => {
  const problems: WorksheetCard[] = [
    { id: 1, num1: 9, num2: 6, needed: 1, remainder: 5, total: 15 },
    { id: 2, num1: 8, num2: 7, needed: 2, remainder: 5, total: 15 },
    { id: 3, num1: 6, num2: 8, needed: 4, remainder: 4, total: 14 },
    { id: 4, num1: 7, num2: 5, needed: 3, remainder: 2, total: 12 },
  ];

  const initialStates: Record<number, CardState> = {
    1: { treeLeft: '', treeRight: '', line1Val1: '', line1Val2: '', line2Val: '', response: '' },
    2: { treeLeft: '', treeRight: '', line1Val1: '', line1Val2: '', line2Val: '', response: '' },
    3: { treeLeft: '', treeRight: '', line1Val1: '', line1Val2: '', line2Val: '', response: '' },
    4: { treeLeft: '', treeRight: '', line1Val1: '', line1Val2: '', line2Val: '', response: '' },
  };

  const [cardStates, setCardStates] = useState<Record<number, CardState>>(initialStates);

  const handleInputChange = (cardId: number, field: keyof CardState, value: string) => {
    const cleanVal = value.replace(/[^0-9]/g, '');
    setCardStates((prev) => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        [field]: cleanVal,
        isChecked: false,
      },
    }));
  };

  const verifyCard = (card: WorksheetCard) => {
    const st = cardStates[card.id];
    const treeL = parseInt(st.treeLeft) || 0;
    const treeR = parseInt(st.treeRight) || 0;
    const l1v1 = parseInt(st.line1Val1) || 0;
    const l1v2 = parseInt(st.line1Val2) || 0;
    const l2v = parseInt(st.line2Val) || 0;
    const resp = parseInt(st.response) || 0;

    const isTreeCorrect = treeL === card.needed && treeR === card.remainder;
    const isLine1Correct = l1v1 === card.needed && l1v2 === card.remainder;
    const isLine2Correct = l2v === card.remainder;
    const isResponseCorrect = resp === card.total;

    const overallCorrect = isTreeCorrect && isLine1Correct && isLine2Correct && isResponseCorrect;

    setCardStates((prev) => ({
      ...prev,
      [card.id]: {
        ...prev[card.id],
        isChecked: true,
        isCorrect: overallCorrect,
      },
    }));

    if (overallCorrect) {
      sound.playCorrect();
      onEarnStar();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      sound.playError();
    }
  };

  const resetAll = () => {
    sound.playClick();
    setCardStates(initialStates);
  };

  const allCompleted = problems.every((p) => cardStates[p.id]?.isCorrect);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Worksheet Header */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-sky-300 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-800 px-3.5 py-1 rounded-full font-black text-xs uppercase tracking-wider mb-2 border border-sky-300">
              <PenTool className="w-4 h-4 text-sky-600" /> Práctica Dirigida (Página 3)
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
              SUMAS <span className="text-emerald-600">RAZONANDO</span>
            </h2>
            <p className="text-slate-600 font-bold mt-1 text-sm md:text-base">
              Ahora practica tú: completa los círculos del árbol y las respuestas intermedias.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl border border-slate-300 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Reiniciar Todo
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 4 Practice Worksheet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {problems.map((card) => {
          const st = cardStates[card.id];

          return (
            <div
              key={card.id}
              className={`bg-white rounded-3xl p-6 border-4 shadow-xl transition-all relative ${
                st.isChecked
                  ? st.isCorrect
                    ? 'border-emerald-500 bg-emerald-50/40'
                    : 'border-rose-400 bg-rose-50/40'
                  : 'border-sky-200 hover:border-sky-300'
              }`}
            >
              {/* Card Badge Number */}
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-lg shadow-md">
                  {card.id}
                </div>
                {st.isChecked && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-1 ${
                      st.isCorrect
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {st.isCorrect ? '¡Excelente! ✓' : 'Revisa los campos'}
                  </span>
                )}
              </div>

              {/* Main Problem Title: e.g., 9 + 6 = ? */}
              <div className="text-center py-2">
                <div className="text-3xl md:text-4xl font-black text-slate-800 tracking-wider">
                  {card.num1} + {card.num2} = <span className="text-sky-600">?</span>
                </div>
              </div>

              {/* Decomposition Tree Interactive Component */}
              <div className="my-2">
                <DecompositionTree
                  topNumber={card.num2}
                  isEditable
                  leftValue={st.treeLeft}
                  rightValue={st.treeRight}
                  onLeftChange={(v) => handleInputChange(card.id, 'treeLeft', v)}
                  onRightChange={(v) => handleInputChange(card.id, 'treeRight', v)}
                  leftStatus={
                    st.isChecked
                      ? parseInt(st.treeLeft) === card.needed
                        ? 'correct'
                        : 'incorrect'
                      : 'neutral'
                  }
                  rightStatus={
                    st.isChecked
                      ? parseInt(st.treeRight) === card.remainder
                        ? 'correct'
                        : 'incorrect'
                      : 'neutral'
                  }
                  colorTheme="blue"
                />
              </div>

              {/* Equation Lines */}
              <div className="bg-sky-50/80 rounded-2xl p-4 border-2 border-sky-100 my-3 space-y-4 text-center">
                {/* Line 1: card.num1 + ___ + ___ */}
                <div className="text-xl sm:text-2xl font-black text-slate-800 flex items-center justify-center gap-2 flex-wrap">
                  <span>{card.num1} +</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="?"
                    value={st.line1Val1}
                    onChange={(e) => handleInputChange(card.id, 'line1Val1', e.target.value)}
                    className="w-12 h-10 border-b-4 border-sky-500 text-center font-black bg-white rounded-lg outline-none text-sky-800 focus:ring-2 focus:ring-sky-400"
                  />
                  <span>+</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="?"
                    value={st.line1Val2}
                    onChange={(e) => handleInputChange(card.id, 'line1Val2', e.target.value)}
                    className="w-12 h-10 border-b-4 border-sky-500 text-center font-black bg-white rounded-lg outline-none text-sky-800 focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                {/* Line 2: 10 + ___ */}
                <div className="text-xl sm:text-2xl font-black text-slate-800 flex items-center justify-center gap-2">
                  <span className="text-amber-600 font-extrabold">10</span>
                  <span>+</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="?"
                    value={st.line2Val}
                    onChange={(e) => handleInputChange(card.id, 'line2Val', e.target.value)}
                    className="w-12 h-10 border-b-4 border-sky-500 text-center font-black bg-white rounded-lg outline-none text-sky-800 focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                {/* Response Line: Respuesta: [     ] */}
                <div className="pt-2 border-t-2 border-dashed border-sky-200 flex items-center justify-center gap-3">
                  <span className="font-extrabold text-slate-700 text-lg">Respuesta:</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    placeholder="?"
                    value={st.response}
                    onChange={(e) => handleInputChange(card.id, 'response', e.target.value)}
                    className={`w-20 h-12 border-2 rounded-2xl text-center text-2xl font-black outline-none transition-all ${
                      st.isChecked
                        ? st.isCorrect
                          ? 'border-emerald-500 bg-emerald-100 text-emerald-900 ring-2 ring-emerald-400'
                          : 'border-rose-400 bg-rose-100 text-rose-900'
                        : 'border-blue-400 bg-white text-blue-900 focus:ring-2 focus:ring-blue-400'
                    }`}
                  />
                </div>
              </div>

              {/* Verify Button */}
              <button
                onClick={() => verifyCard(card)}
                className={`w-full py-3 rounded-2xl font-black text-base shadow-md transition-all flex items-center justify-center gap-2 ${
                  st.isCorrect
                    ? 'bg-emerald-600 text-white'
                    : 'bg-sky-600 hover:bg-sky-700 text-white active:scale-98'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                {st.isCorrect ? '¡Correcto!' : 'Comprobar Respuesta'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {allCompleted && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-3xl shadow-2xl text-center space-y-3 animate-bounce">
          <Award className="w-16 h-16 mx-auto text-yellow-300" />
          <h3 className="text-3xl font-black">¡Felicidades! Completaste la hoja de práctica 🎉</h3>
          <p className="font-bold text-emerald-100">
            Has demostrado dominar la estrategia de completar el 10. ¡Estás listo para el Modo Juego!
          </p>
        </div>
      )}

      {/* Advice Footer Box */}
      <div className="bg-amber-100 rounded-2xl p-4 border-2 border-amber-300 flex items-center gap-3 text-amber-950">
        <div className="text-3xl">🧠</div>
        <div>
          <strong className="font-black text-base">Consejo:</strong>{' '}
          <span className="font-bold text-sm">
            Primero completa el 10 con el primer número, luego suma lo que sobró del árbol.
          </span>
        </div>
      </div>
    </div>
  );
};
