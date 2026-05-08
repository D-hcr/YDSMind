'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/word-bank', label: 'Kelime Bankası' },
  { href: '/flashcards', label: 'Flashcard' },
  { href: '/word-quiz', label: 'Kelime Quiz' },
  { href: '/word-questions', label: 'Kelimeye Özel Soru' },
  { href: '/exam-simulation', label: 'Sınav Simülasyonu' },
  { href: '/question-bank', label: 'Soru Bankası' },
  { href: '/pdf-export', label: 'PDF Çıktıları / Analiz' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur">
        <div className="container flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/word-bank" className="text-lg font-semibold tracking-tight text-cyan-300">
            YDSMind
          </Link>
          <nav className="flex flex-wrap gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  path === item.href
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-8">{children}</main>
    </div>
  );
}
