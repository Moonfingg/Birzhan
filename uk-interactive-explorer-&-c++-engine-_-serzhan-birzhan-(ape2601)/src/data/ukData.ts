/**
 * Pure factual database for the United Kingdom.
 * Strict, verified data without redundant prose.
 */

export interface UKCountry {
  id: 'england' | 'scotland' | 'wales' | 'northern-ireland';
  name: string;
  nativeName: string;
  flagSymbol: string;
  capital: string;
  population: string;
  populationRaw: number; // in millions
  areaKm2: number;
  densityPerKm2: number;
  gdpSharePercent: number;
  legislature: string;
  devolutionYear: string;
  largestCity: string;
  highestPoint: string;
  highestPointElevationM: number;
  nationalDay: string;
  accentColor: string;
  summaryPoints: string[];
  keyIndustries: string[];
  majorCities: string[];
}

export interface UKCity {
  id: string;
  name: string;
  country: 'england' | 'scotland' | 'wales' | 'northern-ireland';
  population: string;
  role: string;
  coordinates: { x: number; y: number }; // SVG map percentage coordinates [0..100]
  keyFacts: string[];
}

export interface UKGeographyMilestone {
  title: string;
  value: string;
  detail: string;
  location: string;
  category: 'peak' | 'river' | 'lake' | 'coast' | 'monument';
}

export const UK_OVERVIEW = {
  fullName: "United Kingdom of Great Britain and Northern Ireland",
  shortName: "United Kingdom (UK)",
  capital: "London",
  population: "67.8 млн чел. (2024–2026)",
  area: "242,495 км²",
  gdpNominal: "$3.49 трлн (6-е место в мире)",
  gdpPerCapita: "$51,075",
  currency: "Британский фунт стерлингов (GBP, £)",
  government: "Парламентская конституционная монархия",
  monarch: "Карл III (Charles III)",
  primeMinister: "Кир Стармер (Keir Starmer)",
  officialLanguage: "Английский (региональные: валлийский, шотландский гэльский, ирландский)",
  timeZone: "GMT / UTC+0 (BST летом UTC+1)",
  callingCode: "+44",
  topDomain: ".uk",
  membership: ["ООН (Постоянный член СБ)", "G7", "НАТО", "Содружество наций", "ОЭСР"]
};

