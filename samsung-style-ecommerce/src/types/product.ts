/**
 * Define la estructura de un objeto Producto.
 * Utilizado en toda la aplicación para la consistencia de datos.
 */
export interface Product {
  id: number | string; // ID único para el producto
  name: string; // Nombre del producto
  description: string; // Descripción corta del producto
  longDescription?: string; // Descripción más detallada para la página de producto
  price: number; // Precio del producto
  image: string; // URL de la imagen principal del producto
  images?: string[]; // URLs de imágenes adicionales para la galería en ProductDetail
  category?: string; // Categoría del producto (ej: "Smartphones", "TVs")
  brand?: string; // Marca del producto (ej: "Samsung")
  stock?: number; // Cantidad en stock
  rating?: number; // Calificación promedio del producto (ej: 4.5)
  numReviews?: number; // Número de reseñas
  specs?: Array<{ name: string; value: string }>; // Especificaciones técnicas como array de objetos
  features?: string[]; // Lista de características destacadas
}

/**
 * Datos de ejemplo para productos.
 * Simula una fuente de datos para el catálogo.
 */
export const sampleProductsData: Product[] = [
  {
    id: 1,
    name: 'Galaxy S23 Ultra',
    description: 'El smartphone épico con cámara de 200MP.',
    longDescription: 'Experimenta la innovación con el Galaxy S23 Ultra. Equipado con una revolucionaria cámara de 200MP, el S Pen integrado y el procesador más rápido en un Galaxy. Su diseño sostenible y elegante te encantará.',
    price: 1199.99,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/latin/2302/gallery/latin-galaxy-s23-ultra-s918-447305-sm-s918bzglgto-thumb-535247702?$264_264_PNG$',
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/latin/2302/gallery/latin-galaxy-s23-ultra-s918-447305-sm-s918bzglgto-535247702?$684_547_PNG$',
      'https://images.samsung.com/is/image/samsung/p6pim/latin/feature/164016803/latin-feature-galaxy-s23-ultra-535236385?$FB_TYPE_A_PNG$',
      'https://images.samsung.com/is/image/samsung/p6pim/latin/feature/164016800/latin-feature-galaxy-s23-ultra-535236382?$FB_TYPE_A_PNG$'
    ],
    category: 'Smartphones',
    brand: 'Samsung',
    stock: 50,
    rating: 4.8,
    numReviews: 125,
    specs: [
        { name: 'Pantalla', value: 'Dynamic AMOLED 2X de 6.8", QHD+, 120Hz' },
        { name: 'Cámara Principal', value: '200MP Wide, 12MP UltraWide, 10MP Telephoto (3x), 10MP Telephoto (10x)' },
        { name: 'Cámara Frontal', value: '12MP' },
        { name: 'Procesador', value: 'Snapdragon 8 Gen 2 for Galaxy' },
        { name: 'RAM', value: '8GB/12GB' },
        { name: 'Almacenamiento', value: '256GB/512GB/1TB' },
        { name: 'Batería', value: '5000mAh, Carga rápida 45W' },
        { name: 'S Pen', value: 'Integrado' }
    ],
    features: ['Cámara de 200MP', 'S Pen Integrado', 'Nightography Avanzada', 'Rendimiento Gaming Extremo']
  },
  {
    id: 2,
    name: 'Galaxy Tab S9 Ultra',
    description: 'Tu ventana a un mundo de posibilidades.',
    longDescription: 'La Galaxy Tab S9 Ultra redefine lo que una tablet puede hacer. Con su impresionante pantalla Dynamic AMOLED 2X de 14.6 pulgadas y el potente Snapdragon 8 Gen 2 for Galaxy, es perfecta para la productividad y el entretenimiento. Incluye S Pen y es resistente al agua y polvo.',
    price: 1099.99,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/latin/2307/gallery/latin-galaxy-tab-s9-ultra-wifi-x910-sm-x910nzaelto-thumb-537299066?$264_264_PNG$',
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/latin/2307/gallery/latin-galaxy-tab-s9-ultra-wifi-x910-sm-x910nzaelto-537299066?$684_547_PNG$',
      'https://images.samsung.com/is/image/samsung/p6pim/latin/feature/164450110/latin-feature-the-connected-power-of-galaxy-tab-s9-series-537290175?$FB_TYPE_A_PNG$'
    ],
    category: 'Tablets',
    brand: 'Samsung',
    stock: 30,
    rating: 4.7,
    numReviews: 90,
    specs: [
        { name: 'Pantalla', value: 'Dynamic AMOLED 2X de 14.6", 120Hz' },
        { name: 'Procesador', value: 'Snapdragon 8 Gen 2 for Galaxy' },
        { name: 'RAM', value: '12GB/16GB' },
        { name: 'Almacenamiento', value: '256GB/512GB/1TB' },
        { name: 'Batería', value: '11200mAh' },
        { name: 'Resistencia', value: 'IP68 (Agua y Polvo)' },
        { name: 'S Pen', value: 'Incluido (IP68)' }
    ],
    features: ['Pantalla Inmersiva de 14.6"', 'Rendimiento Superior', 'Resistente al Agua y Polvo', 'S Pen Incluido']
  },
  {
    id: 3,
    name: 'Galaxy Watch6 Classic',
    description: 'Estilo atemporal, funciones inteligentes.',
    longDescription: 'El Galaxy Watch6 Classic combina un diseño sofisticado con bisel giratorio y tecnología avanzada para el monitoreo de tu salud y bienestar. Personaliza las esferas y correas para un look único.',
    price: 429.99,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/latin/2307/gallery/latin-galaxy-watch6-classic-r960-sm-r960nzkalto-thumb-537305759?$264_264_PNG$',
    images: [
      'https://images.samsung.com/is/image/samsung/p6pim/latin/2307/gallery/latin-galaxy-watch6-classic-r960-sm-r960nzkalto-537305759?$684_547_PNG$',
      'https://images.samsung.com/is/image/samsung/p6pim/latin/feature/164450002/latin-feature-galaxy-watch6-classic-537289800?$FB_TYPE_A_PNG$'
    ],
    category: 'Wearables',
    brand: 'Samsung',
    stock: 75,
    rating: 4.6,
    numReviews: 150,
    specs: [
        { name: 'Pantalla', value: 'Super AMOLED de 1.5" (47mm) / 1.3" (43mm)' },
        { name: 'Material', value: 'Acero Inoxidable' },
        { name: 'Bisel', value: 'Giratorio Físico' },
        { name: 'Sensores', value: 'BioActive (ECG, Presión Arterial, BIA), Temperatura' },
        { name: 'Batería', value: 'Hasta 40 horas' }
    ],
    features: ['Bisel Giratorio Interactivo', 'Monitor de Sueño Avanzado', 'Sensor Cardíaco ECG', 'Composición Corporal (BIA)']
  },
  {
    id: 4,
    name: 'TV Neo QLED 8K QN900C (75")',
    description: 'Imagen que redefine la realidad.',
    longDescription: 'Sumérgete en una experiencia visual sin precedentes con el TV Neo QLED 8K QN900C. Su tecnología Quantum Matrix Pro y el Procesador Neural Quantum 8K ofrecen detalles asombrosos y un contraste espectacular. Diseño Infinity One para una inmersión total.',
    price: 6999.99,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/latin/2302/gallery/latin-qled-qn900c-8k-neo-qled-tv-qn75qn900cgxzd-thumb-535007112?$264_264_PNG$',
    images: [
        'https://images.samsung.com/is/image/samsung/p6pim/latin/2302/gallery/latin-qled-qn900c-8k-neo-qled-tv-qn75qn900cgxzd-535007112?$684_547_PNG$',
        'https://images.samsung.com/is/image/samsung/p6pim/latin/feature/163348661/latin-feature-neo-qled-8k-qn900c-534996950?$FB_TYPE_A_PNG$'
    ],
    category: 'TVs',
    brand: 'Samsung',
    stock: 15,
    rating: 4.9,
    numReviews: 75,
    specs: [
        { name: 'Resolución', value: '8K Real (7,680 x 4,320)' },
        { name: 'Tecnología de Pantalla', value: 'Neo QLED (Mini LED)' },
        { name: 'Procesador', value: 'Neural Quantum 8K con IA' },
        { name: 'HDR', value: 'Quantum HDR 64x' },
        { name: 'Sonido', value: 'Object Tracking Sound Pro (OTS Pro), Dolby Atmos' },
        { name: 'Diseño', value: 'Infinity One' }
    ],
    features: ['Resolución 8K Real', 'Tecnología Quantum Matrix Pro', 'Procesador Neural Quantum 8K', 'Sonido Envolvente OTS Pro']
  },
  {
    id: 5,
    name: 'Galaxy Buds3 Pro',
    description: 'Sonido Hi-Fi inmersivo y cancelación de ruido inteligente.',
    longDescription: 'Los Galaxy Buds3 Pro ofrecen una calidad de audio superior con sonido Hi-Fi de 24 bits y audio 360. Su cancelación activa de ruido (ANC) inteligente se adapta a tu entorno, y el diseño ergonómico asegura comodidad durante todo el día.',
    price: 229.99,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/latin/2208/gallery/latin-galaxy-buds2-pro-r510-sm-r510nlvalto-thumb-533189308?$264_264_PNG$', // Imagen de Buds2 Pro, placeholder
    images: [
        'https://images.samsung.com/is/image/samsung/p6pim/latin/2208/gallery/latin-galaxy-buds2-pro-r510-sm-r510nlvalto-533189308?$684_547_PNG$', // Placeholder
    ],
    category: 'Audio',
    brand: 'Samsung',
    stock: 100,
    rating: 4.7,
    numReviews: 210,
    specs: [
        { name: 'Calidad de Sonido', value: 'Hi-Fi 24 bits' },
        { name: 'Cancelación de Ruido', value: 'ANC Inteligente con Modo Ambiente' },
        { name: 'Audio', value: '360 con Direct Multi-channel' },
        { name: 'Batería', value: 'Hasta 5h (auriculares con ANC), hasta 18h (con estuche)' },
        { name: 'Resistencia', value: 'IPX7 (Agua)' }
    ],
    features: ['Sonido Hi-Fi de 24 bits', 'Cancelación Activa de Ruido Inteligente', 'Audio 360 Inmersivo', 'Diseño Cómodo y Ajustado']
  }
];
