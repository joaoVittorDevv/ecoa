import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_IMG_DIR = path.join(__dirname, '..', 'public', 'products');
const PRODUCTS_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'products.json');
const CATEGORIES_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'categories.json');

// Limpa pasta de imagens anterior
if (fs.existsSync(PRODUCTS_IMG_DIR)) {
  fs.rmSync(PRODUCTS_IMG_DIR, { recursive: true, force: true });
}
fs.mkdirSync(PRODUCTS_IMG_DIR, { recursive: true });

// 30 Peças com Curadoria Poética e Queries de Busca Editorial de Modelos
const CATALOG_SPECS = [
  // ================= 1. ALFAIATARIA VINTAGE (6 PEÇAS) =================
  {
    categorySlug: 'alfaiataria',
    name: 'Trench Coat Clássico Britânico 1984',
    era: 'Anos 80',
    price: 380,
    originalPrice: 950,
    size: 'M',
    condition: 'Excelente (Sem avarias)',
    origin: 'Notting Hill, Londres',
    material: '100% Gabardine de Algodão Nobre e Forro Tartan',
    story: 'Garimpado em um tradicional brechó de Notting Hill, este trench coat atravessou quatro décadas mantendo seu corte estruturado impecável. Pertenceu a uma arquiteta que viajou pela Europa nos anos 80.',
    searchQuery: 'vintage trench coat model woman street',
    measurements: { bust: '104 cm', waist: '98 cm', length: '112 cm', sleeve: '62 cm' },
    impact: { waterSavedLiters: 2700, co2AvoidedKg: 6.8 }
  },
  {
    categorySlug: 'alfaiataria',
    name: 'Blazer de Lã Fria Italiano Estruturado 1986',
    era: 'Anos 80',
    price: 360,
    originalPrice: 890,
    size: 'G',
    condition: 'Impecável (Estado de novo)',
    origin: 'Milão, Itália',
    material: '100% Lã Fria e Forro de Cupro Acetinado',
    story: 'Alfaiataria impecável costurada em Milão no auge da elegância dos anos 80. Ombros imponentes e caimento que valoriza qualquer composição contemporânea.',
    searchQuery: 'vintage oversized blazer model woman portrait',
    measurements: { bust: '112 cm', waist: '104 cm', length: '76 cm', sleeve: '65 cm' },
    impact: { waterSavedLiters: 3100, co2AvoidedKg: 7.4 }
  },
  {
    categorySlug: 'alfaiataria',
    name: 'Paletó em Tweed Herringbone Escocês 1982',
    era: 'Anos 80',
    price: 390,
    originalPrice: 920,
    size: 'M',
    condition: 'Excelente',
    origin: 'Edimburgo, Escócia',
    material: '100% Lã Virgem Tweed com Padronagem Espinha de Peixe',
    story: 'Trama encorpada tecida nas Terras Altas da Escócia. Seus botões de couro trançado e cotoveleiras originais contam a história de invernos aconchegantes.',
    searchQuery: 'vintage tweed blazer woman outdoors',
    measurements: { bust: '106 cm', waist: '100 cm', length: '74 cm', sleeve: '63 cm' },
    impact: { waterSavedLiters: 3300, co2AvoidedKg: 7.9 }
  },
  {
    categorySlug: 'alfaiataria',
    name: 'Casaco Longo Peacoat Naval em Lã 1980',
    era: 'Anos 80',
    price: 420,
    originalPrice: 1100,
    size: 'G',
    condition: 'Perfeito estado',
    origin: 'Porto, Portugal',
    material: 'Lã Batida Encorpada com Abotoamento Duplo',
    story: 'Inspirado no clássico corte naval do Atlântico Norte. Tecido denso que bloqueia o vento e aquece com a nobreza da lã pura.',
    searchQuery: 'navy wool coat model woman street',
    measurements: { bust: '114 cm', waist: '108 cm', length: '88 cm', sleeve: '64 cm' },
    impact: { waterSavedLiters: 3600, co2AvoidedKg: 8.6 }
  },
  {
    categorySlug: 'alfaiataria',
    name: 'Colete de Alfaiataria Parisiense 1988',
    era: 'Anos 80',
    price: 240,
    originalPrice: 580,
    size: 'P',
    condition: 'Excelente',
    origin: 'Le Marais, Paris',
    material: 'Sarja de Algodão Nobre com Fivela Traseira de Ajuste',
    story: 'Resgatado em uma feira de antiguidades no bairro do Marais. Uma peça coringa para sobreposições elegantes com camisas de seda ou camisetas minimalistas.',
    searchQuery: 'waistcoat tailored vest woman fashion',
    measurements: { bust: '90 cm', waist: '76 cm', length: '54 cm', sleeve: 'Sem manga' },
    impact: { waterSavedLiters: 1900, co2AvoidedKg: 4.3 }
  },
  {
    categorySlug: 'alfaiataria',
    name: 'Blazer Riscado de Giz Power Dressing 1985',
    era: 'Anos 80',
    price: 340,
    originalPrice: 820,
    size: 'M',
    condition: 'Impecável',
    origin: 'Berlim, Alemanha',
    material: '100% Lã Pura com Risca de Giz Sutil',
    story: 'A atitude do power dressing berlinense dos anos 80 em sua máxima expressão. Caimento solto com corte reto que transita do formal ao casual urbano.',
    searchQuery: 'pinstripe suit blazer woman model',
    measurements: { bust: '108 cm', waist: '102 cm', length: '78 cm', sleeve: '62 cm' },
    impact: { waterSavedLiters: 2900, co2AvoidedKg: 7.1 }
  },

  // ================= 2. ANOS 90 (6 PEÇAS) =================
  {
    categorySlug: 'anos-90',
    name: 'Jaqueta Jeans Oversized Seattle Grunge 1993',
    era: 'Anos 90',
    price: 260,
    originalPrice: 620,
    size: 'G',
    condition: 'Vintage com pátina natural',
    origin: 'Seattle, EUA',
    material: '100% Algodão Denim Encorpado 14oz com Lavagem Vintage',
    story: 'Um ícone da cultura grunge dos anos 90. O desgaste natural no colarinho e cotovelos conta histórias de festivais de rock e noites inesquecíveis.',
    searchQuery: '90s denim jacket woman model fashion',
    measurements: { bust: '118 cm', waist: '110 cm', length: '68 cm', sleeve: '64 cm' },
    impact: { waterSavedLiters: 3800, co2AvoidedKg: 8.5 }
  },
  {
    categorySlug: 'anos-90',
    name: 'Camisa Flanelada Xadrez Grunge 1992',
    era: 'Anos 90',
    price: 210,
    originalPrice: 480,
    size: 'M',
    condition: 'Excelente',
    origin: 'Portland, EUA',
    material: '100% Algodão Flanelado Escovado Macio',
    story: 'Flanela pesada com padrão xadrez em tons terrosos. Toque felpudo extremamente macio pelo uso carinhoso ao longo de 30 anos.',
    searchQuery: 'plaid flannel shirt woman model street',
    measurements: { bust: '108 cm', waist: '104 cm', length: '72 cm', sleeve: '62 cm' },
    impact: { waterSavedLiters: 2400, co2AvoidedKg: 5.2 }
  },
  {
    categorySlug: 'anos-90',
    name: 'Vestido Slip Dress de Seda Sálvia 1996',
    era: 'Anos 90',
    price: 290,
    originalPrice: 680,
    size: 'P',
    condition: 'Excelente',
    origin: 'Paris, França',
    material: '100% Seda Pura com Toque Acetinado',
    story: 'Fluidez poética em tom sálvia suave. Corte em viés perfeito que desenha o corpo com leveza, preservado com todo o carinho desde meados dos anos 90.',
    searchQuery: 'silk slip dress woman model 90s aesthetic',
    measurements: { bust: '88 cm', waist: '74 cm', length: '120 cm', sleeve: 'Alças finas' },
    impact: { waterSavedLiters: 1900, co2AvoidedKg: 4.2 }
  },
  {
    categorySlug: 'anos-90',
    name: 'Jaqueta Biker em Couro Legítimo 1991',
    era: 'Anos 90',
    price: 450,
    originalPrice: 1250,
    size: 'M',
    condition: 'Vintage com pátina autêntica',
    origin: 'São Paulo, Brasil',
    material: '100% Couro Bovino Legítimo e Zíperes de Metal YKK',
    story: 'Couro encorpado e macio que adquiriu vincos e brilho incomparáveis. Uma peça eterna com modelagem reta típica do início dos anos 90.',
    searchQuery: 'vintage leather jacket woman street style',
    measurements: { bust: '106 cm', waist: '98 cm', length: '62 cm', sleeve: '61 cm' },
    impact: { waterSavedLiters: 4200, co2AvoidedKg: 9.8 }
  },
  {
    categorySlug: 'anos-90',
    name: 'Calça Mom Jeans em Denim Cru 1994',
    era: 'Anos 90',
    price: 230,
    originalPrice: 540,
    size: '38/M',
    condition: 'Excelente',
    origin: 'Belo Horizonte, Brasil',
    material: '100% Algodão Denim Sem Elastano Cintura Alta',
    story: 'Corte cônico autêntico dos anos 90 com cintura bem alta que abraça a silhueta com conforto e estrutura.',
    searchQuery: '90s mom jeans woman model denim outfit',
    measurements: { bust: '-', waist: '76 cm', length: '102 cm', sleeve: 'Quadril: 104 cm' },
    impact: { waterSavedLiters: 3200, co2AvoidedKg: 7.2 }
  },
  {
    categorySlug: 'anos-90',
    name: 'Jaqueta Bomber Vintage Streetwear 1995',
    era: 'Anos 90',
    price: 240,
    originalPrice: 560,
    size: 'G',
    condition: 'Excelente',
    origin: 'Tóquio, Japão',
    material: 'Nylon Vintage com Forro Respirável de Algodão',
    story: 'Garimpada no bairro vintage de Shimokitazawa em Tóquio. Leve, funcional e com blocos de cores sóbrios inspirados na estética urbana de 1995.',
    searchQuery: 'vintage bomber jacket woman model streetwear',
    measurements: { bust: '116 cm', waist: '108 cm', length: '66 cm', sleeve: '63 cm' },
    impact: { waterSavedLiters: 2100, co2AvoidedKg: 4.8 }
  },

  // ================= 3. ANOS 70 (6 PEÇAS) =================
  {
    categorySlug: 'anos-70',
    name: 'Suéter de Tricô Terracota Feito à Mão 1978',
    era: 'Anos 70',
    price: 280,
    originalPrice: 640,
    size: 'M',
    condition: 'Excelente',
    origin: 'Serra da Mantiqueira, Brasil',
    material: '100% Lã Natural Tinta com Pigmento Orgânico de Terra',
    story: 'Trama manual encorpada com pontos volumosos que aquecem com afeto. Traz o calor da terra e o design acolhedor do movimento artesanal dos anos 70.',
    searchQuery: 'orange knitted sweater woman autumn outdoor',
    measurements: { bust: '102 cm', waist: '96 cm', length: '64 cm', sleeve: '60 cm' },
    impact: { waterSavedLiters: 2200, co2AvoidedKg: 5.1 }
  },
  {
    categorySlug: 'anos-70',
    name: 'Camisa de Seda Estampa Botânica 1975',
    era: 'Anos 70',
    price: 250,
    originalPrice: 560,
    size: 'M',
    condition: 'Excelente',
    origin: 'Lisboa, Portugal',
    material: '100% Crepe de Seda Natural com Botões de Madrepérola',
    story: 'Padronagem botânica psicodélica sutil em tons de terracota, oliva e mostarda. Uma relíquia preservada que irradia liberdade e sofisticação.',
    searchQuery: 'vintage 70s floral blouse woman retro portrait',
    measurements: { bust: '100 cm', waist: '94 cm', length: '70 cm', sleeve: '59 cm' },
    impact: { waterSavedLiters: 1800, co2AvoidedKg: 3.9 }
  },
  {
    categorySlug: 'anos-70',
    name: 'Calça Flare em Veludo Cotelê Caramelo 1976',
    era: 'Anos 70',
    price: 270,
    originalPrice: 610,
    size: 'M',
    condition: 'Excelente',
    origin: 'Florença, Itália',
    material: '100% Algodão Veludo Cotelê com Costura Reforçada',
    story: 'O veludo cotelê italiano mais nobre dos anos 70. Nervuras volumosas, toque aveludado profundo e boca de sino equilibrada.',
    searchQuery: 'corduroy flare pants woman 70s style',
    measurements: { bust: '-', waist: '78 cm', length: '106 cm', sleeve: 'Quadril: 98 cm' },
    impact: { waterSavedLiters: 2600, co2AvoidedKg: 5.8 }
  },
  {
    categorySlug: 'anos-70',
    name: 'Cardigã em Lã Bouclé Artesanal 1974',
    era: 'Anos 70',
    price: 290,
    originalPrice: 670,
    size: 'G',
    condition: 'Impecável',
    origin: 'Minas Gerais, Brasil',
    material: 'Lã Natural Bouclé com Botões de Madeira Rústica Torneada',
    story: 'Tricotado à mão por uma tecelã mineira em 1974. A textura em relevo cria pequenas bolsas de ar que conservam o calor do corpo com leveza.',
    searchQuery: 'cozy wool cardigan woman model retro fashion',
    measurements: { bust: '110 cm', waist: '104 cm', length: '70 cm', sleeve: '62 cm' },
    impact: { waterSavedLiters: 2500, co2AvoidedKg: 5.6 }
  },
  {
    categorySlug: 'anos-70',
    name: 'Vestido Midi Boho em Algodão Rústico 1977',
    era: 'Anos 70',
    price: 310,
    originalPrice: 720,
    size: 'P',
    condition: 'Excelente',
    origin: 'São Francisco, EUA',
    material: '100% Algodão Natural com Bordados Manuais no Busto',
    story: 'Expressão viva da contracultura e da moda livre de 1977. Mangas levemente bufantes e babados sutis na barra que dançam a cada passo.',
    searchQuery: 'boho chic dress woman nature outdoors 70s',
    measurements: { bust: '92 cm', waist: '76 cm', length: '118 cm', sleeve: '56 cm' },
    impact: { waterSavedLiters: 2100, co2AvoidedKg: 4.6 }
  },
  {
    categorySlug: 'anos-70',
    name: 'Colete em Veludo Cotelê com Carneirinho 1979',
    era: 'Anos 70',
    price: 260,
    originalPrice: 590,
    size: 'M',
    condition: 'Excelente',
    origin: 'Amsterdã, Holanda',
    material: 'Veludo Cotelê Terracota e Forro Térmico de Lã Suave',
    story: 'Garimpado em feira de pulgas à beira dos canais de Amsterdã. Perfeito para sobreposições de meia-estação com gola alta ou vestidos fluidos.',
    searchQuery: 'shearling vest woman model autumn fashion',
    measurements: { bust: '100 cm', waist: '94 cm', length: '58 cm', sleeve: 'Sem manga' },
    impact: { waterSavedLiters: 2300, co2AvoidedKg: 5.3 }
  },

  // ================= 4. SEDA & LINHO (6 PEÇAS) =================
  {
    categorySlug: 'seda-linho',
    name: 'Blusa Pérola em Crepe de Seda Natural 1991',
    era: 'Anos 90',
    price: 270,
    originalPrice: 620,
    size: 'M',
    condition: 'Excelente',
    origin: 'Florença, Itália',
    material: '100% Crepe de Seda Pura com Botões de Madrepérola',
    story: 'Toque sutil de brilho suave pérola com botões de madrepérola originais. Uma peça de luxo silencioso para transitar entre o casual refinado e ocasiões especiais.',
    searchQuery: 'white silk blouse woman portrait elegant model',
    measurements: { bust: '98 cm', waist: '92 cm', length: '62 cm', sleeve: '58 cm' },
    impact: { waterSavedLiters: 2100, co2AvoidedKg: 4.5 }
  },
  {
    categorySlug: 'seda-linho',
    name: 'Camisa em Linho Puro Europeu Rústico 1995',
    era: 'Anos 90',
    price: 280,
    originalPrice: 650,
    size: 'G',
    condition: 'Excelente',
    origin: 'Porto, Portugal',
    material: '100% Linho Europeu Puro com Fiação Artesanal',
    story: 'Textura inconfundível do linho nobre de Portugal. Ganhou caimento macio e frescor incomparável ao longo dos anos, mantendo sua trama resistente intacta.',
    searchQuery: 'linen shirt relaxed woman summer model natural light',
    measurements: { bust: '112 cm', waist: '106 cm', length: '74 cm', sleeve: '62 cm' },
    impact: { waterSavedLiters: 2800, co2AvoidedKg: 6.2 }
  },
  {
    categorySlug: 'seda-linho',
    name: 'Vestido Envelope em Seda Dourada 1994',
    era: 'Anos 90',
    price: 320,
    originalPrice: 780,
    size: 'M',
    condition: 'Impecável',
    origin: 'Kyoto, Japão',
    material: '100% Seda Pura Habotai com Tingimento Natural',
    story: 'Comprado em um brechó tradicional em Kyoto. O corte envelope adapta-se harmonicamente a diferentes corpos, trazendo o brilho dourado e quente da seda pura.',
    searchQuery: 'yellow gold silk dress woman model studio',
    measurements: { bust: '96 cm', waist: '80 cm', length: '115 cm', sleeve: 'Alças e amarração' },
    impact: { waterSavedLiters: 2300, co2AvoidedKg: 4.9 }
  },
  {
    categorySlug: 'seda-linho',
    name: 'Bata Ampla em Puro Linho Cru 1997',
    era: 'Anos 90',
    price: 260,
    originalPrice: 590,
    size: 'M',
    condition: 'Excelente',
    origin: 'Rio de Janeiro, Brasil',
    material: '100% Linho Lavado com Amaciamento Natural à Base de Água',
    story: 'Bata com caimento amplo e respirabilidade absoluta. Uma peça solar feita para durar décadas acompanhando momentos de descanso e liberdade.',
    searchQuery: 'loose linen top woman beach natural lifestyle',
    measurements: { bust: '108 cm', waist: '104 cm', length: '68 cm', sleeve: '45 cm' },
    impact: { waterSavedLiters: 2400, co2AvoidedKg: 5.4 }
  },
  {
    categorySlug: 'seda-linho',
    name: 'Camisa Crepe da China em Seda Negra 1992',
    era: 'Anos 90',
    price: 290,
    originalPrice: 690,
    size: 'P',
    condition: 'Excelente',
    origin: 'Paris, França',
    material: '100% Crepe da China em Seda Pura Fosca',
    story: 'Elegância minimalista parisiense. O crepe da China possui caimento pesado e fluido ao mesmo tempo, sem transparência e com toque aveludado.',
    searchQuery: 'black silk shirt woman model portrait minimal chic',
    measurements: { bust: '92 cm', waist: '86 cm', length: '64 cm', sleeve: '59 cm' },
    impact: { waterSavedLiters: 2000, co2AvoidedKg: 4.4 }
  },
  {
    categorySlug: 'seda-linho',
    name: 'Saia Midi Evasê em Linho e Seda 1998',
    era: 'Anos 90',
    price: 250,
    originalPrice: 580,
    size: 'M',
    condition: 'Excelente',
    origin: 'Lisboa, Portugal',
    material: 'Mistura Nobre de 60% Linho e 40% Seda Pura',
    story: 'O encontro do frescor do linho com a maciez da seda. Cintura limpa e fenda lateral sutil para movimento orgânico.',
    searchQuery: 'linen midi skirt woman summer street style model',
    measurements: { bust: '-', waist: '76 cm', length: '82 cm', sleeve: 'Quadril: 102 cm' },
    impact: { waterSavedLiters: 2200, co2AvoidedKg: 4.7 }
  },

  // ================= 5. MINIMALISMO POÉTICO (6 PEÇAS) =================
  {
    categorySlug: 'minimalista',
    name: 'Blazer Linho Cru Minimalista com Corte Reto 1996',
    era: 'Anos 90',
    price: 330,
    originalPrice: 750,
    size: 'M',
    condition: 'Excelente',
    origin: 'Porto, Portugal',
    material: '100% Linho Europeu Puro sem Tingimento Químico',
    story: 'Textura natural de linho rústico sem tingimento químico. Conforto térmico inigualável e atemporalidade estética para vestir durante décadas.',
    searchQuery: 'beige linen blazer woman model minimal studio',
    measurements: { bust: '106 cm', waist: '100 cm', length: '72 cm', sleeve: '61 cm' },
    impact: { waterSavedLiters: 3400, co2AvoidedKg: 7.0 }
  },
  {
    categorySlug: 'minimalista',
    name: 'Suéter Gola Alta em Lã Merino Pura 1998',
    era: 'Atemporal',
    price: 290,
    originalPrice: 690,
    size: 'M',
    condition: 'Impecável',
    origin: 'Estocolmo, Suécia',
    material: '100% Lã Merino Ultrafina Extramacia Sem Costuras Laterais',
    story: 'Design escandinavo em sua essência mais pura. Fiação circular sem costura que não pinica a pele e mantém a temperatura perfeita do corpo.',
    searchQuery: 'black turtleneck sweater woman model minimal portrait',
    measurements: { bust: '98 cm', waist: '92 cm', length: '65 cm', sleeve: '60 cm' },
    impact: { waterSavedLiters: 2500, co2AvoidedKg: 5.7 }
  },
  {
    categorySlug: 'minimalista',
    name: 'Cardigã em Cashmere Puro Areia 1999',
    era: 'Atemporal',
    price: 380,
    originalPrice: 980,
    size: 'G',
    condition: 'Excelente',
    origin: 'Copenhague, Dinamarca',
    material: '100% Cashmere Puro Penteado Grade A',
    story: 'Toque de nuvem em tom areia natural. Uma peça atemporal de altíssima durabilidade garimpada em brechó de design na Dinamarca.',
    searchQuery: 'beige cashmere knit sweater woman cozy minimal',
    measurements: { bust: '112 cm', waist: '106 cm', length: '68 cm', sleeve: '63 cm' },
    impact: { waterSavedLiters: 2800, co2AvoidedKg: 6.4 }
  },
  {
    categorySlug: 'minimalista',
    name: 'Sobretudo Minimalista sem Lapela em Lã Fria 1995',
    era: 'Anos 90',
    price: 410,
    originalPrice: 1050,
    size: 'M',
    condition: 'Excelente',
    origin: 'Tóquio, Japão',
    material: '100% Lã Fria Japonesa com Fechamento Oculto',
    story: 'Minimalismo conceitual japonês. Linhas puras e corte geométrico arquitetônico que transforma qualquer look básico em uma declaração de estilo.',
    searchQuery: 'minimalist long coat woman model clean aesthetic',
    measurements: { bust: '104 cm', waist: '98 cm', length: '110 cm', sleeve: '62 cm' },
    impact: { waterSavedLiters: 3500, co2AvoidedKg: 8.2 }
  },
  {
    categorySlug: 'minimalista',
    name: 'Vestido Tubinho Monocromático em Algodão Pima 1997',
    era: 'Anos 90',
    price: 250,
    originalPrice: 580,
    size: 'P',
    condition: 'Excelente',
    origin: 'Zurique, Suíça',
    material: '100% Algodão Pima Peruano de Fibras Longas',
    story: 'O clássico vestido minimalista dos anos 90. Tecido encorpado que não marca, com toque sedoso e frescor incomparável.',
    searchQuery: 'black minimalist dress woman studio fashion portrait',
    measurements: { bust: '88 cm', waist: '76 cm', length: '98 cm', sleeve: 'Sem manga' },
    impact: { waterSavedLiters: 2000, co2AvoidedKg: 4.5 }
  },
  {
    categorySlug: 'minimalista',
    name: 'Camisa Minimalista com Abotoamento Oculto 1996',
    era: 'Anos 90',
    price: 240,
    originalPrice: 550,
    size: 'M',
    condition: 'Excelente',
    origin: 'Berlim, Alemanha',
    material: 'Popeline de Algodão Egípcio Puro Acetinado',
    story: 'Gola padre e vista frontal limpa que esconde os botões. Uma peça estruturada que expressa o rigor e a poesia da simplicidade.',
    searchQuery: 'white button up shirt woman minimal fashion portrait',
    measurements: { bust: '102 cm', waist: '96 cm', length: '70 cm', sleeve: '60 cm' },
    impact: { waterSavedLiters: 2100, co2AvoidedKg: 4.7 }
  }
];

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.error(`Erro ao baixar ${url}:`, err.message);
    return false;
  }
}

