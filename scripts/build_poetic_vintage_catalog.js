import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_IMG_DIR = path.join(__dirname, '..', 'public', 'products');
const PRODUCTS_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'products.json');
const CATEGORIES_JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'categories.json');

if (!fs.existsSync(PRODUCTS_IMG_DIR)) {
  fs.mkdirSync(PRODUCTS_IMG_DIR, { recursive: true });
}

// 30 Peças Poéticas Curadas com Pares de Busca Específicos para Fotos de Modelos e Texturas
const VINTAGE_CURATION = [
  // ================= ALFAIATARIA VINTAGE (6 PEÇAS) =================
  {
    categorySlug: 'alfaiataria',
    name: 'Trench Coat Clássico Britânico 1984',
    era: 'Anos 80',
    price: 380,
    originalPrice: 950,
    size: 'M',
    condition: 'Excelente (Sem avarias)',
    origin: 'Notting Hill, Londres',
    material: '100% Gabardine de Algodão Nobre e Forro Xadrez Tartan',
    story: 'Garimpado em um tradicional brechó de Notting Hill, este trench coat atravessou quatro décadas mantendo seu corte estruturado impecável. Pertenceu a uma arquiteta que viajou pela Europa nos anos 80.',
    modelQuery: 'vintage trench coat model woman street',
    detailQuery: 'trench coat fabric texture detail buttons',
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
    modelQuery: 'vintage wool blazer model woman',
    detailQuery: 'suit fabric wool texture detail houndstooth',
    measurements: { bust: '112 cm', waist: '104 cm', length: '76 cm', sleeve: '65 cm' },
    impact: { waterSavedLiters: 3100, co2AvoidedKg: 7.4 }
  },
  {
    categorySlug: 'alfaiataria',
    name: 'Paletó em Tweed Escocês Herringbone 1982',
    era: 'Anos 80',
    price: 390,
    originalPrice: 920,
    size: 'M',
    condition: 'Excelente',
    origin: 'Edimburgo, Escócia',
    material: '100% Lã Virgem Tweed com Padronagem Espinha de Peixe',
    story: 'Trama encorpada tecida nas Terras Altas da Escócia. Seus botões de couro trançado e cotoveleiras originais contam a história de invernos aconchegantes.',
    modelQuery: 'vintage tweed jacket model outdoors',
    detailQuery: 'tweed herringbone wool texture macro',
    measurements: { bust: '106 cm', waist: '100 cm', length: '74 cm', sleeve: '63 cm' },
    impact: { waterSavedLiters: 3300, co2AvoidedKg: 7.9 }
  },
  {
    categorySlug: 'alfaiataria',
    name: 'Casaco Longo Peacoat Naval de Lã 1980',
    era: 'Anos 80',
    price: 420,
    originalPrice: 1100,
    size: 'G',
    condition: 'Perfeito estado',
    origin: 'Porto, Portugal',
    material: 'Lã Batida Encorpada com Abotoamento Duplo de Âncora',
    story: 'Inspirado no clássico uniforme naval do Atlântico Norte. Tecido denso que bloqueia o vento e aquece com a nobreza da lã pura.',
    modelQuery: 'navy wool coat model winter fashion',
    detailQuery: 'wool peacoat fabric texture buttons',
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
    modelQuery: 'tailored vest waistcoat fashion model',
    detailQuery: 'suit vest tailoring fabric texture',
    measurements: { bust: '90 cm', waist: '76 cm', length: '54 cm', sleeve: 'Sem manga' },
    impact: { waterSavedLiters: 1900, co2AvoidedKg: 4.3 }
  },
  {
    categorySlug: 'alfaiataria',
    name: 'Blazer Oversized Riscado de Giz 1985',
    era: 'Anos 80',
    price: 340,
    originalPrice: 820,
    size: 'M',
    condition: 'Impecável',
    origin: 'Berlim, Alemanha',
    material: '100% Lã Pura com Risca de Giz Sutil',
    story: 'A atitude do power dressing berlinense dos anos 80 em sua máxima expressão. Caimento solto com corte reto que transita do formal ao casual urbano.',
    modelQuery: 'pinstripe blazer oversized model street style',
    detailQuery: 'pinstripe fabric texture close up',
    measurements: { bust: '108 cm', waist: '102 cm', length: '78 cm', sleeve: '62 cm' },
    impact: { waterSavedLiters: 2900, co2AvoidedKg: 7.1 }
  },

  // ================= ANOS 90 (6 PEÇAS) =================
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
    modelQuery: 'vintage 90s denim jacket model grunge',
    detailQuery: 'denim texture fabric stitching blue jeans',
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
    story: 'Flanela pesada com padrão xadrez em tons de verde musgo e vinho. Toque felpudo extremamente macio pelo uso carinhoso ao longo de 30 anos.',
    modelQuery: '90s plaid flannel shirt model streetwear',
    detailQuery: 'plaid flannel fabric texture macro',
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
    modelQuery: 'slip dress silk model 90s fashion aesthetic',
    detailQuery: 'silk satin fabric green sage texture draped',
    measurements: { bust: '88 cm', waist: '74 cm', length: '120 cm', sleeve: 'Alças finas' },
    impact: { waterSavedLiters: 1900, co2AvoidedKg: 4.2 }
  },
  {
    categorySlug: 'anos-90',
    name: 'Jaqueta Biker de Couro Vintage 1991',
    era: 'Anos 90',
    price: 450,
    originalPrice: 1250,
    size: 'M',
    condition: 'Vintage com pátina autêntica',
    origin: 'São Paulo, Brasil',
    material: '100% Couro Bovino Legítimo e Zíperes de Metal YKK',
    story: 'Couro encorpado e macio que adquiriu vincos e brilho incomparáveis. Uma peça eterna com modelagem reta típica do início dos anos 90.',
    modelQuery: 'vintage leather jacket model 90s street',
    detailQuery: 'leather jacket texture zipper vintage patina',
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
    modelQuery: 'mom jeans 90s model retro fashion denim',
    detailQuery: 'blue jeans denim texture pocket rivets',
    measurements: { bust: '-', waist: '76 cm', length: '102 cm', sleeve: 'Quadril: 104 cm' },
    impact: { waterSavedLiters: 3200, co2AvoidedKg: 7.2 }
  },
  {
    categorySlug: 'anos-90',
    name: 'Jaqueta Bomber Corta-Vento Retro 1995',
    era: 'Anos 90',
    price: 240,
    originalPrice: 560,
    size: 'G',
    condition: 'Excelente',
    origin: 'Tóquio, Japão',
    material: 'Nylon Vintage com Forro Respirável de Algodão',
    story: 'Garimpada no bairro vintage de Shimokitazawa em Tóquio. Leve, funcional e com blocos de cores sóbrios inspirados na estética urbana de 1995.',
    modelQuery: 'vintage bomber jacket model streetwear',
    detailQuery: 'bomber jacket fabric collar ribbed texture',
    measurements: { bust: '116 cm', waist: '108 cm', length: '66 cm', sleeve: '63 cm' },
    impact: { waterSavedLiters: 2100, co2AvoidedKg: 4.8 }
  },

  // ================= ANOS 70 (6 PEÇAS) =================
  {
    categorySlug: 'anos-70',
    name: 'Suéter Tricô Terracota Feito à Mão 1978',
    era: 'Anos 70',
    price: 280,
    originalPrice: 640,
    size: 'M',
    condition: 'Excelente',
    origin: 'Serra da Mantiqueira, Brasil',
    material: '100% Lã Natural Tinta com Pigmento Orgânico de Terra',
    story: 'Trama manual encorpada com pontos volumosos que aquecem com afeto. Traz o calor da terra e o design acolhedor do movimento artesanal dos anos 70.',
    modelQuery: 'chunky knit sweater model autumn warm orange',
    detailQuery: 'cable knit wool texture handmade yarn macro',
    measurements: { bust: '102 cm', waist: '96 cm', length: '64 cm', sleeve: '60 cm' },
    impact: { waterSavedLiters: 2200, co2AvoidedKg: 5.1 }
  },
  {
    categorySlug: 'anos-70',
    name: 'Camisa de Seda Estampa Psicodélica Botânica 1975',
    era: 'Anos 70',
    price: 250,
    originalPrice: 560,
    size: 'M',
    condition: 'Excelente',
    origin: 'Lisboa, Portugal',
    material: '100% Crepe de Seda Natural com Botões de Madrepérola',
    story: 'Padronagem botânica psicodélica sutil em tons de terracota, oliva e mostarda. Uma relíquia preservada que irradia liberdade e sofisticação.',
    modelQuery: '70s floral silk blouse model vintage retro',
    detailQuery: 'vintage floral pattern fabric texture 70s',
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
    modelQuery: 'corduroy pants model 70s fashion aesthetic',
    detailQuery: 'corduroy fabric texture macro brown caramel',
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
    modelQuery: 'vintage cardigan wool model cozy fashion',
    detailQuery: 'boucle wool yarn texture detail macro',
    measurements: { bust: '110 cm', waist: '104 cm', length: '70 cm', sleeve: '62 cm' },
    impact: { waterSavedLiters: 2500, co2AvoidedKg: 5.6 }
  },
  {
    categorySlug: 'anos-70',
    name: 'Vestido Midi Boho Chic em Algodão Rústico 1977',
    era: 'Anos 70',
    price: 310,
    originalPrice: 720,
    size: 'P',
    condition: 'Excelente',
    origin: 'São Francisco, EUA',
    material: '100% Algodão Natural com Bordados Manuais no Busto',
    story: 'Expressão viva da contracultura e da moda livre de 1977. Mangas levemente bufantes e babados sutis na barra que dançam a cada passo.',
    modelQuery: '70s boho vintage dress model outdoors nature',
    detailQuery: 'embroidered cotton fabric vintage texture',
    measurements: { bust: '92 cm', waist: '76 cm', length: '118 cm', sleeve: '56 cm' },
    impact: { waterSavedLiters: 2100, co2AvoidedKg: 4.6 }
  },
  {
    categorySlug: 'anos-70',
    name: 'Colete de Veludo Cotelê com Carneirinho 1979',
    era: 'Anos 70',
    price: 260,
    originalPrice: 590,
    size: 'M',
    condition: 'Excelente',
    origin: 'Amsterdã, Holanda',
    material: 'Veludo Cotelê Terracota e Forro Térmico de Lã Suave',
    story: 'Garimpado em feira de pulgas à beira dos canais de Amsterdã. Perfeito para sobreposições de meia-estação com gola alta ou vestidos fluidos.',
    modelQuery: 'shearling vest model autumn 70s fashion',
    detailQuery: 'shearling wool lining texture detail',
    measurements: { bust: '100 cm', waist: '94 cm', length: '58 cm', sleeve: 'Sem manga' },
    impact: { waterSavedLiters: 2300, co2AvoidedKg: 5.3 }
  },

  // ================= SEDA & LINHO (6 PEÇAS) =================
  {
    categorySlug: 'seda-linho',
    name: 'Blusa Pérola em Crepe de Seda Natural 1991',
    era: 'Anos 90',
    price: 270,
    originalPrice: 620,
    size: 'M',
    condition: 'Excelente',
    origin: 'Florença, Itália',
    material: '100% Crepe de Seda Pura com Botões de Madrepérola Naturais',
    story: 'Toque sutil de brilho suave pérola com botões de madrepérola originais. Uma peça de luxo silencioso para transitar entre o casual refinado e ocasiões especiais.',
    modelQuery: 'silk blouse cream pearl model elegant fashion',
    detailQuery: 'silk crepe white fabric draped texture luxury',
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
    modelQuery: 'linen shirt model casual relaxed white beige',
    detailQuery: 'linen woven fabric texture macro natural fiber',
    measurements: { bust: '112 cm', waist: '106 cm', length: '74 cm', sleeve: '62 cm' },
    impact: { waterSavedLiters: 2800, co2AvoidedKg: 6.2 }
  },
  {
    categorySlug: 'seda-linho',
    name: 'Vestido Envelope em Seda Acetinada Mostarda 1994',
    era: 'Anos 90',
    price: 320,
    originalPrice: 780,
    size: 'M',
    condition: 'Impecável',
    origin: 'Kyoto, Japão',
    material: '100% Seda Pura Habotai com Tingimento Natural',
    story: 'Comprado em um brechó tradicional em Kyoto. O corte envelope adapta-se harmonicamente a diferentes corpos, trazendo o brilho dourado e quente da seda pura.',
    modelQuery: 'silk wrap dress yellow mustard model elegant',
    detailQuery: 'silk satin yellow gold fabric draped texture',
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
    modelQuery: 'linen tunic blouse model summer relaxed',
    detailQuery: 'raw linen fabric beige texture detail',
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
    modelQuery: 'black silk shirt blouse model chic portrait',
    detailQuery: 'black silk crepe fabric texture drape',
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
    modelQuery: 'linen midi skirt model summer street fashion',
    detailQuery: 'linen skirt fabric texture button detail',
    measurements: { bust: '-', waist: '76 cm', length: '82 cm', sleeve: 'Quadril: 102 cm' },
    impact: { waterSavedLiters: 2200, co2AvoidedKg: 4.7 }
  },

  // ================= MINIMALISMO POÉTICO (6 PEÇAS) =================
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
    modelQuery: 'beige linen blazer minimal model studio portrait',
    detailQuery: 'beige raw linen blazer lapel texture macro',
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
    modelQuery: 'black turtleneck sweater minimal model portrait',
    detailQuery: 'merino wool knit texture black macro',
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
    modelQuery: 'cashmere cardigan beige model cozy minimal',
    detailQuery: 'cashmere knit texture beige macro softness',
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
    modelQuery: 'minimalist long wool coat model modern clean',
    detailQuery: 'wool coat minimalist fabric seam detail',
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
    modelQuery: 'black minimalist shift dress model clean portrait',
    detailQuery: 'black cotton jersey fabric texture clean',
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
    modelQuery: 'white minimal shirt model clean studio fashion',
    detailQuery: 'white cotton poplin fabric shirt collar texture',
    measurements: { bust: '102 cm', waist: '96 cm', length: '70 cm', sleeve: '60 cm' },
    impact: { waterSavedLiters: 2100, co2AvoidedKg: 4.7 }
  }
];

