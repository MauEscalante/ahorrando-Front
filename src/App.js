import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import Register from "./Components/Register";

const App = () => {
    return (
        <>
        <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
};

export default App;