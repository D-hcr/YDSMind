'use client';

import { useMemo, useState } from 'react';
import FlashcardManager from '../components/FlashcardManager';
import ExamSimulator from '../components/ExamSimulator';
import ContextLearning from '../components/ContextLearning';
import { moduleDefinitions } from '../lib/prompt';

const tabs = [
  { id: 'flashcard', title: moduleDefinitions.flashcard },
  { id: 'exam', title: moduleDefinitions.exam },
  { id: 'context', title: moduleDefinitions.context },
] as const;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]['id']>('flashcard');

  const activeComponent = useMemo(() => {
    if (activeTab === 'flashcard') return <FlashcardManager />;
    if (activeTab === 'exam') return <ExamSimulator />;
    return <ContextLearning />;
  }, [activeTab]);

  return (
    <main className="container py-10">
      <header className="mb-10 rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">YDSMind</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Gerçek YDS / YÖKDİL deneyimine yakın hazırlık</h1>
            <p className="mt-4 max-w-2xl text-slate-400">Kelime odaklı öğrenme, sınav simülasyonu ve bağlam içi sorular. AI yalnızca izinli kelimelerle ve ÖSYM tarzına uygun formatta çalışır.</p>
          </div>
          <div className="rounded-3xl bg-slate-900/80 p-6 text-sm text-slate-300">
            <p className="font-semibold text-cyan-300">Modüller</p>
            <ul className="mt-3 space-y-2">
              <li>Kelime Ezberleme</li>
              <li>Sınav Simülasyonu</li>
              <li>Bağlam İçinde Öğrenme</li>
            </ul>
          </div>
        </div>
      </header>

      <nav className="mb-8 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === tab.id
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </nav>

      {activeComponent}
    </main>
  );
}
