/** Tüm builder’larda ortak kurallar */
export const STRICT_JSON_RULES = `
KURALLAR (ZORUNLU):
- Akademik İngilizce kullan; tamamen özgün ve teliften arındırılmış metin yaz.
- 5 seçenek (A-E) üret; tek doğru cevap olsun.
- Yanlış şıklar inandırıcı çeldirici olsun (cümle uyumu, bağlam).
- ÖSYM/YDS/YÖKDİL mantığını taklit et; gerçek soru veya paragraf KOPYALAMA.
- Yanıtın SADECE geçerli JSON olsun; açıklama, markdown veya metin eklemeyin.
- Turkish explanation alanı: Türkçe kısa çözüm/analiz.
- Doğru cevabın şıklarda dengeli dağılması için rastgele doğru pozisyon seç.
`.trim();

export function formatPreviousStems(stems: string[]) {
  if (!stems.length) return 'Yok';
  return stems
    .slice(-12)
    .map((s, i) => `${i + 1}. ${s.slice(0, 160)}`)
    .join('\n');
}