async function fetchUnsplashPhoto(query) {
  try {
    const res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=3`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
    return null;
  } catch (err) {
    console.error(`Erro ao buscar foto para "${query}":`, err.message);
    return null;
  }
}

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    return true;
  } catch (err) {
    console.error(`Erro ao baixar imagem:`, err.message);
    return false;
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

async function buildCatalog() {
  console.log('🌿 Iniciando a criação do catálogo poético de peças únicas com fotos de modelos e detalhes...');
  const catalog = [];

  for (let i = 0; i < VINTAGE_CURATION.length; i++) {
    const item = VINTAGE_CURATION[i];
    const prodId = `prod-${i + 1}`;
    const modelFilename = `prod-${i + 1}-model.jpg`;
    const detailFilename = `prod-${i + 1}-detail.jpg`;
    
    const localModelPath = path.join(PRODUCTS_IMG_DIR, modelFilename);
    const localDetailPath = path.join(PRODUCTS_IMG_DIR, detailFilename);

    console.log(`📸 [${i + 1}/${VINTAGE_CURATION.length}] Curando fotos para "${item.name}"...`);

    const modelUrl = await fetchUnsplashPhoto(item.modelQuery);
    const detailUrl = await fetchUnsplashPhoto(item.detailQuery);

    let modelOk = false;
    let detailOk = false;

    if (modelUrl) {
      modelOk = await downloadImage(modelUrl, localModelPath);
    }
    if (detailUrl) {
      detailOk = await downloadImage(detailUrl, localDetailPath);
    }

    const publicModelPath = modelOk ? `/products/${modelFilename}` : (item.fallbackModel || `/products/prod-${i+1}.jpg`);
    const publicDetailPath = detailOk ? `/products/${detailFilename}` : publicModelPath;

    catalog.push({
      id: prodId,
      name: item.name,
      slug: `${slugify(item.name)}-${i + 1}`,
      categorySlug: item.categorySlug,
      era: item.era,
      price: item.price,
      originalPrice: item.originalPrice,
      stock: 1,
      size: item.size,
      condition: item.condition,
      origin: item.origin,
      material: item.material,
      image: publicModelPath,
      gallery: [publicModelPath, publicDetailPath],
      hasStoryBadge: true,
      story: item.story,
      measurements: item.measurements,
      impact: item.impact
    });
  }

  console.log('💾 Salvando products.json...');
  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(catalog, null, 2), 'utf-8');

  // Atualiza categories.json com contagens exatas
  if (fs.existsSync(CATEGORIES_JSON_PATH)) {
    const rawCat = fs.readFileSync(CATEGORIES_JSON_PATH, 'utf-8');
    const categories = JSON.parse(rawCat);
    categories.forEach(cat => {
      cat.itemCount = catalog.filter(p => p.categorySlug === cat.slug).length;
    });
    fs.writeFileSync(CATEGORIES_JSON_PATH, JSON.stringify(categories, null, 2), 'utf-8');
    console.log('💾 categories.json atualizado com os novos contadores.');
  }

  console.log(`✨ Catálogo finalizado com ${catalog.length} peças únicas e poéticas!`);
}

buildCatalog();
