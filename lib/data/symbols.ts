export type SymbolCategory = 'consonant' | 'vowel' | 'diacritic'
export type ArticulationPlace =
  | 'bilabial' | 'labiodental' | 'dental' | 'alveolar' | 'postalveolar'
  | 'palatal' | 'velar' | 'uvular' | 'glottal' | 'lateral-palatal'
  | 'lateral-alveolar' | 'lateral-velar'
export type ArticulationManner =
  | 'plosive' | 'nasal' | 'fricative' | 'affricate' | 'approximant'
  | 'lateral' | 'trill' | 'flap'
export type Voicing = 'voiced' | 'voiceless'
export type VowelHeight = 'close' | 'near-close' | 'close-mid' | 'mid' | 'open-mid' | 'near-open' | 'open'
export type VowelBackness = 'front' | 'central' | 'back'
export type VowelRounding = 'rounded' | 'unrounded'

export interface WordExample {
  word: string
  lang: 'es' | 'pt-BR' | 'pt-PT' | 'ro' | 'ru' | 'en' | 'de' | 'fr' | 'it'
  langLabel: string
  ipa: string
  audio?: string
  translation?: string
}

export interface ConsonantArticulation {
  type: 'consonant'
  place: ArticulationPlace
  manner: ArticulationManner
  voicing: Voicing
}

export interface VowelArticulation {
  type: 'vowel'
  height: VowelHeight
  backness: VowelBackness
  rounding: VowelRounding
  nasal?: boolean
}

export interface IPASymbol {
  id: string
  ipa: string
  name: string
  category: SymbolCategory
  articulation: ConsonantArticulation | VowelArticulation
  difficulty: 1 | 2 | 3
  isNewForSpanish: boolean
  examples: WordExample[]
  audio: string
  tip?: string
  contrasts?: string[]
  week: 1 | 2 | 3
  day: number
  wikiAudioName?: string
}

