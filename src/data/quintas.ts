export interface Product {
  id: string;
  name: string;
  emoji: string;
  price: number;
  unit: string;
  description: string;
  badge?: string;
  available: boolean;
}

export interface Quinta {
  slug: string;
  name: string;
  shortName: string;
  farmer: string;
  location: string;
  description: string;
  longDescription: string;
  emoji: string;
  bgColor: string;
  accentColor: string;
  rating: number;
  reviewCount: number;
  minOrder: number;
  deliveryFee: number;
  deliveryZones: string[];
  pickupInfo: string;
  certifications: string[];
  phone: string;
  products: Product[];
}

export const quintas: Quinta[] = [
  {
    slug: 'quinta-da-serra',
    name: 'Quinta da Serra de Sintra',
    shortName: 'Quinta da Serra',
    farmer: 'João & Maria Ferreira',
    location: 'Almoçageme, Sintra',
    description: 'Legumes biológicos cultivados com 3 gerações de tradição familiar.',
    longDescription:
      'A Quinta da Serra de Sintra existe desde 1952, passada de geração em geração pelos Ferreira. Cultivamos os nossos legumes com métodos biológicos certificados, sem pesticidas nem fertilizantes químicos. A nossa terra fértil junto à serra produz vegetais com sabor único que só encontra numa quinta local.',
    emoji: '🌿',
    bgColor: '#1a4731',
    accentColor: '#52b788',
    rating: 4.9,
    reviewCount: 47,
    minOrder: 15,
    deliveryFee: 3.5,
    deliveryZones: ['Cascais', 'Estoril', 'Sintra', 'São João do Estoril', 'Alcabideche'],
    pickupInfo: 'Sábados 9h–13h · Mercado de Cascais',
    certifications: ['Bio Certificado', 'Produção Local'],
    phone: '+351 912 345 678',
    products: [
      {
        id: 'tom-1',
        name: 'Tomates Coração de Boi',
        emoji: '🍅',
        price: 3.2,
        unit: 'kg',
        description: 'Tomates gordos e sumarentos, perfeitos para saladas e molhos caseiros.',
        badge: 'Mais vendido',
        available: true,
      },
      {
        id: 'alf-1',
        name: 'Alface Romana Bio',
        emoji: '🥬',
        price: 1.5,
        unit: 'un',
        description: 'Alface fresca colhida de manhã, entregue no próprio dia.',
        available: true,
      },
      {
        id: 'ovo-1',
        name: 'Ovos Caseiros',
        emoji: '🥚',
        price: 4.5,
        unit: 'dúzia',
        description: 'Ovos de galinhas criadas ao ar livre. Gemas bem laranjinhas!',
        badge: 'Bio',
        available: true,
      },
      {
        id: 'cou-1',
        name: 'Courgette Bio',
        emoji: '🥒',
        price: 2.2,
        unit: 'kg',
        description: 'Courgette da época, colhida pequena para melhor sabor.',
        available: true,
      },
      {
        id: 'erb-1',
        name: 'Mix Ervas Aromáticas',
        emoji: '🌿',
        price: 2.5,
        unit: 'molho',
        description: 'Manjericão, salsa, coentros e tomilho frescos do dia.',
        available: true,
      },
      {
        id: 'cen-1',
        name: 'Cenouras Baby Bio',
        emoji: '🥕',
        price: 2.8,
        unit: 'kg',
        description: 'Cenouras baby doces, óptimas para comer cruas ou cozinhar.',
        badge: 'Novidade',
        available: true,
      },
      {
        id: 'bete-1',
        name: 'Beterrabas',
        emoji: '🫐',
        price: 2.0,
        unit: 'kg',
        description: 'Beterrabas frescas, excelentes para sumos e saladas coloridas.',
        available: true,
      },
      {
        id: 'pep-1',
        name: 'Pepinos',
        emoji: '🥒',
        price: 1.8,
        unit: 'kg',
        description: 'Pepinos crocantes e frescos, directos da estufa.',
        available: false,
      },
    ],
  },
  {
    slug: 'quinta-do-guincho',
    name: 'Quinta do Guincho',
    shortName: 'Quinta do Guincho',
    farmer: 'Ana Sofia Pereira',
    location: 'Malveira da Serra, Cascais',
    description: 'Fruta de pomar e produtos artesanais junto à praia do Guincho.',
    longDescription:
      'A Quinta do Guincho ocupa 12 hectares de terra fértil em Malveira da Serra, a 5 minutos da praia do Guincho. A Ana Sofia dedica-se à fruticultura e apicultura desde 2015, produzindo frutas sazonais e produtos artesanais da região. Os méis e compotas são feitos em pequenas quantidades, com fruta colhida na hora e receitas tradicionais.',
    emoji: '🍓',
    bgColor: '#7b3f00',
    accentColor: '#e76f51',
    rating: 4.8,
    reviewCount: 31,
    minOrder: 12,
    deliveryFee: 3.0,
    deliveryZones: ['Cascais', 'Estoril', 'Cascais Vila', 'Birre', 'Alcabideche', 'Malveira da Serra'],
    pickupInfo: 'Sáb & Dom 10h–13h · Mercado de Cascais',
    certifications: ['Apicultura Certificada', 'Produção Local'],
    phone: '+351 963 456 789',
    products: [
      {
        id: 'mor-1',
        name: 'Morangos do Campo',
        emoji: '🍓',
        price: 4.5,
        unit: '500g',
        description: 'Morangos doces e aromáticos, colhidos de manhã cedo, sem tratamentos.',
        badge: 'Época',
        available: true,
      },
      {
        id: 'mel-1',
        name: 'Mel Artesanal',
        emoji: '🍯',
        price: 8.5,
        unit: '250g',
        description: 'Mel puro das nossas colmeias junto à Serra de Sintra. Não pasteurizado.',
        badge: 'Artesanal',
        available: true,
      },
      {
        id: 'dfig-1',
        name: 'Doce de Figo',
        emoji: '🫙',
        price: 5.5,
        unit: 'frasco',
        description: 'Doce caseiro de figos da quinta, sem conservantes nem corantes.',
        available: true,
      },
      {
        id: 'pes-1',
        name: 'Pêssegos',
        emoji: '🍑',
        price: 3.5,
        unit: 'kg',
        description: 'Pêssegos sumarentos, colhidos no ponto certo de maturação.',
        available: true,
      },
      {
        id: 'mac-1',
        name: 'Maçãs Reineta',
        emoji: '🍎',
        price: 2.8,
        unit: 'kg',
        description: 'Maçã reineta tradicional portuguesa, doce e levemente ácida.',
        available: true,
      },
      {
        id: 'lim-1',
        name: 'Limões',
        emoji: '🍋',
        price: 2.5,
        unit: 'kg',
        description: 'Limões frescos e sumarentos, perfeitos para cozinha e limonadas.',
        available: true,
      },
      {
        id: 'fig-1',
        name: 'Figos Frescos',
        emoji: '🍈',
        price: 3.8,
        unit: 'kg',
        description: 'Figos da época, doces e maduros. Apenas disponíveis no verão.',
        badge: 'Sazonal',
        available: true,
      },
      {
        id: 'dmor-1',
        name: 'Doce de Morango',
        emoji: '🫙',
        price: 5.0,
        unit: 'frasco',
        description: 'Compota artesanal de morango da quinta, receita da avó da Ana Sofia.',
        available: true,
      },
    ],
  },
];

export function getQuinta(slug: string): Quinta | undefined {
  return quintas.find((q) => q.slug === slug);
}
