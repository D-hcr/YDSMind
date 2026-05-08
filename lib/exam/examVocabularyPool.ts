
/**
 * Sınav Akademik Kelime Havuzu — YDS/YÖKDİL üslup ve seçenek seviyesi için referans; ÖSYM sınav metni içermez.
 * Üretici: scripts/emit-exam-vocabulary-pool.cjs
 */

export type ExamVocabularyItem = {
  word: string;
  meaning_tr: string;
  part_of_speech:
    | "noun"
    | "verb"
    | "adjective"
    | "adverb"
    | "phrase"
    | "phrasal_verb"
    | "conjunction"
    | "preposition"
    | "transition";
  level: "B1" | "B2" | "C1" | "C2";
  domain:
    | "general"
    | "science"
    | "health"
    | "social"
    | "research"
    | "environment"
    | "technology"
    | "medicine"
    | "engineering"
    | "biology"
    | "physics"
    | "chemistry"
    | "academic";
  exam_tags: Array<"YDS" | "YOKDIL" | "BOTH">;
  groups: Array<
    | "yds_general"
    | "yokdil_science"
    | "connectors"
    | "academic_verbs"
    | "academic_nouns"
    | "academic_adjectives"
    | "academic_adverbs"
    | "phrasal_verbs"
    | "cause_effect"
    | "contrast"
    | "research"
    | "reading"
    | "cloze"
  >;
  synonyms?: string[];
  antonyms?: string[];
  collocations?: string[];
  example_sentence?: string;
};

