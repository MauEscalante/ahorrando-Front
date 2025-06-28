import React, { useEffect } from 'react';

// Componente para anuncios patrocinados directos (SIN REGISTRO)
export const LocalSponsoredAd = ({ adData }) => {
  const handleAdClick = () => {
    // Trackear clics para reportes a clientes
    console.log(`Click en anuncio: ${adData.company} - Ubicación: ${adData.location}`);
    
    // Abrir enlace según el tipo
    if (adData.link) {
      if (adData.link.startsWith('tel:')) {
        window.location.href = adData.link; // Llamada
      } else if (adData.link.startsWith('mailto:')) {
        window.location.href = adData.link; // Email
      } else if (adData.link.includes('wa.me')) {
        window.open(adData.link, '_blank'); // WhatsApp
      } else {
        window.open(adData.link, '_blank'); // Enlace web
      }
    }
  };

  return (
    <div className="local-sponsored-ad" onClick={handleAdClick}>
      <div className="sponsor-badge">PATROCINADO</div>
      <img src={adData.image} alt={adData.title} />
      <div className="sponsored-content">
        <div className="sponsor-company">{adData.company}</div>
        <h3>{adData.title}</h3>
        <p>{adData.description}</p>
        <div className="location-info">📍 {adData.location}</div>
        {adData.discount && (
          <div className="discount-badge">{adData.discount}</div>
        )}
        <button className="sponsor-cta">{adData.cta}</button>
        <div className="price-info">Pauta: {adData.price}</div>
      </div>
    </div>
  );
};

// Marketplace de anuncios locales rotativo
export const LocalMarketplace = () => {
  const [currentAd, setCurrentAd] = React.useState(0);
  
  // Anuncios de tiendas locales (te pagan directamente)
  const localBusinessAds = [
    {
      id: 1,
      company: "TechStore Centro",
      title: "Black Friday Todo el Año",
      description: "Hasta 50% OFF en componentes gaming. Financiación sin interés.",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=400&fit=crop",
      link: "tel:+5491123456789",
      cta: "Llamar Ahora",
      discount: "50% OFF",
      price: "$15.000/mes",
      location: "Av. Corrientes 1234, Centro"
    },
    {
      id: 2,
      company: "CompuGamer Palermo",
      title: "Armado de PC + Garantía",
      description: "Comprás los componentes, nosotros armamos y damos garantía 2 años.",
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300&h=400&fit=crop",
      link: "https://wa.me/5491123456789",
      cta: "WhatsApp",
      discount: "ARMADO GRATIS",
      price: "$12.000/mes",
      location: "Palermo Hollywood"
    },
    {
      id: 3,
      company: "Reparaciones Express",
      title: "Diagnóstico Gratis",
      description: "Revisamos tu PC/Notebook sin costo. Presupuesto en el día.",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=400&fit=crop",
      link: "mailto:reparaciones@express.com.ar",
      cta: "Consultar",
      discount: "DIAGNÓSTICO GRATIS",
      price: "$8.000/mes",
      location: "Villa Urquiza"
    },
    {
      id: 4,
      company: "Gaming Setup",
      title: "Escritorios Gamer",
      description: "Muebles diseñados para gamers. Envío gratis CABA.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop",
      link: "https://gamingsetup.com.ar",
      cta: "Ver Catálogo",
      discount: "ENVÍO GRATIS",
      price: "$10.000/mes",
      location: "San Telmo"
    },
    {
      id: 5,
      company: "Cyber Café Elite",
      title: "Torneos Semanales",
      description: "Counter Strike, Valorant, LoL. Premios en efectivo.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=400&fit=crop",
      link: "tel:+5491187654321",
      cta: "Inscribirse",
      discount: "PRIMER TORNEO GRATIS",
      price: "$5.000/mes",
      location: "Microcentro"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % localBusinessAds.length);
    }, 6000); // Cambia cada 6 segundos

    return () => clearInterval(interval);
  }, [localBusinessAds.length]);

  return <LocalSponsoredAd adData={localBusinessAds[currentAd]} />;
};

// Anuncios de referidos (sin plataformas externas)
export const ReferralAd = () => {
  const referralAds = [
    {
      id: 1,
      company: "Tu Referido",
      title: "¿Vendés Componentes?",
      description: "Anunciate acá por solo $10.000/mes. Llegá a miles de gamers.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=400&fit=crop",
      link: "mailto:publicidad@ahorrando.com",
      cta: "Contactar",
      discount: "PRIMER MES 50% OFF",
      price: "TU ANUNCIO AQUÍ",
      location: "Cualquier ubicación"
    }
  ];

  return <LocalSponsoredAd adData={referralAds[0]} />;
};

export default { LocalSponsoredAd, LocalMarketplace, ReferralAd };
