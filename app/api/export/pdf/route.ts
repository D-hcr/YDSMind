import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { buildExamPdfDocument, type PdfMode } from '@/lib/pdf/buildExamPdfDocument';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      mode,
      title = 'YDSMind',
      examType = 'YDS',
      category = 'Genel',
      date = new Date().toLocaleDateString('tr-TR'),
      questions = [],
      words = [],
    } = body as {
      mode: PdfMode;
      title?: string;
      examType?: string;
      category?: string;
      date?: string;
      questions?: Array<{
        id: string;
        stem: string;
        options: Record<string, string>;
        answer: string;
        explanation_tr?: string;
      }>;
      words?: Array<{ word: string; meaning_tr: string; level?: string }>;
    };

    if (!mode) return NextResponse.json({ error: 'mode gerekli.' }, { status: 400 });

    const doc = buildExamPdfDocument({
      title,
      examType,
      category,
      date,
      mode,
      questions,
      words,
    });

    const buf = await renderToBuffer(doc as any);

    return new NextResponse(buf as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ydsmind_${mode}.pdf"`,
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Bilinmeyen hata';
    console.error(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
