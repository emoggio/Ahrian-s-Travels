import { CountryInfo } from '../types';

export const countryPalette = [
  '#f97316', '#ef4444', '#ec4899', '#8b5cf6', '#6366f1', 
  '#3b82f6', '#06b6d4', '#14b8a6', '#10b981', '#84cc16', 
  '#eab308', '#d97706', '#f43f5e', '#a855f7', '#0ea5e9'
];

export const WORLD_COUNTRIES: Record<string, CountryInfo> = {
  FRA: {
    id: 'FRA',
    name: 'France',
    isoA2: 'FR',
    isoA3: 'FRA',
    continent: 'Europe',
    capital: 'Paris',
    currency: 'Euro (EUR)',
    flagEmoji: '🇫🇷',
    greeting: 'Bonjour !',
    trivia: [
      'France is the most visited country in the world with over 89 million visitors annually.',
      'There are over 1,500 distinct types of French cheese produced across the country.',
      'The Eiffel Tower was originally built as a temporary exhibit for the 1889 World’s Fair.'
    ],
    famousLandmarks: ['Eiffel Tower', 'Louvre Museum', 'Mont-Saint-Michel', 'Palace of Versailles'],
    color: '#3b82f6'
  },
  ITA: {
    id: 'ITA',
    name: 'Italy',
    isoA2: 'IT',
    isoA3: 'ITA',
    continent: 'Europe',
    capital: 'Rome',
    currency: 'Euro (EUR)',
    flagEmoji: '🇮🇹',
    greeting: 'Ciao !',
    trivia: [
      'Italy has more UNESCO World Heritage sites (59) than any other country on Earth.',
      'Italy is home to Europe’s only three active volcanoes: Etna, Stromboli, and Vesuvius.',
      'Over 3,000 Euros are tossed into Rome’s Trevi Fountain every single day.'
    ],
    famousLandmarks: ['Colosseum', 'Canals of Venice', 'Duomo di Milano', 'Amalfi Coast'],
    color: '#10b981'
  },
  ESP: {
    id: 'ESP',
    name: 'Spain',
    isoA2: 'ES',
    isoA3: 'ESP',
    continent: 'Europe',
    capital: 'Madrid',
    currency: 'Euro (EUR)',
    flagEmoji: '🇪🇸',
    greeting: '¡Hola!',
    trivia: [
      'Spain produces over 40% of the entire world’s olive oil.',
      'The Sagrada Família in Barcelona has been under construction for over 140 years.',
      'Spain is the second most mountainous country in Europe after Switzerland.'
    ],
    famousLandmarks: ['Sagrada Família', 'Alhambra', 'Park Güell', 'Plaza Mayor'],
    color: '#f59e0b'
  },
  GBR: {
    id: 'GBR',
    name: 'United Kingdom',
    isoA2: 'GB',
    isoA3: 'GBR',
    continent: 'Europe',
    capital: 'London',
    currency: 'British Pound (GBP)',
    flagEmoji: '🇬🇧',
    greeting: 'Hello / Cheers!',
    trivia: [
      'No place in the UK is more than 70 miles (113 km) from the ocean coast.',
      'The London Underground (the Tube) is the oldest underground transit network in the world.',
      'Windsor Castle is the oldest and largest inhabited castle in the world.'
    ],
    famousLandmarks: ['Big Ben', 'Stonehenge', 'Tower Bridge', 'Edinburgh Castle'],
    color: '#ef4444'
  },
  DEU: {
    id: 'DEU',
    name: 'Germany',
    isoA2: 'DE',
    isoA3: 'DEU',
    continent: 'Europe',
    capital: 'Berlin',
    currency: 'Euro (EUR)',
    flagEmoji: '🇩🇪',
    greeting: 'Guten Tag!',
    trivia: [
      'Germany has over 20,000 castles scattered across its valleys and forests.',
      'Over 65% of the highways (Autobahn) have no federally mandated speed limit.',
      'Berlin has more bridges than Venice (around 1,700 bridges!).'
    ],
    famousLandmarks: ['Brandenburg Gate', 'Neuschwanstein Castle', 'Cologne Cathedral', 'Black Forest'],
    color: '#8b5cf6'
  },
  JPN: {
    id: 'JPN',
    name: 'Japan',
    isoA2: 'JP',
    isoA3: 'JPN',
    continent: 'Asia',
    capital: 'Tokyo',
    currency: 'Japanese Yen (JPY)',
    flagEmoji: '🇯🇵',
    greeting: 'Konnichiwa (こんにちは)!',
    trivia: [
      'Japan is an archipelago of over 6,850 islands with Mount Fuji as its highest peak.',
      'Japan has more than 5.5 million vending machines selling everything from hot ramen to fresh flowers.',
      'Tokyo is the most populous metropolitan area in the world with over 37 million people.'
    ],
    famousLandmarks: ['Mount Fuji', 'Fushimi Inari Shrine', 'Shibuya Crossing', 'Kinkaku-ji'],
    color: '#ec4899'
  },
  USA: {
    id: 'USA',
    name: 'United States',
    isoA2: 'US',
    isoA3: 'USA',
    continent: 'North America',
    capital: 'Washington, D.C.',
    currency: 'US Dollar (USD)',
    flagEmoji: '🇺🇸',
    greeting: 'Hello!',
    trivia: [
      'The US contains 63 National Parks, including Yellowstone, the world’s first national park established in 1872.',
      'You can experience almost every climate zone on Earth within the United States borders.',
      'The Grand Canyon is over 277 miles long and up to 18 miles wide.'
    ],
    famousLandmarks: ['Statue of Liberty', 'Grand Canyon', 'Golden Gate Bridge', 'Times Square'],
    color: '#06b6d4'
  },
  CAN: {
    id: 'CAN',
    name: 'Canada',
    isoA2: 'CA',
    isoA3: 'CAN',
    continent: 'North America',
    capital: 'Ottawa',
    currency: 'Canadian Dollar (CAD)',
    flagEmoji: '🇨🇦',
    greeting: 'Hello / Bonjour!',
    trivia: [
      'Canada has more lakes than all other countries in the world combined (over 2 million lakes).',
      'Canada has the longest coastline of any country on the planet at 202,080 km.',
      'Over 70% of the world’s pure maple syrup comes from Quebec.'
    ],
    famousLandmarks: ['Niagara Falls', 'Banff National Park', 'CN Tower', 'Old Quebec'],
    color: '#f43f5e'
  },
  AUS: {
    id: 'AUS',
    name: 'Australia',
    isoA2: 'AU',
    isoA3: 'AUS',
    continent: 'Oceania',
    capital: 'Canberra',
    currency: 'Australian Dollar (AUD)',
    flagEmoji: '🇦🇺',
    greeting: 'G’day mate!',
    trivia: [
      'The Great Barrier Reef is the world’s largest living structure, visible from outer space.',
      'Over 80% of Australia’s plants and animals are completely unique to the continent.',
      'Australia’s Highway 1 is the world’s longest national highway at over 14,500 km.'
    ],
    famousLandmarks: ['Sydney Opera House', 'Great Barrier Reef', 'Uluru (Ayers Rock)', 'Bondi Beach'],
    color: '#14b8a6'
  },
  NZL: {
    id: 'NZL',
    name: 'New Zealand',
    isoA2: 'NZ',
    isoA3: 'NZL',
    continent: 'Oceania',
    capital: 'Wellington',
    currency: 'New Zealand Dollar (NZD)',
    flagEmoji: '🇳🇿',
    greeting: 'Kia Ora!',
    trivia: [
      'New Zealand was the first country in the world to grant women the right to vote in 1893.',
      'There are roughly five sheep for every single human in New Zealand.',
      'Milford Sound is often acclaimed as the 8th Wonder of the World for its majestic fjords.'
    ],
    famousLandmarks: ['Milford Sound', 'Hobbiton', 'Franz Josef Glacier', 'Rotorua Geysers'],
    color: '#84cc16'
  },
  BRA: {
    id: 'BRA',
    name: 'Brazil',
    isoA2: 'BR',
    isoA3: 'BRA',
    continent: 'South America',
    capital: 'Brasília',
    currency: 'Brazilian Real (BRL)',
    flagEmoji: '🇧🇷',
    greeting: 'Olá!',
    trivia: [
      'Brazil contains roughly 60% of the Amazon Rainforest, the Earth’s most biodiverse habitat.',
      'Brazil is the only country in South America whose official language is Portuguese.',
      'Rio de Janeiro hosts the largest carnival in the world, attracting millions of revelers.'
    ],
    famousLandmarks: ['Christ the Redeemer', 'Iguazu Falls', 'Copacabana Beach', 'Sugarloaf Mountain'],
    color: '#10b981'
  },
  ARG: {
    id: 'ARG',
    name: 'Argentina',
    isoA2: 'AR',
    isoA3: 'ARG',
    continent: 'South America',
    capital: 'Buenos Aires',
    currency: 'Argentine Peso (ARS)',
    flagEmoji: '🇦🇷',
    greeting: '¡Hola! ¿Qué tal?',
    trivia: [
      'Argentina is the birthplace of Tango, born in the colorful La Boca neighborhood of Buenos Aires.',
      'Ushuaia in Tierra del Fuego is widely celebrated as "The End of the World" (Fin del Mundo).',
      'The Perito Moreno Glacier is one of the few glaciers in the world that is still advancing.'
    ],
    famousLandmarks: ['Perito Moreno Glacier', 'Iguazu Falls', 'La Boca', 'Bariloche Lakes'],
    color: '#0ea5e9'
  },
  MEX: {
    id: 'MEX',
    name: 'Mexico',
    isoA2: 'MX',
    isoA3: 'MEX',
    continent: 'North America',
    capital: 'Mexico City',
    currency: 'Mexican Peso (MXN)',
    flagEmoji: '🇲🇽',
    greeting: '¡Hola!',
    trivia: [
      'Mexico City was built on top of the ancient Aztec city of Tenochtitlan and is sinking ~10cm per year.',
      'Mexico is the birthplace of chocolate, originally consumed by the Mayans and Aztecs.',
      'Chichén Itzá is one of the New Seven Wonders of the World.'
    ],
    famousLandmarks: ['Chichén Itzá', 'Cancún Beaches', 'Teotihuacan Pyramids', 'Cenotes of Yucatán'],
    color: '#e11d48'
  },
  EGY: {
    id: 'EGY',
    name: 'Egypt',
    isoA2: 'EG',
    isoA3: 'EGY',
    continent: 'Africa',
    capital: 'Cairo',
    currency: 'Egyptian Pound (EGP)',
    flagEmoji: '🇪🇬',
    greeting: 'Ahlan wa Sahlan (أهلاً وسهلاً)!',
    trivia: [
      'The Great Pyramid of Giza is the oldest of the Ancient Seven Wonders and the only one still standing.',
      'Ancient Egyptians invented the 365-day calendar divided into 12 months.',
      'The Nile River is the longest river in Africa, stretching over 6,650 km.'
    ],
    famousLandmarks: ['Pyramids of Giza', 'Valley of the Kings', 'Karnak Temple', 'Nile River Cruise'],
    color: '#d97706'
  },
  ZAF: {
    id: 'ZAF',
    name: 'South Africa',
    isoA2: 'ZA',
    isoA3: 'ZAF',
    continent: 'Africa',
    capital: 'Pretoria / Cape Town / Bloemfontein',
    currency: 'South African Rand (ZAR)',
    flagEmoji: '🇿🇦',
    greeting: 'Sawubona / Howzit!',
    trivia: [
      'South Africa is the only country in the world with three official capital cities.',
      'Table Mountain in Cape Town is one of the oldest mountains on Earth, over 260 million years old.',
      'Kruger National Park is one of Africa’s largest game reserves, home to the Big Five.'
    ],
    famousLandmarks: ['Table Mountain', 'Kruger National Park', 'Cape of Good Hope', 'Boulders Beach'],
    color: '#059669'
  },
  MAR: {
    id: 'MAR',
    name: 'Morocco',
    isoA2: 'MA',
    isoA3: 'MAR',
    continent: 'Africa',
    capital: 'Rabat',
    currency: 'Moroccan Dirham (MAD)',
    flagEmoji: '🇲🇦',
    greeting: 'Salam Alaykum (السلام عليكم)!',
    trivia: [
      'Chefchaouen is known worldwide as the "Blue Pearl" for its vibrant blue-washed alleyways.',
      'The University of al-Qarawiyyin in Fez is recognized by UNESCO as the oldest university in continuous operation.',
      'Morocco is famous for delicious mint tea, often called "Berber Whiskey".'
    ],
    famousLandmarks: ['Chefchaouen (Blue City)', 'Marrakech Medina & Jemaa el-Fnaa', 'Sahara Desert Dunes', 'Hassan II Mosque'],
    color: '#c026d3'
  },
  THA: {
    id: 'THA',
    name: 'Thailand',
    isoA2: 'TH',
    isoA3: 'THA',
    continent: 'Asia',
    capital: 'Bangkok',
    currency: 'Thai Baht (THB)',
    flagEmoji: '🇹🇭',
    greeting: 'Sawasdee (สวัสดี)!',
    trivia: [
      'Thailand is known as the "Land of Smiles" due to its welcoming hospitality.',
      'Bangkok’s full ceremonial name has 168 letters, making it the longest city name in the Guinness Book.',
      'Thailand is home to the world’s smallest mammal, the bumblebee bat, weighing only 2 grams.'
    ],
    famousLandmarks: ['Grand Palace', 'Wat Arun', 'Phi Phi Islands', 'Chiang Mai Night Bazaar'],
    color: '#0284c7'
  },
  VNM: {
    id: 'VNM',
    name: 'Vietnam',
    isoA2: 'VN',
    isoA3: 'VNM',
    continent: 'Asia',
    capital: 'Hanoi',
    currency: 'Vietnamese Dong (VND)',
    flagEmoji: '🇻🇳',
    greeting: 'Xin Chào!',
    trivia: [
      'Hạ Long Bay features thousands of towering limestone karsts and islets rising from emerald waters.',
      'Vietnam is the world’s second largest exporter of coffee after Brazil.',
      'Sơn Đoòng Cave in Vietnam is the largest natural cave in the world, with its own rainforest inside.'
    ],
    famousLandmarks: ['Hạ Long Bay', 'Hội An Ancient Town', 'Golden Hands Bridge (Da Nang)', 'Cu Chi Tunnels'],
    color: '#ea580c'
  },
  IND: {
    id: 'IND',
    name: 'India',
    isoA2: 'IN',
    isoA3: 'IND',
    continent: 'Asia',
    capital: 'New Delhi',
    currency: 'Indian Rupee (INR)',
    flagEmoji: '🇮🇳',
    greeting: 'Namaste (नमस्ते)!',
    trivia: [
      'The Taj Mahal in Agra was built by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal.',
      'India is the birthplace of chess, yoga, and the numerical concept of zero.',
      'Varanasi on the banks of the Ganges is one of the oldest continuously inhabited cities in history.'
    ],
    famousLandmarks: ['Taj Mahal', 'Varanasi Ghats', 'Jaipur Pink City', 'Kerala Backwaters'],
    color: '#d97706'
  },
  CHN: {
    id: 'CHN',
    name: 'China',
    isoA2: 'CN',
    isoA3: 'CHN',
    continent: 'Asia',
    capital: 'Beijing',
    currency: 'Chinese Yuan (CNY)',
    flagEmoji: '🇨🇳',
    greeting: 'Nǐ Hǎo (你好)!',
    trivia: [
      'The Great Wall of China stretches across more than 21,000 km of mountains and ridges.',
      'China is the native home of the giant panda, beloved around the world.',
      'China spans five geographic time zones, but the entire country officially operates on a single time zone (Beijing Time).'
    ],
    famousLandmarks: ['Great Wall of China', 'Forbidden City', 'Terracotta Army', 'Zhangjiajie Avatar Mountains'],
    color: '#dc2626'
  },
  KOR: {
    id: 'KOR',
    name: 'South Korea',
    isoA2: 'KR',
    isoA3: 'KOR',
    continent: 'Asia',
    capital: 'Seoul',
    currency: 'South Korean Won (KRW)',
    flagEmoji: '🇰🇷',
    greeting: 'Annyeonghaseyo (안녕하세요)!',
    trivia: [
      'South Korea has the fastest average internet connection speeds in the world.',
      'Seoul’s historic palaces sit harmoniously alongside ultra-modern skyscrapers.',
      'Jeju Island is a volcanic UNESCO Natural World Heritage site famous for lava tubes and sunrise peaks.'
    ],
    famousLandmarks: ['Gyeongbokgung Palace', 'N Seoul Tower', 'Jeju Island', 'Bukchon Hanok Village'],
    color: '#7c3aed'
  },
  IDN: {
    id: 'IDN',
    name: 'Indonesia',
    isoA2: 'ID',
    isoA3: 'IDN',
    continent: 'Asia',
    capital: 'Jakarta',
    currency: 'Indonesian Rupiah (IDR)',
    flagEmoji: '🇮🇩',
    greeting: 'Halo / Selamat Siang!',
    trivia: [
      'Indonesia is the world’s largest archipelagic state, comprising over 17,500 islands.',
      'Home to Komodo National Park, the only place in the wild where Komodo dragons roam.',
      'Borobudur is the largest Buddhist temple complex in the world, built in the 9th century.'
    ],
    famousLandmarks: ['Bali Beaches & Temples', 'Borobudur Temple', 'Komodo Island', 'Mount Bromo'],
    color: '#059669'
  },
  ISL: {
    id: 'ISL',
    name: 'Iceland',
    isoA2: 'IS',
    isoA3: 'ISL',
    continent: 'Europe',
    capital: 'Reykjavik',
    currency: 'Icelandic Króna (ISK)',
    flagEmoji: '🇮🇸',
    greeting: 'Halló / Góðan daginn!',
    trivia: [
      'Iceland is known as the "Land of Fire and Ice" with active volcanoes, geysers, and massive glaciers.',
      'Almost 100% of Iceland’s electricity and heat comes from renewable geothermal and hydroelectric energy.',
      'There are no mosquitoes in Iceland!'
    ],
    famousLandmarks: ['Blue Lagoon', 'Golden Circle Geysers', 'Gullfoss Waterfall', 'Black Sand Beach (Reynisfjara)'],
    color: '#0284c7'
  },
  NOR: {
    id: 'NOR',
    name: 'Norway',
    isoA2: 'NO',
    isoA3: 'NOR',
    continent: 'Europe',
    capital: 'Oslo',
    currency: 'Norwegian Krone (NOK)',
    flagEmoji: '🇳🇴',
    greeting: 'Hei / Hallo!',
    trivia: [
      'Norway’s dramatic fjords like Geirangerfjord and Nærøyfjord are UNESCO World Heritage jewels.',
      'During summer in northern Norway, the sun never sets—a magical natural phenomenon called the Midnight Sun.',
      'Norway introduced salmon sushi to Japan in the 1980s!'
    ],
    famousLandmarks: ['Geirangerfjord', 'Trolltunga', 'Lofoten Islands', 'Bryggen in Bergen'],
    color: '#2563eb'
  },
  GRC: {
    id: 'GRC',
    name: 'Greece',
    isoA2: 'GR',
    isoA3: 'GRC',
    continent: 'Europe',
    capital: 'Athens',
    currency: 'Euro (EUR)',
    flagEmoji: '🇬🇷',
    greeting: 'Geia Sas (Γεια σας)!',
    trivia: [
      'Greece is considered the birthplace of Western democracy, philosophy, theatre, and the Olympic Games.',
      'Greece is surrounded by thousands of sun-drenched islands in the Aegean and Ionian Seas.',
      'The Parthenon has stood gracefully on the Acropolis of Athens for over 2,400 years.'
    ],
    famousLandmarks: ['Acropolis of Athens', 'Santorini Caldera & Sunsets', 'Meteora Monasteries', 'Navagio Beach (Zakynthos)'],
    color: '#0284c7'
  },
  PRT: {
    id: 'PRT',
    name: 'Portugal',
    isoA2: 'PT',
    isoA3: 'PRT',
    continent: 'Europe',
    capital: 'Lisbon',
    currency: 'Euro (EUR)',
    flagEmoji: '🇵🇹',
    greeting: 'Olá!',
    trivia: [
      'Lisbon is one of the oldest cities in Western Europe, predating London, Paris, and Rome by centuries.',
      'Portugal is the world’s largest producer of cork, producing over 50% of the global supply.',
      'The famous Pastéis de Nata custard tarts originated at the Jerónimos Monastery in Belém.'
    ],
    famousLandmarks: ['Belém Tower', 'Pena Palace (Sintra)', 'Douro Wine Valley', 'Benagil Cave'],
    color: '#16a34a'
  },
  CHE: {
    id: 'CHE',
    name: 'Switzerland',
    isoA2: 'CH',
    isoA3: 'CHE',
    continent: 'Europe',
    capital: 'Bern',
    currency: 'Swiss Franc (CHF)',
    flagEmoji: '🇨🇭',
    greeting: 'Grüezi / Bonjour / Ciao!',
    trivia: [
      'Switzerland has four official languages: German, French, Italian, and Romansh.',
      'The Matterhorn is one of the most iconic pyramid-shaped peaks in the Swiss Alps.',
      'Switzerland produces over 200,000 tons of luxury chocolate every year.'
    ],
    famousLandmarks: ['The Matterhorn', 'Lake Geneva', 'Jungfraujoch (Top of Europe)', 'Lucerne Chapel Bridge'],
    color: '#dc2626'
  },
  TUR: {
    id: 'TUR',
    name: 'Turkey',
    isoA2: 'TR',
    isoA3: 'TUR',
    continent: 'Europe/Asia',
    capital: 'Ankara',
    currency: 'Turkish Lira (TRY)',
    flagEmoji: '🇹🇷',
    greeting: 'Merhaba!',
    trivia: [
      'Istanbul is the only transcontinental city in the world spanning across both Europe and Asia.',
      'Cappadocia is famous for its surreal fairy chimneys and hot air balloons drifting at dawn.',
      'The Grand Bazaar in Istanbul is one of the world’s oldest and largest covered markets with over 4,000 shops.'
    ],
    famousLandmarks: ['Hagia Sophia', 'Cappadocia Hot Air Balloons', 'Pamukkale Thermal Pools', 'Blue Mosque'],
    color: '#e11d48'
  },
  PER: {
    id: 'PER',
    name: 'Peru',
    isoA2: 'PE',
    isoA3: 'PER',
    continent: 'South America',
    capital: 'Lima',
    currency: 'Peruvian Sol (PEN)',
    flagEmoji: '🇵🇪',
    greeting: '¡Hola!',
    trivia: [
      'Machu Picchu, the 15th-century Inca citadel perched high in the Andes, was unknown to the outside world until 1911.',
      'Peru grows over 4,000 native varieties of potatoes in an array of colors and shapes.',
      'Lake Titicaca is the highest navigable body of water in the world at 3,812 meters altitude.'
    ],
    famousLandmarks: ['Machu Picchu', 'Rainbow Mountain (Vinicunca)', 'Sacred Valley', 'Nazca Lines'],
    color: '#d97706'
  },
  COL: {
    id: 'COL',
    name: 'Colombia',
    isoA2: 'CO',
    isoA3: 'COL',
    continent: 'South America',
    capital: 'Bogotá',
    currency: 'Colombian Peso (COP)',
    flagEmoji: '🇨🇴',
    greeting: '¡Hola! ¿Qué más?',
    trivia: [
      'Colombia is the second most biodiverse country on Earth and #1 in bird and orchid species.',
      'Cartagena’s historic walled city is a UNESCO jewel with colorful colonial balconies and bougainvillea.',
      'The Coffee Cultural Landscape of Colombia produces some of the most aromatic mild arabica coffee in the world.'
    ],
    famousLandmarks: ['Cartagena Old Town', 'Tayrona National Natural Park', 'Cocora Valley Wax Palms', 'Salt Cathedral of Zipaquirá'],
    color: '#f59e0b'
  },
  CHL: {
    id: 'CHL',
    name: 'Chile',
    isoA2: 'CL',
    isoA3: 'CHL',
    continent: 'South America',
    capital: 'Santiago',
    currency: 'Chilean Peso (CLP)',
    flagEmoji: '🇨🇱',
    greeting: '¡Hola! ¿Cómo estai?',
    trivia: [
      'Chile is the longest and narrowest country in the world, stretching over 4,300 km.',
      'The Atacama Desert in northern Chile is the driest non-polar desert on Earth, ideal for world-class stargazing.',
      'Torres del Paine National Park in Patagonia features dramatic granite peaks, glaciers, and turquoise lakes.'
    ],
    famousLandmarks: ['Torres del Paine', 'Atacama Desert & Moon Valley', 'Easter Island Moai', 'Valparaíso Funiculars'],
    color: '#2563eb'
  },
  NLD: {
    id: 'NLD',
    name: 'Netherlands',
    isoA2: 'NL',
    isoA3: 'NLD',
    continent: 'Europe',
    capital: 'Amsterdam',
    currency: 'Euro (EUR)',
    flagEmoji: '🇳🇱',
    greeting: 'Hallo / Hoi!',
    trivia: [
      'There are more bicycles in the Netherlands than human residents (approx. 23 million bikes).',
      'Over a quarter of the Netherlands lies below sea level, protected by ingenious dikes and windmills.',
      'The Netherlands produces over 4 billion flower bulbs each year, famous for its tulip fields.'
    ],
    famousLandmarks: ['Amsterdam Canals', 'Keukenhof Tulip Gardens', 'Zaanse Schans Windmills', 'Rijksmuseum'],
    color: '#f97316'
  },
  IRL: {
    id: 'IRL',
    name: 'Ireland',
    isoA2: 'IE',
    isoA3: 'IRL',
    continent: 'Europe',
    capital: 'Dublin',
    currency: 'Euro (EUR)',
    flagEmoji: '🇮🇪',
    greeting: 'Dia dhuit / Sláinte!',
    trivia: [
      'Ireland is known as the "Emerald Isle" for its lush green landscapes nourished by gentle rains.',
      'The Cliffs of Moher rise up to 214 meters directly above the roaring Atlantic Ocean.',
      'Halloween originated in ancient Ireland from the Celtic harvest festival of Samhain.'
    ],
    famousLandmarks: ['Cliffs of Moher', 'Ring of Kerry', 'Giant’s Causeway', 'Trinity College Library'],
    color: '#16a34a'
  },
  SWE: {
    id: 'SWE',
    name: 'Sweden',
    isoA2: 'SE',
    isoA3: 'SWE',
    continent: 'Europe',
    capital: 'Stockholm',
    currency: 'Swedish Krona (SEK)',
    flagEmoji: '🇸🇪',
    greeting: 'Hej / Hejsan!',
    trivia: [
      'Stockholm is built across 14 islands connected by more than 50 bridges.',
      'Sweden enjoys "Allemansrätten" (the Right of Public Access), allowing everyone to roam and camp freely in nature.',
      'The Nobel Prizes in science and literature are awarded in Stockholm each December.'
    ],
    famousLandmarks: ['Stockholm Gamla Stan', 'Vasa Museum', 'Icehotel in Jukkasjärvi', 'Abisko Northern Lights'],
    color: '#0284c7'
  },
  DNK: {
    id: 'DNK',
    name: 'Denmark',
    isoA2: 'DK',
    isoA3: 'DNK',
    continent: 'Europe',
    capital: 'Copenhagen',
    currency: 'Danish Krone (DKK)',
    flagEmoji: '🇩🇰',
    greeting: 'Hej / Halløj!',
    trivia: [
      'Denmark is the birthplace of LEGO toys and the cozy lifestyle philosophy called "Hygge".',
      'Copenhagen is consistently ranked among the happiest and most bike-friendly cities in the world.',
      'Tivoli Gardens in Copenhagen is the second-oldest operating amusement park in the world (opened in 1843).'
    ],
    famousLandmarks: ['Nyhavn Harbor', 'Tivoli Gardens', 'The Little Mermaid', 'Kronborg Castle (Hamlet’s Castle)'],
    color: '#e11d48'
  },
  AUT: {
    id: 'AUT',
    name: 'Austria',
    isoA2: 'AT',
    isoA3: 'AUT',
    continent: 'Europe',
    capital: 'Vienna',
    currency: 'Euro (EUR)',
    flagEmoji: '🇦🇹',
    greeting: 'Servus / Grüß Gott!',
    trivia: [
      'Vienna has been celebrated as the classical music capital of the world, home to Mozart, Beethoven, and Strauss.',
      'Over 60% of Austria is covered by the magnificent Alps mountain range.',
      'Hallstatt is a postcard-perfect alpine village perched on the edge of a pristine mountain lake.'
    ],
    famousLandmarks: ['Schönbrunn Palace', 'Hallstatt Alpine Village', 'St. Stephen’s Cathedral', 'Salzburg Fortress'],
    color: '#ea580c'
  },
  BEL: {
    id: 'BEL',
    name: 'Belgium',
    isoA2: 'BE',
    isoA3: 'BEL',
    continent: 'Europe',
    capital: 'Brussels',
    currency: 'Euro (EUR)',
    flagEmoji: '🇧🇪',
    greeting: 'Bonjour / Hallo!',
    trivia: [
      'Belgium produces over 220,000 tons of artisanal chocolate annually and is the kingdom of waffles and fries.',
      'Bruges is a fairytale medieval town crisscrossed with picturesque romantic canals.',
      'Brussels serves as the administrative headquarters of both the European Union and NATO.'
    ],
    famousLandmarks: ['Grand Place Brussels', 'Bruges Medieval Canals', 'Atomium', 'Ghent Historic Center'],
    color: '#d97706'
  },
  CZE: {
    id: 'CZE',
    name: 'Czech Republic',
    isoA2: 'CZ',
    isoA3: 'CZE',
    continent: 'Europe',
    capital: 'Prague',
    currency: 'Czech Koruna (CZK)',
    flagEmoji: '🇨🇿',
    greeting: 'Dobrý den / Ahoj!',
    trivia: [
      'Prague is called the "City of a Hundred Spires" due to its rich Gothic, Renaissance, and Baroque towers.',
      'Prague Castle is the largest ancient castle complex in the world according to Guinness World Records.',
      'Czechs drink more beer per capita than any other nation on Earth.'
    ],
    famousLandmarks: ['Charles Bridge', 'Prague Castle', 'Astronomical Clock', 'Český Krumlov'],
    color: '#8b5cf6'
  },
  HUN: {
    id: 'HUN',
    name: 'Hungary',
    isoA2: 'HU',
    isoA3: 'HUN',
    continent: 'Europe',
    capital: 'Budapest',
    currency: 'Hungarian Forint (HUF)',
    flagEmoji: '🇭🇺',
    greeting: 'Szia / Jó napot!',
    trivia: [
      'Budapest is known as the "City of Spas" with over 100 thermal springs supplying world-famous bathhouses.',
      'The Hungarian Parliament Building along the Danube River is one of Europe’s grandest neo-Gothic structures.',
      'Hungarian inventor Ernő Rubik created the legendary Rubik’s Cube in 1974.'
    ],
    famousLandmarks: ['Hungarian Parliament', 'Széchenyi Thermal Baths', 'Buda Castle & Fisherman’s Bastion', 'Chain Bridge'],
    color: '#10b981'
  },
  POL: {
    id: 'POL',
    name: 'Poland',
    isoA2: 'PL',
    isoA3: 'POL',
    continent: 'Europe',
    capital: 'Warsaw',
    currency: 'Polish Złoty (PLN)',
    flagEmoji: '🇵🇱',
    greeting: 'Cześć / Dzień dobry!',
    trivia: [
      'Kraków’s historic Old Town was among the first sites inscribed on the UNESCO World Heritage list.',
      'Wieliczka Salt Mine contains entire underground cathedrals, statues, and chandeliers carved out of rock salt.',
      'Poland is home to the Białowieża Forest, Europe’s last primeval lowland forest and home to wild European bison.'
    ],
    famousLandmarks: ['Kraków Main Market Square', 'Wawel Castle', 'Wieliczka Salt Mine', 'Warsaw Old Town'],
    color: '#ef4444'
  },
  HRV: {
    id: 'HRV',
    name: 'Croatia',
    isoA2: 'HR',
    isoA3: 'HRV',
    continent: 'Europe',
    capital: 'Zagreb',
    currency: 'Euro (EUR)',
    flagEmoji: '🇭🇷',
    greeting: 'Bok / Dobar dan!',
    trivia: [
      'Dubrovnik’s ancient stone defensive walls are world-renowned (and served as King’s Landing in Game of Thrones).',
      'Plitvice Lakes National Park has 16 cascading turquoise terraced lakes connected by rushing waterfalls.',
      'The Dalmatian dog breed originated in the historical Dalmatia region along Croatia’s coast.'
    ],
    famousLandmarks: ['Dubrovnik Old Town Walls', 'Plitvice Lakes', 'Diocletian’s Palace (Split)', 'Hvar Island'],
    color: '#06b6d4'
  },
  ARE: {
    id: 'ARE',
    name: 'United Arab Emirates',
    isoA2: 'AE',
    isoA3: 'ARE',
    continent: 'Asia / Middle East',
    capital: 'Abu Dhabi',
    currency: 'UAE Dirham (AED)',
    flagEmoji: '🇦🇪',
    greeting: 'Marhaban (مرحبا)!',
    trivia: [
      'The Burj Khalifa in Dubai is the tallest building in the world at 828 meters (2,717 ft).',
      'The Sheikh Zayed Grand Mosque in Abu Dhabi features the world’s largest hand-knotted carpet.',
      'Dubai’s Palm Jumeirah is a marvel of engineering: an artificial palm-shaped archipelago.'
    ],
    famousLandmarks: ['Burj Khalifa', 'Sheikh Zayed Grand Mosque', 'Palm Jumeirah', 'Louvre Abu Dhabi'],
    color: '#f59e0b'
  },
  SGP: {
    id: 'SGP',
    name: 'Singapore',
    isoA2: 'SG',
    isoA3: 'SGP',
    continent: 'Asia',
    capital: 'Singapore',
    currency: 'Singapore Dollar (SGD)',
    flagEmoji: '🇸🇬',
    greeting: 'Hello / Ni Hao / Vanakkam!',
    trivia: [
      'Singapore is a vibrant city-state, island, and nation all in one, known as the "Garden City".',
      'Gardens by the Bay features futuristic Supertrees up to 50 meters tall covered with vertical gardens.',
      'Singapore’s street hawker culture is officially recognized on UNESCO’s Intangible Cultural Heritage list.'
    ],
    famousLandmarks: ['Marina Bay Sands', 'Gardens by the Bay', 'Jewel Changi Rain Vortex', 'Sentosa Island'],
    color: '#14b8a6'
  },
  MYS: {
    id: 'MYS',
    name: 'Malaysia',
    isoA2: 'MY',
    isoA3: 'MYS',
    continent: 'Asia',
    capital: 'Kuala Lumpur',
    currency: 'Malaysian Ringgit (MYR)',
    flagEmoji: '🇲🇾',
    greeting: 'Selamat Datang!',
    trivia: [
      'The Petronas Twin Towers in Kuala Lumpur were the tallest buildings in the world from 1998 to 2004.',
      'Batu Caves features a 140-foot golden statue of Lord Murugan and 272 colorful steps leading to limestone caves.',
      'Malaysia is home to Taman Negara, estimated to be 130 million years old—older than the Amazon.'
    ],
    famousLandmarks: ['Petronas Twin Towers', 'Batu Caves', 'Penang Street Food & George Town', 'Mount Kinabalu'],
    color: '#8b5cf6'
  },
  KEN: {
    id: 'KEN',
    name: 'Kenya',
    isoA2: 'KE',
    isoA3: 'KEN',
    continent: 'Africa',
    capital: 'Nairobi',
    currency: 'Kenyan Shilling (KES)',
    flagEmoji: '🇰🇪',
    greeting: 'Jambo / Habari!',
    trivia: [
      'The Maasai Mara hosts the Great Migration, where millions of wildebeests and zebras cross the Mara River.',
      'Kenya is known as the cradle of humanity, where some of the earliest human ancestor fossils have been discovered.',
      'Mount Kenya is the second-highest peak in Africa with glaciers situated near the equator.'
    ],
    famousLandmarks: ['Maasai Mara National Reserve', 'Mount Kenya', 'Amboseli Mount Kilimanjaro View', 'Diani Beach'],
    color: '#84cc16'
  },
  TZA: {
    id: 'TZA',
    name: 'Tanzania',
    isoA2: 'TZ',
    isoA3: 'TZA',
    continent: 'Africa',
    capital: 'Dodoma',
    currency: 'Tanzanian Shilling (TZS)',
    flagEmoji: '🇹🇿',
    greeting: 'Jambo / Mambo vipi!',
    trivia: [
      'Mount Kilimanjaro is the highest peak in Africa and the world’s tallest free-standing mountain (5,895 m).',
      'The Serengeti ecosystem is home to one of the greatest concentrations of wildlife on Earth.',
      'Zanzibar Island is known as the "Spice Island" with centuries of Swahili and Arab maritime trading heritage.'
    ],
    famousLandmarks: ['Mount Kilimanjaro', 'Serengeti National Park', 'Ngorongoro Crater', 'Zanzibar Stone Town'],
    color: '#06b6d4'
  }
};

export const getCountryData = (id: string, name?: string): CountryInfo => {
  if (WORLD_COUNTRIES[id]) return WORLD_COUNTRIES[id];
  
  // Find by name match
  const found = Object.values(WORLD_COUNTRIES).find(
    c => c.name.toLowerCase() === (name || '').toLowerCase()
  );
  if (found) return found;

  // Fallback dynamic generator
  const hash = (id + (name || '')).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = countryPalette[hash % countryPalette.length];
  
  return {
    id,
    name: name || id,
    isoA2: id.slice(0, 2),
    isoA3: id,
    continent: 'World',
    capital: 'Capital City',
    currency: 'Local Currency',
    flagEmoji: '📍',
    greeting: 'Welcome / Hello!',
    trivia: [
      `${name || id} is a remarkable travel destination waiting to be explored!`,
      'Every journey leaves unique memories and footsteps on the globe.'
    ],
    famousLandmarks: ['Historic City Center', 'Scenic Natural Landscapes'],
    color
  };
};
