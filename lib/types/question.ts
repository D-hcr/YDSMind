/** Question Types with tracking for answer reveal & user interaction */
export type QuestionModule = 'exam' | 'context' | 'flashcard';

export type QuestionData = {
  id: string;
  module: QuestionModule;
  examType: 'YDS' | 'YÖKDİL';
  topicId: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  answer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  targetWord?: string;
  createdAt: string;
  // User interaction tracking
  userSelectedAnswer?: 'A' | 'B' | 'C' | 'D' | 'E';
  isAnswered: boolean;
  isCorrect?: boolean;
};

export type DuplicateCheckResult = {
  isDuplicate: boolean;
  similarity: number;
  matchedQuestionId?: string;
};
