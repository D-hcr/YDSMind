'use client';

import { useState } from 'react';
import type { QuestionData } from '@/lib/types/question';

interface QuestionDetailModalProps {
  question: QuestionData | null;
  onClose: () => void;
}

export default function QuestionDetailModal({ question, onClose }: QuestionDetailModalProps) {
  const [userAnswer, setUserAnswer] = useState<'A' | 'B' | 'C' | 'D' | 'E' | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!question) return null;

  const isCorrect = userAnswer === question.answer;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-700 bg-slate-950 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
              {question.examType} / {question.topicId} • {question.module}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {new Date(question.createdAt).toLocaleDateString('tr-TR')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white leading-relaxed mb-6">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {(['A', 'B', 'C', 'D', 'E'] as const).map((letter) => {
              const isAnswerSelected = userAnswer === letter;
              const isCorrectAnswer = question.answer === letter;
              const isWrongSelection = isAnswerSelected && !isCorrect;

              let bgColor = 'border-slate-700 bg-slate-900';
              let textColor = 'text-slate-200';

              if (showAnswer) {
                if (isCorrectAnswer) {
                  bgColor = 'border-emerald-500 bg-emerald-950/30';
                  textColor = 'text-emerald-300';
                } else if (isWrongSelection) {
                  bgColor = 'border-red-500 bg-red-950/30';
                  textColor = 'text-red-300';
                }
              } else if (isAnswerSelected) {
                bgColor = 'border-cyan-500 bg-cyan-950/30';
                textColor = 'text-cyan-300';
              }

              return (
                <button
                  key={letter}
                  onClick={() => {
                    if (!showAnswer) {
                      setUserAnswer(letter);
                    }
                  }}
                  disabled={showAnswer}
                  className={`w-full text-left rounded-2xl border px-4 py-3 transition ${bgColor} ${textColor} ${
                    !showAnswer ? 'cursor-pointer hover:border-cyan-400' : 'cursor-default'
                  }`}
                >
                  <span className="font-semibold">{letter}.</span> {question.options[letter]}
                </button>
              );
            })}
          </div>

          {/* Show Answer Button */}
          {!showAnswer && (
            <button
              onClick={() => setShowAnswer(true)}
              className="mt-6 w-full rounded-2xl bg-cyan-600 px-6 py-2 font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50"
              disabled={!userAnswer}
            >
              {userAnswer ? 'Cevabı Kontrol Et' : 'Önce bir cevap seç'}
            </button>
          )}

          {/* Reset Button */}
          {showAnswer && (
            <button
              onClick={() => {
                setUserAnswer(null);
                setShowAnswer(false);
              }}
              className="mt-4 w-full rounded-2xl bg-slate-800 px-6 py-2 font-semibold text-slate-300 transition hover:bg-slate-700"
            >
              Tekrar Çöz
            </button>
          )}
        </div>

        {/* Result */}
        {showAnswer && userAnswer && (
          <div
            className={`rounded-3xl border p-4 ${
              isCorrect
                ? 'border-emerald-500 bg-emerald-950/30'
                : 'border-red-500 bg-red-950/30'
            }`}
          >
            <p
              className={`font-semibold mb-2 ${
                isCorrect ? 'text-emerald-300' : 'text-red-300'
              }`}
            >
              {isCorrect ? '✓ Doğru!' : '✗ Yanlış!'}
            </p>
            <p className="text-sm text-slate-300 mb-3">
              <span className="font-semibold">Doğru cevap:</span> {question.answer}
            </p>
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-slate-300">Açıklama:</span> {question.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
