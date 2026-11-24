export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'La storia', href: '#storia' },
  { label: 'La mostra', href: '#monastero' },
  { label: 'Dove siamo', href: '#dove-siamo' },
  { label: 'Virtual tour', href: '#vivi' },
];

export const features = [
  {
    icon: '/img/icon-architettura.svg',
    iconW: 66,
    title: ['Architettura', 'e memoria'],
    text: 'Dalla fortezza medievale al cantiere tardogotico: archi a sesto acuto e volte a crociera raccontano le origini ascetiche del primo cenobio messinese.',
  },
  {
    icon: '/img/icon-chiostri.svg',
    iconW: 66,
    title: ['I chiostri', 'e il Rinascimento'],
    text: "L'impronta di Giacomo Del Duca riorganizza lo spazio intorno ai due grandi chiostri, tra eleganza classica e l'enigmatica presenza della Cuba.",
  },
  {
    icon: '/img/icon-paesaggio.svg',
    iconW: 31,
    title: ['Paesaggio', 'e futuro'],
    text: "Dai vigneti del Faro DOC alla scuola agraria e all'Enoteca Provinciale: la memoria storica diventa presidio attivo del territorio e dell'innovazione.",
  },
];

// side: dove sta l'immagine. dark: testo scuro su fondo chiaro.
export const timeline = [
  {
    bg: '#6b6358',
    side: 'left',
    img: '/img/tl-origini.png',
    date: '1361 - 1363',
    era: 'Medioevo XIV–XV sec.',
    title: ['Le origini'],
    body: [
      'Nel pieno Trecento, quattro esponenti dell\'aristocrazia messinese rinunciano alla vita urbana per ritirarsi in ascesi nella contrada di Calonerò. Il nome, dal greco bizantino καλό-νερόν ("buona acqua"), ne rivela la vocazione: le sue sorgenti erano note da secoli ai naviganti dello Stretto, che vi approdavano per rifornirsi di acqua potabile.',
      "Tra il 1361 e il 1363 nasce il primo nucleo monastico, posto sotto la protezione di San Placido, sulle rovine del Castello dei Vinciguerra d'Aragona. Da questa eredità nasce un'architettura austera e turrrita: muri spessi, feritoie, un atrio quadrato con archi gotici. Nel chiostro nord sopravvivono elementi medievali originali, mentre sulla parete orientale campeggia lo stemma della famiglia Urso, feudatari del sito in epoca sveva: «d'azzurro all'orso d'oro».",
    ],
  },
  {
    bg: '#4a3f35',
    side: 'right',
    img: '/img/tl-costruzione.png',
    date: '1486',
    era: 'Tardogotico XV sec.',
    title: ['La costruzione'],
    body: [
      "Verso la fine del XIV secolo la comunità crescente rende il primo cenobio inadeguato. Nel 1394 i monaci si trasferiscono nel feudo di Santa Domenica, donato dai conti Vinciguerra d'Aragona. Il cantiere della nuova abbazia, avviato già nel 1376, subisce una lunga interruzione per dispute giurisdizionali con l'Arcivescovo di Messina, e trova compimento nel 1486 sotto la guida di Fra Placido Campolo.",
      "L'edificio si afferma come uno dei vertici dell'architettura gotico-catalana nella Sicilia orientale: un portale monumentale con colonnine polistili e capitelli a foglie uncinate, un arco a sesto ribassato con estradosso cuspidato. All'estremità orientale, la celebre Sala Gotica a pianta quadrata con volta a crociera costolonata testimonia ancora oggi l'eccellenza delle maestranze tardomedievali.",
    ],
  },
  {
    bg: '#b08a4d',
    side: 'left',
    img: '/img/tl-oro.png',
    date: '1589 - 1608',
    era: 'Cinquecento XVI–XVII',
    title: ["Il secolo d'oro"],
    wide: true,
    body: [
      "Il Cinquecento segna l'ingresso del monastero nella grande dimensione europea. Nel 1516 Papa Giulio II lo aggrega alla Congregazione Cassinese. Nel 1535 Carlo V, di ritorno da Tunisi, vi soggiorna: un fulmine colpisce il suo maggiordomo nella torre medievale, e a memoria dell'evento nel 1605 furono collocati un busto marmoreo dell'imperatore e un bassorilievo del servitore deceduto.",
      "Tra il 1589 e il 1608 l'architetto Giacomo Del Duca, allievo di Michelangelo, riprogetta il complesso attorno a due monumentali chiostri porticati. Nel rinnovamento trova posto anche la Cuba, antico tempietto bizantino preesistente sul sito, con l'iscrizione «D.P.A. 1582», formula devozionale di lode e protezione spirituale.",
    ],
  },
  {
    bg: '#ccbb8e',
    side: 'right',
    dark: true,
    img: '/img/tl-rilievo.webp',
    imgNatural: true, // orizzontale: proporzioni originali, niente taglio
    date: '1867',
    era: 'Metà XIX secolo',
    title: ['Il rilievo'],
    body: [
      "Con le leggi eversive del 1866 il Regno d'Italia sopprime gli ordini religiosi e i monaci benedettini abbandonano il complesso. Il 31 luglio 1867 gli ingegneri del Genio Civile Schioppo e Belfiore completano un capillare rilievo dell'intero monastero, restituito in tre grandi tavole a china e acquerello in scala 1:200, oggi custodite nell'Archivio di Stato di Roma.",
      "Le tavole documentano piante di ogni livello, con minuziose legende che nominano la funzione storica di ogni ambiente, dalle celle ai granai, dai refettori alle officine. Segnalano già un'«antica chiesetta in rovina» e murature medievali aggredite dal tempo: rimangono l'unica testimonianza grafica del complesso prima delle trasformazioni di fine Ottocento e delle ferite che il Novecento avrebbe inflitto all'edificio.",
    ],
  },
  {
    bg: '#8b3b2c',
    side: 'left',
    img: '/img/tl-ferita.png',
    date: '1908',
    era: 'Il sisma 1908',
    title: ['La ferita', 'e i frammenti', 'dispersi'],
    body: [
      "All'alba del 28 dicembre 1908 il terremoto che distrugge Messina e Reggio Calabria si abbatte con forza anche sui costoni di Calonerò. I danni più gravi colpiscono il braccio orientale dell'abbazia: le murature portanti cedono e l'intero secondo piano collassa, riducendosi a macerie.",
      'Le scosse di assestamento aggravano il quadro, lesionando irreparabilmente le campate rinascimentali e aprendo squarci profondi negli ambienti storici.\nPer la prima volta nella sua lunga storia, il monastero perde la propria integrità spaziale e funzionale, trasformandosi in una rovina isolata lungo la collina.',
    ],
  },
  {
    bg: '#5b5650',
    side: 'right',
    img: '/img/tl-ricostruzione.png',
    date: '1912 - 1920',
    era: 'XX secolo',
    title: ['La ricostruzione'],
    tight: true,
    body: [
      "Durante la ricostruzione, protrattasi fino al 1925, le autorità rinunciarono al ripristino del secondo piano orientale, optando per il suo smantellamento. Nel processo furono recuperate due grandi finestre scolpite dai prospetti del complesso: della prima si persero le tracce; la seconda venne reimpiegata nel 1932 come portale d'accesso dell'Oratorio della Pace, nel centro di Messina.",
      "Si tratta di un raffinato portale in pietra della stagione di ampliamento rinascimentale, la cui architrave conserva ancora l'iscrizione originaria: FIRMITER AEDIFICATA / MDCVIIII (1609).",
    ],
  },
  {
    bg: '#c23b2c',
    side: 'left',
    img: '/img/tl-scuola.png',
    date: '1940',
    era: 'XX secolo',
    title: ['La scuola', 'e il muro d’ascolto'],
    tight: true,
    titleWide: true,
    body: [
      "Acquistato dalla Provincia di Messina nel 1898, il monastero diventa nel 1901 sede della Regia Scuola Pratica di Agricoltura, poi Istituto Tecnico Agrario nel 1946. L'azienda agricola annessa si estende su circa 30 ettari di vigneti, oliveti e agrumeti, con una cantina ricavata negli antichi magazzini monastici e un Museo dell'Olio e del Vino allestito in collaborazione con l'Enoteca Provinciale.",
      "Tra il 1940 e il 1943 la Regia Marina installa nell'area dei vigneti un muro di ascolto acustico parabolico in cemento armato, per la localizzazione passiva dei velivoli sullo Stretto. Il manufatto è ancora visibile tra i filari, ulteriore strato nella lunga stratificazione storica del complesso.",
    ],
  },
  {
    bg: '#285f74',
    side: 'right',
    img: '/img/tl-presente.png',
    date: '2020-2026',
    era: 'Le ristrutturazioni ai giorni nostri',
    title: ['Presente'],
    body: [
      "Grazie ai finanziamenti PNRR, è stato ultimato un cantiere di restauro volto a risolvere i gravi problemi strutturali dei chiostri monumentali. Le ventotto colonne in pietra calcarea del chiostro meridionale presentavano lesioni e cedimenti causati dall'eccessivo carico: per consolidarle senza alterare la materia storica, i progettisti hanno applicato il sistema CAM, avvolgendo i fusti con sottili nastri in acciaio inossidabile ad alta resistenza che esercitano una pressione costante e stabilizzante.",
      "Durante i lavori è riemersa sotto uno strato di cemento la pavimentazione originale in cotto: le mattonelle esagonali, simbolo dell'armonia tra il cerchio divino e il quadrato terreno, confermano come la terracotta fosse l'elemento di raccordo tra il colonnato e i giardini dei chiostri rinascimentali.",
    ],
  },
];

export const viviImages = [
  '/img/vivi-1.png',
  '/img/vivi-2.png',
  '/img/vivi-3.png',
  '/img/vivi-4.png',
  '/img/vivi-5.png',
];
