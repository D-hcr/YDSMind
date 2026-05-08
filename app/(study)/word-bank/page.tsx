'use client';

import { useMemo, useState } from 'react';
import { useWordStore, type WordRecord } from '@/store/useWordStore';
import { parseBulkWordInput } from '@/lib/word/parseBulk';
import { createEmptyWordRecord } from '@/lib/types/word';
import type { PartOfSpeech, CefrLevel, WordStatus, ExamTag, WordDomain } from '@/lib/types/word';

const POS: PartOfSpeech[] = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'phrase',
  'phrasal_verb',
  'other',
];
const LEVELS: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const STATUS: WordStatus[] = ['new', 'learning', 'review', 'mastered'];
const TAGS: ExamTag[] = ['YDS', 'YOKDIL', 'BOTH'];
const DOMAIN: WordDomain[] = ['general', 'science', 'health', 'social', 'academic'];

export default function WordBankPage() {
  const { words, upsertWords, removeWord } = useWordStore();
  const [bulk, setBulk] = useState('');
  /** Önizle sonrası (AI öncesi) taslak */
  const [stagedDraft, setStagedDraft] = useState<WordRecord[] | null>(null);
  /** Sadece başarılı AI yanıtından sonra dolu */
  const [enrichedDraft, setEnrichedDraft] = useState<WordRecord[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fPos, setFPos] = useState<string>('all');
  const [fLevel, setFLevel] = useState<string>('all');
  const [fTag, setFTag] = useState<string>('all');
  const [fStatus, setFStatus] = useState<string>('all');
  const [fDomain, setFDomain] = useState<string>('all');

  const filtered = useMemo(() => {
    return words.filter((w) => {
      if (fPos !== 'all' && w.part_of_speech !== fPos) return false;
      if (fLevel !== 'all' && w.level !== fLevel) return false;
      if (fTag !== 'all' && w.exam_tags !== fTag) return false;
      if (fStatus !== 'all' && w.status !== fStatus) return false;
      if (fDomain !== 'all' && w.domain !== fDomain) return false;
      return true;
    });
  }, [words, fPos, fLevel, fTag, fStatus, fDomain]);

  const previewRows = enrichedDraft ?? stagedDraft;

  const parseAndStage = () => {
    setError(null);
    setEnrichedDraft(null);
    const rows = parseBulkWordInput(bulk);
    if (!rows.length) {
      setError('Geçerli satır bulunamadı.');
      setStagedDraft(null);
      return;
    }
    const staged = rows.map((r) =>
      createEmptyWordRecord({
        word: r.word,
        meaning_tr: r.meaning_tr,
        phrase: r.phrase ?? '',
        example_sentence: r.example ?? '',
      })
    );
    setStagedDraft(staged);
  };

  const enrich = async () => {
    setError(null);
    setEnrichedDraft(null);

    let source = stagedDraft;
    if (!source?.length) {
      const rows = parseBulkWordInput(bulk);
      if (!rows.length) {
        setError('Önce kelime girin ve gerekiyorsa Önizle ile doğrulayın.');
        return;
      }
      source = rows.map((r) =>
        createEmptyWordRecord({
          word: r.word,
          meaning_tr: r.meaning_tr,
          phrase: r.phrase ?? '',
          example_sentence: r.example ?? '',
        })
      );
      setStagedDraft(source);
    }

    setLoading(true);
    try {
      const res = await fetch('/api/enrich-words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          words: (source ?? []).map((w) => ({
            word: w.word,
            meaning_tr: w.meaning_tr,
            phrase: w.phrase,
            example_sentence: w.example_sentence,
          })),
        }),
      });
      let data: { success?: boolean; data?: WordRecord[]; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (!res.ok) {
        throw new Error(data.error || 'AI isteği başarısız oldu.');
      }
      if (!data.success || !Array.isArray(data.data) || data.data.length === 0) {
        throw new Error(data.error ?? 'Sunucudan beklenen veri alınamadı.');
      }
      setEnrichedDraft(data.data);
    } catch (e) {
      setEnrichedDraft(null);
      setError(e instanceof Error ? e.message : 'Bilinmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  /** Sadece AI sonrası onaylı kayıt */
  const saveEnriched = () => {
    if (!enrichedDraft?.length) return;
    upsertWords(enrichedDraft);
    setEnrichedDraft(null);
    setStagedDraft(null);
    setBulk('');
    setError(null);
  };

  /** AI kullanmadan önizleme taslağı */
  const saveStagedAsIs = () => {
    if (!stagedDraft?.length || enrichedDraft?.length) return;
    upsertWords(stagedDraft);
    setStagedDraft(null);
    setBulk('');
    setError(null);
  };

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Kelime Bankası</h1>
        <p className="mt-2 text-slate-400">
          Toplu yapıştırma (satır başına tek kelime) veya{' '}
          <code className="text-cyan-300">Kelime | Anlam | Tür | Kalıp | Cümle</code> tablo formatı.
        </p>
      </div>

      <div className="card space-y-4 p-6">
        <textarea
          value={bulk}
          onChange={(e) => setBulk(e.target.value)}
          disabled={loading}
          rows={8}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-cyan-400 disabled:opacity-60"
          placeholder={'abandon\nadvocate\nKelime | terim anlamı | noun | in context | Example sentence here...'}
        />
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={parseAndStage}
            className="rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Önizle
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={enrich}
            className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'AI çalışıyor…' : 'AI ile eksikleri tamamla'}
          </button>
          <button
            type="button"
            disabled={loading || !enrichedDraft?.length}
            onClick={saveEnriched}
            className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Kelimeleri Kaydet{enrichedDraft?.length ? ` (${enrichedDraft.length})` : ''}
          </button>
          <button
            type="button"
            disabled={loading || !stagedDraft?.length || !!enrichedDraft?.length}
            onClick={saveStagedAsIs}
            className="rounded-2xl border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Önizlemeyi olduğu gibi kaydet (AI kullanmadan)
          </button>
        </div>
        <p className="text-xs text-slate-500">
          AI ile zenginleştirme hata verirse hiçbir şey otomatik kaydedilmez. Başarılı AI çıktısını kontrol ettikten
          sonra <strong>Kelimeleri Kaydet</strong> ile bankaya aktarın.
        </p>

        {error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-500/60 bg-red-950/30 px-4 py-3 text-sm text-red-200"
          >
            {error}
          </div>
        ) : null}

        {previewRows?.length ? (
          <div className="overflow-x-auto rounded-2xl border border-slate-700">
            <p className="border-b border-slate-700 bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-wide text-cyan-300">
              {enrichedDraft?.length ? 'AI önizlemesi — kaydetmeden önce kontrol edin' : 'Yerel önizleme'}
            </p>
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-700 bg-slate-900 text-slate-400">
                <tr>
                  <th className="px-3 py-2">Kelime</th>
                  <th className="px-3 py-2">Anlam (TR)</th>
                  <th className="px-3 py-2">Tür</th>
                  <th className="px-3 py-2">Seviye</th>
                  <th className="hidden px-3 py-2 lg:table-cell">Örnek cümle</th>
                  <th className="hidden px-3 py-2 md:table-cell">Domain</th>
                  <th className="px-3 py-2">Sınav</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {previewRows.map((w) => (
                  <tr key={`${w.id}-${w.word}`} className="hover:bg-slate-900/40">
                    <td className="px-3 py-2 font-medium">{w.word}</td>
                    <td className="max-w-[200px] px-3 py-2 text-slate-300">{w.meaning_tr || '—'}</td>
                    <td className="px-3 py-2">{w.part_of_speech}</td>
                    <td className="px-3 py-2">{w.level}</td>
                    <td className="hidden max-w-xs px-3 py-2 text-slate-400 lg:table-cell">
                      {(w.example_sentence || '—').slice(0, 120)}
                      {(w.example_sentence?.length ?? 0) > 120 ? '…' : ''}
                    </td>
                    <td className="hidden px-3 py-2 md:table-cell">{w.domain}</td>
                    <td className="px-3 py-2">{w.exam_tags}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <FilterSelect label="Tür" value={fPos} onChange={setFPos} options={['all', ...POS]} />
        <FilterSelect label="Seviye" value={fLevel} onChange={setFLevel} options={['all', ...LEVELS]} />
        <FilterSelect label="Sınav" value={fTag} onChange={setFTag} options={['all', ...TAGS]} />
        <FilterSelect label="Durum" value={fStatus} onChange={setFStatus} options={['all', ...STATUS]} />
        <FilterSelect label="Alan" value={fDomain} onChange={setFDomain} options={['all', ...DOMAIN]} />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">Kelime</th>
              <th className="px-3 py-2">Anlam</th>
              <th className="px-3 py-2">Tür</th>
              <th className="px-3 py-2">Seviye</th>
              <th className="px-3 py-2">Durum</th>
              <th className="px-3 py-2">Sınav</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                  Henüz kelime yok veya filtrelere uyan kayıt yok.
                </td>
              </tr>
            ) : (
              filtered.map((w) => (
                <tr key={w.id} className="hover:bg-slate-900/50">
                  <td className="px-3 py-2 font-medium">{w.word}</td>
                  <td className="max-w-xs px-3 py-2 text-slate-300">{w.meaning_tr}</td>
                  <td className="px-3 py-2 text-xs">{w.part_of_speech}</td>
                  <td className="px-3 py-2">{w.level}</td>
                  <td className="px-3 py-2">{w.status}</td>
                  <td className="px-3 py-2 text-xs">{w.exam_tags}</td>
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      className="text-xs text-red-400 hover:underline"
                      onClick={() => removeWord(w.id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FilterSelect(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-xs text-slate-400">
      {props.label}
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none"
      >
        {props.options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