export const UK_COUNTRIES: UKCountry[] = [
  {
    id: 'england',
    name: 'Англия (England)',
    nativeName: 'England',
    flagSymbol: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    capital: 'Лондон (London)',
    population: '56.5 млн',
    populationRaw: 56.5,
    areaKm2: 130278,
    densityPerKm2: 434,
    gdpSharePercent: 84.5,
    legislature: 'Парламент Великобритании (Вестминстер)',
    devolutionYear: 'Прямое управление Парламентом Великобритании',
    largestCity: 'Лондон (8.9 млн)',
    highestPoint: 'Скафелл-Пайк (Scafell Pike)',
    highestPointElevationM: 978,
    nationalDay: '23 апреля (День Святого Георгия)',
    accentColor: '#e11d48',
    summaryPoints: [
      'Занимает 53.7% территории Великобритании и концентрирует 84% населения.',
      'Лондон — глобальный финансовый центр (City of London), лидер по валютным операциям и финтеху.',
      'Родина промышленной революции XVIII–XIX вв. (Манчестер, Бирмингем, Лидс).',
      'Мировые научно-образовательные кластеры: Oxford, Cambridge, Imperial College London.'
    ],
    keyIndustries: ['Финансовые услуги & Финтех', 'Фармацевтика & Биотех (AstraZeneca, GSK)', 'Аэрокосмическая отрасль (Rolls-Royce)', 'IT & Искусственный интеллект (DeepMind, ARM)'],
    majorCities: ['Лондон', 'Манчестер', 'Бирмингем', 'Лидс', 'Ливерпуль', 'Оксфорд', 'Кембридж', 'Бристоль']
  },
  {
    id: 'scotland',
    name: 'Шотландия (Scotland)',
    nativeName: 'Alba',
    flagSymbol: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    capital: 'Эдинбург (Edinburgh)',
    population: '5.48 млн',
    populationRaw: 5.48,
    areaKm2: 77933,
    densityPerKm2: 70,
    gdpSharePercent: 7.8,
    legislature: 'Парламент Шотландии (Holyrood)',
    devolutionYear: '1999 г. (Шотландский закон 1998)',
    largestCity: 'Глазго (Glasgow, 635 тыс.)',
    highestPoint: 'Бен-Невис (Ben Nevis, высшая точка всей Великобритании)',
    highestPointElevationM: 1345,
    nationalDay: '30 ноября (День Святого Андрея)',
    accentColor: '#0284c7',
    summaryPoints: [
      'Занимает северную треть острова Великобритания (32.1% всей площади королевства).',
      'Имеет собственную независимую правовую (Scots law) и образовательную систему.',
      'Европейский лидер в оффшорной ветроэнергетике и гидрогенерации.',
      'Эдинбург — второй по величине финансовый центр Великобритании после Лондона.'
    ],
    keyIndustries: ['Нефть и газ Северного моря (Абердин)', 'Возобновляемая ветроэнергетика', 'Шотландский виски (Scotch Whisky, экспорт £5.6 млрд)', 'Наукоемкое приборостроение и космонавтика (Glasgow nanosatellites)'],
    majorCities: ['Эдинбург', 'Глазго', 'Абердин', 'Данди', 'Инвернесс']
  },
  {
    id: 'wales',
    name: 'Уэльс (Wales)',
    nativeName: 'Cymru',
    flagSymbol: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    capital: 'Кардифф (Cardiff)',
    population: '3.11 млн',
    populationRaw: 3.11,
    areaKm2: 20779,
    densityPerKm2: 150,
    gdpSharePercent: 3.4,
    legislature: 'Валлийский парламент (Senedd Cymru)',
    devolutionYear: '1999 г. (Закон об управлении Уэльсом)',
    largestCity: 'Кардифф (362 тыс.)',
    highestPoint: 'Ир-Виддва / Сноудон (Yr Wyddfa / Snowdon)',
    highestPointElevationM: 1085,
    nationalDay: '1 марта (День Святого Давида)',
    accentColor: '#16a34a',
    summaryPoints: [
      'Официально двуязычный регион: валлийский язык (Cymraeg) имеет равный правовой статус с английским.',
      'Исторический центр добычи угля и выплавки стали, трансформированный в передовое машиностроение.',
      'Производство композитных крыльев для всех лайнеров Airbus на заводе в Бротоне (Broughton).',
      'Береговая линия протяженностью 2,700 км с развитым экологическим и морским туризмом.'
    ],
    keyIndustries: ['Аэрокосмическое производство (Airbus Wings)', 'Автомобилестроение & Электромоторы', 'Металлургия высоких марок (Port Talbot)', 'Зеленая энергетика и водородные технологии'],
    majorCities: ['Кардифф', 'Суонси', 'Ньюпорт', 'Рексем']
  },
  {
    id: 'northern-ireland',
    name: 'Северная Ирландия (Northern Ireland)',
    nativeName: 'Tuaisceart Éireann',
    flagSymbol: '🇬🇧',
    capital: 'Белфаст (Belfast)',
    population: '1.91 млн',
    populationRaw: 1.91,
    areaKm2: 14130,
    densityPerKm2: 135,
    gdpSharePercent: 2.3,
    legislature: 'Ассамблея Северной Ирландии (Stormont)',
    devolutionYear: '1998 г. (Белфастское соглашение / Good Friday Agreement)',
    largestCity: 'Белфаст (345 тыс.)',
    highestPoint: 'Слив-Донард (Slieve Donard)',
    highestPointElevationM: 850,
    nationalDay: '17 марта (День Святого Патрика)',
    accentColor: '#ea580c',
    summaryPoints: [
      'Единственная часть Великобритании, имеющая сухопутную границу с другим государством (Республикой Ирландия).',
      'Исторический центр судостроения (верфь Harland & Wolff, где был построен «Титаник»).',
      'Ведущий европейский кластер кибербезопасности и разработки программного обеспечения.',
      'Озеро Лох-Ней (Lough Neagh, 392 км²) — крупнейшее пресноводное озеро Британских островов.'
    ],
    keyIndustries: ['Кибербезопасность & Финтех-софт', 'Тяжелое и морское машиностроение', 'Агропромышленный комплекс и молочная продукция', 'Креативная индустрия и цифровой продакшн'],
    majorCities: ['Белфаст', 'Дерри/Лондондерри', 'Лисберн', 'Ньюри']
  }
];

