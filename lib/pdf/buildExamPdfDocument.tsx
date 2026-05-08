import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica' },
  h1: { fontSize: 15, marginBottom: 8 },
  meta: { fontSize: 9, marginBottom: 14, color: '#444' },
  stem: { marginBottom: 6, lineHeight: 1.4 },
  opt: { marginLeft: 8, marginBottom: 2 },
  block: { marginBottom: 12 },
});

export type PdfMode =
  | 'questions_only'
  | 'answer_key'
  | 'solutions'
  | 'word_list';

export function buildExamPdfDocument(opts: {
  title: string;
  examType: string;
  category: string;
  date: string;
  mode: PdfMode;
  questions: Array<{
    id: string;
    stem: string;
    options: Record<string, string>;
    answer: string;
    explanation_tr?: string;
  }>;
  words?: Array<{ word: string; meaning_tr: string; level?: string }>;
}) {
  const showAnswers = opts.mode === 'answer_key' || opts.mode === 'solutions';
  const showExpl = opts.mode === 'solutions';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>{opts.title}</Text>
        <Text style={styles.meta}>
          {opts.examType} • {opts.category} • {opts.date}
        </Text>
        {opts.mode === 'word_list' ? (
          <View>
            {(opts.words ?? []).map((w, i) => (
              <Text key={i} style={styles.stem}>
                {i + 1}. {w.word} — {w.meaning_tr} {w.level ? `(${w.level})` : ''}
              </Text>
            ))}
          </View>
        ) : (
          opts.questions.map((q, idx) => (
            <View key={q.id} style={styles.block} wrap={false}>
              <Text style={{ fontWeight: 700, marginBottom: 4 }}>Soru {idx + 1}</Text>
              <Text style={styles.stem}>{q.stem}</Text>
              {(['A', 'B', 'C', 'D', 'E'] as const).map((L) => (
                <Text key={L} style={styles.opt}>
                  {L}) {q.options[L]}
                </Text>
              ))}
              {showAnswers ? (
                <Text style={{ marginTop: 6 }}>Doğru şık: {q.answer}</Text>
              ) : null}
              {showExpl && q.explanation_tr ? (
                <Text style={{ marginTop: 4 }}>Çözüm: {q.explanation_tr}</Text>
              ) : null}
            </View>
          ))
        )}
      </Page>
    </Document>
  );
}