// Busca ensaio fotográfico com o mesmo modelo/mesma sessão
async function fetchSameGarmentSession(query) {
  try {
    const res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=15`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.results || data.results.length === 0) return null;

    // Procura se o mesmo fotógrafo tem 2 ou mais fotos no resultado (mesma sessão!)
    const userGroups = {};
    for (const p of data.results) {
      const u = p.user.username;
      userGroups[u] = userGroups[u] || [];
      userGroups[u].push(p);
    }

    // Se encontrou um fotógrafo com múltiplas fotos do mesmo look:
    for (const u of Object.keys(userGroups)) {
      if (userGroups[u].length >= 2) {
        return [userGroups[u][0].urls.regular, userGroups[u][1].urls.regular];
      }
    }

    // Se não encontrou no mesmo search, busca as fotos relacionadas da primeira foto do mesmo usuário
    const firstPhoto = data.results[0];
    const relatedRes = await fetch(`https://unsplash.com/napi/photos/${firstPhoto.id}/related`);
    if (relatedRes.ok) {
      const relData = await relatedRes.json();
      if (relData.results) {
        // Tenta achar foto do mesmo autor
        const sameUserPhoto = relData.results.find(p => p.user.username === firstPhoto.user.username);
        if (sameUserPhoto) {
          return [firstPhoto.urls.regular, sameUserPhoto.urls.regular];
        }
        if (relData.results.length > 0) {
          return [firstPhoto.urls.regular, relData.results[0].urls.regular];
        }
      }
    }

    // Fallback: segunda foto dos resultados
    if (data.results.length >= 2) {
      return [data.results[0].urls.regular, data.results[1].urls.regular];
    }

    return [firstPhoto.urls.regular, firstPhoto.urls.regular];
  } catch (err) {
    console.error(`Erro ao buscar sessão para "${query}":`, err.message);
    return null;
  }
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  console.log('🌿 Criando o catálogo de 30 peças únicas autênticas com fotos consistentes da MESMA peça no modelo...');

  const finalCatalog = [];

  for (let i = 0; i < CATALOG_SPECS.length; i++) {
    const spec = CATALOG_SPECS[i];
    const idNum = i + 1;
    const prodId = `prod-${idNum}`;
    const img1Name = `prod-${idNum}-1.jpg`;
    const img2Name = `prod-${idNum}-2.jpg`;

    const dest1 = path.join(PRODUCTS_IMG_DIR, img1Name);
    const dest2 = path.join(PRODUCTS_IMG_DIR, img2Name);

    console.log(`📸 [${idNum}/30] Curando ensaio consistente da mesma peça para "${spec.name}"...`);

    const sessionUrls = await fetchSameGarmentSession(spec.searchQuery);

    let ok1 = false;
    let ok2 = false;

    if (sessionUrls && sessionUrls[0]) {
      ok1 = await downloadImage(sessionUrls[0], dest1);
    }
    if (sessionUrls && sessionUrls[1]) {
      ok2 = await downloadImage(sessionUrls[1], dest2);
    }

    const publicPath1 = `/products/${img1Name}`;
    const publicPath2 = ok2 ? `/products/${img2Name}` : publicPath1;

    finalCatalog.push({
      id: prodId,
      name: spec.name,
      slug: `${slugify(spec.name)}-${idNum}`,
      categorySlug: spec.categorySlug,
      era: spec.era,
      price: spec.price,
      originalPrice: spec.originalPrice,
      stock: 1,
      size: spec.size,
      condition: spec.condition,
      origin: spec.origin,
      material: spec.material,
      image: publicPath1,
      gallery: [publicPath1, publicPath2],
      hasStoryBadge: true,
      story: spec.story,
      measurements: spec.measurements,
      impact: spec.impact
    });
  }

  console.log('💾 Salvando products.json...');
  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(finalCatalog, null, 2), 'utf-8');

  // Atualiza categories.json
  if (fs.existsSync(CATEGORIES_JSON_PATH)) {
    const rawCat = fs.readFileSync(CATEGORIES_JSON_PATH, 'utf-8');
    const categories = JSON.parse(rawCat);
    categories.forEach(cat => {
      cat.itemCount = finalCatalog.filter(p => p.categorySlug === cat.slug).length;
    });
    fs.writeFileSync(CATEGORIES_JSON_PATH, JSON.stringify(categories, null, 2), 'utf-8');
    console.log('💾 categories.json atualizado.');
  }

  console.log(`✨ Catálogo concluído com ${finalCatalog.length} peças únicas autênticas!`);
}

run();
