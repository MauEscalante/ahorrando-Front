import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import Navbar from "./Components/NavBar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Register from "./Components/Register";
import ProductDetails from "./Components/ProductDetails";
import Profile from "./Components/Profile";

const App = () => {
    return (
        <AuthProvider>
            <SearchProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product/:productId" element={<ProductDetails />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </SearchProvider>
        </AuthProvider>
    );
};

export default App;