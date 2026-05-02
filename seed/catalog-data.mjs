export const categories = [
  { id: 'bebidas', name: 'Bebidas', active: true },
  { id: 'abarrotes', name: 'Abarrotes', active: true },
  { id: 'lacteos', name: 'Lacteos', active: true },
  { id: 'hogar', name: 'Hogar', active: true },
];

export const catalogProducts = [
  {
    id: 'leche-pil-natural-900-ml',
    category: 'lacteos',
    name: 'Leche PIL Natural 900 ml',
    price: 9.7,
    description:
      'Leche semidescremada UHT, rica en calcio y pensada para el consumo diario en desayunos y preparaciones.',
    imageUrl: '',
    badge: 'Bolivia',
    sourceUrl:
      'https://www.hipermaxi.com/la-paz/hipermaxi-el-poeta/producto/786024/leche-pil-natural-900-ml',
    reviews: [
      {
        authorName: 'Carla',
        rating: 5,
        comment: 'Buen sabor y practica para tener en casa varios dias.',
      },
      {
        authorName: 'Miguel',
        rating: 4,
        comment: 'La uso para desayuno y cafe; cumple bien.',
      },
    ],
  },
  {
    id: 'queso-crema-bonle-pil-andina-200-gr',
    category: 'lacteos',
    name: 'Queso Crema Bonle PIL Andina 200 gr',
    price: 28,
    description:
      'Queso crema suave y facil de untar, ideal para desayunos, meriendas y recetas saladas o dulces.',
    imageUrl: '',
    badge: 'Oferta',
    hasOffer: true,
    offerPrice: 28,
    sourceUrl:
      'https://www.hipermaxi.com/la-paz/hipermaxi-el-poeta/producto/783359/queso-crema-bonle-pil-andina-200-gr',
    reviews: [
      {
        authorName: 'Daniela',
        rating: 5,
        comment: 'Textura cremosa y muy bueno para untar en tostadas.',
      },
      {
        authorName: 'Jorge',
        rating: 4,
        comment: 'Buen producto para sandwiches y meriendas.',
      },
    ],
  },
  {
    id: 'aceite-fino-vegetal-900-ml',
    category: 'abarrotes',
    name: 'Aceite Fino Vegetal 900 ml',
    price: 18,
    description:
      'Aceite vegetal de uso cotidiano para frituras ligeras, salteados y preparaciones caseras.',
    imageUrl: '',
    badge: 'Popular',
    sourceUrl:
      'https://www.hipermaxi.com/cochabamba/hipermaxi-blanco-galindo/producto/058424/aceite-fino-vegetal-900-ml',
    reviews: [
      {
        authorName: 'Mariela',
        rating: 4,
        comment: 'Es una marca comun y rendidora para la cocina diaria.',
      },
      {
        authorName: 'Oscar',
        rating: 4,
        comment: 'Buen precio para el contenido que trae.',
      },
    ],
  },
  {
    id: 'arroz-grano-de-oro-caisy-1-kg',
    category: 'abarrotes',
    name: 'Arroz Grano de Oro Caisy 1 kg',
    price: 13.5,
    description:
      'Arroz de grano largo para acompanar almuerzos y comidas familiares, facil de preparar en casa.',
    imageUrl: '',
    sourceUrl:
      'https://www.hipermaxi.com/santa-cruz/hipermaxi-blacutt/producto/540900/arroz-grano-de-oro-caisy-1-kg',
    reviews: [
      {
        authorName: 'Natalia',
        rating: 4,
        comment: 'Cocina parejo y queda bien para el almuerzo.',
      },
      {
        authorName: 'Luis',
        rating: 5,
        comment: 'Es uno de los arroces que mas compramos en casa.',
      },
    ],
  },
  {
    id: 'fideo-lazzaroni-spaguetto-52-400-gr',
    category: 'abarrotes',
    name: 'Fideo Lazzaroni Spaguetto 52 400 gr',
    price: 6.5,
    description:
      'Pasta seca tipo spaguetto para comidas rapidas y rendidoras, util para salsa roja o blanca.',
    imageUrl: '',
    sourceUrl:
      'https://www.hipermaxi.com/santa-cruz/hipermaxi-canoto/producto/008210/fideo-lazzaroni-spaguetto-52-400-gr',
    reviews: [
      {
        authorName: 'Paola',
        rating: 5,
        comment: 'Se cocina bien y no se rompe facil.',
      },
      {
        authorName: 'Raul',
        rating: 4,
        comment: 'Buena opcion para comidas de todos los dias.',
      },
    ],
  },
  {
    id: 'mocochinchi-soproma-100-gr',
    category: 'bebidas',
    name: 'Mocochinchi Soproma 100 gr',
    price: 10,
    description:
      'Mocochinchi deshidratado listo para preparar una bebida tradicional boliviana de sabor dulce.',
    imageUrl: '',
    badge: 'Tradicional',
    sourceUrl:
      'https://www.hipermaxi.com/la-paz/hipermaxi-calacoto/producto/658208/mocochinchi-soproma-100-gr',
    reviews: [
      {
        authorName: 'Veronica',
        rating: 5,
        comment: 'Muy buena opcion para preparar algo tradicional en casa.',
      },
      {
        authorName: 'Hugo',
        rating: 4,
        comment: 'Buen sabor cuando se cocina con canela y clavo.',
      },
    ],
  },
  {
    id: 'detergente-liquido-ola-futuro-limpieza-completa-5-l',
    category: 'hogar',
    name: 'Detergente Liquido Ola Futuro Limpieza Completa 5 L',
    price: 123,
    description:
      'Detergente liquido para lavado de ropa, pensado para cargas frecuentes y limpieza completa del hogar.',
    imageUrl: '',
    sourceUrl:
      'https://www.hipermaxi.com/la-paz/hipermaxi-achumani/producto/554466/detergente-liquido-ola-futuro-limpieza-completa-5-l',
    reviews: [
      {
        authorName: 'Silvia',
        rating: 4,
        comment: 'Rinde bastante para una familia y deja buen aroma.',
      },
      {
        authorName: 'Fernando',
        rating: 4,
        comment: 'Conviene cuando quieres comprar una presentacion grande.',
      },
    ],
  },
];