export const UK_CITIES: UKCity[] = [
  {
    id: 'london',
    name: 'Лондон (London)',
    country: 'england',
    population: '8,866,000',
    role: 'Столица Великобритании и Англии',
    coordinates: { x: 74.5, y: 79.5 },
    keyFacts: [
      'Второй по значимости глобальный финансовый центр мира.',
      'ВВП агломерации превышает £500 млрд.',
      'Старейший метрополитен в мире (London Underground, 1863 г.).'
    ]
  },
  {
    id: 'edinburgh',
    name: 'Эдинбург (Edinburgh)',
    country: 'scotland',
    population: '540,000',
    role: 'Столица Шотландии',
    coordinates: { x: 54.0, y: 39.5 },
    keyFacts: [
      'Место заседания Парламента Шотландии (Holyrood).',
      'Крупный европейский центр управления инвестиционными активами.',
      'Крупнейший в мире фестиваль искусств Edinburgh Festival Fringe.'
    ]
  },
  {
    id: 'cardiff',
    name: 'Кардифф (Cardiff)',
    country: 'wales',
    population: '362,000',
    role: 'Столица Уэльса',
    coordinates: { x: 48.0, y: 79.0 },
    keyFacts: [
      'Главный политический и коммерческий центр Уэльса.',
      'Крупнейший медийный кластер BBC Cymru Wales и S4C.',
      'Современная гавань Cardiff Bay — проект масштабной регенерации.'
    ]
  },
  {
    id: 'belfast',
    name: 'Белфаст (Belfast)',
    country: 'northern-ireland',
    population: '345,000',
    role: 'Столица Северной Ирландии',
    coordinates: { x: 26.5, y: 49.5 },
    keyFacts: [
      'Штаб-квартира Ассамблеи Северной Ирландии (Стормонт).',
      'Мировой топ-хаб по исследованиям в области киберзащиты (CSIT).',
      'Музей Titanic Belfast — один из самых посещаемых в Европе.'
    ]
  },
  {
    id: 'manchester',
    name: 'Манчестер (Manchester)',
    country: 'england',
    population: '553,000 (агломерация 2.8M)',
    role: 'Промышленный и технологический хаб Севера Англии',
    coordinates: { x: 57.0, y: 64.0 },
    keyFacts: [
      'Место открытия графена (Нобелевская премия 2010 г., Новосёлов и Гейм).',
      'Крупнейший технологический кластер Великобритании вне Лондона.',
      'Медиа-сити Великобритании (MediaCityUK, Salford).'
    ]
  },
  {
    id: 'birmingham',
    name: 'Бирмингем (Birmingham)',
    country: 'england',
    population: '1,144,000',
    role: 'Второй по населению город Великобритании',
    coordinates: { x: 60.5, y: 71.5 },
    keyFacts: [
      'Сердце региона Уэст-Мидлендс, центр автомобилестроения (JLR).',
      'Сеть каналов общей протяженностью превышает венецианскую.',
      'Один из самых молодых по составу населения городов Европы (40% младше 25 лет).'
    ]
  },
  {
    id: 'glasgow',
    name: 'Глазго (Glasgow)',
    country: 'scotland',
    population: '635,000',
    role: 'Крупнейший город Шотландии',
    coordinates: { x: 47.0, y: 39.8 },
    keyFacts: [
      'Производит больше малых спутников (CubeSats), чем любой другой город за пределами США.',
      'Главный индустриальный и портовый узел Шотландии на реке Клайд.',
      'Университет Глазго основан в 1451 году.'
    ]
  },
  {
    id: 'oxford',
    name: 'Оксфорд (Oxford)',
    country: 'england',
    population: '162,000',
    role: 'Мировой академический и биотехнологический центр',
    coordinates: { x: 67.0, y: 77.0 },
    keyFacts: [
      'Оксфордский университет — старейший англоязычный университет в мире (~1096 г.).',
      'Ключевой элемент «Золотого треугольника» науки Великобритании.',
      'Разработка вакцины Oxford-AstraZeneca против COVID-19.'
    ]
  },
  {
    id: 'cambridge',
    name: 'Кембридж (Cambridge)',
    country: 'england',
    population: '145,000',
    role: 'Кремниевое болото (Silicon Fen) & Наука',
    coordinates: { x: 73.0, y: 73.5 },
    keyFacts: [
      '121 нобелевский лауреат связан с Кембриджским университетом.',
      'Родина полупроводникового гиганта ARM Holdings (микросхемы в 99% смартфонов).',
      'Крупнейший биотехнологический кластер Европы.'
    ]
  },
  {
    id: 'aberdeen',
    name: 'Абердин (Aberdeen)',
    country: 'scotland',
    population: '229,000',
    role: 'Энергетическая столица Европы',
    coordinates: { x: 63.5, y: 28.0 },
    keyFacts: [
      'Главная операционная база нефтегазовой индустрии Северного моря.',
      'Центр разработок морских ветрогенераторов глубокого заложения.',
      'Известен как «Гранитный город» благодаря архитектуре из серого гранита.'
    ]
  }
];

