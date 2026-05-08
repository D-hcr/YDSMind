'use strict';

/**
 * Emits lib/exam/examVocabularyPool.ts
 * Run: node scripts/emit-exam-vocabulary-pool.mjs
 */

const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '../lib/exam/examVocabularyPool.ts');

const USER = `
hypothesis, evidence, methodology, sample, variable, dataset, observation, analysis, finding, validity, reliability, replication, correlation, parameter, constraint, protocol, simulation, survey, peer-reviewed, preliminary,
cause, affect, influence, contribute, induce, trigger, result, derive, generate, lead to, outcome, consequence, impact, effect, factor, mechanism, therefore, thus, consequently, as a result,
biodiversity, ecosystem, emission, pollutant, contamination, degradation, conservation, sustainability, renewable, scarce, resilient, vulnerable, mitigate, adapt, deplete, restore, erode, absorb, gradually, dramatically,
organism, cellular, genetic, pathogen, infection, immunity, diagnosis, therapy, symptom, disorder, mutation, metabolism, tissue, immune, chronic, acute, susceptible, administer, transmit, detect,
innovation, automation, algorithm, sensor, device, network, interface, prototype, infrastructure, efficiency, capacity, durable, portable, precise, integrate, optimise, manufacture, deploy, operate, remotely,
particle, radiation, gravity, orbit, compound, molecule, catalyst, density, velocity, wavelength, thermal, magnetic, stable, volatile, concentrated, dilute, evaporate, accelerate, collide, precisely,
assess, evaluate, examine, investigate, demonstrate, indicate, suggest, reveal, confirm, verify, estimate, measure, monitor, compare, classify, identify, obtain, maintain, enhance, reduce,
significant, substantial, minor, major, essential, crucial, relevant, comparable, consistent, inconsistent, available, sufficient, insufficient, accurate, inaccurate, robust, fragile, complex, novel, conventional,
significantly, substantially, slightly, primarily, largely, mainly, widely, rarely, frequently, commonly, typically, relatively, potentially, apparently, eventually, initially, subsequently, previously, currently, increasingly,
although, whereas, while, unless, provided that, as long as, because, since, so that, in order to, despite, in spite of, however, nevertheless, moreover, furthermore, thereby, otherwise, in contrast, on the other hand,
necessary, occur, exposure, prevent, require, involve, provide, determine, assume, consider, sustain, utilize, encourage, promote, constitute, threaten, mandatory, plausible, reluctant, deteriorate, persist, retain, highlight, reflect, combine, precaution, disparity, acquisition, prevalence, obligation, priority, interpretation, elaboration, provision, incentive, elimination, justification, substitution, destruction, ward off, wipe off, keep off, rule out, stamp out, phase out, carry out, take up, pull down, do away with, make up for, hand down
`;

const EXTRA_ROWS = `
equilibrium|denge|noun|C2|chemistry
diffusion|yayılım / difüzyon|noun|C2|chemistry
enzyme|enzim|noun|C2|biology
spectroscopy|spektroskopi|noun|C2|physics
isotope|izotop|noun|C2|chemistry
chromatography|kromatografi|noun|C2|chemistry
spectrometer|spektrometre|noun|C2|physics
nanoparticle|nanoparçacık|noun|C2|chemistry
osmosis|ozmoz|noun|C2|biology
genotype|genotip|noun|C2|biology
phenotype|fenotip|noun|C2|biology
meiosis|mayoz bölünmesi|noun|C2|biology
mitosis|mitoz bölünmesi|noun|C2|biology
ribosome|ribozom|noun|C2|biology
conductivity|iletkenlik|noun|C2|physics
spectral|spektral|adjective|C2|physics
logarithmic|logaritmik|adjective|C2|academic
empirical|deneye / gözleme dayalı|adjective|C2|research
finite|sonlu|adjective|C2|academic
discrete|ayrık|adjective|C2|research
continuous|sürekli|adjective|C2|research
arbitrary|keyfi|adjective|C2|research
underlying|altta yatan|adjective|C2|research
filtration|süzme / filtreleme|noun|C2|chemistry
buffer|tampon çözeltisi|noun|C2|chemistry
titration|titasyon|noun|C2|chemistry
homology|homoloji|noun|C2|biology
substrate|substrat|noun|C2|biology
polymer|polimer|noun|C2|chemistry
monomer|monomer|noun|C2|chemistry
lipid|lipid|noun|C2|biology
genome|genom|noun|C2|biology
transcriptome|transkriptom|noun|C2|biology
apoptosis|apoptoz / programlı hücre ölümü|noun|C2|biology
homeostasis|homeostazi|noun|C2|biology
cytoplasm|sitoplazma|noun|C2|biology
proton|proton|noun|C2|physics
electron|elektron|noun|C2|physics
neutron|nötron|noun|C2|physics
valence|değerlik / valans|noun|C2|chemistry
orbital|yörünge (orbital)|noun|C2|chemistry
entropy|entropi|noun|C2|physics
enthalpy|entalpi|noun|C2|chemistry
viscosity|visekozite / akışkanlık|noun|C2|physics
torque|burulma momenti|noun|C2|physics
sediment|sediman|noun|C2|environment
seismic|sismik|adjective|C2|environment
aquifer|yeraltı suyu tabakası|noun|C2|environment
stratigraphy|stratejigrafi|noun|C2|research
analogue|benzer / analoğ|noun|C2|research
prism|prizma|noun|C2|physics
mirror|ayna (optik)|noun|C2|physics
reagent|reaktif|noun|C2|chemistry
aqueous|sulu|adjective|C2|chemistry
adiabatic|adiyabatik|adjective|C2|physics
`.trim()
  .split('\n')
  .map((line) => {
    const [a, b, c, d, e] = line.split('|').map((x) => x.trim());
    return [a, b, c, d, e];
  })
  .filter((row) => row[0]);

