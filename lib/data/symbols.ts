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
  difficulty: 1 | 2 | 3           // ⭐ stars
  isNewForSpanish: boolean         // no existe en español
  examples: WordExample[]
  audio: string                    // path en /public/audio/symbols/
  tip?: string
  contrasts?: string[]             // IDs de símbolos con los que se confunde
  week: 1 | 2 | 3
  day: number
  wikiAudioName?: string           // nombre del archivo en Wikimedia Commons
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
      { word: 'pão', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'pɐ̃w̃', audio: 'words/pao-pt.ogg' },
      { word: 'pâine', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈpɨjne', audio: 'words/paine-ro.ogg' },
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
      { word: 'bom', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'bõ', audio: 'words/bom-pt.ogg' },
      { word: 'bun', lang: 'ro', langLabel: 'Rumano', ipa: 'bun', audio: 'words/bun-ro.ogg' },
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
      { word: 'tu', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'tu', audio: 'words/tu-pt.ogg' },
      { word: 'tu', lang: 'ro', langLabel: 'Rumano', ipa: 'tu', audio: 'words/tu-ro.ogg' },
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
      { word: 'dar', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'daɾ', audio: 'words/dar-pt.ogg' },
      { word: 'da', lang: 'ro', langLabel: 'Rumano', ipa: 'da', audio: 'words/da-ro.ogg' },
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
      { word: 'casa', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkazɐ', audio: 'words/casa-pt.ogg' },
      { word: 'как', lang: 'ru', langLabel: 'Ruso', ipa: 'kak', audio: 'words/kak-ru.ogg' },
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
      { word: 'gato', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈgatu', audio: 'words/gato-pt.ogg' },
      { word: 'gară', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈgarə', audio: 'words/gara-ro.ogg' },
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
      { word: 'mãe', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'mɐ̃j̃', audio: 'words/mae-pt.ogg' },
      { word: 'mama', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈmama', audio: 'words/mama-ro.ogg' },
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
      { word: 'não', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'nɐ̃w̃', audio: 'words/nao-pt.ogg' },
      { word: 'nu', lang: 'ro', langLabel: 'Rumano', ipa: 'nu', audio: 'words/nu-ro.ogg' },
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
      { word: 'banho', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈbɐɲu', audio: 'words/banho-pt.ogg' },
      { word: 'gnocchi', lang: 'it', langLabel: 'Italiano', ipa: 'ˈɲɔkki', audio: 'words/gnocchi-it.ogg' },
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
      { word: 'fato', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈfatu', audio: 'words/fato-pt.ogg' },
      { word: 'foc', lang: 'ro', langLabel: 'Rumano', ipa: 'fok', audio: 'words/foc-ro.ogg' },
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
      { word: 'sol', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'sɔw', audio: 'words/sol-pt.ogg' },
      { word: 'soare', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈswa.re', audio: 'words/soare-ro.ogg' },
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
      { word: 'хорошо', lang: 'ru', langLabel: 'Ruso', ipa: 'xɐˈroʂə', audio: 'words/horosho-ru.ogg' },
      { word: 'Bach', lang: 'de', langLabel: 'Alemán', ipa: 'bax', audio: 'words/bach-de.ogg' },
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
      { word: 'lua', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈluɐ', audio: 'words/lua-pt.ogg' },
      { word: 'lună', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈlunə', audio: 'words/luna-ro.ogg' },
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
      { word: 'roma', lang: 'it', langLabel: 'Italiano', ipa: 'ˈroːma', audio: 'words/roma-it.ogg' },
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
      { word: 'caro', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkaɾu', audio: 'words/caro-pt.ogg' },
      { word: 'roată', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈrwa.tə', audio: 'words/roata-ro.ogg' },
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
      { word: 'iate', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈjat͡ʃi', audio: 'words/iate-pt.ogg' },
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
      { word: 'quanto', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkwɐ̃tu', audio: 'words/quanto-pt.ogg' },
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
      { word: 'vida', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈvidɐ', audio: 'words/vida-pt.ogg' },
      { word: 'văd', lang: 'ro', langLabel: 'Rumano', ipa: 'vəd', audio: 'words/vad-ro.ogg' },
      { word: 'вода', lang: 'ru', langLabel: 'Ruso', ipa: 'vɐˈda', audio: 'words/voda-ru.ogg' },
      { word: 'very', lang: 'en', langLabel: 'Inglés', ipa: 'ˈvɛɾi', audio: 'words/very-en.ogg' },
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
      { word: 'casa', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkazɐ', audio: 'words/casa-pt.ogg' },
      { word: 'zi', lang: 'ro', langLabel: 'Rumano', ipa: 'zi', audio: 'words/zi-ro.ogg' },
      { word: 'завтра', lang: 'ru', langLabel: 'Ruso', ipa: 'ˈzaftrə', audio: 'words/zavtra-ru.ogg' },
      { word: 'zoo', lang: 'en', langLabel: 'Inglés', ipa: 'zuː', audio: 'words/zoo-en.ogg' },
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
      { word: 'xícara', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈʃikɐɾɐ', audio: 'words/xicara-pt.ogg' },
      { word: 'chave', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈʃavi', audio: 'words/chave-pt.ogg' },
      { word: 'șapte', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈʃapte', audio: 'words/sapte-ro.ogg' },
      { word: 'ship', lang: 'en', langLabel: 'Inglés', ipa: 'ʃɪp', audio: 'words/ship-en.ogg' },
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
      { word: 'jogo', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈʒogu', audio: 'words/jogo-pt.ogg' },
      { word: 'gente', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈʒẽtʃi', audio: 'words/gente-pt.ogg' },
      { word: 'jos', lang: 'ro', langLabel: 'Rumano', ipa: 'ʒos', audio: 'words/jos-ro.ogg' },
      { word: 'je', lang: 'fr', langLabel: 'Francés', ipa: 'ʒə', audio: 'words/je-fr.ogg' },
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
      { word: 'tia', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈtʃiɐ', audio: 'words/tia-pt.ogg' },
      { word: 'cer', lang: 'ro', langLabel: 'Rumano', ipa: 'tʃer', audio: 'words/cer-ro.ogg' },
      { word: 'chip', lang: 'en', langLabel: 'Inglés', ipa: 'tʃɪp', audio: 'words/chip-en.ogg' },
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
      { word: 'dia', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈdʒiɐ', audio: 'words/dia-pt.ogg' },
      { word: 'ger', lang: 'ro', langLabel: 'Rumano', ipa: 'dʒer', audio: 'words/ger-ro.ogg' },
      { word: 'jeep', lang: 'en', langLabel: 'Inglés', ipa: 'dʒiːp', audio: 'words/jeep-en.ogg' },
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
      { word: 'țară', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈtsarə', audio: 'words/tara-ro.ogg' },
      { word: 'Zeit', lang: 'de', langLabel: 'Alemán', ipa: 'tsait', audio: 'words/zeit-de.ogg' },
      { word: 'цена', lang: 'ru', langLabel: 'Ruso', ipa: 'tsɨˈna', audio: 'words/cena-ru.ogg' },
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
      { word: 'zero', lang: 'it', langLabel: 'Italiano', ipa: 'ˈdzɛro', audio: 'words/zero-it.ogg' },
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
      { word: 'sing', lang: 'en', langLabel: 'Inglés', ipa: 'sɪŋ', audio: 'words/sing-en.ogg' },
      { word: 'singen', lang: 'de', langLabel: 'Alemán', ipa: 'ˈzɪŋən', audio: 'words/singen-de.ogg' },
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
      { word: 'filho', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈfiʎu', audio: 'words/filho-pt.ogg' },
      { word: 'velho', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈvɛʎu', audio: 'words/velho-pt.ogg' },
      { word: 'figlio', lang: 'it', langLabel: 'Italiano', ipa: 'ˈfiʎʎo', audio: 'words/figlio-it.ogg' },
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
      { word: 'rato', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈhatu', audio: 'words/rato-pt.ogg' },
      { word: 'hello', lang: 'en', langLabel: 'Inglés', ipa: 'həˈloʊ', audio: 'words/hello-en.ogg' },
      { word: 'Hund', lang: 'de', langLabel: 'Alemán', ipa: 'hʊnt', audio: 'words/hund-de.ogg' },
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
      { word: 'this', lang: 'en', langLabel: 'Inglés', ipa: 'ðɪs', audio: 'words/this-en.ogg' },
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
      { word: 'think', lang: 'en', langLabel: 'Inglés', ipa: 'θɪŋk', audio: 'words/think-en.ogg' },
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
      { word: 'Paris', lang: 'fr', langLabel: 'Francés', ipa: 'paˈʁi', audio: 'words/paris-fr.ogg' },
      { word: 'rot', lang: 'de', langLabel: 'Alemán', ipa: 'ʁoːt', audio: 'words/rot-de.ogg' },
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
      { word: 'Bach', lang: 'de', langLabel: 'Alemán (variante)', ipa: 'bax~baχ', audio: 'words/bach-de.ogg' },
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
      { word: 'mal', lang: 'pt-PT', langLabel: 'Portugués PT', ipa: 'maɫ', audio: 'words/mal-pt.ogg' },
      { word: 'milk', lang: 'en', langLabel: 'Inglés', ipa: 'mɪɫk', audio: 'words/milk-en.ogg' },
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
      { word: 'beachten', lang: 'de', langLabel: 'Alemán', ipa: 'bəˈʔaxtən', audio: 'words/beachten-de.ogg' },
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
      { word: 'carro', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkahu', audio: 'words/carro-pt.ogg' },
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
      { word: 'mesa', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈmezɐ', audio: 'words/mesa-pt.ogg' },
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
      { word: 'si', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'si', audio: 'words/si-pt.ogg' },
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
      { word: 'om', lang: 'ro', langLabel: 'Rumano', ipa: 'om', audio: 'words/om-ro.ogg' },
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
      { word: 'tu', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'tu', audio: 'words/tu-pt.ogg' },
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
      { word: 'café', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'kaˈfɛ', audio: 'words/cafe-pt.ogg' },
      { word: 'pé', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'pɛ', audio: 'words/pe-pt.ogg' },
      { word: 'père', lang: 'fr', langLabel: 'Francés', ipa: 'pɛʁ', audio: 'words/pere-fr.ogg' },
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
      { word: 'pó', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'pɔ', audio: 'words/po-pt.ogg' },
      { word: 'avó', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'aˈvɔ', audio: 'words/avo-pt.ogg' },
      { word: 'port', lang: 'fr', langLabel: 'Francés', ipa: 'pɔʁ', audio: 'words/port-fr.ogg' },
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
      { word: 'casa', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkazɐ', audio: 'words/casa-pt.ogg' },
      { word: 'cama', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkɐmɐ', audio: 'words/cama-pt.ogg' },
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
      { word: 'mamă', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈmamə', audio: 'words/mama-ro.ogg' },
      { word: 'about', lang: 'en', langLabel: 'Inglés', ipa: 'əˈbaʊt', audio: 'words/about-en.ogg' },
      { word: 'de', lang: 'pt-PT', langLabel: 'Portugués PT', ipa: 'də', audio: 'words/de-pt.ogg' },
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
      { word: 'român', lang: 'ro', langLabel: 'Rumano', ipa: 'roˈmɨn', audio: 'words/roman-ro.ogg' },
      { word: 'în', lang: 'ro', langLabel: 'Rumano', ipa: 'ɨn', audio: 'words/in-ro.ogg' },
      { word: 'ты', lang: 'ru', langLabel: 'Ruso', ipa: 'tɨ', audio: 'words/ty-ru.ogg' },
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
      { word: 'ship', lang: 'en', langLabel: 'Inglés', ipa: 'ʃɪp', audio: 'words/ship-en.ogg' },
      { word: 'bitte', lang: 'de', langLabel: 'Alemán', ipa: 'ˈbɪtə', audio: 'words/bitte-de.ogg' },
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
      { word: 'book', lang: 'en', langLabel: 'Inglés', ipa: 'bʊk', audio: 'words/book-en.ogg' },
      { word: 'Mutter', lang: 'de', langLabel: 'Alemán', ipa: 'ˈmʊtɐ', audio: 'words/mutter-de.ogg' },
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
      { word: 'cat', lang: 'en', langLabel: 'Inglés', ipa: 'kæt', audio: 'words/cat-en.ogg' },
      { word: 'bad', lang: 'en', langLabel: 'Inglés', ipa: 'bæd', audio: 'words/bad-en.ogg' },
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
      { word: 'tu', lang: 'fr', langLabel: 'Francés', ipa: 'ty', audio: 'words/tu-fr.ogg' },
      { word: 'über', lang: 'de', langLabel: 'Alemán', ipa: 'ˈyːbɐ', audio: 'words/uber-de.ogg' },
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
      { word: 'peu', lang: 'fr', langLabel: 'Francés', ipa: 'pø', audio: 'words/peu-fr.ogg' },
      { word: 'schön', lang: 'de', langLabel: 'Alemán', ipa: 'ʃøːn', audio: 'words/schon-de.ogg' },
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
      { word: 'peur', lang: 'fr', langLabel: 'Francés', ipa: 'pœʁ', audio: 'words/peur-fr.ogg' },
      { word: 'können', lang: 'de', langLabel: 'Alemán', ipa: 'ˈkœnən', audio: 'words/konnen-de.ogg' },
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
      { word: 'cama', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkɐ̃mɐ', audio: 'words/cama-pt.ogg' },
      { word: 'irmã', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'iɾˈmɐ̃', audio: 'words/irma-pt.ogg' },
      { word: 'pão', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'pɐ̃w̃', audio: 'words/pao-pt.ogg' },
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
      { word: 'bem', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'bẽj̃', audio: 'words/bem-pt.ogg' },
      { word: 'vento', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈvẽtu', audio: 'words/vento-pt.ogg' },
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
      { word: 'fim', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'fĩ', audio: 'words/fim-pt.ogg' },
      { word: 'sim', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'sĩ', audio: 'words/sim-pt.ogg' },
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
      { word: 'bom', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'bõ', audio: 'words/bom-pt.ogg' },
      { word: 'ponto', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈpõtu', audio: 'words/ponto-pt.ogg' },
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
      { word: 'um', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ũ', audio: 'words/um-pt.ogg' },
      { word: 'mundo', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈmũdu', audio: 'words/mundo-pt.ogg' },
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
