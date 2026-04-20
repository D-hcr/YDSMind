import { ExamType, QuestionTopic } from './types';

export const examTopics: Record<ExamType, Array<{ id: QuestionTopic; label: string; range: string }>> = {
  YDS: [
    { id: 'kelime', label: 'Kelime', range: '1-6' },
    { id: 'gramer', label: 'Gramer', range: '7-16' },
    { id: 'cloze', label: 'Cloze', range: '17-26' },
    { id: 'cümle', label: 'Cümle Tamamlama', range: '27-36' },
    { id: 'ingtr', label: 'İng - TR', range: '37-39' },
    { id: 'tring', label: 'TR - İng', range: '40-42' },
    { id: 'okuma', label: 'Okuma', range: '43-62' },
    { id: 'diyalog', label: 'Diyalog', range: '63-67' },
    { id: 'restatement', label: 'Restatement', range: '68-71' },
    { id: 'paragraf', label: 'Paragraf', range: '72-75' },
    { id: 'anlambozan', label: 'Anlam Bozan', range: '76-80' },
  ],
  YÖKDİL: [
    { id: 'kelime', label: 'Kelime', range: '1-6' },
    { id: 'gramer', label: 'Gramer', range: '7-20' },
    { id: 'cloze', label: 'Cloze Test', range: '21-30' },
    { id: 'cümle', label: 'Cümle Tamamlama', range: '31-41' },
    { id: 'ingtr', label: 'İng - TR', range: '42-47' },
    { id: 'tring', label: 'TR - İng', range: '48-53' },
    { id: 'paragraf', label: 'Paragraf Tamamlama', range: '54-59' },
    { id: 'anlambozan', label: 'Anlam Bozan', range: '60-65' },
    { id: 'okuma', label: 'Okuma', range: '66-80' },
  ],
};
