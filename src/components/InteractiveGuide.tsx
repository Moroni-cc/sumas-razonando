import React, { useState } from 'react';
import { sound } from '../utils/sound';
import { DecompositionTree } from './DecompositionTree';
import { ArrowRight, Sparkles, RefreshCw, ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react';

export const InteractiveGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedNum1, setSelectedNum1] = useState<number>(9);
  const [selectedNum2, setSelectedNum2] = useState<number>(6);

  const needed = 10 - selectedNum1;
  const remainder = selectedNum2 - needed;
  const total = selectedNum1 + selectedNum2;

  const quickExamples = [
    { n1: 9, n2: 6 },
    { n1: 8, n2: 5 },
    { n1: 7, n2: 6 },
    { n1: 9, n2: 4 },
  ];

  const handleSelectExample = (n1: number, n2: number) => {
    sound.playClick();
    setSelectedNum1(n1);
    setSelectedNum2(n2);
    setCurrentStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner Header */}
      <div className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl border-4 border-blue-200 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 opacity-20 pointer-events-none">
          <Sparkles className="w-48 h-48 text-white" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-yellow-300 mb-2 border border-white/30">
              📌 Guía para Estudiantes y Docentes
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Sumas pensando: <span className="text-yellow-300">Completar el 10</span>
            </h2>
            <p className="text-blue-100 mt-1 font-medium text-sm md:text-base">
              Aprende la estrategia mental para sumar de forma rápida sin necesidad de usar los dedos.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[200px]">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 block">¿Qué queremos lograr?</span>
            <span className="text-sm font-black text-white mt-1 block">
              ¡Completar el número 10 antes de seguir sumando!
            </span>
          </div>
        </div>
      </div>

      {/* Select Example Selector */}
      <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-bold text-slate-700 text-sm">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          <span>Elige una suma para el tutorial interactivo:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickExamples.map((ex) => (
            <button
              key={`${ex.n1}-${ex.n2}`}
              onClick={() => handleSelectExample(ex.n1, ex.n2)}
              className={`px-4 py-2 rounded-xl font-black text-base transition-all ${
                selectedNum1 === ex.n1 && selectedNum2 === ex.n2
                  ? 'bg-blue-600 text-white shadow-lg scale-105 ring-2 ring-blue-300'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              {ex.n1} + {ex.n2}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Guide Step-by-Step */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-sky-100 space-y-8">
        {/* Top Guided Example Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-sky-50 p-4 rounded-2xl border-2 border-sky-200 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-black text-lg">
              ?
            </div>
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Ejemplo Guiado</span>
              <div className="text-3xl font-black text-sky-900">
                {selectedNum1} + {selectedNum2} = <span className="text-emerald-600 font-extrabold">{total}</span>
              </div>
            </div>
          </div>

          {/* Step Selector Buttons */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl shadow-inner border border-sky-200">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => {
                  sound.playClick();
                  setCurrentStep(step);
                }}
                className={`w-10 h-10 rounded-xl font-black text-sm transition-all flex items-center justify-center ${
                  currentStep === step
                    ? 'bg-sky-500 text-white shadow-md scale-110'
                    : step < currentStep
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {step < currentStep ? '✓' : step}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 1 */}
        <div
          className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
            currentStep === 1
              ? 'border-blue-500 bg-blue-50/70 shadow-lg ring-2 ring-blue-300'
              : 'border-slate-200 bg-slate-50 opacity-80'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg shrink-0">
              1
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-black text-blue-900">Paso 1: Preguntamos</h3>
                <p className="text-slate-700 font-medium text-sm">
                  ¿Cuánto le falta al <strong className="text-blue-600 text-base">{selectedNum1}</strong> para llegar a <strong className="text-amber-600 text-base">10</strong>?
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-blue-200 flex items-center justify-center gap-6 text-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-500 text-blue-700 bg-blue-50 flex items-center justify-center text-2xl font-black">
                    {selectedNum1}
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 mb-1">
                      Le falta +{needed}
                    </span>
                    <ArrowRight className="w-6 h-6 text-emerald-500 animate-pulse" />
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-amber-500 text-amber-700 bg-amber-50 flex items-center justify-center text-2xl font-black">
                    10
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div
          className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
            currentStep === 2
              ? 'border-emerald-500 bg-emerald-50/70 shadow-lg ring-2 ring-emerald-300'
              : 'border-slate-200 bg-slate-50 opacity-80'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-lg shrink-0">
              2
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-black text-emerald-900">Paso 2: Descomponemos</h3>
                <p className="text-slate-700 font-medium text-sm">
                  Separamos el <strong className="text-emerald-700 text-base">{selectedNum2}</strong> en{' '}
                  <strong className="text-blue-600 text-base">{needed}</strong> y{' '}
                  <strong className="text-purple-600 text-base">{remainder}</strong>, porque el{' '}
                  <strong>{needed}</strong> nos sirve para completar el 10.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 flex justify-center">
                <DecompositionTree
                  topNumber={selectedNum2}
                  leftValue={needed}
                  rightValue={remainder}
                  colorTheme="green"
                />
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div
          className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
            currentStep === 3
              ? 'border-amber-500 bg-amber-50/70 shadow-lg ring-2 ring-amber-300'
              : 'border-slate-200 bg-slate-50 opacity-80'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-lg shrink-0">
              3
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-black text-amber-900">Paso 3: Completamos el 10</h3>
                <p className="text-slate-700 font-medium text-sm">
                  Sumamos el primer número más la primera parte descompuesta:{' '}
                  <strong className="text-amber-700">{selectedNum1} + {needed} = 10</strong>.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 text-center">
                <div className="text-2xl md:text-3xl font-black text-slate-800 tracking-wide">
                  <span className="text-blue-600">{selectedNum1}</span> +{' '}
                  <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-300">
                    {needed}
                  </span>{' '}
                  ={' '}
                  <span className="text-amber-600 bg-amber-100 px-3 py-1 rounded-xl border-2 border-amber-400">
                    10
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 4 */}
        <div
          className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
            currentStep === 4
              ? 'border-indigo-500 bg-indigo-50/70 shadow-lg ring-2 ring-indigo-300'
              : 'border-slate-200 bg-slate-50 opacity-80'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-lg shrink-0">
              4
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-black text-indigo-900">Paso 4: Sumamos lo que queda</h3>
                <p className="text-slate-700 font-medium text-sm">
                  Sumamos el 10 resultante más lo que sobró ({remainder}):{' '}
                  <strong className="text-indigo-700">10 + {remainder} = {total}</strong>.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border-2 border-indigo-200 text-center">
                <div className="text-2xl md:text-3xl font-black text-slate-800 tracking-wide">
                  <span className="text-amber-600">10</span> +{' '}
                  <span className="text-purple-600 bg-purple-100 px-2 py-0.5 rounded-lg border border-purple-300">
                    {remainder}
                  </span>{' '}
                  ={' '}
                  <span className="text-emerald-600 bg-emerald-100 px-3 py-1 rounded-xl border-2 border-emerald-400">
                    {total}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons for Step-by-Step */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            disabled={currentStep === 1}
            onClick={() => {
              sound.playClick();
              setCurrentStep((prev) => Math.max(1, prev - 1));
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition-all"
          >
            <ChevronLeft className="w-5 h-5" /> Anterior
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => {
                sound.playClick();
                setCurrentStep((prev) => Math.min(4, prev + 1));
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
            >
              Siguiente Paso <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playFanfare();
                setCurrentStep(1);
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all"
            >
              <RefreshCw className="w-5 h-5" /> Repetir Demostración
            </button>
          )}
        </div>

        {/* Final Result Card & Tip Banner */}
        <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 p-5 rounded-2xl border-2 border-amber-300 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center text-white text-2xl shadow">
              🧠
            </div>
            <div>
              <span className="text-xs font-black text-amber-800 uppercase tracking-wider">Para recordar:</span>
              <p className="text-amber-950 font-bold text-sm">
                Cuando sumas pensando en el 10, tu mente trabaja más rápido y te equivocas menos.
              </p>
            </div>
          </div>

          <div className="bg-white px-6 py-3 rounded-2xl border-2 border-amber-400 shadow-md text-center min-w-[200px]">
            <span className="text-xs font-bold text-slate-500 uppercase">Resultado Final</span>
            <div className="text-2xl md:text-3xl font-black text-blue-900">
              {selectedNum1} + {selectedNum2} = <span className="text-emerald-600">{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
