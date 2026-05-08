export type ParsedImportRow = {
  word: string;
  meaning_tr: string;
  part_hint?: string;
  phrase?: string;
  example?: string;
};

/** Satır başına kelime VEYA tablo: Kelime | Anlam | Tür | Kalıp | Cümle */
export function parseBulkWordInput(raw: string): ParsedImportRow[] {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const out: ParsedImportRow[] = [];
  for (const line of lines) {
    const parts = line.split('|').map((p) => p.trim());
    if (parts.length >= 2) {
      out.push({
        word: parts[0],
        meaning_tr: parts[1],
        part_hint: parts[2],
        phrase: parts[3],
        example: parts[4],
      });
    } else {
      out.push({ word: parts[0], meaning_tr: '' });
    }
  }
  return out;
}