export const UK_GEOGRAPHY_MILESTONES: UKGeographyMilestone[] = [
  {
    title: 'Высшая точка Великобритании',
    value: '1,345 м',
    detail: 'Бен-Невис (Ben Nevis) в Грампианских горах Шотландии.',
    location: 'Шотландия',
    category: 'peak'
  },
  {
    title: 'Самая длинная река',
    value: '354 км',
    detail: 'Северн (River Severn), берущая начало в Уэльсе и впадающая в Бристольский залив.',
    location: 'Уэльс / Англия',
    category: 'river'
  },
  {
    title: 'Главная водная артерия',
    value: '346 км',
    detail: 'Темза (River Thames), протекающая через Оксфорд и Лондон.',
    location: 'Англия',
    category: 'river'
  },
  {
    title: 'Крупнейшее озеро',
    value: '392 км²',
    detail: 'Лох-Ней (Lough Neagh), пресный водоем Северной Ирландии.',
    location: 'Северная Ирландия',
    category: 'lake'
  },
  {
    title: 'Нулевой меридиан (Гринвич)',
    value: '0°00′00″',
    detail: 'Королевская обсерватория в Гринвиче — мировой эталон времени (GMT) и отсчета долготы.',
    location: 'Лондон',
    category: 'monument'
  }
];

// Route network between UK nodes for Dijkstra algorithm
export interface UKRouteEdge {
  from: string;
  to: string;
  distanceKm: number;
  timeHours: number; // typical rail / highway transit
}

export const UK_GRAPH_EDGES: UKRouteEdge[] = [
  { from: 'london', to: 'oxford', distanceKm: 90, timeHours: 1.0 },
  { from: 'london', to: 'cambridge', distanceKm: 85, timeHours: 0.9 },
  { from: 'london', to: 'birmingham', distanceKm: 190, timeHours: 1.4 },
  { from: 'oxford', to: 'birmingham', distanceKm: 105, timeHours: 1.1 },
  { from: 'birmingham', to: 'cardiff', distanceKm: 180, timeHours: 1.9 },
  { from: 'birmingham', to: 'manchester', distanceKm: 135, timeHours: 1.3 },
  { from: 'manchester', to: 'edinburgh', distanceKm: 350, timeHours: 3.2 },
  { from: 'edinburgh', to: 'glasgow', distanceKm: 75, timeHours: 0.8 },
  { from: 'edinburgh', to: 'aberdeen', distanceKm: 210, timeHours: 2.3 },
  { from: 'glasgow', to: 'belfast', distanceKm: 230, timeHours: 3.5 }, // ferry/transit combo
  { from: 'cambridge', to: 'manchester', distanceKm: 240, timeHours: 2.8 },
  { from: 'cardiff', to: 'london', distanceKm: 245, timeHours: 2.0 }
];
