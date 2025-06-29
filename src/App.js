import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Register from "./Components/Register";

const App = () => {
    const [searchResults, setSearchResults] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);

    const handleSearchResults = (results) => {
        console.log('📱 App: Setting search results:', results.length, 'products');
        setSearchResults(results);
    };

    const handleSearchStart = (term) => {
        console.log('🔍 App: Starting search for:', term);
        setSearchTerm(term);
        setSearchResults([]); // Inicializar con array vacío para activar modo búsqueda
    };

    const clearSearch = () => {
        console.log('🧹 App: Clearing search');
        setSearchResults(null);
        setSearchTerm(null);
    };

    return (
        <>
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
            </Routes>
        </>
    );
};

export default App;