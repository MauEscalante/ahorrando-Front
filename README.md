# 🛒 Ahorrando - Frontend React

## 📋 Descripción

Aplicación web React que permite a los usuarios comparar precios de productos de hardware entre diferentes tiendas argentinas con una interfaz moderna y responsive.

## 🚀 Inicio Rápido

```bash
npm install
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📊 Estructura del Proyecto

```
src/
├── Assets/              # Recursos estáticos
│   └── usuario.svg
├── Components/          # Componentes React
│   ├── AdComponents.js
│   ├── Card.js          # Tarjeta de producto
│   ├── ForgotPassword.js
│   ├── Home.js          # Página principal
│   ├── LocalAds.js      # Publicidad local
│   ├── Login.js         # Autenticación
│   ├── NavBar.js        # Navegación
│   ├── Register.js      # Registro de usuarios
│   └── Search.jsx       # Búsqueda de productos
├── config/
│   └── adsConfig.js     # Configuración de anuncios
├── Style/               # Estilos CSS
│   ├── ForgotPassword.css
│   ├── Home.css
│   ├── Login.css
│   ├── navbar.css
│   ├── Register.css
│   └── Search.css
├── App.js               # Componente principal
└── index.js             # Punto de entrada
```

## 🎨 Funcionalidades Principales

### 🏠 Página Principal (Home)
- ✅ **Grid responsive** de productos
- ✅ **Skeleton loading** durante la carga
- ✅ **Infinite scroll** para paginación
- ✅ **Estados vacíos** informativos
- ✅ **Banners publicitarios** laterales

### 🔍 Búsqueda Inteligente
- ✅ **Búsqueda en tiempo real**
- ✅ **Estados de carga** con spinners
- ✅ **Autocompletado** (próximamente)
- ✅ **Filtrado por términos**

### 🃏 Tarjetas de Producto
- ✅ **Diseño moderno** con hover effects
- ✅ **Sistema de favoritos**
- ✅ **Información completa** del producto
- ✅ **Enlaces a tiendas** originales
- ✅ **Badges de descuentos**

### 👤 Sistema de Usuarios
- ✅ **Registro** con validación
- ✅ **Login/Logout** seguro
- ✅ **Gestión de perfil**
- ✅ **Recuperación de contraseña**
- ✅ **Lista de favoritos**

## 🛠️ Componentes Principales

### Home.js
Componente principal que maneja:
- Carga de productos con paginación
- Estados de búsqueda
- Scroll infinito
- Skeleton loading


### NavBar.js
Navegación principal con:
- Logo de la aplicación
- Barra de búsqueda integrada
- Menú de usuario
- Links de navegación



## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1024px - Layout con 3 columnas
- **Tablet**: 768px - 1024px - Layout con 2 columnas
- **Mobile**: < 768px - Layout con 1 columna



### Dependencias Principales
- **React 19**: Biblioteca principal
- **React Router DOM**: Enrutamiento
- **Axios**: Cliente HTTP
- **React Scripts**: Herramientas de desarrollo

## 🌐 Integración con API

### Configuración de Axios
```javascript
const API_BASE_URL = 'http://localhost:4000/api';

// Obtener productos
const response = await axios.get(`${API_BASE_URL}/products?page=${page}&limit=${limit}`);

// Buscar productos
const response = await axios.get(`${API_BASE_URL}/products/${searchTerm}`);
```



## 🎯 Funcionalidades Avanzadas

### Infinite Scroll
### Skeleton Loading
### Sistema de Favoritos
## 🔒 Autenticación
### Login/Register
### Gestión de Estado de Usuario
## 📢 Sistema de Publicidad
### LocalAds Component
## 🚀 Optimizaciones de Rendimiento
### Lazy Loading
### Memoización

