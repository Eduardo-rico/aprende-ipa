export interface MinimalPair {
  id: string
  symbolA: string
  symbolB: string
  wordA: { word: string; lang: string; langLabel: string; ipa: string; audio: string }
  wordB: { word: string; lang: string; langLabel: string; ipa: string; audio: string }
  confusionNote: string
}

const MINIMAL_PAIRS: MinimalPair[] = [
  {
    id: 'b-v',
    symbolA: 'b', symbolB: 'v',
    wordA: { word: 'boca', lang: 'es', langLabel: 'Español', ipa: 'ˈboka', audio: 'words/boca-es.ogg' },
    wordB: { word: 'vida', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈvidɐ', audio: 'words/vida-pt.ogg' },
    confusionNote: '/v/ es labiodental (dientes tocan labio), /b/ es bilabial (labios se cierran)',
  },
  {
    id: 's-z',
    symbolA: 's', symbolB: 'z',
    wordA: { word: 'sol', lang: 'es', langLabel: 'Español', ipa: 'sol', audio: 'words/sol-es.ogg' },
    wordB: { word: 'zi', lang: 'ro', langLabel: 'Rumano', ipa: 'zi', audio: 'words/zi-ro.ogg' },
    confusionNote: '/z/ vibra las cuerdas vocales, /s/ no',
  },
  {
    id: 'sh-tsh',
    symbolA: 'ʃ', symbolB: 'tʃ',
    wordA: { word: 'xícara', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈʃikɐɾɐ', audio: 'words/xicara-pt.ogg' },
    wordB: { word: 'chico', lang: 'es', langLabel: 'Español', ipa: 'ˈtʃiko', audio: 'words/chico-es.ogg' },
    confusionNote: '/tʃ/ tiene oclusión inicial /t/, /ʃ/ es solo fricativa',
  },
  {
    id: 'zh-dzh',
    symbolA: 'ʒ', symbolB: 'dʒ',
    wordA: { word: 'jogo', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈʒogu', audio: 'words/jogo-pt.ogg' },
    wordB: { word: 'dia', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈdʒiɐ', audio: 'words/dia-pt.ogg' },
    confusionNote: '/dʒ/ tiene oclusión inicial /d/, /ʒ/ es solo fricativa',
  },
  {
    id: 'e-epsilon',
    symbolA: 'e', symbolB: 'ɛ',
    wordA: { word: 'mesa', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈmezɐ', audio: 'words/mesa-pt.ogg' },
    wordB: { word: 'pé', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'pɛ', audio: 'words/pe-pt.ogg' },
    confusionNote: '/ɛ/ es más abierta, mandíbula más baja',
  },
  {
    id: 'o-open-o',
    symbolA: 'o', symbolB: 'ɔ',
    wordA: { word: 'avô', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'aˈvo', audio: 'words/avo-masc-pt.ogg' },
    wordB: { word: 'avó', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'aˈvɔ', audio: 'words/avo-pt.ogg' },
    confusionNote: '/ɔ/ más abierta (abuela), /o/ más cerrada (abuelo) — diferencia de significado',
  },
  {
    id: 'a-schwa',
    symbolA: 'a', symbolB: 'ɐ',
    wordA: { word: 'casa', lang: 'es', langLabel: 'Español', ipa: 'ˈkasa', audio: 'words/casa-es.ogg' },
    wordB: { word: 'casa', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈkazɐ', audio: 'words/casa-pt.ogg' },
    confusionNote: '/ɐ/ es más alta, más central y más relajada que /a/',
  },
  {
    id: 'schwa-close-central',
    symbolA: 'ə', symbolB: 'ɨ',
    wordA: { word: 'mamă', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈmamə', audio: 'words/mama-ro.ogg' },
    wordB: { word: 'în', lang: 'ro', langLabel: 'Rumano', ipa: 'ɨn', audio: 'words/in-ro.ogg' },
    confusionNote: '/ɨ/ es alta (como /i/ pero central), /ə/ es media',
  },
  {
    id: 'i-close-central',
    symbolA: 'i', symbolB: 'ɨ',
    wordA: { word: 'sí', lang: 'es', langLabel: 'Español', ipa: 'si', audio: 'words/si-es.ogg' },
    wordB: { word: 'ты', lang: 'ru', langLabel: 'Ruso', ipa: 'tɨ', audio: 'words/ty-ru.ogg' },
    confusionNote: '/ɨ/ es central (lengua al centro), /i/ es anterior (lengua adelante)',
  },
  {
    id: 'h-x',
    symbolA: 'h', symbolB: 'x',
    wordA: { word: 'hello', lang: 'en', langLabel: 'Inglés', ipa: 'həˈloʊ', audio: 'words/hello-en.ogg' },
    wordB: { word: 'jota', lang: 'es', langLabel: 'Español', ipa: 'ˈxota', audio: 'words/jota-es.ogg' },
    confusionNote: '/x/ es velar (fricción en velo), /h/ es glotal (sin fricción real)',
  },
  {
    id: 'r-flap',
    symbolA: 'r', symbolB: 'ɾ',
    wordA: { word: 'perro', lang: 'es', langLabel: 'Español', ipa: 'ˈpero', audio: 'words/perro-es.ogg' },
    wordB: { word: 'pero', lang: 'es', langLabel: 'Español', ipa: 'ˈpeɾo', audio: 'words/pero-es.ogg' },
    confusionNote: '/r/ tiene múltiples vibraciones, /ɾ/ es un solo golpe rápido',
  },
  {
    id: 'f-v',
    symbolA: 'f', symbolB: 'v',
    wordA: { word: 'fato', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈfatu', audio: 'words/fato-pt.ogg' },
    wordB: { word: 'vida', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈvidɐ', audio: 'words/vida-pt.ogg' },
    confusionNote: '/v/ vibra cuerdas vocales, /f/ no',
  },
  {
    id: 'n-eng',
    symbolA: 'n', symbolB: 'ŋ',
    wordA: { word: 'no', lang: 'es', langLabel: 'Español', ipa: 'no', audio: 'words/no-es.ogg' },
    wordB: { word: 'sing', lang: 'en', langLabel: 'Inglés', ipa: 'sɪŋ', audio: 'words/sing-en.ogg' },
    confusionNote: '/ŋ/ el dorso toca el velo (más atrás), /n/ la punta toca los alvéolos',
  },
  {
    id: 'l-pal-lat',
    symbolA: 'l', symbolB: 'ʎ',
    wordA: { word: 'luna', lang: 'es', langLabel: 'Español', ipa: 'ˈluna', audio: 'words/luna-es.ogg' },
    wordB: { word: 'filho', lang: 'pt-BR', langLabel: 'Portugués BR', ipa: 'ˈfiʎu', audio: 'words/filho-pt.ogg' },
    confusionNote: '/ʎ/ el dorso toca el paladar duro, /l/ la punta toca los alvéolos',
  },
  {
    id: 'ts-s',
    symbolA: 'ts', symbolB: 's',
    wordA: { word: 'țară', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈtsarə', audio: 'words/tara-ro.ogg' },
    wordB: { word: 'soare', lang: 'ro', langLabel: 'Rumano', ipa: 'ˈswa.re', audio: 'words/soare-ro.ogg' },
    confusionNote: '/ts/ tiene oclusión /t/ al inicio, /s/ es solo fricativa continua',
  },
]

export default MINIMAL_PAIRS
