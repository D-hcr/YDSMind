import { NextResponse } from 'next/server';
import { createDeepSeek } from '@/lib/deepseek';
import { buildExamPrompt } from '@/lib/prompt/buildExamPrompt';
import { buildContextPrompt } from '@/lib/prompt/buildContextPrompt';
import { validateQuestion } from '@/lib/validateQuestion';
import { isDuplicateQuestion } from '@/lib/utils/similarity';
import { getPreferredAnswer, shuffleOptions } from '@/lib/utils/answerDistribution';
import type { ModuleType } from '@/lib/types';

export async function POST(req: Request) {
  const body = await req.json();
  const { module, examType, topicId, words, previousQuestions, recentAnswers } = body as {
    module: ModuleType;
    examType?: string;
    topicId?: string;
    words?: Array<{ english: string; turkish: string }>;
    previousQuestions?: string[];
    recentAnswers?: string[];
  };

  // Validate request
  if (!module || !['exam', 'context'].includes(module)) {
    return NextResponse.json({ error: 'module must be "exam" or "context".' }, { status: 400 });
  }

  if (module === 'exam' && (!examType || !topicId)) {
    return NextResponse.json({ error: 'examType and topicId are required for exam module.' }, { status: 400 });
  }

  if (module === 'context' && (!words || words.length === 0)) {
    return NextResponse.json({ error: 'words are required for context module.' }, { status: 400 });
  }

  try {
    let prompt: string;

    // Select prompt based on module
    if (module === 'exam') {
      prompt = buildExamPrompt({
        examType: examType as any,
        topicId: topicId as any,
        words,
        previousQuestions: previousQuestions ?? [],
      });
    } else {
      prompt = buildContextPrompt({ words: words! });
    }

    console.log('PROMPT SENT:', prompt.substring(0, 200) + '...');

    const deepseek = createDeepSeek();
    const response = await deepseek.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 1200,
    });

    const content = response.choices[0]?.message?.content ?? '';
    console.log('RAW AI RESPONSE:', content);

    // Extract JSON if wrapped in markdown block or find JSON object
    let cleanedContent = content.trim();
    
    // Try markdown code block first
    let jsonMatch = cleanedContent.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      cleanedContent = jsonMatch[1].trim();
      console.log('✓ JSON block extracted');
    } else {
      // Try to find JSON object directly
      const jsonStart = cleanedContent.indexOf('{');
      const jsonEnd = cleanedContent.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        cleanedContent = cleanedContent.substring(jsonStart, jsonEnd + 1);
        console.log('✓ JSON object extracted');
      }
    }

    // Parse JSON
    let parsed: any;
    try {
      parsed = JSON.parse(cleanedContent);
      console.log('✓ JSON parsed successfully');
    } catch (parseError) {
      console.error('✗ JSON Parse Error:', parseError);
      console.error('Content tried to parse:', cleanedContent.substring(0, 300));
      throw new Error(`Failed to parse AI response as JSON`);
    }

    // Validate question structure
    try {
      validateQuestion(parsed);
      console.log('✓ Question validated');
    } catch (validationError) {
      console.error('✗ Validation Error:', validationError);
      throw validationError;
    }

    // ============================================
    // DUPLICATE PREVENTION (Exam Module Only)
    // ============================================
    if (module === 'exam' && previousQuestions && previousQuestions.length > 0) {
      const isDuplicate = isDuplicateQuestion(parsed.question, previousQuestions, 0.8);
      if (isDuplicate) {
        console.warn('⚠️ Duplicate detected! Marking warning.');
        parsed._isDuplicate = true;
        parsed._warning = 'Question may be too similar to a previous one. AI may need regeneration.';
      } else {
        console.log('✓ Duplicate check passed - question is unique');
      }
    }

    // ============================================
    // ANSWER DISTRIBUTION BALANCING (Exam Module Only)
    // ============================================
    if (module === 'exam' && recentAnswers && recentAnswers.length > 0) {
      const typedAnswers = recentAnswers as Array<'A' | 'B' | 'C' | 'D' | 'E'>;
      const preferredAnswer = getPreferredAnswer(typedAnswers);
      if (preferredAnswer && preferredAnswer !== parsed.answer) {
        console.log(`📊 Answer distribution: Preferred ${preferredAnswer} instead of ${parsed.answer}`);
        const shuffled = shuffleOptions(parsed.options, parsed.answer);
        parsed.options = shuffled.newOptions;
        parsed.answer = shuffled.newAnswer;
        console.log(`✓ Options shuffled. New answer: ${parsed.answer}`);
      } else {
        console.log(`✓ Answer distribution OK. Answer stays: ${parsed.answer}`);
      }
    }

    return NextResponse.json({
      success: true,
      data: parsed,
    });
  } catch (error) {
    console.error('✗ API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
