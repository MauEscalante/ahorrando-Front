import React, { useEffect } from 'react';

// Componente para Google AdSense
export const GoogleAd = ({ client, slot, format = "auto", style = {} }) => {
  useEffect(() => {
    // Cargar script de AdSense si no está cargado
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
      
      window.adsbygoogle = window.adsbygoogle || [];
    }

    // Inicializar el anuncio
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Error cargando anuncio:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
};

// Componente para anuncios rotativos personalizados
export const RotatingAd = () => {
  const [currentAd, setCurrentAd] = React.useState(0);
  
  const ads = [
    {
      id: 1,
      title: "RTX 4090 - El Poder Absoluto",
      description: "La GPU más potente para gaming 4K",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=400&fit=crop",
      link: "#",
      company: "NVIDIA"
    },
    {
      id: 2,
      title: "Procesadores AMD Ryzen",
      description: "Rendimiento excepcional para creators",
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300&h=400&fit=crop",
      link: "#",
      company: "AMD"
    },
    {
      id: 3,
      title: "Monitores Gaming 240Hz",
      description: "Experimenta la velocidad pura",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=400&fit=crop",
      link: "#",
      company: "ASUS"
    },
    {
      id: 4,
      title: "Teclados Mecánicos Premium",
      description: "Precisión en cada tecla",
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=400&fit=crop",
      link: "#",
      company: "Razer"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [ads.length]);

  const ad = ads[currentAd];

  return (
    <div className="rotating-ad">
      <div className="ad-content-rotating">
        <img src={ad.image} alt={ad.title} />
        <div className="ad-text-rotating">
          <div className="ad-company">{ad.company}</div>
          <h3>{ad.title}</h3>
          <p>{ad.description}</p>
          <button className="ad-cta">Ver Más</button>
        </div>
      </div>
    </div>
  );
};

export default { GoogleAd, RotatingAd };
