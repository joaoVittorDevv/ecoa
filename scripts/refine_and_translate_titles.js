import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCTS_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'products.json');

const rawProducts = fs.readFileSync(PRODUCTS_JSON_PATH, 'utf-8');
const products = JSON.parse(rawProducts);

// Títulos refinados e poéticos para cada uma das categorias
const REFINED_TITLES = {
  'alfaiataria': [
    'Trench Coat Clássico Estruturado em Gabardine',
    'Blazer de Lã Fria Italiano com Abotoamento Duplo',
    'Paletó de Alfaiataria Britânica em Sarja Nobre',
    'Sobretudo de Lã Pura London Cut',
    'Blazer Clássico Estruturado com Lapela Notched',
    'Paletó Vintage com Ombreiras Estruturadas Anos 80',
    'Trench Coat Tradicional com Cinto Fivelado',
    'Casaco Peacoat de Lã Encorpada Naval',
    'Blazer Oversized de Alfaiataria Parisiense',
    'Colete de Alfaiataria Nobre com Forro de Seda',
    'Blazer em Tweed de Lã com Botões Mesclados',
    'Paletó Slim de Lã Fria com Bolsos Embutidos',
    'Casaco Longo de Lã Batida com Corte Reto',
    'Blazer Clássico Chumbo com Acabamento Artesanal',
    'Trench Coat Militar Vintage com Abotoamento Frontal',
    'Blazer Estruturado em Lã Pura com Corte Milanês'
  ],
  'anos-90': [
    'Jaqueta Jeans Oversized 90s Lavagem Vintage',
    'Camisa Flanelada Xadrez Grunge Original 90s',
    'Jaqueta de Couro Biker com Pátina Autêntica',
    'Vestido Slip Dress Minimalista em Seda Acetinada',
    'Jaqueta Bomber Vintage Estilo Streetwear',
    'Calça Mom Jeans em Denim Encorpado 100% Algodão',
    'Camisa Jeans Lavagem Ácida com Bolsos Frontais',
    'Jaqueta Jeans com Forro Acolchoado Grunge',
    'Vestido Tubinho Minimalista Preto Anos 90',
    'Macacão Jeans Vintage com Alças Ajustáveis',
    'Jaqueta Corta-Vento Colorblock Anos 90',
    'Camisa Flanela Lenhador com Toque Macio',
    'Vestido Floral Grunge com Decote Reto',
    'Jaqueta Jeans Reta com Botões de Metal Envelhecido',
    'Colete Jeans com Aplicações Vintage',
    'Calça Baggy Denim com Cintura Alta 90s'
  ],
  'anos-70': [
    'Suéter de Tricô Terracota Feito à Mão',
    'Cardigã Artesanal em Lã Pura Bouclé',
    'Camisa de Seda com Estampa Botânica Psicodélica',
    'Calça Flare de Veludo Cotelê Caramelo',
    'Suéter Gola Alta Jacquard Geométrico 70s',
    'Vestido Midi Boho com Mangas Bufantes',
    'Casaco Acolchoado com Forro de Carneirinho 70s',
    'Cardigã Longo com Franjas e Ponto Artesanal',
    'Camisa com Gola Pontuda e Estampa Paisley',
    'Suéter Tricô Trançado em Lã Natural Oliva',
    'Blusa Estampada Terra Cota com Mangas Sino',
    'Vestido Evasê Estampado em Cores Quentes',
    'Cardigã Vintage com Botões de Madeira Rústica',
    'Suéter Ponto Fang em Tom Mostarda Autêntico',
    'Camisa Floral Vintage em Tecido Fluido 70s',
    'Colete de Veludo Cotelê com Forro Estampado'
  ],
  'seda-linho': [
    'Camisa de Crepe de Seda Natural com Gola Clássica',
    'Vestido Envelope em Seda Pura com Toque Acetinado',
    'Camisa de Linho Puro Europeu Rústico Cru',
    'Blusa Pérola de Seda Pura com Botões de Madrepérola',
    'Vestido Midi Fluido em Linho Lavado Natural',
    'Bata Ampla em Puro Linho com Amaciamento Orgânico',
    'Camisa de Seda Acetinada com Caimento Impecável',
    'Vestido Slip de Seda Pura Tom Sálvia Suave',
    'Camisa de Linho Rústico com Bolsos Utilitários',
    'Blusa de Seda Estampada com Decote em V',
    'Vestido Camisão em Puro Linho Europeu',
    'Camisa de Crepe da China com Pregas Delicadas',
    'Túnica de Linho Cru com Fendas Laterais',
    'Vestido Acetinado Fluido com Alças Delicadas',
    'Camisa de Seda Minimalista Off-White',
    'Saia Midi Evasê em Linho e Seda Nobre'
  ],
  'minimalista': [
    'Suéter Gola Alta em Lã Merino Pura Ultrafina',
    'Blazer Linho Cru Minimalista com Corte Reto',
    'Vestido Tubinho Monocromático em Crepe Nobre',
    'Cardigã em Cashmere Puro Penteado Sem Costura',
    'Casaco Minimalista Estruturado em Lã Chumbo',
    'Blusa Minimalista em Algodão Pima Orgânico',
    'Suéter Gola Redonda em Cashmere e Lã Areia',
    'Sobretudo Minimalista sem Lapela em Lã Fria',
    'Vestido Reto Minimalista em Tom Carvão',
    'Camisa Minimalista com Abotoamento Oculto',
    'Suéter Amplo em Lã Merino com Nervuras Suaves',
    'Casaco Clean em Algodão Encorpado Bege',
    'Tricô Fino Gola Alta em Lã Natural Crua',
    'Blazer Monocromático Desestruturado em Crepe',
    'Vestido Midi Clean com Fenda Posterior',
    'Cardigã Curto em Fibras Nobres Minimalista'
  ]
};

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const catCounters = {
  'alfaiataria': 0,
  'anos-90': 0,
  'anos-70': 0,
  'seda-linho': 0,
  'minimalista': 0
};

products.forEach((prod, index) => {
  const cat = prod.categorySlug;
  const count = catCounters[cat] || 0;
  const titlesList = REFINED_TITLES[cat] || [];
  
  if (titlesList[count]) {
    prod.name = titlesList[count];
    prod.slug = `${slugify(prod.name)}-${index + 1}`;
  }
  
  catCounters[cat] = count + 1;
});

fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(products, null, 2), 'utf-8');
console.log('✅ Todos os 80 títulos e slugs foram traduzidos e refinados com excelência editorial em Português!');
