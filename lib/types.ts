export type ExamType = 'YDS' | 'YÖKDİL';

export type QuestionTopic =
  | 'kelime'
  | 'gramer'
  | 'cloze'
  | 'cümle'
  | 'ingtr'
  | 'tring'
  | 'paragraf'
  | 'anlambozan'
  | 'okuma'
  | 'diyalog'
  | 'restatement';

export type ModuleType = 'exam' | 'context';

export type WordEntry = {
  id: string;
  english: string;
  turkish: string;
  sentence?: string;
  level: 'İyi' | 'Orta' | 'Bilmiyorum';
};

export type QuestionEntry = {
  id: string;
  examType: ExamType;
  topicId: QuestionTopic;
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
  createdAt: string;
};

export type GeneratedQuestion = {
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
};
