# YDSMind

YDSMind, YDS ve YÖKDİL sınavlarına hazırlık için React + Next.js tabanlı bir öğrenme platformudur. Sistem, AI destekli soru üretimine izin verirken kullanıcının eklediği kelimelere ve gerçek sınav tarzına sıkı şekilde bağlı kalır.

## Teknolojiler

- Frontend: React + TypeScript
- Styling: Tailwind CSS
- State: Zustand
- Backend: Next.js API Routes
- AI: DeepSeek API

## Özellikler

- Kelime Ezberleme (Flashcard)
- Sınav Simülasyonu (YDS / YÖKDİL dağılımlarına göre)
- Bağlam İçinde Öğrenme

## Çalıştırma

1. `npm install`
2. `cp .env.example .env`
3. `.env` dosyasına `DEEPSEEK_API_KEY` ekle
4. `npm run dev`

## DeepSeek API

`app/api/generate/route.ts` AI üretimini yönetir. Çıktılar JSON formatında döndürülür.

### AI Bağlantısı

- `DEEPSEEK_API_KEY` ortam değişkeni kullanılır.
- Model olarak `deepseek-chat` kullanılır.
- Promptlar YDS/YÖKDİL sınav formatına sıkı şekilde bağlıdır.

## Veri Saklama

- Kullanıcının eklediği kelimeler yerel tarayıcıda saklanır.
- Üretilen sorular da kayıt altına alınır ve yeniden yüklendiğinde korunur.
- Bu sayede kelimeler ve sorular sayfa yenilendiğinde sıfırlanmaz.

## Notlar

- AI yalnızca kullanıcı kelimelerine ve YDS/YÖKDİL akademik kelimelerine dayanmalıdır.
- Tüm sorular 5 şıklı olmalıdır.
- Sorular sınavın stiline uygun olarak hazırlanmalıdır.
