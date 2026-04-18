import { NextResponse } from 'next/server';
import { createDeepSeek } from '../../../lib/deepseek';
import { buildGenerationPrompt } from '../../../lib/prompt';

export async function POST(req: Request) {
  const body = await req.json();
  const { examType, topicId, words } = body;

  if (!examType || !topicId) {
    return NextResponse.json({ error: 'examType and topicId are required.' }, { status: 400 });
  }

  try {
    const prompt = buildGenerationPrompt({ examType, topicId, words });
    const deepseek = createDeepSeek();
    const response = await deepseek.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.0,
      max_tokens: 400,
    });

    const content = response.choices[0]?.message?.content ?? '';
    console.log('RAW AI RESPONSE:', content);
    console.log('RESPONSE OBJECT:', JSON.stringify(response, null, 2));

    // JSON olup olmadığını kontrol et
    let cleanedContent = content.trim();
    
    // JSON blok varsa (```json ... ``` içinde) çıkar
    const jsonMatch = cleanedContent.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      cleanedContent = jsonMatch[1];
      console.log('JSON block detected and extracted');
    }

    return NextResponse.json({ raw: cleanedContent });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'AI servisine bağlanırken hata oluştu.' }, { status: 500 });
  }
}
