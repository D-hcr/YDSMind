import { createDeepSeek } from '@/lib/deepseek';

const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);
/** İlk çağrı sonrası 1sn, 2sn, 4sn bekleme */
const BACKOFF_BEFORE_RETRY_MS = [1000, 2000, 4000];
const MAX_ATTEMPTS = 4;

export const AI_SERVICE_BUSY_MESSAGE =
  'AI servisi şu anda yoğun. Lütfen biraz sonra tekrar deneyin.';

export const AI_RESPONSE_INVALID_MESSAGE =
  'AI yanıtı beklenen formatta gelmedi. Lütfen tekrar deneyin.';

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function getHttpStatus(err: unknown): number | undefined {
  if (!err || typeof err !== 'object') return undefined;
  const s = (err as { status?: unknown }).status;
  if (typeof s === 'number' && Number.isFinite(s)) return s;
  return undefined;
}

function validateCompletionPayload(response: unknown): string {
  if (response == null || typeof response !== 'object') {
    throw new Error('AI sunucusu boş yanıt döndürdü.');
  }
  const r = response as { choices?: unknown };
  if (!Array.isArray(r.choices) || r.choices.length === 0) {
    throw new Error('AI yanıtında seçenek listesi bulunamadı (choices eksik veya boş).');
  }
  const msg = (r.choices[0] as { message?: { content?: unknown } | null } | undefined)?.message;
  if (!msg || typeof msg !== 'object') {
    throw new Error('AI yanıtında mesaj alanı eksik.');
  }
  const content = (msg as { content?: unknown }).content;
  if (content === null || content === undefined) {
    throw new Error('AI metin içeriği boş döndü (content null/undefined).');
  }
  const text = typeof content === 'string' ? content.trim() : String(content).trim();
  if (!text) {
    throw new Error('AI metin içeriği boştur.');
  }
  return text;
}

export async function createChatCompletion(params: {
  userPrompt: string;
  temperature?: number;
  max_tokens?: number;
}): Promise<string> {
  const deepseek = createDeepSeek();

  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    if (attempt > 0) {
      await sleep(BACKOFF_BEFORE_RETRY_MS[attempt - 1] ?? BACKOFF_BEFORE_RETRY_MS[BACKOFF_BEFORE_RETRY_MS.length - 1]);
    }
    try {
      const response = await deepseek.chat.completions.create({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: params.userPrompt }],
        temperature: params.temperature ?? 0.15,
        max_tokens: params.max_tokens ?? 1400,
      });
      return validateCompletionPayload(response);
    } catch (err) {
      lastError = err;
      const status = getHttpStatus(err);
      const canRetry = attempt < MAX_ATTEMPTS - 1 && status !== undefined && RETRYABLE_STATUSES.has(status);
      if (!canRetry) {
        break;
      }
    }
  }

  const status = getHttpStatus(lastError);
  if (status !== undefined && RETRYABLE_STATUSES.has(status)) {
    throw new Error(AI_SERVICE_BUSY_MESSAGE);
  }

  if (lastError instanceof Error) {
    throw new Error(lastError.message || AI_RESPONSE_INVALID_MESSAGE);
  }
  throw new Error(AI_RESPONSE_INVALID_MESSAGE);
}
