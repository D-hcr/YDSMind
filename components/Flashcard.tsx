'use client';

import { useState } from 'react';
import type { WordEntry, WordLevel } from '@/store/useWordStore';

const levels: Array<WordLevel> = ['İyi', 'Orta', 'Bilmiyorum'];

interface FlashcardProps {
  word: WordEntry;
  onUpdateLevel: (id: string, level: WordLevel) => void;
  onRemove: (id: string) => void;
}

export default function Flashcard({ word, onUpdateLevel, onRemove }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="h-56 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px' }}
    >
      <div
        className="w-full h-full relative transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front (English) */}
        <div
          className="absolute w-full h-full rounded-3xl border-2 border-cyan-500 bg-gradient-to-br from-cyan-950 to-slate-950 p-6 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300 mb-4">İngilizce</p>
          <p className="text-4xl font-bold text-cyan-300 mb-4">{word.english}</p>
          <p className="text-xs text-slate-400">Tıkla / Çevir</p>
        </div>

        {/* Back (Turkish) */}
        <div
          className="absolute w-full h-full rounded-3xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-950 to-slate-950 p-6 flex flex-col items-center justify-center text-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300 mb-4">Türkçe</p>
          <p className="text-4xl font-bold text-emerald-300 mb-4">{word.turkish}</p>
          {word.sentence && (
            <p className="text-xs text-slate-400 italic mt-4">"{word.sentence}"</p>
          )}
        </div>
      </div>

      {/* Controls Below Card */}
      <div className="mt-6 space-y-3">
        <div className="flex gap-2 justify-center flex-wrap">
          {levels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onUpdateLevel(word.id, level);
              }}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                word.level === level
                  ? level === 'İyi'
                    ? 'bg-emerald-500 text-white'
                    : level === 'Orta'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {level === 'İyi' ? '✓' : level === 'Orta' ? '→' : '?'} {level}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(word.id);
          }}
          className="w-full rounded-2xl bg-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:bg-red-600 hover:text-white"
        >
          🗑️ Sil
        </button>
      </div>
    </div>
  );
}
