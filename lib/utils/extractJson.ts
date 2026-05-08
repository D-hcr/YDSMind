export function extractJsonObject(raw: string): string {
  let cleaned = raw.trim();
  const jsonBlock = cleaned.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonBlock) return jsonBlock[1].trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start !== -1 && end > start) return cleaned.slice(start, end + 1);
  return cleaned;
}

export function extractJsonArray(raw: string): string {
  let cleaned = raw.trim();
  const jsonBlock = cleaned.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonBlock) cleaned = jsonBlock[1].trim();
  const start = cleaned.indexOf('[');
  const end = cleaned.lastIndexOf(']');
  if (start !== -1 && end > start) return cleaned.slice(start, end + 1);
  return cleaned;
}
