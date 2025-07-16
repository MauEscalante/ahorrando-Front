import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getPromedios } from '../controller/miApp.controller';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Grafico = ({ productId }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
              
        const response = await getPromedios(productId);
        
        // Extraer el array de datos (puede estar en response.data o directamente en response)
        const data = response.data || response;
        
        if (data && Array.isArray(data) && data.length > 0) {
          
          // Filtrar solo los elementos que tienen precio válido (no null, undefined y mayor a 0)
          const validData = data.filter(item => {
            const isValid = item.precio !== null && 
                           item.precio !== undefined && 
                           typeof item.precio === 'number' && 
                           item.precio > 0 &&
                           item.año !== null &&
                           item.año !== undefined &&
                           item.mes !== null &&
                           item.mes !== undefined;
            
            return isValid;
          });
          
          if (validData.length > 0) {
            // Extraer fechas y precios de los datos válidos
            const labels = validData.map(item => {
              return `${item.mes} de ${item.año}`;
            });
            
            // Los precios ya son números, no necesitamos parseFloat
            const priceData = validData.map(item => item.precio);
            
            
            const newChartData = {
              labels: labels,
              datasets: [
                {
                  label: 'Precio Promedio',
                  data: priceData,
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderWidth: 2,
                  fill: true,
                  tension: 0.1,
                  pointBackgroundColor: 'rgb(75, 192, 192)',
                  pointBorderColor: '#fff',
                  pointBorderWidth: 2,
                  pointRadius: 4,
                  pointHoverRadius: 6,
                },
              ],
            };
            
            setChartData(newChartData);
          } else {
            setError('No hay datos de precios válidos para este producto');
          }
        } else {
          setError('No hay datos disponibles para este producto');
        }
      } catch (err) {
        console.error('Error al obtener los datos:', err);
        setError('Error al cargar los datos del gráfico: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchData();
    } else {
      setError('ID de producto no proporcionado');
      setLoading(false);
    }
  }, [productId]);


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Evolución del Precio Promedio',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return `Precio: $${value.toLocaleString('es-ES')}`;
          }
        }
      }
    },
    layout: {
      padding: 10
    },
    elements: {
      point: {
        backgroundColor: '#ffffff',
        borderColor: '#3498db'
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Fecha',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Precio ($)',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          maxTicksLimit: 8,
          callback: function(value) {
            // Formatear números grandes con separadores de miles
            if (value >= 1000000) {
              return '$' + (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              return '$' + (value / 1000).toFixed(0) + 'K';
            } else {
              return '$' + value.toLocaleString('es-ES');
            }
          }
        },
        // Configuración para mejorar la visualización de la variación
        beginAtZero: false,
        grace: '5%', // Añadir 5% de espacio arriba y abajo para mejor visualización
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '300x',
        fontSize: '16px'
      }}>
        Cargando datos del gráfico...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '300px',
        color: 'red',
        fontSize: '16px'
      }}>
        {error}
      </div>
    );
  }

  if (!chartData.labels.length) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '300px',
        fontSize: '16px'
      }}>
        No hay datos disponibles para mostrar
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '300px', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '10px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Grafico;