/** @type {Record<string, string>} */
const EXTRA_MEANING = {};
for (const [lemma, tr] of EXTRA_ROWS) EXTRA_MEANING[lemma.toLowerCase()] = tr;

const uniq = [...new Set(USER.split(/,|\n/).map((s) => s.trim()).filter(Boolean))];

const VERBS = new Set(
  `cause affect influence contribute induce trigger result derive generate mitigate adapt deplete restore erode absorb integrate optimise manufacture deploy operate evaporate accelerate collide assess evaluate examine investigate demonstrate indicate suggest reveal confirm verify estimate measure monitor compare classify identify obtain maintain enhance reduce occur prevent require involve provide determine assume consider sustain utilize encourage promote constitute threaten deteriorate persist retain highlight reflect combine`.split(/\s+/)
);

const ADV = new Set(
  `gradually dramatically significantly substantially slightly primarily largely mainly widely rarely frequently commonly typically relatively potentially apparently eventually initially subsequently previously currently increasingly precisely remotely`.split(/\s+/)
);

const MULTIWORD = [
  ['as a result'],
  ['provided that'],
  ['as long as'],
  ['so that'],
  ['in order to'],
  ['in spite of'],
  ['lead to'],
  ['peer-reviewed'],
  ['in contrast'],
  ['on the other hand'],
  ['ward off'],
  ['wipe off'],
  ['keep off'],
  ['rule out'],
  ['stamp out'],
  ['phase out'],
  ['carry out'],
  ['take up'],
  ['pull down'],
  ['do away with'],
  ['make up for'],
  ['hand down'],
].map((x)=>x[0]);

const MULTIWORD_SET = new Set(MULTIWORD);

const CONNECTOR_SINGLE = new Set(
  `therefore thus consequently although whereas while unless because since despite however moreover furthermore thereby otherwise`.split(/\s+/)
);

const ADJECTIVE_HINT = new Set(
  `cellular genetic immune chronic acute susceptible renewable scarce resilient vulnerable durable portable precise thermal magnetic stable volatile concentrated significant substantial minor major essential crucial relevant comparable consistent inconsistent available sufficient insufficient accurate inaccurate robust fragile complex novel conventional mandatory plausible reluctant preliminary peer-reviewed intricate`.split(
    /\s+/
  )
);

function gloss(word) {
  const lw = word.toLowerCase();
  if (EXTRA_MEANING[lw]) return EXTRA_MEANING[lw];
  return `${word}: YDS/YÖKDİL akademik metinde üst düzey sözcük bağlamına geçerlidir`;
}

const PHRASAL_VERB = new Set([
  'ward off',
  'wipe off',
  'keep off',
  'rule out',
  'stamp out',
  'phase out',
  'carry out',
  'take up',
  'pull down',
  'do away with',
  'make up for',
  'lead to',
]);

function posOf(w) {
  const lw = w.toLowerCase();
  if (PHRASAL_VERB.has(lw)) return 'phrasal_verb';
  if (MULTIWORD_SET.has(lw)) return lw === 'peer-reviewed' ? 'adjective' : 'transition';
  if (ADV.has(lw)) return 'adverb';
  if (lw === 'because' || lw === 'since') return 'conjunction';
  if (CONNECTOR_SINGLE.has(lw)) return 'transition';
  if (VERBS.has(lw)) return 'verb';
  if (/ly$/.test(lw)) return 'adverb';
  if (ADJECTIVE_HINT.has(lw)) return 'adjective';
  return 'noun';
}

