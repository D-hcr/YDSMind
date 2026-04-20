import { QuestionTopic } from "@/lib/types";

export const topicInstructions: Record<QuestionTopic, string> = {
  kelime: `**VOCABULARY (Kelime)** - OSYM YDS/YÖKDİL Standards
Single sentence with ONE blank (____). Student must select correct word from 5 options.
- 15+ words for context
- Blank is typically a noun, verb, or adjective
- Context clues subtle but present
- Distractors: words with similar meaning, same part of speech, or common confusion pairs
Example: "The _____ of the ancient civilization remains a subject of academic debate."
Answer options might: fascinating, discover, tradition, mystery, artifact`,

  gramer: `**GRAMMAR (Gramer)** - OSYM YDS/YÖKDİL Standards
Complete sentence with ONE blank testing specific grammar structure.
- Tests: verb tenses, articles, prepositions, subject-verb agreement, clause relationships
- Blank usually in middle of sentence (word or phrase)
- Context clearly indicates grammar rule needed
- Distractors: commonly confused forms of same grammar point
Example: "She _____ to the store every day since she _____ moved here."
(Tests: present simple vs present perfect)`,

  cloze: `**CLOZE TEST (Cloze)** - OSYM YDS/YÖKDİL Standards
Short paragraph (3-4 sentences) with MULTIPLE blanks (typically 3-5 blanks).
- Each blank tests different word type: nouns, verbs, adjectives, adverbs, prepositions
- Blanks numbered separately, each has its own A-E options
- Test reading comprehension + vocabulary in context
- Passage should be coherent mini-story or information
Format: Show passage with blank numbers, then provide options for each blank`,

  cümle: `**SENTENCE COMPLETION (Cümle Tamamlama)** - OSYM YDS/YÖKDİL Standards
Incomplete sentence that must be completed logically.
- Tests: word relationships, logical sequencing, stylistic appropriateness
- Options are complete phrases or clauses (not single words usually)
- Sentence logic matters - right answer "sounds" natural
Example: "The director decided to cancel the event because..."
Options: A) she wanted to attend. B) the budget was insufficient. C) the weather was perfect.`,

  ingtr: `**ENGLISH-TO-TURKISH TRANSLATION (İng-TR)** - OSYM YDS/YÖKDİL Standards
Short English sentence/phrase must be matched to best Turkish equivalent.
- Tests: idioms, cultural concepts, meaning rather than literal translation
- 5 Turkish options, ONE correct translation
- May test idiomatic expressions
Example: "Break the ice" - must find Turkish idiom equivalent (buzları kırmak)`,

  tring: `**TURKISH-TO-ENGLISH TRANSLATION (TR-İng)** - OSYM YDS/YÖKDİL Standards
Short Turkish sentence/phrase must be matched to best English equivalent.
- Tests: understanding of Turkish concepts in English
- 5 English options, ONE correct translation
- May test Turkish idioms/cultural concepts
Example: "Kaykay yapmak" - must find English equivalent (skateboarding)`,

  paragraf: `**PARAGRAPH COMPLETION (Paragraf Tamamlama)** - OSYM YDS/YÖKDİL Standards
4-5 sentence paragraph with ONE sentence missing (usually position 3 or 4).
- Tests: logical flow, cohesion, main idea understanding
- Options are complete sentences that fit thematically
- Reader must understand paragraph topic to complete correctly
Main paragraph + 5 sentence options where only ONE fits logically`,

  okuma: `**READING COMPREHENSION (Okuma)** - OSYM YDS/YÖKDİL Standards
Passage (150-200 words) followed by 1-2 comprehension questions.
- Tests: main idea, specific details, inference, author's purpose
- Questions might ask: "What is main point?" "Why did...?" "What can be inferred?"
- Single correct answer from 5 options
Create short passage + clear comprehension question with plausible distractors`,

  diyalog: `**DIALOGUE (Diyalog)** - OSYM YDS/YÖKDİL Standards
2-speaker conversation (6-10 lines) with ONE line missing.
- Missing line is from Speaker B (natural conversation flow)
- Options are complete dialogue lines that fit logically
- Test: contextual understanding, natural response
Format conversation then provide missing line options.`,

  restatement: `**RESTATEMENT / PARAPHRASING (Restatement)** - OSYM YDS/YÖKDİL Standards
Sentence is given, student must find best paraphrase from 5 options.
- Tests: vocabulary flexibility, understanding meaning vs. literal words
- Correct answer conveys same meaning, different structure/vocabulary
- Distractors: similar keywords but different meaning, or partial meaning
Example: "She rarely attends parties." 
Options: A) She doesn't like being social. B) She seldom goes to social events. C) Parties make her nervous.`,

  anlambozan: `**SENTENCE ANOMALY (Anlam Bozan)** - OSYM YDS/YÖKDİL Standards
Paragraph (4-5 sentences) where ONE sentence doesn't fit the topic/flow.
- Tests: understanding cohesion, recognizing off-topic or contradictory statements
- Student must identify which sentence is "anlam bozan" (meaning-breaking)
- Sentences are numbered A, B, C, D, E
- 4 sentences cohere, 1 breaks the logical flow
Format: 5-sentence paragraph, ask "Which sentence does NOT fit?" or "Which is anomalous?"`,
};
