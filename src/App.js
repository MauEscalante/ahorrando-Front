import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import Navbar from "./Components/NavBar";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Register from "./Components/Register";
import ProductDetails from "./Components/ProductDetails";
import Profile from "./Components/Profile";
import Lists from "./Components/Lists";
import HomePage from "./Components/HomePage";

const App = () => {
    return (
        <AuthProvider>
            <SearchProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product/:productId" element={<ProductDetails />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/products/:searchTerm" element={<Lists />} />
                </Routes>
            </SearchProvider>
        </AuthProvider>
    );
};

export default App;