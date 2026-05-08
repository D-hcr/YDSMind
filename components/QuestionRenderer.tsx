'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { QuestionRecord } from '@/lib/types/question';
import { stemOf, explanationOf } from '@/lib/types/question';

const LETTERS = ['A', 'B', 'C', 'D', 'E'] as const;

export type QuestionRendererProps = {
  questions: QuestionRecord[];
  onAnswer?: (questionId: string, letter: QuestionRecord['answer']) => void;
  showExplanationAfterAnswer?: boolean;
  mode?: 'practice' | 'review';
  /** Örn. Soru Bankası’nda sil butonu */
  renderAside?: (q: QuestionRecord) => ReactNode;
};

export function QuestionRenderer({
  questions,
  onAnswer,
  showExplanationAfterAnswer = true,
  mode = 'practice',
  renderAside,
}: QuestionRendererProps) {
  if (!questions.length) return null;

  return (
    <div className="space-y-4" data-question-mode={mode}>
      {questions.map((q) => (
        <QuestionItem
          key={q.id}
          q={q}
          onAnswer={onAnswer}
          showExplanationAfterAnswer={showExplanationAfterAnswer}
          renderAside={renderAside}
        />
      ))}
    </div>
  );
}

function QuestionItem({
  q,
  onAnswer,
  showExplanationAfterAnswer,
  renderAside,
}: {
  q: QuestionRecord;
  onAnswer?: (questionId: string, letter: QuestionRecord['answer']) => void;
  showExplanationAfterAnswer: boolean;
  renderAside?: (q: QuestionRecord) => ReactNode;
}) {
  const [sel, setSel] = useState<QuestionRecord['answer'] | null>(q.userSelectedAnswer ?? null);

  useEffect(() => {
    setSel(q.userSelectedAnswer ?? null);
  }, [q.id, q.userSelectedAnswer]);

  const picked = q.userSelectedAnswer ?? sel;
  const locked = picked !== null;
  const showBlock = showExplanationAfterAnswer && locked;

  const pick = (L: QuestionRecord['answer']) => {
    if (locked) return;
    setSel(L);
    onAnswer?.(q.id, L);
  };

  return (
    <article className="card space-y-3 p-5">
      <div className="flex flex-wrap justify-between gap-2 text-xs uppercase tracking-wide text-cyan-300">
        <span>
          {q.examType ?? '—'} / {q.categoryId} / {q.source}
        </span>
        {renderAside ? <span className="normal-case">{renderAside(q)}</span> : null}
      </div>
      <p className="leading-relaxed whitespace-pre-wrap">{stemOf(q)}</p>
      <div className="space-y-2">
        {LETTERS.map((L) => (
          <button
            key={L}
            type="button"
            disabled={!!locked}
            onClick={() => pick(L)}
            className={`block w-full rounded-2xl border px-4 py-2 text-left text-sm ${
              showBlock && L === q.answer
                ? 'border-emerald-500'
                : showBlock && picked === L && L !== q.answer
                  ? 'border-red-500'
                  : 'border-slate-700 hover:border-cyan-500'
            }`}
          >
            {L}) {q.options[L]}
          </button>
        ))}
      </div>
      {showBlock ? (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-3 text-sm text-slate-300">
          <p>
            <span className="text-cyan-300">Sonuç:</span>{' '}
            {picked === q.answer ? 'Doğru' : 'Yanlış'} — doğru: {q.answer}
          </p>
          <p className="mt-2">
            <span className="text-cyan-300">Çözüm:</span> {explanationOf(q)}
          </p>
        </div>
      ) : null}
    </article>
  );
}
