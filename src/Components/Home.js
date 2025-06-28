import React,{useEffect,useState} from "react";
import axios from "axios";
import Card from "../Components/Card";
import { LocalMarketplace, ReferralAd } from "../Components/LocalAds";
import "../Style/Home.css"

const Home = () => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts([
      {
        id: 1,
        titulo: "KIT REDRAGON M601WL-BA",
        local: "AR Shop",
        precio: "$19.585",
        imagenUrl: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop",
      },
      {
        id: 2,
        titulo: "Mouse Gamer RGB",
        local: "Venex",
        precio: "$8.000",
        imagenUrl: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=300&h=200&fit=crop",
      },
      {
        id: 3,
        titulo: "Teclado Mecánico RGB",
        local: "Full H4rd",
        precio: "$18.500",
        imagenUrl: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop",
      },
      {
        id: 4,
        titulo: "Auriculares Gaming 7.1",
        local: "TechZone",
        precio: "$12.750",
        imagenUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=200&fit=crop",
      },
      {
        id: 5,
        titulo: "Monitor Gaming 24' 144Hz",
        local: "CompuGamer",
        precio: "$45.999",
        imagenUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop",
      },
      {
        id: 6,
        titulo: "Silla Gamer Ergonómica",
        local: "OfficeMax",
        precio: "$89.900",
        imagenUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
      },
      {
        id: 7,
        titulo: "Webcam HD 1080p",
        local: "Digital Store",
        precio: "$7.500",
        imagenUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=300&h=200&fit=crop",
      },
      {
        id: 8,
        titulo: "Micrófono USB Streaming",
        local: "Audio Pro",
        precio: "$15.200",
        imagenUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300&h=200&fit=crop",
      },
      {
        id: 9,
        titulo: "GPU RTX 3060 Ti",
        local: "PC Masters",
        precio: "$125.000",
        imagenUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=200&fit=crop",
      },
      {
        id: 10,
        titulo: "SSD 1TB NVMe",
        local: "Hardware Plus",
        precio: "$28.999",
        imagenUrl: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300&h=200&fit=crop",
      },
      {
        id: 11,
        titulo: "RAM DDR4 16GB 3200MHz",
        local: "Memory World",
        precio: "$22.450",
        imagenUrl: "https://images.unsplash.com/photo-1562976540-b5295019cd17?w=300&h=200&fit=crop",
      },
      {
        id: 12,
        titulo: "Cooler CPU RGB",
        local: "Cooling Tech",
        precio: "$9.800",
        imagenUrl: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300&h=200&fit=crop",
      },
      {
        id: 13,
        titulo: "Fuente 750W 80+ Gold",
        local: "Power Supply Co",
        precio: "$35.000",
        imagenUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=200&fit=crop",
      },
    ]);
  }, []);

  return (
    <>
    <div className="home-layout">
      {/* Banner publicitario izquierdo - Anuncios Locales */}
      <div className="ad-banner left-ad">
        <LocalMarketplace />
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        <div className="container text-center">
          <div className="contenedor-populars">
            {products.map((data) => (
                <Card data={data} key={data.id} />
            ))}
          </div>
        </div>
      </div>

      {/* Banner publicitario derecho - Anuncio de referidos */}
      <div className="ad-banner right-ad">
        <ReferralAd />
      </div>
    </div>
  </>
  );
};

export default Home;