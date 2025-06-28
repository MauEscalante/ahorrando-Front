// Configuración para diferentes redes publicitarias

// 1. GOOGLE ADSENSE
// Pasos para configurar:
// 1. Registrarse en https://www.google.com/adsense/
// 2. Agregar tu sitio web
// 3. Obtener tu ID de cliente (ca-pub-XXXXXXXXX)
// 4. Crear unidades de anuncios y obtener slot IDs
// 5. Reemplazar los valores en GoogleAd component

export const ADSENSE_CONFIG = {
  client: "ca-pub-XXXXXXXXXXXXXXXXX", // Tu ID de AdSense
  slots: {
    leftBanner: "1234567890",   // Slot para banner izquierdo
    rightBanner: "0987654321",  // Slot para banner derecho
    headerBanner: "1357924680", // Slot para banner superior
  }
};

// 2. MEDIA.NET (Alternativa a AdSense)
// URL: https://www.media.net/
export const MEDIANET_CONFIG = {
  cid: "8CU1234567", // Tu Customer ID
  crid: "123456789", // Tu Creative ID
};

// 3. PROPELLER ADS
// URL: https://propellerads.com/
export const PROPELLER_CONFIG = {
  zoneId: "1234567", // Tu Zone ID
};

// 4. AMAZON ASSOCIATES (Para productos de afiliados)
// URL: https://affiliate-program.amazon.com/
export const AMAZON_CONFIG = {
  trackingId: "tuafiliado-20", // Tu tracking ID
  region: "US", // US, ES, etc.
};

// 5. ANUNCIOS PERSONALIZADOS/PATROCINADOS
export const SPONSORED_ADS = [
  {
    id: 1,
    company: "TechZone",
    title: "Black Friday en Componentes",
    description: "Hasta 70% de descuento en GPUs",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=400&fit=crop",
    link: "https://techzone.com/blackfriday",
    cta: "Ver Ofertas",
    price: "$500", // Precio que te pagan por mostrar el anuncio
  },
  {
    id: 2,
    company: "CompuGamer",
    title: "Nuevos Ryzen 7000 Series",
    description: "El futuro del gaming ha llegado",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300&h=400&fit=crop",
    link: "https://compugamer.com/ryzen7000",
    cta: "Descubrir",
    price: "$300",
  },
  {
    id: 3,
    company: "Hardware Plus",
    title: "Monitores 4K Gaming",
    description: "Experiencia visual incomparable",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=400&fit=crop",
    link: "https://hardwareplus.com/monitores4k",
    cta: "Ver Modelos",
    price: "$400",
  }
];

// 6. CONFIGURACIÓN PARA DIFFERENT AD NETWORKS
export const AD_NETWORKS = {
  // Revenu per mille (RPM) esperado
  adsense: { rpm: 2.5, fillRate: 90 },
  medianet: { rpm: 1.8, fillRate: 85 },
  propeller: { rpm: 1.2, fillRate: 95 },
  sponsored: { rpm: 5.0, fillRate: 100 },
};

// 7. FUNCIONES UTILES
export const getOptimalAdNetwork = () => {
  // Retorna la red publicitaria más rentable
  const networks = Object.entries(AD_NETWORKS);
  return networks.reduce((best, [name, data]) => {
    const revenue = data.rpm * (data.fillRate / 100);
    return revenue > best.revenue 
      ? { name, revenue, ...data }
      : best;
  }, { revenue: 0 });
};

export const shouldShowAd = () => {
  // Lógica para determinar si mostrar anuncios
  // (ej: no mostrar a usuarios premium)
  const isPremium = localStorage.getItem('isPremium') === 'true';
  return !isPremium;
};

export default {
  ADSENSE_CONFIG,
  MEDIANET_CONFIG,
  SPONSORED_ADS,
  getOptimalAdNetwork,
  shouldShowAd
};
