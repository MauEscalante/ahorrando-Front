import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./Components/NavBar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Register from "./Components/Register";
import ProductDetails from "./Components/ProductDetails";
import Profile from "./Components/Profile";

const App = () => {
    const [searchResults, setSearchResults] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const handleSearchStart = (term) => {
        setSearchTerm(term);
        setSearchResults([]); // Inicializar con array vacío para activar modo búsqueda
    };

    const clearSearch = () => {
        setSearchResults(null);
        setSearchTerm(null);
    };

    return (
        <AuthProvider>
            <Navbar 
                onSearchResults={handleSearchResults} 
                onSearchStart={handleSearchStart} 
                onClearSearch={clearSearch} 
            />
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <Home 
                            searchResults={searchResults} 
                            searchTerm={searchTerm}
                            onClearSearch={clearSearch}
                        />
                    } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;