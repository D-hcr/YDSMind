import { ExamType, QuestionTopic } from "@/lib/types";
import { examTopics } from "@/lib/constants";
import { topicInstructions } from "./topicInstructions";

export const buildExamPrompt = (params: {
  examType: ExamType;
  topicId: QuestionTopic;
  words?: Array<{ english: string; turkish: string }>;
  previousQuestions?: string[];
}) => {
  const { examType, topicId, words = [], previousQuestions = [] } = params;

  const topic = examTopics[examType].find((t) => t.id === topicId);
  const instructions = topicInstructions[topicId];

  const wordPool =
    words.length > 0
      ? words.map((w) => `${w.english} (${w.turkish})`).join(", ")
      : "User may not have provided vocabulary.";

  return `You are an OSYM (Turkish exam) English question writer.

📋 EXAM: ${examType} | CATEGORY: ${topic?.label} (${topic?.range})

⚠️ RULES:
1. Write ONE ORIGINAL question (NOT similar to previous)
2. Options A-E: distinct, realistic, 1-2 lines each
3. Natural English, proper difficulty
4. Random answer position (not always A)
5. Turkish explanation

❌ BANNED: Copying, forcing user words, archaic terms, trivial content

✅ FORMAT (by category):
${instructions}

📚 WORD POOL (use if fitting):
${wordPool}

⏮️ AVOID (recent questions):
${previousQuestions.slice(-3).map((q, i) => `${i + 1}. ${q.substring(0, 80)}...`).join('\n') || 'None'}

OUTPUT (JSON ONLY - no markdown):
{
  "question": "Question with blank _____ if needed",
  "options": {"A": "option", "B": "option", "C": "option", "D": "option", "E": "option"},
  "answer": "A-E",
  "explanation": "Turkish explanation (brief)"
}`.trim();
};