function domainOf(w) {
  if (/biology|organ|immune|virus|therapy|gene|cell|mutation|pathogen/i.test(w)) return 'biology';
  if (/chem|molecule|compound|catalyst|spectro/i.test(w)) return 'chemistry';
  if (/orbit|particle|gravity|radiation|velocity|density|thermal|conductivity/i.test(w)) return 'physics';
  if (/ecosystem|biodiversity|emission|pollutant|degrad/i.test(w)) return 'environment';
  if (/innovation|algorithm|autom|sensor|device|infra|prototype|deploy|network/i.test(w)) return 'technology';
  if (/survey|hypothesis|validity|dataset|finding|research|protocol|parameter|analysis/i.test(w)) return 'research';
  return 'academic';
}

function levelOf(w) {
  const lw = w.toLowerCase();
  if (/(methodology|replication|whereas)/.test(lw)) return 'C2';
  return 'C1';
}

function groupsOf(w, domain, pos) {
  const g = new Set(['yds_general']);
  const lw = w.toLowerCase();
  if (domain === 'research') g.add('research');
  if (['biology','chemistry','physics','environment'].includes(domain)) g.add('yokdil_science');

  if (pos === 'verb' || pos === 'phrasal_verb') g.add('academic_verbs');
  if (pos === 'noun') g.add('academic_nouns');
  if (pos === 'adjective') g.add('academic_adjectives');
  if (pos === 'adverb') g.add('academic_adverbs');
  if (pos === 'phrasal_verb') g.add('phrasal_verbs');

  if (/(cause|effect|impact|consequently|therefore|result|consequence)/i.test(w)) g.add('cause_effect');
  if (/(although|despite|whereas|nevertheless|however)/i.test(w)) {
    g.add('contrast');
    g.add('connectors');
  }
  if (/(moreover|therefore|furthermore)/i.test(w)) g.add('connectors');
  if (CONNECTOR_SINGLE.has(lw) || lw === 'therefore') g.add('connectors');

  g.add('reading');
  g.add('cloze');

  return [...g];
}

function tagsFor(domain) {
  return ['biology', 'chemistry', 'physics', 'medicine'].includes(domain) ? ['YOKDIL'] : ['BOTH'];
}

function mkFromWord(word, overrides = {}) {
  const pos = overrides.part_of_speech || posOf(word);
  const domain = overrides.domain || domainOf(word);
  const tags = overrides.exam_tags || tagsFor(domain);
  return {
    word,
    meaning_tr: overrides.meaning_tr || gloss(word),
    part_of_speech: pos,
    level: overrides.level || levelOf(word),
    domain,
    exam_tags: tags,
    groups: overrides.groups || groupsOf(word, domain, pos),
    ...overrides,
  };
}

const uniqSet = new Set(uniq.map((w) => w.toLowerCase()));
const rows = uniq.map((w) => mkFromWord(w));

for (const row of EXTRA_ROWS) {
  const [lemma, hintTr, p, lvl, dom] = row;
  const lw = lemma.toLowerCase();
  if (uniqSet.has(lw)) continue;

  const pos =
    p.toLowerCase() === 'verb' ? 'verb' : p.toLowerCase() === 'adjective' ? 'adjective' : 'noun';

  rows.push(
    mkFromWord(lemma, {
      meaning_tr: hintTr,
      part_of_speech: /** @type {any} */ (pos),
      level: /** @type {any} */ (lvl || 'C1'),
      domain: dom,
      exam_tags: tagsFor(dom),
    })
  );
}

if (rows.length < 300) {
  console.error(`Pool size ${rows.length} < 300 — check EXTRA_ROWS`);
  process.exit(1);
}

rows.sort((a, b) => a.word.localeCompare(b.word));

const header = `
/**
 * Sınav Akademik Kelime Havuzu — YDS/YÖKDİL üslup ve seçenek seviyesi için referans; ÖSYM sınav metni içermez.
 * Üretici: scripts/emit-exam-vocabulary-pool.mjs
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

`;

const body =
  `export const examVocabularyPool: ExamVocabularyItem[] = ` +
  JSON.stringify(rows, null, 2) +
  `;\n`;

fs.writeFileSync(OUT, header + body, 'utf8');
console.error('Emitted', rows.length, 'ExamVocabularyItem rows');