const SYMBOLS: IPASymbol[] = [
  // ─── SEMANA 2 — CONSONANTES ESPAÑOLAS (anclaje) ──────────────────────────
  {
    id: 'p', ipa: '/p/', name: 'Oclusiva bilabial sorda',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'bilabial', manner: 'plosive', voicing: 'voiceless' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'papa', lang: 'es', langLabel: 'Español', ipa: 'ˈpapa', audio: 'words/papa-es.ogg' },
      { word: 'pão', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'pɐ̃w̃', audio: 'words/pao-pt.ogg', translation: 'pan' },
      { word: 'pai', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'paj', audio: 'words/pai-pt.ogg', translation: 'padre' },
      { word: 'porta', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈpɔɾtɐ', audio: 'words/porta-pt.ogg', translation: 'puerta' },
      { word: 'pâine', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈpɨjne', audio: 'words/paine-ro.ogg', translation: 'pan' },
      { word: 'pas', lang: 'ro', langLabel: 'Rumano', ipa: 'pas', audio: 'words/pas-ro.ogg', translation: 'paso' },
      { word: 'pădure', lang: 'ro', langLabel: 'Rumano', ipa: 'pəˈdure', audio: 'words/padure-ro.ogg', translation: 'bosque' },
    ],
    audio: 'symbols/p.ogg', contrasts: ['b'],
    week: 2, day: 8, wikiAudioName: 'Voiceless_bilabial_plosive.ogg',
  },
  {
    id: 'b', ipa: '/b/', name: 'Oclusiva bilabial sonora',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'bilabial', manner: 'plosive', voicing: 'voiced' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'boca', lang: 'es', langLabel: 'Español', ipa: 'ˈboka', audio: 'words/boca-es.ogg' },
      { word: 'bom', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'bõ', audio: 'words/bom-pt.ogg', translation: 'bueno' },
      { word: 'bola', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈbolɐ', audio: 'words/bola-pt.ogg', translation: 'pelota' },
      { word: 'barco', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈbaɾku', audio: 'words/barco-pt.ogg', translation: 'barco' },
      { word: 'bun', lang: 'ro', langLabel: 'Rumano', ipa: 'bun', audio: 'words/bun-ro.ogg', translation: 'bueno' },
      { word: 'bere', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈberɛ', audio: 'words/bere-ro.ogg', translation: 'cerveza' },
      { word: 'bine', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈbinɛ', audio: 'words/bine-ro.ogg', translation: 'bien' },
    ],
    audio: 'symbols/b.ogg', contrasts: ['p', 'v'],
    week: 2, day: 8, wikiAudioName: 'Voiced_bilabial_plosive.ogg',
  },
  {
    id: 't', ipa: '/t/', name: 'Oclusiva alveolar sorda',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'alveolar', manner: 'plosive', voicing: 'voiceless' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'tú', lang: 'es', langLabel: 'Español', ipa: 'tu', audio: 'words/tu-es.ogg' },
      { word: 'tu', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'tu', audio: 'words/tu-pt.ogg', translation: 'tú' },
      { word: 'tempo', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈtẽpu', audio: 'words/tempo-pt.ogg', translation: 'tiempo' },
      { word: 'tarde', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈtaɾdʒi', audio: 'words/tarde-pt.ogg', translation: 'tarde' },
      { word: 'tu', lang: 'ro', langLabel: 'Rumano', ipa: 'tu', audio: 'words/tu-ro.ogg', translation: 'tú' },
      { word: 'timp', lang: 'ro', langLabel: 'Rumano', ipa: 'timp', audio: 'words/timp-ro.ogg', translation: 'tiempo' },
      { word: 'tată', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈtatə', audio: 'words/tata-ro.ogg', translation: 'padre' },
    ],
    audio: 'symbols/t.ogg', contrasts: ['d'],
    week: 2, day: 8, wikiAudioName: 'Voiceless_alveolar_plosive.ogg',
  },
  {
    id: 'd', ipa: '/d/', name: 'Oclusiva alveolar sonora',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'alveolar', manner: 'plosive', voicing: 'voiced' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'dar', lang: 'es', langLabel: 'Español', ipa: 'daɾ', audio: 'words/dar-es.ogg' },
      { word: 'dar', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'daɾ', audio: 'words/dar-pt.ogg', translation: 'dar' },
      { word: 'lado', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈladu', audio: 'words/lado-pt.ogg', translation: 'lado' },
      { word: 'dor', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈdɔɾ', audio: 'words/dor-pt.ogg', translation: 'dolor' },
      { word: 'da', lang: 'ro', langLabel: 'Rumano', ipa: 'da', audio: 'words/da-ro.ogg', translation: 'sí' },
      { word: 'dor', lang: 'ro', langLabel: 'Rumano', ipa: 'dor', audio: 'words/dor-ro.ogg', translation: 'dolor / añoranza' },
      { word: 'drum', lang: 'ro', langLabel: 'Rumano', ipa: 'drum', audio: 'words/drum-ro.ogg', translation: 'camino' },
    ],
    audio: 'symbols/d.ogg', contrasts: ['t'],
    week: 2, day: 8, wikiAudioName: 'Voiced_alveolar_plosive.ogg',
  },
  {
    id: 'k', ipa: '/k/', name: 'Oclusiva velar sorda',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'velar', manner: 'plosive', voicing: 'voiceless' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'casa', lang: 'es', langLabel: 'Español', ipa: 'ˈkasa', audio: 'words/casa-es.ogg' },
      { word: 'casa', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkazɐ', audio: 'words/casa-pt.ogg', translation: 'casa' },
      { word: 'coração', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'koɾɐˈsɐ̃w̃', audio: 'words/coracao-pt.ogg', translation: 'corazón' },
      { word: 'como', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkomu', audio: 'words/como-pt.ogg', translation: 'como' },
      { word: 'casă', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈkasə', audio: 'words/casa-ro.ogg', translation: 'casa' },
      { word: 'carte', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈkartɛ', audio: 'words/carte-ro.ogg', translation: 'libro' },
      { word: 'copil', lang: 'ro', langLabel: 'Rumano', ipa: 'koˈpil', audio: 'words/copil-ro.ogg', translation: 'niño' },
    ],
    audio: 'symbols/k.ogg', contrasts: ['g'],
    week: 2, day: 8, wikiAudioName: 'Voiceless_velar_plosive.ogg',
  },
  {
    id: 'g', ipa: '/g/', name: 'Oclusiva velar sonora',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'velar', manner: 'plosive', voicing: 'voiced' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'gato', lang: 'es', langLabel: 'Español', ipa: 'ˈgato', audio: 'words/gato-es.ogg' },
      { word: 'gato', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈgatu', audio: 'words/gato-pt.ogg', translation: 'gato' },
      { word: 'grande', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈɡɾɐ̃dʒi', audio: 'words/grande-pt.ogg', translation: 'grande' },
      { word: 'gosto', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈɡostu', audio: 'words/gosto-pt.ogg', translation: 'gusto / me gusta' },
      { word: 'gară', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈɡarə', audio: 'words/gara-ro.ogg', translation: 'estación (tren)' },
      { word: 'gând', lang: 'ro', langLabel: 'Rumano', ipa: 'ɡɨnd', audio: 'words/gand-ro.ogg', translation: 'pensamiento' },
      { word: 'grădină', lang: 'ro', langLabel: 'Rumano', ipa: 'ɡrəˈdinə', audio: 'words/gradina-ro.ogg', translation: 'jardín' },
    ],
    audio: 'symbols/g.ogg', contrasts: ['k'],
    week: 2, day: 8, wikiAudioName: 'Voiced_velar_plosive.ogg',
  },
  {
    id: 'm', ipa: '/m/', name: 'Nasal bilabial',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'bilabial', manner: 'nasal', voicing: 'voiced' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'mamá', lang: 'es', langLabel: 'Español', ipa: 'maˈma', audio: 'words/mama-es.ogg' },
      { word: 'mãe', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'mɐ̃j̃', audio: 'words/mae-pt.ogg', translation: 'madre' },
      { word: 'mão', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'mɐ̃w̃', audio: 'words/mao-pt.ogg', translation: 'mano' },
      { word: 'mar', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'maɾ', audio: 'words/mar-pt.ogg', translation: 'mar' },
      { word: 'mama', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈmama', audio: 'words/mama-ro.ogg', translation: 'mamá' },
      { word: 'mână', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈmɨnə', audio: 'words/mana-ro.ogg', translation: 'mano' },
      { word: 'mare', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈmarɛ', audio: 'words/mare-ro.ogg', translation: 'grande / mar' },
    ],
    audio: 'symbols/m.ogg',
    week: 2, day: 8, wikiAudioName: 'Bilabial_nasal.ogg',
  },
  {
    id: 'n', ipa: '/n/', name: 'Nasal alveolar',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'alveolar', manner: 'nasal', voicing: 'voiced' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'no', lang: 'es', langLabel: 'Español', ipa: 'no', audio: 'words/no-es.ogg' },
      { word: 'não', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'nɐ̃w̃', audio: 'words/nao-pt.ogg', translation: 'no' },
      { word: 'noite', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈnojtʃi', audio: 'words/noite-pt.ogg', translation: 'noche' },
      { word: 'novo', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈnovu', audio: 'words/novo-pt.ogg', translation: 'nuevo' },
      { word: 'nu', lang: 'ro', langLabel: 'Rumano', ipa: 'nu', audio: 'words/nu-ro.ogg', translation: 'no' },
      { word: 'noapte', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈnwaptɛ', audio: 'words/noapte-ro.ogg', translation: 'noche' },
      { word: 'nouă', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈnowə', audio: 'words/noua-ro.ogg', translation: 'nueve' },
    ],
    audio: 'symbols/n.ogg',
    week: 2, day: 8, wikiAudioName: 'Alveolar_nasal.ogg',
  },
  {
    id: 'ɲ', ipa: '/ɲ/', name: 'Nasal palatal',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'palatal', manner: 'nasal', voicing: 'voiced' },
    difficulty: 1, isNewForSpanish: false,
    tip: 'La "ñ" del español. Dorso contra paladar duro, aire por la nariz.',
    examples: [
      { word: 'año', lang: 'es', langLabel: 'Español', ipa: 'ˈaɲo', audio: 'words/ano-es.ogg' },
      { word: 'banho', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈbɐɲu', audio: 'words/banho-pt.ogg', translation: 'baño' },
      { word: 'sonho', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈsoɲu', audio: 'words/sonho-pt.ogg', translation: 'sueño' },
      { word: 'vinho', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈviɲu', audio: 'words/vinho-pt.ogg', translation: 'vino' },
      { word: 'gnocchi', lang: 'it', langLabel: 'Italiano', ipa: 'ˈɲɔkki', audio: 'words/gnocchi-it.ogg', translation: 'ñoquis' },
    ],
    audio: 'symbols/palatal-nasal.ogg',
    week: 2, day: 8, wikiAudioName: 'Palatal_nasal.ogg',
  },
  {
    id: 'f', ipa: '/f/', name: 'Fricativa labiodental sorda',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'labiodental', manner: 'fricative', voicing: 'voiceless' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'foto', lang: 'es', langLabel: 'Español', ipa: 'ˈfoto', audio: 'words/foto-es.ogg' },
      { word: 'falar', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'faˈlaɾ', audio: 'words/falar-pt.ogg', translation: 'hablar' },
      { word: 'família', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'faˈmiljɐ', audio: 'words/familia-pt.ogg', translation: 'familia' },
      { word: 'fato', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈfatu', audio: 'words/fato-pt.ogg', translation: 'hecho / traje' },
      { word: 'foc', lang: 'ro', langLabel: 'Rumano', ipa: 'fok', audio: 'words/foc-ro.ogg', translation: 'fuego' },
      { word: 'floare', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈflwarɛ', audio: 'words/floare-ro.ogg', translation: 'flor' },
      { word: 'frumos', lang: 'ro', langLabel: 'Rumano', ipa: 'fruˈmos', audio: 'words/frumos-ro.ogg', translation: 'hermoso' },
    ],
    audio: 'symbols/f.ogg', contrasts: ['v'],
    week: 2, day: 9, wikiAudioName: 'Voiceless_labiodental_fricative.ogg',
  },
  {
    id: 's', ipa: '/s/', name: 'Fricativa alveolar sorda',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'alveolar', manner: 'fricative', voicing: 'voiceless' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'sol', lang: 'es', langLabel: 'Español', ipa: 'sol', audio: 'words/sol-es.ogg' },
      { word: 'sol', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'sɔw', audio: 'words/sol-pt.ogg', translation: 'sol' },
      { word: 'saber', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'saˈbeɾ', audio: 'words/saber-pt.ogg', translation: 'saber' },
      { word: 'saúde', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'saˈudʒi', audio: 'words/saude-pt.ogg', translation: 'salud' },
      { word: 'soare', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈswarɛ', audio: 'words/soare-ro.ogg', translation: 'sol' },
      { word: 'somn', lang: 'ro', langLabel: 'Rumano', ipa: 'somn', audio: 'words/somn-ro.ogg', translation: 'sueño' },
      { word: 'singur', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈsiŋɡur', audio: 'words/singur-ro.ogg', translation: 'solo' },
    ],
    audio: 'symbols/s.ogg', contrasts: ['z', 'ʃ'],
    week: 2, day: 9, wikiAudioName: 'Voiceless_alveolar_sibilant.ogg',
  },
  {
    id: 'x', ipa: '/x/', name: 'Fricativa velar sorda',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'velar', manner: 'fricative', voicing: 'voiceless' },
    difficulty: 1, isNewForSpanish: false,
    tip: 'La "jota" del español. Dorso contra velo, aire frota sin cerrar.',
    examples: [
      { word: 'jota', lang: 'es', langLabel: 'Español', ipa: 'ˈxota', audio: 'words/jota-es.ogg' },
      { word: 'хорошо', lang: 'ru', langLabel: 'Ruso', ipa: 'xɐˈroʂə', audio: 'words/horosho-ru.ogg', translation: 'bien / está bien' },
      { word: 'Bach', lang: 'de', langLabel: 'Alemán', ipa: 'bax', audio: 'words/bach-de.ogg', translation: 'Bach (apellido)' },
    ],
    audio: 'symbols/x.ogg', contrasts: ['h', 'χ'],
    week: 2, day: 13, wikiAudioName: 'Voiceless_velar_fricative.ogg',
  },
  {
    id: 'l', ipa: '/l/', name: 'Lateral alveolar',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'lateral-alveolar', manner: 'lateral', voicing: 'voiced' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'luna', lang: 'es', langLabel: 'Español', ipa: 'ˈluna', audio: 'words/luna-es.ogg' },
      { word: 'lua', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈluɐ', audio: 'words/lua-pt.ogg', translation: 'luna' },
      { word: 'lado', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈladu', audio: 'words/lado-pt.ogg', translation: 'lado' },
      { word: 'livro', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈlivɾu', audio: 'words/livro-pt.ogg', translation: 'libro' },
      { word: 'lună', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈlunə', audio: 'words/luna-ro.ogg', translation: 'luna' },
      { word: 'loc', lang: 'ro', langLabel: 'Rumano', ipa: 'lok', audio: 'words/loc-ro.ogg', translation: 'lugar' },
      { word: 'lemn', lang: 'ro', langLabel: 'Rumano', ipa: 'lemn', audio: 'words/lemn-ro.ogg', translation: 'madera' },
    ],
    audio: 'symbols/l.ogg', contrasts: ['ɫ', 'ʎ'],
    week: 2, day: 12, wikiAudioName: 'Alveolar_lateral_approximant.ogg',
  },
  {
    id: 'r', ipa: '/r/', name: 'Vibrante alveolar múltiple',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'alveolar', manner: 'trill', voicing: 'voiced' },
    difficulty: 1, isNewForSpanish: false,
    tip: 'La "rr" del español. Varias vibraciones de la punta contra alvéolos.',
    examples: [
      { word: 'perro', lang: 'es', langLabel: 'Español', ipa: 'ˈpero', audio: 'words/perro-es.ogg' },
      { word: 'roma', lang: 'it', langLabel: 'Italiano', ipa: 'ˈroːma', audio: 'words/roma-it.ogg', translation: 'Roma' },
      { word: 'roșu', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈroʃu', audio: 'words/rosu-ro.ogg', translation: 'rojo' },
      { word: 'rar', lang: 'ro', langLabel: 'Rumano', ipa: 'rar', audio: 'words/rar-ro.ogg', translation: 'raro / poco frecuente' },
      { word: 'râu', lang: 'ro', langLabel: 'Rumano', ipa: 'rɨw', audio: 'words/rau-ro.ogg', translation: 'río' },
    ],
    audio: 'symbols/r.ogg', contrasts: ['ɾ', 'ʁ'],
    week: 2, day: 8, wikiAudioName: 'Alveolar_trill.ogg',
  },
  {
    id: 'ɾ', ipa: '/ɾ/', name: 'Vibrante alveolar simple',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'alveolar', manner: 'flap', voicing: 'voiced' },
    difficulty: 1, isNewForSpanish: false,
    tip: 'La "r" suave del español (pero/caro). Un solo golpe rápido.',
    examples: [
      { word: 'pero', lang: 'es', langLabel: 'Español', ipa: 'ˈpeɾo', audio: 'words/pero-es.ogg' },
      { word: 'caro', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkaɾu', audio: 'words/caro-pt.ogg', translation: 'caro / querido' },
      { word: 'para', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈpaɾɐ', audio: 'words/para-pt.ogg', translation: 'para' },
      { word: 'cara', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkaɾɐ', audio: 'words/cara-pt.ogg', translation: 'cara / chico' },
      { word: 'roată', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈrwatə', audio: 'words/roata-ro.ogg', translation: 'rueda' },
      { word: 'mare', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈmarɛ', audio: 'words/mare-ro.ogg', translation: 'grande / mar' },
      { word: 'sare', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈsarɛ', audio: 'words/sare-ro.ogg', translation: 'sal' },
    ],
    audio: 'symbols/flap.ogg', contrasts: ['r'],
    week: 2, day: 8, wikiAudioName: 'Alveolar_flap.ogg',
  },
  {
    id: 'j', ipa: '/j/', name: 'Aproximante palatal',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'palatal', manner: 'approximant', voicing: 'voiced' },
    difficulty: 1, isNewForSpanish: false,
    tip: 'Como /i/ pero como semiconsonante. La "y" del español.',
    examples: [
      { word: 'yo', lang: 'es', langLabel: 'Español', ipa: 'jo', audio: 'words/yo-es.ogg' },
      { word: 'iate', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈjatʃi', audio: 'words/iate-pt.ogg', translation: 'yate' },
      { word: 'maio', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈmaju', audio: 'words/maio-pt.ogg', translation: 'mayo' },
      { word: 'pai', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'paj', audio: 'words/pai-pt.ogg', translation: 'padre' },
      { word: 'ieri', lang: 'ro', langLabel: 'Rumano', ipa: 'jerʲ', audio: 'words/ieri-ro.ogg', translation: 'ayer' },
      { word: 'iarnă', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈjarnə', audio: 'words/iarna-ro.ogg', translation: 'invierno' },
      { word: 'iarbă', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈjarbə', audio: 'words/iarba-ro.ogg', translation: 'hierba' },
    ],
    audio: 'symbols/j.ogg',
    week: 2, day: 8, wikiAudioName: 'Palatal_approximant.ogg',
  },
  {
    id: 'w', ipa: '/w/', name: 'Aproximante labiovelar',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'velar', manner: 'approximant', voicing: 'voiced' },
    difficulty: 1, isNewForSpanish: false,
    tip: 'Como /u/ pero como semiconsonante.',
    examples: [
      { word: 'huevo', lang: 'es', langLabel: 'Español', ipa: 'ˈweβo', audio: 'words/huevo-es.ogg' },
      { word: 'quanto', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkwɐ̃tu', audio: 'words/quanto-pt.ogg', translation: 'cuánto' },
      { word: 'quando', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkwɐ̃du', audio: 'words/quando-pt.ogg', translation: 'cuando' },
      { word: 'qual', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'kwaw', audio: 'words/qual-pt.ogg', translation: 'cuál' },
      { word: 'nou', lang: 'ro', langLabel: 'Rumano', ipa: 'now', audio: 'words/nou-ro.ogg', translation: 'nuevo / nueve' },
      { word: 'sau', lang: 'ro', langLabel: 'Rumano', ipa: 'saw', audio: 'words/sau-ro.ogg', translation: 'o (disyuntiva)' },
    ],
    audio: 'symbols/w.ogg',
    week: 2, day: 8, wikiAudioName: 'Voiced_labio-velar_approximant.ogg',
  },

  // ─── BLOQUE B — CONSONANTES NUEVAS ───────────────────────────────────────
  {
    id: 'v', ipa: '/v/', name: 'Fricativa labiodental sonora',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'labiodental', manner: 'fricative', voicing: 'voiced' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Pon dientes superiores en labio inferior y di "f" con voz. ¡No existe en español!',
    examples: [
      { word: 'vida', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈvidɐ', audio: 'words/vida-pt.ogg', translation: 'vida' },
      { word: 'você', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'voˈse', audio: 'words/voce-pt.ogg', translation: 'tú / usted' },
      { word: 'viver', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'viˈveɾ', audio: 'words/viver-pt.ogg', translation: 'vivir' },
      { word: 'văd', lang: 'ro', langLabel: 'Rumano', ipa: 'vəd', audio: 'words/vad-ro.ogg', translation: 'veo' },
      { word: 'vară', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈvarə', audio: 'words/vara-ro.ogg', translation: 'verano' },
      { word: 'verde', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈverdɛ', audio: 'words/verde-ro.ogg', translation: 'verde' },
      { word: 'вода', lang: 'ru', langLabel: 'Ruso', ipa: 'vɐˈda', audio: 'words/voda-ru.ogg', translation: 'agua' },
    ],
    audio: 'symbols/v.ogg', contrasts: ['f', 'b'],
    week: 2, day: 9, wikiAudioName: 'Voiced_labiodental_fricative.ogg',
  },
  {
    id: 'z', ipa: '/z/', name: 'Fricativa alveolar sonora',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'alveolar', manner: 'fricative', voicing: 'voiced' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Di /s/ y agrega vibración cordal sin mover la lengua. ¡No existe en español estándar!',
    examples: [
      { word: 'casa', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkazɐ', audio: 'words/casa-pt.ogg', translation: 'casa (con /z/ entre vocales)' },
      { word: 'azul', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'aˈzuw', audio: 'words/azul-pt.ogg', translation: 'azul' },
      { word: 'fazer', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'faˈzeɾ', audio: 'words/fazer-pt.ogg', translation: 'hacer' },
      { word: 'zi', lang: 'ro', langLabel: 'Rumano', ipa: 'zi', audio: 'words/zi-ro.ogg', translation: 'día' },
      { word: 'zăpadă', lang: 'ro', langLabel: 'Rumano', ipa: 'zəˈpadə', audio: 'words/zapada-ro.ogg', translation: 'nieve' },
      { word: 'zero', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈzɛro', audio: 'words/zero-ro.ogg', translation: 'cero' },
      { word: 'zoo', lang: 'en', langLabel: 'Inglés', ipa: 'zuː', audio: 'words/zoo-en.ogg', translation: 'zoológico' },
    ],
    audio: 'symbols/z.ogg', contrasts: ['s'],
    week: 2, day: 9, wikiAudioName: 'Voiced_alveolar_sibilant.ogg',
  },
  {
    id: 'ʃ', ipa: '/ʃ/', name: 'Fricativa postalveolar sorda',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'postalveolar', manner: 'fricative', voicing: 'voiceless' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Lengua un poco más atrás que /s/, labios algo redondeados. Empieza diciendo "sh" como pidiendo silencio.',
    examples: [
      { word: 'xícara', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈʃikɐɾɐ', audio: 'words/xicara-pt.ogg', translation: 'taza (de café)' },
      { word: 'chave', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈʃavi', audio: 'words/chave-pt.ogg', translation: 'llave' },
      { word: 'chuva', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈʃuvɐ', audio: 'words/chuva-pt.ogg', translation: 'lluvia' },
      { word: 'șapte', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈʃaptɛ', audio: 'words/sapte-ro.ogg', translation: 'siete' },
      { word: 'șarpe', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈʃarpɛ', audio: 'words/sarpe-ro.ogg', translation: 'serpiente' },
      { word: 'școală', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈʃkwalə', audio: 'words/scoala-ro.ogg', translation: 'escuela' },
      { word: 'ship', lang: 'en', langLabel: 'Inglés', ipa: 'ʃɪp', audio: 'words/ship-en.ogg', translation: 'barco' },
    ],
    audio: 'symbols/esh.ogg', contrasts: ['s', 'tʃ', 'ʒ'],
    week: 2, day: 10, wikiAudioName: 'Voiceless_palato-alveolar_sibilant.ogg',
  },
  {
    id: 'ʒ', ipa: '/ʒ/', name: 'Fricativa postalveolar sonora',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'postalveolar', manner: 'fricative', voicing: 'voiced' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Di /ʃ/ y agrega vibración cordal. Como el "je" del francés.',
    examples: [
      { word: 'jogo', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈʒogu', audio: 'words/jogo-pt.ogg', translation: 'juego' },
      { word: 'gente', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈʒẽtʃi', audio: 'words/gente-pt.ogg', translation: 'gente' },
      { word: 'jardim', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ʒaɾˈdʒĩ', audio: 'words/jardim-pt.ogg', translation: 'jardín' },
      { word: 'jos', lang: 'ro', langLabel: 'Rumano', ipa: 'ʒos', audio: 'words/jos-ro.ogg', translation: 'abajo' },
      { word: 'joc', lang: 'ro', langLabel: 'Rumano', ipa: 'ʒok', audio: 'words/joc-ro.ogg', translation: 'juego' },
      { word: 'geam', lang: 'ro', langLabel: 'Rumano', ipa: 'dʒeam', audio: 'words/geam-ro.ogg', translation: 'ventana (vidrio)' },
      { word: 'je', lang: 'fr', langLabel: 'Francés', ipa: 'ʒə', audio: 'words/je-fr.ogg', translation: 'yo' },
    ],
    audio: 'symbols/ezh.ogg', contrasts: ['ʃ', 'dʒ'],
    week: 2, day: 10, wikiAudioName: 'Voiced_palato-alveolar_sibilant.ogg',
  },
  {
    id: 'tʃ', ipa: '/tʃ/', name: 'Africada postalveolar sorda',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'postalveolar', manner: 'affricate', voicing: 'voiceless' },
    difficulty: 1, isNewForSpanish: false,
    tip: 'Oclusiva /t/ + fricativa /ʃ/ fusionadas. El "ch" del español.',
    examples: [
      { word: 'chico', lang: 'es', langLabel: 'Español', ipa: 'ˈtʃiko', audio: 'words/chico-es.ogg' },
      { word: 'tia', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈtʃiɐ', audio: 'words/tia-pt.ogg', translation: 'tía' },
      { word: 'noite', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈnojtʃi', audio: 'words/noite-pt.ogg', translation: 'noche' },
      { word: 'quente', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkẽtʃi', audio: 'words/quente-pt.ogg', translation: 'caliente' },
      { word: 'cer', lang: 'ro', langLabel: 'Rumano', ipa: 'tʃer', audio: 'words/cer-ro.ogg', translation: 'cielo' },
      { word: 'cinci', lang: 'ro', langLabel: 'Rumano', ipa: 'tʃintʃ', audio: 'words/cinci-ro.ogg', translation: 'cinco' },
      { word: 'ce', lang: 'ro', langLabel: 'Rumano', ipa: 'tʃe', audio: 'words/ce-ro.ogg', translation: 'qué' },
    ],
    audio: 'symbols/tesh.ogg', contrasts: ['ʃ', 'dʒ'],
    week: 2, day: 10, wikiAudioName: 'Voiceless_palato-alveolar_affricate.ogg',
  },
  {
    id: 'dʒ', ipa: '/dʒ/', name: 'Africada postalveolar sonora',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'postalveolar', manner: 'affricate', voicing: 'voiced' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Empieza con /d/ y termina con /ʒ/ sin pausa.',
    examples: [
      { word: 'dia', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈdʒiɐ', audio: 'words/dia-pt.ogg', translation: 'día' },
      { word: 'dinheiro', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'dʒiˈɲejɾu', audio: 'words/dinheiro-pt.ogg', translation: 'dinero' },
      { word: 'cidade', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'siˈdadʒi', audio: 'words/cidade-pt.ogg', translation: 'ciudad' },
      { word: 'ger', lang: 'ro', langLabel: 'Rumano', ipa: 'dʒer', audio: 'words/ger-ro.ogg', translation: 'helada / frío extremo' },
      { word: 'gem', lang: 'ro', langLabel: 'Rumano', ipa: 'dʒem', audio: 'words/gem-ro.ogg', translation: 'mermelada' },
      { word: 'gen', lang: 'ro', langLabel: 'Rumano', ipa: 'dʒen', audio: 'words/gen-ro.ogg', translation: 'género' },
      { word: 'jeep', lang: 'en', langLabel: 'Inglés', ipa: 'dʒiːp', audio: 'words/jeep-en.ogg', translation: 'jeep' },
    ],
    audio: 'symbols/dezh.ogg', contrasts: ['ʒ', 'tʃ'],
    week: 2, day: 10, wikiAudioName: 'Voiced_palato-alveolar_affricate.ogg',
  },
  {
    id: 'ts', ipa: '/ts/', name: 'Africada alveolar sorda',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'alveolar', manner: 'affricate', voicing: 'voiceless' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Di "ts" como en "pizza" pero al inicio de palabra.',
    examples: [
      { word: 'țară', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈtsarə', audio: 'words/tara-ro.ogg', translation: 'país' },
      { word: 'țânțar', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈtsɨntsɑr', audio: 'words/tantar-ro.ogg', translation: 'mosquito' },
      { word: 'țigară', lang: 'ro', langLabel: 'Rumano', ipa: 'tsiˈɡarə', audio: 'words/tigara-ro.ogg', translation: 'cigarro' },
      { word: 'Zeit', lang: 'de', langLabel: 'Alemán', ipa: 'tsait', audio: 'words/zeit-de.ogg', translation: 'tiempo / época' },
      { word: 'цена', lang: 'ru', langLabel: 'Ruso', ipa: 'tsɨˈna', audio: 'words/cena-ru.ogg', translation: 'precio' },
    ],
    audio: 'symbols/ts.ogg', contrasts: ['s', 'dz'],
    week: 2, day: 11, wikiAudioName: 'Voiceless_alveolar_affricate.ogg',
  },
  {
    id: 'dz', ipa: '/dz/', name: 'Africada alveolar sonora',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'alveolar', manner: 'affricate', voicing: 'voiced' },
    difficulty: 2, isNewForSpanish: true,
    tip: '/d/ + /z/ fusionadas.',
    examples: [
      { word: 'zero', lang: 'it', langLabel: 'Italiano', ipa: 'ˈdzɛro', audio: 'words/zero-it.ogg', translation: 'cero' },
      { word: 'mezzo', lang: 'it', langLabel: 'Italiano', ipa: 'ˈmɛddzo', audio: 'words/mezzo-it.ogg', translation: 'medio / mitad' },
    ],
    audio: 'symbols/dz.ogg', contrasts: ['ts', 'z'],
    week: 2, day: 11, wikiAudioName: 'Voiced_alveolar_affricate.ogg',
  },
  {
    id: 'ŋ', ipa: '/ŋ/', name: 'Nasal velar',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'velar', manner: 'nasal', voicing: 'voiced' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Dorso contra velo, aire por nariz. El "ng" final del inglés. No existe como fonema en español.',
    examples: [
      { word: 'sing', lang: 'en', langLabel: 'Inglés', ipa: 'sɪŋ', audio: 'words/sing-en.ogg', translation: 'cantar' },
      { word: 'ring', lang: 'en', langLabel: 'Inglés', ipa: 'ɹɪŋ', audio: 'words/ring-en.ogg', translation: 'anillo / sonar' },
      { word: 'singen', lang: 'de', langLabel: 'Alemán', ipa: 'ˈzɪŋən', audio: 'words/singen-de.ogg', translation: 'cantar' },
    ],
    audio: 'symbols/eng.ogg', contrasts: ['n'],
    week: 2, day: 11, wikiAudioName: 'Velar_nasal.ogg',
  },
  {
    id: 'ʎ', ipa: '/ʎ/', name: 'Lateral palatal',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'lateral-palatal', manner: 'lateral', voicing: 'voiced' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Dorso contra paladar duro, aire por los lados. Di "lli" rápido fusionando.',
    examples: [
      { word: 'filho', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈfiʎu', audio: 'words/filho-pt.ogg', translation: 'hijo' },
      { word: 'velho', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈvɛʎu', audio: 'words/velho-pt.ogg', translation: 'viejo' },
      { word: 'mulher', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'muˈʎeɾ', audio: 'words/mulher-pt.ogg', translation: 'mujer' },
      { word: 'figlio', lang: 'it', langLabel: 'Italiano', ipa: 'ˈfiʎʎo', audio: 'words/figlio-it.ogg', translation: 'hijo' },
    ],
    audio: 'symbols/pal-lat.ogg', contrasts: ['l'],
    week: 2, day: 12, wikiAudioName: 'Palatal_lateral_approximant.ogg',
  },
  {
    id: 'h', ipa: '/h/', name: 'Fricativa glotal sorda',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'glottal', manner: 'fricative', voicing: 'voiceless' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Exhala con la boca abierta, tensión glótica suave. En español la H es muda. En portugués BR la "r" inicial suena /h/.',
    examples: [
      { word: 'rato', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈhatu', audio: 'words/rato-pt.ogg', translation: 'ratón (r inicial = /h/ en carioca)' },
      { word: 'rua', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈhuɐ', audio: 'words/rua-pt.ogg', translation: 'calle' },
      { word: 'arroz', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'aˈhos', audio: 'words/arroz-pt.ogg', translation: 'arroz' },
      { word: 'hello', lang: 'en', langLabel: 'Inglés', ipa: 'həˈloʊ', audio: 'words/hello-en.ogg', translation: 'hola' },
      { word: 'Hund', lang: 'de', langLabel: 'Alemán', ipa: 'hʊnt', audio: 'words/hund-de.ogg', translation: 'perro' },
    ],
    audio: 'symbols/h.ogg', contrasts: ['x'],
    week: 2, day: 12, wikiAudioName: 'Voiceless_glottal_fricative.ogg',
  },
  {
    id: 'ɣ', ipa: '/ɣ/', name: 'Fricativa velar sonora',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'velar', manner: 'fricative', voicing: 'voiced' },
    difficulty: 2, isNewForSpanish: false,
    tip: 'Variante alofónica del /g/ en español entre vocales (amigo).',
    examples: [
      { word: 'amigo', lang: 'es', langLabel: 'Español', ipa: 'aˈmiɣo', audio: 'words/amigo-es.ogg' },
      { word: 'lago', lang: 'es', langLabel: 'Español', ipa: 'ˈlaɣo', audio: 'words/lago-es.ogg' },
    ],
    audio: 'symbols/gamma.ogg', contrasts: ['g', 'x'],
    week: 2, day: 12, wikiAudioName: 'Voiced_velar_fricative.ogg',
  },
  {
    id: 'β', ipa: '/β/', name: 'Fricativa bilabial sonora',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'bilabial', manner: 'fricative', voicing: 'voiced' },
    difficulty: 2, isNewForSpanish: false,
    tip: 'Labios casi cerrados, aire frota. Variante alofónica del /b/ entre vocales en español.',
    examples: [
      { word: 'lobo', lang: 'es', langLabel: 'Español', ipa: 'ˈloβo', audio: 'words/lobo-es.ogg' },
      { word: 'saber', lang: 'es', langLabel: 'Español', ipa: 'saˈβeɾ', audio: 'words/saber-es.ogg' },
    ],
    audio: 'symbols/beta.ogg', contrasts: ['b', 'v'],
    week: 2, day: 12, wikiAudioName: 'Voiced_bilabial_fricative.ogg',
  },
  {
    id: 'ð', ipa: '/ð/', name: 'Fricativa dental sonora',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'dental', manner: 'fricative', voicing: 'voiced' },
    difficulty: 2, isNewForSpanish: false,
    tip: 'Lengua entre dientes, con vibración. Variante del /d/ en español entre vocales (cada).',
    examples: [
      { word: 'cada', lang: 'es', langLabel: 'Español', ipa: 'ˈkaða', audio: 'words/cada-es.ogg' },
      { word: 'this', lang: 'en', langLabel: 'Inglés', ipa: 'ðɪs', audio: 'words/this-en.ogg', translation: 'esto / este' },
    ],
    audio: 'symbols/eth.ogg', contrasts: ['d', 'θ'],
    week: 2, day: 12, wikiAudioName: 'Voiced_dental_fricative.ogg',
  },
  {
    id: 'θ', ipa: '/θ/', name: 'Fricativa dental sorda',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'dental', manner: 'fricative', voicing: 'voiceless' },
    difficulty: 1, isNewForSpanish: false,
    tip: 'Lengua entre dientes, sin vibración. El "zapato" en español peninsular.',
    examples: [
      { word: 'zapato', lang: 'es', langLabel: 'Español (Ibérico)', ipa: 'θaˈpato', audio: 'words/zapato-es.ogg' },
      { word: 'think', lang: 'en', langLabel: 'Inglés', ipa: 'θɪŋk', audio: 'words/think-en.ogg', translation: 'pensar' },
    ],
    audio: 'symbols/theta.ogg', contrasts: ['ð', 's'],
    week: 2, day: 13, wikiAudioName: 'Voiceless_dental_fricative.ogg',
  },
  {
    id: 'ʁ', ipa: '/ʁ/', name: 'Fricativa uvular sonora',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'uvular', manner: 'fricative', voicing: 'voiced' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Dorso contra úvula, vibración suave. La "R" del francés y alemán.',
    examples: [
      { word: 'Paris', lang: 'fr', langLabel: 'Francés', ipa: 'paˈʁi', audio: 'words/paris-fr.ogg', translation: 'París' },
      { word: 'rouge', lang: 'fr', langLabel: 'Francés', ipa: 'ʁuʒ', audio: 'words/rouge-fr.ogg', translation: 'rojo' },
      { word: 'rot', lang: 'de', langLabel: 'Alemán', ipa: 'ʁoːt', audio: 'words/rot-de.ogg', translation: 'rojo' },
    ],
    audio: 'symbols/uvular-r.ogg', contrasts: ['r', 'χ'],
    week: 2, day: 13, wikiAudioName: 'Voiced_uvular_fricative.ogg',
  },
  {
    id: 'χ', ipa: '/χ/', name: 'Fricativa uvular sorda',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'uvular', manner: 'fricative', voicing: 'voiceless' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Similar a /x/ pero más atrás, contra la úvula.',
    examples: [
      { word: 'Bach', lang: 'de', langLabel: 'Alemán', ipa: 'baχ', audio: 'words/bach-de.ogg', translation: 'Bach (apellido)' },
    ],
    audio: 'symbols/chi.ogg', contrasts: ['x', 'ʁ'],
    week: 2, day: 13, wikiAudioName: 'Voiceless_uvular_fricative.ogg',
  },
  {
    id: 'ɫ', ipa: '/ɫ/', name: 'Lateral velarizada (L oscura)',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'lateral-velar', manner: 'lateral', voicing: 'voiced' },
    difficulty: 2, isNewForSpanish: true,
    tip: '/l/ con el dorso levantado hacia el velo. Portugués europeo y ruso /л/ duro.',
    examples: [
      { word: 'mal', lang: 'pt-PT', langLabel: 'Portugués PT', ipa: 'maɫ', audio: 'words/mal-pt.ogg', translation: 'malo / mal' },
      { word: 'milk', lang: 'en', langLabel: 'Inglés', ipa: 'mɪɫk', audio: 'words/milk-en.ogg', translation: 'leche' },
    ],
    audio: 'symbols/dark-l.ogg', contrasts: ['l'],
    week: 2, day: 13, wikiAudioName: 'Velarized_alveolar_lateral_approximant.ogg',
  },
  {
    id: 'ʔ', ipa: '/ʔ/', name: 'Oclusiva glotal',
    category: 'consonant',
    articulation: { type: 'consonant', place: 'glottal', manner: 'plosive', voicing: 'voiceless' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Cuerdas vocales cierran completamente y se sueltan. Alemán entre vocales.',
    examples: [
      { word: 'beachten', lang: 'de', langLabel: 'Alemán', ipa: 'bəˈʔaxtən', audio: 'words/beachten-de.ogg', translation: 'respetar / tener en cuenta' },
    ],
    audio: 'symbols/glottal-stop.ogg', contrasts: [],
    week: 2, day: 13, wikiAudioName: 'Glottal_stop.ogg',
  },

  // ─── SEMANA 3 — VOCALES ESPAÑOLAS (anclaje) ──────────────────────────────
  {
    id: 'a', ipa: '/a/', name: 'Vocal abierta central',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'open', backness: 'central', rounding: 'unrounded' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'casa', lang: 'es', langLabel: 'Español', ipa: 'ˈkasa', audio: 'words/casa-es.ogg' },
      { word: 'caro', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkaɾu', audio: 'words/caro-pt.ogg', translation: 'caro / querido' },
      { word: 'falar', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'faˈlaɾ', audio: 'words/falar-pt.ogg', translation: 'hablar' },
      { word: 'natal', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'naˈtaw', audio: 'words/natal-pt.ogg', translation: 'Navidad' },
      { word: 'cal', lang: 'ro', langLabel: 'Rumano', ipa: 'kal', audio: 'words/cal-ro.ogg', translation: 'caballo' },
      { word: 'casă', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈkasə', audio: 'words/casa-ro.ogg', translation: 'casa' },
      { word: 'carte', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈkartɛ', audio: 'words/carte-ro.ogg', translation: 'libro' },
    ],
    audio: 'symbols/a.ogg', contrasts: ['ɐ', 'æ'],
    week: 3, day: 15, wikiAudioName: 'Open_central_unrounded_vowel.ogg',
  },
  {
    id: 'e', ipa: '/e/', name: 'Vocal media anterior cerrada',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'close-mid', backness: 'front', rounding: 'unrounded' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'mesa', lang: 'es', langLabel: 'Español', ipa: 'ˈmesa', audio: 'words/mesa-es.ogg' },
      { word: 'mesa', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈmezɐ', audio: 'words/mesa-pt.ogg', translation: 'mesa' },
      { word: 'belo', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈbelu', audio: 'words/belo-pt.ogg', translation: 'bello' },
      { word: 'pele', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈpeli', audio: 'words/pele-pt.ogg', translation: 'piel' },
      { word: 'el', lang: 'ro', langLabel: 'Rumano', ipa: 'el', audio: 'words/el-ro.ogg', translation: 'él' },
      { word: 'verde', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈverdɛ', audio: 'words/verde-ro.ogg', translation: 'verde' },
      { word: 'fete', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈfetɛ', audio: 'words/fete-ro.ogg', translation: 'chicas / niñas' },
    ],
    audio: 'symbols/e.ogg', contrasts: ['ɛ', 'ɪ'],
    week: 3, day: 15, wikiAudioName: 'Close-mid_front_unrounded_vowel.ogg',
  },
  {
    id: 'i', ipa: '/i/', name: 'Vocal cerrada anterior',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'close', backness: 'front', rounding: 'unrounded' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'sí', lang: 'es', langLabel: 'Español', ipa: 'si', audio: 'words/si-es.ogg' },
      { word: 'si', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'si', audio: 'words/si-pt.ogg', translation: 'sí' },
      { word: 'fio', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈfiu', audio: 'words/fio-pt.ogg', translation: 'hilo' },
      { word: 'primo', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈpɾimu', audio: 'words/primo-pt.ogg', translation: 'primo' },
      { word: 'zi', lang: 'ro', langLabel: 'Rumano', ipa: 'zi', audio: 'words/zi-ro.ogg', translation: 'día' },
      { word: 'mic', lang: 'ro', langLabel: 'Rumano', ipa: 'mik', audio: 'words/mic-ro.ogg', translation: 'pequeño' },
      { word: 'film', lang: 'ro', langLabel: 'Rumano', ipa: 'film', audio: 'words/film-ro.ogg', translation: 'película' },
    ],
    audio: 'symbols/i.ogg', contrasts: ['ɨ', 'ɪ', 'y'],
    week: 3, day: 15, wikiAudioName: 'Close_front_unrounded_vowel.ogg',
  },
  {
    id: 'o', ipa: '/o/', name: 'Vocal media posterior cerrada redondeada',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'close-mid', backness: 'back', rounding: 'rounded' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'sol', lang: 'es', langLabel: 'Español', ipa: 'sol', audio: 'words/sol-es.ogg' },
      { word: 'avô', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'aˈvo', audio: 'words/avo-masc-pt.ogg', translation: 'abuelo paterno' },
      { word: 'voz', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'vos', audio: 'words/voz-pt.ogg', translation: 'voz' },
      { word: 'modo', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈmodu', audio: 'words/modo-pt.ogg', translation: 'modo' },
      { word: 'om', lang: 'ro', langLabel: 'Rumano', ipa: 'om', audio: 'words/om-ro.ogg', translation: 'hombre' },
      { word: 'nor', lang: 'ro', langLabel: 'Rumano', ipa: 'nor', audio: 'words/nor-ro.ogg', translation: 'nube' },
      { word: 'loc', lang: 'ro', langLabel: 'Rumano', ipa: 'lok', audio: 'words/loc-ro.ogg', translation: 'lugar' },
    ],
    audio: 'symbols/o.ogg', contrasts: ['ɔ', 'ʊ'],
    week: 3, day: 15, wikiAudioName: 'Close-mid_back_rounded_vowel.ogg',
  },
  {
    id: 'u', ipa: '/u/', name: 'Vocal cerrada posterior redondeada',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'close', backness: 'back', rounding: 'rounded' },
    difficulty: 1, isNewForSpanish: false,
    examples: [
      { word: 'tú', lang: 'es', langLabel: 'Español', ipa: 'tu', audio: 'words/tu-es.ogg' },
      { word: 'tu', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'tu', audio: 'words/tu-pt.ogg', translation: 'tú' },
      { word: 'luz', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'lus', audio: 'words/luz-pt.ogg', translation: 'luz' },
      { word: 'sul', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'suw', audio: 'words/sul-pt.ogg', translation: 'sur' },
      { word: 'tu', lang: 'ro', langLabel: 'Rumano', ipa: 'tu', audio: 'words/tu-ro.ogg', translation: 'tú' },
      { word: 'lume', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈlumɛ', audio: 'words/lume-ro.ogg', translation: 'mundo / gente' },
      { word: 'drum', lang: 'ro', langLabel: 'Rumano', ipa: 'drum', audio: 'words/drum-ro.ogg', translation: 'camino' },
    ],
    audio: 'symbols/u.ogg', contrasts: ['ʊ', 'y'],
    week: 3, day: 15, wikiAudioName: 'Close_back_rounded_vowel.ogg',
  },

  // ─── BLOQUE D — VOCALES NUEVAS ────────────────────────────────────────────
  {
    id: 'ɛ', ipa: '/ɛ/', name: 'Vocal media anterior abierta',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'open-mid', backness: 'front', rounding: 'unrounded' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Di "e" abriendo más la mandíbula. Crítico para portugués: diferencia avô/avó.',
    examples: [
      { word: 'café', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'kaˈfɛ', audio: 'words/cafe-pt.ogg', translation: 'café' },
      { word: 'pé', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'pɛ', audio: 'words/pe-pt.ogg', translation: 'pie' },
      { word: 'é', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ɛ', audio: 'words/e-pt.ogg', translation: 'es (él/ella es)' },
      { word: 'bere', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈbɛrɛ', audio: 'words/bere-ro.ogg', translation: 'cerveza' },
      { word: 'miere', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈmjɛrɛ', audio: 'words/miere-ro.ogg', translation: 'miel' },
      { word: 'pere', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈpɛrɛ', audio: 'words/pere-ro.ogg', translation: 'peras' },
      { word: 'père', lang: 'fr', langLabel: 'Francés', ipa: 'pɛʁ', audio: 'words/pere-fr.ogg', translation: 'padre' },
    ],
    audio: 'symbols/epsilon.ogg', contrasts: ['e', 'æ'],
    week: 3, day: 15, wikiAudioName: 'Open-mid_front_unrounded_vowel.ogg',
  },
  {
    id: 'ɔ', ipa: '/ɔ/', name: 'Vocal media posterior abierta redondeada',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'open-mid', backness: 'back', rounding: 'rounded' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Di "o" abriendo más la mandíbula manteniendo labios redondeados. Crítico para portugués.',
    examples: [
      { word: 'pó', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'pɔ', audio: 'words/po-pt.ogg', translation: 'polvo' },
      { word: 'avó', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'aˈvɔ', audio: 'words/avo-pt.ogg', translation: 'abuela' },
      { word: 'só', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'sɔ', audio: 'words/so-pt.ogg', translation: 'solo / apenas' },
      { word: 'port', lang: 'fr', langLabel: 'Francés', ipa: 'pɔʁ', audio: 'words/port-fr.ogg', translation: 'puerto' },
    ],
    audio: 'symbols/open-o.ogg', contrasts: ['o', 'ʊ'],
    week: 3, day: 15, wikiAudioName: 'Open-mid_back_rounded_vowel.ogg',
  },
  {
    id: 'ɐ', ipa: '/ɐ/', name: 'Vocal casi abierta central',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'near-open', backness: 'central', rounding: 'unrounded' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Relaja la /a/ española, casi como /ə/ pero un poco más baja. Es la "a" átona final del portugués.',
    examples: [
      { word: 'casa', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkazɐ', audio: 'words/casa-pt.ogg', translation: 'casa (la -a final es /ɐ/)' },
      { word: 'cama', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkɐmɐ', audio: 'words/cama-pt.ogg', translation: 'cama' },
      { word: 'alma', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈawmɐ', audio: 'words/alma-pt.ogg', translation: 'alma' },
      { word: 'amiga', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'aˈmiɡɐ', audio: 'words/amiga-pt.ogg', translation: 'amiga' },
    ],
    audio: 'symbols/near-open-central.ogg', contrasts: ['a', 'ə'],
    week: 3, day: 16, wikiAudioName: 'Near-open_central_unrounded_vowel.ogg',
  },
  {
    id: 'ə', ipa: '/ə/', name: 'Schwa (vocal media central)',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'mid', backness: 'central', rounding: 'unrounded' },
    difficulty: 3, isNewForSpanish: true,
    tip: 'Relaja completamente la boca, emite sonido vocálico mínimo. Es la "ă" del rumano y muy frecuente en inglés.',
    examples: [
      { word: 'mamă', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈmamə', audio: 'words/mama-ro.ogg', translation: 'mamá' },
      { word: 'fată', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈfatə', audio: 'words/fata-ro.ogg', translation: 'chica / niña' },
      { word: 'casă', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈkasə', audio: 'words/casa-ro.ogg', translation: 'casa' },
      { word: 'about', lang: 'en', langLabel: 'Inglés', ipa: 'əˈbaʊt', audio: 'words/about-en.ogg', translation: 'acerca de' },
      { word: 'de', lang: 'pt-PT', langLabel: 'Portugués PT', ipa: 'də', audio: 'words/de-pt.ogg', translation: 'de' },
    ],
    audio: 'symbols/schwa.ogg', contrasts: ['ɐ', 'ɨ'],
    week: 3, day: 16, wikiAudioName: 'Mid-central_vowel.ogg',
  },
  {
    id: 'ɨ', ipa: '/ɨ/', name: 'Vocal cerrada central no redondeada',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'close', backness: 'central', rounding: 'unrounded' },
    difficulty: 3, isNewForSpanish: true,
    tip: 'Di /i/ pero retrae la lengua hacia el centro de la boca, labios neutros. ¡El sonido que más cuesta a hispanohablantes! Es la "â/î" del rumano y la "ы" del ruso.',
    examples: [
      { word: 'român', lang: 'ro', langLabel: 'Rumano', ipa: 'roˈmɨn', audio: 'words/roman-ro.ogg', translation: 'rumano' },
      { word: 'în', lang: 'ro', langLabel: 'Rumano', ipa: 'ɨn', audio: 'words/in-ro.ogg', translation: 'en' },
      { word: 'mâine', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈmɨjnɛ', audio: 'words/maine-ro.ogg', translation: 'mañana' },
      { word: 'câine', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈkɨjnɛ', audio: 'words/caine-ro.ogg', translation: 'perro' },
      { word: 'ты', lang: 'ru', langLabel: 'Ruso', ipa: 'tɨ', audio: 'words/ty-ru.ogg', translation: 'tú' },
    ],
    audio: 'symbols/close-central.ogg', contrasts: ['i', 'ə', 'u'],
    week: 3, day: 16, wikiAudioName: 'Close_central_unrounded_vowel.ogg',
  },
  {
    id: 'ɪ', ipa: '/ɪ/', name: 'Vocal casi cerrada anterior',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'near-close', backness: 'front', rounding: 'unrounded' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Entre /i/ y /e/, más relajada que /i/. Muy común en inglés.',
    examples: [
      { word: 'ship', lang: 'en', langLabel: 'Inglés', ipa: 'ʃɪp', audio: 'words/ship-en.ogg', translation: 'barco' },
      { word: 'bit', lang: 'en', langLabel: 'Inglés', ipa: 'bɪt', audio: 'words/bit-en.ogg', translation: 'poco / bit' },
      { word: 'bitte', lang: 'de', langLabel: 'Alemán', ipa: 'ˈbɪtə', audio: 'words/bitte-de.ogg', translation: 'por favor' },
    ],
    audio: 'symbols/near-close-front.ogg', contrasts: ['i', 'e'],
    week: 3, day: 17, wikiAudioName: 'Near-close_near-front_unrounded_vowel.ogg',
  },
  {
    id: 'ʊ', ipa: '/ʊ/', name: 'Vocal casi cerrada posterior redondeada',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'near-close', backness: 'back', rounding: 'rounded' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Entre /u/ y /o/, más relajada. Muy común en inglés.',
    examples: [
      { word: 'book', lang: 'en', langLabel: 'Inglés', ipa: 'bʊk', audio: 'words/book-en.ogg', translation: 'libro' },
      { word: 'foot', lang: 'en', langLabel: 'Inglés', ipa: 'fʊt', audio: 'words/foot-en.ogg', translation: 'pie' },
      { word: 'Mutter', lang: 'de', langLabel: 'Alemán', ipa: 'ˈmʊtɐ', audio: 'words/mutter-de.ogg', translation: 'madre' },
    ],
    audio: 'symbols/near-close-back.ogg', contrasts: ['u', 'o'],
    week: 3, day: 17, wikiAudioName: 'Near-close_near-back_rounded_vowel.ogg',
  },
  {
    id: 'æ', ipa: '/æ/', name: 'Vocal anterior casi abierta',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'near-open', backness: 'front', rounding: 'unrounded' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Más anterior y baja que /ɛ/. Típica del inglés.',
    examples: [
      { word: 'cat', lang: 'en', langLabel: 'Inglés', ipa: 'kæt', audio: 'words/cat-en.ogg', translation: 'gato' },
      { word: 'bad', lang: 'en', langLabel: 'Inglés', ipa: 'bæd', audio: 'words/bad-en.ogg', translation: 'malo' },
      { word: 'man', lang: 'en', langLabel: 'Inglés', ipa: 'mæn', audio: 'words/man-en.ogg', translation: 'hombre' },
    ],
    audio: 'symbols/ash.ogg', contrasts: ['ɛ', 'a'],
    week: 3, day: 17, wikiAudioName: 'Near-open_front_unrounded_vowel.ogg',
  },
  {
    id: 'y', ipa: '/y/', name: 'Vocal cerrada anterior redondeada',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'close', backness: 'front', rounding: 'rounded' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Di /i/ y luego redondea los labios sin mover la lengua.',
    examples: [
      { word: 'tu', lang: 'fr', langLabel: 'Francés', ipa: 'ty', audio: 'words/tu-fr.ogg', translation: 'tú' },
      { word: 'lune', lang: 'fr', langLabel: 'Francés', ipa: 'lyn', audio: 'words/lune-fr.ogg', translation: 'luna' },
      { word: 'über', lang: 'de', langLabel: 'Alemán', ipa: 'ˈyːbɐ', audio: 'words/uber-de.ogg', translation: 'sobre / encima' },
    ],
    audio: 'symbols/y.ogg', contrasts: ['i', 'u'],
    week: 3, day: 18, wikiAudioName: 'Close_front_rounded_vowel.ogg',
  },
  {
    id: 'ø', ipa: '/ø/', name: 'Vocal media anterior redondeada',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'close-mid', backness: 'front', rounding: 'rounded' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Di /e/ y redondea los labios.',
    examples: [
      { word: 'peu', lang: 'fr', langLabel: 'Francés', ipa: 'pø', audio: 'words/peu-fr.ogg', translation: 'poco' },
      { word: 'feu', lang: 'fr', langLabel: 'Francés', ipa: 'fø', audio: 'words/feu-fr.ogg', translation: 'fuego' },
      { word: 'schön', lang: 'de', langLabel: 'Alemán', ipa: 'ʃøːn', audio: 'words/schon-de.ogg', translation: 'hermoso / bonito' },
    ],
    audio: 'symbols/oe.ogg', contrasts: ['e', 'œ', 'y'],
    week: 3, day: 18, wikiAudioName: 'Close-mid_front_rounded_vowel.ogg',
  },
  {
    id: 'œ', ipa: '/œ/', name: 'Vocal media anterior abierta redondeada',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'open-mid', backness: 'front', rounding: 'rounded' },
    difficulty: 2, isNewForSpanish: true,
    tip: 'Di /ɛ/ con labios redondeados.',
    examples: [
      { word: 'peur', lang: 'fr', langLabel: 'Francés', ipa: 'pœʁ', audio: 'words/peur-fr.ogg', translation: 'miedo' },
      { word: 'cœur', lang: 'fr', langLabel: 'Francés', ipa: 'kœʁ', audio: 'words/coeur-fr.ogg', translation: 'corazón' },
      { word: 'können', lang: 'de', langLabel: 'Alemán', ipa: 'ˈkœnən', audio: 'words/konnen-de.ogg', translation: 'poder' },
    ],
    audio: 'symbols/oe-open.ogg', contrasts: ['ø', 'ɛ'],
    week: 3, day: 18, wikiAudioName: 'Open-mid_front_rounded_vowel.ogg',
  },

  // ─── BLOQUE E — VOCALES NASALES ───────────────────────────────────────────
  {
    id: 'ɐ̃', ipa: '/ɐ̃/', name: 'A nasal portuguesa',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'near-open', backness: 'central', rounding: 'unrounded', nasal: true },
    difficulty: 3, isNewForSpanish: true,
    tip: 'Di /ɐ/ permitiendo que el aire salga simultáneamente por la nariz (baja el velo del paladar). La vocal más característica del portugués.',
    examples: [
      { word: 'irmã', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'iɾˈmɐ̃', audio: 'words/irma-pt.ogg', translation: 'hermana' },
      { word: 'pão', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'pɐ̃w̃', audio: 'words/pao-pt.ogg', translation: 'pan' },
      { word: 'maçã', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'maˈsɐ̃', audio: 'words/maca-pt.ogg', translation: 'manzana' },
    ],
    audio: 'symbols/a-nasal.ogg', contrasts: ['ɐ', 'a'],
    week: 3, day: 19, wikiAudioName: 'Nasalized_near-open_central_unrounded_vowel.ogg',
  },
  {
    id: 'ẽ', ipa: '/ẽ/', name: 'E nasal portuguesa',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'close-mid', backness: 'front', rounding: 'unrounded', nasal: true },
    difficulty: 3, isNewForSpanish: true,
    tip: 'Di /e/ nasalizada.',
    examples: [
      { word: 'bem', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'bẽj̃', audio: 'words/bem-pt.ogg', translation: 'bien' },
      { word: 'vento', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈvẽtu', audio: 'words/vento-pt.ogg', translation: 'viento' },
      { word: 'trem', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'tɾẽ', audio: 'words/trem-pt.ogg', translation: 'tren' },
    ],
    audio: 'symbols/e-nasal.ogg', contrasts: ['e', 'ẽ'],
    week: 3, day: 19, wikiAudioName: 'Nasalized_close-mid_front_unrounded_vowel.ogg',
  },
  {
    id: 'ĩ', ipa: '/ĩ/', name: 'I nasal portuguesa',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'close', backness: 'front', rounding: 'unrounded', nasal: true },
    difficulty: 3, isNewForSpanish: true,
    tip: 'Di /i/ nasalizada.',
    examples: [
      { word: 'fim', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'fĩ', audio: 'words/fim-pt.ogg', translation: 'fin / final' },
      { word: 'sim', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'sĩ', audio: 'words/sim-pt.ogg', translation: 'sí' },
      { word: 'vim', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'vĩ', audio: 'words/vim-pt.ogg', translation: 'vine (yo)' },
    ],
    audio: 'symbols/i-nasal.ogg', contrasts: ['i'],
    week: 3, day: 19, wikiAudioName: 'Nasalized_close_front_unrounded_vowel.ogg',
  },
  {
    id: 'õ', ipa: '/õ/', name: 'O nasal portuguesa',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'close-mid', backness: 'back', rounding: 'rounded', nasal: true },
    difficulty: 3, isNewForSpanish: true,
    tip: 'Di /o/ nasalizada.',
    examples: [
      { word: 'bom', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'bõ', audio: 'words/bom-pt.ogg', translation: 'bueno' },
      { word: 'ponto', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈpõtu', audio: 'words/ponto-pt.ogg', translation: 'punto' },
      { word: 'som', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'sõ', audio: 'words/som-pt.ogg', translation: 'sonido' },
    ],
    audio: 'symbols/o-nasal.ogg', contrasts: ['o'],
    week: 3, day: 19, wikiAudioName: 'Nasalized_close-mid_back_rounded_vowel.ogg',
  },
  {
    id: 'ũ', ipa: '/ũ/', name: 'U nasal portuguesa',
    category: 'vowel',
    articulation: { type: 'vowel', height: 'close', backness: 'back', rounding: 'rounded', nasal: true },
    difficulty: 3, isNewForSpanish: true,
    tip: 'Di /u/ nasalizada.',
    examples: [
      { word: 'um', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ũ', audio: 'words/um-pt.ogg', translation: 'un / uno' },
      { word: 'mundo', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈmũdu', audio: 'words/mundo-pt.ogg', translation: 'mundo' },
      { word: 'fundo', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈfũdu', audio: 'words/fundo-pt.ogg', translation: 'fondo / profundo' },
    ],
    audio: 'symbols/u-nasal.ogg', contrasts: ['u'],
    week: 3, day: 19, wikiAudioName: 'Nasalized_close_back_rounded_vowel.ogg',
  },
]

export default SYMBOLS

export function getSymbolById(id: string): IPASymbol | undefined {
  return SYMBOLS.find((s) => s.id === id)
}

export function getSymbolsByWeek(week: 1 | 2 | 3): IPASymbol[] {
  return SYMBOLS.filter((s) => s.week === week)
}

export function getSymbolsByCategory(category: SymbolCategory): IPASymbol[] {
  return SYMBOLS.filter((s) => s.category === category)
}

export function getNewSymbols(): IPASymbol[] {
  return SYMBOLS.filter((s) => s.isNewForSpanish)
}

export function langToSpeech(lang: string): string {
  const map: Record<string, string> = {
    'es': 'es-ES',
    'pt-BR': 'pt-BR',
    'pt-PT': 'pt-PT',
    'ro': 'ro-RO',
    'ru': 'ru-RU',
    'en': 'en-US',
    'de': 'de-DE',
    'fr': 'fr-FR',
    'it': 'it-IT',
  }
  return map[lang] ?? lang
}