export const examVocabularyPool: ExamVocabularyItem[] = [
  {
    "word": "absorb",
    "meaning_tr": "absorb: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "accelerate",
    "meaning_tr": "accelerate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "accurate",
    "meaning_tr": "accurate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "acquisition",
    "meaning_tr": "acquisition: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "acute",
    "meaning_tr": "acute: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "adapt",
    "meaning_tr": "adapt: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "adiabatic",
    "meaning_tr": "adiyabatik",
    "part_of_speech": "adjective",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "administer",
    "meaning_tr": "administer: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "affect",
    "meaning_tr": "affect: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "algorithm",
    "meaning_tr": "algorithm: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "technology",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "although",
    "meaning_tr": "although: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "contrast",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "analogue",
    "meaning_tr": "benzer / analoğ",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "analysis",
    "meaning_tr": "analysis: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "apoptosis",
    "meaning_tr": "apoptoz / programlı hücre ölümü",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "apparently",
    "meaning_tr": "apparently: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "aqueous",
    "meaning_tr": "sulu",
    "part_of_speech": "adjective",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "aquifer",
    "meaning_tr": "yeraltı suyu tabakası",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "environment",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "arbitrary",
    "meaning_tr": "keyfi",
    "part_of_speech": "adjective",
    "level": "C2",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "as a result",
    "meaning_tr": "as a result: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "cause_effect",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "as long as",
    "meaning_tr": "as long as: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "assess",
    "meaning_tr": "assess: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "assume",
    "meaning_tr": "assume: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "automation",
    "meaning_tr": "automation: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "technology",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "available",
    "meaning_tr": "available: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "because",
    "meaning_tr": "because: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "conjunction",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "cause_effect",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "biodiversity",
    "meaning_tr": "biodiversity: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "environment",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "buffer",
    "meaning_tr": "tampon çözeltisi",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "capacity",
    "meaning_tr": "capacity: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "carry out",
    "meaning_tr": "carry out: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "phrasal_verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "phrasal_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "catalyst",
    "meaning_tr": "catalyst: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "cause",
    "meaning_tr": "cause: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "cause_effect",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "cellular",
    "meaning_tr": "cellular: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "chromatography",
    "meaning_tr": "kromatografi",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "chronic",
    "meaning_tr": "chronic: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "classify",
    "meaning_tr": "classify: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "collide",
    "meaning_tr": "collide: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "combine",
    "meaning_tr": "combine: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "commonly",
    "meaning_tr": "commonly: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "comparable",
    "meaning_tr": "comparable: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "compare",
    "meaning_tr": "compare: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "complex",
    "meaning_tr": "complex: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "compound",
    "meaning_tr": "compound: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "concentrated",
    "meaning_tr": "concentrated: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "conductivity",
    "meaning_tr": "iletkenlik",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "confirm",
    "meaning_tr": "confirm: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "consequence",
    "meaning_tr": "consequence: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "cause_effect",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "consequently",
    "meaning_tr": "consequently: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "cause_effect",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "conservation",
    "meaning_tr": "conservation: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "consider",
    "meaning_tr": "consider: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "consistent",
    "meaning_tr": "consistent: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "constitute",
    "meaning_tr": "constitute: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "constraint",
    "meaning_tr": "constraint: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "contamination",
    "meaning_tr": "contamination: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "continuous",
    "meaning_tr": "sürekli",
    "part_of_speech": "adjective",
    "level": "C2",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "contribute",
    "meaning_tr": "contribute: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "conventional",
    "meaning_tr": "conventional: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "correlation",
    "meaning_tr": "correlation: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "crucial",
    "meaning_tr": "crucial: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "currently",
    "meaning_tr": "currently: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "cytoplasm",
    "meaning_tr": "sitoplazma",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "dataset",
    "meaning_tr": "dataset: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "degradation",
    "meaning_tr": "degradation: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "environment",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "demonstrate",
    "meaning_tr": "demonstrate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "density",
    "meaning_tr": "density: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "deplete",
    "meaning_tr": "deplete: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "deploy",
    "meaning_tr": "deploy: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "technology",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "derive",
    "meaning_tr": "derive: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "despite",
    "meaning_tr": "despite: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "contrast",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "destruction",
    "meaning_tr": "destruction: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "detect",
    "meaning_tr": "detect: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "deteriorate",
    "meaning_tr": "deteriorate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "determine",
    "meaning_tr": "determine: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "device",
    "meaning_tr": "device: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "technology",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "diagnosis",
    "meaning_tr": "diagnosis: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "diffusion",
    "meaning_tr": "yayılım / difüzyon",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "dilute",
    "meaning_tr": "dilute: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "discrete",
    "meaning_tr": "ayrık",
    "part_of_speech": "adjective",
    "level": "C2",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "disorder",
    "meaning_tr": "disorder: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "disparity",
    "meaning_tr": "disparity: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "do away with",
    "meaning_tr": "do away with: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "phrasal_verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "phrasal_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "dramatically",
    "meaning_tr": "dramatically: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "durable",
    "meaning_tr": "durable: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "ecosystem",
    "meaning_tr": "ecosystem: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "environment",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "effect",
    "meaning_tr": "effect: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "cause_effect",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "efficiency",
    "meaning_tr": "efficiency: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "elaboration",
    "meaning_tr": "elaboration: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "electron",
    "meaning_tr": "elektron",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "elimination",
    "meaning_tr": "elimination: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "emission",
    "meaning_tr": "emission: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "environment",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "empirical",
    "meaning_tr": "deneye / gözleme dayalı",
    "part_of_speech": "adjective",
    "level": "C2",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "encourage",
    "meaning_tr": "encourage: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "enhance",
    "meaning_tr": "enhance: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "enthalpy",
    "meaning_tr": "entalpi",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "entropy",
    "meaning_tr": "entropi",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "enzyme",
    "meaning_tr": "enzim",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "equilibrium",
    "meaning_tr": "denge",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "erode",
    "meaning_tr": "erode: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "essential",
    "meaning_tr": "essential: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "estimate",
    "meaning_tr": "estimate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "evaluate",
    "meaning_tr": "evaluate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "evaporate",
    "meaning_tr": "evaporate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "eventually",
    "meaning_tr": "eventually: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "evidence",
    "meaning_tr": "evidence: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "examine",
    "meaning_tr": "examine: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "exposure",
    "meaning_tr": "exposure: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "factor",
    "meaning_tr": "factor: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "filtration",
    "meaning_tr": "süzme / filtreleme",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "finding",
    "meaning_tr": "finding: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "finite",
    "meaning_tr": "sonlu",
    "part_of_speech": "adjective",
    "level": "C2",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "fragile",
    "meaning_tr": "fragile: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "frequently",
    "meaning_tr": "frequently: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "furthermore",
    "meaning_tr": "furthermore: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "generate",
    "meaning_tr": "generate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "genetic",
    "meaning_tr": "genetic: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "genome",
    "meaning_tr": "genom",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "genotype",
    "meaning_tr": "genotip",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "gradually",
    "meaning_tr": "gradually: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "gravity",
    "meaning_tr": "gravity: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "hand down",
    "meaning_tr": "hand down: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "highlight",
    "meaning_tr": "highlight: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "homeostasis",
    "meaning_tr": "homeostazi",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "homology",
    "meaning_tr": "homoloji",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "however",
    "meaning_tr": "however: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "contrast",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "hypothesis",
    "meaning_tr": "hypothesis: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "identify",
    "meaning_tr": "identify: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "immune",
    "meaning_tr": "immune: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "immunity",
    "meaning_tr": "immunity: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "impact",
    "meaning_tr": "impact: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "cause_effect",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "in contrast",
    "meaning_tr": "in contrast: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "in order to",
    "meaning_tr": "in order to: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "in spite of",
    "meaning_tr": "in spite of: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "inaccurate",
    "meaning_tr": "inaccurate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "incentive",
    "meaning_tr": "incentive: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "inconsistent",
    "meaning_tr": "inconsistent: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "increasingly",
    "meaning_tr": "increasingly: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "indicate",
    "meaning_tr": "indicate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "induce",
    "meaning_tr": "induce: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "infection",
    "meaning_tr": "infection: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "influence",
    "meaning_tr": "influence: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "infrastructure",
    "meaning_tr": "infrastructure: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "technology",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "initially",
    "meaning_tr": "initially: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "innovation",
    "meaning_tr": "innovation: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "technology",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "insufficient",
    "meaning_tr": "insufficient: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "integrate",
    "meaning_tr": "integrate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "interface",
    "meaning_tr": "interface: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "interpretation",
    "meaning_tr": "interpretation: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "investigate",
    "meaning_tr": "investigate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "involve",
    "meaning_tr": "involve: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "isotope",
    "meaning_tr": "izotop",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "justification",
    "meaning_tr": "justification: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "keep off",
    "meaning_tr": "keep off: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "phrasal_verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "phrasal_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "largely",
    "meaning_tr": "largely: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "lead to",
    "meaning_tr": "lead to: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "phrasal_verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "phrasal_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "lipid",
    "meaning_tr": "lipid",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "logarithmic",
    "meaning_tr": "logaritmik",
    "part_of_speech": "adjective",
    "level": "C2",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "magnetic",
    "meaning_tr": "magnetic: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "mainly",
    "meaning_tr": "mainly: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "maintain",
    "meaning_tr": "maintain: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "major",
    "meaning_tr": "major: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "make up for",
    "meaning_tr": "make up for: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "phrasal_verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "phrasal_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "mandatory",
    "meaning_tr": "mandatory: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "manufacture",
    "meaning_tr": "manufacture: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "measure",
    "meaning_tr": "measure: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "mechanism",
    "meaning_tr": "mechanism: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "meiosis",
    "meaning_tr": "mayoz bölünmesi",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "metabolism",
    "meaning_tr": "metabolism: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "methodology",
    "meaning_tr": "methodology: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "minor",
    "meaning_tr": "minor: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "mirror",
    "meaning_tr": "ayna (optik)",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "mitigate",
    "meaning_tr": "mitigate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "mitosis",
    "meaning_tr": "mitoz bölünmesi",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "molecule",
    "meaning_tr": "molecule: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "monitor",
    "meaning_tr": "monitor: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "monomer",
    "meaning_tr": "monomer",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "moreover",
    "meaning_tr": "moreover: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "mutation",
    "meaning_tr": "mutation: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "nanoparticle",
    "meaning_tr": "nanoparçacık",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "necessary",
    "meaning_tr": "necessary: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "network",
    "meaning_tr": "network: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "technology",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "neutron",
    "meaning_tr": "nötron",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "nevertheless",
    "meaning_tr": "nevertheless: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "contrast",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "novel",
    "meaning_tr": "novel: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "obligation",
    "meaning_tr": "obligation: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "observation",
    "meaning_tr": "observation: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "obtain",
    "meaning_tr": "obtain: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "occur",
    "meaning_tr": "occur: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "on the other hand",
    "meaning_tr": "on the other hand: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "operate",
    "meaning_tr": "operate: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "optimise",
    "meaning_tr": "optimise: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "orbit",
    "meaning_tr": "orbit: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "orbital",
    "meaning_tr": "yörünge (orbital)",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "organism",
    "meaning_tr": "organism: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "osmosis",
    "meaning_tr": "ozmoz",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "otherwise",
    "meaning_tr": "otherwise: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "outcome",
    "meaning_tr": "outcome: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "parameter",
    "meaning_tr": "parameter: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "particle",
    "meaning_tr": "particle: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "pathogen",
    "meaning_tr": "pathogen: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "peer-reviewed",
    "meaning_tr": "peer-reviewed: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "persist",
    "meaning_tr": "persist: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "phase out",
    "meaning_tr": "phase out: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "phrasal_verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "phrasal_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "phenotype",
    "meaning_tr": "fenotip",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "plausible",
    "meaning_tr": "plausible: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "pollutant",
    "meaning_tr": "pollutant: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "environment",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "polymer",
    "meaning_tr": "polimer",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "portable",
    "meaning_tr": "portable: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "potentially",
    "meaning_tr": "potentially: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "precaution",
    "meaning_tr": "precaution: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "precise",
    "meaning_tr": "precise: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "precisely",
    "meaning_tr": "precisely: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "preliminary",
    "meaning_tr": "preliminary: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "prevalence",
    "meaning_tr": "prevalence: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "prevent",
    "meaning_tr": "prevent: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "previously",
    "meaning_tr": "previously: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "primarily",
    "meaning_tr": "primarily: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "priority",
    "meaning_tr": "priority: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "prism",
    "meaning_tr": "prizma",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "promote",
    "meaning_tr": "promote: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "protocol",
    "meaning_tr": "protocol: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "proton",
    "meaning_tr": "proton",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "prototype",
    "meaning_tr": "prototype: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "technology",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "provide",
    "meaning_tr": "provide: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "provided that",
    "meaning_tr": "provided that: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "provision",
    "meaning_tr": "provision: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "pull down",
    "meaning_tr": "pull down: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "phrasal_verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "phrasal_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "radiation",
    "meaning_tr": "radiation: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "rarely",
    "meaning_tr": "rarely: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "reagent",
    "meaning_tr": "reaktif",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "reduce",
    "meaning_tr": "reduce: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "reflect",
    "meaning_tr": "reflect: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "relatively",
    "meaning_tr": "relatively: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "relevant",
    "meaning_tr": "relevant: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "reliability",
    "meaning_tr": "reliability: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "reluctant",
    "meaning_tr": "reluctant: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "remotely",
    "meaning_tr": "remotely: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "renewable",
    "meaning_tr": "renewable: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "replication",
    "meaning_tr": "replication: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "require",
    "meaning_tr": "require: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "resilient",
    "meaning_tr": "resilient: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "restore",
    "meaning_tr": "restore: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "result",
    "meaning_tr": "result: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "cause_effect",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "retain",
    "meaning_tr": "retain: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "reveal",
    "meaning_tr": "reveal: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "ribosome",
    "meaning_tr": "ribozom",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "robust",
    "meaning_tr": "robust: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "rule out",
    "meaning_tr": "rule out: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "phrasal_verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "phrasal_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "sample",
    "meaning_tr": "sample: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "scarce",
    "meaning_tr": "scarce: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "sediment",
    "meaning_tr": "sediman",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "environment",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "seismic",
    "meaning_tr": "sismik",
    "part_of_speech": "adjective",
    "level": "C2",
    "domain": "environment",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "sensor",
    "meaning_tr": "sensor: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "technology",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "significant",
    "meaning_tr": "significant: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "significantly",
    "meaning_tr": "significantly: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "simulation",
    "meaning_tr": "simulation: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "since",
    "meaning_tr": "since: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "conjunction",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "slightly",
    "meaning_tr": "slightly: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "so that",
    "meaning_tr": "so that: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "spectral",
    "meaning_tr": "spektral",
    "part_of_speech": "adjective",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "spectrometer",
    "meaning_tr": "spektrometre",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "spectroscopy",
    "meaning_tr": "spektroskopi",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "stable",
    "meaning_tr": "stable: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "stamp out",
    "meaning_tr": "stamp out: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "phrasal_verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "phrasal_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "stratigraphy",
    "meaning_tr": "stratejigrafi",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "subsequently",
    "meaning_tr": "subsequently: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "substantial",
    "meaning_tr": "substantial: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "substantially",
    "meaning_tr": "substantially: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "substitution",
    "meaning_tr": "substitution: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "substrate",
    "meaning_tr": "substrat",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "sufficient",
    "meaning_tr": "sufficient: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "suggest",
    "meaning_tr": "suggest: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "survey",
    "meaning_tr": "survey: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "susceptible",
    "meaning_tr": "susceptible: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "sustain",
    "meaning_tr": "sustain: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "sustainability",
    "meaning_tr": "sustainability: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "symptom",
    "meaning_tr": "symptom: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "take up",
    "meaning_tr": "take up: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "phrasal_verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "phrasal_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "therapy",
    "meaning_tr": "therapy: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "thereby",
    "meaning_tr": "thereby: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "therefore",
    "meaning_tr": "therefore: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "cause_effect",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "thermal",
    "meaning_tr": "thermal: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "threaten",
    "meaning_tr": "threaten: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "thus",
    "meaning_tr": "thus: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "tissue",
    "meaning_tr": "tissue: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "titration",
    "meaning_tr": "titasyon",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "torque",
    "meaning_tr": "burulma momenti",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "transcriptome",
    "meaning_tr": "transkriptom",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "biology",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "transmit",
    "meaning_tr": "transmit: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "trigger",
    "meaning_tr": "trigger: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "typically",
    "meaning_tr": "typically: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "underlying",
    "meaning_tr": "altta yatan",
    "part_of_speech": "adjective",
    "level": "C2",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "unless",
    "meaning_tr": "unless: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "utilize",
    "meaning_tr": "utilize: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "valence",
    "meaning_tr": "değerlik / valans",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "chemistry",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "validity",
    "meaning_tr": "validity: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "research",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "research",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "variable",
    "meaning_tr": "variable: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "velocity",
    "meaning_tr": "velocity: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "verify",
    "meaning_tr": "verify: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "viscosity",
    "meaning_tr": "visekozite / akışkanlık",
    "part_of_speech": "noun",
    "level": "C2",
    "domain": "physics",
    "exam_tags": [
      "YOKDIL"
    ],
    "groups": [
      "yds_general",
      "yokdil_science",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "volatile",
    "meaning_tr": "volatile: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "vulnerable",
    "meaning_tr": "vulnerable: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adjective",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adjectives",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "ward off",
    "meaning_tr": "ward off: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "phrasal_verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "phrasal_verbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "wavelength",
    "meaning_tr": "wavelength: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "noun",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_nouns",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "whereas",
    "meaning_tr": "whereas: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C2",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "contrast",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "while",
    "meaning_tr": "while: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "transition",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "connectors",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "widely",
    "meaning_tr": "widely: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "adverb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_adverbs",
      "reading",
      "cloze"
    ]
  },
  {
    "word": "wipe off",
    "meaning_tr": "wipe off: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir",
    "part_of_speech": "phrasal_verb",
    "level": "C1",
    "domain": "academic",
    "exam_tags": [
      "BOTH"
    ],
    "groups": [
      "yds_general",
      "academic_verbs",
      "phrasal_verbs",
      "reading",
      "cloze"
    ]
  }
];
