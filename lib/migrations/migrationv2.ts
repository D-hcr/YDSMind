/**
 * Data migration from old store format to new unified store format
 * Old: useWordStore (words + questions) + useQuestionStore (allQuestions)
 * New: useWordStore unified (words + allQuestions + UI state)
 */

export const migrateStorageV2 = () => {
  if (typeof localStorage === 'undefined') return;

  try {
    // Get old data
    const oldStorage = localStorage.getItem('ydsmind-storage');
    const oldQuestions = localStorage.getItem('ydsmind-questions');

    if (!oldStorage && !oldQuestions) {
      console.log('✓ No migration needed - fresh start');
      return;
    }

    const oldData = oldStorage ? JSON.parse(oldStorage) : {};
    const oldQData = oldQuestions ? JSON.parse(oldQuestions) : {};

    // Transform old questions format to new QuestionData format
    const transformedQuestions = oldData.questions
      ? oldData.questions.map((q: any, idx: number) => ({
          id: `q_${Date.now()}_${idx}`,
          module: 'exam' as const,
          examType: q.examType || 'YDS',
          topicId: q.topicId || 'kelime',
          question: q.question || '',
          options: q.options || { A: '', B: '', C: '', D: '', E: '' },
          answer: q.answer || 'A',
          explanation: q.explanation || '',
          isAnswered: false,
          createdAt: q.createdAt || new Date().toISOString(),
        }))
      : [];

    // Merge with questions from separate store
    const questionStoreQuestions = oldQData.allQuestions
      ? oldQData.allQuestions.map((q: any) => ({
          ...q,
          module: q.module || 'exam',
        }))
      : [];

    // Combine all questions (new format takes precedence)
    const allQuestions = [...questionStoreQuestions, ...transformedQuestions].slice(0, 500);

    // Build new unified storage structure
    const newStorage = {
      // Vocabulary
      words: oldData.words || [],
      // UI State
      selectedExam: oldData.selectedExam || 'YDS',
      selectedTopic: oldData.selectedTopic || 'kelime',
      // Questions - new format
      allQuestions,
      lastGeneratedQuestions: oldQData.lastGeneratedQuestions || [],
      recentAnswers: oldQData.recentAnswers || [],
    };

    // Save to localStorage under unified key
    localStorage.setItem('ydsmind-storage', JSON.stringify(newStorage));

    // Remove old keys to avoid conflicts
    localStorage.removeItem('ydsmind-questions');

    console.log('✅ Migration completed successfully');
    console.log(`Updated:`, {
      words: newStorage.words.length,
      questions: newStorage.allQuestions.length,
    });
  } catch (error) {
    console.error('❌ Migration error:', error);
    console.error(
      'Consider clearing localStorage and starting fresh: localStorage.clear()'
    );
  }
};
